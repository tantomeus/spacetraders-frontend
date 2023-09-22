"use client";

import { useAccount } from "@/context/AccountContext";
import { getShipMarket } from "@/services/api";
import { useEffect, useState } from "react";
import { shorten } from "@/helpers/helpers";

import ShipyardItem from "./ShipyardItem";

export default function Shipyard({ system, waypoint }) {
    const { account } = useAccount();
    const [ships, setShips] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getShipMarket(account.token, system, waypoint);
                if (!data) throw new Error("another");
                setShips(data);
            } catch(err) {
                console.error(err);
            }
        }
        fetchData();
    }, [account.token, system, waypoint]);

    return <div className="window window-divide w-[60rem]">
        <div className="flex-between px-6 py-4">
            <h2 className="text-2xl">Shipyard</h2>
            <span className="credits rounded-3xl py-2 px-4 text-xl">{shorten(account.credits)} credits</span>
        </div>

        <ul className="h-overflow p-4 text-xs grid grid-cols-2 gap-4">
            {ships?.ships?.map(ship => <ShipyardItem waypoint={ships.symbol} key={ship.type} ship={ship}/>)}
        </ul>
    </div>
}