import { isoToUnix } from "./isoToUnix";
import {
    addDateType,
    ccContestType,
    cfContestType,
    gfgContestType,
    lcContestType,
} from "./types";
import { unixToDate } from "./unixToDate";

export function simplifiedGfgContests(contests: gfgContestType[]) {
    const simplified = contests.map((contest) => ({
        source: "Geeks for Geeks",
        title: contest.name,
        startTime: isoToUnix(contest.start_time),
        link: "https://www.geeksforgeeks.org/events",
    }));

    return simplified;
}

export function simplifiedLcContests(contests: lcContestType[]) {
    const simplified = contests.map((contest) => ({
        source: "Leetcode",
        title: contest.title,
        startTime: contest.startTime,
        link: "https://leetcode.com/contest/",
    }));

    return simplified;
}

export function simplifiedCcContests(contests: ccContestType[]) {
    const simplified = contests.map((contest) => ({
        source: "Code Chef",
        title: contest.contest_name,
        startTime: isoToUnix(contest.contest_start_date_iso),
        link: "https://www.codechef.com/contests",
    }));

    return simplified;
}

export function simplifiedCfContests(contests: cfContestType[]) {
    const simplified = contests.map((contest) => ({
        source: "Code forces",
        title: contest.name,
        startTime: contest.startTimeSeconds,
        link: "https://codeforces.com/contests/",
    }));

    return simplified;
}

export function addDate(contests: addDateType[]) {
    const simplified = contests.map((contest) => ({
        ...contest,
        date: unixToDate(contest.startTime),
    }));

    return simplified;
}
