export async function signUp(callsign) {
    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol: callsign,
          faction: "COSMIC",
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

export async function getSystems(token) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  
  const res = await fetch("https://api.spacetraders.io/v2/systems", options);
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
  
  const res = await fetch(`https://api.spacetraders.io/v2/systems/${system}/waypoints`, options);
  const { data } = await res.json();
  console.log(data)
  return data;
}

export async function getContracts(token, system) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  
  const res = await fetch('https://api.spacetraders.io/v2/my/contracts', options);
  const { data } = await res.json();
  console.log(data)
  return data;
}

export async function acceptContract(token, id) {
  const options = {
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
  
  const res = await fetch('https://api.spacetraders.io/v2/my/ships', options);
  const { data } = await res.json();
  console.log(data)
  return data;
}


// NAVIGATION


export async function docking(token, ship) {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  
  const res = await fetch(`https://api.spacetraders.io/v2/my/ships/${ship}/dock`, options);
  const { data } = await res.json();
  console.log(data)
  return data;
}


export async function orbiting(token, ship) {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  
  const res = await fetch(`https://api.spacetraders.io/v2/my/ships/${ship}/orbit`, options);
  const { data } = await res.json();
  console.log(data)
  return data;
}


export async function switchFlightMode(token, ship, mode) {
  const options = {
    method: 'PATCH',
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


export async function flyToWaypoint(token, ship, waypoint) {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      waypointSymbol: waypoint,
    }),
  };
  
  const res = fetch(`https://api.spacetraders.io/v2/my/ships/${ship}/navigate`, options)
  const { data } = await res.json();
  console.log(data)
  return data;
}


export async function warpOrJump(token, ship, system, type) {
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      waypointSymbol: system,
    }),
  };
  
  const res = fetch(`https://api.spacetraders.io/v2/my/ships/${ship}/${type}`, options)
  const { data } = await res.json();
  console.log(data)
  return data;
}