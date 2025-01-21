'use client'

import { useState } from 'react'
import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit'

export default function WorldcoinIntegration() {
  const [verificationResult, setVerificationResult] = useState<string | null>(null)

  const handleVerify = async (result: ISuccessResult) => {
    try {
      const response = await fetch('/api/verify-worldcoin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      });

      if (response.ok) {
        const { verified } = await response.json();
        setVerificationResult(verified ? 'Verification successful!' : 'Verification failed.');
      } else {
        setVerificationResult('Error occurred during verification.');
      }
    } catch (error) {
      console.error('Error during verification:', error);
      setVerificationResult('Error occurred during verification.');
    }
  }

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold text-primary mb-4">Worldcoin Integration</h3>
      <IDKitWidget
        app_id="app_staging_129259332fd6f93d4fabaadcc5e4ff9d"
        action="test"
        onSuccess={handleVerify}
        handleVerify={handleVerify}
      >
        {({ open }) => <button onClick={open} className="bg-primary text-white px-4 py-2 rounded-md">Verify with Worldcoin</button>}
      </IDKitWidget>
      {verificationResult && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Verification Result:</h4>
          <p className="bg-gray-100 p-2 rounded-md mt-2">{verificationResult}</p>
        </div>
      )}
    </div>
  )
}

