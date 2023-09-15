"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Login from "./Login";
import { useAccount } from "@/context/AccountContext";
import AccountInfo from "./AccountInfo";
import Overlay from "./Overlay";
import { shorten } from "@/helpers/helpers";

const pages = ["Ships", "Systems", "Contracts", "Guide"];

export default function Header() {
    const { account } = useAccount();
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [openedWindow, setOpenedWindow] = useState(false); // accountInfo, login

    const ref = useRef();

    function handleOpenDropdown() {
        setIsDropDownOpen((value) => !value);
    }

    function handleOpenAccountInfo() {
        setIsDropDownOpen(false);
        setOpenedWindow("accountInfo");
    }

    function handleOpenLogin() {
        setOpenedWindow("login");
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
            <Image src="/logo.svg" height={68}  width={68} alt="logo" className="scale-90"/>
            <nav className="flex">
                {pages.map(page => <Link key={page} href={`/${page.toLowerCase()}`} className="text-xl hover:bg-stone-800 px-4 py-2 rounded-md">{page}</Link>)}
            </nav>
        </div>
        <div className="flex items-center space-x-4">
            <span className="text-stone-700 bg-amber-400 rounded-3xl py-2 px-4 text-xl">{shorten(account.credits)} credits</span>
            <div ref={ref} className="relative">
                <button data-testid="account" onClick={handleOpenDropdown} className="btn-color hover:btn-color-hover text-xl">{account.name || "heh"}</button>

                {isDropDownOpen && <div className="z-50 rounded-lg absolute right-0 top-12 flex flex-col w-28 bg-stone-700 divide-y divide-stone-500 overflow-hidden">
                    <button onClick={handleOpenAccountInfo} className="text-xs text-left p-3 hover:bg-stone-600">View account</button>
                    <button onClick={handleOpenLogin} className="text-xs text-left p-3 hover:bg-stone-600">Switch account</button>
                </div>}

            </div>
        </div>

        {openedWindow === "accountInfo" && <>
            <AccountInfo token={account.token}/>
            <Overlay onClose={setOpenedWindow}/>
        </>
        }

        {(!Object.keys(account).length || openedWindow === "login") && <>
            <Login onClose={setOpenedWindow}/>
            <div className="z-[500] absolute bg-stone-950 inset-0"></div>
        </>}
    </header>
}
