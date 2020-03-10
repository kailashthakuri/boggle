import React from "react";
import {wordGameReducer} from "../../store/WordGameReducer";
import {WordGameActionFactory} from "../../store/WordGameAction";
import {DataStatus} from "../../../../../utils/AppData";

const wordPoint = {word: "Test", point: 1, isValid: true};
describe("Test WordGame Reducers", () => {
    it("sets the validWordPointModel.", () => {
        expect(wordGameReducer(undefined, WordGameActionFactory.setValidWordPoint(wordPoint)))
            .toEqual({validWordPointModels: [wordPoint]});
    })
    it("sets the wordPoint.", () => {
        expect(wordGameReducer(undefined, WordGameActionFactory.setWordPoint(wordPoint)))
            .toEqual({validWordPointModels: [], wordPointModel: wordPoint});
    })
    it("sets the status.", () => {
        const status = {status: DataStatus.Loaded};
        expect(wordGameReducer(undefined, WordGameActionFactory.setStatus(status)))
            .toEqual({validWordPointModels: [], status});
    })
})
