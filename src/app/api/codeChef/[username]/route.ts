import { scrapping } from "./userdata"


export async function GET(req : Request, {params}:{params : {username : string}}){

    const {username} = params
    const data = await scrapping(username)
    return Response.json({
        data
    })
}