export function getPlanetStyles(type) {
    switch(type) {
        case "PLANET":
            return {bg: "bg-[url('/assets/planets/continental-0.png')]", animation: "animate-planet", scale: "scale(42%)", size: "100px", size: "100px", m: "-my-4 mx-auto"};
        case "MOON":
            return {bg: "bg-[url('/assets/planets/barren-0.png')]", animation: "animate-planet", scale: "scale(30%)", size: "100px", m: "-my-4 mx-auto"};
        case "ASTEROID_FIELD":
            return {bg: "bg-[url('/assets/asteroids/asteroid-0.png')]", animation: "", scale: "scale(42%)", size: "100px", m: "-my-4 mx-auto"};
        case "GAS_GIANT":
            return {bg: "bg-[url('/assets/planets/gas-giant-0.png')]", animation: "animate-planet", scale: "scale(42%)", size: "100px", m: "-my-4 mx-auto"};
        case "ORBITAL_STATION":
            return {bg: "bg-[url('/assets/planets/continental-0.png')]", animation: "animate-planet", scale: "scale(42%)", size: "100px", m: "-my-4 mx-auto"};
        case "JUMP_GATE":
            return {bg: "bg-[url('/assets/special/wormhole.png')]", animation: "", scale: "scale(50%)", size: "128px", m: "-my-7 mx-auto"};
        case "RED_STAR":
            return {bg: "bg-[url('/assets/suns/sun-0.png')]", animation: "animate-sun", scale: "scale(42%)", size: "200px", m: "-my-4 mx-auto"};
        case "YOUNG_STAR":
            return {bg: "bg-[url('/assets/suns/sun-0.png')]", animation: "animate-sun", scale: "scale(42%)", size: "200px", m: "-my-4 mx-auto"};
        case "HYPERGIANT":
            return {bg: "bg-[url('/assets/suns/sun-0.png')]", animation: "animate-sun", scale: "scale(42%)", size: "200px", m: "-my-4 mx-auto"};
        case "ORANGE_STAR":
            return {bg: "bg-[url('/assets/suns/sun-0.png')]", animation: "animate-sun", scale: "scale(42%)", size: "200px", m: "-my-4 mx-auto"};
        case "BLUE_STAR":
            return {bg: "bg-[url('/assets/suns/sun-0.png')]", animation: "animate-sun", scale: "scale(42%)", size: "200px", m: "-my-4 mx-auto"};
    }
}