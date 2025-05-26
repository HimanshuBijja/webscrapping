import { NextRequest, NextResponse } from "next/server";
import { fetchContestData } from "./fetchContestData";

//filter based on source, date  sort based on start time, contest name
//http://localhost:3000/api/contest?source=All&date=All&sortBy=startTime&sortOrder=asc

/*
source -> filter
date -> filter


*/

export async function GET(req: NextRequest) {
    let upcomingContests = await fetchContestData();

    // upcomingContests = upcomingContests.filter(
    //     (contest) => contest.source === "Leetcode"
    // ); 
    // upcomingContests = upcomingContests.filter(
    //     (contest) => contest.date.day === 1 && contest.date.month === "Jun"
    // ); 

    // upcomingContests.sort((a,b) => a.startTime-b.startTime)//asc  startTime will be dynamic
    // upcomingContests.sort((a,b) => b.startTime-a.startTime)//desc

    return NextResponse.json({
        upcomingContests,
    });
}
