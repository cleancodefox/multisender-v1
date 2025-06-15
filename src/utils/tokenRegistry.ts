interface SolanaTokenListItem {
  address: string;
  chainId: number;
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
  tags?: string[];
}

interface SolanaTokenList {
  name: string;
  logoURI: string;
  keywords: string[];
  tags: Record<string, { name: string; description: string }>;
  timestamp: string;
  tokens: SolanaTokenListItem[];
  version: {
    major: number;
    minor: number;
    patch: number;
  };
}

let tokenListCache: Map<string, SolanaTokenListItem> | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

/**
 * Fetches the official Solana Token List
 */
export const fetchSolanaTokenList = async (): Promise<Map<string, SolanaTokenListItem>> => {
  const now = Date.now();
  
  // Return cache if it's fresh
  if (tokenListCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return tokenListCache;
  }

  try {
    const response = await fetch('https://token-list-api.solana.cloud/v1/list');
    if (!response.ok) {
      throw new Error('Failed to fetch token list');
    }
    
    const tokenList: SolanaTokenList = await response.json();
    
    // Convert array to map for faster lookups
    const tokenMap = new Map<string, SolanaTokenListItem>();
    tokenList.tokens.forEach(token => {
      tokenMap.set(token.address, token);
    });
    
    tokenListCache = tokenMap;
    cacheTimestamp = now;
    
    return tokenMap;
  } catch (error) {
    console.error('Failed to fetch Solana token list:', error);
    
    // Return empty map if fetch fails
    if (!tokenListCache) {
      tokenListCache = new Map();
    }
    
    return tokenListCache;
  }
};

/**
 * Gets token metadata from the registry
 */
export const getTokenMetadata = async (mintAddress: string): Promise<SolanaTokenListItem | null> => {
  try {
    const tokenList = await fetchSolanaTokenList();
    return tokenList.get(mintAddress) || null;
  } catch (error) {
    console.error('Failed to get token metadata:', error);
    return null;
  }
}; 