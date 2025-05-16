import React, {useEffect, useState} from "react";

export const Slider = () =>
{
    const slides =
    [
        {
            id: 0,
            adressBIG: "Центральный район",
            adressSMALL: "ул. Седова, д. 32",
            picture: <img src={"./images/slider/slide_front.png"} />
        },
        {
            id: 1,
            adressBIG: "Приморский район",
            adressSMALL: "Лиговский проспект, 24",
            picture: <img src={"./images/slider/slide_left.png"}/>,
        },
        {
            id: 2,
            adressBIG: "Третий район",
            adressSMALL: "Проезд Горького, 16",
            picture: <img src={"./images/slider/slide_right.png"}/>,
        },
    ]
    const [frontSlide, setFrontSlide] = useState(0)
    const [click, setClick] = useState('none')
    const [isAnimated, setIsAnimated] = useState(0)



    const right_click = async () =>
    {
        setClick('right')

        setIsAnimated(1)
        await new Promise(resolve => setTimeout(resolve, 250));

        setIsAnimated(2)
        setFrontSlide((frontSlide+2) % slides.length);
        await new Promise(resolve => setTimeout(resolve, 250));
        setIsAnimated(0)
    }
    const left_click = async () =>
    {
        setClick('left')
        setIsAnimated(1)
        await new Promise(resolve => setTimeout(resolve, 250));

        setIsAnimated(2)
        setFrontSlide((frontSlide+1) % slides.length)
        await new Promise(resolve => setTimeout(resolve, 250));
        setIsAnimated(0)
    }

    const take_text_block = (textPosition: string) =>
    {
        switch (textPosition) {
            case "center":
                return (
                    <div className={"text_main_top"}>
                        <p className={"lora_medium_32_black"}>{slides[frontSlide].adressBIG}</p>
                        <p className={"lora_medium_24_black"}>{slides[frontSlide].adressSMALL}</p>
                    </div>)
            case "left":
                if (isAnimated === 2) {
                    if (click === "right")
                    {
                        return (
                    <div className={"text_left"}>
                        <p className={"firaSans_regular_16_grey"}>{slides[frontSlide].adressBIG}</p>
                        <p className={"firaSans_regular_16_grey"}>{slides[frontSlide].adressSMALL}</p>
                    </div>)
                    }
                    else
                    {
                        return (
                    <div className={"text_left"}>
                        <p className={"firaSans_regular_16_grey"}>{slides[return_right()].adressBIG}</p>
                        <p className={"firaSans_regular_16_grey"}>{slides[return_right()].adressSMALL}</p>
                    </div>)
                    }
                }
                else return (
                    <div className={"text_left"}>
                        <p className={"firaSans_regular_16_grey"}>{slides[return_left()].adressBIG}</p>
                        <p className={"firaSans_regular_16_grey"}>{slides[return_left()].adressSMALL}</p>
                    </div>)

            case "right":
                if (isAnimated === 2) {
                    if (click === "right")
                    {
                        return (
                            <div className={"text_right"}>
                                <p className={"firaSans_regular_16_grey"}>{slides[return_left()].adressBIG}</p>
                                <p className={"firaSans_regular_16_grey"}>{slides[return_left()].adressSMALL}</p>
                            </div>)
                    }
                    else
                    {
                        return (
                    <div className={"text_right"}>
                        <p className={"firaSans_regular_16_grey"}>{slides[frontSlide].adressBIG}</p>
                        <p className={"firaSans_regular_16_grey"}>{slides[frontSlide].adressSMALL}</p>
                    </div>)
                    }
                }
                else return (
                    <div className={"text_right"}>
                        <p className={"firaSans_regular_16_grey"}>{slides[return_right()].adressBIG}</p>
                        <p className={"firaSans_regular_16_grey"}>{slides[return_right()].adressSMALL}</p>
                    </div>)

            case "pic_right":
                if (isAnimated === 2) {
                    if (click === "right")
                    {
                        return (slides[return_left()].picture)
                    }
                    else
                    {
                        return (slides[frontSlide].picture)
                    }
                }
                else return (slides[return_right()].picture)
            case "pic_left":
                {
                if (isAnimated === 2) {
                    if (click === "right")
                    {
                        return (slides[frontSlide].picture)
                    }
                    else
                    {
                        return (slides[return_right()].picture)
                    }
                }
                else return (slides[return_left()].picture)
            }
            case "pic_front": {
                if (isAnimated === 2) {
                    if (click === "right")
                    {
                        return (slides[return_right()].picture)
                    }
                    else
                    {
                        return (slides[return_left()].picture)
                    }
                }
                else return (slides[frontSlide].picture)
            }
            default:
                break;
        }
    }
    const return_left = () => {
        return (((frontSlide + 2) % slides.length))
    }
    const return_right = () =>
    {
        return (((frontSlide + 1) % slides.length))
    }

    return (
        <div className={"place_for_slider"}>
            {/*KNOPKI*/}
            <button className={"button_left"} onClick={left_click}>
                <img style={{position: "absolute", right: "16px", top: "16px", zIndex: 2}} src={"./images/slider/button_back.png"}/>
            </button>
            <button className={"button_right"} onClick={right_click}>
                <img style={{position: "absolute", right: "16px", top: "16px", zIndex: 2}} src={"./images/slider/button_next.png"}/>
            </button>
            {/*ТЕКСТ СЛЕВА СВЕРХУ*/}
            <div className={`${!(isAnimated) ? 'slider_front_position' : ' '} 
                             ${(click === 'right' && isAnimated) ? 'animation_front_slide_move_to_right' : 'slider_front_position'}
                             ${(click === 'left' && isAnimated) ? 'animation_front_slide_move_to_left' : 'slider_front_position'}`}>
                <div className={`${(click === 'none') ? 'none' : ''}, 
                                 ${(click === 'right' && (isAnimated === 2)) ? 'text_left_animation_fade_in' : 'none'}`}>
                    {take_text_block("left")}
                </div>
                {/*ТЕКСТ СПРАВА СВЕРХУ*/}
                <div className={`${(click === 'none') ? 'none' : ''} 
                               ${((click === 'right') && (isAnimated === 2)) ? 'text_right_animation_fade_in' : 'none'}`
                }>
                    {take_text_block("right")}
                </div>
                {/*ОСНОВНОЙ ТЕКСТ СНИЗУ*/}
                <div className={`${(isAnimated) ? 'front_text_fade_out' : ''}`}>
                    {take_text_block("center")}
                </div>
                <div className={(isAnimated > 0) ? "front_picture_scale" : "front_picture"}>
                    {take_text_block("pic_front")}
                </div>
            </div>

            <div className={`${(click === 'none') ? 'slider_left_position' : ' '} 
                             ${(click === 'right' && isAnimated) ? 'animation_left_slide_move_to_center' : 'slider_left_position'}
                             ${(click === 'left' && isAnimated) ? 'animation_left_slide_move_to_right' : 'slider_left_position'}`}>
                {/*ТЕКСТ СЛЕВА СВЕРХУ*/}
                <div  className={`${(isAnimated) ? 'text_left_animation_fade_out' : ''}`}>
                    {take_text_block("left")}
                </div>
                {/*ТЕКСТ СПРАВА СВЕРХУ*/}
                <div className={`${(click === 'none') ? 'none' : ''} 
                                 ${(click === 'left' && (isAnimated === 2)) ? 'text_right_animation_fade_in' : 'none'}`
                }>
                    {take_text_block("right")}
                </div>
                {/*ОСНОВНОЙ ТЕКСТ СНИЗУ*/}
                <div   className={`${(click === 'none') ? 'none' : ''} 
                                   ${(click === 'right' && (isAnimated === 2)) ? 'front_text_fade_in' : 'none'}`
                }>
                    {take_text_block("center")}
                </div>
                <div className={`${( (isAnimated === 0) || (click === 'left')) ? 'side_picture' : 'side_picture_scale_to_center'}`}>
                    {take_text_block("pic_left")}
                </div>
            </div>
    {/*//     side_picture_scale_to_center "side_picture"*/}

            <div className={`${!(isAnimated) ? 'slider_right_position' : ' '} 
                             ${(click === 'right' && isAnimated) ? 'animation_right_slide_move_to_left' : 'slider_right_position'}
                             ${(click === 'left' && isAnimated) ? 'animation_right_slide_move_to_center' : 'slider_right_position'}`}>
                {/*ТЕКСТ СЛЕВА СВЕРХУ*/}
                <div className={`${(click === 'none') ? 'none' : ''} 
                               ${(click === 'right' && (isAnimated === 2)) ? 'text_left_animation_fade_in' : 'none'}`
                }>
                    {take_text_block("left")}
                </div>
                {/*ТЕКСТ СПРАВА СВЕРХУ*/}
                <div className={`${(!isAnimated) ? '' : 'text_right_animation_fade_out'}`}>
                    {take_text_block("right")}
                    {/*    text_right_animation_fade_out*/}
                </div>
                {/*ОСНОВНОЙ ТЕКСТ СНИЗУ*/}
                <div className={`${!(isAnimated === 0) ? 'none' : ''} 
                                 ${((click === 'right') || (isAnimated < 2)) ? 'none' : 'front_text_fade_in'}`}>
                    {take_text_block("center")}
                </div>
                <div
                    className={`${((isAnimated === 0) || (click === 'right')) ? 'side_picture' : 'side_picture_scale_to_center'}`}>
                    {take_text_block("pic_right")}
                </div>
            </div>
        </div>
    )
}
