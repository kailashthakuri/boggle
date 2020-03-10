import React from "react";
import {WordModel} from "./WordGameContants";

function Board(props: { wordModels: WordModel[][] }) {

    const renderBox = (index: number, char: string) => {
        return (
            <div key={index} className="boggle">
                <span>{char}</span>
            </div>
        );
    }

    return (
        <div id="board">
            {props.wordModels.map((wordModel: WordModel[], rowIndex: number) => {
                return (
                    <div key={rowIndex} className="row align-self-center  justify-content-center">
                        {wordModel.map((word, colIndex) => renderBox(colIndex, word.char))}
                    </div>
                );
            })}
        </div>
    );
}

export default Board;
