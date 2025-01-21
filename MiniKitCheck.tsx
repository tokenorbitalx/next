'use client'

import { useState, useEffect } from 'react'

interface MiniKitCheckProps {
  onInstalled: () => void;
}

export default function MiniKitCheck({ onInstalled }: MiniKitCheckProps) {
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Check if running in browser
    if (typeof window !== 'undefined') {
      // Check if World App is installed
      const isWorldAppInstalled = 'WorldApp' in window || 'worldcoin' in window
      if (!isWorldAppInstalled) {
        setShowPrompt(true)
      } else {
        onInstalled()
      }
    }
  }, [onInstalled])

  if (!showPrompt) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">World App Required</h3>
        <p className="text-gray-600 mb-6">
          Para usar esta aplicación, necesitas tener World App (MiniKit) instalado. Por favor, instala World App para continuar.
        </p>
        <div className="flex flex-col gap-3">
          <a
            href="https://worldcoin.org/world-app"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700 transition-colors"
          >
            Instalar World App
          </a>
          <button
            onClick={() => {
              setShowPrompt(false)
              onInstalled()
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Ya tengo World App instalado
          </button>
        </div>
      </div>
    </div>
  )
}

