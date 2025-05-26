
import { NextRequest, NextResponse } from "next/server";
import { fetchContestData } from "./fetchContestData";


//filter based on source, date  sort based on start time
//http://localhost:3000/api/contest?source=All&date=All&sort=ac




export async function GET(req: NextRequest) {
    
    const upcomingContests =await fetchContestData();
    upcomingContests.sort((a,b) => a.startTime-b.startTime)


    return NextResponse.json({
        upcomingContests,
    });
}
