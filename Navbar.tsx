import Link from 'next/link'
import Image from 'next/image'

const NavItem = ({ icon, label, href }: { icon: string; label: string; href: string }) => (
  <Link href={href} className="flex flex-col items-center group">
    <div className="relative w-10 h-10 rounded-full bg-secondary p-1 transition-transform transform group-hover:scale-110">
      <Image src={icon} alt={label} layout="fill" objectFit="contain" className="rounded-full" />
    </div>
    <p className="mt-1 text-xs text-black group-hover:text-white transition-colors">{label}</p>
  </Link>
)

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-blue-600 shadow-custom py-2 border-t-2 border-blue-400">
      <div className="container mx-auto flex justify-around items-center">
        <NavItem 
          icon="https://wallet-bussines.github.io/anadir-amigo.png" 
          label="Enviar" 
          href="https://worldcoin.org/mini-app?app_id=app_a4f7f3e62c1de0b9490a5260cb390b56&path=%2Fdashboard" 
        />
        <NavItem 
          icon="https://wallet-bussines.github.io/negociacion-de-comercio-de-propiedades.png" 
          label="Vender" 
          href="/wallet" 
        />
        <NavItem 
          icon="https://wallet-bussines.github.io/historial-de-pedidos.png" 
          label="Historial" 
          href="/history" 
        />
        <NavItem 
          icon="https://wallet-bussines.github.io/apoyo.png" 
          label="Soporte" 
          href="https://api.whatsapp.com/send/?phone=573248092374&text=" 
        />
      </div>
    </nav>
  )
}

