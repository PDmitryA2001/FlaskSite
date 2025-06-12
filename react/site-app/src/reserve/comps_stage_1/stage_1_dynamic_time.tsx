import React from "react";
import {Array_reserve} from "../../types/reserve_types/Reserve_from_server"
interface Props {
    array: Array_reserve;
    funk: (arg?: any) => void;
}
export const Selector_time = ({ array, funk }: Props) =>
{
    const getTimeElements = () => {
        const time = [];
        let hour = 1;
        let minute = 0;
        while (hour < 22) {
            const stringHour = hour.toString().padStart(2, '0');
            const stringMinute = minute.toString().padStart(2, '0');
            const timeString = `${stringHour}:${stringMinute}`;
            time.push(timeString);
            if (minute === 0)
                minute += 30;
            else {
                minute = 0;
                hour += 1;
            }
        }
        return time;
    }
    const element = getTimeElements().map((time) =>
    {
        const blocked = array.reservations.some(r => r.reservation_time === time)
            return(
        <button type={"button"} className={`${(blocked) ? 'main_button_red_disabled' : "reserve_button_grey"}`} value={time} onClick={event => funk(event.currentTarget.value)}>
            <p key={time}>{time}</p>
        </button>)
            })
            return (
                <div style={{display: "flex", flexDirection: "column", gap: "8px", marginBottom: "116px"}}>
                    <label form={"time"}><p className={"firaSans_regular_16_grey"} style={{color: "black", marginTop: "30px"}}>Выбор времени</p></label>
                    <form name={"time"} className={"time_selector_container"}>
                        {element}
                    </form>
                </div>
            )
}
