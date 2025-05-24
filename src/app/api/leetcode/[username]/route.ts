import axios from "axios";

export async function GET(req: Request, { params }: { params: { username: string } }) {
    const { username } = params;
    console.log(username);
    const LEETCODE_CONTEST_QUERY_WITH_HISTORY = `
        query userContestRankingInfo($username: String!) {
            userContestRanking(username: $username) {
                attendedContestsCount
                rating
                globalRanking
                totalParticipants
                topPercentage
                
            }
            userContestRankingHistory(username: $username) {
                attended
                trendDirection
                problemsSolved
                totalProblems
                finishTimeInSeconds
                rating
                ranking
                contest {
                title
                startTime
                }
            }
        }
        `;

    const LEETCODE_USER_PROBLEMS_SOLVED = `
        query userSessionProgress($username: String!) {
            allQuestionsCount {    
                difficulty   
                count
            }
            matchedUser(username: $username) {
                submitStats {
                    acSubmissionNum {
                        difficulty
                        count
                    }    
                }
            }
        }`;

    const LEETCODE_GRAPHQL_ENDPOINT = "https://leetcode.com/graphql";

    const response = await axios.post(
        LEETCODE_GRAPHQL_ENDPOINT,
        {
            query: LEETCODE_USER_PROBLEMS_SOLVED,
            variables: { username: username },
        },
        {
            headers: {
                "content-type": "application/json",
            },
        }
    );
    const response2 = await axios.post(
        LEETCODE_GRAPHQL_ENDPOINT,
        {
            query: LEETCODE_CONTEST_QUERY_WITH_HISTORY,
            variables: { username: username },
        },
        {
            headers: {
                "content-type": "application/json",
            },
        }
    );

    const contest = response2.data
    const userContestRanking = contest.data.userContestRanking;
    let userContestRankingHistory = contest.data.userContestRankingHistory
    userContestRankingHistory = userContestRankingHistory.filter((contest:any) => contest.attended == true)

    const data = response.data.data

    const allQuestions = data.allQuestionsCount;
    const solvedQuestions = data.matchedUser.submitStats.acSubmissionNum
    return Response.json({
        userContestRankingHistory,
        userContestRanking
    })
}

