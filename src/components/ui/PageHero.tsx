'use client'

import { colorCombinations } from '@/constants/colors'

interface PageHeroProps {
  title: string
  subtitle: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
}

export default function PageHero({ 
  title, 
  subtitle, 
  maxWidth = '4xl' 
}: PageHeroProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md', 
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl'
  }

  return (
    <section className={`${colorCombinations.heroGradient.full} py-16`}>
      <div className={`${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8 text-center`}>
        <h1 className="text-4xl md:text-5xl font-bold text-[#2D1B36] mb-6">
          {title}
        </h1>
        <p className="text-xl text-[#4A3B52] max-w-3xl mx-auto mb-8">
          {subtitle}
        </p>
      </div>
    </section>
  )
}