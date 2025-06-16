import React, {useContext, useEffect, useState} from 'react';
import {ReserveContext} from "../ReserveComponent";

interface PositionStyle
    {
        left?: string;
        top: string;
        right?: string;
        transform?: string;
    }
export const Stage_2 = () =>
{
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const {state, dispatch} = useContext(ReserveContext);
    const dynamic_elements: PositionStyle[] = [
        {left: "3px", top: "3px"},
        {left: "53px", top: "3px"},
        {left: "103px", top: "3px"},
        {left: "153px", top: "3px"},
        {left: "203px", top: "3px"},
        {left: "253px", top: "3px"},
        {left: "303px", top: "3px"},
        {left: "503px", top: "3px"},
        {left: "553px", top: "3px"},
        {left: "603px", top: "3px"},
        {left: "653px", top: "3px"},
        {left: "703px", top: "3px"},
        {right: "3px", top: "3px"},
        {right: "3px", top: "103px"},
        {left: "703px", top: "103px", transform: "rotate(45deg)"},
        {left: "693px", top: "163px", transform: "rotate(45deg)"},
        {left: "593px", top: "123px", transform: "rotate(45deg)"},
        {left: "483px", top: "103px"},
        {left: "323px", top: "103px"},
        {left: "233px", top: "113px", transform: "rotate(45deg)"},
        {left: "473px", top: "203px", transform: "rotate(45deg)"},
        {left: "553px", top: "243px", transform: "rotate(45deg)"},
        {left: "513px", top: "283px", transform: "rotate(45deg)"},
        {left: "553px", top: "323px", transform: "rotate(45deg)"},
        {left: "623px", top: "333px", transform: "rotate(45deg)"},
        {left: "593px", top: "283px", transform: "rotate(45deg)"},
        {left: "763px", top: "273px", transform: "rotate(90deg)"},
        {left: "763px", top: "343px", transform: "rotate(90deg)"},
    ]
    const handle_next = () =>
    {
        dispatch({
            type: "SET_STAGE_2",
            payload: {
                table: selectedItems
            }
        })
        dispatch({
            type: "NEXT_STAGE",
        })
    }
    const get_P_tables = () =>
    {
        console.log(selectedItems.length)
        if (selectedItems.length <= 1)
        return (
            <p>Столик номер {selectedItems}</p>
        )
        else
            return (
                <p>Столики номер{selectedItems.map((item) => {return (" " + item)})}</p>
            )
    }
    const handleClick = (e: string) =>
    {
        let not_null = (state.Stage1?.guests)
        if (not_null) {
            if (not_null <= 2) {
                setSelectedItems(prevState => {
                    return [e]
                })
            } else {
                console.log("ostatok: ", Math.ceil(not_null / 2))
                console.log("array: ", selectedItems.length)
                if (selectedItems.length < Math.ceil(not_null / 2))
                        setSelectedItems(prevState => {
                    if (prevState.includes(e)) {
                        return (prevState.filter(item => item !== e))
                    } else {
                        return [...prevState, e]
                    }
                })
                else {
                    setSelectedItems(prevState => {
                        return (prevState.filter(item => item !== e))
                    })
                }
            }
        }
        console.log(selectedItems)
    }
    const get_sklonenie = () =>
    {
        if (state.Stage1?.guests) {
            if (state.Stage1?.guests % 10 === 1)
                return "гостя"
            else
                return "гостей"
        }
    }
    const get_date_str = (date: Date) =>
  {
      const mon = (month: number) =>
          {
              switch (month) {
                  case 0: return "января";
                  case 1: return "февраля";
                  case 2: return "марта";
                  case 3: return "апреля";
                  case 4: return "мая";
                  case 5: return "июня";
                  case 6: return "июля";
                  case 7: return "августа";
                  case 8: return "сентября";
                  case 9: return "октября";
                  case 10: return "ноября";
                  case 11: return "декабря";
              }
      }
      if (date.getMinutes().toString().length === 1)
        return (date.getDay() + " " + mon(date.getMonth()) +
                " " + date.getFullYear() + " в "
                + (date.getUTCHours()) + ":" + date.getMinutes() + "0" + ".");
      else
        return (date.getDay() + " " + mon(date.getMonth()) +
                " " + date.getFullYear() + " в "
                + (date.getUTCHours()) + ":" + date.getMinutes() + ".");
  }
    const stroke_information = () =>
    {
        console.log (state.Stage1?.datatime)
        let date = state.Stage1?.datatime
        console.log("DATATIME from STAGE 2", date)
        if (date) {
            const bol = new Date(date)
            console.log(bol)
            date = get_date_str(bol)
        }
        console.log("DATA FROM STAGE 1   ", state.Stage1?.all_tables)
        return (
            <div className={"information"}>
                <p>{date}</p>
                {get_P_tables()}
                <p>для {state.Stage1?.guests} {get_sklonenie()}</p>
                <p>{state.Stage1?.r_tables}</p>
            </div>
        )
    }
    const check_lengh = () =>
    {
        if (state.Stage1?.guests) {
            if (Math.ceil(state.Stage1?.guests / 2) > selectedItems.length) return true
        }
        return false
    }
    const return_reserved_tables = (num: number) =>
    {
        if (state.Stage1?.r_tables)
            if (state.Stage1?.r_tables.includes(num)) return true
        return false
    }
    const return_elements = () =>
    {
        return(state.Stage1?.all_tables?.map((item, index) =>
            {
                const d_elem = dynamic_elements[index]
                console.log(state.Stage1?.r_tables, "elements")
                const style_str = "table cap_"+item.capacity+" "
                return(
                <button type={"button"}
                        style={d_elem}
                        onClick={() => handleClick(item.number.toString())}
                        className={`${(selectedItems.includes(item.number.toString())) ? style_str+"table_selected" : style_str}
                                   ${(return_reserved_tables(item.number) ? style_str+"table_disabled" : style_str )}`}
                        key={index}><p className={`${(d_elem.transform === "rotate(45deg)") ? "firaSans_regular_16_grey rotate_text_45deg" : "firaSans_regular_16_grey"}
                                                   ${(d_elem.transform === "rotate(90deg)") ? "firaSans_regular_16_grey rotate_text_90deg" : "firaSans_regular_16_grey"}`} style={{color: "black"}}>{item.number}</p></button>
                )
            })

        )
    }
    return (
        <div>
            <div className={"select_table"}>
                {return_elements()}
                <div className={"inactive_objects zvuk"} style={{left: "183px", bottom: "220px"}}>Дровер</div>
                <div className={"inactive_objects zvuk"} style={{left: "353px", top: "16px"}}>Звук</div>
                <div className={"inactive_objects vhod_small"} style={{left: "0px", bottom: "320px"}}>Вход</div>
                <div className={"inactive_objects zvuk"} style={{left: "0px", bottom: "0px"}}>Вход</div>
                <div className={"inactive_objects bar"} style={{left: "0px", bottom: "80px"}}>Бар</div>
                <div className={"inactive_objects scene"} style={{left: "253px", bottom: "0px"}}>Сцена</div>
            </div>
            <div className={"bottom_container_for_select_table"}>
                <button className={"main_button_red"} style={{width: "141px", height: "50px"}} onClick={() => dispatch({type: "PREV_STAGE"})}><p
                    className={"firaSans_regular_16_grey"} style={{color: "white"}} >Назад</p></button>
                {stroke_information()}
                <button className={`${check_lengh() ? "main_button_red disabled" : "main_button_red"}`} onClick={() => handle_next()}><p className={"firaSans_regular_16_grey"} style={{color: "white"}}>Продолжить</p></button>
            </div>
        </div>
    )
}