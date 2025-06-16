import React, {Reducer, useContext} from "react";
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

    const initialState: ReserveState = {
      stage: 1,
      Stage1: null, // Данные из stage_1
      Stage2: null, // Данные из stage_2
      Stage3: null, // Данные из stage_3
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
    return(
        <ReserveContext.Provider value={contextValue}>
            <div className={"reserve_table_container"}>
                <div className={"head_of_reserve"}>
                    <img src={"./images/reserve_table/Line_42.png"}/>
                    <h2 className={"lora_blod_40_red"}>БРОНЬ СТОЛИКОВ</h2>
                    <img src={"./images/reserve_table/Line_42.png"}/>
                </div>
                <div className={"stages"}>
                    <div className={"main_button_red"}>
                        <p className={"firaSans_regular_16_grey"} style={{color: "white", userSelect: "none"}}>Дата и
                            время</p>
                    </div>
                    <div className={"main_button_red disabled"} style={{pointerEvents: "none", cursor: "not-allowed"}}>
                        <p className={"firaSans_regular_16_grey"} style={{color: "#5C6164"}}>Выбор столиков</p>
                    </div>
                    <div className={"main_button_red disabled"} style={{pointerEvents: "none", cursor: "not-allowed"}}>
                        <p className={"firaSans_regular_16_grey"} style={{color: "#5C6164"}}>Ваши данные</p>
                    </div>
                </div>
                {state.stage === 1 && <SetTime/>}
                {state.stage === 2 && <Stage_2/>}
                {state.stage === 3 && <Stage_3/>}
            </div>
        </ReserveContext.Provider>
    )
}