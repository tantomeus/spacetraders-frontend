"use client";

import { useEffect, useRef, useState } from "react";
import { useAccount } from "@/context/AccountContext";
import { shorten } from "@/helpers/helpers";
import { createPortal } from "react-dom";

import AccountInfo from "./AccountInfo";
import Overlay from "./Overlay";
import Dropdown from "./Dropdown";
import Nav from "./Nav";

export default function Header() {
    const { account, setAccount } = useAccount();
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
    <header className="mb-5 bg-stone-900 flex-between text-stone-100 px-10">

        <Nav/>

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
    </header>)
}
