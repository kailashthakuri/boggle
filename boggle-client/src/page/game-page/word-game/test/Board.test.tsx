import React from "react";
import {WordModel} from "../WordGameContants";
import {shallow} from "enzyme";
import Board from "../Board";


const wordModels: WordModel[][] = [
    [
        {row: 0, column: 0, char: "A"},
        {row: 0, column: 1, char: "B"},
        {row: 0, column: 2, char: "C"},
        {row: 0, column: 3, char: "D"}
    ],
    [
        {row: 1, column: 0, char: "E"},
        {row: 1, column: 1, char: "F"},
        {row: 1, column: 2, char: "G"},
        {row: 1, column: 3, char: "H"}
    ],
    [
        {row: 2, column: 0, char: "I"},
        {row: 2, column: 1, char: "J"},
        {row: 2, column: 2, char: "K"},
        {row: 2, column: 3, char: "L"}
    ],
    [
        {row: 3, column: 0, char: "M"},
        {row: 3, column: 1, char: "N"},
        {row: 3, column: 2, char: "O"},
        {row: 3, column: 3, char: "P"}
    ]
];


describe("Board Component Test", () => {
    it("should generate 4 by 4 Board", () => {
        const boardWrapper = shallow(<Board wordModels={wordModels}/>);

    })
})