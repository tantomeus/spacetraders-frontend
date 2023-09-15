export async function signUp(callsign, faction) {
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol: callsign,
          faction: faction,
        }),
      };

    const res = await fetch("https://api.spacetraders.io/v2/register", options);
    const { data } = await res.json();
    console.log(data)
    return data;
}

export async function getAgent(token) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
    
  const res = await fetch("https://api.spacetraders.io/v2/my/agent", options);
  const { data } = await res.json();
  console.log(data)
  return data;
}

export async function getFactions(token) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
    
  const res = await fetch("https://api.spacetraders.io/v2/factions", options);
  const { data } = await res.json();
  console.log(data)
  return data;
}

export async function getSystems(token, page = 1) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  
  const res = await fetch(`https://api.spacetraders.io/v2/systems?limit=20&page=${page}`, options);
  const data = await res.json();
  console.log(data)
  return data;
}

export async function getWaypoints(token, system) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  
  const res = await fetch(`https://api.spacetraders.io/v2/systems/${system}/waypoints`, options);
  const { data } = await res.json();
  console.log(data)
  return data;
}

export async function getContracts(token) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  
  const res = await fetch("https://api.spacetraders.io/v2/my/contracts", options);
  const { data } = await res.json();
  console.log(data)
  return data;
}

export async function acceptContract(token, id) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  
  const res = await fetch(`https://api.spacetraders.io/v2/my/contracts/${id}/accept`, options);
  const { data } = await res.json();
  console.log(data)
  return data;
}

export async function getShips(token) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  
  const res = await fetch("https://api.spacetraders.io/v2/my/ships", options);
  const { data } = await res.json();
  console.log(data)
  return data;
}


// NAVIGATION


export async function dockOrOrbit(token, ship, type) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  
  const res = await fetch(`https://api.spacetraders.io/v2/my/ships/${ship}/${type}`, options);
  const { data } = await res.json();
  console.log(data)
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
  
  const res = await fetch(`https://api.spacetraders.io/v2/my/ships/${ship}/nav`, options);
  const { data } = await res.json();
  console.log(data)
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
  
  const res = await fetch(`https://api.spacetraders.io/v2/my/ships/${ship}/navigate`, options);
  const { data } = await res.json();
  console.log(data)
  return data;
}


export async function warpOrJump(token, ship, system, type) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      waypointSymbol: system,
    }),
  };
  
  const res = await fetch(`https://api.spacetraders.io/v2/my/ships/${ship}/${type}`, options)
  const { data } = await res.json();
  console.log(data)
  return data;
}


// OTHER


export async function mineAsteroid(token, ship) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };
  
  const res = await fetch(`https://api.spacetraders.io/v2/my/ships/${ship}/extract`, options);
  const { data } = await res.json();
  console.log(data)
  return data;
}


// TRADE


export async function trade(token, ship, resource, quantity, type) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      symbol: resource,
      units: quantity,
    }),
  };
  
  const res = await fetch(`https://api.spacetraders.io/v2/my/ships/${ship}/${type}`, options);
  const { data } = await res.json();
  console.log(data)
  return data;
}


export async function viewMarketplace(token, system, waypoint) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  
  const res = await fetch(`https://api.spacetraders.io/v2/systems/${system}/waypoints/${waypoint}/market`, options);
  const { data } = await res.json();
  console.log(data)
  return data;
}


export async function getShipMarket(token, system, waypoint) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  
  const res = await fetch(`https://api.spacetraders.io/v2/systems/${system}/waypoints/${waypoint}/shipyard`, options);
  const { data } = await res.json();
  console.log(data)
  return data;
}


export async function purchaseShip(token, type, waypoint) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      shipType: type,
      waypointSymbol: waypoint,
    }),
  };
  
  const res = await fetch(`https://api.spacetraders.io/v2/my/ships`, options);
  const { data } = await res.json();
  console.log(data)
  return data;
}