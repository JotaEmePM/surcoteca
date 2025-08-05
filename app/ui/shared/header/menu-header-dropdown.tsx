import { IconCaretDown } from '@tabler/icons-react'
import Link from 'next/link'
import { useState } from 'react'

export type SubMenuHeaderDropdowInterface = {
    id: string
    text: string
}
export interface MenuHeaderDropdownInterface {
    name: string,
    submenuItems: SubMenuHeaderDropdowInterface[]
}
export default function MenuHeaderDropdown({ name, submenuItems }: MenuHeaderDropdownInterface) {
    const [showDropdown, setShowDropdown] = useState(false)
    return (
        <div className="relative">
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-white text-sm font-medium leading-normal flex"
            >
                {name}
                <IconCaretDown />
            </button>

            {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                    <div className="py-1">

                        {submenuItems.map((cat) => (
                            <Link
                                key={cat.id}
                                id={cat.id}
                                href={`/category/${cat.id}`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setShowDropdown(false)}
                            >
                                {cat.text}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}