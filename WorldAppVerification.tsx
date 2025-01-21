'use client'

import { useEffect, useState, useRef } from 'react'
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'

interface WorldAppVerificationProps {
  app_id: string;
  onVerificationSuccess: () => void;
}

interface VerificationCache {
  nullifier_hash: string;
  credential: any;
  timestamp: number;
}

export default function WorldAppVerification({ app_id, onVerificationSuccess }: WorldAppVerificationProps) {
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const credentialCacheKey = `worldcoin_credential_${app_id}`;

  useEffect(() => {
    // Check for cached verification
    const checkCachedVerification = () => {
      const cachedVerification = localStorage.getItem(credentialCacheKey);
      if (cachedVerification) {
        try {
          const cache: VerificationCache = JSON.parse(cachedVerification);
          const expirationTime = 24 * 60 * 60 * 1000; // 24 hours
          if (Date.now() - cache.timestamp < expirationTime) {
            onVerificationSuccess();
            return true;
          } else {
            localStorage.removeItem(credentialCacheKey);
          }
        } catch (error) {
          console.error('Error parsing cached verification:', error);
          localStorage.removeItem(credentialCacheKey);
        }
      }
      return false;
    };

    if (!checkCachedVerification()) {
      const timer = setTimeout(() => {
        const widget = document.querySelector('worldcoin-idkit-widget') as any;
        if (widget) {
          widget.open().catch((error: any) => {
            console.error('Error auto-opening World ID widget:', error);
            setVerificationError('Failed to auto-start verification. Please try manually.');
          });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [app_id, credentialCacheKey, onVerificationSuccess]);

  const verifyProof = async (proof: ISuccessResult) => {
    setIsVerifying(true);
    setVerificationError(null);
    try {
      const response = await fetch('/api/verify-worldcoin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...proof, app_id }),
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      const verificationResult = await response.json();
    
      if (verificationResult.verified) {
        // Cache the successful verification
        localStorage.setItem(credentialCacheKey, JSON.stringify({
          nullifier_hash: verificationResult.nullifier_hash,
          credential: verificationResult.credential,
          timestamp: Date.now()
        }));
        onVerificationSuccess();
        return true;
      } else {
        setVerificationError('Verification failed. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationError('Error during verification. Please try again.');
      return false;
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4">
      <IDKitWidget
        app_id={app_id}
        action="wld"
        onSuccess={verifyProof}
        handleVerify={verifyProof}
        verification_level={VerificationLevel.Device}
        credential_types={['orb', 'phone']}
        enableTelemetry
      >
        {({ open }) => (
          <button
            onClick={open}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            disabled={isVerifying}
          >
            {isVerifying ? 'Verificando...' : 'Verificar con World ID'}
          </button>
        )}
      </IDKitWidget>
      {verificationError && (
        <p className="text-red-500 text-sm">{verificationError}</p>
      )}
    </div>
  );
}

