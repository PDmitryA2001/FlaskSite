import React, {useContext, useEffect, useRef, useState} from 'react';
import {Selector_time} from "./stage_1_dynamic_time"
import {ReserveContext} from "../ReserveComponent";
import {Array_reserve} from  "../../types/reserve_types/Reserve_from_server"
import {Simulate} from "react-dom/test-utils";
import {server_address} from "../../types/reserve_types/address_type";

export const SetTime = () => {
    const [guests, setGuests] = useState<number>(1);
    const [adress, setAdress] = useState<server_address[]>(
        [{
            id: 0,
            address: '',
        }]);
    const [selectedAdr, setSelectedAdr] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [dataServer, setDataServer] = useState<Array_reserve>(
        {
            reservations:
                [{
                        r_capacity: 0,
                        r_tables: [0],
                        reservation_time: "",
                }],
            numbers: [0],
        }
    );
    const [selectedTime, setSelectedTime] = useState<string>()

    const {dispatch} = useContext(ReserveContext);
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
                r_tables: res_tables ?? null,
                all_tables: dataServer.numbers,
            }
         })
        dispatch({
            type: "NEXT_STAGE",
        })
    }
  // datatime: string | null;
  // adress: string | null;
  // guests: number | null;
  // r_tables: number[] | null;
  // all_tables: number[] | null;


    useEffect(() => {
        const date_today = new Date();
        const formattedDate = date_today.toISOString().split('T')[0];
        setDate(formattedDate)
    }, []);
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
        <div className={"reserve_table_container"}>
            <div className={"head_of_reserve"}>
                <img src={"./images/reserve_table/Line_42.png"}/>
                <h2 className={"lora_blod_40_red"}>БРОНЬ СТОЛИКОВ</h2>
                <img src={"./images/reserve_table/Line_42.png"}/>
            </div>
            <div className={"stages"}>
                <div className={"main_button_red"}>
                    <p className={"firaSans_regular_16_grey"} style={{color: "white", userSelect: "none"}}>Дата и
                        время</p>
                </div>
                <div className={"main_button_red disabled"} style={{pointerEvents: "none", cursor: "not-allowed"}}>
                    <p className={"firaSans_regular_16_grey"} style={{color: "#5C6164"}}>Выбор столиков</p>
                </div>
                <div className={"main_button_red disabled"} style={{pointerEvents: "none", cursor: "not-allowed"}}>
                    <p className={"firaSans_regular_16_grey"} style={{color: "#5C6164"}}>Ваши данные</p>
                </div>
            </div>
            <form className={"adress_and_date"}>
                <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                    <label form={"adress"}><p className={"firaSans_regular_16_grey"} style={{color: "black"}}>Выбор ресторана</p></label>
                    <select name={"adress"} className={"input_adress"} value = {selectedAdr} onChange={event => setSelectedAdr(event.target.value)}>
                        {
                            adress.map((item) => {
                                return (
                                    <option key ={item.id} value={item.address} className={"firaSans_regular_16_grey"} style={{color:"black"}}>{item.address}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                    <label form={"date"}><p className={"firaSans_regular_16_grey"} style={{color: "black"}}>Выбор даты</p></label>
                    <input name={"date"} type={"date"} className={"input_date"} value={date} onChange={(e) => setDate(e.target.value)}/>
                </div>
            </form>
            {
                (
                    dataServer &&
                    <Selector_time array={dataServer} funk = {on_click_selector}/>
                )
            }
            <div className={"block_quantity"}>
                <p className={"firaSans_regular_16_grey"} style={{color: "black"}}>Количество гостей*</p>
                <div className={"quantity_guests"}>
                    <button type={"button"} className={"minus"}
                        onClick={() => setGuests(Math.max(guests - 1, 1))}
                    >-</button>
                    <p>{guests}</p>
                    <button type={"button"} className={"plus"}
                        onClick={() => {
                            setGuests(Math.min(guests + 1, 30))
                        }}
                    >+</button>
                </div>
                <p className={"firaSans_regular_16_grey"}>Бронь столиков на 5 и более гостей<br/> предусматривает депозит: 1000руб./чел.</p>
            </div>
            <button type={"button"} className={`${!(selectedTime) ? "main_button_red disabled" : "main_button_red"}`} onClick={handleNextStage} style={{position: "absolute", right: "0", bottom: "0"}}>
                <p className={"firaSans_regular_16_grey"} style={{color: "white"}}>Продолжить бронь</p>
            </button>
        </div>
    )
}