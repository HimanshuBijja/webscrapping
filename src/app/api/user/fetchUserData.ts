import axios from "axios";
import {
    CODEFORCES_USER_ENDPOINT,
    GEEKSFORGEEKS_USER_ENDPOINT,
    LEETCODE_CONTESTS_QUERY,
    LEETCODE_ENDPOINT,
    LEETCODE_USER_CONTEST_HISTORY,
    LEETCODE_USER_PROBLEMS_SOLVED,
} from "lib/app/utils/apiConfig";
import { lcattendedUserContests } from "lib/app/utils/filterUserData";
import { lcsimplifiedUserData } from "lib/app/utils/simplifiedUserData";
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

    const geeksforgeeksResponse = await axios.get(
        `https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${gfgusername}&article_count=false&redirect=true`,
       
        {
            headers: {
                "content-type": "application/json",
            },
        }
    );


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
    const lcProblemsSolved = lcsimplifiedUserData(leetcodeResponseProblem.data)


    const leetcodeResponseContest = await axios.post(
        LEETCODE_ENDPOINT,
        {
            query: LEETCODE_USER_CONTEST_HISTORY,
            variables: { username: lcusername},
        },
        {
            headers: {
                "content-type": "application/json",
            },
        }
    ); // array of objects
    const lcattendedContests = lcattendedUserContests(leetcodeResponseContest.data.data.userContestRankingHistory)
    
    // const upcomingContests = [
    //     ...cfContests,
    //     // ...ccContests,
    //     ...gfgContests,
    //     ...lcContests,
    // ];

    // return addDate(upcomingContests);

    // return leetcodeResponseContest.data;
    return geeksforgeeksResponse.data;
}
