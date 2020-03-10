import {AxiosRequestConfig, AxiosResponse} from "axios";
import {Dispatch} from "redux";
import {WordGameActionFactory, WordGameActionTypes} from "./WordGameAction";
import {APIData, DataStatus} from "../../../../utils/AppData";
import {API} from "../../../../utils/Api";
import {WordPointModel} from "../WordGameContants";

export function tryValidateWordEffect(word: string) {
    return (dispatch: Dispatch<WordGameActionTypes>) => {
        dispatch(WordGameActionFactory.setStatus({status: DataStatus.Loading}));
        const config: AxiosRequestConfig = {
            params: {word: word},
            headers: {'Content-Type': 'application/json'}
        };
        API.get("/wordvalidate", config)
            .then((response: AxiosResponse<APIData<WordPointModel>>) => {
                const apiData = response.data;
                if (apiData.error) {
                    dispatch(WordGameActionFactory.setStatus({status: DataStatus.ErrorState, error: apiData.error}));
                } else {
                    apiData.data.word = word;
                    dispatch(WordGameActionFactory.setStatus({status: DataStatus.Loaded}));
                    dispatch(WordGameActionFactory.setWordPoint(apiData.data));
                }
            })
            .catch(error => {
                dispatch(WordGameActionFactory.setStatus({
                    status: DataStatus.ErrorState,
                    error: {errorCode: "404", errorMsg: "Url Not Found"}
                }));
            });
    };
}
