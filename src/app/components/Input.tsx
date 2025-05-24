"use client"

import { useState } from "react"

export default function Input(){

    const [username, setUsername] = useState("");

    return ( 
        <div>
            <h1>Enter Username</h1>
            <input className="border-2 border-black " onChange={(e)=>{
                setUsername(e.target.value)
            }} type="text" />
        </div>
    )
}



