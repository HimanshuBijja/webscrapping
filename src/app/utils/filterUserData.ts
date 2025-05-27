import { lcAttendedContestsType } from "./types";

export function lcattendedUserContests(lcattendedContests : lcAttendedContestsType[]){
    const result = lcattendedContests.filter((contest)=> contest.attended === true)
    return result
}
