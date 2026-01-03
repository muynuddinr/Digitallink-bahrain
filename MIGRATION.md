# Database Migration Guide

## Update Products Table Schema

This migration updates the products table to remove `price`, `stock`, and `image_url` fields, and adds support for 4 product images (`image_1`, `image_2`, `image_3`, `image_4`).

### Steps to Run:

1. **Go to Supabase Dashboard**
   - Navigate to your Supabase project
   - Click on "SQL Editor"

2. **Run the Migration Script**
   - Copy the contents of `update-products-table.sql`
   - Paste it into the SQL Editor
   - Click "Run"

3. **Verify the Changes**
   - Go to the "products" table in the Data Editor
   - You should see:
     - ✅ `image_1`, `image_2`, `image_3`, `image_4` columns added
     - ❌ `price`, `stock`, `image_url` columns removed

### Migration Script Content:

```sql
-- Remove old columns
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

-- Update status constraint
ALTER TABLE products
DROP CONSTRAINT IF EXISTS products_status_check;

ALTER TABLE products
ADD CONSTRAINT products_status_check CHECK (status IN ('active', 'inactive'));
```

### After Migration:

Once the migration is complete, you can create products with:
- Product Name ✓
- Slug ✓
- Category Hierarchy ✓
- Image 1 (Required) ✓
- Images 2-4 (Optional) ✓
- Description (Optional) ✓
- Status (Active/Inactive) ✓
- Featured (Yes/No) ✓

### Rollback (if needed):

If you need to revert, you can run:

```sql
-- Add back the old columns
ALTER TABLE products
ADD COLUMN price DECIMAL(10, 2) NOT NULL DEFAULT 0,
ADD COLUMN stock INTEGER DEFAULT 0,
ADD COLUMN image_url TEXT,
ADD COLUMN images JSONB DEFAULT '[]'::jsonb;

-- Remove new columns
ALTER TABLE products
DROP COLUMN IF EXISTS image_1,
DROP COLUMN IF EXISTS image_2,
DROP COLUMN IF EXISTS image_3,
DROP COLUMN IF EXISTS image_4;
```
