import React, {Reducer, useContext, useEffect} from "react";
import {SetTime} from "./comps_stage_1/stage_1_main"
import {Stage_2} from "./comps_stage_2/stage_2_select_table";
import {Stage_3} from "./comps_stage_3/stage_3_additionally_and_submit";
import { createContext, useReducer, useMemo } from 'react';
import {
    data_stage_1,
    data_stage_2,
    data_stage_3,
    ReserveAction,
    ReserveState
} from "@/types/reserve_types/Reserve_state";

const datetime_today = () =>
{
    const date_today = new Date()
    date_today.setHours(3)
    date_today.setMinutes(0)
    date_today.setMilliseconds(0)
    console.log(date_today)
    return date_today.toISOString()
}
    const initialState: ReserveState = {
      stage: 1,
      Stage1:
          {
              datatime: datetime_today(),
              adress: '',
              guests: 1,
              r_tables: [0],
              all_tables:
                  [{
                      capacity: 0,
                      number: 0,
                  }],
          },
      Stage2: {
          table: [''],
      },
      Stage3: {
            additionalInfo: '',
            name: '',
            phone: '',
            email: '',
      },
    };
    function reserveReducer(state: ReserveState, action: ReserveAction): ReserveState {
      switch (action.type) {
        case 'SET_STAGE_1':
          return { ...state, Stage1: action.payload, };
        case 'SET_STAGE_2':
          return { ...state, Stage2: action.payload };
        case 'SET_STAGE_3':
          return { ...state, Stage3: action.payload };
        case 'NEXT_STAGE':
          return { ...state, stage: Math.min(state.stage + 1, 3) as 1 | 2 | 3 };
        case 'PREV_STAGE':
          return { ...state, stage: Math.max(state.stage - 1, 1) as 1 | 2 | 3 };
        default:
          return state;
      }
}

export const ReserveContext = createContext<{
  state: ReserveState;
  dispatch: React.Dispatch<ReserveAction>;
}>(null!);

export const ReserveComponent = () =>
{

    const [state, dispatch] = useReducer(reserveReducer, initialState);
    const contextValue = useMemo(() => ({ state, dispatch }), [state]);
    if (state.Stage2.table)
        console.log(state.Stage2.table.length ,"Прошло")
    return(
        <ReserveContext.Provider value={contextValue}>
            <div className={"reserve_table_container"}>
                <div className={"head_of_reserve"}>
                    <img src={"./images/reserve_table/Line_42.png"}/>
                    <h2 className={"lora_blod_40_red"}>БРОНЬ СТОЛИКОВ</h2>
                    <img src={"./images/reserve_table/Line_42.png"}/>
                </div>
                <div className={"stages"}>
                    <div className={`${(state.stage === 1) ? "main_button_red animated_to_red" : "main_button_red animated_to_green"}
                                    ${(state.stage != 1) ? "main_button_red background_green" : "main_button_red"}`}
                    style={{pointerEvents: "none", cursor: "not-allowed"}}>
                        <p className={"firaSans_regular_16_grey"} style={{color: "white", userSelect: "none"}}>Дата и
                            время{state.stage}</p>
                    </div>
                    <div className={`${(state.stage < 2) ? "main_button_red disabled animated_to_grey" : ""}
                                     ${(state.Stage2.table[0] === '' && state.stage === 2) ? "main_button_red animated_from_grey" : ""}
                                     ${(state.Stage2.table[0] != '' && state.stage > 2) ? "main_button_red animated_to_green" : "main_button_red animated_to_red"}`}
                         style={{pointerEvents: "none", cursor: "not-allowed"}}>
                        <p className={"firaSans_regular_16_grey"} style={{color: "white", userSelect: "none"}}>Выбор столиков</p>
                    </div>
                    <div className={`${(state.stage === 3) ? "main_button_red disabled animated_from_grey" : "main_button_red animated_to_grey"}`} style={{pointerEvents: "none", cursor: "not-allowed"}}>
                        <p className={"firaSans_regular_16_grey"} style={{color: "white", userSelect: "none"}}>Ваши данные</p>
                    </div>
                </div>
                {state.stage === 1 && <SetTime/>}
                {state.stage === 2 && <Stage_2/>}
                {state.stage === 3 && <Stage_3/>}
            </div>
        </ReserveContext.Provider>
    )
}