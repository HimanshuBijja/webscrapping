import { NextRequest, NextResponse } from "next/server";
import { fetchContestData } from "./fetchContestData";
import { filterContests } from "lib/app/utils/filterContests";

//filter based on source, date  sort based on start time, contest name
//http://localhost:3000/api/contest?source=all&day=all&month=all&sortBy=startTime&sortOrder=asc

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;

    const queryParameters = {

        source : query.get("source") ?? "all",
        day : query.get("day") ?? "all",
        month : query.get("month") ?? "all",
        sortBy : query.get("sortBy") ?? "all",
        sortOrder : query.get("sortOrder") ?? "all",
    }


    let upcomingContests = await fetchContestData();

    upcomingContests = filterContests(upcomingContests, queryParameters);



    return NextResponse.json({
        upcomingContests,
    });
}
