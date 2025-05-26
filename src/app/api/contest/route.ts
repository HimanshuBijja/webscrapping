import axios from "axios";
import {
    CODECHEF_CONTESTS_ENDPOINT,
    CODEFORCES_CONTESTS_ENDPOINT,
    GEEKSFORGEEKS_CONTESTS_ENDPOINT,
    LEETCODE_CONTESTS_QUERY,
    LEETCODE_ENDPOINT,
} from "lib/app/utils/apiConfig";
import { cfUpcomingContests, lcUpcomingContests } from "lib/app/utils/UpcomingContest";
import {
    simplifiedCcContests,
    simplifiedCfContests,
    simplifiedGfgContests,
    simplifiedLcContests,
} from "lib/app/utils/simplifiedContests";

export async function GET() {
    const codeforcesResponse = await axios.get(CODEFORCES_CONTESTS_ENDPOINT, {
        headers: {
            "content-type": "application/json",
        },
    });

    const cfContests = simplifiedCfContests(cfUpcomingContests(codeforcesResponse.data.result))


    const codechefResponse = await axios.get(CODECHEF_CONTESTS_ENDPOINT, {
        headers: {
            "content-type": "application/json",
        },
    });



    const ccContests = simplifiedCcContests(codechefResponse.data.future_contests)



    const geeksforgeeksResponse = await axios.get(
        GEEKSFORGEEKS_CONTESTS_ENDPOINT,
        {
            headers: {
                "content-type": "application/json",
            },
        }
    );

    const gfgContests = simplifiedGfgContests(
        geeksforgeeksResponse.data.results.upcoming
    ); // array of objects

    const leetcodeResponse = await axios.post(
        LEETCODE_ENDPOINT,
        {
            query: LEETCODE_CONTESTS_QUERY,
        },
        {
            headers: {
                "content-type": "application/json",
            },
        }
    );

    const lcContests = simplifiedLcContests(
        lcUpcomingContests(leetcodeResponse.data.data.allContests)
    );// array of objects

    const upcomingContests = [
        ...cfContests,
        ...ccContests,
        ...gfgContests,
        ...lcContests
    ]
    
    return Response.json({
        upcomingContests,
    });
}
