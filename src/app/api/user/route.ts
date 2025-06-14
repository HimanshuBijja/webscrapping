import { NextRequest, NextResponse } from "next/server";
import { fetchUserData } from "./fetchUserData";

//filter based on source, date  sort based on start time, contest name
//http://localhost:3000/api/user?lcusername=Himanshu_Bijja

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;

    const queryParameters = {

        lcusername : query.get("lcusername") ?? false,
        ccusername : query.get("ccusername") ?? false,
        cfusername : query.get("cfusername") ?? false,
        gfgusername : query.get("gfgusername") ?? false,
      
    }

    let userDetails = await fetchUserData(queryParameters);

    



    return NextResponse.json({
        userDetails,
    });
}
