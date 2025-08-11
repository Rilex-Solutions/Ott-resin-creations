'use client'

import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex text-sm">
          {items.map((item, index) => (
            <span key={index} className="flex items-center">
              {index > 0 && <span className="mx-2 text-[#A69BAA]">/</span>}
              {item.href ? (
                <Link href={item.href} className="text-[#6B5B73] hover:text-[#2D1B36] transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#2D1B36] font-medium">{item.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  )
}