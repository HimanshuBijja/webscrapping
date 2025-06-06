import axios from "axios";
import {
    CODEFORCES_USER_ENDPOINT,
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

    const fetchCodeforces = async () => {
        if (!cfusername) {
            //checked everything is working fine
            return {
                success: false,
                msg: "Enter Username",
            };
        } else {
            try {
                const codeforcesFullResponse = await axios.get(
                    CODEFORCES_USER_ENDPOINT + cfusername,
                    {
                        headers: {
                            "content-type": "application/json",
                        },
                    }
                );
                return {
                    success: true,
                    msg: "Success",
                    data: codeforcesFullResponse.data,
                };
            } catch (error) {
                return {
                    success: false,
                    msg: "Incorrect Username",
                };
            }
        }
    };

    const fetchGeeksforgeeks = async () => {
        if (!gfgusername) {
            // checked everything
            return {
                success: false,
                msg: "Enter Username",
            };
        } else {
            try {
                const geeksforgeeksFullResponse = await axios.get(
                    `https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${gfgusername}&article_count=false&redirect=true`,

                    {
                        headers: {
                            "content-type": "application/json",
                        },
                    }
                );
                return {
                    success: true,
                    msg: "Success",
                    data: geeksforgeeksFullResponse.data,
                };
            } catch (error) {
                return {
                    success: false,
                    msg: "Incorrect Username",
                };
            }
        }
    };

    const fetchLeetcode = async () => {
        if (!lcusername) {
            // checked everything is working fine
            return {
                success: false,
                msg: "Enter Username",
            };
        } else {
            try {
                const leetcodeResponseProblem = await axios.post(
                    LEETCODE_ENDPOINT,
                    {
                        query: LEETCODE_USER_PROBLEMS_SOLVED,
                        variables: { username: lcusername },
                    },
                    {
                        headers: {
                            "content-type": "application/json",
                        },
                    }
                );
                if (leetcodeResponseProblem.data.data.matchedUser === null) {
                    return {
                        success: false,
                        msg: "Incorrect Username",
                    };
                } else {
                    const lcProblemsSolved = lcsimplifiedUserData(
                        leetcodeResponseProblem.data
                    );

                    const leetcodeResponseContest = await axios.post(
                        LEETCODE_ENDPOINT,
                        {
                            query: LEETCODE_USER_CONTEST_HISTORY,
                            variables: { username: lcusername },
                        },
                        {
                            headers: {
                                "content-type": "application/json",
                            },
                        }
                    ); // array of objects
                    const lcattendedContests = lcattendedUserContests(
                        leetcodeResponseContest.data.data
                            .userContestRankingHistory
                    );
                    return {
                        success: true,
                        msg: "Success",
                        lcProblemsSolved,
                        lcattendedContests,
                    };
                }
            } catch (error) {
                return {
                    success: false,
                    msg: "Incorrect Username",
                };
            }
        }
    };

    const [codeforcesResponse, geeksforgeeksResponse, leetcodeResponse] = await Promise.all([
        fetchCodeforces(),
        fetchGeeksforgeeks(),
        fetchLeetcode(),
    ]);

    return {
        codeforcesResponse,
        geeksforgeeksResponse,
        leetcodeResponse,
    };
}


/*

lc - fjzzq2002
gfg - yash85
cf - tourist

*/
