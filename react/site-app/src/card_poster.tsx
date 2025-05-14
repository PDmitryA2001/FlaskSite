import React, {useState, useEffect} from "react";
import { Poster } from './types/Poster'
import DynamicPoster from "./dynamic_poster";
interface dateProps {
    value: number
}
    export const Updater = ({value}: dateProps ) =>
    {

        const [currentItems, setCurrentItems] = useState<Poster[]>([]);
        const [oldItems, setOldItems] = useState<Poster[]>([])
        const [isAnimation, setIsAnimation] = useState(false);
            useEffect(() => {
            const fetchData = async () =>
            {
                    try {
                        const date_today = new Date();
                        date_today.setDate(date_today.getDate() + value)
                        console.log("date_today " + date_today)
                        const response = await fetch("/flaskapi/poster_react",
                            {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ date: date_today.toISOString() })
                            }
                            );
                        const data_server = await response.json()
                        console.log(currentItems.length)
                        setOldItems(currentItems)
                        setCurrentItems(data_server)

                        setIsAnimation(true)
                        await new Promise(resolve => setTimeout(resolve, 400));
                        setIsAnimation(false)
                    }
                    catch (error) {
                        console.error("Ошибка получения данных: ", error)
                    }
                }
                fetchData()
            }, [value]);



        return (
            <div className={'container'}>
                {isAnimation &&
                    <div className={"fade_out"}>
                        {oldItems.map(item => (<DynamicPoster data={item} key={'old-&{item.id}'}/>))}
                    </div>
                }
                {
                    <div className={(isAnimation || (currentItems.length === 0)) ? 'none' : 'fade_in'}>
                        {currentItems.map(item => (<DynamicPoster data={item} key={'new-&{item.id}'}/>))}
                    </div>
                }
            </div>
        )
    }