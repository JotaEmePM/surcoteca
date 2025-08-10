'use client'

import Link from 'next/link'
import Logo from '../../ui/shared/logo'
import { IconChevronDown, IconHome } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'
import { JSX, useMemo, useState, type MouseEvent } from 'react'
import { useSidebar } from './Sidebar-Context'

/** ---- Tipos ---- */
type NavItem = {
    id: string;
    label: string;
    href?: string;           // padres pueden no tener href
    icon?: JSX.Element;
    children?: ReadonlyArray<NavItem>;
    match?: 'exact' | 'prefix'; // opcional, default: prefix ("/" es exacto)
};

type ExpandedMap = Record<string, boolean>;

/** ---- Datos de navegación ---- */
const NAV_ITEMS: ReadonlyArray<NavItem> = [
    { id: 'home', label: 'Inicio', href: '/', icon: <IconHome />, match: 'exact' },
    {
        id: 'catalog',
        label: 'Catálogo',
        icon: <IconHome />,
        children: [
            { id: 'cat-vinilos', label: 'Vinilos', href: '/catalog/vinyl' },
            { id: 'cat-equipos', label: 'Equipos', href: '/catalog/gear' },
            { id: 'cat-accesorios', label: 'Accesorios', href: '/catalog/accessories' },
        ],
    },
    {
        id: 'settings',
        label: 'Ajustes',
        icon: <IconHome />,
        children: [
            { id: 'profile', label: 'Perfil', href: '/settings/profile' },
            { id: 'billing', label: 'Facturación', href: '/settings/billing' },
        ],
    },
]

/** ---- Utils de activo ---- */
function matchesPath(href: string, pathname: string, mode?: NavItem['match']): boolean {
    if (href === '/') return pathname === '/'
    if (mode === 'exact') return pathname === href
    return pathname.startsWith(href) // default prefix
}

function isItemActive(item: NavItem, pathname: string, activeItem: string | null): boolean {
    // prioridad: activeItem manual
    if (activeItem) {
        if (item.id === activeItem) return true
        if (item.children?.some((c) => c.id === activeItem)) return true
    }
    // sino, por ruta
    if (item.href && matchesPath(item.href, pathname, item.match)) return true
    if (item.children?.some((c) => c.href && matchesPath(c.href, pathname, c.match))) return true
    return false
}

function itemClasses(isActive: boolean, isCollapsed: boolean): string {
    const base = 'menu-item group flex items-center gap-3 rounded-md px-3 py-2 transition-colors'
    const active = 'bg-white/10 text-white'
    const inactive = 'text-gray-300 hover:bg-white/5 hover:text-white'
    const collapsed = isCollapsed ? 'justify-center' : ''
    return `${base} ${isActive ? active : inactive} ${collapsed}`
}

export default function NavigationSidebar(): JSX.Element {
    const { state, setActiveItem } = useSidebar()
    const pathname = usePathname()

    // expandir padres: por defecto, expande aquellos que tengan algún hijo activo
    const initialExpanded: ExpandedMap = useMemo(() => {
        const map: ExpandedMap = {}
        NAV_ITEMS.forEach((it) => {
            if (it.children && isItemActive(it, pathname, state.activeItem)) {
                map[it.id] = true
            }
        })
        return map
    }, [pathname, state.activeItem])

    const [expanded, setExpanded] = useState<ExpandedMap>(initialExpanded)

    const toggleExpand = (id: string): void =>
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))

    const width = state.isCollapsed ? 'w-[72px]' : 'w-[290px]'
    const translateX = state.isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'

    const renderItem = (item: NavItem): JSX.Element => {
        const active = isItemActive(item, pathname, state.activeItem)
        const isParent = Array.isArray(item.children) && item.children.length > 0
        const isOpen = expanded[item.id] === true

        // Ítem padre (con submenú)
        if (isParent) {
            const onParentClick = (e: MouseEvent<HTMLButtonElement>): void => {
                e.preventDefault()
                // si está colapsado el sidebar, quizá quieras abrirlo primero; aquí solo expandimos el grupo
                toggleExpand(item.id)
                // opcionalmente marcar activo manual al padre:
                setActiveItem(item.id)
            }

            return (
                <li key={item.id}>
                    <button
                        type="button"
                        className={itemClasses(active, state.isCollapsed)}
                        onClick={onParentClick}
                        title={state.isCollapsed ? item.label : undefined}
                        aria-expanded={isOpen}
                    >
                        <span className="shrink-0">{item.icon}</span>
                        {!state.isCollapsed && (
                            <>
                                <span className="menu-item-text flex-1 text-left">{item.label}</span>
                                <IconChevronDown
                                    className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                                />
                            </>
                        )}
                    </button>

                    {/* Submenú */}
                    {!state.isCollapsed && isOpen && (
                        <ul className="mt-1 ml-10 flex flex-col gap-1 border-l border-white/10 pl-3">
                            {item.children!.map((child) => {
                                const childActive = isItemActive(child, pathname, state.activeItem)
                                return (
                                    <li key={child.id}>
                                        <Link
                                            href={child.href ?? '#'}
                                            className={itemClasses(childActive, false)}
                                            onClick={() => setActiveItem(child.id)}
                                            aria-current={childActive ? 'page' : undefined}
                                        >
                                            <span className="menu-item-text">{child.label}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </li>
            )
        }

        // Ítem simple
        return (
            <li key={item.id}>
                <Link
                    href={item.href ?? '#'}
                    className={itemClasses(active, state.isCollapsed)}
                    aria-current={active ? 'page' : undefined}
                    title={state.isCollapsed ? item.label : undefined}
                    onClick={() => setActiveItem(item.id)}
                >
                    <span className="shrink-0">{item.icon}</span>
                    {!state.isCollapsed && <span className="menu-item-text">{item.label}</span>}
                </Link>
            </li>
        )
    }

    return (
        <aside
            className={`fixed mt-16 lg:mt-0 top-0 left-0 z-50 h-screen border-r border-r-gray-400 px-5 text-white transition-transform ${width} ${translateX}`}
            aria-label="Barra lateral de navegación"
        >
            {/* Header */}
            <div className={`py-8 flex ${state.isCollapsed ? 'justify-center' : 'justify-start'} gap-4`}>
                <Logo />
                {!state.isCollapsed && (
                    <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                        Surcoteca
                    </h2>
                )}
            </div>

            {/* Navegación */}
            <div className="flex flex-col overflow-y-auto">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            {!state.isCollapsed && (
                                <h2 className="mb-4 text-xs uppercase flex leading-[20px] text-gray-400">Menu</h2>
                            )}
                            <ul className="flex flex-col gap-2">
                                {NAV_ITEMS.map((it) => renderItem(it))}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    )
}