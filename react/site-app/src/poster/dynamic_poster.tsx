import React from "react";

import {Poster} from "@/types/Poster";

const DynamicPoster = ({data}: { data: Poster }) =>
    {
        return (<div className={"card_poster"}>
                <img src={`/flaskapi/get_image/${data.image_url}`} style={{width: "min-content", height: "min-content"}}></img>
                <div className={"bottom_container_card"}>
                    <h4 className={"lora_medium_24_black"}>{data.title}</h4>
                    <p className={"firaSans_regular_16_grey"} style={{color: "black"}}>{data.address}</p>
                    <div className={"block_button_cards"}>
                        <button className={"main_button_red"}>
                            <p className={"firaSans_regular_16_grey"} style={{color: "white"}}>Бронь столиков</p>
                        </button>
                        <button className={"main_button_border_red"}
                                style={{border: "1px solid black"}}>
                            <p className={"firaSans_regular_16_grey"} style={{color: "black"}}>Подробнее</p>
                        </button>
                    </div>
                </div>
            </div>
        );
    };
export default DynamicPoster