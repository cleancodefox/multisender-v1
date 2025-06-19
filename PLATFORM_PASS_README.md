# Platform Pass System Implementation

## Overview

This implementation adds a platform pass system to the Multisender application with NFT-based authentication and subscription management.

## Features Implemented

### 1. Pass Types
- **Free Pass**: Pay-per-use model (0.0001 SOL per recipient)
- **3-Day Pass**: Unlimited transfers for 3 days (8.5 SOL)
- **Lifetime Pass**: Unlimited transfers forever (20 SOL)

### 2. NFT Minting
- Uses Metaplex Foundation JS for NFT creation
- Each paid pass is minted as an NFT on Solana
- NFT serves as proof of subscription
- Metadata includes pass type, duration, and platform information

### 3. Storage & Database
- Currently uses localStorage for demo purposes
- Easy to replace with proper database (Firebase, Supabase, etc.)
- Stores pass information including mint address and expiry dates

### 4. UI Components
- `PassCardSection`: Display and purchase passes
- `SubscriptionBanner`: Show current subscription status
- Visual indicators for active passes and expiry dates

## Files Modified/Created

### New Files:
- `src/hooks/usePlatformPass.ts` - Main platform pass logic
- `src/components/SubscriptionBanner.tsx` - Subscription status display
- `src/utils/platformPass.ts` - Constants and utility functions
- `PLATFORM_PASS_README.md` - This documentation

### Modified Files:
- `src/types/index.ts` - Added pass-related types
- `src/components/PassCardSection.tsx` - Integrated NFT purchasing
- `src/pages/Index.tsx` - Added subscription checking

## Usage

### For Users:
1. Connect wallet to see subscription status
2. Purchase passes through the PassCardSection
3. NFT is minted and stored in wallet
4. Subscription status is tracked and displayed

### For Developers:
```typescript
// Check subscription status
const { subscriptionStatus, purchasePass } = usePlatformPass();

// Purchase a pass
const result = await purchasePass(PassType.THREE_DAY);

// Check if user has valid subscription
const hasAccess = hasValidSubscription();
```

## Database Schema

The current implementation stores:
```typescript
interface PlatformPass {
  id: string;
  type: PassType;
  walletAddress: string;
  mintAddress: string;
  purchaseDate: Date;
  expiryDate?: Date;
  isActive: boolean;
  transactionSignature: string;
}
```

## Future Enhancements

1. **Real Database Integration**: Replace localStorage with proper database
2. **On-chain Verification**: Verify NFT ownership directly from blockchain
3. **Pass Features**: Implement actual restrictions/benefits for different pass types
4. **Analytics**: Track usage patterns and subscription metrics
5. **Refunds**: Handle pass cancellations and refunds
6. **Upgrades**: Allow upgrading from one pass type to another

## Security Considerations

- Wallet connection required for all pass operations
- NFT minting uses user's wallet for signatures
- Pass verification happens on every wallet connection
- Expiry dates are checked in real-time

## Configuration

Pass prices and features can be modified in:
- `src/utils/platformPass.ts` - Display constants
- `src/hooks/usePlatformPass.ts` - Pricing logic

## Testing

The system works on both devnet and mainnet. For testing:
1. Use devnet for development
2. Ensure wallet has sufficient SOL for pass purchases
3. Check console logs for detailed transaction information

## Notes

- This is a foundational implementation
- All pass features are currently cosmetic (no actual restrictions)
- Ready for production with proper database backend
- NFTs are stored in user's wallet and can be transferred 