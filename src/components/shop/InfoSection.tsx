'use client'

import { text } from '@/constants/colors'

const features = [
  {
    icon: (
      <svg className="w-8 h-8 text-[#9BB5FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: 'Handcrafted Quality',
    description: 'Each piece is individually made with premium materials and attention to detail',
    bgColor: 'bg-[#F8F5FF]' // Light periwinkle
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#7FDECC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
      </svg>
    ),
    title: 'Custom Options',
    description: 'Many items can be customized with your choice of colors and designs',
    bgColor: 'bg-[#F0FDF9]' // Light seafoam
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#E8B4CB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Made with Love',
    description: 'Every piece is created with passion and care in our dedicated studio',
    bgColor: 'bg-[#FDF2F8]' // Light pink
  }
]

export default function InfoSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-[#2D1B36] mb-6">
          Why Choose Our Resin Art?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className={`${feature.bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#2D1B36] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#4A3B52]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}