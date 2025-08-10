import Link from 'next/link'
import Logo from '../../ui/shared/logo'
import { IconHome } from '@tabler/icons-react'

export default function NavigationSidebar() {
    return <aside className="fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 border-r-gray-400 text-white h-screen z-50 border-r w-[290px] -translate-x-full lg:translate-x-0">
        <div className="py-8 flex justify-start gap-4">
            <Logo />
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Surcoteca</h2>
        </div>
        <div className="flex flex-col overflow-y-auto">
            <nav className="mb-6">
                <div className="flex flex-col gap-4">
                    <div>
                        <h2 className="mb-4 text-xs uppercase flex leading-[20px] text-gray-400 justify-start">Menu</h2>
                        <ul className="flex flex-col gap-4">
                            <li>
                                <Link href="/" className="menu-item group menu-item-inactive">
                                    <span className="menu-item-icon-inactive">
                                        <IconHome />
                                    </span>
                                    <span className="menu-item-text">
                                        Inicio
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </aside>
}