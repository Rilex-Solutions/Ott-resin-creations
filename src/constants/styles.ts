// Style Constants for Huberduberkid Resin Creations
// This file contains all styling values used throughout the application
// Updated to match the whimsical, artistic logo and create a bespoke feeling

export const styles = {
  // Typography System (Artistic & Handcrafted)
  typography: {
    // Font Sizes
    sizes: {
      xs: 'text-xs',        // 12px
      sm: 'text-sm',        // 14px
      base: 'text-base',    // 16px - default
      lg: 'text-lg',        // 18px
      xl: 'text-xl',        // 20px
      '2xl': 'text-2xl',    // 24px
      '3xl': 'text-3xl',    // 30px
      '4xl': 'text-4xl',    // 36px
      '5xl': 'text-5xl',    // 48px
      '6xl': 'text-6xl',    // 60px
    },
    
    // Font Weights (Softer approach)
    weights: {
      light: 'font-light',        // 300 - for delicate text
      normal: 'font-normal',      // 400
      medium: 'font-medium',      // 500
      semibold: 'font-semibold',  // 600
      bold: 'font-bold',          // 700
      black: 'font-black',        // 900 - for impact
    },
    
    // Text Utilities (More artistic)
    utilities: {
      truncate: 'line-clamp-2',
      leading: 'leading-relaxed',
      leadingLoose: 'leading-loose',
      antialiased: 'antialiased',
      srOnly: 'sr-only',
      italic: 'italic',
      tracking: 'tracking-wide',
      trackingTight: 'tracking-tight',
    },
    
    // Heading Presets (More organic feeling)
    headings: {
      hero: 'text-4xl md:text-6xl font-black tracking-tight',
      heroArtistic: 'text-5xl md:text-7xl font-black tracking-tight leading-none',
      h1: 'text-3xl md:text-5xl font-bold tracking-tight',
      h2: 'text-2xl md:text-4xl font-bold tracking-wide',
      h3: 'text-xl md:text-2xl font-semibold',
      h4: 'text-lg md:text-xl font-semibold',
      subheading: 'text-lg md:text-xl font-medium leading-relaxed',
      handwritten: 'text-2xl md:text-3xl font-light italic tracking-wide', // For artistic touches
    },
    
    // Body Text Presets (More readable and warm)
    body: {
      large: 'text-lg leading-relaxed',
      default: 'text-base leading-relaxed',
      small: 'text-sm leading-relaxed',
      caption: 'text-xs leading-normal',
      quote: 'text-lg italic leading-loose font-light', // For testimonials
    },
  },

  // Button System (Organic & Artistic)
  buttons: {
    // Base Button Structure (More organic)
    base: 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 relative overflow-hidden',
    
    // Button Sizes (More generous spacing)
    sizes: {
      xs: 'px-3 py-2 text-xs',
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
      xl: 'px-10 py-5 text-lg',
      jumbo: 'px-12 py-6 text-xl', // For hero CTAs
    },
    
    // Border Radius (More organic shapes)
    radius: {
      soft: 'rounded-lg',
      organic: 'rounded-2xl',
      blob: 'rounded-3xl',
      pill: 'rounded-full',
    },
    
    // Button Variants (Artistic colors)
    variants: {
      primary: 'bg-[#9BB5FF] text-[#2D1B36] hover:bg-[#7B9AFF] transform hover:scale-105 focus:ring-[#9BB5FF] shadow-lg hover:shadow-xl',
      secondary: 'bg-[#7FDECC] text-[#2D1B36] hover:bg-[#5FD4BB] transform hover:scale-105 focus:ring-[#7FDECC] shadow-lg hover:shadow-xl',
      tertiary: 'bg-[#FEFBFD] text-[#9BB5FF] border-2 border-[#9BB5FF] hover:bg-[#F0F4FF] hover:border-[#7B9AFF] hover:shadow-lg focus:ring-[#9BB5FF]',
      accent: 'bg-[#E8B4CB] text-[#2D1B36] hover:bg-[#E099B8] transform hover:scale-105 focus:ring-[#E8B4CB] shadow-lg hover:shadow-xl',
      ghost: 'text-[#9BB5FF] hover:bg-[#F0F4FF] hover:text-[#7B9AFF] focus:ring-[#9BB5FF]',
      gradient: 'bg-gradient-to-r from-[#9BB5FF] via-[#E8B4CB] to-[#7FDECC] text-[#2D1B36] hover:shadow-xl transform hover:scale-105',
      paintSplash: 'bg-gradient-to-br from-[#B794C7] via-[#A8D5BA] to-[#FFAB91] text-[#2D1B36] hover:shadow-xl transform hover:scale-105',
      danger: 'bg-[#FF8A80] text-[#2D1B36] hover:bg-[#FF6B6B] focus:ring-[#FF8A80]',
      success: 'bg-[#A8D5BA] text-[#2D1B36] hover:bg-[#95C7A7] focus:ring-[#A8D5BA]',
      disabled: 'bg-[#D6D1D6] text-[#8B7B94] cursor-not-allowed',
    },
    
    // Special Button Combinations (Bespoke styles)
    presets: {
      heroCTA: 'px-10 py-5 text-xl font-bold rounded-3xl bg-gradient-to-r from-[#9BB5FF] via-[#E8B4CB] to-[#7FDECC] text-[#2D1B36] hover:shadow-2xl transform hover:scale-105 transition-all duration-300',
      heroSecondary: 'px-10 py-5 text-xl font-semibold rounded-3xl bg-[#FEFBFD] text-[#9BB5FF] border-3 border-[#9BB5FF] hover:bg-[#F0F4FF] hover:shadow-lg transition-all duration-300',
      nav: 'px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-[#F0F4FF]',
      cart: 'px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg',
      addToCart: 'px-8 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl',
      badge: 'px-4 py-2 rounded-full text-sm font-semibold shadow-md',
      featured: 'px-4 py-2 rounded-full text-sm font-bold bg-[#9BB5FF] text-[#FEFBFD] shadow-lg',
    },
  },

  // Spacing System (More organic spacing)
  spacing: {
    // Padding Presets
    padding: {
      none: 'p-0',
      xs: 'p-2',
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12',
      '2xl': 'p-16',
      '3xl': 'p-20',
      '4xl': 'p-24',
      organic: 'p-6 md:p-10 lg:p-16', // Responsive organic spacing
    },
    
    // Margin Presets
    margin: {
      none: 'm-0',
      xs: 'm-2',
      sm: 'm-3',
      md: 'm-6',
      lg: 'm-8',
      xl: 'm-12',
      '2xl': 'm-16',
      auto: 'mx-auto',
    },
    
    // Gap Presets (More generous)
    gap: {
      none: 'gap-0',
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
      '2xl': 'gap-16',
      organic: 'gap-6 md:gap-10 lg:gap-16',
    },
    
    // Section Spacing (More breathing room)
    sections: {
      xs: 'py-12',
      sm: 'py-16',
      md: 'py-20',
      lg: 'py-24',
      xl: 'py-32',
      hero: 'py-20 md:py-32 lg:py-40',
    },
  },

  // Border & Radius System (More organic shapes)
  borders: {
    // Border Radius (Softer, more organic)
    radius: {
      none: 'rounded-none',
      sm: 'rounded-md',
      md: 'rounded-lg',
      lg: 'rounded-xl',
      xl: 'rounded-2xl',
      '2xl': 'rounded-3xl',
      full: 'rounded-full',
      organic: 'rounded-2xl md:rounded-3xl',
      blob: 'rounded-[2rem]',
    },
    
    // Border Widths
    width: {
      none: 'border-0',
      thin: 'border',
      medium: 'border-2',
      thick: 'border-4',
      chunky: 'border-8', // For artistic emphasis
    },
    
    // Border Styles
    styles: {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
      double: 'border-double',
    },
  },

  // Shadow System (Softer, more artistic)
  shadows: {
    none: 'shadow-none',
    soft: 'shadow-sm',
    gentle: 'shadow-md',
    lifted: 'shadow-lg',
    floating: 'shadow-xl',
    dramatic: 'shadow-2xl',
    dreamy: 'shadow-2xl shadow-[#9BB5FF]/20', // Colored shadows
    warm: 'shadow-xl shadow-[#E8B4CB]/30',
    cool: 'shadow-xl shadow-[#7FDECC]/30',
    inner: 'shadow-inner',
    
    // Hover Shadow Effects (More dramatic)
    hoverEffects: {
      gentle: 'hover:shadow-lg transition-shadow duration-300',
      lift: 'hover:shadow-xl transition-shadow duration-300',
      float: 'hover:shadow-2xl transition-shadow duration-300',
      glow: 'hover:shadow-2xl hover:shadow-[#9BB5FF]/30 transition-all duration-300',
      warmGlow: 'hover:shadow-2xl hover:shadow-[#E8B4CB]/40 transition-all duration-300',
    },
  },

  // Animation & Transitions (More playful)
  animations: {
    // Transition Durations
    duration: {
      quick: 'duration-150',
      smooth: 'duration-300',
      gentle: 'duration-500',
      slow: 'duration-700',
      dreamy: 'duration-1000',
    },
    
    // Transition Properties
    transitions: {
      colors: 'transition-colors',
      all: 'transition-all',
      transform: 'transition-transform',
      shadow: 'transition-shadow',
      opacity: 'transition-opacity',
      smooth: 'transition-all duration-300 ease-out',
    },
    
    // Transform Effects (More playful)
    transforms: {
      subtle: 'transform hover:scale-102',
      gentle: 'transform hover:scale-105',
      bounce: 'transform hover:scale-110',
      float: 'transform hover:-translate-y-2',
      tilt: 'transform hover:rotate-1',
      tiltBack: 'transform hover:-rotate-1',
      wiggle: 'transform hover:rotate-2 hover:scale-105',
      slideRight: 'group-hover:translate-x-2 transition-transform duration-300',
      slideUp: 'transform hover:-translate-y-1',
    },
    
    // Common Animation Combinations (More organic)
    presets: {
      buttonHover: 'transition-all duration-300 transform hover:scale-105 hover:-translate-y-1',
      cardHover: 'transition-all duration-300 hover:shadow-xl hover:-translate-y-2',
      linkHover: 'transition-all duration-300 hover:text-[#7B9AFF]',
      imageHover: 'transition-all duration-500 hover:scale-105',
      fadeIn: 'transition-opacity duration-500',
      slideIn: 'transition-transform duration-300',
      gentleFloat: 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
      artisticHover: 'transition-all duration-300 hover:scale-105 hover:rotate-1 hover:shadow-xl',
    },
  },

  // Layout System (More organic spacing)
  layout: {
    // Container Sizes
    containers: {
      xs: 'max-w-xs mx-auto',
      sm: 'max-w-sm mx-auto',
      md: 'max-w-md mx-auto',
      lg: 'max-w-lg mx-auto',
      xl: 'max-w-xl mx-auto',
      '2xl': 'max-w-2xl mx-auto',
      '3xl': 'max-w-3xl mx-auto',
      '4xl': 'max-w-4xl mx-auto',
      '5xl': 'max-w-5xl mx-auto',
      '6xl': 'max-w-6xl mx-auto',
      '7xl': 'max-w-7xl mx-auto',
      full: 'max-w-full',
      content: 'max-w-4xl mx-auto', // For content-focused pages
    },
    
    // Grid Systems (More organic layouts)
    grid: {
      cols1: 'grid grid-cols-1',
      cols2: 'grid grid-cols-1 md:grid-cols-2',
      cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      cols4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      masonry: 'columns-1 md:columns-2 lg:columns-3 gap-6', // For portfolio
      responsive: 'grid grid-cols-1 md:grid-cols-3 gap-8',
      organic: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10',
    },
    
    // Flexbox Utilities
    flex: {
      center: 'flex items-center justify-center',
      between: 'flex items-center justify-between',
      col: 'flex flex-col',
      colCenter: 'flex flex-col items-center',
      wrap: 'flex flex-wrap',
      grow: 'flex-grow',
      shrink: 'flex-shrink-0',
      artistic: 'flex flex-col md:flex-row items-center gap-8 md:gap-12',
    },
    
    // Positioning
    position: {
      sticky: 'sticky top-0 z-50',
      absolute: 'absolute',
      relative: 'relative',
      fixed: 'fixed',
    },
  },

  // Component-Specific Styles (Artistic & Bespoke)
  components: {
    // Card Styles (More organic)
    card: {
      base: 'bg-[#FEFBFD] rounded-2xl shadow-lg border border-[#E8E3E8] overflow-hidden',
      artistic: 'bg-[#FEFBFD] rounded-3xl shadow-xl border border-[#E8E3E8] overflow-hidden transform transition-all duration-300',
      hover: 'hover:shadow-2xl hover:-translate-y-2 hover:rotate-1',
      gradient: 'bg-gradient-to-br from-[#F8F5FF] via-[#F0FDF9] to-[#FDF2F8] rounded-3xl shadow-lg',
      full: 'bg-[#FEFBFD] rounded-2xl shadow-lg border border-[#E8E3E8] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
      product: 'group bg-[#FEFBFD] rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#E8E3E8] hover:-translate-y-2',
      featured: 'bg-gradient-to-br from-[#F8F5FF] to-[#FDF2F8] rounded-3xl shadow-xl border-2 border-[#9BB5FF]/20',
    },
    
    // Navigation Styles (More artistic)
    nav: {
      desktop: 'hidden md:flex',
      mobile: 'md:hidden',
      link: 'transition-all duration-300 hover:text-[#9BB5FF] font-medium',
      brand: 'text-2xl md:text-3xl font-black transition-colors text-[#9BB5FF] hover:text-[#7B9AFF]',
      artistic: 'font-bold tracking-wide',
    },
    
    // Hero Section Styles (More dramatic)
    hero: {
      container: 'py-20 md:py-32 lg:py-40',
      background: 'bg-gradient-to-br from-[#FEFBFD] via-[#FAF7FB] to-[#F0F4FF]',
      title: 'text-5xl md:text-7xl font-black mb-8 tracking-tight leading-none',
      subtitle: 'text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed font-light',
      cta: 'flex flex-col sm:flex-row gap-6 justify-center',
      artistic: 'relative overflow-hidden',
    },
    
    // Feature Section Styles (More organic)
    features: {
      container: 'py-20 md:py-24',
      title: 'text-3xl md:text-5xl font-bold mb-6 text-center',
      subtitle: 'text-lg md:text-xl mb-16 max-w-3xl mx-auto text-center leading-relaxed',
      grid: 'grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12',
      item: 'text-center group',
      icon: 'w-20 h-20 flex items-center justify-center mx-auto mb-6 rounded-3xl shadow-lg transition-all duration-300 group-hover:scale-110',
      iconGradient: 'bg-gradient-to-br from-[#9BB5FF] to-[#7FDECC]',
    },
    
    // Process Steps (More whimsical)
    steps: {
      container: 'grid grid-cols-1 md:grid-cols-3 gap-12',
      item: 'text-center group',
      number: 'w-20 h-20 flex items-center justify-center mx-auto mb-6 rounded-full text-2xl font-black shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-12',
      connector: 'hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#9BB5FF] to-[#7FDECC]',
    },
    
    // Values Cards (More artistic)
    values: {
      container: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8',
      card: 'text-center p-8 rounded-3xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-xl',
      icon: 'w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl',
    },
    
    // Footer Styles (More organic)
    footer: {
      base: 'py-20 md:py-24',
      background: 'bg-[#2D1B36]',
      container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
      grid: 'grid grid-cols-1 md:grid-cols-4 gap-12',
      brand: 'text-3xl font-black mb-6 text-[#7FDECC]',
      linkGroup: 'space-y-3',
      link: 'transition-colors duration-300 hover:text-[#9BB5FF] text-[#FEFBFD]/80',
    },
    
    // Form Styles (More organic)
    form: {
      input: 'w-full px-6 py-4 border-2 border-[#E8E3E8] rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#9BB5FF]/20 focus:border-[#9BB5FF] transition-all duration-300 bg-[#FEFBFD]',
      textarea: 'w-full px-6 py-4 border-2 border-[#E8E3E8] rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#9BB5FF]/20 focus:border-[#9BB5FF] transition-all duration-300 bg-[#FEFBFD] resize-none min-h-[120px]',
      label: 'block text-sm font-semibold mb-3 text-[#2D1B36]',
      error: 'text-[#FF8A80] text-sm mt-2 font-medium',
      success: 'text-[#A8D5BA] text-sm mt-2 font-medium',
      group: 'space-y-3',
    },
    
    // Badge Styles (More playful)
    badge: {
      base: 'inline-flex items-center px-4 py-2 rounded-full text-sm font-bold',
      featured: 'bg-[#9BB5FF] text-[#FEFBFD] shadow-lg',
      new: 'bg-[#7FDECC] text-[#2D1B36] shadow-lg',
      sale: 'bg-[#E8B4CB] text-[#2D1B36] shadow-lg',
      organic: 'bg-gradient-to-r from-[#B794C7] to-[#A8D5BA] text-[#2D1B36] shadow-lg',
    },
  },

  // Responsive Breakpoints (Same as before)
  responsive: {
    // Breakpoint Prefixes
    sm: 'sm:', // 640px
    md: 'md:', // 768px
    lg: 'lg:', // 1024px
    xl: 'xl:', // 1280px
    '2xl': '2xl:', // 1536px
    
    // Common Responsive Patterns
    hide: {
      onMobile: 'hidden md:block',
      onDesktop: 'md:hidden',
    },
    
    text: {
      responsive: 'text-2xl md:text-4xl lg:text-5xl',
      heroResponsive: 'text-4xl md:text-6xl lg:text-7xl',
      subtitleResponsive: 'text-lg md:text-xl lg:text-2xl',
    },
    
    spacing: {
      responsive: 'px-4 sm:px-6 lg:px-8',
      section: 'py-16 md:py-20 lg:py-24',
      hero: 'py-20 md:py-32 lg:py-40',
    },
  },

  // Utility Classes (Enhanced)
  utilities: {
    // Aspect Ratios
    aspect: {
      square: 'aspect-square',
      video: 'aspect-video',
      photo: 'aspect-[4/3]',
      portrait: 'aspect-[3/4]',
      wide: 'aspect-[16/9]',
    },
    
    // Overflow
    overflow: {
      hidden: 'overflow-hidden',
      scroll: 'overflow-scroll',
      auto: 'overflow-auto',
      visible: 'overflow-visible',
    },
    
    // Z-Index (More levels)
    zIndex: {
      auto: 'z-auto',
      behind: 'z-[-1]',
      low: 'z-10',
      medium: 'z-20',
      high: 'z-30',
      overlay: 'z-40',
      top: 'z-50',
      tooltip: 'z-60',
    },
    
    // Cursor
    cursor: {
      pointer: 'cursor-pointer',
      notAllowed: 'cursor-not-allowed',
      wait: 'cursor-wait',
      grab: 'cursor-grab',
      grabbing: 'cursor-grabbing',
    },
    
    // Blend Modes (For artistic effects)
    blend: {
      normal: 'mix-blend-normal',
      multiply: 'mix-blend-multiply',
      overlay: 'mix-blend-overlay',
      softLight: 'mix-blend-soft-light',
    },
  },
} as const

