import {Action} from "../../../../store/AppAction";
import {WordPointModel} from "../WordGameContants";
import {Status} from "../../../../utils/AppData";

export enum WordGameAction {
    SET_VALID_WORD_POINT = "[WordGame] SET_VALID_WORD_POINT",
    SET_WORD_POINT = "[WordGame] SET_VALID_POINT",
    SET_STATUS = "[WordGame] SET_STATUS",
    RESET_STATE = "[WordGame] RESET_STATE",
}

export class WordGameActionFactory {
    public static setValidWordPoint = (payload: WordPointModel): Action<WordGameAction.SET_VALID_WORD_POINT, WordPointModel> => ({
        type: WordGameAction.SET_VALID_WORD_POINT,
        payload
    })

    public static setWordPoint = (payload: any): Action<WordGameAction.SET_WORD_POINT, WordPointModel> => ({
        type: WordGameAction.SET_WORD_POINT,
        payload
    });

    public static setStatus = (payload: Status): Action<WordGameAction.SET_STATUS, Status> => ({
        type: WordGameAction.SET_STATUS,
        payload
    });

    public static resetState = (): Action<WordGameAction.RESET_STATE, null> => ({
        type: WordGameAction.RESET_STATE,
        payload: null
    });
}

export type WordGameActionTypes = Action<WordGameAction, any> ;

