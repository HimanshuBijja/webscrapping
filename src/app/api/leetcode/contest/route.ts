import axios from "axios";
import { NextResponse } from "next/server";

interface RenderContestType {
    startTime: number;
    title: string;
    source : string;
}

export async function GET() {
    const UPCOMING_CONTESTS_QUERY = `
        query contestUpcomingContests {
            allContests {
                title
                titleSlug
                startTime
            }
        }
        `;

    const LEETCODE_GRAPHQL_ENDPOINT = "https://leetcode.com/graphql";

    const lcResponse = await axios.post(
        LEETCODE_GRAPHQL_ENDPOINT,
        {
            query: UPCOMING_CONTESTS_QUERY,
        },
        {
            // Add the headers object here!
            headers: {
                "Content-Type": "application/json",
            },
        }
    );


    const data = await lcResponse.data.data.allContests;

    const now = Date.now() / 1000;
    const upcomingContests = data.filter(
        (contest: any) => contest.startTime > now
    );
    const updated = upcomingContests.map((val : any)=>({

        ...val,
        source : "leetcode"
    }))
    upcomingContests.sort(
        (a: RenderContestType, b: RenderContestType) =>
            a.startTime - b.startTime
    );

    

    return NextResponse.json({
        source : "Leetcode",
        // data : data,
        // upcomingContests
        updated
    });
}
