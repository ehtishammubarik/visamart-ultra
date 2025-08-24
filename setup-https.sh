#!/bin/bash

# VisaMart ULTRA HTTPS Setup Script
# This script sets up SSL/HTTPS for production deployment

echo "🚀 VisaMart ULTRA - HTTPS Setup Script"
echo "=========================================="

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   echo "❌ Do not run this script as root. Run as regular user with sudo privileges."
   exit 1
fi

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Checking system requirements...${NC}"

# Check if nginx is installed
if ! command -v nginx &> /dev/null; then
    echo -e "${YELLOW}Installing Nginx...${NC}"
    sudo apt update
    sudo apt install -y nginx
fi

# Check if certbot is installed
if ! command -v certbot &> /dev/null; then
    echo -e "${YELLOW}Installing Certbot for SSL certificates...${NC}"
    sudo apt install -y snapd
    sudo snap install core; sudo snap refresh core
    sudo snap install --classic certbot
    sudo ln -sf /snap/bin/certbot /usr/bin/certbot
fi

# Domain setup
echo -e "${BLUE}Setting up domain configuration...${NC}"
echo "Enter your domain name (e.g., visamart.example.com):"
read -r DOMAIN

if [[ -z "$DOMAIN" ]]; then
    echo -e "${RED}❌ Domain name is required${NC}"
    exit 1
fi

# Validate domain format
if [[ ! $DOMAIN =~ ^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$ ]]; then
    echo -e "${RED}❌ Invalid domain format${NC}"
    exit 1
fi

# Create nginx configuration
echo -e "${BLUE}Creating Nginx configuration...${NC}"

sudo tee /etc/nginx/sites-available/visamart << EOF
# VisaMart ULTRA - Nginx Configuration
server {
    listen 80;
    server_name ${DOMAIN} www.${DOMAIN};
    
    # Redirect all HTTP requests to HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ${DOMAIN} www.${DOMAIN};

    # SSL Configuration (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/${DOMAIN}/chain.pem;

    # Modern SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-Frame-Options DENY always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.auth0.com https://${DOMAIN}.auth0.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.visamart.io https://${DOMAIN}.auth0.com;" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript application/json;

    # Main location - Frontend
    location / {
        proxy_pass http://127.0.0.1:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # WebSocket support for Vite HMR
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 86400;
    }

    # API proxy - Backend
    location /api/ {
        proxy_pass http://127.0.0.1:8000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
        # CORS headers for API
        add_header Access-Control-Allow-Origin "https://${DOMAIN}" always;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Authorization, Content-Type, Accept" always;
    }

    # Static assets optimization
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://127.0.0.1:3003;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable site
echo -e "${BLUE}Enabling Nginx site...${NC}"
sudo ln -sf /etc/nginx/sites-available/visamart /etc/nginx/sites-enabled/
sudo nginx -t

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Nginx configuration is valid${NC}"
else
    echo -e "${RED}❌ Nginx configuration error${NC}"
    exit 1
fi

# Get SSL certificate
echo -e "${BLUE}Obtaining SSL certificate...${NC}"
echo "Note: Make sure your domain ${DOMAIN} points to this server's IP address"
echo "Press Enter to continue when ready..."
read

sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --agree-tos --email admin@${DOMAIN} --non-interactive --redirect

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ SSL certificate obtained successfully${NC}"
else
    echo -e "${YELLOW}⚠️  SSL certificate failed. You can run 'sudo certbot --nginx -d ${DOMAIN}' manually later${NC}"
fi

# Restart services
echo -e "${BLUE}Restarting services...${NC}"
sudo systemctl reload nginx

# Create renewal script
echo -e "${BLUE}Setting up automatic SSL renewal...${NC}"
sudo crontab -l | { cat; echo "0 12 * * * /usr/bin/certbot renew --quiet"; } | sudo crontab -

# Update environment variables for production
echo -e "${BLUE}Updating environment configuration...${NC}"

# Update frontend .env
cat > .env << EOF
# VisaMart ULTRA - Production Environment

# API Configuration
VITE_API_BASE_URL=https://${DOMAIN}/api

# Auth0 Configuration
VITE_AUTH0_DOMAIN=visamart.jp.auth0.com
VITE_AUTH0_CLIENT_ID=jPh3StTHBaqnoJVnQRQuZ8MXprP1seNx
VITE_AUTH0_AUDIENCE=https://api.visamart.io
VITE_AUTH0_REDIRECT_URI=https://${DOMAIN}

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_CHAT_SUPPORT=true

# Production Settings
VITE_ENVIRONMENT=production
VITE_DEBUG_MODE=false
EOF

# Final status check
echo -e "${GREEN}"
echo "🎉 VisaMart ULTRA HTTPS Setup Complete!"
echo "=========================================="
echo -e "${NC}"
echo -e "🌐 Frontend: ${GREEN}https://${DOMAIN}${NC}"
echo -e "🔧 Backend API: ${GREEN}https://${DOMAIN}/api${NC}"
echo -e "🔒 SSL Status: ${GREEN}Enabled with Let's Encrypt${NC}"
echo -e "🚀 Mode: ${GREEN}Production Ready${NC}"
echo ""
echo -e "${BLUE}Next Steps:${NC}"
echo "1. Update your DNS to point ${DOMAIN} to this server"
echo "2. Test the SSL certificate: https://www.ssllabs.com/ssltest/"
echo "3. Restart your applications if needed"
echo "4. Monitor logs: sudo tail -f /var/log/nginx/error.log"
echo ""
echo -e "${YELLOW}Development Access Still Available:${NC}"
echo "• IP Access: http://$(curl -s ifconfig.me):3003"
echo "• Development features remain active on IP access"
echo ""
echo -e "${GREEN}✅ VisaMart ULTRA is now production-ready with HTTPS!${NC}"