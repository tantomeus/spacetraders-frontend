import { usePathname } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

const pages = ["Fleet", "Systems", "Contracts", "Guide"];

export default function Nav({ className, onClose }) {
    const path = usePathname();

    return (
    <div className={`flex items-center gap-14 ${className}`}>
        <Link href="/">
            <Image src="/logo.svg" height={68}  width={68} alt="logo" className="w-20 h-20 lg:scale-90 lg:h-16 lg:w-16"/>
        </Link>

        <nav className="flex flex-col gap-2 lg:flex-row ">
            {pages.map(page => 
            <Link
            onClick={onClose}
            key={page}
            href={`/${page.toLowerCase()}`}
            className={`text-lg ${path.includes(page.toLowerCase()) ? "bg-stone-700" : "item-hover-color"} px-4 py-2 rounded-primary`}>
                {page}
            </Link>)}
        </nav>
    </div>
    )
}