import { supabase, type PlatformPassRow } from '@/lib/supabase';
import { PlatformPass, PassType } from '@/types';

export class PlatformPassService {
  
  /**
   * Convert database row to PlatformPass type
   */
  private static fromDbRow(row: PlatformPassRow): PlatformPass {
    return {
      id: row.id,
      type: row.type,
      walletAddress: row.wallet_address,
      mintAddress: row.mint_address,
      purchaseDate: new Date(row.purchase_date),
      expiryDate: row.expiry_date ? new Date(row.expiry_date) : undefined,
      isActive: row.is_active,
      transactionSignature: row.transaction_signature,
    };
  }

  /**
   * Convert PlatformPass to database row format
   */
  private static toDbRow(pass: PlatformPass): Omit<PlatformPassRow, 'created_at' | 'updated_at'> {
    return {
      id: pass.id,
      type: pass.type,
      wallet_address: pass.walletAddress,
      mint_address: pass.mintAddress,
      purchase_date: pass.purchaseDate.toISOString(),
      expiry_date: pass.expiryDate?.toISOString(),
      is_active: pass.isActive,
      transaction_signature: pass.transactionSignature,
    };
  }

  /**
   * Save a new platform pass to the database
   */
  static async savePlatformPass(pass: PlatformPass): Promise<void> {
    console.log('💾 Saving pass to database:', pass);
    
    const dbRow = this.toDbRow(pass);
    
    const { error } = await supabase
      .from('platform_passes')
      .insert(dbRow);

    if (error) {
      console.error('❌ Database error saving pass:', error);
      throw new Error(`Failed to save platform pass: ${error.message}`);
    }

    console.log('✅ Pass saved to database successfully');
  }

  /**
   * Load all platform passes from the database
   */
  static async loadPlatformPasses(): Promise<PlatformPass[]> {
    console.log('📖 Loading all passes from database');
    
    const { data, error } = await supabase
      .from('platform_passes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Database error loading passes:', error);
      throw new Error(`Failed to load platform passes: ${error.message}`);
    }

    const passes = (data || []).map(row => this.fromDbRow(row));
    console.log(`✅ Loaded ${passes.length} passes from database`);
    
    return passes;
  }

  /**
   * Get active pass for a specific wallet address
   */
  static async getActivePassForWallet(walletAddress: string): Promise<PlatformPass | null> {
    console.log('🔍 Checking active pass for wallet:', walletAddress);
    
    const now = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('platform_passes')
      .select('*')
      .eq('wallet_address', walletAddress)
      .eq('is_active', true)
      .or(`expiry_date.is.null,expiry_date.gt.${now}`)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      console.error('❌ Database error checking active pass:', error);
      throw new Error(`Failed to check active pass: ${error.message}`);
    }

    if (!data || data.length === 0) {
      console.log('ℹ️ No active pass found for wallet');
      return null;
    }

    const pass = this.fromDbRow(data[0]);
    console.log('✅ Found active pass:', pass.type);
    
    return pass;
  }

  /**
   * Get passes by wallet address
   */
  static async getPassesByWallet(walletAddress: string): Promise<PlatformPass[]> {
    console.log('📋 Getting all passes for wallet:', walletAddress);
    
    const { data, error } = await supabase
      .from('platform_passes')
      .select('*')
      .eq('wallet_address', walletAddress)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Database error getting passes by wallet:', error);
      throw new Error(`Failed to get passes by wallet: ${error.message}`);
    }

    const passes = (data || []).map(row => this.fromDbRow(row));
    console.log(`✅ Found ${passes.length} passes for wallet`);
    
    return passes;
  }

  /**
   * Deactivate a pass (soft delete)
   */
  static async deactivatePass(passId: string): Promise<void> {
    console.log('🔇 Deactivating pass:', passId);
    
    const { error } = await supabase
      .from('platform_passes')
      .update({ is_active: false })
      .eq('id', passId);

    if (error) {
      console.error('❌ Database error deactivating pass:', error);
      throw new Error(`Failed to deactivate pass: ${error.message}`);
    }

    console.log('✅ Pass deactivated successfully');
  }

  /**
   * Get pass by mint address
   */
  static async getPassByMintAddress(mintAddress: string): Promise<PlatformPass | null> {
    console.log('🔍 Getting pass by mint address:', mintAddress);
    
    const { data, error } = await supabase
      .from('platform_passes')
      .select('*')
      .eq('mint_address', mintAddress)
      .limit(1);

    if (error) {
      console.error('❌ Database error getting pass by mint address:', error);
      throw new Error(`Failed to get pass by mint address: ${error.message}`);
    }

    if (!data || data.length === 0) {
      console.log('ℹ️ No pass found with mint address');
      return null;
    }

    const pass = this.fromDbRow(data[0]);
    console.log('✅ Found pass by mint address');
    
    return pass;
  }

  /**
   * Update pass expiry date
   */
  static async updatePassExpiry(passId: string, expiryDate: Date | null): Promise<void> {
    console.log('📅 Updating pass expiry:', passId, expiryDate);
    
    const { error } = await supabase
      .from('platform_passes')
      .update({ expiry_date: expiryDate?.toISOString() || null })
      .eq('id', passId);

    if (error) {
      console.error('❌ Database error updating pass expiry:', error);
      throw new Error(`Failed to update pass expiry: ${error.message}`);
    }

    console.log('✅ Pass expiry updated successfully');
  }

  /**
   * Get analytics data
   */
  static async getAnalytics() {
    console.log('📊 Getting analytics data');
    
    const { data, error } = await supabase
      .from('platform_passes')
      .select('type, is_active, created_at');

    if (error) {
      console.error('❌ Database error getting analytics:', error);
      throw new Error(`Failed to get analytics: ${error.message}`);
    }

    const analytics = {
      totalPasses: data?.length || 0,
      activePasses: data?.filter(p => p.is_active).length || 0,
      byType: {
        [PassType.FREE]: data?.filter(p => p.type === PassType.FREE).length || 0,
        [PassType.THREE_DAY]: data?.filter(p => p.type === PassType.THREE_DAY).length || 0,
        [PassType.LIFETIME]: data?.filter(p => p.type === PassType.LIFETIME).length || 0,
      }
    };

    console.log('✅ Analytics data retrieved:', analytics);
    return analytics;
  }

  /**
   * Test database connection
   */
  static async testConnection(): Promise<boolean> {
    try {
      console.log('🔌 Testing database connection...');
      
      const { data, error } = await supabase
        .from('platform_passes')
        .select('count')
        .limit(1);

      if (error) {
        console.error('❌ Database connection test failed:', error);
        return false;
      }

      console.log('✅ Database connection successful');
      return true;
    } catch (error) {
      console.error('❌ Database connection test error:', error);
      return false;
    }
  }
} 