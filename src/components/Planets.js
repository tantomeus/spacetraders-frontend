import { getPlanetStyles } from "@/helpers/getPlanetStyles";

export default function Planets({ waypoints = [] }) {
    return <ul className="flex justify-around flex-wrap px-5 pb-5 text-center">
        {waypoints.map((point) => {
            const { bg, animation, scale, size, m } = getPlanetStyles(point.type);

            return <li className="flex flex-col justify-end" key={point.symbol}><div style={{transformOrigin: "center", transform: scale, height: size, width: size}} className={`${m} ${animation} ${bg}`}></div>
            <span className="text-xs">{point.symbol}</span></li>
        })}
    </ul>
}