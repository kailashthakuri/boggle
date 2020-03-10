import {WordPointModel} from "../WordGameContants";
import {WordGameAction} from "./WordGameAction";
import {Action} from "../../../../store/AppAction";
import {Status} from "../../../../utils/AppData";

export interface WordGameState {
    validWordPointModels: Array<WordPointModel>;
    wordPointModel?: WordPointModel,
    status?: Status;
}

const initialState: WordGameState = {
    validWordPointModels: [],
};

export const wordGameReducer = (state = initialState, action: Action<WordGameAction, any>) => {
    switch (action.type) {
        case WordGameAction.SET_VALID_WORD_POINT:
            return {
                ...state,
                validWordPointModels: [...state.validWordPointModels, action.payload]
            };
        case WordGameAction.SET_WORD_POINT:
            return {
                ...state,
                wordPointModel: action.payload
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
