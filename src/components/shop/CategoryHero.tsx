'use client'

import { Category } from '@/types/shop'
import PageHero from '@/components/ui/PageHero'

interface CategoryHeroProps {
  category: Category
}

export default function CategoryHero({ category }: CategoryHeroProps) {
  return (
    <>
      <PageHero 
        title={category.name}
        subtitle={category.hero}
        maxWidth="3xl"
      />
    </>
  )
}