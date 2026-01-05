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

## Create Contact Enquiries Table

This creates the `contact_enquiries` table to store contact form submissions that will appear in the admin panel.

### Steps to Run:

1. **Go to Supabase Dashboard**
   - Navigate to your Supabase project
   - Click on "SQL Editor"

2. **Run the Migration Script**
   - Copy the contents of `create-contact-enquiries-table.sql`
   - Paste it into the SQL Editor
   - Click "Run"

3. **Verify the Changes**
   - Go to the "Table Editor" in Supabase
   - You should see a new `contact_enquiries` table
   - Check that it has columns: id, name, email, phone, message, status, created_at, updated_at

### Migration Script Content:

```sql
-- Create contact_enquiries table
CREATE TABLE IF NOT EXISTS contact_enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_created_at ON contact_enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_status ON contact_enquiries(status);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_enquiries ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (for contact form submissions)
CREATE POLICY "Allow public to insert contact enquiries" ON contact_enquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy for authenticated users to read all enquiries (admin access)
CREATE POLICY "Allow authenticated users to read contact enquiries" ON contact_enquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for authenticated users to update enquiries (admin access)
CREATE POLICY "Allow authenticated users to update contact enquiries" ON contact_enquiries
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policy for authenticated users to delete enquiries (admin access)
CREATE POLICY "Allow authenticated users to delete contact enquiries" ON contact_enquiries
  FOR DELETE
  TO authenticated
  USING (true);
```

### After Migration:

Contact form submissions will be stored in the database and visible in the admin panel at `/admin/dashboard/contact-enquiry`.

## Create Newsletter Enquiries Table

This creates the `newsletter_enquiries` table to store newsletter subscriptions from the footer.

### Steps to Run:

1. **Go to Supabase Dashboard**
   - Navigate to your Supabase project
   - Click on "SQL Editor"

2. **Run the Migration Script**
   - Copy the contents of `create-newsletter-enquiries-table.sql`
   - Paste it into the SQL Editor
   - Click "Run"

3. **Verify the Changes**
   - Go to the "Table Editor" in Supabase
   - You should see a new `newsletter_enquiries` table
   - Check that it has columns: id, email, status, subscribed_at, updated_at

### Migration Script Content:

```sql
-- Create newsletter_enquiries table
CREATE TABLE IF NOT EXISTS newsletter_enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_newsletter_enquiries_email ON newsletter_enquiries(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_enquiries_subscribed_at ON newsletter_enquiries(subscribed_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_enquiries_status ON newsletter_enquiries(status);

-- Enable Row Level Security (RLS)
ALTER TABLE newsletter_enquiries ENABLE ROW LEVEL SECURITY;

-- Create policy for public insert (for newsletter subscriptions)
CREATE POLICY "Allow public to insert newsletter enquiries" ON newsletter_enquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy for authenticated users to read all enquiries (admin access)
CREATE POLICY "Allow authenticated users to read newsletter enquiries" ON newsletter_enquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for authenticated users to update enquiries (admin access)
CREATE POLICY "Allow authenticated users to update newsletter enquiries" ON newsletter_enquiries
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policy for authenticated users to delete enquiries (admin access)
CREATE POLICY "Allow authenticated users to delete newsletter enquiries" ON newsletter_enquiries
  FOR DELETE
  TO authenticated
  USING (true);
```

### After Migration:

Newsletter subscriptions from the footer will be stored in the database and visible in the admin panel at `/admin/dashboard/newsletter-enquiry`.
