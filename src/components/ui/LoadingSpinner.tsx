'use client'

import { primary, text } from '@/constants/colors'

interface LoadingSpinnerProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function LoadingSpinner({ 
  message = 'Loading...', 
  size = 'md' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className="text-center py-12">
      <div className={`inline-block animate-spin rounded-full border-b-2 border-[#9BB5FF] ${sizeClasses[size]}`} />
      {message && (
        <p className="mt-4 text-[#4A3B52]">
          {message}
        </p>
      )}
    </div>
  )
}