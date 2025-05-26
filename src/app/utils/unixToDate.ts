function unixToDate(startTime : number){
    const time = new Date(startTime * 1000);

    const hours = time.getHours();
    const minutes = "0" + time.getMinutes();
    const seconds = "0" + time.getSeconds();
    const formattedTime = hours + ":" + minutes;

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
    const year = time.getFullYear();
    const month = months[time.getMonth()];
    const date = time.getDate();

    const formattedDate = date + " " + month;

    return {formattedTime, formattedDate};
}


