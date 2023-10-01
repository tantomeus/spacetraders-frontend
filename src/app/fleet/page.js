"use client";

import { useAccount } from "@/context/AccountContext";
import { useMemo } from "react";
import { getWaypoints } from "@/services/systems";
import { useQuery } from "@tanstack/react-query";

import PlanetItem from "@/components/PlanetImg";
import ShipItem from "@/components/ShipItem";
import Link from "next/link";
import SkeletonLoader from "@/components/SkeletonLoader";

export default function Fleet() {
    const { account, ships, notify } = useAccount();
    const { isLoading, isError, data: systems = [], error } = useQuery({
        queryFn: fetchWaypoints,
        queryKey: ['waypoints']
    });
    
    if (isError) notify(error.message);

    async function fetchWaypoints() {
        const data = await Promise.all(uniqueSystems.map((system) => getWaypoints(account.token, system)));
        return data;
    }

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