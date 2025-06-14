import axios from "axios";
import { useState } from "react";
import Input from "./Input";
import { title } from "process";
import Card from "./Card";

interface RenderContestType {
    startTime: number;
    title: string;
    source : string;
}

export default async function Leetcode() {
    const response = await axios.get(
        "http://localhost:3000/api/contest?source=all&day=all&month=all&sortBy=startTime&sortOrder=asc"
    );
    const upcomingContests = response.data.upcomingContests;


  


    return (
        <section className="relative py-24 px-4">
            <div className=" container mx-auto max-w-5xl grid grid-cols-2">
                {upcomingContests.map((x: RenderContestType, index:any) => (
                    <RenderContest
                        source={x.source}
                        title={x.title}
                        startTime={Number(x.startTime)}
                        key={index}
                    />
                ))}
            </div>
        </section>
    );
}

function RenderContest({source, startTime, title }: RenderContestType) {
    const time = new Date(startTime * 1000);

    const hours = time.getHours();
    const minutes = "0" + time.getMinutes();
    const seconds = "0" + time.getSeconds();
    const formattedTime = hours + ":" + minutes;

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const year = time.getFullYear();
    const month = months[time.getMonth()];
    const date = time.getDate();

    const formattedDate = date + " " + month;

    return (
        <div className="">
           

            <Card  source={source} label={title} time={formattedTime} date={formattedDate} />


        </div>
    );
}

