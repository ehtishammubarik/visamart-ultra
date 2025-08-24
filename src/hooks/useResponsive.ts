// VisaMart ULTRA - Mobile-First Responsive Utilities
// Hooks and utilities for responsive design and mobile optimization

import { useState, useEffect, useCallback } from 'react'

// Tailwind breakpoints
const breakpoints = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

// Custom hook for responsive breakpoints
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<keyof typeof breakpoints>('xs')
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      setWindowWidth(width)

      if (width >= breakpoints['2xl']) {
        setBreakpoint('2xl')
      } else if (width >= breakpoints.xl) {
        setBreakpoint('xl')
      } else if (width >= breakpoints.lg) {
        setBreakpoint('lg')
      } else if (width >= breakpoints.md) {
        setBreakpoint('md')
      } else if (width >= breakpoints.sm) {
        setBreakpoint('sm')
      } else if (width >= breakpoints.xs) {
        setBreakpoint('xs')
      } else {
        setBreakpoint('xs')
      }
    }

    // Set initial breakpoint
    updateBreakpoint()

    // Add resize listener
    const handleResize = () => {
      updateBreakpoint()
    }

    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return {
    breakpoint,
    windowWidth,
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    is2xl: breakpoint === '2xl',
    isMobile: breakpoint === 'xs' || breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl',
    isMobileOrTablet: breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md',
    isTabletOrDesktop: breakpoint === 'md' || breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl'
  }
}

// Custom hook for mobile-specific features
export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')
  const [isIOSDevice, setIsIOSDevice] = useState(false)
  const [isAndroidDevice, setIsAndroidDevice] = useState(false)

  useEffect(() => {
    const checkMobileFeatures = () => {
      // Check if mobile viewport
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      // Check if touch device
      const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsTouchDevice(touch)

      // Check orientation
      const isPortrait = window.innerHeight > window.innerWidth
      setOrientation(isPortrait ? 'portrait' : 'landscape')

      // Check iOS
      const ios = /iPad|iPhone|iPod/.test(navigator.userAgent)
      setIsIOSDevice(ios)

      // Check Android
      const android = /Android/.test(navigator.userAgent)
      setIsAndroidDevice(android)
    }

    checkMobileFeatures()

    const handleResize = () => {
      checkMobileFeatures()
    }

    const handleOrientationChange = () => {
      // Small delay to ensure dimensions are updated
      setTimeout(() => {
        checkMobileFeatures()
      }, 100)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleOrientationChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [])

  return {
    isMobile,
    isTouchDevice,
    orientation,
    isIOSDevice,
    isAndroidDevice,
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',
    isMobileAndPortrait: isMobile && orientation === 'portrait',
    isMobileAndLandscape: isMobile && orientation === 'landscape'
  }
}

// Custom hook for safe area insets (for mobile devices with notches)
export function useSafeArea() {
  const [safeArea, setSafeArea] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    hasNotch: false
  })

  useEffect(() => {
    const updateSafeArea = () => {
      const top = parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)') || '0')
      const right = parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-right)') || '0')
      const bottom = parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-bottom)') || '0')
      const left = parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-left)') || '0')
      
      const hasNotch = top > 0 || right > 0 || bottom > 0 || left > 0

      setSafeArea({ top, right, bottom, left, hasNotch })
    }

    updateSafeArea()
    window.addEventListener('resize', updateSafeArea)
    window.addEventListener('orientationchange', updateSafeArea)

    return () => {
      window.removeEventListener('resize', updateSafeArea)
      window.removeEventListener('orientationchange', updateSafeArea)
    }
  }, [])

  return safeArea
}

