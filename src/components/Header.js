"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount } from "@/context/AccountContext";
import { shorten } from "@/helpers/helpers";
import { createPortal } from "react-dom";

import Image from "next/image";
import Link from "next/link";
import Login from "./Login";
import AccountInfo from "./AccountInfo";
import Overlay from "./Overlay";
import Dropdown from "./Dropdown";

const pages = ["Fleet", "Systems", "Contracts", "Guide"];

export default function Header() {
    const { account } = useAccount();
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [openedWindow, setOpenedWindow] = useState(""); // accountInfo, login

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

    return (
    <header className="mb-5 bg-stone-900 flex-between text-stone-100 px-10">
        <div className="flex items-center gap-14">
            <Image src="/logo.svg" height={68}  width={68} alt="logo" className="scale-90"/>

            <nav className="flex">
                {pages.map(page => 
                <Link
                key={page}
                href={`/${page.toLowerCase()}`}
                className="text-xl item-hover-color px-4 py-2 rounded-primary">
                    {page}
                </Link>)}
            </nav>
        </div>

        <div className="flex items-center space-x-4">
            <span className="credits rounded-3xl py-2 px-4 text-xl">{shorten(account.credits)} credits</span>
            <div ref={ref} className="relative">
                <button
                data-testid="account"
                onClick={handleOpenDropdown}
                className="btn btn-color hover:btn-color-reversed text-xl">{account.name || "..."}</button>

                {isDropDownOpen &&
                <Dropdown options={[
                    {name: "View account", handler: handleOpenAccountInfo},
                    {name: "Switch account", handler: handleOpenLogin}
                ]}/>}
            </div>
        </div>

        {openedWindow === "accountInfo" && createPortal(<>
            <AccountInfo token={account.token}/>
            <Overlay onClose={setOpenedWindow}/>
        </>, document.body)
        }

        {(!Object.keys(account).length || openedWindow === "login") && createPortal(<>
            <Login onClose={setOpenedWindow}/>
            <div className="z-[500] absolute bg-stone-950 inset-0"></div>
        </>,document.body)}
    </header>)
}
