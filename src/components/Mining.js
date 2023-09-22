"use client";

import { useAccount } from "@/context/AccountContext";
import { convertSeconds } from "@/helpers/helpers";
import { mineAsteroid } from "@/services/api";

export default function Mining({ ship, waypoint }) {
    const { account, setShips } = useAccount();
    const resources = waypoint.traits?.filter(({ symbol }) => symbol.includes("DEPOSITS"));
    const isShipDocked = ship.nav.status !=="IN_ORBIT";

    const { remainingSeconds } = ship.cooldown;

    async function handleMineAsteroid() {
        try {
            const data = await mineAsteroid(account.token, ship.symbol);

            if (!data) throw new Erorr("erorp");
            
            setShips((ships) => ships.map((shipState) => ship.symbol === shipState.symbol ?
            {...shipState, cargo: data.cargo, cooldown: data.cooldown} :
            shipState));
        } catch(err) {
            console.error(err);
        }
    }

    return (
    <div className="window window-divide w-[40rem]">
        <div className="flex-between p-4">
            <h2 className="text-2xl">Mining</h2>
            {!!remainingSeconds && <span>{convertSeconds(remainingSeconds)}</span>}
            {!remainingSeconds && <button disabled={isShipDocked} onClick={handleMineAsteroid}
            className={`btn ${isShipDocked
            ? "disable-color"
            : "btn-color hover:btn-color-reversed"}`}>
                MINE!
            </button>}
        </div>

        <div className="p-4 space-y-4">
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