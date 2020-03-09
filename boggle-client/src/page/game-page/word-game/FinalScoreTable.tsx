import React, {useEffect, useState} from "react";
import {WordPointModel} from "./WordGameContants";
import * as _ from 'lodash';


interface IFinalScoreState {
    totalPoint: number,
    totalWords: number,
    longestWord: string,
    bestWord: string,
}

function FinalScoreTable(props: { wordPointModels: WordPointModel[]; }) {
    const [finalScore, setFinalScore] = useState<Partial<IFinalScoreState>>({});
    useEffect(() => {
        const sum = props.wordPointModels.reduce((sum, wordPoint) => sum + wordPoint.point, 0);
        const length = Math.max(...(props.wordPointModels.map(el => el.word.length)));
        const longestWords = props.wordPointModels.filter(a => a.word.length === length).map(a => a.word.toLocaleLowerCase());
        setFinalScore({
            totalPoint: sum,
            totalWords: props.wordPointModels.length,
            longestWord: _.join(longestWords, ", ")
        });
    }, [props.wordPointModels])

    return (
        <div>
            <table className="table table-borderless table-striped table-sm">
                <tbody>
                <tr>
                    <td>Total Score :</td>
                    <td> {finalScore?.totalPoint} </td>
                </tr>
                <tr>
                    <td>Total Words :</td>
                    <td>{finalScore?.totalWords} </td>
                </tr>
                <tr>
                    <td>Longest Word(s) :</td>
                    <td> {finalScore?.longestWord} </td>
                </tr>
                <tr>
                    <td>Best Word :</td>
                    <td>{finalScore?.bestWord}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default FinalScoreTable;
