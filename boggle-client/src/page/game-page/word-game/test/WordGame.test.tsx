import React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import {WordGame} from "../WordGame";
import {WordModel} from "../WordGameContants";

const wordModels: WordModel[][] = [
    [{row: 0, column: 0, char: "A"}, {row: 0, column: 1, char: "B"},
        {row: 0, column: 2, char: "C"}, {row: 0, column: 3, char: "D"}],
    [{row: 1, column: 0, char: "E"}, {row: 1, column: 1, char: "F"},
        {row: 1, column: 2, char: "G"}, {row: 1, column: 3, char: "H"}],
    [{row: 2, column: 0, char: "I"}, {row: 2, column: 1, char: "J"},
        {row: 2, column: 2, char: "K"}, {row: 2, column: 3, char: "L"}],
    [{row: 3, column: 0, char: "M"}, {row: 3, column: 1, char: "N"},
        {row: 3, column: 2, char: "O"}, {row: 3, column: 3, char: "P"}]
];
/*
this will be the position  of words.
    A  B  C  D
    E  F  G  H
    I  J  K  L
    M  N  O  P
*/

const makeInputChangeAndSubmitForm = (wrapper: ShallowWrapper, inputText: string) => {
    const inputField = wrapper.find("input");
    inputField.simulate("change", {target: {value: inputText}})
    wrapper.find("form").simulate("submit", {
        preventDefault: () => {
        }
    })
}


describe("Test WordGame Class Component", () => {
    let wrapper: ShallowWrapper;
    let props: any;
    beforeEach(() => {
        props = {
            match: {params: {metricId: '4by4'}},
            validWordPointModels: [],
            wordPointModel: null,
            status: null,
            setValidWordPoint: jest.fn(),
            setWordPoint: jest.fn(),
            tryValidateWord: jest.fn(),
            resetState: jest.fn(),
        }
        wrapper = shallow(<WordGame {...props}></WordGame>);
        wrapper.setState({wordModels: wordModels});
    });
    it("should show the entered words in input field", () => {
        wrapper.debug();
        let inputField = wrapper.find("input");
        inputField.simulate("change", {
            target: {value: "Hello"}
        })
        inputField = wrapper.find("input");
        expect(inputField.getElement().props.value).toEqual("Hello");
    })
    it("should dispatch the action that causes api call for backend verification after word has been validated in frontend", () => {
        makeInputChangeAndSubmitForm(wrapper, "ABCD");
        expect(props.tryValidateWord).toHaveBeenCalledWith("ABCD");
        expect(props.tryValidateWord.mock.calls.length).toBe(1);
    })
    it("should show the error message when word length is less than 3", () => {
        makeInputChangeAndSubmitForm(wrapper, "A");
        const errorMessage = wrapper.find(".error").text();
        expect(errorMessage).toContain("Word length must be greater than 2.");
    })
    it("should show the error message when word already exist", () => {
        props.validWordPointModels = [{word: 'Test', point: 1}];
        wrapper.setProps(props);
        makeInputChangeAndSubmitForm(wrapper, "Test");
        const errorMessage = wrapper.find(".error").text();
        expect(errorMessage).toContain("Word already exist.");
    })
    it("should show board and submit form when timeout is false and find score in true", () => {
        wrapper.setState({timeout: false});
        expect(wrapper.find("Board").length).toEqual(1);
        expect(wrapper.find("#word-submit").length).toEqual(1);
        wrapper.setState({timeout: true});
        expect(wrapper.exists("FinalScoreTable")).toBe(true);
    })
})
