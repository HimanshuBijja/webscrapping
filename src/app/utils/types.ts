// <--! contest types !-->

export interface filterContestsType {
    source: string;
    day: string;
    month: string;
    sortBy: string;
    sortOrder: string;
}

export interface upcomingContestsType {
    source: string;
    title: string;
    startTime: number;
    link: string;
    date: {
        time: string;
        day: number;
        month: string;
    };
}

export interface gfgContestType {
    slug: string;
    start_time: string;
    end_time: string;
    banner: {
        mobile_url: string;
        desktop_url: string;
    };
    name: string;
    status: string;
    time_diff: {
        days: 86;
        hours: 2087;
        mins: 7;
        secs: 23;
    };
    type: 3;
    date: string;
    time: string;
}

export interface lcContestType {
    title: string;
    titleSlug: string;
    startTime: number;
}

export interface ccContestType {
    contest_code: string;
    contest_name: string;
    contest_start_date: string;
    contest_end_date: string;
    contest_start_date_iso: string;
    contest_end_date_iso: string;
    contest_duration: string;
    distinct_users: number;
}
export interface cfContestType {
    id: number;
    name: string;
    type: string;
    phase: string;
    frozen: boolean;
    durationSeconds: number;
    startTimeSeconds: number;
    relativeTimeSeconds: number;
}

export interface addDateType {
    source: string;
    title: string;
    startTime: number;
    link: string;
}

// <--! contest types !-->

// <--! user types !-->

export interface usernameTypes {
    lcusername: string | boolean;
    cfusername: string | boolean;
    ccusername: string | boolean;
    gfgusername: string | boolean;
}

export interface lcAttendedContestsType {
    attended: boolean;
    trendDirection: string;
    problemsSolved: number;
    totalProblems: number;
    finishTimeInSeconds: number;
    rating: number;
    ranking: number;
    contest: {
        title: string;
        startTime: number;
    };
}

export interface problemsSolvedType {
    data: {
        allQuestionsCount: totalProblemsType[];
        matchedUser: {
            submitStats: {
                acSubmissionNum: submittedProblemsType[];
                totalSubmissionNum: submittedProblemsType[];
            };
        };
    };
}

interface totalProblemsType {
    difficulty: "All" | "Easy" | "Medium" | "Hard";
    count: number;
}

interface submittedProblemsType {
    difficulty: "All" | "Easy" | "Medium" | "Hard";
    count: number;
    submissions: number;
}

/*

// <--! codeforces !-->

{
      "contribution": 0,
      "lastOnlineTimeSeconds": 1748360375,
      "rating": 376,
      "friendOfCount": 0,
      "titlePhoto": "https://userpic.codeforces.org/no-title.jpg",
      "rank": "newbie",
      "handle": "bijjahimanshu05",
      "maxRating": 376,
      "avatar": "https://userpic.codeforces.org/no-avatar.jpg",
      "registrationTimeSeconds": 1731231450,
      "maxRank": "newbie"
    }


// <--! codeforces !-->


// <--! gfg !-->

{
    "name": "Himanshu Bijja",
    "profile_image_url": "https://media.geeksforgeeks.org/img-practice/user_web-1598433228.svg",
    "is_campus_ambassador": false,
    "created_date": "2024-12-07 14:58:54",
    "practice_course_visibility": true,
    "institute_name": null,
    "organization_name": null,
    "institute_slug": null,
    "organization_slug": null,
    "campus_ambassador": null,
    "school": null,
    "designation": null,
    "score": 11,
    "monthly_score": 4,
    "total_problems_solved": 4,
    "institute_rank": "",
    "pod_solved_longest_streak": 0,
    "pod_solved_global_longest_streak": 1394
  }

  // <--! gfg !-->
  
  
  // <--! leetcode !-->
  



  
  // <--! leetcode !-->
*/
