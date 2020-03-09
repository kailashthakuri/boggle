import {Action} from "../../../../store/AppAction";
import {ValidPointModel, WordPointModel} from "../WordGameContants";
import {Status} from "../../../../utils/AppData";

export enum WordGameAction {
    SET_VALID_WORD_POINT = "[WordGame] SET_VALID_WORD_POINT",
    TRY_VALIDATE_WORD = "[WordGame] VALIDATE_WORD",
    SET_STATUS = "[WordGame] SET_STATUS",
    SET_VALID_POINT = "[WordGame] SET_VALID_POINT",
    RESET_STATE = "[WordGame] RESET_STATE",
}

export class WordGameActionFactory {
    public static setValidWords = (payload: WordPointModel): Action<WordGameAction.SET_VALID_WORD_POINT, WordPointModel> => {
        return {type: WordGameAction.SET_VALID_WORD_POINT, payload};
    };

    public static setValidPoint = (payload: ValidPointModel): Action<WordGameAction.SET_VALID_POINT, ValidPointModel> => {
        return {type: WordGameAction.SET_VALID_POINT, payload: payload};
    };

    public static tryValidateWord = (payload: string): Action<WordGameAction.TRY_VALIDATE_WORD, string> => {
        return {type: WordGameAction.TRY_VALIDATE_WORD, payload: payload};
    };

    public static setStatus = (payload: Status): Action<WordGameAction.SET_STATUS, Status> => {
        return {type: WordGameAction.SET_STATUS, payload: payload};
    };

    public static resetState = (): Action<WordGameAction.RESET_STATE, null> => {
        return {type: WordGameAction.RESET_STATE, payload: null};
    };
}


export type WordGameActionTypes = Action<WordGameAction, any> ;

