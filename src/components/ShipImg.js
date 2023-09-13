export default function ShipImg({ status, ship, onClick }) {

    const orbitClasses = status === "IN_ORBIT" 
    ? "scale-[2] -translate-y-2 drop-shadow-[0_5px_0_rgba(0,0,0,0.3)]" 
    : "";

    function shipImg(type) {
        switch(type) {
            case "FRAME_PROBE":
                return {display: "none"};
            case "FRAME_MINER":
                return {backgroundPosition: "-352px -65px", top: "-0.1rem", imageRendering: "pixelated"};
            case "FRAME_LIGHT_FREIGHTER":
                return {backgroundPosition: "-320px -96px", top: "0.1rem", imageRendering: "pixelated"};
            case "FRAME_FRIGATE":
                return {backgroundPosition: "-320px -96px", top: "0.1rem", imageRendering: "pixelated"};
            case "FRAME_HEAVY_FREIGHTER":
                return {backgroundPosition: "-288px -96px", top: "0.1rem", imageRendering: "pixelated"};
            case "FRAME_DRONE":
                return {backgroundPosition: "-224px -96px", top: "0rem", imageRendering: "pixelated"};
        }
    }

    if (onClick) return (
        <div onClick={onClick}
        className={`cursor-pointer relative h-8 w-8 transition duration-300 ease-out ${orbitClasses}`}>
            <div style={{backgroundPosition: "-416px 0px", imageRendering: "pixelated"}} className="bg-[url('/assets/ships.png')] h-8 w-8 absolute z-10"></div>
            <div style={shipImg(ship.frame.symbol)} className="bg-[url('/assets/ships.png')] h-8 w-8 absolute"></div>
        </div>
    )

    return <div
    className={`relative h-8 w-8 transition duration-300 ease-out ${orbitClasses}`}>
        <div style={{backgroundPosition: "-416px 0px", imageRendering: "pixelated"}} className="bg-[url('/assets/ships.png')] h-8 w-8 absolute z-10"></div>
        <div style={shipImg(ship.frame.symbol)} className="bg-[url('/assets/ships.png')] h-8 w-8 absolute"></div>
    </div>
}