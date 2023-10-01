const BASE_URL = "https://api.spacetraders.io/v2";
const MESSAGE = "I missed the part where that's my problem";

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
    if (!res.ok) throw new Error(MESSAGE);
    const { data } = await res.json();
    return data;
}

export async function getAgent(token) {
    const options = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    const res = await fetch(`${BASE_URL}/my/agent`, options);
    if (!res.ok) throw new Error(MESSAGE);
    const { data } = await res.json();
    return data;
}

export async function getAgents(token) {
    const url = "${BASE_URL}/agents";
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `Bearer ${token}`
      }
    };
  
    const response = await fetch(url, options);
    if (!res.ok) throw new Error(MESSAGE);
    const data = await response.json();
    return data;
}