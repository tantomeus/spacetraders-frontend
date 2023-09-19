"use client";

import PlanetItem from "@/components/PlanetImg";
import ShipItem from "@/components/ShipItem";
import { useAccount } from "@/context/AccountContext";
import { useShips } from "@/context/ShipsContext";
import { getShips } from "@/services/api";
import { useEffect } from "react";

export default function Ships() {
    const { ships, setShips } = useShips();
    const { account } = useAccount();

    const uniqueSystems = [...new Set(ships.filter(ship => ship.nav.status !== "IN_TRANSIT").map(ship => ship.nav.systemSymbol))];

    const collectionOfShips = uniqueSystems.map(system => ({
        system,
        ships: ships.filter(ship => ship.nav.systemSymbol === system)
    }));

    const transit = ships.filter(ship => ship.nav.status === "IN_TRANSIT");

    useEffect(() => {
        async function fetching() {
            const data = await getShips(account.token);
            setShips(data);
        }
        fetching();
    }, [account.token, setShips]);

    return <section>
        <ul className="space-y-5">
            {!!transit?.length && <li className="bg-stone-900 rounded-md">
                <div className="p-4">
                    <div className="min-h-[4.28rem] flex justify-between items-center">
                        <h2 className="text-2xl font-bold uppercase">Transit</h2>
                    </div>
                </div>
                <hr/>
                <ul className="space-y-4">
                {transit.map(ship => <ShipItem key={ship.symbol} ship={ship}/>)}
                </ul>
            </li>}
            {collectionOfShips.map(({system, ships}) => {
                return <li key={system} className="bg-stone-900 rounded-md">
                <div className="p-4">
                    <div className="min-h-[4.28rem] flex justify-between items-center">
                        <h2 className="text-2xl font-bold uppercase">{system}</h2>
                        <PlanetItem/>
                    </div>
                </div>
                <hr/>
                <ul className="space-y-4">
                {ships.map(ship => <ShipItem key={ship.symbol} system={[]} ship={ship}/>)}
                </ul>
            </li>
            })}
        </ul>
    </section>
}