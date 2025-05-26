interface lcContestType {
    startTime: number;
    title: string;
    titleSlug: string;
}

export function lcUpcomingContests(data: lcContestType[]) {
    const now = Date.now() / 1000;
    const upcomingContests = data.filter(
        (contest: lcContestType) => contest.startTime > now
    );
    upcomingContests.sort(
        (a: lcContestType, b: lcContestType) => a.startTime - b.startTime
    );

    return upcomingContests;
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

export function cfUpcomingContests(data: cfContestType[]) {
    const now = Date.now() / 1000;
    const upcomingContests = data.filter(
        (contest: cfContestType) => contest.startTimeSeconds > now
    );
    upcomingContests.sort(
        (a: cfContestType, b: cfContestType) => a.startTimeSeconds - b.startTimeSeconds
    );

    return upcomingContests;
}
