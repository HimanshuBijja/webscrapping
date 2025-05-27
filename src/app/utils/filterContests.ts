import { filterContestsType, upcomingContestsType } from "./types";


export function filterContests(
    upcomingContests: upcomingContestsType[],
    { source, day, month, sortBy, sortOrder }: filterContestsType
) {
    if (!(source == "all")) {
        upcomingContests = upcomingContests.filter(
            (contest) => contest.source === source
        );
    }
    if (!(day == "all" || month == "all")) {
        upcomingContests = upcomingContests.filter(
            (contest) =>
                contest.date.day === Number(day) &&
                contest.date.month === String(month)
        );
    }

    if (month !== "all") {
        upcomingContests = upcomingContests.filter(
            (contest) => contest.date.month === String(month)
        );
    }

    sortOrder === "desc"
        ? upcomingContests.sort((a, b) => {
              const valA = a[sortBy as keyof typeof a];
              const valB = b[sortBy as keyof typeof b];
              if (typeof valA === "number" && typeof valB === "number") {
                  return valB - valA;
              }
              return String(valB).localeCompare(String(valA));
          })
        : upcomingContests.sort((a, b) => {
              const valA = a[sortBy as keyof typeof a];
              const valB = b[sortBy as keyof typeof b];
              if (typeof valA === "number" && typeof valB === "number") {
                  return valA - valB;
              }
              return String(valA).localeCompare(String(valB));
          });

    return upcomingContests;
}
