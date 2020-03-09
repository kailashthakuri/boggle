import {combineReducers} from "redux";
import {wordGameReducer} from "../page/game-page/word-game/store/WordGameReducer";

const appReducer = combineReducers({
    wordGame: wordGameReducer
});

export type AppState = ReturnType<typeof appReducer>

export default appReducer;
