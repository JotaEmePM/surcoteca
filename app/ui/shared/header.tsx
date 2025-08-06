'use client'

import Link from 'next/dist/client/link'
import Logo from './logo'
import { IconSearch, IconShoppingCart, IconUser, IconLogout } from '@tabler/icons-react'
import { useAuth } from '../../lib/use-auth'
import { useState, useEffect } from 'react'
import { createClient } from '../../lib/supabase/supabase'

import { Category } from '../../lib/models/categories'
import { SubMenuHeaderDropdowInterface } from './header/menu-header-dropdown'
import MenuHeaderDropdown from './header/menu-header-dropdown'
import SupabaseCategory from '../../lib/supabase/supabase.categories'
import SupabaseUser, { UserRole } from '../../lib/supabase/supabase.users'


export default function Header() {
    const { user, signOut, loading } = useAuth()
    const [showDropdown, setShowDropdown] = useState(false)
    const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(true)

    const [menuCategories, setMenuCategories] = useState<SubMenuHeaderDropdowInterface[]>([])
    const [roles, setRoles] = useState<UserRole | null>(null)

    useEffect(() => {
        const supabase = createClient()
        setIsSupabaseConfigured(!!supabase)

        const fetchData = async () => {
            try {
                const supabase_category = new SupabaseCategory()
                const data_categories = await supabase_category.getCategories()

                const submenuCategories: SubMenuHeaderDropdowInterface[] = []
                data_categories
                    .sort((a, b) => a.order - b.order)
                    .map((cat) => {
                        submenuCategories.push({
                            id: cat.id,
                            text: cat.name,
                            slug: cat.slug
                        })
                    })
                setMenuCategories(submenuCategories)

                console.log('Categories fetched:', submenuCategories)
                console.log('User:', user)
                if (user) {
                    const supabase_user = new SupabaseUser()
                    const userRoles = await supabase_user.getUserRoles(user.id)
                    setRoles(userRoles as UserRole || null)
                    console.log('User roles fetched:', userRoles)
                }
            } catch (error) {
                console.log('Error ', error)
            }

        }

        fetchData()
    }, [])

    const handleSearchSubmit = () => {
        console.log('search')
    }

    const handleSearchChange = () => {
        console.log('search change')
    }

    const handleSignOut = async () => {
        await signOut()
        setShowDropdown(false)
    }

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#244740] px-10 py-3">
            <div className="flex items-center gap-8">
                <Link href="/">
                    <div className="flex items-center gap-4 text-white">
                        <div className="flex items-center justify-center h-6 w-6">
                            <Logo />
                        </div>
                        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Surcoteca</h2>
                    </div>
                </Link>
                <div className="flex items-center gap-9">
                    <Link href="/" className="text-white text-sm font-medium leading-normal hover:text-cyan-100 transition-colors">Inicio</Link>
                    <MenuHeaderDropdown name="Categorias" submenuItems={menuCategories} />
                    <Link href="/" className="text-white text-sm font-medium leading-normal">Ofertas</Link>
                    <Link href="/" className="text-white text-sm font-medium leading-normal">Novedades</Link>
                    <Link href="/" className="text-white text-sm font-medium leading-normal">Otros productos</Link>
                </div>
            </div>
            <div className="flex flex-1 justify-end gap-8">
                <label className="flex flex-col min-w-40 !h-10 max-w-64">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                        <div
                            className="text-primary flex border-none bg-muted items-center justify-center pl-4 rounded-l-lg border-r-0"
                            data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
                            <IconSearch />
                        </div>
                        <input placeholder="Buscar productos..."
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-0 focus:ring-0 border-none bg-muted focus:border-none h-full placeholder:text-primary px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                            value="" onChange={handleSearchChange} onClick={handleSearchSubmit} />
                    </div>
                </label>
                <div className="flex gap-2 relative">
                    {isSupabaseConfigured ? (
                        user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#244740] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
                                >
                                    {user.user_metadata?.avatar_url ? (
                                        <img
                                            src={user.user_metadata.avatar_url}
                                            alt="Avatar"
                                            className="w-6 h-6 rounded-full"
                                        />
                                    ) : (
                                        <IconUser />
                                    )}
                                    <span className="hidden sm:inline">{user.user_metadata?.full_name || user.email}</span>
                                </button>
                                <>{roles && roles.roles.map(role => (
                                    <span key={role.id} className="text-xs text-gray-500">{role.name}</span>
                                ))}</>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                                        <div className="py-1">
                                            <Link
                                                href="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                Mi Perfil
                                            </Link>
                                            <Link
                                                href="/orders"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                Mis Pedidos
                                            </Link>
                                            <hr className="my-1" />
                                            <button
                                                onClick={handleSignOut}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                            >
                                                <IconLogout className="inline mr-2 h-4 w-4" />
                                                Cerrar Sesión
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/login">
                                <button
                                    className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#244740] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
                                >
                                    <IconUser />
                                    <span className="hidden sm:inline">Iniciar Sesión</span>
                                </button>
                            </Link>
                        )
                    ) : (
                        <button
                            disabled
                            className="flex max-w-[480px] cursor-not-allowed items-center justify-center overflow-hidden rounded-lg h-10 bg-gray-400 text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5 opacity-50"
                        >
                            <IconUser />
                            <span className="hidden sm:inline">Login No Disponible</span>
                        </button>
                    )}

                    <button
                        className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#244740] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
                    >
                        <IconShoppingCart />
                    </button>
                </div>

            </div>
        </header>
    )
}