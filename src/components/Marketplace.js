"use client";

import { useAccount } from "@/context/AccountContext";
import { trade, viewMarketplace } from "@/services/api";
import { useEffect, useState } from "react";
import { shorten } from "@/helpers/helpers";

import MarketplaceItem from "./MarketplaceItem";
import SelectShip from "./SelectShip";
import BackButton from "./BackButton";
import SkeletonLoader from "./SkeletonLoader";

const errorMessage = "I missed the part where that's my problem";

export default function Marketplace({ system, waypoint, ships }) {
    const { account, setAccount, setShips, notify } = useAccount();
    const [status, setStatus] = useState(""); // purchase, sell
    const [goods, setGoods] = useState({});
    const [selectedShip, setSelectedShip] = useState({});
    const [selectedGoods, setSelectedGoods] = useState({});
    const [amount, setAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const availableShips = ships.filter(ship => ship.cargo.capacity && ship.nav.status === "DOCKED")

    function reset() {
        setSelectedGoods({});
        setAmount(0);
    }

    async function handleTrade() {
        try {
            const data = await trade(account.token, selectedShip.symbol, selectedGoods.symbol, amount, status);

            if (!data) throw new Error(errorMessage);

            setAccount((account) => ({...account, credits: data.agent.credits}));
            setSelectedShip((ship) => ({...ship, cargo: data.cargo}));
            setShips((ships) => ships.map((ship) => ship.symbol === selectedShip.symbol
            ? {...ship, cargo: data.cargo}
            : ship));
            reset();
        } catch (err) {
            notify(err.message);
        }
    }

    function handleInputChange(e) {
        const space = status === "sell"
        ? selectedGoods.tradeVolume
        : selectedShip.cargo.capacity - selectedShip.cargo.units ;
        const min = Math.floor(Math.min((account.credits / selectedGoods.purchasePrice), space));
        
        if (!isNaN(+e.target.value)) setAmount(+(e.target.value));
        if (e.target.value * selectedGoods.purchasePrice > account.credits || e.target.value > space) {
            setAmount(min);
        }
    }

    function handleSelect(item, type) {
        setSelectedGoods(item);
        setStatus(type);
    }

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const data = await viewMarketplace(account.token, system, waypoint);
                if (!data) throw new Error(errorMessage);
                setGoods(data);
            } catch (err) {
                notify(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [account.token, system, waypoint, notify]);
    
    if (selectedGoods.symbol) return (
        <div className="window window-divide w-[30rem]">
            <div className="flex-between px-6 py-4 text-2xl">
                <h2>Marketplace</h2>
            </div>

            <div className="p-4">
                <div className="flex-between bg-stone-700 px-4 py-2 rounded-primary">
                    <div>
                        <span className="block">{selectedGoods.name}</span>
                        <span className="block">{selectedGoods.tradeVolume} Available to {status}</span>
                    </div>
                    <span>{selectedGoods.price} CREDITS</span>
                </div>

                <div className="mt-4">
                    <input value={amount} onChange={handleInputChange} placeholder="Amount"
                    className="grow input py-3 w-full"/>
                </div>
            </div>

            <div className="flex justify-between px-4 py-4">
                <BackButton onClick={reset}/>
                <button onClick={handleTrade}
                className="btn btn-color hover:btn-color-reversed">
                    {status} FOR {amount * selectedGoods.price} CREDITS
                </button>
            </div>
        </div>
    );

    return <div className="window window-divide w-[60rem]">
        <div className="flex-between px-6 py-4 text-2xl">
            <h2>Marketplace</h2>
            {selectedShip.symbol && <>
                <span>{selectedShip.symbol}</span>
                <span>{selectedShip.cargo.units}/{selectedShip.cargo.capacity}</span>
                <span className="credits rounded-3xl py-2 px-4 text-xl">
                    {shorten(account.credits)} credits
                </span>
            </>}
        </div>

        {availableShips.length
        ? <ul className="h-overflow p-4 text-xs grid items-start grid-cols-2 gap-4">

            {!selectedShip.symbol && availableShips.map(ship => ship.cargo.capacity
                ? <SelectShip key={ship.symbol} ship={ship} onSelect={setSelectedShip}>
                    {ship.cargo.units}/{ship.cargo.capacity}
                </SelectShip>
                : "")
            }

            {isLoading && selectedShip.symbol && ["", ""].map((_, i) => <SkeletonLoader key={i}/>)}

            {!isLoading && selectedShip.symbol && goods.tradeGoods?.map((item) =>
            <MarketplaceItem
            account={account}
            onSelect={handleSelect}
            ship={selectedShip}
            item={item}
            key={item.symbol}
            />)}

        </ul>
        : <p className="uppercase py-8 text-center text-xl">There are no docked ships with a cargo module</p>}

        {selectedShip.symbol && <BackButton onClick={reset}/>}
    </div>
}