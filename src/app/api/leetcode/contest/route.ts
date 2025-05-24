import axios from "axios";
import { NextResponse } from "next/server";

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

    const response = await axios.post(
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

    const data = await response.data.data.allContests;

    return NextResponse.json({
        data : data,
    });
}
