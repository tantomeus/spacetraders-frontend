"use client";

import { convertSeconds } from "@/helpers/helpers";
import { mineAsteroid } from "@/services/api";
import { useEffect } from "react";

export default function Mining({ ship, account, waypoint, setShips }) {
    const { remainingSeconds } = ship.cooldown;
    const resources = waypoint.traits?.filter(({ symbol }) => symbol.includes("DEPOSITS"));
    const isShipDocked = ship.nav.status !=="IN_ORBIT";

    async function handleMineAsteroid() {
        const data = await mineAsteroid(account.token, ship.symbol);
        setShips((ships) => ships.map((shipState) => ship.symbol === shipState.symbol ? {...shipState, cargo: data.cargo, cooldown: data.cooldown} : shipState));
    }

    useEffect(() => {
        if (remainingSeconds) {
            const interval = setInterval(() => {
                setShips((ships) => ships.map((shipState) => ship.symbol === shipState.symbol ? {...shipState, cooldown: {...shipState.cooldown, remainingSeconds: shipState.cooldown.remainingSeconds - 1}} : shipState));
            }, 1000);
    
            return function() {
                clearInterval(interval);
            }
        }
    }, [remainingSeconds, ship.symbol, setShips]);

    return <div className="window window-divide w-[40rem]">
        <div className="flex items-center justify-between p-4">
            <h2 className="text-2xl">Mining</h2>
            {!!remainingSeconds && <span>{convertSeconds(remainingSeconds)}</span>}
            {!remainingSeconds && <button disabled={isShipDocked} onClick={handleMineAsteroid} className={isShipDocked ? "bg-stone-700 btn-color" : "btn-color hover:btn-color-hover"}>MINE!</button>}
        </div>

        <div className="p-4 space-y-4">
            <p className="text-xl">Possible resources</p>
            {resources?.map(resource => <div key={resource.symbol}>
                <div className="flex gap-2 items-center">
                    <h3 className="text-lg">{resource.name.replace(" Deposits", "")}</h3>
                    <hr className="opacity-50 grow"/>
                </div>
                <p>{resource.description}</p>
            </div>)}
        </div>
    </div>
}