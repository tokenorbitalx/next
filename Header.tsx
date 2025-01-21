'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from '@/hooks/useTheme'

export default function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="fixed top-0 left-0 right-0 bg-blue-600 dark:bg-blue-800 shadow-custom z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2" onClick={toggleTheme}>
          <Image 
            src="https://wallet-bussines.github.io/orbita.png" 
            alt="Logo" 
            width={40} 
            height={40} 
            className="rounded-full cursor-pointer" 
          />
          <h1 className="text-xl font-bold text-white">ORBITAL-X</h1>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-black dark:text-white hover:text-white transition-colors">Inicio</Link></li>
            <li><Link href="/wallet" className="text-black dark:text-white hover:text-white transition-colors">Wallet</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

