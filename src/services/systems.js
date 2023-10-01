const BASE_URL = "https://api.spacetraders.io/v2";
const MESSAGE = "I missed the part where that's my problem";

export async function getSystems(token, page = 1) {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    };
    
    const res = await fetch(`${BASE_URL}/systems?limit=20&page=${page}`, options);
    if (!res.ok) throw new Error(MESSAGE);
    const { data } = await res.json();
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
    if (!res.ok) throw new Error(MESSAGE);
    const { data } = await res.json();
    return data;
}