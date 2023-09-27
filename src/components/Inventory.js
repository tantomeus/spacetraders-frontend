"use client";

import { refuelShip } from "@/services/api";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { useAccount } from "@/context/AccountContext";
import { convertSeconds } from "@/helpers/helpers";

import InventoryItem from "./InventoryItem";

const resourcesForRefine = [
    "COPPER_ORE",
    "SILVER_ORE",
    "GOLD_ORE",
    "ALUMINUM_ORE",
    "PLATINUM_ORE",
    "URANITE_ORE",
    "MERITIUM_ORE",
    "IRON_ORE",
    "FUEL"
];

const errorMessage = "I missed the part where that's my problem";

export default function Inventory({ ship, waypoint, remainingSeconds }) {
    const { account, setAccount, setShips, notify } = useAccount();

    const waypointHasMarketplace = waypoint?.traits.find(trait => trait.symbol.includes("MARKETPLACE"));
    const isShipDocked = ship.nav.status ==="DOCKED";
    const isFuelFull = !(ship.fuel.capacity - ship.fuel.current);
    const shipHasRefinery = ship.modules.find(module => module.symbol.includes("REFINERY"));

    const isRefuelAvailable = waypointHasMarketplace && !isFuelFull && isShipDocked;

    async function handleRefuel() {
        try {
            const data = await refuelShip(account.token, ship.symbol);

            if (!data) throw new Error(errorMessage);

            setShips((ships) => ships.map((item) => ship.symbol === item.symbol
            ? {...item, fuel: data.fuel}
            : item));
            setAccount((account) => ({...account, credits: data.agent.credits}));
        } catch(err) {
            notify(err.message);
        }
    }


    return (
    <div className="window window-divide w-[30rem]">
        <div className="flex-between p-4">
            <h2 className="text-2xl">Inventory</h2>
            {!!remainingSeconds && <span>{convertSeconds(remainingSeconds)}</span>}
        </div>

        <div>
            <div className="flex-between rounded-primary p-4">
                <span>FUEL: {ship.fuel.current}/{ship.fuel.capacity}</span>

                <button disabled={!isRefuelAvailable}
                onClick={handleRefuel}
                className={`btn ${!isRefuelAvailable ?
                "disable-color" :
                "btn-color hover:btn-color-reversed"}`}>
                    <BsFillFuelPumpFill className="icon-size-primary"/>
                </button>
            </div>

            <ul className="pb-4 px-4 space-y-4 h-overflow">
                <li className="flex items-center">
                    <hr className="grow"/>
                    <span className="px-2">{ship.cargo.units}/{ship.cargo.capacity}</span>
                    <hr className="grow"/>
                </li>

               {!ship.cargo.units && <li className="text-center">It{"'"}s empty here...</li>}

                {ship.cargo.inventory.map(item => {
                    const isRefineAvailable = resourcesForRefine.includes(item.symbol)
                    && !remainingSeconds && shipHasRefinery;

                    return <InventoryItem
                    key={item.symbol}
                    ship={ship}
                    item={item}
                    isRefineAvailable={isRefineAvailable}/>
                })}
            </ul>
        </div>
    </div>)
}