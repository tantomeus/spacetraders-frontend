export default function ShipImg({ status, ship, onClick }) {

    const undocked = status === "IN_ORBIT" || status === "IN_TRANSIT" 
    ? "scale-[2] -translate-y-2 drop-shadow-[0_5px_0_rgba(0,0,0,0.3)]" 
    : "";

    function shipImg(type) {
        switch(type) {
            case "FRAME_MINER":
                return {backgroundPosition: "-22rem -4.06rem", top: "-0.1rem", imageRendering: "pixelated"};
            case "FRAME_HEAVY_FREIGHTER":
                return {backgroundPosition: "-20rem -6rem", top: "0.1rem", imageRendering: "pixelated"};
            case "FRAME_FRIGATE":
                return {backgroundPosition: "-18rem -6rem", top: "0.1rem", imageRendering: "pixelated"};
            case "FRAME_LIGHT_FREIGHTER":
                return {backgroundPosition: "-18rem -6rem", top: "0.1rem", imageRendering: "pixelated"};
            case "FRAME_DRONE":
                return {backgroundPosition: "-14rem -6rem", top: "0rem", imageRendering: "pixelated"};
            default:
                return {display: "none"};
        }
    }

    if (onClick) return (
        <div onClick={onClick}
        className={`cursor-pointer relative icon-size-primary transition-primary ${undocked}`}>
            <div style={{backgroundPosition: "-26rem 0rem", imageRendering: "pixelated"}}
            className="bg-[url('/assets/ships.png')] icon-size-primary absolute z-10"></div>
            <div style={shipImg(ship?.frame.symbol)}
            className="bg-[url('/assets/ships.png')] icon-size-primary absolute"></div>
        </div>
    )

    return (
    <div
    className={`relative icon-size-primary transition-primary ${undocked}`}>
        <div style={{backgroundPosition: "-26rem 0rem", imageRendering: "pixelated"}}
        className="bg-[url('/assets/ships.png')] icon-size-primary absolute z-10"></div>
        <div style={shipImg(ship?.frame.symbol)}
        className="bg-[url('/assets/ships.png')] icon-size-primary absolute"></div>
    </div>)
}