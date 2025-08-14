-- SQL Script to set one random product as featured in each category
-- This will clear all existing featured flags and set one random product per category as featured

-- First, clear all existing featured flags
UPDATE products SET featured = false;

-- Then, set one random product per category as featured
WITH random_products AS (
  SELECT 
    id,
    category_id,
    ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY RANDOM()) as rn
  FROM products
)
UPDATE products 
SET featured = true 
WHERE id IN (
  SELECT id 
  FROM random_products 
  WHERE rn = 1
);

-- Verify the results
SELECT 
  c.name as category_name,
  c.slug as category_slug,
  p.name as featured_product_name,
  p.image_url as product_image_url,
  CASE 
    WHEN p.image_url IS NOT NULL AND p.image_url != '' THEN '✅ Has Image'
    ELSE '❌ No Image'
  END as image_status
FROM categories c
LEFT JOIN products p ON c.id = p.category_id AND p.featured = true
ORDER BY c.name;