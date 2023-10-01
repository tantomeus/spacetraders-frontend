"use client";

import { useAccount } from "@/context/AccountContext";
import { getAgent, signUp } from "@/services/agent";
import { getFactions } from "@/services/factions";
import { useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

import FactionInfo from "./FactionInfo";

export default function Login() {
    const oldStorage = JSON.parse(localStorage.getItem("agent")) ?? [];

    const { setAccount, notify } = useAccount();
    const [local, setLocal] = useState(oldStorage);
    const [currentTab, setCurrentTab] = useState("login");
    const [username, setUsername] = useState("");
    const [selectedFaction, setSelectedFaction] = useState("COSMIC")
    const [token, setToken] = useState("");
    const [isFactionInfoOpen, setIsFactionInfoOpen] = useState(false);
    const { isLoading, isError, data: factions = [], error } = useQuery({
        queryKey: ['factionsData'],
        queryFn: () => getFactions(""),
    });

    const switchAcc = currentTab === "switch";
    const login = currentTab === "login";
    const create = currentTab === "create";
    const activeClass = "text-amber-600";
    const selectedFactionInfo = factions.find((faction => faction.symbol === selectedFaction));

    async function handleSignUp(e) {
        e.preventDefault();

        try {
            const data = await signUp(username, selectedFaction);

            const acc = {token: data.token, name: data.agent.symbol, credits: data.agent.credits, headquarters: data.agent.headquarters};
            setAccount(acc);
    
            if (oldStorage?.find((item) => item.name === data.agent.symbol)) return;

            const newStorage = [acc, ...oldStorage];
            localStorage.setItem("agent", JSON.stringify(newStorage));
            setLocal(newStorage);

        } catch (err) {
            notify(err.message);
        }
    }

    async function handleAuth(e, token) {
        e.preventDefault();

        try {
            const data = await getAgent(token, "agent");

            const acc = {token, name: data.symbol, credits: data.credits, headquarters: data.headquarters};
            setAccount(acc);

            if (oldStorage?.find((item) => item.name === data.symbol)) return;

            const newStorage = [acc, ...oldStorage];
            localStorage.setItem("agent", JSON.stringify(newStorage));
            setLocal(newStorage);

        } catch (err) {
            notify(err.message);
        }
    }

    function handleRemove(e, token) {
        e.stopPropagation();
        const removed = oldStorage.filter((item) => item.token !== token);
        localStorage.setItem("agent", JSON.stringify(removed));
        setLocal(removed);
    }
    
    if (isError) notify(error.message);

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
        <form onSubmit={handleSignUp} className="flex flex-col gap-8 p-5">
            <input value={username} onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="input py-3 w-full"/>

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