"use client";

import { useAccount } from "@/context/AccountContext";
import { getAgent, getFactions, signUp } from "@/services/api";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";

import FactionInfo from "./FactionInfo";


export default function Login({ onClose }) {
    const oldStorage = JSON.parse(localStorage.getItem("agent")) ?? [];

    const { setAccount } = useAccount();
    const [local, setLocal] = useState(oldStorage);
    const [currentTab, setCurrentTab] = useState("login");
    const [username, setUsername] = useState("");
    const [factions, setFactions] = useState([]);
    const [selectedFaction, setSelectedFaction] = useState("COSMIC")
    const [token, setToken] = useState("");
    const [isFactionInfoOpen, setIsFactionInfoOpen] = useState(false);

    const selectedFactionInfo = factions.find((faction => faction.symbol === selectedFaction));

    const switchAcc = currentTab === "switch";
    const login = currentTab === "login";
    const create = currentTab === "create";
    const activeClass = "text-amber-600";

    async function handleSignUp(e) {
        e.preventDefault();
        try {
            const data = await signUp(username, selectedFaction);

            if (!data) throw new Error("login");

            const acc = {token: data.token, name: data.agent.symbol, credits: data.agent.credits};
            setAccount(acc);
    
            if (oldStorage?.find((item) => item.name === data.agent.symbol)) return onClose(false);
    
            const newStorage = [acc, ...oldStorage];
            localStorage.setItem("agent", JSON.stringify(newStorage));
            setLocal(newStorage);
            onClose(false);
        } catch (err) {
            console.error(err);
        }
    }

    async function handleAuth(e, token) {
        e.preventDefault();
        try {
            const data = await getAgent(token, "agent");

            if (!data) throw new Error("login");

            const acc = {token, name: data.symbol, credits: data.credits};
            setAccount(acc);

            if (oldStorage?.find((item) => item.name === data.symbol)) return onClose(false);
            
            const newStorage = [acc, ...oldStorage];
            localStorage.setItem("agent", JSON.stringify(newStorage));
            setLocal(newStorage);
            onClose(false);
        } catch (err) {
            console.error(err);
        }
    }

    function handleRemove(e, token) {
        e.stopPropagation();
        const removed = oldStorage.filter((item) => item.token !== token);
        localStorage.setItem("agent", JSON.stringify(removed));
        setLocal(removed);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getFactions(token)
                if (!data) throw new Error("login")
                setFactions(data.filter(faction => faction.isRecruiting));
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [token])

    return (
    <div className="window w-[30rem]">
        <div className="flex">
            <button
            onClick={() => setCurrentTab("switch")}
            className={`relative py-4 grow uppercase ${switchAcc ? activeClass : ""}`}>
                Switch
                {switchAcc && <span className="absolute left-0 bottom-0 bg-amber-600 h-0.5 w-full"></span>}
            </button>

            <button
            onClick={() => setCurrentTab("login")}
            className={`relative py-4 grow uppercase ${login ? activeClass : ""}`}>
                Login
                {login && <span className="absolute left-0 bottom-0 bg-amber-600 h-0.5 w-full"></span>}
            </button>

            <button
            onClick={() => setCurrentTab("create")}
            className={`relative py-4 grow uppercase ${create ? activeClass : ""}`}>
                Create
                {create && <span className="absolute left-0 bottom-0 bg-amber-600 h-0.5 w-full"></span>}
            </button>
        </div>

        {switchAcc && <ul className="h-overflow">
            {local.length
            ? local.map((agent) =>
            <li
            className="cursor-pointer p-5 rounded-primary item-hover-color flex-between"
            key={agent.token} onClick={(e) => handleAuth(e, agent.token)}>
                <span>{agent.name}</span>

                <button onClick={(e) => handleRemove(e, agent.token)}>
                    <FaTrashAlt className="hover:fill-amber-600 h-6 w-6"/>
                </button>
            </li>)
            : <li className="p-5 flex justify-center items-center">NO ACCOUNTS</li>}
        </ul>}

        {login &&
        <form onSubmit={(e) => handleAuth(e, token)} className="flex flex-col gap-8 p-5">
            <input value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Token"
            className="input py-3"/>

            <button className="btn btn-color hover:btn-color-reversed text-xl">Set username</button>
        </form>}

        {create &&
        <form
        onSubmit={handleSignUp}
        className="flex flex-col gap-8 p-5">
            <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="input py-3"/>

            <div className="flex justify-between gap-2">
                <select
                className="input py-3 grow"
                onChange={(e) => setSelectedFaction(e.target.value)}
                value={selectedFaction}>
                    {factions.map(faction =>
                    <option
                    className="bg-stone-900"
                    value={faction.symbol}
                    key={faction.symbol}>
                        {faction.name}
                    </option>)}
                </select>

                <button
                onClick={() => setIsFactionInfoOpen(true)}
                type="button">
                    <AiOutlineInfoCircle className="icon-size-primary rounded-full hover:fill-amber-600"/>
                </button>
            </div>
            
            <button className="btn btn-color hover:btn-color-reversed text-xl">Set username</button>
        </form>}

        {isFactionInfoOpen && createPortal(
        <FactionInfo
        selectedFactionInfo={selectedFactionInfo}
        onClose={setIsFactionInfoOpen}/>, document.body)}
    </div>)
}