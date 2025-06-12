import React from 'react';
import { createRoot } from 'react-dom/client';
import { DateButtons } from './poster/button_poster_date'
import {Slider} from "./slider/slider";
import {ReserveComponent} from "./reserve/ReserveComponent"
import './index.css'
const root = createRoot(document.getElementById('main')!);
root.render(
    <body className={"body"}>
         <div className={"first_screen_background"}>
            <div className={"top_bar"}>
                <img src={"./images/top-bar/meat-logo.png"}></img>
                <div className={"top_bar_information_and_basket"}>
                    <div className={"top_bar_text_container"}>
                        <div className={"contacts"}>
                            <img src={"./images/top-bar/icon-phone.png"}></img>
                            <p style={{margin: "0px 32px 0px 8px"}} className={"firaSans_regular_16_grey"}>телефон</p>
                            <img src={"./images/top-bar/icon-maps.png"}></img>
                            <p style={{margin: "0px 32px 0px 8px"}} className={"firaSans_regular_16_grey"}>карты</p>
                            <img src={"./images/top-bar/icon-clock.png"}></img>
                            <p style={{margin: "0px 0px 0px 8px"}} className={"firaSans_regular_16_grey"}>самое ремя</p>
                        </div>
                        <div className={"navigation"}>
                            <a style={{margin: "0px 24px 0px 0px", userSelect: "none"}} className={"firaSans_regular_16_grey"}>О нас</a>
                            <a style={{margin: "0px 24px 0px 0px", userSelect: "none"}} className={"firaSans_regular_16_grey"}>Меню</a>
                            <a style={{margin: "0px 24px 0px 0px", userSelect: "none"}} className={"firaSans_regular_16_grey"}>Акции</a>
                            <a style={{margin: "0px 24px 0px 0px", userSelect: "none"}} className={"firaSans_regular_16_grey"}>Афиша</a>
                            <a style={{margin: "0px 24px 0px 0px", userSelect: "none"}} className={"firaSans_regular_16_grey"}>Галерея</a>
                            <a style={{margin: "0px 24px 0px 0px", userSelect: "none"}} className={"firaSans_regular_16_grey"}>Интерьер</a>
                            <a style={{margin: "0px 24px 0px 0px", userSelect: "none"}} className={"firaSans_regular_16_grey"}>Предзаказ и доставка</a>
                            <a style={{userSelect: "none"}} className={"firaSans_regular_16_grey"}>Контакты</a>
                        </div>
                    </div>
                    {/*<Basket/>*/}
                </div>
            </div>
            <div className={"eat_meat_main"}>
                <h1 className={"lora_medium_96_white"}>EAT MEAT</h1>
                <h2 className={"firaSans_light_24_grey"}>Сеть мясных ресторанов<br/>в Санкт-Петербугре</h2>
                <div className={"block_for_buttons_first_screen"}>
                    <button className={"main_button_red"}>
                        <p className={"firaSans_regular_16_grey"} style={{color: "white"}}>Бронь столиков</p>
                    </button>
                    <button className={"main_button_border_red"}>
                        <p className={"firaSans_regular_16_grey"} style={{color: "white"}}>Меню ресторана</p>
                    </button>
                </div>
            </div>
         </div>
         <div className={"container_second_screen"}>
             <Slider />
                <div className={"block_hero"}>
                    <div className={"text_block_hero_with_line"}>
                        <h2 className={"lora_medium_32_black"} style={{color: "#8A191D", margin: "0px 4px 0px 0px"}}>О РЕСТОРАНАХ EAT MEAT</h2>
                        <img src={"./images/rest/Line42.png"}></img>
                    </div>
                    <p className={"firaSans_regular_16_grey"} style={{color: "black"}}>Eat Meat – настоящий рай для любителей мяса!
                        В ресторане Вы можете познакомиться с мясными блюдами из техасской коптильни,
                        приготовленными по особой технологии, сочными бургерами, полюбившимися нашим гостям,
                        нежнейшими рёбрами на гриле, легендарными куриными крылышками.
                        <br/><br/>
                        Основное меню разработано при поддержке известных гуру и полностью отвечает специфике направления.
                        Мы грамотно используем зарубежные лайфхаки и уделяем внимание тонкостям,
                        а вам остаётся только наслаждаться настоящим BBQ в Санкт-Петербурге.
                    </p>
                    <button className={"main_button_red"}>
                        <p className={"firaSans_regular_16_grey"} style={{color: "white"}}>Читать далее</p>
                    </button>
                </div>
         </div>
         <div className={"main_background_third_screen"}>
             <div className={"menu_h2"}>
                 <h2 className={"lora_medium_32_black"} style={{color: "white", margin: "0px 5px 0px 0px"}}>Меню</h2>
                 <img src={"./images/go_to_menu/line.png"}></img>
             </div>
             <div className={"block_category"}>
                 <img src={"./images/go_to_menu/meat.png"} style={{margin: "0px 0px 32px 0px", width: "min-content", height: "min-content"}}></img>
                 <img src={"./images/go_to_menu/garnish.png"} style={{margin: "0px 0px 32px 0px", width: "min-content", height: "min-content"}}></img>
                 <img src={"./images/go_to_menu/salads.png"} style={{margin: "0px 0px 32px 0px", width: "min-content", height: "min-content"}}></img>
                 <img src={"./images/go_to_menu/dessert.png"} style={{margin: "0px 0px 32px 0px", width: "min-content", height: "min-content"}}></img>
                 <img src={"./images/go_to_menu/wine.png"} style={{margin: "0px 0px 32px 0px", width: "min-content", height: "min-content"}}></img>
                 <img src={"./images/go_to_menu/drink.png"} style={{margin: "0px 0px 32px 0px", width: "min-content", height: "min-content"}}></img>
             </div>
             <button className={"main_button_red"}>
                 <p className={"firaSans_regular_16_grey"} style={{color: "white"}}>Перейти в меню</p>
             </button>
         </div>
         <div className={"block_action"}>
            <img src={"./images/action/action-icon.png"} style={{margin: "0px 0px 24px 0px"}}></img>
            <div className={"super_action"}>
                <h3 className={"lora_blod_40_red"}>Акция</h3>
                <h3 className={"lora_medium_32_black"} style={{color: "white"}}>Съешь подарок</h3>
                <p className={"firaSans_regular_16_grey"} style={{color: "white"}}>
                    Сделай предзаказ через сайт на свинную рульку и получи мини-стейк на гриле со свежими овощами
                </p>
                <div style={{display: "flex"}}>
                    <button className={"main_button_red"} style={{margin: "0px 32px 0px 0px"}}>
                        <p className={"firaSans_regular_16_grey"} style={{color: "white"}}>Добавить в корзину</p>
                    </button>
                    <button className={"main_button_border_red"} style={{border: "1px solid black"}}>
                        <p className={"firaSans_regular_16_grey"} style={{color: "black"}}>Подробнее</p>
                    </button>
                </div>
            </div>
         </div>
        <div className={"icons_block"}>
            <div className={"container_icon_and_text"}>
                <img src={"./images/action/icon-time.png"}></img>
                <p className={"firaSans_regular_16_grey"} style={{color: "black", textAlign: "center"}}>Оформи предзаказ и<br/> приходи на все готовое</p>
            </div>
            <div className={"container_icon_and_text"}>
                <img src={"./images/action/location.png"}></img>
                <p className={"firaSans_regular_16_grey"} style={{color: "black", textAlign: "center"}}>Три ресторана в<br/> Санкт-Петербурге</p>
            </div>
            <div className={"container_icon_and_text"}>
                <img src={"./images/action/table.png"}></img>
                <p className={"firaSans_regular_16_grey"} style={{color: "black", textAlign: "center"}}>Бронирование<br/> удобного столика онлайн</p>
            </div>
            <div className={"container_icon_and_text"}>
                <img src={"./images/action/take-away.png"}></img>
                <p className={"firaSans_regular_16_grey"} style={{color: "black", textAlign: "center"}}>Собственная<br/> служба доставки</p>
            </div>
            <div className={"container_icon_and_text"}>
                <img src={"./images/action/wine.png"}></img>
                <p className={"firaSans_regular_16_grey"} style={{color: "black", textAlign: "center"}}>Развлекательные<br/> программы в выходные</p>
            </div>
        </div>
            <div className={"background_4_screen"}>
                <DateButtons/>
            <div className={"galerey"}>
                    <div className={"block_text_galerey_and_line"}>
                        <h3 className={"lora_medium_40_white"}>ГАЛЕРЕЯ</h3>
                    </div>
                    <div className={"cards_galerey"}>
                        <div className={"current_card_galerey"}>
                            <h4 className={"lora_medium_24_black"}
                                style={{color: "white", margin: "0px 0px 24px 0px"}}>Большой сольный концерт<br/>каких-то
                                типов</h4>
                            <p className={"firaSans_regular_16_grey"} style={{color: "white"}}>ул. Набережная, 228</p>
                        </div>
                        <div className={"not_current_card_galerey"}>
                            <h4 className={"lora_medium_24_black"}
                                style={{color: "white", margin: "0px 0px 40px 40px"}}>Поэтический вечер</h4>
                            <p className={"firaSans_regular_16_grey"}
                               style={{color: "white", margin: "0px 0px 40px 40px"}}>ул. Набережная, 228</p>
                        </div>
                        <div className={"not_current_card_galerey"}>
                            <h4 className={"lora_medium_24_black"}
                                style={{color: "white", margin: "0px 0px 40px 40px"}}>Поэтический вечер</h4>
                            <p className={"firaSans_regular_16_grey"}
                               style={{color: "white", margin: "0px 0px 40px 40px"}}>ул. Набережная, 228</p>
                        </div>
                    </div>
                </div>
            </div>
             <ReserveComponent />
    <div className={"footer"}>
        <div className={"contacts_footer"}>
            <img src={"./images/basement/Logo.png"}></img>
            <h2 className={"lora_medium_32_black"} style={{color: "white"}}>EAT MEAT</h2>
            <img src={"./images/basement/icon-phone.png"}></img>
            <h2 className={"lora_medium_32_black"} style={{color: "white"}}>8-800-555-35-35</h2>
        </div>
        <img src={"./images/basement/Line_48.png"} style={{margin: "0px 0px 40px 0px"}}></img>
        <div className={"container_blocks_footer"}>
            <div className={"block_text_footer"}>
                <a className={"firaSans_regular_16_grey"} style={{color: "white", margin: "0px 0px 8px 0px"}}>Меню</a>
                <a className={"firaSans_regular_16_grey"} style={{color: "white", margin: "0px 0px 8px 0px"}}>Акции</a>
                <a className={"firaSans_regular_16_grey"} style={{color: "white", margin: "0px 0px 8px 0px"}}>Афиша</a>
                <a className={"firaSans_regular_16_grey"} style={{color: "white", margin: "0px 0px 8px 0px"}}>Галерея</a>
                <a className={"firaSans_regular_16_grey"} style={{color: "white", margin: "0px 0px 8px 0px"}}>Предзаказ</a>
                <a className={"firaSans_regular_16_grey"} style={{color: "white", margin: "0px 0px 8px 0px"}}>Доставка</a>
                <a className={"firaSans_regular_16_grey"} style={{color: "white", margin: "0px 0px 8px 0px"}}>Контакты</a>
            </div>
            <div className={"block_text_footer"}>
                <a className={"firaSans_regular_16_grey"} style={{color: "white", margin: "0px 0px 8px 0px"}}><img src={"./images/basement/Group.png"}></img> Санкт-Петербург, ул. такая-то, 228</a>
                <a className={"firaSans_regular_16_grey"} style={{color: "white", margin: "0px 0px 8px 0px"}}><img src={"./images/basement/Group.png"}></img> Санкт-Петербург, ул. такая-то, 228</a>
                <a className={"firaSans_regular_16_grey"} style={{color: "white", margin: "0px 0px 8px 0px"}}><img src={"./images/basement/Group.png"}></img> Санкт-Петербург, ул. такая-то, 228</a>
            </div>
        </div>
        <div className={"block_buttons_footer"}>
            <button className={"main_button_red"}>
                <p className={"firaSans_regular_16_grey"} style={{color: "white"}}>Бронь столиков</p>
            </button>
            <img src={"./images/basement/icon-vk.png"} style={{width: "min-content", height: "min-content"}}></img>
            <img src={"./images/basement/icon-instagram.png"} style={{width: "min-content", height: "min-content"}}></img>
            <img src={"./images/basement/icon-facebook.png"} style={{width: "min-content", height: "min-content"}}></img>
        </div>
    </div>
    </body>
);