import React from "react";
import {WordPointModel} from "./WordGameContants";
import * as _ from 'lodash';


export interface IFinalScoreState {
    totalPoint: number,
    totalWords: number,
    longestWord: string,
    bestWord: string,
}

function FinalScoreTable(props: { wordPointModels: WordPointModel[]; }) {
    const [finalScore, setFinalScore] = React.useState<Partial<IFinalScoreState>>({});
    React.useEffect(() => {
        const sum = props.wordPointModels.reduce((sum, wordPoint) => sum + wordPoint.point, 0);
        const maxLength = Math.max(...(props.wordPointModels.map(el => el.word.length)));
        const longestWords = props.wordPointModels.filter(a => a.word.length === maxLength).map(a => a.word.toLocaleLowerCase());
        setFinalScore({
            totalPoint: sum,
            totalWords: props.wordPointModels.length,
            longestWord: _.join(longestWords, ", ")
        });
    }, [props.wordPointModels])


    const renderTableData = (title: string, value: any, className: string) => {
        return (<tr className={className}>
            <td>{title} :</td>
            <td>{value}</td>
        </tr>);
    }

    return (
        <div>
            <table className="table table-borderless table-striped table-sm">
                <tbody>
                {renderTableData("Total Score", finalScore?.totalPoint, "total-score")}
                {renderTableData("Total Words", finalScore?.totalWords, "total-words")}
                {renderTableData("Longest Word(s)", finalScore?.longestWord, "longest-word")}
                {renderTableData("Best Word", finalScore?.bestWord, "best-word")}
                </tbody>
            </table>
        </div>
    );
}

export default FinalScoreTable;
