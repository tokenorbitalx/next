'use client'

import { useState } from 'react'
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'

const videos = [
  {
    id: 'GHstipo-hCM',
    title: 'Video 1',
    url: 'https://www.youtube.com/embed/GHstipo-hCM',
  },
  {
    id: 'BzX8Yt7YhCw',
    title: 'Video 2',
    url: 'https://www.youtube.com/embed/BzX8Yt7YhCw',
  },
  {
    id: 'Uz8pmMyGZFU',
    title: 'Video 3',
    url: 'https://www.youtube.com/embed/Uz8pmMyGZFU',
  },
  {
    id: 'X1Wt0FQYvt8',
    title: 'Video 4',
    url: 'https://www.youtube.com/embed/X1Wt0FQYvt8',
  },
]

export default function VideoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length)
  }

  const previousVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length)
  }

  const openInYouTube = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank', 'noopener,noreferrer')
  }


  return (
    <div className="w-full bg-[#e9f5f3] rounded-2xl mt-20 mb-5 relative">
      <div className="relative h-48">
        <iframe
          src={`${videos[currentIndex].url}?enablejsapi=1&rel=0`}
          title={videos[currentIndex].title}
          className="w-full h-full rounded-2xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>

      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          onClick={previousVideo}
          className="bg-black/70 text-white p-1.5 rounded-full hover:bg-black/90 transition-colors ml-2"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          onClick={nextVideo}
          className="bg-black/70 text-white p-1.5 rounded-full hover:bg-black/90 transition-colors mr-2"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-2 pb-2">
        {videos.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

