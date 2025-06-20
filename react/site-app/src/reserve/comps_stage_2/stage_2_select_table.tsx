import React, {useContext, useEffect, useState} from 'react';
import {ReserveContext} from "../ReserveComponent";
import {Stroke_info} from "../info_reserve"
interface PositionStyle
    {
        left?: string;
        top: string;
        right?: string;
        transform?: string;
    }
export const Stage_2 = () =>
{
    const {state, dispatch} = useContext(ReserveContext);

    const [selectedItems, setSelectedItems] = useState<string[]>(state.Stage2.table)
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

    const handleClick = (e: string) =>
    {
            if (state.Stage1.guests <= 2) {
                setSelectedItems(prevState => {
                    return [e]
                })
            } else {
                if (selectedItems.length < Math.ceil(state.Stage1.guests / 2))
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
                if (selectedItems [0] === '' ) {
                setSelectedItems(prevState => {
                        return [e]
                    })
            }
            }
    }


    const check_lengh = () =>
    {
        if (Math.ceil(state.Stage1.guests / 2) <= (selectedItems.length) && (selectedItems[0] != '')) {
            return false
        }
        else
            return true
    }
    const return_reserved_tables = (num: number) =>
    {
        if (state.Stage1.r_tables.includes(num))
            return true
        else
            return false
    }
    const return_elements = () =>
    {
        return(state.Stage1.all_tables.map((item, index) =>
            {
                const d_elem = dynamic_elements[index]
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
        <div className={`${(state.stage === 2) ? "fade_in" : "fade_out"}`}>
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
                {Stroke_info(selectedItems)}
                <button className={`${check_lengh() ? "main_button_red disabled" : "main_button_red"}`} onClick={() => handle_next()}><p className={"firaSans_regular_16_grey"} style={{color: "white"}}>Продолжить</p></button>
            </div>
        </div>
    )
}