"use client";

import { useState } from "react";

export default function AccountWindow() {
    const [currentTab, setCurrentTav] = useState("login");

    return <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-900 flex flex-col items-center">
        <div>
            <button className="p-4 uppercase">Switch</button>
            <button className="p-4 uppercase">Login</button>
            <button className="p-4 uppercase">Create</button>
        </div>
        <form className="flex flex-col">
            <input/>
            <button className="bg-amber-600 text-xl p-2">Set username</button>
        </form>
    </div>
}