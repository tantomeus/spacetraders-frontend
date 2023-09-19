export default function FactionImg({ faction, className }) {

    function img(symbol) {
        switch(symbol) {
            case "COSMIC":
                return {backgroundPosition: "-300px -70px", height: "7", width: "7"};
            case "VOID":
                return {backgroundPosition: "-215px -70px", height: "6", width: "5.5"};
            case "GALACTIC":
                return {backgroundPosition: "-415px -70px", height: "6.5", width: "5"};
            case "QUANTUM":
                return {backgroundPosition: "-123px -70px", height: "6.5", width: "5.5"};
            case "DOMINION":
                return {backgroundPosition: "-15px -70px", height: "6.5", width: "5.5"};
            case "ASTRO":
                return {backgroundPosition: "110px -178px", height: "6.5", width: "6"};
            case "CORSAIRS":
                return {backgroundPosition: "-500px -70px", height: "7", width: "7"};
            case "OBSIDIAN":
                return {backgroundPosition: "-300px -178px", height: "7", width: "6.5"};
            case "AEGIS":
                return {backgroundPosition: "-515px -178px", height: "7", width: "6"};
            case "UNITED":
                return {backgroundPosition: "-207px -286px", height: "7", width: "6.5"};
            case "SOLITARY":
                return {backgroundPosition: "-318px -286px", height: "7", width: "5"};
            case "COBALT":
                return {backgroundPosition: "-106px -178px", height: "7", width: "6"};
            case "OMEGA":
                return {backgroundPosition: "-7px -178px", height: "7", width: "6.5"};
            case "ECHO":
                return {backgroundPosition: "-500px -286px", height: "7", width: "6"};
            case "LORDS":
                return {backgroundPosition: "-400px -286px", height: "7", width: "6"};
            case "CULT":
                return {backgroundPosition: "110px -70px", height: "7", width: "6"};
            case "ANCIENTS":
                return {backgroundPosition: "-120px -286px", height: "7", width: "5"};
            case "SHADOW":
                return {backgroundPosition: "-408px -178px", height: "7", width: "6"};
            default:
                return {backgroundPosition: "-8px -286px", height: "7", width: "6.5"};
        }
    }
    
    const {backgroundPosition, height, width} = img(faction);

    return <div className={`flex flex-col items-center rounded-md border border-stone-50 ${className}`}>
        <div style={{
            height: height/2 + "rem",
            width: width/2 + "rem"}}>
            <div style={{backgroundPosition, height: height + "rem", width: width + "rem"}} className="scale-[50%] bg-[url('/assets/factions.png')] origin-top-left"></div>
        </div>
        <span className="text-sm p-2">{faction}</span>
    </div>
}