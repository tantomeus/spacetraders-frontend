"use client";

import Planets from "@/components/Planets";
import WaypointItem from "@/components/WaypointItem";
import { useAccount } from "@/context/AccountContext";
import { getShips, getWaypoints } from "@/services/api";
import { useEffect, useState } from "react";

export default function System({ params }) {
  const { account, rerender } = useAccount();
  const [system, setSystem] = useState([]);
  const [ships, setShips] = useState([]);

  const uniqueWaypoints = [...new Set(ships.map(ship => ship.nav.status === "IN_TRANSIT" ? "IN_TRANSIT" : ship.nav.waypointSymbol))];
  const collectionOfShips = uniqueWaypoints.map(waypoint => (waypoint === "IN_TRANSIT" ? 
  {waypoint: {name: waypoint,}, ships: ships.filter(ship => ship.nav.status === "IN_TRANSIT")} : 
  {waypoint: {name: waypoint, type: system.find(planet => planet.symbol === waypoint)?.type}, ships: ships.filter(ship => ship.nav.waypointSymbol === waypoint && ship.nav.status !== "IN_TRANSIT")}));

  useEffect(() => {
    async function fetching() {
      const data = await getWaypoints(account.token, params.id);
      const ships = await getShips(account.token);
      setShips(ships || []);
      setSystem(data);
    }
    fetching();
  }, [params.id, account.token, account.credits, rerender]);
  
  return <section>
    <div>
      <Planets waypoints={system}/>
    </div>
    <div className="flex justify-between mt-10">
      <h2 className="text-6xl font-bold">{params.id}</h2>
    </div>
    <ul className="grid grid-cols-2 gap-6 mt-10">
      {collectionOfShips.map(({waypoint, ships}) => <WaypointItem system={system} params={params} ships={ships} waypoint={waypoint} key={waypoint.name}/>)}
    </ul>
  </section>
}
