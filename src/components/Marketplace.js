"use client";

import { useAccount } from "@/context/AccountContext";
import { trade, viewMarketplace } from "@/services/api";
import { useEffect, useState } from "react";
import MarketplaceItem from "./MarketplaceItem";
import ShipImg from "./ShipImg";
import { shorten } from "@/helpers/helpers";
import { useShips } from "@/context/ShipsContext";

export default function Marketplace({ system, waypoint, ships }) {
    const { account, setAccount } = useAccount();
    const { setShips } = useShips();
    const [goods, setGoods] = useState({});
    const [status, setStatus] = useState(""); // purchase, sell
    const [selectedShip, setSelectedShip] = useState(null);
    const [selectedGoods, setSelectedGoods] = useState(null);
    const [amount, setAmount] = useState(0);

    const availableShips = ships.filter(ship => ship.cargo.capacity && ship.nav.status === "DOCKED")

    async function handleTrade(credits) {
        const data = await trade(account.token, selectedShip.symbol, selectedGoods.symbol, amount, status);
        setAccount((account) => ({...account, credits: data.agent.credits}));
        setSelectedShip((ship) => ({...ship, cargo: data.cargo}));
        setShips((ships) => ships.map((ship) => ship.symbol === selectedShip.symbol ? selectedShip : ship));
        setSelectedGoods(() => null);
        setAmount(0);
    }

    function handleSelect(item, type) {
        setSelectedGoods(item);
        setStatus(type);
    }

    useEffect(() => {
        async function fetching() {
            const data = await viewMarketplace(account.token, system, waypoint);
            setGoods(data);
        }
        fetching();
    }, [account.token, system, waypoint]);
    
    if (selectedGoods) return (
        <div className="window window-divide w-[30rem]">
            <div className="flex justify-between items-center px-6 py-4 text-2xl">
                <h2>Marketplace</h2>
                <span>{selectedShip?.symbol}</span>
            </div>

            <div className="p-4">
                <div className="flex justify-between items-center bg-stone-700 px-4 py-2 rounded-md">
                    <div>
                        <span className="block">{selectedGoods.name}</span>
                        <span className="block">{selectedGoods.tradeVolume} Available to {status}</span>
                    </div>
                    <span>{selectedGoods.price} CREDITS</span>
                </div>

                <div className="mt-4">
                    <input value={amount} onChange={(e) => {
                        const space = status === "sell" ? selectedGoods.tradeVolume : selectedShip.cargo.capacity - selectedShip.cargo.units ;
                        if (!isNaN(+e.target.value)) setAmount(+(e.target.value));
                        if (e.target.value > space) setAmount(+space);
                    }} placeholder="Amount" className="grow bg-transparent border-stone-700 border rounded-md px-3 py-3 w-full"/>
                </div>
            </div>

            <div className="flex justify-between px-4 py-4">
                <button onClick={() => setSelectedGoods(null)}>&larr; BACK</button>
                <button onClick={handleTrade} className="btn-color hover:btn-color-hover">{status} FOR {amount * selectedGoods.price} CREDITS</button>
            </div>
        </div>
    );

    return <div className="window window-divide w-[60rem]">
        <div className="flex justify-between items-center px-6 py-4 text-2xl">
            <h2>Marketplace</h2>
            <span className="credits rounded-3xl py-2 px-4 text-xl">{shorten(account.credits)} credits</span>
            {selectedShip?.symbol}
        </div>

        {availableShips.length ? <ul className="overflow-auto max-h-[70vh] p-4 text-xs grid grid-cols-2 gap-4">

            {!selectedShip && availableShips.map(ship => ship.cargo.capacity ? <li key={ship.symbol} className="flex items-center gap-6 p-4 border-solid border border-stone-500 rounded-md">
                <ShipImg ship={ship}/>
                <h3 className="font-medium">{ship.symbol}</h3>
                <div className="relative ml-auto">
                    <button onClick={() => setSelectedShip(ship)} className="btn-color hover:btn-color-hover text-xs/[1rem]">SELECT</button>
                </div>
            </li> : "")}

            {selectedShip && goods.tradeGoods?.map((item) => <MarketplaceItem onSelect={handleSelect} ship={selectedShip} item={item} key={item.symbol}/>)}
        </ul> : <p className="uppercase py-8 text-center text-xl">There are no docked ships with a cargo module</p>}

        {selectedShip && <div className="px-6 py-4">
            <button onClick={() => setSelectedShip(null)}>&larr; BACK</button>
        </div>}
    </div>
}