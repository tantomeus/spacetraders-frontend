export function convertSeconds(time) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - (hours * 3600)) / 60);
    let seconds = time - (hours * 3600) - (minutes * 60);

    if (hours < 10) hours   = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    return `${hours} : ${minutes} : ${seconds}`;
}

export function shipImg(type) {
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