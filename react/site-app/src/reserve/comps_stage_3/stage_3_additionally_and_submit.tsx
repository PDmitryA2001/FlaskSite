import React, {useContext} from "react";
import {Stroke_info} from "../info_reserve"
import {ReserveContext} from "../ReserveComponent";


export const Stage_3 = () =>
{
    const {state, dispatch} = useContext(ReserveContext)
    const handle_back = () =>
    {
        dispatch({
                type: "PREV_STAGE",
            })
    }
     return (
        <div className={`${(state.stage === 3) ? "container_stage_3 fade_in" : "container_stage_3 fade_out"}`}>
            <form id={"final_form"} name={"final_form"} className={"adress_and_date"}>
                <div className={"flex_gap_for_stage_3"}>
                    <div>
                        <label form={"user_name"}>
                            <p className={"firaSans_regular_16_grey"} style={{color: "black"}}>Имя и фамилия</p>
                        </label>
                        <input id={"user_name"} name={"user_name"} type={"text"} pattern={"\w {2, 55}"} className={"input_left_column_stage_3"}/>
                    </div>
                    <div>
                        <label form={"description"}>
                            <p className={"firaSans_regular_16_grey"} style={{color: "black"}}>Пожелания к заказу (необязательно)</p>
                        </label>
                        <input id={"description"} name={"description"} type={"text"} className={"input_left_column_stage_3"}/>
                    </div>
                </div>
                <div className={"flex_gap_for_stage_3"}>
                    <div>
                        <label form={"phone"}>
                            <p className={"firaSans_regular_16_grey"} style={{color: "black"}}>Номер телефона</p>
                        </label>
                        <input id={"phone"} name={"phone"} type={"phone"} className={"input_left_column_stage_3"}/>
                    </div>
                    <div>
                        <label form={"e_mail"}>
                            <p className={"firaSans_regular_16_grey"} style={{color: "black"}}>E-mail (необязательно)</p>
                        </label>
                        <input id={"e_mail"} name={"e_mail"} type={"text"} className={"input_left_column_stage_3"}/>
                    </div>
                </div>
            </form>
            <p className={"lora_medium_32_black"} style={{marginTop: "40px"}}>Предзаказ</p>
            <div className={"information_block"}>
                <button type={"button"} className={"main_button_red"} onClick={handle_back}>
                    <p className={"firaSans_regular_16_grey buttons_stage_3"} style={{color: "white"}}>Назад</p>
                </button>
                {Stroke_info(state.Stage2.table)}
                <button type={"button"} className={"main_button_red"}>
                    <p className={"firaSans_regular_16_grey buttons_stage_3"} style={{color: "white"}}>Оплатить и забронировать</p>
                </button>
            </div>
        </div>
     )
}