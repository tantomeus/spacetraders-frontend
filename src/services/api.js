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
    const data = await res.json();
    return data;
}

export async function auth(token) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
    
  const res = await fetch("https://api.spacetraders.io/v2/my/agent", options);
  const data = await res.json();
  return data;
}

export async function getSystems() {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
  
  const res = await fetch("https://api.spacetraders.io/v2/systems", options);
  const data = await res.json();
  return data;
}