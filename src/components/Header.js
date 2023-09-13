"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Login from "./Login";
import { useAccount } from "@/context/AccountContext";
import AccountInfo from "./AccountInfo";
import Overlay from "./Overlay";

const pages = ["Ships", "Systems", "Market", "Contracts"]

export default function Header() {
    const { account, setAccount } = useAccount();
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [isAccountInfoOpen, setIsAccountInfoOpen] = useState(false);
    const ref = useRef();

    function handleOpenDropdown() {
        setIsDropDownOpen((value) => !value);
    }

    function handleOpenAccount() {
        setIsDropDownOpen(false);
        setIsAccountInfoOpen(true);
    }

    function handleOpenLogin() {
        setAccount({});
        console.log(!!Object.keys(account).length);
        setIsDropDownOpen(false);
    }

    useEffect(() => {
        function close(e) {
            if(e.target.closest(".relative") === ref.current) return;
            setIsDropDownOpen(false);
        }

        document.body.addEventListener("mousedown", close);

        return function() {
            document.body.removeEventListener("mousedown", close);
        }
    }, []);

    return <header className="mb-5 bg-stone-900 flex items-center justify-between text-stone-100 px-10">
        <div className="flex items-center gap-14">
            <Image src="/logo.svg"height={68}  width={68} alt="logo"/>
            <nav className="flex gap-5">
                {pages.map(page => <Link key={page} href={`/${page.toLowerCase()}`} className="text-xl">{page}</Link>)}
            </nav>
        </div>
        <div className="flex items-center space-x-4">
            <span className="bg-stone-700 rounded-3xl p-2 text-xl">{account.credits} credits</span>
            <div ref={ref} className="relative">
                <button data-testid="account" onClick={handleOpenDropdown} className="btn-color hover:btn-color-hover text-xl">{account.name || "heh"}</button>

                {isDropDownOpen && <div className="z-50 rounded-lg absolute right-0 top-12 flex flex-col w-28 bg-stone-700 divide-y divide-stone-500 overflow-hidden">
                    <button onClick={handleOpenAccount} className="text-xs text-left p-3 hover:bg-stone-600">View account</button>
                    <button onClick={handleOpenLogin} className="text-xs text-left p-3 hover:bg-stone-600">Switch account</button>
                </div>}

            </div>
        </div>

        {isAccountInfoOpen && <>
            <AccountInfo token={account.token}/>
            <Overlay onClose={setIsAccountInfoOpen}/>
        </>
        }

        {!Object.keys(account).length && <>
            <Login />
            <div className="absolute bg-stone-950 inset-0"></div>
        </>}
    </header>
}
