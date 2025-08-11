'use client'

import Link from 'next/dist/client/link'
import Logo from './logo'
import { IconSearch, IconShoppingCart, IconUser, IconLogout, IconMenu2, IconX, IconChevronDown } from '@tabler/icons-react'
import { useAuth } from '../../lib/use-auth'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { createClient } from '../../lib/supabase/supabase'
import { SubMenuHeaderDropdowInterface } from './header/menu-header-dropdown'
import MenuHeaderDropdown from './header/menu-header-dropdown'
import SupabaseCategory from '../../lib/supabase/supabase.categories'
import SupabaseUser from '../../lib/supabase/supabase.users'

// Utility small components
const PrimaryButton = ({ className = '', children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        className={`flex items-center justify-center h-10 rounded-lg bg-[#244740] text-white gap-2 text-sm font-bold tracking-[0.015em] px-2.5 transition-colors duration-200 hover:bg-[#2f5c53] focus:outline-none focus:ring-2 focus:ring-primary/40 ${className}`}
        {...rest}
    >{children}</button>
)

const GhostIconButton = ({ isOpen, ...rest }: { isOpen: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
        className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#244740] text-white transition-colors duration-200 hover:bg-[#2f5c53] focus:outline-none focus:ring-2 focus:ring-primary/40"
        {...rest}
    >
        {isOpen ? <IconX /> : <IconMenu2 />}
    </button>
)

export default function Header() {
    const { user, signOut } = useAuth()
    const [showDropdown, setShowDropdown] = useState(false)
    const [isSupabaseConfigured, setIsSupabaseConfigured] = useState(true)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [showMobileCategories, setShowMobileCategories] = useState(false)
    const [menuCategories, setMenuCategories] = useState<SubMenuHeaderDropdowInterface[]>([])
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    // Fetch categories + role
    useEffect(() => {
        const supabase = createClient()
        setIsSupabaseConfigured(!!supabase)
        const fetchData = async () => {
            try {
                const supabase_category = new SupabaseCategory()
                const data_categories = await supabase_category.getCategories()
                const submenuCategories: SubMenuHeaderDropdowInterface[] = data_categories
                    .sort((a, b) => a.order - b.order)
                    .map(cat => ({ id: cat.id, text: cat.name, slug: cat.slug }))
                setMenuCategories(submenuCategories)
                supabase?.auth.getUser().then(async ({ data: { user } }) => {
                    if (user) {
                        const supabase_user = new SupabaseUser()
                        if (await supabase_user.userIsRole(user.id, 'admin')) setIsAdmin(true)
                    }
                }).catch((error) => {
                    console.error('Error fetching user:', error)
                    setIsSupabaseConfigured(false)
                })
            } catch (error) {
                console.log('Error ', error)
            }
        }
        fetchData()
    }, [])

    // Prevent body scroll when mobile menu open
    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', mobileMenuOpen)
        return () => document.body.classList.remove('overflow-hidden')
    }, [mobileMenuOpen])

    const handleSignOut = useCallback(async () => {
        await signOut()
        setShowDropdown(false)
        setMobileMenuOpen(false)
    }, [signOut])

    // Derived values
    const userDisplayName = useMemo(() => user?.user_metadata?.full_name || user?.email, [user])

    // Anim classes
    const dropdownAnim = 'transition origin-top-right scale-95 opacity-0 data-[enter=true]:scale-100 data-[enter=true]:opacity-100 data-[enter=true]:duration-150 data-[leave=true]:duration-100'

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#244740] px-4 md:px-10 py-3 relative z-50 bg-[#1B2F2B]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1B2F2B]/80">
            {/* Logo + Desktop Nav */}
            <div className="flex items-center gap-4 md:gap-8 flex-1 min-w-0">
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="flex items-center justify-center h-6 w-6 transition-transform group-hover:scale-110">
                        <Logo />
                    </div>
                    <h2 className="text-white text-lg font-bold tracking-[-0.015em] group-hover:text-primary transition-colors">Surcoteca</h2>
                </Link>
                <nav className="hidden md:flex items-center gap-6 xl:gap-9">
                    <Link href="/" className="nav-link">Inicio</Link>
                    <MenuHeaderDropdown name="Categorias" submenuItems={menuCategories} />
                    <Link href="/" className="nav-link">Ofertas</Link>
                    <Link href="/" className="nav-link">Novedades</Link>
                    <Link href="/" className="nav-link">Otros productos</Link>
                </nav>
            </div>

            {/* Right section */}
            <div className="flex flex-1 justify-end gap-3 md:gap-6 xl:gap-8 items-center">
                {/* Search */}
                <label className="hidden sm:flex flex-col min-w-40 !h-10 max-w-64 group/search">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full ring-1 ring-transparent focus-within:ring-primary/50 transition">
                        <div className="text-primary flex bg-muted items-center justify-center pl-4 rounded-l-lg">
                            <IconSearch className="transition-colors group-focus-within/search:text-primary" />
                        </div>
                        <input
                            placeholder="Buscar productos..."
                            className="form-input flex w-full flex-1 rounded-lg text-foreground focus:outline-none bg-muted h-full placeholder:text-primary/60 px-3 rounded-l-none text-base font-normal leading-normal focus:ring-0 focus:border-none"
                        />
                    </div>
                </label>

                {/* Desktop auth + cart */}
                <div className="hidden md:flex gap-2 relative items-center">
                    {isSupabaseConfigured ? (
                        user ? (
                            <div className="relative">
                                <PrimaryButton
                                    onClick={() => setShowDropdown(v => !v)}
                                    className="max-w-[240px] pr-3 pl-2"
                                >
                                    {user.user_metadata?.avatar_url ? (
                                        <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-7 h-7 rounded-full ring-1 ring-primary/30" />
                                    ) : (
                                        <IconUser />
                                    )}
                                    <span className="hidden lg:inline whitespace-nowrap max-w-[140px] truncate">{userDisplayName}</span>
                                    <IconChevronDown className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} size={16} />
                                </PrimaryButton>
                                {showDropdown && (
                                    <div
                                        className="absolute right-0 mt-2 w-56 bg-[#24322F] border border-[#2f4d46] rounded-lg shadow-lg overflow-hidden animate-fade-in"
                                    >
                                        <ul className="py-2 text-sm text-white/90">
                                            <li>
                                                <Link href="/profile" className="menu-item-link" onClick={() => setShowDropdown(false)}>Mi Perfil</Link>
                                            </li>
                                            <li>
                                                <Link href="/orders" className="menu-item-link" onClick={() => setShowDropdown(false)}>Mis Pedidos</Link>
                                            </li>
                                            {isAdmin && (
                                                <li>
                                                    <Link href="/admin" className="menu-item-link font-semibold" onClick={() => setShowDropdown(false)}>Panel de Admin</Link>
                                                </li>
                                            )}
                                            <li className="my-1 border-t border-[#2f4d46]" />
                                            <li>
                                                <button onClick={handleSignOut} className="menu-item-link text-red-400 hover:text-red-300">
                                                    <IconLogout className="inline mr-2 h-4 w-4" /> Cerrar Sesión
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/login">
                                <PrimaryButton>
                                    <IconUser />
                                    <span className="hidden lg:inline">Iniciar Sesión</span>
                                </PrimaryButton>
                            </Link>
                        )
                    ) : (
                        <PrimaryButton disabled className="opacity-50 cursor-not-allowed">
                            <IconUser />
                            <span className="hidden lg:inline">Login No Disponiblee</span>
                        </PrimaryButton>
                    )}
                    <PrimaryButton aria-label="Carrito">
                        <IconShoppingCart />
                    </PrimaryButton>
                </div>

                {/* Mobile hamburger */}
                <div className="flex md:hidden items-center gap-2">
                    <GhostIconButton isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(v => !v)} />
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden fixed inset-y-0 left-0 right-0 z-40 ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}> {/* container keeps layering */}
                <div
                    className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setMobileMenuOpen(false)}
                />
                <aside
                    className={`fixed top-0 left-0 right-0 pt-[68px] origin-top transition-[opacity,transform] duration-300 ease-out ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'} bg-[#1B2F2B] border-b border-[#244740] px-4 pb-6 shadow-lg`}
                >
                    <nav className="flex flex-col gap-4 animate-slide-down">
                        <Link onClick={() => setMobileMenuOpen(false)} href="/" className="mobile-link">Inicio</Link>
                        <button
                            onClick={() => setShowMobileCategories(v => !v)}
                            className="mobile-link flex justify-between items-center"
                        >
                            <span>Categorías</span>
                            <IconChevronDown className={`transition-transform ${showMobileCategories ? 'rotate-180' : ''}`} size={18} />
                        </button>
                        <div className={`grid overflow-hidden transition-all duration-300 ${showMobileCategories ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0'} pl-2`}>
                            <div className="min-h-0 flex flex-col gap-2">
                                {menuCategories.map(cat => (
                                    <Link key={cat.id} href={`/category/${cat.slug}`} onClick={() => setMobileMenuOpen(false)} className="text-white/80 text-sm hover:text-primary transition-colors">{cat.text}</Link>
                                ))}
                            </div>
                        </div>
                        <Link onClick={() => setMobileMenuOpen(false)} href="/" className="mobile-link">Ofertas</Link>
                        <Link onClick={() => setMobileMenuOpen(false)} href="/" className="mobile-link">Novedades</Link>
                        <Link onClick={() => setMobileMenuOpen(false)} href="/" className="mobile-link">Otros productos</Link>
                        <hr className="border-[#244740]" />
                        {isSupabaseConfigured ? (
                            user ? (
                                <div className="flex flex-col gap-2 animate-fade-in">
                                    <div className="flex items-center gap-3">
                                        {user.user_metadata?.avatar_url ? (
                                            <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full ring-1 ring-primary/30" />
                                        ) : (
                                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#244740] text-white"><IconUser size={18} /></div>
                                        )}
                                        <span className="text-white text-sm font-semibold truncate">{userDisplayName}</span>
                                    </div>
                                    <Link href="/profile" onClick={() => setMobileMenuOpen(false)} className="mobile-sub-link">Mi Perfil</Link>
                                    <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="mobile-sub-link">Mis Pedidos</Link>
                                    {isAdmin && <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="mobile-sub-link font-semibold">Panel de Admin</Link>}
                                    <button onClick={handleSignOut} className="text-red-400 text-sm text-left mt-2 flex items-center gap-1 hover:text-red-300 transition-colors">
                                        <IconLogout size={16} /> Cerrar Sesión
                                    </button>
                                </div>
                            ) : (
                                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="mobile-cta">Iniciar Sesión</Link>
                            )
                        ) : (
                            <span className="text-white/60 text-sm">Login No Disponibleee</span>
                        )}
                        <button className="mobile-cta flex items-center gap-2 justify-center mt-2"><IconShoppingCart size={18} /> Carrito</button>
                    </nav>
                </aside>
            </div>
        </header>
    )
}

// Utility / style atoms (Tailwind compose through @apply if using plugin, else classes kept here) - optional extraction
// You can move these to a CSS module or global layer if you prefer.
// nav-link, mobile-link, etc.