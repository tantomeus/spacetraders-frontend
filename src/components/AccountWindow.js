"use client";

import { useAccount } from "@/context/AccountContext";
import { getAgent, signUp } from "@/services/api";
import { useEffect, useState } from "react";

export default function AccountWindow() {
    const oldStorage = JSON.parse(localStorage.getItem("token")) ?? []

    const { account, setAccount } = useAccount();
    const [local, setLocal] = useState(oldStorage);
    const [currentTab, setCurrentTav] = useState("login");
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");

    const switchAcc = currentTab === "switch";
    const login = currentTab === "login";
    const create = currentTab === "create";
    const activeClass = "text-amber-600";

    async function handleSignUp(e) {
        e.preventDefault();
        const data = await signUp(username);

        const acc = {token: data.token, name: data.agent.symbol, credits: data.agent.credits};
        setAccount(acc);

        if (oldStorage?.find((item) => item.name === data.agent.symbol)) return;

        await localStorage.setItem("token", JSON.stringify([acc, ...oldStorage]));
        setLocal(JSON.parse(localStorage.getItem("token")));
    }

    async function handleAuth(e) {
        e.preventDefault();
        const data = await getAgent(token);

        const acc = {token, name: data.symbol, credits: data.credits};
        setAccount(acc);

        if (oldStorage?.find((item) => item.name === data.symbol)) return;

        await localStorage.setItem("token", JSON.stringify([acc, ...oldStorage]));
        setLocal(JSON.parse(localStorage.getItem("token")));
    }

    return <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-900 flex flex-col w-96">
        <div className="flex">
            <button onClick={() => setCurrentTav("switch")} className={`relative py-4 grow uppercase ${switchAcc ? activeClass : ""}`}>
                Switch
                {switchAcc &&  <span className="absolute left-0 bottom-0 bg-amber-600 h-0.5 w-full"></span>}
            </button>
            <button onClick={() => setCurrentTav("login")} className={`relative py-4 grow uppercase ${login ? activeClass : ""}`}>
                Login
                {login && <span className="absolute left-0 bottom-0 bg-amber-600 h-0.5 w-full"></span>}
            </button>
            <button onClick={() => setCurrentTav("create")} className={`relative py-4 grow uppercase ${create ? activeClass : ""}`}>
                Create
                {create && <span className="absolute left-0 bottom-0 bg-amber-600 h-0.5 w-full"></span>}
            </button>
        </div>

        {switchAcc && <ul className="cursor-pointer">
            {local.map((data) => <li className="p-5 hover:bg-stone-700" key={data.token} onClick={() => setAccount(data)}>{data.name}</li>)}
        </ul>
        }

        {currentTab === "login" && <form value={token} onChange={(e) => setToken(e.target.value)}  onSubmit={handleAuth} className="flex flex-col gap-8 p-5">
            <input placeholder="Token" className="bg-transparent border-stone-700 border rounded-md px-3 py-3"/>
            <button className="bg-amber-600 text-xl p-2">Set username</button>
        </form>}

        {currentTab === "create" && <form  onSubmit={handleSignUp} className="flex flex-col gap-8 p-5">
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="bg-transparent border-stone-700 border rounded-md px-3 py-3"/>
            <button className="bg-amber-600 text-xl p-2">Set username</button>
        </form>}

    </div>
}