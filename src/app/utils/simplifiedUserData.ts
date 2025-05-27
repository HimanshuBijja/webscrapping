import { problemsSolvedType } from "./types";

export function lcsimplifiedUserData(data : problemsSolvedType){
    const result = {
        allQuestionsCount : data.data.allQuestionsCount,
        problemsSolved : data.data.matchedUser.submitStats.acSubmissionNum
    }
    return result
}