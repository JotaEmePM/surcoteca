import { JSX } from "react"
import { IconBuildingWarehouse, IconChevronDown, IconHome, IconListDetails, IconSettings } from '@tabler/icons-react'

export type NavItem = {
    id: string;
    label: string;
    href?: string;           // padres pueden no tener href
    icon?: JSX.Element;
    children?: ReadonlyArray<NavItem>;
    match?: 'exact' | 'prefix'; // opcional, default: prefix ("/" es exacto)
};

export const NAV_ITEMS: ReadonlyArray<NavItem> = [
    { id: 'home', label: 'Inicio', href: '/admin', icon: <IconHome />, match: 'exact' },
    {
        id: 'sucursales',
        label: 'Sucursales',
        icon: <IconBuildingWarehouse />,
        children: [
            { id: 'cat-admsucursales', label: 'Administracion', href: '/admin/sucursales' },
            { id: 'cat-admusuarios', label: 'Usuarios', href: '/admin/sucursales/usuarios' },
            { id: 'cat-admstock', label: 'Stock por sucursales', href: '/admin/sucursales/stock' },
            { id: 'cat-admdiscounts', label: 'Descuentos', href: '/admin/sucursales/descuentos' },
        ],
    },
    {
        id: 'catalog',
        label: 'Catálogo',
        icon: <IconListDetails />,
        children: [
            { id: 'cat-admproductos', label: 'productos', href: '/admin/catalog' },
        ],
    },
    {
        id: 'settings',
        label: 'Ajustes',
        icon: <IconSettings />,
        children: [
            { id: 'adm-web', label: 'Configuración Web', href: '/settings/web' },
            { id: 'adm-usuarios', label: 'Usuarios', href: '/settings/users' },
        ],
    },
]