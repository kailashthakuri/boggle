import React from "react";
import {WordPointModel} from "../WordGameContants";
import {mount} from "enzyme";
import FinalScoreTable from "../FinalScoreTable";


const wordPointModels: WordPointModel[] = [{word: "Test", point: 1}, {word: "Program", point: 3}];

describe("Test FinalScoreTable Compoent", () => {
    let mountWrapper: any;
    let useEffect;
    beforeEach(() => {
        mountWrapper = mount(<FinalScoreTable wordPointModels={wordPointModels}/>);
    })

    it("should give correct sum of points", () => {
        const totalScore = mountWrapper.find(".total-score").find("td").last().text();
        expect(totalScore).toEqual("4");
    })

    it("should give correct count of words", () => {
        const totalWords = mountWrapper.find(".total-words").find("td").last().text();
        expect(totalWords).toEqual("2");
    })
    it("should give correct longest words", () => {
        const longestWords = mountWrapper.find(".longest-word").find("td").last().text();
        expect(longestWords).toEqual("program");
    })
})