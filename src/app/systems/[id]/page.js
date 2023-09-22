"use client";

import { useAccount } from "@/context/AccountContext";
import { getWaypoints } from "@/services/api";
import { useEffect, useState } from "react";

import Planets from "@/components/Planets";
import WaypointItem from "@/components/WaypointItem";

export default function System({ params }) {
  const { account, ships } = useAccount();
  const [system, setSystem] = useState([]);

  const uniqueWaypoints = [...new Set(ships.map(ship => ship.nav.status === "IN_TRANSIT"
  ? ""
  : ship.nav.waypointSymbol))].filter((item) => item.includes(params.id));

  const collectionOfShips = uniqueWaypoints.map(waypoint => ({
      waypoint: {name: waypoint, type: system.find(planet => planet.symbol === waypoint)?.type},
      ships: ships.filter(ship => ship.nav.waypointSymbol === waypoint && ship.nav.status !== "IN_TRANSIT")
  }));

  const transit = [
     {
      waypoint: {type: "inside", name: "IN_TRANSIT"},
      ships: ships.filter(ship => ship.nav.status === "IN_TRANSIT"
      && params.id === ship.nav.route.departure.systemSymbol
      && params.id === ship.nav.route.destination.systemSymbol)
    },
     {
      waypoint: {type: "from", name: "IN_TRANSIT"},
      ships: ships.filter(ship => ship.nav.status === "IN_TRANSIT"
      && params.id === ship.nav.route.departure.systemSymbol
      && params.id !== ship.nav.route.destination.systemSymbol)
    },
     {
      waypoint: {type: "to", name: "IN_TRANSIT"},
      ships: ships.filter(ship => ship.nav.status === "IN_TRANSIT"
      && params.id !== ship.nav.route.departure.systemSymbol
      && params.id === ship.nav.route.destination.systemSymbol)
    },
  ];

  useEffect(() => { 
    async function fetchData() {
      try {
        const data = await getWaypoints(account.token, params.id);
        if (!data) throw new Error("loser");
        setSystem(data);
      } catch(err) {
        console.error(err);
      }
    }
    fetchData();
  }, [params.id, account.token]);
  
  return <section className="space-y-10">
      <Planets className="px-0" icons={true} waypoints={system}/>

      <h2 className="text-6xl font-bold">{params.id}</h2>

      <ul className="grid grid-cols-3 gap-6">
        {transit.map(({waypoint, ships}) => 
        <WaypointItem system={system} params={params} ships={ships} waypoint={waypoint} key={waypoint.type}/>)}
      </ul>

      {!collectionOfShips.length && <p className="text-center text-2xl">No ships in orbit or docked</p>}
      <ul className="grid grid-cols-2 gap-6">
        {collectionOfShips.map(({waypoint, ships}) => 
        <WaypointItem system={system} params={params} ships={ships} waypoint={waypoint} key={waypoint.name}/>)}
      </ul>
  </section>
}