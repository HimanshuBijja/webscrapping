import axios from "axios";
import {
    CODEFORCES_USER_ENDPOINT,
    LEETCODE_CONTESTS_QUERY,
    LEETCODE_ENDPOINT,
    LEETCODE_USER_PROBLEMS_SOLVED,
} from "lib/app/utils/apiConfig";
import { usernameTypes } from "lib/app/utils/types";

export async function fetchUserData({
    lcusername,
    cfusername,
    ccusername,
    gfgusername,
}: usernameTypes) {
    // const codeforcesResponse = await axios.post(CODEFORCES_USER_ENDPOINT, {
    //     headers: {
    //         "content-type": "application/json",
    //     },
    // });

    // const cfContests = simplifiedCfContests(
    //     cfUpcomingContests(codeforcesResponse.data.result)
    // );

    // const codechefResponse = await axios.post(CODECHEF_CONTESTS_ENDPOINT, {
    //     headers: {
    //         "content-type": "application/json",
    //     },
    // });

    // const ccContests = simplifiedCcContests(
    //     codechefResponse.data.future_contests
    // );

    // const geeksforgeeksResponse = await axios.post(
    //     GEEKSFORGEEKS_CONTESTS_ENDPOINT,
    //     {
    //         headers: {
    //             "content-type": "application/json",
    //         },
    //     }
    // );

    // const gfgContests = simplifiedGfgContests(
    //     geeksforgeeksResponse.data.results.upcoming
    // ); // array of objects

    const leetcodeResponseProblem = await axios.post(
        LEETCODE_ENDPOINT,
        {
            query: LEETCODE_USER_PROBLEMS_SOLVED,
            variables: { username: lcusername},
        },
        {
            headers: {
                "content-type": "application/json",
            },
        }
    ); // array of objects
    const leetcodeResponseContest = await axios.post(
        LEETCODE_ENDPOINT,
        {
            query: LEETCODE_CONTESTS_QUERY,
            variables: { username: lcusername},
        },
        {
            headers: {
                "content-type": "application/json",
            },
        }
    ); // array of objects

    // const upcomingContests = [
    //     ...cfContests,
    //     // ...ccContests,
    //     ...gfgContests,
    //     ...lcContests,
    // ];

    // return addDate(upcomingContests);

    return leetcodeResponseContest.data;
}