// Pre-built Style Combinations (Updated for artistic theme)
export const styleCombinations = {
  // Button Combinations (More artistic)
  primaryButton: `${styles.buttons.base} ${styles.buttons.sizes.lg} ${styles.buttons.radius.organic} ${styles.buttons.variants.primary}`,
  secondaryButton: `${styles.buttons.base} ${styles.buttons.sizes.lg} ${styles.buttons.radius.organic} ${styles.buttons.variants.secondary}`,
  tertiaryButton: `${styles.buttons.base} ${styles.buttons.sizes.lg} ${styles.buttons.radius.organic} ${styles.buttons.variants.tertiary}`,
  heroButton: `${styles.buttons.presets.heroCTA}`,
  accentButton: `${styles.buttons.base} ${styles.buttons.sizes.lg} ${styles.buttons.radius.organic} ${styles.buttons.variants.accent}`,
  gradientButton: `${styles.buttons.base} ${styles.buttons.sizes.lg} ${styles.buttons.radius.organic} ${styles.buttons.variants.gradient}`,
  
  // Card Combinations (More artistic)
  productCard: `${styles.components.card.product}`,
  featureCard: `${styles.components.card.artistic} ${styles.spacing.padding.lg}`,
  artisticCard: `${styles.components.card.gradient} ${styles.spacing.padding.xl} ${styles.components.card.hover}`,
  featuredCard: `${styles.components.card.featured} ${styles.spacing.padding.xl}`,
  
  // Typography Combinations (More expressive)
  heroTitle: `${styles.typography.headings.heroArtistic} ${styles.typography.utilities.antialiased}`,
  sectionTitle: `${styles.typography.headings.h2} ${styles.typography.utilities.tracking} ${styles.spacing.margin.lg}`,
  bodyText: `${styles.typography.body.default} ${styles.typography.utilities.leading}`,
  artisticText: `${styles.typography.headings.handwritten} ${styles.typography.utilities.italic}`,
  
  // Layout Combinations (More organic)
  section: `${styles.spacing.sections.md}`,
  heroSection: `${styles.components.hero.container} ${styles.components.hero.background} text-center`,
  container: `${styles.layout.containers['7xl']} ${styles.responsive.spacing.responsive}`,
  organicGrid: `${styles.layout.grid.organic}`,
  
  // Navigation Combinations (More artistic)
  navLink: `${styles.components.nav.link} ${styles.buttons.presets.nav}`,
  brandLink: `${styles.components.nav.brand} ${styles.components.nav.artistic}`,
  
  // Form Combinations (More organic)
  inputField: `${styles.components.form.input}`,
  submitButton: `${styles.buttons.presets.heroCTA}`,
  
  // Animation Combinations (More playful)
  hoverEffect: `${styles.animations.presets.gentleFloat}`,
  artisticHover: `${styles.animations.presets.artisticHover}`,
  cardHover: `${styles.animations.presets.cardHover}`,
}

