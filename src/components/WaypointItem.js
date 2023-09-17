"use client";

import { useState } from "react";
import PlanetItem from "./PlanetItem";
import ShipItem from "./ShipItem";
import Shipyard from "./Shipyard";
import Overlay from "./Overlay";
import Marketplace from "./Marketplace";
import { FaRightLeft, FaRightFromBracket, FaRightToBracket } from "react-icons/fa6"

export default function WaypointItem({ waypoint, ships, system, params }) {
  const [openedWindow, setOpenedWindow] = useState(false); // shipyard, marketplace

  const traits = system.find((item) => item.symbol === waypoint.name);
  const hasShipyard = traits?.traits?.find(item => item.symbol === "SHIPYARD");
  const hasMarketplace = traits?.traits?.find(item => item.symbol === "MARKETPLACE");
  
  if (waypoint.name === "IN_TRANSIT") return (
      <li className="bg-stone-900 rounded-md">
        <div className="p-4">
          <div className="min-h-[4.28rem] flex justify-between items-center">
            <h2 className="text-2xl font-bold uppercase">Transit</h2>
            {waypoint.type === "inside" && <FaRightLeft className="fill-stone-50 h-8 w-8"/>}
            {waypoint.type === "from" && <FaRightFromBracket className="fill-stone-50 h-8 w-8"/>}
            {waypoint.type === "to" && <FaRightToBracket className="fill-stone-50 h-8 w-8"/>}  
          </div>
        </div>
        <hr/>
        {!ships.length && <p className="min-h-[6rem] flex justify-center items-center">No ships in transit</p>}
        <ul className="space-y-4">
        {ships.map(ship => <ShipItem key={ship.symbol} system={system} ship={ship}/>)}
      </ul>
    </li>
  );

  if (waypoint.name.includes(params.id)) return (
    <li className="bg-stone-900 rounded-md">
      <div className="p-4">
        <div className="min-h-[4.28rem] flex justify-between items-center">
        <h2 className="text-2xl font-bold">{waypoint.name}</h2>

        {!!waypoint.type && <span><PlanetItem origin="right" type={waypoint.type}/></span>}
        </div>

        {!!hasShipyard && <button onClick={() => setOpenedWindow("shipyard")} className="btn-color hover:btn-color-hover text-sm w-full mt-2">VIEW SHIPYARD</button>}
        {!hasShipyard && <button disabled={true} className="bg-stone-700 btn-color text-sm w-full mt-2">VIEW SHIPYARD</button>}

        {!!hasMarketplace && <button onClick={() => setOpenedWindow("marketplace")} className="btn-color hover:btn-color-hover text-sm w-full mt-2">VIEW MARKETPLACE</button>}
        {!hasMarketplace && <button disabled={true} className="bg-stone-700 btn-color text-sm w-full mt-2">VIEW MARKETPLACE</button>}
      </div>

      <hr/>

      <ul className="space-y-4">{
        ships.map(ship => <ShipItem key={ship.symbol} system={system} ship={ship}/>)
      }</ul>

      {openedWindow === "shipyard" && <>
        <Shipyard system={params.id} waypoint={waypoint.name}/>
        <Overlay onClose={setOpenedWindow}/>
      </>}

      {openedWindow === "marketplace" && <>
        <Marketplace ships={ships} system={params.id} waypoint={waypoint.name}/>
        <Overlay onClose={setOpenedWindow}/>
      </>}
    </li>
  )
}