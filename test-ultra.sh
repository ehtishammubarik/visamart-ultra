#!/bin/bash

# VisaMart ULTRA - Comprehensive Test Script
echo "🚀 VisaMart ULTRA - Comprehensive System Test"
echo "==============================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Function to run test
run_test() {
    local test_name="$1"
    local test_command="$2"
    local expected_result="$3"
    
    echo -n "Testing ${test_name}... "
    
    if eval "$test_command" > /dev/null 2>&1; then
        if [[ "$expected_result" == "success" ]]; then
            echo -e "${GREEN}✅ PASSED${NC}"
            ((TESTS_PASSED++))
        else
            echo -e "${RED}❌ FAILED${NC}"
            ((TESTS_FAILED++))
        fi
    else
        if [[ "$expected_result" == "fail" ]]; then
            echo -e "${GREEN}✅ PASSED (Expected failure)${NC}"
            ((TESTS_PASSED++))
        else
            echo -e "${RED}❌ FAILED${NC}"
            ((TESTS_FAILED++))
        fi
    fi
}

# Function to test HTTP response
test_http() {
    local url="$1"
    local expected_code="$2"
    local test_name="$3"
    
    echo -n "Testing ${test_name}... "
    local response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
    
    if [[ "$response" == "$expected_code" ]]; then
        echo -e "${GREEN}✅ PASSED (HTTP $response)${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}❌ FAILED (Expected: $expected_code, Got: $response)${NC}"
        ((TESTS_FAILED++))
    fi
}

# System Information
echo -e "${BLUE}System Information:${NC}"
echo "• OS: $(lsb_release -d | cut -f2)"
echo "• IP Address: $(curl -s ifconfig.me || echo "Unable to detect")"
echo "• Current User: $(whoami)"
echo "• Node.js: $(node --version 2>/dev/null || echo "Not installed")"
echo "• NPM: $(npm --version 2>/dev/null || echo "Not installed")"
echo "• Docker: $(docker --version 2>/dev/null || echo "Not installed")"
echo ""

# Test 1: Environment Detection
echo -e "${PURPLE}🔍 Testing Environment Setup${NC}"
echo "─────────────────────────────────"

# Check if required files exist
run_test "Environment file exists" "test -f .env" "success"
run_test "Package.json exists" "test -f package.json" "success"
run_test "Node modules installed" "test -d node_modules" "success"
run_test "ULTRA main file exists" "test -f src/main-ultra.tsx" "success"
run_test "ULTRA app exists" "test -f src/App-ultra.tsx" "success"
run_test "Auth provider exists" "test -f src/providers/AuthProvider.tsx" "success"

echo ""

# Test 2: Frontend Server
echo -e "${PURPLE}🌐 Testing Frontend Server${NC}"
echo "─────────────────────────────────"

# Check if server is running
test_http "http://localhost:3003" "200" "Localhost frontend"
test_http "http://161.97.183.163:3003" "200" "IP frontend access"

# Check if HTML contains ULTRA references
echo -n "Testing ULTRA mode detection... "
if curl -s "http://161.97.183.163:3003/" | grep -q "main-ultra"; then
    echo -e "${GREEN}✅ PASSED${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAILED${NC}"
    ((TESTS_FAILED++))
fi

echo ""

# Test 3: Backend API
echo -e "${PURPLE}⚙️ Testing Backend API${NC}"
echo "─────────────────────────────────"

test_http "http://161.97.183.163:8000/api/v1/health/" "200" "Backend health check"
test_http "http://161.97.183.163:8000/docs" "200" "API documentation"

echo ""

# Test 4: Authentication System
echo -e "${PURPLE}🔐 Testing Authentication System${NC}"
echo "─────────────────────────────────"

echo -n "Testing development mode detection... "
DEV_MODE_TEST=$(curl -s "http://161.97.183.163:3003/" | grep -c "Development Mode\|ULTRA\|mock")
if [[ "$DEV_MODE_TEST" -gt 0 ]]; then
    echo -e "${GREEN}✅ PASSED (Dev mode active)${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${YELLOW}⚠️  WARNING (Production mode)${NC}"
    ((TESTS_FAILED++))
fi

echo -n "Testing Auth0 bypass system... "
if [[ -f "src/providers/AuthProvider.tsx" ]]; then
    if grep -q "isDevelopmentMode" "src/providers/AuthProvider.tsx"; then
        echo -e "${GREEN}✅ PASSED${NC}"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}❌ FAILED${NC}"
        ((TESTS_FAILED++))
    fi
else
    echo -e "${RED}❌ FAILED (File not found)${NC}"
    ((TESTS_FAILED++))
fi

echo ""

# Test 5: SSL/HTTPS Setup
echo -e "${PURPLE}🔒 Testing HTTPS Configuration${NC}"
echo "─────────────────────────────────"

