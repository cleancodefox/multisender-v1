# Database Setup Guide

## Overview

The platform pass system now uses Supabase as the primary database with localStorage as a fallback. This guide will help you set up the database.

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or sign in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project name (e.g., "multisender-platform")
6. Enter a secure database password
7. Choose your region
8. Click "Create new project"

## 2. Get Your Project Credentials

1. Go to your project dashboard
2. Click on "Settings" in the left sidebar
3. Click on "API"
4. Copy the following values:
   - **Project URL** (e.g., `https://your-project-ref.supabase.co`)
   - **Anon Public Key** (starts with `eyJ...`)

## 3. Set Up Environment Variables

Create a `.env.local` file in your project root:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

Replace `your-project-ref` and `your-supabase-anon-key-here` with your actual values.

## 4. Create the Database Table

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy and paste the following SQL:

```sql
-- Create the platform_passes table
CREATE TABLE IF NOT EXISTS platform_passes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('free', 'three_day', 'lifetime')),
  wallet_address TEXT NOT NULL,
  mint_address TEXT NOT NULL,
  purchase_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expiry_date TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  transaction_signature TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_platform_passes_wallet_address 
ON platform_passes(wallet_address);

CREATE INDEX IF NOT EXISTS idx_platform_passes_mint_address 
ON platform_passes(mint_address);

-- Enable Row Level Security (RLS)
ALTER TABLE platform_passes ENABLE ROW LEVEL SECURITY;

-- Create policies (allows read/write for all users)
-- You can modify these policies based on your security requirements
CREATE POLICY "Allow all operations on platform_passes" 
ON platform_passes FOR ALL 
TO public 
USING (true) 
WITH CHECK (true);

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_platform_passes_updated_at ON platform_passes;
CREATE TRIGGER update_platform_passes_updated_at
  BEFORE UPDATE ON platform_passes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

5. Click "Run" to execute the SQL

## 5. Verify Setup

1. Go to "Table Editor" in the left sidebar
2. You should see the `platform_passes` table
3. The table should have all the columns as defined

## 6. Test the Connection

1. Start your development server: `npm run dev`
2. Open browser console (F12)
3. Connect your wallet
4. You should see database connection logs in the console
5. If the database is unavailable, the system will automatically fall back to localStorage

## Security Considerations

### Row Level Security (RLS)

The current setup allows all operations for demonstration purposes. For production, consider implementing more restrictive policies:

```sql
-- Example: Allow users to only read/write their own passes
CREATE POLICY "Users can only access their own passes" 
ON platform_passes FOR ALL 
TO public 
USING (wallet_address = current_setting('app.current_wallet_address'))
WITH CHECK (wallet_address = current_setting('app.current_wallet_address'));
```

### API Keys

- Never commit your `.env.local` file to version control
- Use different Supabase projects for development and production
- Rotate your API keys regularly

## Backup and Migration

### Export Data

```sql
-- Export all platform passes
SELECT * FROM platform_passes 
ORDER BY created_at DESC;
```

### Import from localStorage

If you have existing data in localStorage, it will continue to work as a fallback until you migrate to the database.

## Analytics Queries

```sql
-- Get pass type distribution
SELECT type, COUNT(*) as count 
FROM platform_passes 
WHERE is_active = true 
GROUP BY type;

-- Get active passes by date
SELECT DATE(created_at) as date, COUNT(*) as passes_created
FROM platform_passes 
WHERE is_active = true
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Get wallet addresses with multiple passes
SELECT wallet_address, COUNT(*) as pass_count
FROM platform_passes 
WHERE is_active = true
GROUP BY wallet_address
HAVING COUNT(*) > 1;
```

## Troubleshooting

### Common Issues

1. **"Database not available"**: Check your environment variables and internet connection
2. **"Failed to save platform pass"**: Verify table exists and RLS policies are correct
3. **"Connection refused"**: Make sure your Supabase URL is correct

### Debug Mode

The system logs all database operations to the console. Check the browser console for detailed error messages.

### Fallback Mode

If the database is unavailable, the system automatically falls back to localStorage. You'll see console messages indicating this fallback behavior. 