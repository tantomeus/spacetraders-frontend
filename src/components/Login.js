"use client";

import { useAccount } from "@/context/AccountContext";
import { getAgent, getFactions, signUp } from "@/services/api";
import { useEffect, useState } from "react";
import { AiOutlineInfoCircle, AiOutlineClose } from "react-icons/ai";

export default function Login({ onClose }) {
    const oldStorage = JSON.parse(localStorage.getItem("agent")) ?? [];

    const { setAccount } = useAccount();
    const [local, setLocal] = useState(oldStorage);
    const [currentTab, setCurrentTav] = useState("login");
    const [username, setUsername] = useState("");
    const [factions, setFactions] = useState([]);
    const [selectedFaction, setSelectedFaction] = useState("COSMIC")
    const [token, setToken] = useState("");
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    const selectedFactionInfo = factions.find((faction => faction.symbol === selectedFaction));

    const switchAcc = currentTab === "switch";
    const login = currentTab === "login";
    const create = currentTab === "create";
    const activeClass = "text-amber-600";


    async function handleSignUp(e) {
        e.preventDefault();
        const data = await signUp(username, selectedFaction);

        const acc = {token: data.token, name: data.agent.symbol, credits: data.agent.credits};
        setAccount(acc);

        if (oldStorage?.find((item) => item.name === data.agent.symbol)) return;

        await localStorage.setItem("agent", JSON.stringify([acc, ...oldStorage]));
        setLocal(JSON.parse(localStorage.getItem("agent")));
        onClose(false);
    }

    async function handleAuth(e) {
        e.preventDefault();
        const data = await getAgent(token, "agent");

        const acc = {token, name: data.symbol, credits: data.credits};
        setAccount(acc);

        if (oldStorage?.find((item) => item.name === data.symbol)) return;

        await localStorage.setItem("agent", JSON.stringify([acc, ...oldStorage]));
        setLocal(JSON.parse(localStorage.getItem("agent")));
        onClose(false);
    }

    function handleSwitchAcc(data) {
        setAccount(data);
        onClose(false);
    }

    useEffect(() => {
        async function fetching() {
            const data = await getFactions(token)
            setFactions(data.filter(faction => faction.isRecruiting));
        }
        fetching();
    }, [token])

    return <div className="fixed z-[1000] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-900 flex flex-col w-[30rem]">
        <div className="flex">
            <button onClick={() => setCurrentTav("switch")} className={`relative py-4 grow uppercase ${switchAcc ? activeClass : ""} hover`}>
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
            {local.map((data) => <li className="p-5 hover:bg-stone-700" key={data.token} onClick={() => handleSwitchAcc(data)}>{data.name}</li>)}
        </ul>
        }

        {login && <form onSubmit={handleAuth} className="flex flex-col gap-8 p-5">
            <input value={token} onChange={(e) => setToken(e.target.value)} placeholder="Token" className="bg-transparent border-stone-700 border rounded-md px-3 py-3"/>
            <button className="btn-color hover:btn-color-hover text-xl">Set username</button>
        </form>}

        {create && <form  onSubmit={handleSignUp} className="flex flex-col gap-8 p-5">
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="bg-transparent border-stone-700 border rounded-md px-3 py-3"/>

            <div className="flex justify-between gap-2">
                <select className="bg-transparent border-stone-700 border rounded-md px-3 py-3" onChange={(e) => setSelectedFaction(e.target.value)} value={selectedFaction}>
                    {factions.map(faction => <option className="bg-stone-900" value={faction.symbol} key={faction.symbol}>{faction.name}</option>)}
                </select>
                <button onClick={() => setIsInfoOpen(true)} type="button">
                    <AiOutlineInfoCircle className="h-8 w-8"/>
                </button>
            </div>
            
            <button className="btn-color hover:btn-color-hover text-xl">Set username</button>
        </form>}

        {isInfoOpen && <div className="fixed z-[1001] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-900 flex flex-col w-[40rem] border-solid border border-amber-600 p-4 space-y-4">
            <button onClick={() => setIsInfoOpen(false)} className="absolute z-[1002] top-0 right-0 translate-x-1/2 -translate-y-1/2 rounded-[50%] border-solid border border-amber-600 p-2 text-sm] bg-stone-900 hover:bg-amber-600"><AiOutlineClose/></button>
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="block text-xs text-stone-500 uppercase">NAME</span>
                    <hr className="opacity-50 grow"/>
                </div>
                <p>{selectedFactionInfo.name}</p>
            </div>
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="block text-xs text-stone-500 uppercase">DESCRIPTION</span>
                    <hr className="opacity-50 grow"/>
                </div>
                <p>{selectedFactionInfo.description}</p>
            </div>
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="block text-xs text-stone-500 uppercase">HEADQUARTERS</span>
                    <hr className="opacity-50 grow"/>
                </div>
                <p>{selectedFactionInfo.headquarters}</p>
            </div>
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="block text-xs text-stone-500 uppercase">TRAITS</span>
                    <hr className="opacity-50 grow"/>
                </div>
                <ul className="flex gap-4">
                    {selectedFactionInfo.traits.map((trait) => <li className="rounded-full bg-stone-700 text-sm p-2 " key={trait.symbol}>{trait.name}</li>)}
                </ul>
            </div>
        </div>}

    </div>
}