const BASE_URL = "https://api.spacetraders.io/v2";
const MESSAGE = "I missed the part where that's my problem";

export async function getFactions(token) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  };
    
  const res = await fetch(`${BASE_URL}/factions`, options);
  if (!res.ok) throw new Error(MESSAGE);
  const { data } = await res.json();
  return data;
}