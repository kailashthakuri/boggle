import React from "react";
import {WordPointModel} from "../WordGameContants";
import {mount} from "enzyme";
import ScoreTable from "../ScoreTable";

const wordPointModels: WordPointModel[] = [{word: "Aeroplane", point: 7}, {word: "wow", point: 1}];

describe("Test ScoreTable Component", () => {
    let mountWrapper: any;
    let useEffect;
    beforeEach(() => {
        mountWrapper = mount(<ScoreTable wordPointModels={wordPointModels}/>);
    })
    it("can render rows for each words plus one total score row", () => {
        const rowCount = mountWrapper.find("tbody").find("tr").length;
        expect(rowCount).toEqual(3);
    })
    it("can show correct total score.", () => {
        const totalScore = mountWrapper.find("#footer").find("td").last().text();
        expect(totalScore).toEqual("8");
    })

})

