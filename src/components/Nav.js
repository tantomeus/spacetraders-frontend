import { usePathname } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

const pages = ["Fleet", "Systems", "Contracts", "Guide"];

export default function Nav() {
    const path = usePathname();

    return (
    <div className="flex items-center gap-14">
        <Link href="/">
            <Image src="/logo.svg" height={68}  width={68} alt="logo" className="scale-90"/>
        </Link>

        <nav className="flex gap-2">
            {pages.map(page => 
            <Link
            key={page}
            href={`/${page.toLowerCase()}`}
            className={`text-xl ${path.includes(page.toLowerCase()) ? "bg-stone-700" : "item-hover-color"} px-4 py-2 rounded-primary`}>
                {page}
            </Link>)}
        </nav>
    </div>
    )
}