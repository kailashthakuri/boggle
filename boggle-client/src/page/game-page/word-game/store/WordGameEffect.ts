import {AxiosRequestConfig, AxiosResponse} from "axios";
import {Dispatch} from "redux";
import {WordGameActionFactory, WordGameActionTypes} from "./WordGameAction";
import {APIData, DataStatus} from "../../../../utils/AppData";
import {API} from "../../../../utils/Api";
import {ValidPointModel} from "../WordGameContants";


export function tryValidateWordEffect(word: string) {
    return (dispatch: Dispatch<WordGameActionTypes>) => {
        dispatch(WordGameActionFactory.setStatus({status: DataStatus.Loading}));
        const config: AxiosRequestConfig = {
            params: {word: word},
            headers: {'Content-Type': 'application/json'}
        };
        API.get("/wordvalidate", config)
            .then((response: AxiosResponse<APIData<ValidPointModel>>) => {
                const apiData = response.data;
                const validPointModel: ValidPointModel = apiData.data;
                if (apiData.error) {
                    dispatch(WordGameActionFactory.setStatus({status: DataStatus.ErrorState, error: apiData.error}));
                } else {
                    dispatch(WordGameActionFactory.setStatus({status: DataStatus.Loaded}));
                    dispatch(WordGameActionFactory.setValidPoint(apiData.data));
                }
            })
            .catch(error => {
                dispatch(WordGameActionFactory.setStatus({status: DataStatus.ErrorState}));
            });
    };
}
