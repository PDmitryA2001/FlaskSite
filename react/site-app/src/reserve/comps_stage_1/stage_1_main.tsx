import React, {useContext, useEffect, useState} from 'react';
import {Selector_time} from "./stage_1_dynamic_time"
import {ReserveContext} from "../ReserveComponent";
import {Array_reserve} from  "../../types/reserve_types/Reserve_from_server"
import {Simulate} from "react-dom/test-utils";
import {server_address} from "../../types/reserve_types/address_type";

export const SetTime = () => {
    const {state, dispatch} = useContext(ReserveContext);
    const [guests, setGuests] = useState<number>(state.Stage1.guests);
    const [adress, setAdress] = useState<server_address[]>(
        [{
            id: 0,
            address: state.Stage1.adress,
        }]);
    const [selectedAdr, setSelectedAdr] = useState<string>(state.Stage1.adress);
    const [date, setDate] = useState<string>(state.Stage1.datatime.split('T')[0]);
    const [dataServer, setDataServer] = useState<Array_reserve>(
        {
            reservations:
                [{
                        r_capacity: 0,
                        r_tables: [0],
                        reservation_time: "",
                }],
            numbers: [{
                capacity: 0,
                number: 0
            }]
        }
    );

    const [selectedTime, setSelectedTime] = useState<string>(state.Stage1.datatime.split('T')[1].substring(0, 5))
    console.log(state.Stage1.datatime)
    const handleNextStage = () => {
        const date_string = date + 'T' + selectedTime + ':00Z'
        const date_date = new Date(date_string)
        const date_iso = date_date.toISOString()
        const res_tables = dataServer.reservations.find(item => item.reservation_time === selectedTime)?.r_tables
        dispatch({
            type: "SET_STAGE_1",
            payload: {
                datatime: date_iso,
                adress: selectedAdr,
                guests: guests,
                r_tables: res_tables ?? [0],
                all_tables: dataServer.numbers,
            }
         })
        dispatch({
            type: "SET_STAGE_2",
            payload:{
                table: ['']
            }
        })
        dispatch({
            type: "NEXT_STAGE",
        })
    }
     const fetchData = async () => {
             try {
                 const response = await fetch("/flaskapi/time_reserve",
                     {
                         method: 'POST',
                         headers: {'Content-Type': 'application/json'},
                         body: JSON.stringify(
                             {
                                 date: date,
                                 adress: selectedAdr,
                             })
                     }
                 );
                 const data = await response.json();
                 if (!response.ok) {
                     throw new Error(data.status === 'error' ? data.message : 'Unknown error');
                 }
                 setDataServer(data)}
             catch (error) { console.error(error) }
        }
    useEffect(() => {
        fetchAddress()
    }, []);
    const fetchAddress = async () => {
            try {
                const response = await fetch("/flaskapi/return_address")
                const data = await response.json()
                setAdress(data)
                setSelectedAdr(data[0]['address'])
            }
            catch (error) {console.error(error)}
        }
    useEffect(() =>
    {
        fetchData();
        }, [selectedAdr, date]);
    const on_click_selector = (value = '') =>
    {
        setSelectedTime(value)
    }
    return (
        <div className={`${(state.stage === 1) ? "fade_in" : "fade_out"}`}>
            <form className={"adress_and_date"}>
                <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                    <label form={"adress"}><p className={"firaSans_regular_16_grey"} style={{color: "black", userSelect: "none"}}>Выбор ресторана</p></label>
                    <select name={"adress"} className={"input_adress"} value = {selectedAdr} style={{userSelect: "none"}} onChange={event => setSelectedAdr(event.target.value)}>
                        {
                            adress.map((item) => {
                                return (
                                    <option key ={item.id} value={item.address} className={"firaSans_regular_16_grey"} style={{color:"black", userSelect: "none"}}>{item.address}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                    <label form={"date"}><p className={"firaSans_regular_16_grey"} style={{color: "black", userSelect: "none"}}>Выбор даты</p></label>
                    <input name={"date"} type={"date"} className={"input_date"} style={{userSelect: "none"}} value={date} min={date} onChange={(e) => setDate(e.target.value)}/>
                </div>
            </form>
            {
                (
                    dataServer &&
                    <Selector_time array={dataServer} funk = {on_click_selector} selected_time={selectedTime}/>
                )
            }
            <div className={"block_quantity"}>
                <p className={"firaSans_regular_16_grey"} style={{userSelect: "none", color: "black"}}>Количество гостей*</p>
                <div className={"quantity_guests"}>
                    <button type={"button"} className={"minus"}
                        onClick={() => setGuests(Math.max(guests - 1, 1))}
                    ><p style={{userSelect: "none", color: "black"}} className={"firaSans_regular_16_grey"}>-</p></button>
                    <p className={"firaSans_regular_16_grey"} style={{userSelect: "none", color: "black"}}>{guests}</p>
                    <button type={"button"} className={"plus"}
                        onClick={() => {
                            setGuests(Math.min(guests + 1, 30))
                        }}
                    ><p className={"firaSans_regular_16_grey"} style={{userSelect: "none", color: "black"}}>+</p></button>
                </div>
                <p className={"firaSans_regular_16_grey"} style={{userSelect: "none"}}>Бронь столиков на 5 и более гостей<br/> предусматривает депозит: 1000руб./чел.</p>
            </div>
            <button type={"button"} className={`${!(selectedTime.substring(0, 2) != '00') ? "main_button_red disabled" : "main_button_red"}`} onClick={handleNextStage} style={{position: "absolute", right: "0", bottom: "0"}}>
                <p className={"firaSans_regular_16_grey"} style={{color: "white", userSelect: "none"}}>Продолжить бронь</p>
            </button>
        </div>
    )
}