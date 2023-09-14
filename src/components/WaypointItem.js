"use client";

import { useState } from "react";
import PlanetItem from "./PlanetItem";
import ShipItem from "./ShipItem";
import Shipyard from "./Shipyard";
import Overlay from "./Overlay";
import Marketplace from "./Marketplace";

export default function WaypointItem({ waypoint, ships, system, params }) {
  const [openedWindow, setOpenedWindow] = useState(false); // shipyard, marketplace
  
  const traits = system.find((item) => item.symbol === waypoint.name);
  const hasShipyard = traits?.traits?.find(item => item.symbol === "SHIPYARD");
  const hasMarketplace = traits?.traits?.find(item => item.symbol === "MARKETPLACE");

  if (!waypoint.type && waypoint.name !== "IN_TRANSIT") return;

  return <li className="bg-stone-900 rounded-md">
    <div className="p-4">
      <div className="min-h-[70px] flex justify-between items-center">
      <h2 className="text-2xl font-bold">{waypoint.name === "IN_TRANSIT" ? "In Transit" : waypoint.name}</h2>

      {!!waypoint.type && <span><PlanetItem origin="right" type={waypoint.type}/></span>}
      </div>

      {!!hasShipyard && <button onClick={() => setOpenedWindow("shipyard")} className="btn-color hover:btn-color-hover text-sm w-full mt-2">VIEW SHIPYARD</button>}
      {!hasShipyard && <button disabled={true} className="bg-stone-700 btn-color text-sm w-full mt-2">VIEW SHIPYARD</button>}

      {!!hasMarketplace && <button onClick={() => setOpenedWindow("marketplace")} className="btn-color hover:btn-color-hover text-sm w-full mt-2">VIEW MARKETPLACE</button>}
      {!hasMarketplace && <button disabled={true} className="bg-stone-700 btn-color text-sm w-full mt-2">VIEW MARKETPLACE</button>}
    </div>

    <hr/>

    <ul className="space-y-4">{ships.map(ship => <ShipItem key={ship.symbol} system={system} ship={ship}/>)}</ul>

    {openedWindow === "shipyard" && <>
      <Shipyard system={params.id} waypoint={waypoint.name}/>
      <Overlay onClose={setOpenedWindow}/>
    </>}

    {openedWindow === "marketplace" && <>
      <Marketplace ships={ships} system={params.id} waypoint={waypoint.name}/>
      <Overlay onClose={setOpenedWindow}/>
    </>}
  </li>
}