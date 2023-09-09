export default function PlanetItem({ type, origin = "center" }) {
    let data;

    switch(type) {
        case "PLANET":
            data = {bg: "bg-[url('/assets/planets/continental-0.png')]", animation: "animate-planet", scale: "scale(42%)", size: "100px", size: "100px", m: "-my-4 mx-auto"};
            break;
        case "MOON":
            data = {bg: "bg-[url('/assets/planets/barren-0.png')]", animation: "animate-planet", scale: "scale(30%)", size: "100px", m: "-my-4 mx-auto"};
            break;
        case "ASTEROID_FIELD":
            data = {bg: "bg-[url('/assets/asteroids/asteroid-0.png')]", animation: "", scale: "scale(42%)", size: "100px", m: "-my-4 mx-auto"};
            break;
        case "GAS_GIANT":
            data = {bg: "bg-[url('/assets/planets/gas-giant-0.png')]", animation: "animate-planet", scale: "scale(42%)", size: "100px", m: "-my-4 mx-auto"};
            break;
        case "ORBITAL_STATION":
            data = {bg: "bg-[url('/assets/planets/dry-0.png')]", animation: "animate-planet", scale: "scale(42%)", size: "100px", m: "-my-4 mx-auto"};
            break;
        case "JUMP_GATE":
            data = {bg: "bg-[url('/assets/special/wormhole.png')]", animation: "", scale: "scale(50%)", size: "128px", m: "-my-7 mx-auto"};
            break;
        case "BLACK_HOLE":
            data = {bg: "bg-[url('/assets/nebulae/nebula-0.png')]", animation: "", scale: "scale(50%)", size: "128px", m: "-my-7 mx-auto"};
            break;
        case "RED_STAR":
            data = {bg: "bg-[url('/assets/suns/sun-0.png')]", animation: "animate-sun", scale: "scale(42%)", size: "200px", m: ""};
            break;
        case "YOUNG_STAR":
            data = {bg: "bg-[url('/assets/suns/sun-0.png')]", animation: "animate-sun", scale: "scale(42%)", size: "200px", m: ""};
            break;
        case "HYPERGIANT":
            data = {bg: "bg-[url('/assets/suns/sun-0.png')]", animation: "animate-sun", scale: "scale(42%)", size: "200px", m: ""};
            break;
        case "ORANGE_STAR":
            data = {bg: "bg-[url('/assets/suns/sun-0.png')]", animation: "animate-sun", scale: "scale(42%)", size: "200px", m: ""};
            break;
        case "BLUE_STAR":
            data = {bg: "bg-[url('/assets/suns/sun-0.png')]", animation: "animate-sun", scale: "scale(42%)", size: "200px", m: ""};
            break;
        case "NEUTRON_STAR":
            data = {bg: "bg-[url('/assets/suns/sun-0.png')]", animation: "animate-sun", scale: "scale(42%)", size: "200px", m: ""};
            break;
    }

    const { bg, animation, scale, size, m } = data;

    return <div style={{transformOrigin: origin, transform: scale, height: size, width: size}} className={`${m} ${animation} ${bg}`}></div>
}