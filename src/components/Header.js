"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AccountWindow from "./AccountWindow";

const pages = ["Ships", "Systems", "Market", "Loans"]

export default function Header() {
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const ref = useRef();

    function handleOpenDropdown() {
        setIsDropDownOpen((value) => !value);
    }

    function handleOpenWindow() {
        setIsAccountOpen(true);
        setIsDropDownOpen(false);
    }

    useEffect(() => {
        function close(e) {
            if(e.target.closest("div") === ref.current) return;
            setIsDropDownOpen(false);
        }

        document.body.addEventListener("mousedown", close);

        return function() {
            document.body.removeEventListener("mousedown", close);
        }
    }, []);

    return <header className="bg-stone-900 flex items-center justify-between text-stone-100 px-10">
        <div className="flex items-center gap-14">
            <Image src="/logo.svg"height={68}  width={68} alt="logo"/>
            <nav className="flex gap-5">
                {pages.map(page => <Link key={page} href={`/${page.toLowerCase()}`} className="text-xl">{page}</Link>)}
            </nav>
        </div>
        <div className="flex items-center space-x-4">
            <span className="bg-stone-700 rounded-3xl p-2 text-xl">200k credits</span>
            <div className="relative">
                <button onClick={handleOpenDropdown} className="bg-amber-600 text-xl p-2">Meres</button>

                {isDropDownOpen && <div ref={ref} className="rounded-lg absolute right-0 top-12 flex flex-col w-28 bg-stone-700 divide-y divide-stone-500 overflow-hidden">
                    <button onClick={handleOpenWindow} className="text-xs text-left p-3 hover:bg-stone-600">View account</button>
                    <button onClick={handleOpenWindow} className="text-xs text-left p-3 hover:bg-stone-600">Switch account</button>
                </div>}

            </div>
        </div>

        {isAccountOpen && <AccountWindow />}
    </header>
}