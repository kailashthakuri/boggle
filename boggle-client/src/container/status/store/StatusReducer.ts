import {StatusAction} from "./StatusAction";
import {Action} from "../../../store/AppAction";
import {DataStatus} from "../../../utils/AppData";

const statusReducer = (state: DataStatus, action: Action<StatusAction, DataStatus>) => {
    switch (action.type) {
        case StatusAction.SET_STATUS:
            return state;
        default:
            return state;
    }

};
