"use client";

import { useAccount } from "@/context/AccountContext";
import { convertSeconds } from "@/helpers/helpers";
import { mineAsteroid } from "@/services/api";

const errorMessage = "I missed the part where that's my problem";

export default function Mining({ ship, waypoint, remainingSeconds }) {
    const { account, setShips, notify } = useAccount();

    const onAsteroid = waypoint.type === "ASTEROID_FIELD";
    const resources = waypoint.traits?.filter(({ symbol }) => symbol.includes("DEPOSITS"));
    const isShipInOrbit = ship.nav.status ==="IN_ORBIT";
    const hasEmptySpace = ship.cargo.capacity !== ship.cargo.units;

    const ableToMine = onAsteroid && !remainingSeconds && isShipInOrbit && hasEmptySpace;

    async function handleMineAsteroid() {
        try {
            const data = await mineAsteroid(account.token, ship.symbol);

            if (!data) throw new Erorr(errorMessage);
            
            setShips((ships) => ships.map((shipState) => ship.symbol === shipState.symbol ?
            {...shipState, cargo: data.cargo, cooldown: data.cooldown} :
            shipState));
        } catch(err) {
            notify(err.message);
        }
    }

    return (
    <div className="window window-divide w-[40rem]">
        <div className="flex-between p-4">
            <h2 className="text-2xl">Mining</h2>
            {!!remainingSeconds && <span>{convertSeconds(remainingSeconds)}</span>}
            {!remainingSeconds && <button disabled={!ableToMine} onClick={handleMineAsteroid}
            className={`btn ${!ableToMine
            ? "disable-color"
            : "btn-color hover:btn-color-reversed"}`}>
                MINE!
            </button>}
        </div>

        <div className="p-4 space-y-4">
            {!onAsteroid && <p className="text-center text-xl">This is not an asteroid!</p>}
            {resources?.map(resource => 
            <div key={resource.symbol}>
                <div className="flex gap-2 items-center">
                    <h3 className="text-lg">{resource.name.replace(" Deposits", "")}</h3>
                    <hr className="opacity-50 grow"/>
                </div>
                <p>{resource.description}</p>
            </div>)}
        </div>
    </div>)
}