import React from "react";
import {shallow, ShallowWrapper} from "enzyme";
import StatusWrapper from "../StatusWrapper";
import {DataStatus, Status} from "../../utils/AppData";

describe("Test StatusWrapper Component", () => {
    let wrapper: ShallowWrapper;
    let props: any;
    beforeEach(() => {
        props = {
            status: null
        }
        wrapper = shallow(<StatusWrapper {...props}>
            <div className="data"></div>
        </StatusWrapper>);
    });

    it("should show data when status is in LoadedState or Null", () => {
        const status: Status = {status: DataStatus.Loaded};
        wrapper.setProps(status);
        expect(wrapper.exists("div.data")).toBe(true);
        expect(wrapper.exists(".error")).toBe(false);
        expect(wrapper.exists(".spinner-border")).toBe(false);
    })
    it("should show error when status is in ErrorState", () => {
        props.status = {status: DataStatus.ErrorState};
        wrapper.setProps(props);
        expect(wrapper.find(".error").length).toEqual(1);
        expect(wrapper.exists("div.data")).toBe(false);
    })
    it("should show loading when status is in LoadingState", () => {
        props.status = {status: DataStatus.Loading};
        wrapper.setProps(props);
        expect(wrapper.find(".spinner-border").length).toEqual(1);
        expect(wrapper.exists("div.data")).toBe(false);
    })

})
