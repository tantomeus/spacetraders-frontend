import PlanetImg from "./PlanetImg";
import { GiShipWheel, GiTakeMyMoney } from "react-icons/gi";

export default function Planets({ waypoints = [], className = "", icons = false }) {
    return (
    <ul className={`${className} flex gap-4 justify-around items-end flex-wrap px-5 pb-5 text-center`}>
        {waypoints.map((point) => {

            const hasShipyard = point.traits?.find(item => item.symbol === "SHIPYARD");
            const hasMarketplace = point.traits?.find(item => item.symbol === "MARKETPLACE");

            return <li className={`flex flex-col justify-end items-center mt-6`} key={point.symbol}>
                <PlanetImg type={point.type}/>
                <span className="text-[0.6rem] mt-4">{point.symbol}</span>

                {icons&& <div className="grid grid-cols-2 gap-2 mt-4">
                    {!!hasShipyard 
                    ? <GiShipWheel
                    className="bg-amber-600 p-2 rounded-full icon-size-primary white-border justify-self-end"/>
                    : <GiShipWheel
                    className="disable-color p-2 rounded-full icon-size-primary white-border justify-self-end"/>}
                    {!!hasMarketplace
                    ? <GiTakeMyMoney
                    className="bg-amber-600 p-2 rounded-full icon-size-primary white-border justify-self-start"/>
                    : <GiTakeMyMoney
                    className="disable-color p-2 rounded-full icon-size-primary white-border justify-self-start"/>}
                </div>}
            </li>
        })}
    </ul>)
}