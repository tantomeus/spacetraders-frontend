import PlanetItem from "./PlanetItem";

export default function Planets({ waypoints = [] }) {
    return <ul className="flex justify-around flex-wrap px-5 pb-5 text-center">
        {waypoints.map((point) => {

            return <li className="flex flex-col justify-end" key={point.symbol}>
                <PlanetItem type={point.type}/>
                <span className="text-xs">{point.symbol}</span>
            </li>
        })}
    </ul>
}