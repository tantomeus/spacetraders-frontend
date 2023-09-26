"use client";

import { useAccount } from "@/context/AccountContext";
import { getShipMarket } from "@/services/api";
import { useEffect, useState } from "react";
import { shorten } from "@/helpers/helpers";

import ShipyardItem from "./ShipyardItem";
import SelectShip from "./SelectShip";
import Workshop from "./Workshop";
import BackButton from "./BackButton";
import SkeletonLoader from "./SkeletonLoader";

export default function Shipyard({ system, waypoint }) {
    const { ships, account } = useAccount();
    const [shipsToBuy, setShipsToBuy] = useState({});
    const [selectedShip, setSelectedShip] = useState({});
    const [activeTab, setActiveTab] = useState("market");
    const [isLoading, setIsLoading] = useState(true);

    const tabs = ["market", "workshop"];
    const styles = "translate-y-1/3 hover:translate-y-0 bg-stone-900";
    const availableShips = ships.filter(ship => ship.nav.status === "DOCKED"
    && ship.cargo.capacity > 0 && ship.frame.mountingPoints && waypoint === ship.nav.waypointSymbol);

    function handleChangeTab(tab) {
        setActiveTab(tab);
        setSelectedShip({});
    }

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const data = await getShipMarket(account.token, system, waypoint);
                if (!data) throw new Error("another");
                setShipsToBuy(data);
            } catch(err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [account.token, system, waypoint]);

    return (
    <div className="window window-divide w-[60rem]">
        <div className="flex-between px-6 py-4 text-2xl">
            <h2 className="text-2xl">Shipyard</h2>
            {selectedShip.symbol && <>
                <span>{selectedShip.symbol}</span>
                <span>SLOTS: {selectedShip.frame.mountingPoints}</span>
            </>}
            <span className="credits rounded-3xl py-2 px-4 text-xl">{shorten(account.credits)} credits</span>
        </div>

        <div className="border-none absolute top-0 -translate-y-full overflow-hidden text-sm space-x-2 px-4">
            {tabs.map(tab => 
            <button key={tab}
            onClick={() => handleChangeTab(tab)}
            className={`${activeTab !== tab
            ? styles
            : "btn-color"} p-2 transition-primary rounded-t-lg`}>
                {tab}
            </button>)}
        </div>

        <ul className="h-overflow p-4 text-xs grid items-start grid-cols-2 gap-4">

            {isLoading && ["", ""].map((_, i) => <SkeletonLoader key={i}/>)}

            {activeTab === "market" && shipsToBuy?.ships?.map(ship =>
                <ShipyardItem waypoint={shipsToBuy.symbol} key={ship.type} ship={ship}/>)
            }

            {activeTab === "workshop" && !selectedShip.symbol
            && availableShips.map(ship =>
                <SelectShip onSelect={setSelectedShip} key={ship.symbol} ship={ship}>
                    SLOTS: {ship.frame.mountingPoints}
                </SelectShip>)
            }

            {activeTab === "workshop" && selectedShip.symbol
            && <Workshop setShip={setSelectedShip} ship={selectedShip}/>}
        </ul>

        {selectedShip.symbol && <BackButton onClick={() => setSelectedShip({})}/>}
    </div>)
}