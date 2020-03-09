import {ValidPointModel, WordPointModel} from "../WordGameContants";
import {WordGameAction} from "./WordGameAction";
import {Action} from "../../../../store/AppAction";
import {Status} from "../../../../utils/AppData";

export interface WordGameState {
    validWordPoints: Array<WordPointModel>;
    validPointModel?: ValidPointModel,
    status?: Status;
}

const initialState: WordGameState = {
    validWordPoints: [],
};

export const wordGameReducer = (state = initialState, action: Action<WordGameAction, any>) => {
    switch (action.type) {
        case WordGameAction.SET_VALID_WORD_POINT:
            return {
                ...state,
                validWordPoints: [...state.validWordPoints, action.payload]
            };
        case WordGameAction.SET_VALID_POINT:
            return {
                ...state,
                validPointModel: action.payload
            };
        case WordGameAction.SET_STATUS:
            return {
                ...state,
                status: action.payload
            }
        case WordGameAction.RESET_STATE:
            return {...initialState};
        default:
            return state;
    }
};
