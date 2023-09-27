import FactionImg from "./FactionImg";

export default function WaypointInfo({ waypoint }) {

    return (
    <div
    className="flex flex-col items-center gap-4 absolute top-[130%] z-[1000] bg-stone-800 w-48 p-4 rounded-xl">
        <div className="absolute bottom-[100%]"
        style={{
            width: "0",
            height: "0",
            borderStyle: "solid",
            borderWidth: "0 8px 16px 8px",
            borderColor: "transparent transparent rgb(41, 37, 36) transparent",
        }}></div>
        <h2>{waypoint.symbol}</h2>
        <p>{waypoint.type.replace("_", " ")}</p>

        {waypoint.faction && <FactionImg faction={waypoint.faction?.symbol}/>}

        <ul className="flex flex-col items-center gap-2">
            {waypoint.traits.map(trait => {

                if (trait.symbol === "SHIPYARD" || trait.symbol === "MARKETPLACE") {
                    return (
                    <li className="rounded-full bg-amber-600 text-xs p-2" key={trait.symbol}>
                        {trait.name}
                    </li>)
                }

                return (
                <li className="rounded-full bg-stone-700 text-xs p-2" key={trait.symbol}>
                    {trait.name}
                </li>)
            })}
        </ul>
    </div>)
}