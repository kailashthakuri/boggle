import React, {useEffect, useState} from "react";
import {WordPointModel} from "./WordGameContants";

interface IScoreTableProps {
    wordPointModels: WordPointModel[];
}

function ScoreTable(props: IScoreTableProps) {
    const [totalPoint, setTotalPoint] = useState(0);
    useEffect(() => {
        const totalPoint = props && props.wordPointModels.reduce((sum, wordPoint) => sum + wordPoint.point, 0)
        setTotalPoint(totalPoint);
    }, [props.wordPointModels])

    return (
        <div>
            <table id="score-table" className='table table-striped'>
                <thead>
                <tr>
                    <th scope="col">Word</th>
                    <th scope="col">Score</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.wordPointModels && props.wordPointModels.map(wordPoint => {
                        return (<tr key={wordPoint.word}>
                            <td>{wordPoint.word}</td>
                            <td>{wordPoint.point}</td>
                        </tr>)
                    })
                }
                <tr id="footer">
                    <td>Total</td>
                    <td>{totalPoint}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ScoreTable;
