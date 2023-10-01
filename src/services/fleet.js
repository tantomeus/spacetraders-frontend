const BASE_URL = "https://api.spacetraders.io/v2";
const MESSAGE = "I missed the part where that's my problem";

export async function getShips(token) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  
  const res = await fetch(`${BASE_URL}/my/ships`, options);
  if (!res.ok) throw new Error(MESSAGE);
  const { data } = await res.json();
  return data;
}

export async function deliverCargo(token, id, ship, item, units) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      shipSymbol: ship,
      tradeSymbol: item,
      units
    })
  };
  
  const res = await fetch(`${BASE_URL}/my/contracts/${id}/deliver`, options);
  if (!res.ok) throw new Error(MESSAGE);
  const { data } = await res.json();
  return data;
}

export async function refuelShip(token, ship) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };
  
  const res = await fetch(`${BASE_URL}/my/ships/${ship}/refuel`, options);
  if (!res.ok) throw new Error(MESSAGE);
  const { data } = await res.json();
  return data;
}

export async function refine(token, ship, resource) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      produce: resource
    })
  };
  
  const res = await fetch(`${BASE_URL}/my/ships/${ship}/refine`, options);
  if (!res.ok) throw new Error(MESSAGE);
  const { data } = await res.json();
  return data;
}

export async function jettison(token, ship, resource, units) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      symbol: resource,
      units
    })
  };
  
  const res = await fetch(`${BASE_URL}/my/ships/${ship}/jettison`, options);
  if (!res.ok) throw new Error(MESSAGE);
  const {data} = await res.json();
  return data;
}

export async function transferCargo(token, ship, secondShip, cargo, units) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      tradeSymbol: cargo,
      units,
      shipSymbol: secondShip
    })
  };
  
  const res = await fetch(`${BASE_URL}/my/ships/${ship}/transfer`, options);
  if (!res.ok) throw new Error(MESSAGE);
  const {data} = await res.json();
  return data;
}


export async function dockOrOrbit(token, ship, type) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  
  const res = await fetch(`${BASE_URL}/my/ships/${ship}/${type}`, options);
  if (!res.ok) throw new Error(MESSAGE);
  const { data } = await res.json();
  return data;
}

export async function switchFlightMode(token, ship, mode) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      flightMode: mode,
    }),
  };
  
  const res = await fetch(`${BASE_URL}/my/ships/${ship}/nav`, options);
  if (!res.ok) throw new Error(MESSAGE);
  const { data } = await res.json();
  return data;
}


export async function flyToWaypoint(token, ship, destination) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      waypointSymbol: destination,
    }),
  };
  
  const res = await fetch(`${BASE_URL}/my/ships/${ship}/navigate`, options);
  if (!res.ok) throw new Error(MESSAGE);
  const { data } = await res.json();
  return data;
}


export async function warpOrJump(token, ship, waypoint, type) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      waypointSymbol: waypoint,
    }),
  };
  
  const res = await fetch(`${BASE_URL}/my/ships/${ship}/${type}`, options);
  if (!res.ok) throw new Error(MESSAGE);
  const { data } = await res.json();
  return data;
}

export async function getJumpGate(token, system, waypoint) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  
  const res = await fetch(`${BASE_URL}/systems/${system}/waypoints/${waypoint}/jump-gate`, options);
  if (!res.ok) throw new Error(MESSAGE);
  const { data } = await res.json();
  return data;
}

export async function mineAsteroid(token, ship) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };
  
  const res = await fetch(`${BASE_URL}/my/ships/${ship}/extract`, options);
  if (!res.ok) throw new Error(MESSAGE);
  const { data } = await res.json();
  return data;
}