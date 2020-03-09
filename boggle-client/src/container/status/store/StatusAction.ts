import {Action} from "../../../store/AppAction";
import {Status} from "../../../utils/AppData";

export enum StatusAction {
    SET_STATUS = "[Status] SET_STATUS"
}

export class StatusActionFactory {
    public static setStatus = (payload: Status): Action<StatusAction, Status> => {
        return {type: StatusAction.SET_STATUS, payload};
    };
}
