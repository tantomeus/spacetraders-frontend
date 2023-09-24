"use client";

import { useAccount } from "@/context/AccountContext";
import { getShipMarket } from "@/services/api";
import { useEffect, useState } from "react";
import { shorten } from "@/helpers/helpers";

import ShipyardItem from "./ShipyardItem";
import SelectShip from "./SelectShip";
import Workshop from "./Workshop";

export default function Shipyard({ system, waypoint }) {
    const { ships, account } = useAccount();
    const [shipsToBuy, setShipsToBuy] = useState({});
    const [selectedShip, setSelectedShip] = useState({});
    const [activeTab, setActiveTab] = useState("market");

    const tabs = ["market", "mounts"];
    const styles = "translate-y-1/3 hover:translate-y-0 bg-stone-900";
    const availableShips = ships.filter(ship => ship.nav.status === "DOCKED"
    && ship.cargo.capacity > 0 && ship.frame.mountingPoints);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getShipMarket(account.token, system, waypoint);
                if (!data) throw new Error("another");
                setShipsToBuy(data);
            } catch(err) {
                console.error(err);
            }
        }
        fetchData();
    }, [account.token, system, waypoint]);

    return (
    <div className="window window-divide w-[60rem]">
        <div className="flex-between px-6 py-4">
            <h2 className="text-2xl">Shipyard</h2>
            <span className="credits rounded-3xl py-2 px-4 text-xl">{shorten(account.credits)} credits</span>
        </div>

        <div className="border-none absolute top-0 -translate-y-full overflow-hidden text-sm space-x-2 px-4">
            {tabs.map(tab => 
            <button key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${activeTab !== tab
            ? styles
            : "btn-color"} p-2 transition-primary rounded-t-lg`}>
                {tab}
            </button>)}
        </div>

        <ul className="h-overflow p-4 text-xs grid grid-cols-2 gap-4">

            {activeTab === "market" && shipsToBuy?.ships?.map(ship =>
                <ShipyardItem waypoint={shipsToBuy.symbol} key={ship.type} ship={ship}/>)
            }

            {activeTab === "mounts" && !selectedShip.symbol && availableShips.map(ship =>
                <SelectShip onSelect={setSelectedShip} key={ship.symbol} ship={ship}/>)
            }

            {activeTab === "mounts" && selectedShip.symbol && <Workshop ship={selectedShip}/>}
        </ul>
    </div>)
}