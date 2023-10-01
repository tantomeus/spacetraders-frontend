"use client";

import { useAccount } from "@/context/AccountContext";
import { getWaypoints } from "@/services/systems";
import { useQuery } from "@tanstack/react-query";

import Planets from "@/components/Planets";
import WaypointItem from "@/components/WaypointItem";
import SkeletonLoader from "@/components/SkeletonLoader";

export default function System({ params }) {
  const { account, ships, notify } = useAccount();

  const uniqueWaypoints = [...new Set(ships.map(ship => ship.nav.status === "IN_TRANSIT"
  ? ""
  : ship.nav.waypointSymbol))].filter((item) => item.includes(params.id));

  const { isLoading, isError, data: system = [], error } = useQuery({
    queryKey: [params.id],
    queryFn: () => getWaypoints(account.token, params.id),
  });

  if (isError) notify(error.message);

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

  
  return <section className="space-y-10">
      {isLoading && <div className="rounded-primary p-4 ">
        <div className="animate-skeleton btn h-12 w-full rounded-full"></div>
      </div>}
      
      {!isLoading && <Planets className="px-0" icons={true} waypoints={system}/>}

      <h2 className="text-6xl font-bold">{params.id}</h2>

      <ul className="grid grid-cols-3 gap-6">
        {isLoading && ["", "", ""].map((_, i) => <SkeletonLoader key={i}/> )}

        {!isLoading && transit.map(({waypoint, ships}) =>
        <WaypointItem system={system} params={params} ships={ships} waypoint={waypoint} key={waypoint.type}/>)}
      </ul>

      {!isLoading && !collectionOfShips.length
      && <p className="text-center text-2xl">No ships in orbit or docked</p>}

      <ul className="grid grid-cols-2 gap-6">
      {isLoading && ["", ""].map((_, i) => {

        return (
        <li key={i} className="bg-stone-900 rounded-primary p-4 space-y-4">
          <div className="flex-between">
            <div className="animate-skeleton h-6 w-[20%] rounded-full"></div>
            <div className="animate-skeleton icon-size-primary rounded-full"></div>
          </div>
          <div className="animate-skeleton h-12 w-full rounded-full"></div>
        </li>)})
      }

        {!isLoading && collectionOfShips.map(({waypoint, ships}) => 
        <WaypointItem system={system} params={params} ships={ships} waypoint={waypoint} key={waypoint.name}/>)}
      </ul>
  </section>
}