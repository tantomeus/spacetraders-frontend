const BASE_URL = "https://api.spacetraders.io/v2";
const MESSAGE = "I missed the part where that's my problem";

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
    if (!res.ok) throw new Error(MESSAGE);
    const { data } = await res.json();
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
    if (!res.ok) throw new Error(MESSAGE);
    const { data } = await res.json()
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
    if (!res.ok) throw new Error(MESSAGE);
    const { data } = await res.json();
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
    if (!res.ok) throw new Error(MESSAGE);
    const { data } = await res.json();
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
    if (!res.ok) throw new Error(MESSAGE);
    const { data } = await res.json();
    return data;
  }