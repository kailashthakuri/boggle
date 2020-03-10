import React from "react";
import {WordGameUtils} from "../WordGameUtils";

describe("Test WordGameUtils Class Test", () => {
    it("should generate 4 by 4 metric word model", () => {
        const models = WordGameUtils.prepareWords(4, 4);
        expect(models.length).toEqual(4);
        models.forEach(model => {
            expect(model.length).toEqual(4);
        })
    })
})