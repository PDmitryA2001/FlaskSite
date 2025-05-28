import React from "react";

export const SetTime = () =>
{
    return(
        <div className={"reserve_table_container"}>
            <div className={"head_of_reserve"}>
                <img src={"./images/reserve_table/Line_42.png"} />
                <h2 className={"lora_blod_40_red"}>БРОНЬ СТОЛИКОВ</h2>
                <img src={"./images/reserve_table/Line_42.png"} />
            </div>
            <div className={"stages"}>
                <div className={"main_button_red"}>
                    <p className={"firaSans_regular_16_grey"} style={{color: "white", userSelect: "none"}}>Дата и время</p>
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
                    <label form={"adress"}>Выбор ресторана</label>
                    <input name={"adress"} type={"text"} className={"input_adress"}/>
                </div>
                <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                    <label form={"date"}>Выбор ресторана</label>
                    <input name={"date"} type={"date"} className={"input_date"}/>
                </div>
            </form>
            <div style={{display: "flex", flexDirection: "column", gap: "8px"}}>
                <label form={"time"}>Выбор времени</label>
                <form name={"time"} className={"time_selector_container"}>
                    <button className={"main_button_red disabled"}>9:30</button>
                </form>
            </div>
            <div className={"quantity_guests"}></div>
            <button className={"button_next"}></button>
        </div>
    )
}