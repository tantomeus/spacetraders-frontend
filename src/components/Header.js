"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount } from "@/context/AccountContext";
import { shorten } from "@/helpers/helpers";
import { createPortal } from "react-dom";
import { FaHamburger } from "react-icons/fa";

import AccountInfo from "./AccountInfo";
import Overlay from "./Overlay";
import Dropdown from "./Dropdown";
import Nav from "./Nav";

export default function Header() {
    const { account, setAccount } = useAccount();
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [openedWindow, setOpenedWindow] = useState(""); // accountInfo

    const ref = useRef();

    function handleOpenDropdown() {
        setIsDropDownOpen((value) => !value);
    }

    function handleOpenAccountInfo() {
        setIsDropDownOpen(false);
        setOpenedWindow("accountInfo");
    }

    function handleOpenLogin() {
        setAccount({});
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
    <header className="px-5 py-2 mb-5 xs:px-10 lg:py-0 bg-stone-900 flex-between text-stone-100">
        <Nav className="hidden lg:flex"/>
        <Nav className={`lg:hidden fixed flex-col top-0 bottom-0 left-0 z-[1000] bg-stone-900 gap-7 p-4 lg:p-0 ${isNavOpen ? "open-nav flex " : "hidden close-nav"}`}
        onClose={() => setIsNavOpen(false)}/>
        <button className="lg:hidden" onClick={() => setIsNavOpen((nav) => !nav)}><FaHamburger className="w-6 h-6 sm:w-8 sm:h-8"/></button>
        {isNavOpen && <Overlay onClose={setIsNavOpen}/>}

        <div className="flex items-center space-x-4">
            <span className="px-4 py-2 text-xs xs:text-base sm:text-lg credits rounded-3xl">{shorten(account.credits)} credits</span>
            <div ref={ref} className="relative">
                <button
                data-testid="account"
                onClick={handleOpenDropdown}
                className="text-xs xs:text-base sm:text-xl btn btn-color hover:btn-color-reversed">{account.name || "..."}</button>

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
    </header>)
}
