import React, { useState } from 'react';
import {Updater} from "./card_poster";

export const DateButtons = () => {
  const [activeButton, setActiveButton] = useState<number>(0);
  const toHumanLanguage = (date: Date) =>
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
      const days = (day: number) =>
      {
          switch (day) {
              case 1: return "Пн";
              case 2: return "Вт";
              case 3: return "Ср";
              case 4: return "Чт";
              case 5: return "Пт";
              case 6: return "Сб";
              case 0: return "Вс";
          }
      }
      return (date.getDate() + " " + mon(date.getMonth()) + " • " + days(date.getDay()));
  }

  const getUTCDate = (daysToAdd: number = 0): string => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return toHumanLanguage(date);
  };
  const handleButtonClick = (index: number) => {

    setActiveButton(index);
  };

  return (
      <div className={"block_poster"}>
          <div className={"block_text_and_date"}>
              <div className={"text_lora_40_and_line"}>
                  <h3 className={"lora_medium_40_white"}>АФИША</h3>
                  <img src={"./images/poster/Line-small.png"}></img>
              </div>
                  <div className={"buttons_date_poster"}>
                      <button className={"main_button_red"} onClick={() => handleButtonClick(0)}>
                          <p className={"firaSans_regular_16_grey"} style={{color: "white"}}>{getUTCDate(0)}</p>
                      </button>
                      <button className={"main_button_red"} onClick={() => handleButtonClick(1)}>
                          <p className={"firaSans_regular_16_grey"} style={{color: "white"}}>{getUTCDate(1)}</p>
                      </button>
                      <button className={"main_button_red"} onClick={() => handleButtonClick(2)}>
                          <p className={"firaSans_regular_16_grey"} style={{color: "white"}}>{getUTCDate(2)}</p>
                      </button>
                  </div>
          </div>
          <div className={"poster_cards"}>
              <Updater value = {activeButton}/>
          </div>
      </div>
  );
}