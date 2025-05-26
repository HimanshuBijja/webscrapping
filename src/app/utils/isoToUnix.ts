export function isoToUnix(isoString : string) {
    const unixTimestamp = Math.floor(new Date(isoString).getTime() / 1000);
    return unixTimestamp
}
