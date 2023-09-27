"use client";

import { useAccount } from "@/context/AccountContext";
import { useEffect, useMemo, useState } from "react";
import { getWaypoints } from "@/services/api";

import PlanetItem from "@/components/PlanetImg";
import ShipItem from "@/components/ShipItem";
import Link from "next/link";
import SkeletonLoader from "@/components/SkeletonLoader";

const errorMessage = "I missed the part where that's my problem";

export default function Fleet() {
    const { account, ships, notify } = useAccount();
    const [isLoading, setIsLoading] = useState(true);
    const [systems, setSystems] = useState([]);

    const uniqueSystems = useMemo(() => {
        return [...new Set(ships
        .filter(ship => ship.nav.status !== "IN_TRANSIT")
        .map(ship => ship.nav.systemSymbol))];
    }, [ships]);

    const transit = ships.filter(ship => ship.nav.status === "IN_TRANSIT");
    const collectionOfShips = uniqueSystems.map(system => ({
        system,
        ships: ships.filter(ship => ship.nav.systemSymbol === system && ship.nav.status !== "IN_TRANSIT")
    }));

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const data = await Promise.all(uniqueSystems.map((system) => getWaypoints(account.token, system)));
                if (!data) throw new Error(errorMessage);
                setSystems(data);
            } catch(err) {
                notify(err.message);
            } finally {
                if (ships.length) setIsLoading(false);
            }
        }
        fetchData();
    }, [uniqueSystems, account.token, ships.length]);


    return (
    <section className="w-[60%] mx-auto">
        <ul className="space-y-5">
            {isLoading && ["", "", ""].map((_, i) => <SkeletonLoader key={i}/>)}

            {!isLoading && !!transit?.length && (
            <li className="bg-stone-900 rounded-primary col-span-full">
                <div className="min-h-[4.28rem] p-4">
                    <h2 className="text-2xl font-bold uppercase">Transit</h2>
                </div>

                <hr/>

                <ul className="space-y-4">
                    {transit.map(ship => <ShipItem key={ship.symbol} ship={ship}/>)}
                </ul>
            </li>)}

            {!isLoading  && collectionOfShips.map(({system, ships}, i) => {

                return (
                <li key={system} className="bg-stone-900 rounded-primary">
                    <div className="min-h-[4.28rem] flex-between p-4">
                        <div className="flex items-center gap-4">
                            <PlanetItem/>
                            <h2 className="text-2xl font-bold uppercase">{system}</h2>
                        </div>

                        <Link href={`/systems/${system}`}
                        className="btn btn-color hover:btn-color-reversed text-xl ml-auto">
                            View
                        </Link>
                    </div>

                    <hr/>

                    <ul className="space-y-4">
                        {ships.map((ship) => 
                            <ShipItem key={ship.symbol} system={systems[i]} ship={ship}/>
                        )}
                    </ul>
                </li>)
            })}
        </ul>
    </section>)
}