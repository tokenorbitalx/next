'use client'

import { useState, useRef, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'

interface IframeWrapperProps {
  url: string;
  title?: string;
}

export default function IframeWrapper({ url, title = 'External Content' }: IframeWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [iframeHeight, setIframeHeight] = useState('500px')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (iframeRef.current) {
        setIframeHeight(`${window.innerHeight - 100}px`)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleIframeError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  const openInNewTab = () => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="w-full h-full relative bg-white rounded-lg shadow-custom overflow-hidden" style={{ height: iframeHeight }}>
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 p-4">
          <p className="text-gray-600 mb-4 text-center">
            No se puede cargar el contenido en la ventana emergente debido a restricciones de seguridad.
          </p>
          <button
            onClick={openInNewTab}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Abrir en nueva pestaña
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          src={url}
          title={title}
          className="w-full h-full"
          onLoad={() => setIsLoading(false)}
          onError={handleIframeError}
          style={{ border: 'none', height: '100%' }}
        />
      )}
    </div>
  )
}

