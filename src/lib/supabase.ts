import { createClient } from '@supabase/supabase-js';
import { PassType } from '@/types';

// Supabase configuration
// These should be environment variables in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-supabase-url';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database table schema interfaces
export interface PlatformPassRow {
  id: string;
  type: PassType;
  wallet_address: string;
  mint_address: string;
  purchase_date: string;
  expiry_date?: string;
  is_active: boolean;
  transaction_signature: string;
  created_at?: string;
  updated_at?: string;
}

// SQL for creating the platform_passes table (run this in your Supabase dashboard)
export const CREATE_TABLE_SQL = `
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

-- Create policies (optional - allows read/write for all users for now)
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
`;

export default supabase; 