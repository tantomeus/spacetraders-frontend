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