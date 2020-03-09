import React from "react";
import {WordModel} from "./WordGameContants";

function Board(props: { wordModels: WordModel[][] }) {
    return (
        <div id="board">
            {props.wordModels.map((wordModel: WordModel[], index: number) => {
                return (
                    <div key={index} className="row align-self-center  justify-content-center">
                        {wordModel.map((word, index) => {
                            return (
                                <div key={index} className="boggle">
                                    <span>{word.char}</span>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default Board;
