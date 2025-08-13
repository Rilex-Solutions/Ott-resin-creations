// Color Constants for Ott Resin Creations
// This file contains all color values used throughout the application
// Update these values to change the site-wide color scheme

export const colors = {
  // Custom Brand Colors (Artistic & Whimsical - Logo-Inspired)
  brand: {
    snow: '#FEFBFD',           // Clean background
    seafoamGreen: '#7FDECC',   // Soft seafoam from logo paint drips
    lavenderPink: '#E8B4CB',   // Gentle pink from logo background
    periwinkle: '#9BB5FF',     // Soft blue from logo elements
    coral: '#FF9B85',          // Warm coral from logo accents
    sage: '#A8D5BA',           // Muted green for balance
    // Additional artistic accents
    dustyPurple: '#B794C7',    // Muted purple for depth
    peachy: '#FFAB91',         // Warm peach tone
    skyBlue: '#87CEEB',        // Gentle sky blue
  },

  // Primary Brand Colors
  primary: {
    main: '#9BB5FF',           // Soft periwinkle - Main brand color
    hover: '#7B9AFF',          // Slightly deeper periwinkle
    light: '#B5C8FF',          // Lighter periwinkle
    dark: '#6B85E6',           // Deeper blue for contrast
  },

  // Secondary Brand Colors
  secondary: {
    main: '#7FDECC',           // Soft seafoam - Secondary brand color
    hover: '#5FD4BB',          // Deeper seafoam
    light: '#9FE8D6',          // Lighter seafoam
    dark: '#4FB8A0',           // Deeper teal
  },

  // Tertiary Brand Colors
  tertiary: {
    main: '#E8B4CB',           // Gentle lavender pink - Tertiary brand color
    hover: '#E099B8',          // Deeper pink
    light: '#F0C7D6',          // Lighter pink
    dark: '#D089A5',           // Deeper rose
  },

  // Background Colors
  background: {
    primary: '#FEFBFD',        // Clean white background
    secondary: '#FAF7FB',      // Very soft pink tint
    tertiary: '#F5F2F7',       // Light lavender tint
    dark: '#2D1B36',           // Deep purple-brown (softer than black)
    card: '#FFFFFF',           // Pure white for cards
    accent: '#F0F4FF',         // Light periwinkle tint for sections
  },

  // Text Colors
  text: {
    primary: '#2D1B36',        // Deep purple-brown - Main text
    secondary: '#4A3B52',      // Medium purple-gray
    tertiary: '#6B5B73',       // Lighter purple-gray
    light: '#8B7B94',          // Light purple-gray
    white: '#FEFBFD',          // Clean white for dark backgrounds
    muted: '#A69BAA',          // Muted purple-gray
    accent: '#9BB5FF',         // Soft periwinkle for accent text
  },

  // Interactive Colors
  interactive: {
    primary: '#9BB5FF',        // Soft periwinkle buttons/links
    primaryHover: '#7B9AFF',   // Deeper periwinkle hover
    secondary: '#7FDECC',      // Soft seafoam buttons
    secondaryHover: '#5FD4BB', // Deeper seafoam hover
    tertiary: '#FEFBFD',       // Clean white (outlined)
    tertiaryHover: '#F0F4FF',  // Light periwinkle tint on hover
    link: '#9BB5FF',           // Soft periwinkle links
    linkHover: '#7B9AFF',      // Deeper periwinkle hover
    accent: '#E8B4CB',         // Gentle pink accents
    accentHover: '#E099B8',    // Deeper pink
  },

  // Status Colors (softer, artistic approach)
  status: {
    success: '#A8D5BA',        // Soft sage green
    successLight: '#E8F5E8',   // Light sage background
    warning: '#FFB366',        // Soft orange
    warningLight: '#FFF2E5',   // Warning backgrounds
    error: '#FF8A80',          // Soft coral red
    errorLight: '#FFE5E5',     // Error backgrounds
    info: '#87CEEB',           // Gentle sky blue for info
    infoLight: '#E6F3FF',      // Info backgrounds
  },

  // Border Colors
  border: {
    primary: '#E8E3E8',        // Light border
    secondary: '#D6D1D6',      // Medium border
    accent: '#7A73D7',         // Brand accent borders
    accentLight: '#C4C0F0',    // Light accent borders
    subtle: '#F0EBF0',         // Very subtle borders
  },

  // Gradient Colors (soft, artistic flows like paint drips)
  gradients: {
    // Hero/Primary gradients
    heroFrom: '#FEFBFD',       // Clean white
    heroTo: '#F0F4FF',         // Light periwinkle tint
    
    // Artistic brand gradients (paint drip inspired)
    brandFrom: '#9BB5FF',      // Soft periwinkle
    brandTo: '#7FDECC',        // Soft seafoam
    brandVia: '#E8B4CB',       // Gentle pink
    
    // Paint splash gradients
    paintFrom: '#B794C7',      // Dusty purple
    paintTo: '#FFAB91',        // Peachy coral
    paintVia: '#A8D5BA',       // Sage green
    
    // Product card gradients (very subtle)
    cardFrom: '#F8F5FF',       // Very light periwinkle
    cardVia: '#F0FDF9',        // Very light seafoam
    cardTo: '#FDF2F8',         // Very light pink
    
    // Light gradients for backgrounds
    lightFrom: '#FEFBFD',      // Clean white
    lightVia: '#FAF7FB',       // Soft pink tint
    lightTo: '#F0F4FF',        // Light periwinkle
    
    // Hover gradient states (gentle transitions)
    hoverFrom: '#7B9AFF',      // Deeper periwinkle
    hoverVia: '#5FD4BB',       // Deeper seafoam
    hoverTo: '#E099B8',        // Deeper pink
  },

  // Component-specific colors
  components: {
    // Header
    header: {
      background: '#FEFBFD',    // Snow
      border: '#E8E3E8',        // Light border
      brand: '#2D1B36',         // Dark text for brand
      brandHover: '#7A73D7',    // Purple hover
      nav: '#2D1B36',           // Dark text for navigation
      navHover: '#7A73D7',      // Purple hover
      cta: '#7A73D7',           // Purple button
      ctaHover: '#6B63C7',      // Darker purple hover
    },
    
    // Footer
    footer: {
      background: '#191116',    // Licorice
      brand: '#7CD3BD',         // Tiffany blue
      text: '#FEFBFD',          // Snow
      textSecondary: '#A8A3A8', // Muted text
      textMuted: '#8B8690',     // Light text
      textHover: '#EFB7DB',     // Pink lavender
    },
    
    // Cards
    card: {
      background: '#FFFFFF',    // Pure white
      backgroundAlt: '#FEFBFD', // Snow
      border: '#E8E3E8',        // Light border
      shadow: 'shadow-md',
      shadowHover: 'shadow-xl',
    },
    
    // Buttons
    button: {
      primary: '#7A73D7',       // Medium slate blue
      primaryHover: '#6B63C7',  // Darker purple
      primaryText: '#FEFBFD',   // Snow
      secondary: '#7CD3BD',     // Tiffany blue
      secondaryHover: '#6BC4AD', // Darker tiffany
      secondaryText: '#FEFBFD', // Snow
      tertiary: '#FEFBFD',      // Snow (outlined)
      tertiaryHover: '#F8F4F7', // Light snow
      tertiaryText: '#7A73D7',  // Brand purple
      tertiaryBorder: '#7A73D7', // Brand purple
      disabled: '#D6D1D6',      // Medium gray
      disabledText: '#8B8690',  // Light text
    },
    
    // Featured badges
    featured: {
      background: '#7A73D7',    // Medium slate blue
      text: '#FEFBFD',          // Snow
      backgroundAlt: '#7CD3BD', // Tiffany blue alternative
    },
    
    // Process steps
    steps: {
      step1: '#EFEDFF',         // Light purple background
      step1Text: '#7A73D7',     // Purple text
      step2: '#E8F7F3',         // Light tiffany background
      step2Text: '#7CD3BD',     // Tiffany text
      step3: '#FCF0F8',         // Light pink background
      step3Text: '#EFB7DB',     // Pink lavender text
    },
    
    // Values cards
    values: {
      quality: '#EFEDFF',       // Light purple
      personal: '#E8F7F3',      // Light tiffany
      customer: '#FCF0F8',      // Light pink
      sustainability: '#F8F4F7', // Light snow
    },
  },
} as const

