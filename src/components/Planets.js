import PlanetItem from "./PlanetItem";

export default function Planets({ waypoints = [] }) {
    return <ul className="flex justify-around flex-wrap px-5 pb-5 text-center">
        {waypoints.map((point) => {

            const hasShipyard = point.traits?.find(item => item.symbol === "SHIPYARD");
            const hasMarketplace = point.traits?.find(item => item.symbol === "MARKETPLACE");

            return <li className="flex flex-col justify-start" key={point.symbol}>
                <PlanetItem type={point.type}/>
                <span className="text-[0.6rem]">{point.symbol}</span>
                <div className="flex flex-col justify-center gap-2 mt-2">
                    {!!hasShipyard && <div className="text-xs">
                        shipyard
                    </div>}
                    {!!hasMarketplace && <div className="text-xs">
                        market
                    </div>}
                </div>
            </li>
        })}
    </ul>
}