import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Loader2, Clock } from 'lucide-react';

interface TransferProgress {
  current: number;
  total: number;
  completed: string[];
  failed: string[];
  currentBatch: number;
  totalBatches: number;
}

interface TransferProgressProps {
  progress: TransferProgress;
  assetSymbol: string;
}

export const TransferProgress = ({ progress, assetSymbol }: TransferProgressProps) => {
  const progressPercentage = (progress.current / progress.total) * 100;
  const batchProgressPercentage = (progress.currentBatch / progress.totalBatches) * 100;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="text-center">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
          Sending {assetSymbol} to Recipients
        </h3>
        <p className="text-sm sm:text-base text-gray-600">
          Processing {progress.total} transfers in {progress.totalBatches} batch{progress.totalBatches > 1 ? 'es' : ''}
        </p>
      </div>

      {/* Overall Progress */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm text-gray-600">
            {progress.current} / {progress.total} transfers
          </span>
        </div>
        <Progress value={progressPercentage} className="h-3" />
        <div className="text-center text-lg font-semibold text-gray-900">
          {Math.round(progressPercentage)}% Complete
        </div>
      </div>

      {/* Batch Progress */}
      {progress.totalBatches > 1 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Batch Progress</span>
            <span className="text-sm text-gray-600">
              {progress.currentBatch} / {progress.totalBatches} batches
            </span>
          </div>
          <Progress value={batchProgressPercentage} className="h-2" />
        </div>
      )}

      {/* Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <Clock className="h-5 w-5 text-blue-600" />
          <div>
            <div className="text-sm font-medium text-blue-900">Processing</div>
            <div className="text-xs text-blue-600">
              {progress.total - progress.completed.length - progress.failed.length} remaining
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <div className="text-sm font-medium text-green-900">Completed</div>
            <div className="text-xs text-green-600">{progress.completed.length} transfers</div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
          <XCircle className="h-5 w-5 text-red-600" />
          <div>
            <div className="text-sm font-medium text-red-900">Failed</div>
            <div className="text-xs text-red-600">{progress.failed.length} transfers</div>
          </div>
        </div>
      </div>

      {/* Current Batch Status */}
      {progress.currentBatch > 0 && (
        <div className="flex items-center justify-center gap-2 p-4 bg-gray-50 rounded-lg">
          <Loader2 className="h-5 w-5 animate-spin text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            Processing batch {progress.currentBatch} of {progress.totalBatches}...
          </span>
        </div>
      )}

      {/* Failed Addresses (if any) */}
      {progress.failed.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-red-900">Failed Transfers:</h4>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {progress.failed.map((address, index) => (
              <div key={index} className="text-xs font-mono text-red-700 bg-red-50 p-2 rounded">
                {address.slice(0, 8)}...{address.slice(-8)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 