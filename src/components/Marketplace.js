"use client";

import { useAccount } from "@/context/AccountContext";
import { trade, viewMarketplace } from "@/services/api";
import { useEffect, useState } from "react";
import MarketplaceItem from "./MarketplaceItem";
import ShipImg from "./ShipImg";

export default function Marketplace({ system, waypoint, ships }) {
    const { account, updateCredits, rerender, setRerender } = useAccount();
    const [goods, setGoods] = useState({});
    const [status, setStatus] = useState(""); // purchase, sell
    const [selectedShip, setSelectedShip] = useState(null);
    const [selectedGoods, setSelectedGoods] = useState(null);
    const [amount, setAmount] = useState(0);

    console.log(selectedShip);

    const statusFactor = status === "sell" ? 1 : -1;

    function handleTrade(credits) {
        trade(account.token, selectedShip.symbol, selectedGoods.symbol, amount, status);
        updateCredits(credits);
        setRerender((rer) => !rer);
        setSelectedShip((ship) => ({...ship, cargo: {
            ...ship.cargo,
            inventory: ship.cargo.inventory.map(item => item.units - amount ? ({...item, units: item.units - amount * statusFactor}) : "").filter((item => item !== "")),
            units: ship.cargo.units - amount * statusFactor
        }}));
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
    }, [account.token, system, waypoint, rerender]);

    if (selectedGoods) return (
        <div className="fixed z-[1000] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-900 flex flex-col w-[30rem] divide-y divide-stone-500">
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
                <button onClick={() => handleTrade(amount * selectedGoods.price * statusFactor)} className="btn-color hover:btn-color-hover">{status} FOR {amount * selectedGoods.price} CREDITS</button>
            </div>
        </div>
    );

    return <div className="fixed z-[1000] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-900 flex flex-col w-[60rem] divide-y divide-stone-500">
        <div className="flex justify-between items-center px-6 py-4 text-2xl">
            <h2>Marketplace</h2>
            <span>{selectedShip?.symbol}</span>
        </div>

        <ul className="overflow-auto max-h-[70vh] p-4 text-xs grid grid-cols-2 gap-4">

            {!selectedShip && ships.map(ship => ship.cargo.capacity ? <li key={ship.symbol} className="flex items-center gap-6 p-4 border-solid border border-stone-500 rounded-md">
                <ShipImg ship={ship}/>
                <h3 className="font-medium">{ship.symbol}</h3>
                <div className="relative ml-auto">
                    <button onClick={() => setSelectedShip(ship)} className="btn-color hover:btn-color-hover text-xs/[1rem]">SELECT</button>
                </div>
            </li> : "")}

            {selectedShip && goods.tradeGoods?.map((item) => <MarketplaceItem onSelect={handleSelect} ship={selectedShip} item={item} key={item.symbol}/>)}
        </ul>

        {selectedShip && <div className="px-6 py-4">
            <button onClick={() => setSelectedShip({})}>&larr; BACK</button>
        </div>}
    </div>
}