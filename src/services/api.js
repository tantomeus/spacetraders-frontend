const BASE_URL = "https://api.spacetraders.io/v2"

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

    const res = await fetch(`${BASE_URL}/register`, options);
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
    
  const res = await fetch(`${BASE_URL}/my/agent`, options);
  const { data } = await res.json();
  console.log(data)
  return data;
}

// export async function getAgents(token) {
//   const url = "${BASE_URL}/agents";
//   const options = {
//     method: "GET",
//     headers: {
//       Accept: "application/json", 
//       Authorization: `Bearer ${token}`
//     }
//   };

//   try {
//     const response = await fetch(url, options);
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function getFactions(token) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
    
  const res = await fetch(`${BASE_URL}/factions`, options);
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
  
  const res = await fetch(`${BASE_URL}/systems?limit=20&page=${page}`, options);
  const { data } = await res.json();
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
  
  const res = await fetch(`${BASE_URL}/systems/${system}/waypoints?limit=20`, options);
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
  
  const res = await fetch(`${BASE_URL}/my/contracts`, options);
  const { data } = await res.json();
  console.log(data)
  return data;
}

export async function acceptContract(token, id, type = "accept") {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  
  const res = await fetch(`${BASE_URL}/my/contracts/${id}/${type}`, options);
  const { data } = await res.json();
  console.log(data)
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
  
  const res = await fetch(`${BASE_URL}/my/ships`, options);
  const { data } = await res.json();
  console.log(data)
  return data;
}

// NAVIGATION

export async function refuelShip(token, ship, units) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    // body: '{"units":"100"}'
  };
  
  const res = await fetch(`${BASE_URL}/my/ships/${ship}/refuel`, options);
  const { data } = await res.json();
  console.log(data)
  return data;
}

export async function refine(token, ship, resource) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: `{"produce":${resource}}`
  };
  
  const res = await fetch(`${BASE_URL}/my/ships/${ship}/refine`, options);
  const { data } = await res.json();
  console.log(data)
  return data;
}

export async function jettison(token, ship, resource, units) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: `{
      "symbol":"${resource}",
      "units":${units}
    }`
  };
  
  const res = await fetch(`${BASE_URL}/my/ships/${ship}/jettison`, options);
  const {data} = await res.json();
  console.log(data)
  return data;
}

export async function transferCargo(token, ship, secondShip, cargo, units) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: `{
      "tradeSymbol":"${cargo}",
      "units":${units},
      "shipSymbol":"${secondShip}"
    }`
  };
  
  const res = await fetch(`${BASE_URL}/my/ships/${ship}/transfer`, options);
  const {data} = await res.json();
  console.log(data)
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
  
  const res = await fetch(`${BASE_URL}/my/ships/${ship}/nav`, options);
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
  
  const res = await fetch(`${BASE_URL}/my/ships/${ship}/navigate`, options);
  const { data } = await res.json();
  console.log(data)
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
  
  const res = await fetch(`${BASE_URL}/my/ships/${ship}/${type}`, options)
  const { data } = await res.json();
  console.log(data)
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
  
  const res = await fetch(`${BASE_URL}/my/ships/${ship}/extract`, options);
  const { data } = await res.json();
  console.log(data)
  return data;
}

export async function installMount(token, ship, symbol) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      symbol,
    }),
  };
  
  const res = await fetch(`${BASE_URL}/my/ships/${ship}/mounts/install`, options);
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
  
  const res = await fetch(`${BASE_URL}/my/ships/${ship}/${type}`, options);
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
  
  const res = await fetch(`${BASE_URL}/systems/${system}/waypoints/${waypoint}/market`, options);
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
  
  const res = await fetch(`${BASE_URL}/systems/${system}/waypoints/${waypoint}/shipyard`, options);
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
  
  const res = await fetch(`${BASE_URL}/my/ships`, options);
  const { data } = await res.json();
  console.log(data)
  return data;
}


export async function negotiateContract(token, ship) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };
  
  const res = await fetch(`${BASE_URL}/my/ships/${ship}/negotiate/contract`, options);
  const { data } = await res.json();
  console.log(data)
  return data;
}