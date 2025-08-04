'use client'

import Link from "next/dist/client/link";
import Logo from "./logo";
import { IconFileSmile, IconSearch, IconShoppingCart, IconUser } from "@tabler/icons-react";


export default function Header() {

    const handleSearchSubmit = () => {
        console.log('search')
    }

    const handleSearchChange = () => {
        console.log('search change')
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
                    <Link href="/" className="text-white text-sm font-medium leading-normal">Categorias</Link>
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
                <div className="flex gap-2">
                    <button
                        className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#244740] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
                    >

                        <IconUser />

                    </button>
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