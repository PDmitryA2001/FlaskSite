import React, {useState} from "react";

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
    const [sliders, setSliders] = useState({
        front: 0,
        left: 2,
        right: 1,
        animated: 0,
    })
    const [click, setClick] = useState('none')
    const right_click = async () =>
    {
        setClick('right')
        console.log(sliders.left + " LEVO ==========BEFORE CLICK====================")
        console.log(sliders.left + " PRAVO")
        console.log(sliders.left + " CENTER")
        setSliders(prev => (
            {
                front: prev.front,
                left: prev.left,
                right: prev.right,
                animated: 1,
            }
        ))
        await new Promise(resolve => setTimeout(resolve, 250));
        setSliders(prev => (
            {
                front: prev.front,
                left: prev.left,
                right: prev.right,
                animated: 2,
            }
        ))
        await new Promise(resolve => setTimeout(resolve, 250));
        setSliders(prev => (
            {
                front: prev.left,
                left: prev.right,
                right: prev.front,
                animated: 0,
            }
        ))
    }
    const left_click = async () =>
    {
        setClick('left')
                setSliders(prev => (
            {
                front: prev.front,
                left: prev.left,
                right: prev.right,
                animated: 1,
            }
        ))
        await new Promise(resolve => setTimeout(resolve, 250));
        setSliders(prev => (
            {
                front: prev.front,
                left: prev.left,
                right: prev.right,
                animated: 2,
            }
        ))

        await new Promise(resolve => setTimeout(resolve, 250));
        setSliders(prev => (
            {
                front: prev.right,
                left: prev.front,
                right: prev.left,
                animated: 0,
            }
        ))
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
            <div className={`${!(sliders.animated) ? 'slider_front_position' : ' '} 
                             ${(click === 'right' && sliders.animated) ? 'animation_front_slide_move_to_right' : 'slider_front_position'}
                             ${(click === 'left' && sliders.animated) ? 'animation_front_slide_move_to_left' : 'slider_front_position'}`}>
                <div className={`${(click === 'none') ? 'none' : ''}, 
                                ${(click === 'left' && (sliders.animated === 2)) ? 'text_left_animation_fade_in' : 'none'}`}>
                        <p className={"firaSans_regular_16_grey"}>{slides[sliders.front].adressBIG}</p>
                        <p className={"firaSans_regular_16_grey"}>{slides[sliders.front].adressSMALL}</p>
                </div>
                <div className={`${(click === 'none') ? 'none' : ''} 
                               ${((click === 'right') && (sliders.animated === 2)) ? 'text_right_animation_fade_in' : 'none'}`
                }>
                    <p className={"firaSans_regular_16_grey"}>{slides[sliders.front].adressBIG}</p>
                    <p className={"firaSans_regular_16_grey"}>{slides[sliders.front].adressSMALL}</p>
                </div>
                <div className={`${(sliders.animated) ? 'front_text_fade_out' : 'text_main_top'}`}>
                    <p className={"lora_medium_32_black"}>{slides[sliders.front].adressBIG}</p>
                    <p className={"lora_medium_24_black"}>{slides[sliders.front].adressSMALL}</p>
                </div>
                <div className={(sliders.animated > 0) ? "front_picture_scale" : "front_picture"}>
                    {slides[sliders.front].picture}
                </div>
            </div>

            <div className={`${(click === 'none') ? 'slider_left_position' : ' '} 
                             ${(click === 'right' && sliders.animated) ? 'animation_left_slide_move_to_center' : 'slider_left_position'}
                             ${(click === 'left' && sliders.animated) ? 'animation_left_slide_move_to_right' : 'slider_left_position'}`}>
                <div className={`${(sliders.animated) ? 'text_left_animation_fade_out' : 'text_left'}`}>
                    <p className={"firaSans_regular_16_grey"}>{slides[sliders.left].adressBIG}</p>
                    <p className={"firaSans_regular_16_grey"}>{slides[sliders.left].adressSMALL}</p>
                </div>
                <div className={`${(click === 'none') ? 'none' : ''} 
                                 ${(click === 'left' && (sliders.animated === 2)) ? 'text_right_animation_fade_in' : 'none'}`
                }>
                    <p className={"firaSans_regular_16_grey"}>{slides[sliders.left].adressBIG}</p>
                    <p className={"firaSans_regular_16_grey"}>{slides[sliders.left].adressSMALL}</p>
                </div>
                <div className={`${(click === 'none') ? 'none' : ''} 
                                   ${(click === 'right' && (sliders.animated === 2)) ? 'front_text_fade_in' : 'none'}`
                }>
                    <p className={"lora_medium_32_black"}>{slides[sliders.left].adressBIG}</p>
                    <p className={"lora_medium_24_black"}>{slides[sliders.left].adressSMALL}</p>
                </div>
                <div className={`${((sliders.animated === 0) || (click === 'left')) ? 'side_picture' : 'side_picture_scale_to_center'}`}>
                    {slides[sliders.left].picture}
                </div>
            </div>
            <div className={`${!(sliders.animated) ? 'slider_right_position' : ' '} 
                             ${(click === 'right' && sliders.animated) ? 'animation_right_slide_move_to_left' : 'slider_right_position'}
                             ${(click === 'left' && sliders.animated) ? 'animation_right_slide_move_to_center' : 'slider_right_position'}`}>
                <div className={`${(click === 'none') ? 'none' : ''} 
                               ${(click === 'right' && (sliders.animated === 2)) ? 'text_left_animation_fade_in' : 'none'}`
                }>
                    <p className={"firaSans_regular_16_grey"}>{slides[sliders.right].adressBIG}</p>
                    <p className={"firaSans_regular_16_grey"}>{slides[sliders.right].adressSMALL}</p>
                </div>
                <div className={`${(!sliders.animated) ? 'text_right' : 'text_right_animation_fade_out'}`}>
                    <p className={"firaSans_regular_16_grey"}>{slides[sliders.right].adressBIG}</p>
                    <p className={"firaSans_regular_16_grey"}>{slides[sliders.right].adressSMALL}</p>
                    {/*    text_right_animation_fade_out*/}
                </div>
                <div className={`${!(sliders.animated === 0) ? 'none' : ''} 
                                 ${((click === 'right') || (sliders.animated < 2)) ? 'none' : 'front_text_fade_in'}`}>
                    <p className={"lora_medium_32_black"}>{slides[sliders.right].adressBIG}</p>
                    <p className={"lora_medium_24_black"}>{slides[sliders.right].adressSMALL}</p>
                </div>
                <div
                    className={`${((sliders.animated === 0) || (click === 'right')) ? 'side_picture' : 'side_picture_scale_to_center'}`}>
                    {slides[sliders.right].picture}
                </div>
            </div>
        </div>
    )
}
