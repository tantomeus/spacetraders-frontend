export default function FactionImg({ faction, className = "" }) {

    function img(symbol) {
        switch(symbol) {
            case "COSMIC":
                return {backgroundPosition: "-18.75rem -4.375rem", height: "7", width: "7"};
            case "VOID":
                return {backgroundPosition: "-13.438rem -4.375rem", height: "6", width: "5.5"};
            case "GALACTIC":
                return {backgroundPosition: "-25.94rem -4.375rem", height: "6.5", width: "5"};
            case "QUANTUM":
                return {backgroundPosition: "-7.69rem -4.375rem", height: "6.5", width: "5.5"};
            case "DOMINION":
                return {backgroundPosition: "-0.93rem -4.375rem", height: "6.5", width: "5.5"};
            case "ASTRO":
                return {backgroundPosition: "6.88rem -11.125rem", height: "6.5", width: "6"};
            case "CORSAIRS":
                return {backgroundPosition: "-31.25rem -4.375rem", height: "7", width: "7"};
            case "OBSIDIAN":
                return {backgroundPosition: "-18.75rem -11.125rem", height: "7", width: "6.5"};
            case "AEGIS":
                return {backgroundPosition: "-32.19rem -11.125rem", height: "7", width: "6"};
            case "UNITED":
                return {backgroundPosition: "-12.94rem -17.875rem", height: "7", width: "6.5"};
            case "SOLITARY":
                return {backgroundPosition: "-19.88rem -17.875rem", height: "7", width: "5"};
            case "COBALT":
                return {backgroundPosition: "-6.63rem -11.125rem", height: "7", width: "6"};
            case "OMEGA":
                return {backgroundPosition: "-0.44rem -11.125rem", height: "7", width: "6.5"};
            case "ECHO":
                return {backgroundPosition: "-31.25rem -17.875rem", height: "7", width: "6"};
            case "LORDS":
                return {backgroundPosition: "-25rem -17.875rem", height: "7", width: "6"};
            case "CULT":
                return {backgroundPosition: "6.88rem -4.375rem", height: "7", width: "6"};
            case "ANCIENTS":
                return {backgroundPosition: "-7.5rem -17.875rem", height: "7", width: "5"};
            case "SHADOW":
                return {backgroundPosition: "-25.5rem -11.125rem", height: "7", width: "6"};
            default:
                return {backgroundPosition: "-0.5rem -17.875rem", height: "7", width: "6.5"};
        }
    }
    
    const {backgroundPosition, height, width} = img(faction);

    return (
    <div className={`flex flex-col items-center rounded-md border border-stone-50 ${className}`}>
        <div style={{ height: height/2 + "rem", width: width/2 + "rem"}}>
            <div style={{backgroundPosition, height: height + "rem", width: width + "rem"}}
            className="scale-[50%] bg-[url('/assets/factions.png')] origin-top-left"></div>
        </div>
        <span className="text-sm p-2">{faction}</span>
    </div>)
}