// Helper function to convert hex colors to Tailwind-compatible format
export const customColors = {
  'brand-snow': '#FEFBFD',
  'seafoam': '#7FDECC',
  'lavender-pink': '#E8B4CB',
  'periwinkle': '#9BB5FF',
  'coral': '#FF9B85',
  'sage': '#A8D5BA',
  'dusty-purple': '#B794C7',
  'peachy': '#FFAB91',
  'sky-blue': '#87CEEB',
}

// Helper function to get color class strings (keeping original functionality)
export const getColorClass = (type: 'bg' | 'text' | 'border' | 'from' | 'to' | 'via', color: string) => {
  return `${type}-${color}`
}

// Common color combinations for easy reuse
export const colorCombinations = {
  primaryButton: {
    base: `bg-[#9BB5FF] text-[#2D1B36]`,
    hover: `hover:bg-[#7B9AFF]`,
    full: `bg-[#9BB5FF] text-[#2D1B36] hover:bg-[#7B9AFF] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`,
  },
  
  productButton: {
    base: `bg-[#9BB5FF] text-[#2D1B36]`,
    hover: `hover:bg-[#7B9AFF]`,
    disabled: `bg-[#D6D1D6] text-[#8B7B94] cursor-not-allowed`,
  },
  
  secondaryButton: {
    base: `bg-[#7FDECC] text-[#2D1B36]`,
    hover: `hover:bg-[#5FD4BB]`,
    full: `bg-[#7FDECC] text-[#2D1B36] hover:bg-[#5FD4BB] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`,
  },
  
  tertiaryButton: {
    base: `bg-[#FEFBFD] text-[#9BB5FF] border-2 border-[#9BB5FF]`,
    hover: `hover:bg-[#F0F4FF] hover:border-[#7B9AFF]`,
    full: `bg-[#FEFBFD] text-[#9BB5FF] border-2 border-[#9BB5FF] hover:bg-[#F0F4FF] hover:border-[#7B9AFF] transition-all duration-300 shadow-md hover:shadow-lg`,
  },
  
  accentButton: {
    base: `bg-[#E8B4CB] text-[#2D1B36]`,
    hover: `hover:bg-[#E099B8]`,
    full: `bg-[#E8B4CB] text-[#2D1B36] hover:bg-[#E099B8] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`,
  },
  
  heroGradient: {
    full: `bg-gradient-to-br from-[#FEFBFD] to-[#F0F4FF]`,
  },
  
  brandGradient: {
    full: `bg-gradient-to-r from-[#9BB5FF] via-[#E8B4CB] to-[#7FDECC]`,
  },
  
  paintGradient: {
    full: `bg-gradient-to-r from-[#B794C7] via-[#A8D5BA] to-[#FFAB91]`,
  },
  
  cardGradient: {
    full: `bg-gradient-to-br from-[#F8F5FF] via-[#F0FDF9] to-[#FDF2F8]`,
  },
  
  lightGradient: {
    full: `bg-gradient-to-br from-[#FEFBFD] via-[#FAF7FB] to-[#F0F4FF]`,
  },
  
  header: {
    base: `bg-[#FEFBFD] border-[#E8E3E8]`,
    full: `bg-[#FEFBFD] shadow-sm border-b border-[#E8E3E8] sticky top-0 z-50`,
  },
  
  form: {
    background: `bg-[#FFFFFF]`,
    sectionBackground: `bg-[#FFFFFF]`,
    input: `bg-[#FFFFFF] text-[#2D1B36] border-[#E8E3E8] focus:ring-[#9BB5FF] focus:border-transparent placeholder-[#A69BAA]`,
    label: `text-[#2D1B36]`,
    infoBox: `bg-[#F0F4FF] border-[#C4C0F0]`,
    warningBox: `bg-[#FFF2E5] border-[#FFB366]`,
    successBox: `bg-[#E8F5E8] text-[#2D1B36]`,
    errorText: `text-[#FF8A80]`,
    helperText: `text-[#6B5B73]`,
    priceCategory: `text-[#2D1B36]`,
    priceValue: `text-[#9BB5FF]`,
    priceGrid: `bg-[#FFFFFF] border-[#E8E3E8]`,
    priceItemEven: `bg-[#FFFFFF] border-[#E8E3E8]`,
    priceItemOdd: `bg-[#FAF7FB] border-[#E8E3E8]`,
  },
  
  process: {
    stepTitle: `text-[#2D1B36]`,
    stepDescription: `text-[#6B5B73]`,
    step1: `bg-[#EFEDFF] text-[#7A73D7]`,
    step2: `bg-[#E8F7F3] text-[#7CD3BD]`,
    step3: `bg-[#FCF0F8] text-[#EFB7DB]`,
  },
}

// Export individual color groups for easier imports
export const {
  brand,
  primary,
  secondary,
  tertiary,
  background,
  text,
  interactive,
  status,
  border,
  gradients,
  components,
} = colors

export default colors