export default function PlanetImg({ type }) {
    
    function img(type) {
        switch(type) {
            case "PLANET":
                return {
                    bg: "bg-[url('/assets/planets/continental-0.png')]",
                    animation: "animate-planet",
                    scale: 0.42,
                    size: 6.25,
                    translate: "translate(70%, 70%)"
                };
            case "MOON":
                return {
                    bg: "bg-[url('/assets/planets/barren-0.png')]",
                    animation: "animate-planet",
                    scale: 0.3,
                    size: 6.25,
                    translate: "translate(110%, 110%)"
                };
            case "ASTEROID":
                return {
                    bg: "bg-[url('/assets/asteroids/asteroid-0.png')]",
                    animation: "",
                    scale: 0.3,
                    size: 6.25,
                    translate: "translate(110%, 110%)"
                };
            case "GAS_GIANT":
                return {
                    bg: "bg-[url('/assets/planets/gas-giant-0.png')]",
                    animation: "animate-planet",
                    scale: 0.42,
                    size: 6.25,
                    translate: "translate(70%, 70%)"
                };
            case "ORBITAL_STATION":
                return {
                    bg: "bg-[url('/assets/special/station.png')]",
                    animation: "",
                    scale: 0.2,
                    size: 12.5,
                    translate: "translate(185%, 185%)"
                };
            case "JUMP_GATE":
                return {
                    bg: "bg-[url('/assets/special/jump-gate.png')]",
                    animation: "",
                    scale: 0.25,
                    size: 9.375,
                    backgroundPosition: "10.94rem 0.31rem",
                    translate: "translate(150%, 150%)"
                };
            case "BLACK_HOLE":
                return {
                    bg: "bg-[url('/assets/special/wormhole.png')]",
                    animation: "",
                    scale: 0.9,
                    size: 8,
                    translate: "translate(5%, 5%)"
                };
            default:
                return {
                    bg: "bg-[url('/assets/suns/sun-0.png')]",
                    animation: "animate-sun",
                    size: 9.375,
                    scale: 0.75 ,
                    translate: "translate(0%, 0%)"
                };
        }
    }

    const { bg, animation, scale, size, translate, backgroundPosition = ""} = img(type);

    return (
    <div style={{height: size*scale + "rem", width: size*scale + "rem"}}>
        <div
        style={{
            transform: `scale(${scale}) rotate(180deg) ${translate}`,
            height: size + "rem",
            width: size + "rem", backgroundPosition
        }}
        className={`${animation} ${bg}`}></div>
    </div>)
}