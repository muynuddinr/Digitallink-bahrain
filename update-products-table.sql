-- Migration to update products table schema
-- Remove old columns and add new image columns

-- First, drop the old columns if they exist
ALTER TABLE products
DROP COLUMN IF EXISTS price CASCADE,
DROP COLUMN IF EXISTS stock CASCADE,
DROP COLUMN IF EXISTS image_url CASCADE,
DROP COLUMN IF EXISTS images CASCADE;

-- Add new image columns
ALTER TABLE products
ADD COLUMN IF NOT EXISTS image_1 TEXT,
ADD COLUMN IF NOT EXISTS image_2 TEXT,
ADD COLUMN IF NOT EXISTS image_3 TEXT,
ADD COLUMN IF NOT EXISTS image_4 TEXT;

-- Update status constraint to remove 'out_of_stock'
ALTER TABLE products
DROP CONSTRAINT IF EXISTS products_status_check;

ALTER TABLE products
ADD CONSTRAINT products_status_check CHECK (status IN ('active', 'inactive'));
