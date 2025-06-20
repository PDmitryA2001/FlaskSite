import React, {useContext} from 'react';
import {ReserveContext} from "./ReserveComponent";

export const Stroke_info = (selectedItems: string[]) =>
{
    const {state, dispatch} = useContext(ReserveContext);
        const get_sklonenie = () =>
    {
        if (state.Stage1.guests % 10 === 1)
            return "гостя"
        else
            return "гостей"

    }
        const get_P_tables = () =>
    {
        if (selectedItems.length <= 1)
        return (
            <p>Столик номер {selectedItems}</p>
        )
        else
            return (
                <p>Столики номер{selectedItems.map((item) => {return (" " + item)})}</p>
            )
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

        const bol = new Date(state.Stage1.datatime)
        return (
            <div className={"information"}>
                <p>{get_date_str(bol)}</p>
                {get_P_tables()}
                <p>для {state.Stage1.guests} {get_sklonenie()}</p>
            </div>
        )
}