const BASE_URL = "https://api.spacetraders.io/v2";
const MESSAGE = "I missed the part where that's my problem";

export async function getContracts(token) {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    };
    
    const res = await fetch(`${BASE_URL}/my/contracts`, options);
    if (!res.ok) throw new Error(MESSAGE);
    const { data } = await res.json();
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
    if (!res.ok) throw new Error(MESSAGE);
    const { data } = await res.json();
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
    if (!res.ok) throw new Error(MESSAGE);
    const { data } = await res.json();
    return data;
}