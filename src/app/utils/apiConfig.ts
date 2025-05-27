export const LEETCODE_ENDPOINT = "https://leetcode.com/graphql"; //should add the LEETCODE_CONTESTS_QUERY query to this api

//for contests
export const LEETCODE_CONTESTS_QUERY = `
        query contestUpcomingContests {
            allContests {
                title
                titleSlug
                startTime
            }
        }
        `;

export const LEETCODE_USER_CONTEST_HISTORY = `
        query userContestRankingInfo($username: String!) {
            userContestRanking(username: $username) {
                attendedContestsCount
                rating
                globalRanking
                totalParticipants
                topPercentage
                badge {
                name
                }
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

export const LEETCODE_USER_PROBLEMS_SOLVED = `
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
                    submissions
                }
                totalSubmissionNum {
                    difficulty
                    count
                    submissions
                }
                }
            }
        }
`;

/*

Pass the username 

*/

/*

GEEKSFORGEEKS 

*/
export const GEEKSFORGEEKS_CONTESTS_ENDPOINT =
    "https://practiceapi.geeksforgeeks.org/api/vr/events/?page_number=1&sub_type=all&type=contest";
// you will get all the queries
export const GEEKSFORGEEKS_USER_ENDPOINT =
    "https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=bijjahimo7lg&article_count=false&redirect=true";
// userinformation keep article count false

export const CODEFORCES_USER_ENDPOINT =
    "https://codeforces.com/api/user.info?handles="; //PASS USERNAME
export const CODEFORCES_CONTESTS_ENDPOINT =
    "https://codeforces.com/api/contest.list?gym=false";

export const CODECHEF_CONTESTS_ENDPOINT =
    "https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all";


/*

query userContestRankingInfo($username: String!) {
  userContestRanking(username: $username) {
    attendedContestsCount
    rating
    globalRanking
    totalParticipants
    topPercentage
    badge {
      name
    }
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
*/