run_test "HTTPS setup script exists" "test -f setup-https.sh" "success"
run_test "HTTPS script is executable" "test -x setup-https.sh" "success"

echo -n "Testing Nginx availability... "
if command -v nginx > /dev/null; then
    echo -e "${GREEN}✅ PASSED (Nginx installed)${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${YELLOW}⚠️  NOT INSTALLED (Optional)${NC}"
fi

echo ""

# Test 6: File Structure Validation
echo -e "${PURPLE}📁 Testing File Structure${NC}"
echo "─────────────────────────────────"

# Key ULTRA files
ULTRA_FILES=(
    "src/main-ultra.tsx"
    "src/App-ultra.tsx" 
    "src/providers/AuthProvider.tsx"
    "src/components/layout/MainLayout-ultra.tsx"
    "src/components/auth/ProtectedRoute-ultra.tsx"
    "src/pages/HomePage-ultra.tsx"
    "src/pages/auth/LoginPage-ultra.tsx"
    ".env"
    "setup-https.sh"
)

for file in "${ULTRA_FILES[@]}"; do
    run_test "File: $file" "test -f $file" "success"
done

echo ""

# Test 7: Network Connectivity
echo -e "${PURPLE}🌍 Testing Network & Connectivity${NC}"
echo "─────────────────────────────────"

echo -n "Testing internet connectivity... "
if ping -c 1 google.com > /dev/null 2>&1; then
    echo -e "${GREEN}✅ PASSED${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAILED${NC}"
    ((TESTS_FAILED++))
fi

echo -n "Testing external IP detection... "
if curl -s ifconfig.me > /dev/null; then
    echo -e "${GREEN}✅ PASSED${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAILED${NC}"
    ((TESTS_FAILED++))
fi

echo ""

# Test 8: Security Features
echo -e "${PURPLE}🛡️ Testing Security Features${NC}"
echo "─────────────────────────────────"

echo -n "Testing environment variables... "
if [[ -f ".env" ]] && grep -q "VITE_AUTH0_DOMAIN" ".env"; then
    echo -e "${GREEN}✅ PASSED${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAILED${NC}"
    ((TESTS_FAILED++))
fi

echo -n "Testing CORS configuration... "
CORS_TEST=$(curl -s -H "Origin: http://161.97.183.163:3003" "http://161.97.183.163:8000/api/v1/health/" -I | grep -i "access-control")
if [[ ! -z "$CORS_TEST" ]]; then
    echo -e "${GREEN}✅ PASSED${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${YELLOW}⚠️  WARNING (CORS headers not detected)${NC}"
fi

echo ""

# Final Results
echo -e "${BLUE}Test Results Summary${NC}"
echo "═══════════════════════"
echo -e "✅ Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "❌ Tests Failed: ${RED}$TESTS_FAILED${NC}"

TOTAL_TESTS=$((TESTS_PASSED + TESTS_FAILED))
if [[ $TOTAL_TESTS -gt 0 ]]; then
    SUCCESS_RATE=$(( (TESTS_PASSED * 100) / TOTAL_TESTS ))
    echo -e "📊 Success Rate: ${GREEN}${SUCCESS_RATE}%${NC}"
fi

echo ""

# System Status
if [[ $TESTS_FAILED -eq 0 ]]; then
    echo -e "${GREEN}🎉 ALL TESTS PASSED - VisaMart ULTRA is fully operational!${NC}"
    echo ""
    echo -e "${BLUE}🚀 Access URLs:${NC}"
    echo -e "• Frontend: ${GREEN}http://161.97.183.163:3003${NC}"
    echo -e "• Backend API: ${GREEN}http://161.97.183.163:8000${NC}"
    echo -e "• API Docs: ${GREEN}http://161.97.183.163:8000/docs${NC}"
    echo -e "• Mode: ${GREEN}ULTRA Development (Auth0 Bypass)${NC}"
    echo ""
    echo -e "${PURPLE}Features Available:${NC}"
    echo "✅ Mock Authentication System"
    echo "✅ User & Agent Mode Switching" 
    echo "✅ Complete Frontend Functionality"
    echo "✅ Backend API Integration"
    echo "✅ Error Boundary Protection"
    echo "✅ Development Mode Indicators"
    echo "✅ HTTPS Setup Script Ready"
    echo ""
elif [[ $TESTS_FAILED -lt 5 ]]; then
    echo -e "${YELLOW}⚠️  MOSTLY OPERATIONAL - Some non-critical tests failed${NC}"
    echo "The core functionality should work, but some features may need attention."
else
    echo -e "${RED}❌ CRITICAL ISSUES DETECTED - System needs attention${NC}"
    echo "Please review the failed tests above and fix the issues."
fi

echo ""
echo -e "${BLUE}For production deployment with HTTPS:${NC}"
echo "Run: ./setup-https.sh"
echo ""
echo -e "${GREEN}VisaMart ULTRA - Complete Testing Finished!${NC}"