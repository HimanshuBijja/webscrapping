import axios, { AxiosError } from "axios";
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
                    // `https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${gfgusername}&article_count=false&redirect=true`,
                    `https://www.geeksforgeeks.org/gfg-assets/_next/data/njCeTIGFZ6rgJo6BAHVZ9/user/${gfgusername}.json`,

                    {
                        headers: {
                            "content-type": "application/json",
                        },
                    }
                );

                const {
                    badgesInfo,
                    footerData,
                    headerData,
                    heatMapData,
                    initialState,
                    lineChartData,
                    subHeaderData,
                    ...destructuredData
                } = geeksforgeeksFullResponse.data.pageProps;   
                const userSubmissionsInfo = {
                    ...destructuredData.userSubmissionsInfo,
                    Medium : Object.keys(destructuredData.userSubmissionsInfo.Medium).length > 0 ? Object.keys(destructuredData.userSubmissionsInfo.Medium).length : 0,
                    Hard : Object.keys(destructuredData.userSubmissionsInfo.Hard).length > 0 ? Object.keys(destructuredData.userSubmissionsInfo.Hard).length : 0,
                    Easy : Object.keys(destructuredData.userSubmissionsInfo.Easy).length > 0 ? Object.keys(destructuredData.userSubmissionsInfo.Easy).length : 0,
                    Basic : Object.keys(destructuredData.userSubmissionsInfo.Basic).length > 0 ? Object.keys(destructuredData.userSubmissionsInfo.Basic).length : 0,
                    School : Object.keys(destructuredData.userSubmissionsInfo.School).length > 0 ? Object.keys(destructuredData.userSubmissionsInfo.School).length : 0,
                }
                const {contest_data, ...rest} = destructuredData.contestData.user_contest_data
                const user_contest_data = rest
                const contestData = {
                    ...destructuredData.contestData,
                    user_contest_data,
                }
                    

                const response = {
                    ...destructuredData,
                    userSubmissionsInfo,
                    contestData,
                }

                return {
                    success: true,
                    msg: "Success",
                    data: response,
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

    const [codeforcesResponse, geeksforgeeksResponse, leetcodeResponse] =
        await Promise.all([
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

// { // added types for v2
// import axios, { AxiosError } from "axios";
// import {
//     CODEFORCES_USER_ENDPOINT,
//     LEETCODE_ENDPOINT,
//     LEETCODE_USER_CONTEST_HISTORY,
//     LEETCODE_USER_PROBLEMS_SOLVED,
// } from "lib/app/utils/apiConfig";
// import { lcattendedUserContests } from "lib/app/utils/filterUserData";
// import { lcsimplifiedUserData } from "lib/app/utils/simplifiedUserData";
// import { usernameTypes } from "lib/app/utils/types";

// // Define return types for better type safety

//     interface BaseResponse {
//         success: boolean;
//     msg: string;
// }

// interface ErrorResponse extends BaseResponse {
//     success: false;
// }

// // Platform-specific success response types
// interface CodeforcesSuccessResponse extends BaseResponse {
//     success: true;
//     data: any;
// }

// interface GeeksforGeeksSuccessResponse extends BaseResponse {
//     success: true;
//     data: any;
// }

// interface LeetCodeSuccessResponse extends BaseResponse {
//     success: true;
//     lcProblemsSolved: any;
//     lcattendedContests: any;
// }

// // Union types for each platform
// type CodeforcesResponse = CodeforcesSuccessResponse | ErrorResponse;
// type GeeksforGeeksResponse = GeeksforGeeksSuccessResponse | ErrorResponse;
// type LeetCodeResponse = LeetCodeSuccessResponse | ErrorResponse;

// // Helper function to handle API errors more specifically
// const handleApiError = (error: unknown, platform: string): ErrorResponse => {
//     if (axios.isAxiosError(error)) {
//         const axiosError = error as AxiosError;

//         if (axiosError.response?.status === 404) {
//             return {
//                 success: false,
//                 msg: "User not found",
//             };
//         } else if (axiosError.response?.status === 429) {
//             return {
//                 success: false,
//                 msg: "Rate limit exceeded. Please try again later.",
//             };
//         } else if (axiosError.code === 'ECONNABORTED' || axiosError.code === 'ETIMEDOUT') {
//             return {
//                 success: false,
//                 msg: "Request timeout. Please check your connection.",
//             };
//         } else if (!axiosError.response) {
//             return {
//                 success: false,
//                 msg: `${platform} service is currently unavailable`,
//             };
//         }
//     }

//     return {
//         success: false,
//         msg: "An unexpected error occurred",
//     };
// };

// // Common axios configuration
// const commonHeaders = {
//     "content-type": "application/json",
// };

// export async function fetchUserData({
//     lcusername,
//     cfusername,
//     ccusername, // Still unused - consider removing if not needed
//     gfgusername,
// }: usernameTypes) {

//     const fetchCodeforces = async (): Promise<CodeforcesResponse> => {
//         if (!cfusername?.trim()) {
//             return {
//                 success: false,
//                 msg: "Enter Username",
//             };
//         }

//         try {
//             const codeforcesFullResponse = await axios.get(
//                 CODEFORCES_USER_ENDPOINT + cfusername,
//                 {
//                     headers: commonHeaders,
//                     timeout: 10000, // 10 second timeout
//                 }
//             );
//             return {
//                 success: true,
//                 msg: "Success",
//                 data: codeforcesFullResponse.data,
//             };
//         } catch (error) {
//             return handleApiError(error, "Codeforces");
//         }
//     };

//     const fetchGeeksforgeeks = async (): Promise<GeeksforGeeksResponse> => {
//         if (!gfgusername?.trim()) {
//             return {
//                 success: false,
//                 msg: "Enter Username",
//             };
//         }

//         try {
//             const geeksforgeeksFullResponse = await axios.get(
//                 `https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${gfgusername}&article_count=false&redirect=true`,
//                 {
//                     headers: commonHeaders,
//                     timeout: 10000,
//                 }
//             );
//             return {
//                 success: true,
//                 msg: "Success",
//                 data: geeksforgeeksFullResponse.data,
//             };
//         } catch (error) {
//             return handleApiError(error, "GeeksforGeeks");
//         }
//     };

//     const fetchLeetcode = async (): Promise<LeetCodeResponse> => {
//         if (!lcusername?.trim()) {
//             return {
//                 success: false,
//                 msg: "Enter Username",
//             };
//         }

//         try {
//             const leetcodeResponseProblem = await axios.post(
//                 LEETCODE_ENDPOINT,
//                 {
//                     query: LEETCODE_USER_PROBLEMS_SOLVED,
//                     variables: { username: lcusername },
//                 },
//                 {
//                     headers: commonHeaders,
//                     timeout: 15000, // Longer timeout for GraphQL queries
//                 }
//             );

//             if (leetcodeResponseProblem.data.data.matchedUser === null) {
//                 return {
//                     success: false,
//                     msg: "User not found",
//                 };
//             }

//             const lcProblemsSolved = lcsimplifiedUserData(
//                 leetcodeResponseProblem.data
//             );

//             const leetcodeResponseContest = await axios.post(
//                 LEETCODE_ENDPOINT,
//                 {
//                     query: LEETCODE_USER_CONTEST_HISTORY,
//                     variables: { username: lcusername },
//                 },
//                 {
//                     headers: commonHeaders,
//                     timeout: 15000,
//                 }
//             );

//             const lcattendedContests = lcattendedUserContests(
//                 leetcodeResponseContest.data.data.userContestRankingHistory
//             );

//             return {
//                 success: true,
//                 msg: "Success",
//                 lcProblemsSolved,
//                 lcattendedContests,
//             };
//         } catch (error) {
//             return handleApiError(error, "LeetCode");
//         }
//     };

//     try {
//         const [codeforcesResponse, geeksforgeeksResponse, leetcodeResponse] =
//         await Promise.all([
//             fetchCodeforces(),
//             fetchGeeksforgeeks(),
//             fetchLeetcode(),
//         ]);

//         return {
//             codeforcesResponse,
//             geeksforgeeksResponse,
//             leetcodeResponse,
//         };
//     } catch (error) {
//         // This shouldn't happen since individual functions handle their own errors,
//         // but it's good to have as a fallback
//         console.error("Unexpected error in fetchUserData:", error);
//         throw new Error("Failed to fetch user data");
//     }
// }
// }

/*

lc - fjzzq2002
gfg - yash85
cf - tourist

*/

// https://www.codechef.com/api/rankings/START189D?itemsPerPage=100&order=asc&page=1&search=glow_shine_36&sortBy=rank
