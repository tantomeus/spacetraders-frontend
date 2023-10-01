export function convertSeconds(time) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - (hours * 3600)) / 60);
    let seconds = time - (hours * 3600) - (minutes * 60);

    if (hours < 10) hours   = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    return `${hours} : ${minutes} : ${seconds}`;
}

export function shorten(number) {
    if (!number && number !== 0) return;
    if (number < 1000) return number.toFixed(2).replace(".00", "");

    return shorten(number / 1000) + "k";
}

export function formatDate(date) {
    const formated =  date.split("T")[0].split("-");
    return `${formated[2]}.${formated[1]}.${formated[0]}`;
}