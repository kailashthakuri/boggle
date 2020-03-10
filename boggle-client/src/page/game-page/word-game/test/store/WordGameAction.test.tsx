import React from "react";
import {WordGameAction, WordGameActionFactory} from "../../store/WordGameAction";
import {DataStatus, Status} from "../../../../../utils/AppData";

const wordPoint = {word: "Test", point: 1, isValid: true};
describe("WordGame Action Creator Test", () => {
    it("test setValidWordPoint action creator ", () => {
        expect(WordGameActionFactory.setValidWordPoint(wordPoint))
            .toEqual({
                type: WordGameAction.SET_VALID_WORD_POINT,
                payload: wordPoint
            })
    })
    it("test setWordPoint action creator ", () => {
        expect(WordGameActionFactory.setWordPoint(wordPoint))
            .toEqual({
                type: WordGameAction.SET_WORD_POINT,
                payload: wordPoint
            })
    })
    it("test setStatus action creator ", () => {
        const status: Status = {status: DataStatus.Loaded};
        expect(WordGameActionFactory.setStatus(status))
            .toEqual({
                type: WordGameAction.SET_STATUS,
                payload: status
            })
    })
    it("test resetState action creator ", () => {
        expect(WordGameActionFactory.resetState())
            .toEqual({
                type: WordGameAction.RESET_STATE,
                payload: null
            })
    })

})
