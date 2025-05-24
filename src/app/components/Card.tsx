
interface CardType {
    label: string;
    time?: string;
    date?: string;
    source : string; 
}

export default function Card({source, label, time, date }: CardType) {
    return (
        <div className="p-2 border border-black">
            <div className=" flex flex-row justify-between items-center">
                <div className="flex flex-col">
                    <div className="text-2xl">
                        {source}
                    </div>
                    <div className="flex flow-row gap-1 items-baseline">
                        <div className=" text-xs">
                            {time}
                        </div>
                        <div className="text-sm">
                            {date}
                            
                        </div>
                    </div>
                </div>
                <div>
                        
                </div>
            </div>
        </div>
    );
}
