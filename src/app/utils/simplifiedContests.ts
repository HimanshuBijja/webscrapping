import { isoToUnix } from "./isoToUnix";

interface gfgContestType {
    slug: string;
    start_time: string;
    end_time: string;
    banner: {
        mobile_url: string;
        desktop_url: string;
    };
    name: string;
    status: string;
    time_diff: {
        days: 86;
        hours: 2087;
        mins: 7;
        secs: 23;
    };
    type: 3;
    date: string;
    time: string;
}

export function simplifiedGfgContests(contests: gfgContestType[]) {
    const simplified = contests.map((contest) => ({
        source: "Geeks for Geeks",
        title: contest.name,
        startTime: isoToUnix(contest.start_time),
        link: "https://www.geeksforgeeks.org/events",
    }));

    return simplified;
}

interface lcContestType {
    title: string;
    titleSlug: string;
    startTime: number;
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

interface ccContestType {
    contest_code: string;
    contest_name: string;
    contest_start_date: string;
    contest_end_date: string;
    contest_start_date_iso: string;
    contest_end_date_iso: string;
    contest_duration: string;
    distinct_users: number;
}

export function simplifiedCcContests(contests : ccContestType[]){
    const simplified = contests.map((contest) => ({
        source: "Code Chef",
        title: contest.contest_name,
        startTime: isoToUnix(contest.contest_start_date_iso),
        link: "https://www.codechef.com/contests",
    }));

    return simplified;
}


interface cfContestType {
    id: number;
    name: string;
    type: string;
    phase: string;
    frozen: boolean;
    durationSeconds: number;
    startTimeSeconds: number;
    relativeTimeSeconds: number;
}


export function simplifiedCfContests(contests : cfContestType[]){
    const simplified = contests.map((contest) => ({
        source: "Code Chef",
        title: contest.name,
        startTime: contest.startTimeSeconds,
        link: "https://codeforces.com/contests/",
    }));

    return simplified;
}



