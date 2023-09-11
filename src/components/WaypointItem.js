"use client";

import { useState } from "react";
import PlanetItem from "./PlanetItem";
import ShipItem from "./ShipItem";
import ShipMarket from "./ShipMarket";

export default function WaypointItem({ waypoint, ships, system, params }) {
    const [isShipMarketOpen, setIsShipMarketOpen] = useState(false);
    
    const traits = system.find((item) => item.symbol === waypoint.name);
    const hasShipyard = traits?.traits?.find(item => item.symbol === "SHIPYARD");
    const hasMarketplace = traits?.traits?.find(item => item.symbol === "MARKETPLACE");

    if (!waypoint.type && waypoint.name !== "IN_TRANSIT") return;

    return <li className="bg-stone-900 p-4 rounded-md">
      <div className="min-h-[70px] flex justify-between items-center">
      <h2 className="text-2xl font-bold">{waypoint.name === "IN_TRANSIT" ? "In Transit" : waypoint.name}</h2>

      {!!waypoint.type && <span><PlanetItem origin="right" type={waypoint.type}/></span>}
      </div>

      {!!hasShipyard && <button onClick={() => setIsShipMarketOpen(true)} className="btn-color hover:btn-color-hover text-sm w-full mt-2">VIEW SHIPYARD</button>}
      {!hasShipyard && <button onClick={() => setIsShipMarketOpen(true)} disabled={true} className="bg-stone-700 btn-color text-sm w-full mt-2">VIEW SHIPYARD</button>}

      {!!hasMarketplace && <button onClick={() => setIsShipMarketOpen(true)} className="btn-color hover:btn-color-hover text-sm w-full mt-2">VIEW MARKETPLACE</button>}
      {!hasMarketplace && <button disabled={true} onClick={() => setIsShipMarketOpen(true)} className="bg-stone-700 btn-color text-sm w-full mt-2">VIEW MARKETPLACE</button>}

      <div className="py-4">
        <hr/>
      </div>

      <ul className="space-y-4">{ships.map(ship => <ShipItem key={ship.symbol} system={system} ship={ship}/>)}</ul>

      {isShipMarketOpen && <>
      <ShipMarket system={params.id} waypoint={waypoint.name}/>
      <div onClick={() => setIsShipMarketOpen(false)} className="z-[500] absolute inset-0 opacity-50 bg-stone-950"></div>
      </>}
  </li>
}