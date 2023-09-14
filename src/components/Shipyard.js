"use client";

import { useAccount } from "@/context/AccountContext";
import { getShipMarket } from "@/services/api";
import { useEffect, useState } from "react";
import ShipyardItem from "./ShipyardItem";

export default function Shipyard({ system, waypoint }) {
    const { account } = useAccount();
    const [ships, setShips] = useState({});

    useEffect(() => {
        async function fetching() {
            const data = await getShipMarket(account.token, system, waypoint);
            setShips(data);
        }
        fetching();
    }, [account.token, system, waypoint]);

    return <div className="fixed z-[1000] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-stone-900 flex flex-col w-[60rem] divide-y divide-stone-500">
        <div className="flex justify-between items-center px-6 py-4">
            <h2 className="text-2xl">Shipyard</h2>
        </div>

        <ul className="overflow-auto max-h-[70vh] pt-4 p-4 text-xs grid grid-cols-2 gap-4">
            {ships?.ships?.map(ship => <ShipyardItem waypoint={ships.symbol} key={ship.type} ship={ship}/>)}
        </ul>
    </div>
}