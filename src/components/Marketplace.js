"use client";

import { useAccount } from "@/context/AccountContext";
import { viewMarketplace } from "@/services/api";
import { useEffect, useState } from "react";
import MarketplaceItem from "./MarketplaceItem";
import ShipImg from "./ShipImg";

export default function Marketplace({ system, waypoint, ships }) {
    const { account } = useAccount();
    const [goods, setGoods] = useState({});
    const [status, setStatus] = useState(""); // buy, sell
    const [selectedShip, setSelectedShip] = useState({});
    const [selectedGoods, setSelectedGoods] = useState(null);

    const isShipSelected = !!Object.keys(selectedShip).length;

    useEffect(() => {
        async function fetching() {
            const data = await viewMarketplace(account.token, system, waypoint);
            setGoods(data);
        }
        fetching();
    }, [account.token, system, waypoint]);

    if (selectedGoods) return (
        <div className="fixed z-[1000] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-900 flex flex-col w-[60rem] divide-y divide-stone-500">
            {status === "buy" &&
            <div className="flex justify-between items-center px-6 py-4 text-2xl">
                <h2>Marketplace</h2>
                <span>{selectedGoods.symbol}</span>
            </div>}

            {status === "sell" &&
            <div className="flex justify-between items-center px-6 py-4 text-2xl">
                <h2>Marketplace</h2>
                <span>{selectedGoods.symbol}</span>
            </div>}
        </div>
    );

    return <div className="fixed z-[1000] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-900 flex flex-col w-[60rem] divide-y divide-stone-500">
        <div className="flex justify-between items-center px-6 py-4 text-2xl">
            <h2>Marketplace</h2>
            <span>{selectedShip?.symbol}</span>
        </div>

        <ul className="overflow-auto max-h-[70vh] pt-4 p-4 text-xs grid grid-cols-2 gap-4">

            {!isShipSelected && ships.map(ship => ship.cargo.capacity ? <li key={ship.symbol} className="flex items-center gap-6 p-4 border-solid border border-stone-500 rounded-md">
                <ShipImg ship={ship}/>
                <h3 className="font-medium">{ship.symbol}</h3>
                <div className="relative ml-auto">
                    <button onClick={() => setSelectedShip(ship)} className="btn-color hover:btn-color-hover text-xs/[1rem]">SELECT</button>
                </div>
            </li> : "")}

            {isShipSelected && goods.tradeGoods?.map((item) => <MarketplaceItem ship={selectedShip} item={item} key={item.symbol}/>)}
        </ul>

        {isShipSelected && <div className="px-6 py-4">
            <button onClick={() => setSelectedShip({})}>&larr; BACK</button>
        </div>}
    </div>
}