export function unixToDate(startTime : number){
    const unixTime = new Date(startTime * 1000);

    const hours = unixTime.getHours();
    let minutes;
    unixTime.getMinutes() < 10 ? minutes = "0" + unixTime.getMinutes() : minutes = unixTime.getMinutes()
    const seconds = "0" + unixTime.getSeconds();
    const time = hours + ":" + minutes;

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const year = unixTime.getFullYear();
    const month = months[unixTime.getMonth()];
    const date = unixTime.getDate();

    const formattedDate = date + " " + month;

    return {time, date , month};
}


