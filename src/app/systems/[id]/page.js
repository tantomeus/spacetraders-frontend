"use client";

import PlanetItem from "@/components/PlanetItem";
import Planets from "@/components/Planets";
import ShipItem from "@/components/ShipItem";
import ShipMarket from "@/components/ShipMarket";
import { useAccount } from "@/context/AccountContext";
import { getShips, getWaypoints } from "@/services/api";
import { useEffect, useState } from "react";

export default function System({ params }) {
  const { account } = useAccount();
  const [system, setSystem] = useState([]);
  const [ships, setShips] = useState([]);
  const [isShipMarketOpen, setIsShipMarketOpen] = useState(false);

  const uniqueWaypoints = [...new Set(ships.map(ship => ship.nav.status === "IN_TRANSIT" ? "IN_TRANSIT" : ship.nav.waypointSymbol))];
  const collectionOfShips = uniqueWaypoints.map(waypoint => (waypoint === "IN_TRANSIT" ? 
  {waypoint: {name: waypoint}, ships: ships.filter(ship => ship.nav.status === "IN_TRANSIT")} : 
  {waypoint: {name: waypoint, type: system.find(planet => planet.symbol === waypoint)?.type}, ships: ships.filter(ship => ship.nav.waypointSymbol === waypoint && ship.nav.status !== "IN_TRANSIT")}));

  useEffect(() => {
    async function fetching() {
      const data = await getWaypoints(account.token, params.id);
      const ships = await getShips(account.token);
      setShips(ships || []);
      setSystem(data);
    }
    fetching();
    console.log(system);
  }, [params.id, account.token]);
  
  return <section>
    <div>
      <Planets waypoints={system}/>
    </div>
    <div className="flex justify-between mt-10">
      <h2 className="text-6xl font-bold">{params.id}</h2>
    </div>
    <ul className="grid grid-cols-2 gap-6 mt-10">
      {collectionOfShips.map(({waypoint, ships}) => {
      
      return <li key={waypoint.name} className="bg-stone-900 p-4 rounded-md">
          <div className="min-h-[70px] flex justify-between items-center">
            <h2 className="text-2xl font-bold">{waypoint.name === "IN_TRANSIT" ? "In Transit" : waypoint.name}</h2>
            {!!waypoint.type && <span><PlanetItem origin="right" type={waypoint.type}/></span>}
          </div>
          <button onClick={() => setIsShipMarketOpen(true)} className="bg-amber-600 text-md px-8 py-2 rounded-md">VIEW SHIPYARD</button>
          <div className="py-4">
            <hr/>
          </div>
          <ul className="space-y-4">{ships.map(ship => <ShipItem key={ship.symbol} system={system} ship={ship}/>)}</ul>

          {isShipMarketOpen && <>
            <ShipMarket system={params.id} waypoint={waypoint.name}/>
            <div onClick={() => setIsShipMarketOpen(false)} className="z-[500] absolute inset-0 opacity-50 bg-stone-950"></div>
        </>}
        </li>
      })}
    </ul>
  </section>
}
