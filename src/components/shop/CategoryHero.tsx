'use client'

import { Category } from '@/types/shop'
import Breadcrumb from '@/components/ui/Breadcrumb'
import PageHero from '@/components/ui/PageHero'

interface CategoryHeroProps {
  category: Category
}

export default function CategoryHero({ category }: CategoryHeroProps) {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: category.name }
  ]

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <PageHero 
        title={category.name}
        subtitle={category.hero}
        maxWidth="3xl"
      />
    </>
  )
}