// Helper function to combine multiple style classes
export const combineStyles = (...styles: string[]) => {
  return styles.filter(Boolean).join(' ')
}

// Helper function to conditionally apply styles
export const conditionalStyle = (condition: boolean, trueStyle: string, falseStyle: string = '') => {
  return condition ? trueStyle : falseStyle
}

// Helper function for artistic color gradients
export const getArtisticGradient = (type: 'warm' | 'cool' | 'brand' | 'paint') => {
  const gradients = {
    warm: 'bg-gradient-to-br from-[#E8B4CB] via-[#FFAB91] to-[#B794C7]',
    cool: 'bg-gradient-to-br from-[#7FDECC] via-[#87CEEB] to-[#9BB5FF]',
    brand: 'bg-gradient-to-r from-[#9BB5FF] via-[#E8B4CB] to-[#7FDECC]',
    paint: 'bg-gradient-to-br from-[#B794C7] via-[#A8D5BA] to-[#FFAB91]',
  }
  return gradients[type]
}

// Artistic spacing helpers (for more organic layouts)
export const getOrganicSpacing = (size: 'small' | 'medium' | 'large') => {
  const spacing = {
    small: 'space-y-6 md:space-y-8',
    medium: 'space-y-8 md:space-y-12 lg:space-y-16',
    large: 'space-y-12 md:space-y-16 lg:space-y-20',
  }
  return spacing[size]
}

// Bespoke shadow helpers
export const getBespokeEffect = (effect: 'gentle' | 'dramatic' | 'dreamy' | 'warm') => {
  const effects = {
    gentle: 'shadow-lg hover:shadow-xl transition-shadow duration-300',
    dramatic: 'shadow-2xl hover:shadow-2xl hover:shadow-[#9BB5FF]/30 transition-all duration-300',
    dreamy: 'shadow-xl shadow-[#E8B4CB]/20 hover:shadow-2xl hover:shadow-[#E8B4CB]/40 transition-all duration-500',
    warm: 'shadow-lg shadow-[#FFAB91]/20 hover:shadow-xl hover:shadow-[#FFAB91]/30 transition-all duration-300',
  }
  return effects[effect]
}

// Export individual style groups for easier imports
export const {
  typography,
  buttons,
  spacing,
  borders,
  shadows,
  animations,
  layout,
  components,
  responsive,
  utilities,
} = styles

export default styles