// Utility function to get responsive classes based on breakpoint
export function getResponsiveClass(
  classes: Partial<Record<keyof typeof breakpoints | 'base', string>>,
  currentBreakpoint: keyof typeof breakpoints = 'xs'
): string {
  // Start with base class
  let result = classes.base || ''

  // Apply breakpoint-specific classes in order
  const breakpointOrder: (keyof typeof breakpoints)[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
  
  for (const bp of breakpointOrder) {
    if (breakpoints[bp] <= breakpoints[currentBreakpoint] && classes[bp]) {
      result = classes[bp] || result
    }
  }

  return result
}

// Hook for managing responsive state
export function useResponsiveState<T>(
  breakpointValues: Partial<Record<keyof typeof breakpoints | 'base', T>>,
  defaultValue: T
): T {
  const { breakpoint } = useBreakpoint()
  const [value, setValue] = useState<T>(defaultValue)

  useEffect(() => {
    const newValue = getResponsiveValue(breakpointValues, breakpoint, defaultValue)
    setValue(newValue)
  }, [breakpoint, breakpointValues, defaultValue])

  return value
}

// Utility to get responsive value based on current breakpoint
function getResponsiveValue<T>(
  values: Partial<Record<keyof typeof breakpoints | 'base', T>>,
  currentBreakpoint: keyof typeof breakpoints,
  defaultValue: T
): T {
  // Start with base value or default
  let result = values.base !== undefined ? values.base : defaultValue

  // Apply breakpoint-specific values in order
  const breakpointOrder: (keyof typeof breakpoints)[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
  
  for (const bp of breakpointOrder) {
    if (breakpoints[bp] <= breakpoints[currentBreakpoint] && values[bp] !== undefined) {
      result = values[bp] as T
    }
  }

  return result
}

// Hook for managing responsive columns
export function useResponsiveColumns(config?: {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  '2xl'?: number
}) {
  const defaultConfig = {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 4,
    '2xl': 4,
    ...config
  }

  const columns = useResponsiveState(defaultConfig, 1)
  
  return {
    columns,
    getGridClass: () => `grid-cols-${columns}`,
    getFlexBasis: () => `${100 / columns}%`
  }
}

// Hook for responsive spacing
export function useResponsiveSpacing(config?: {
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
}) {
  const defaultConfig = {
    xs: 'p-4',
    sm: 'p-6',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-8',
    '2xl': 'p-10',
    ...config
  }

  const spacing = useResponsiveState(defaultConfig, 'p-4')
  
  return spacing
}

// Hook for responsive font sizes
export function useResponsiveFontSize(config?: {
  xs?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
}) {
  const defaultConfig = {
    xs: 'text-sm',
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
    '2xl': 'text-3xl',
    ...config
  }

  const fontSize = useResponsiveState(defaultConfig, 'text-base')
  
  return fontSize
}

// Utility for responsive component props
export function useResponsiveProps<T extends Record<string, any>>(
  baseProps: T,
  responsiveProps: Partial<Record<keyof typeof breakpoints, Partial<T>>>
): T {
  const { breakpoint } = useBreakpoint()
  const [props, setProps] = useState<T>(baseProps)

  useEffect(() => {
    let newProps = { ...baseProps }

    // Apply responsive props in order
    const breakpointOrder: (keyof typeof breakpoints)[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
    
    for (const bp of breakpointOrder) {
      if (breakpoints[bp] <= breakpoints[breakpoint] && responsiveProps[bp]) {
        newProps = { ...newProps, ...responsiveProps[bp] }
      }
    }

    setProps(newProps)
  }, [breakpoint, baseProps, responsiveProps])

  return props
}

// Performance optimized media query hook
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches)
    }

    // Use the newer addEventListener if available, fallback to addListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [query])

  return matches
}

// Common media queries
export const mediaQueries = {
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
  touch: '(hover: none) and (pointer: coarse)',
  hover: '(hover: hover) and (pointer: fine)',
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)',
  prefersReducedMotion: '(prefers-reduced-motion: reduce)',
  prefersDarkMode: '(prefers-color-scheme: dark)',
  highDpi: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
}

// Convenience hooks for common media queries
export const useIsMobile = () => useMediaQuery(mediaQueries.mobile)
export const useIsTablet = () => useMediaQuery(mediaQueries.tablet)
export const useIsDesktop = () => useMediaQuery(mediaQueries.desktop)
export const useIsTouch = () => useMediaQuery(mediaQueries.touch)
export const useHasHover = () => useMediaQuery(mediaQueries.hover)
export const useIsPortrait = () => useMediaQuery(mediaQueries.portrait)
export const useIsLandscape = () => useMediaQuery(mediaQueries.landscape)
export const usePrefersReducedMotion = () => useMediaQuery(mediaQueries.prefersReducedMotion)
export const usePrefersDarkMode = () => useMediaQuery(mediaQueries.prefersDarkMode)
export const useIsHighDpi = () => useMediaQuery(mediaQueries.highDpi)