import { scrapping } from "./userdata"


export async function GET(){
    const data = await scrapping()
    return Response.json({
        data
    })
}