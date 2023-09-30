"use client";

import { useAccount } from "@/context/AccountContext";
import { trade, viewMarketplace } from "@/services/api";
import { useEffect, useState } from "react";
import { shorten } from "@/helpers/helpers";

import MarketplaceItem from "./MarketplaceItem";
import SelectShip from "./SelectShip";
import BackButton from "./BackButton";
import SkeletonLoader from "./SkeletonLoader";
import Trade from "./Trade";

const errorMessage = "I missed the part where that's my problem";

export default function Marketplace({ system, waypoint, ships }) {
    const { account, notify } = useAccount();
    const [status, setStatus] = useState(""); // purchase, sell
    const [goods, setGoods] = useState({});
    const [selectedShip, setSelectedShip] = useState({});
    const [selectedGoods, setSelectedGoods] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const availableShips = ships.filter(ship => ship.cargo.capacity && ship.nav.status === "DOCKED")

    function reset() {
        setSelectedGoods({});
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
        <Trade heading="Marketplace"
        selectedGoods={selectedGoods}
        selectedShip={selectedShip}
        setSelectedShip={setSelectedShip}
        setSelectedGoods={setSelectedGoods}
        status={status}/>
    )


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

        {selectedShip.symbol && <BackButton onClick={() => {
            setSelectedShip({});
            reset()}}/>
        }
    </div>
}