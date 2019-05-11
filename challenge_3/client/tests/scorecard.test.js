import React from "react";
import { shallow, mount, render } from "enzyme";
import { expect } from "chai";
import "isomorphic-fetch";

import App from "../src/app.jsx";

describe("Scoring logic", () => {
  it("should move to next frame when getting a strike", () => {
    const wrapper = mount(<App />);
    wrapper.find("#key-10").simulate("click");
    expect(wrapper.state("bowls")).to.eql([[10, 0]]);
  });

  it("strikes should give a score equal to 10 plus the sum of the next 2 bowls", () => {
    const wrapper = mount(<App />);
    wrapper.find("#key-10").simulate("click");
    wrapper.find("#key-2").simulate("click");
    wrapper.find("#key-5").simulate("click");
    expect(wrapper.state("score")[0]).to.eql(17);
    wrapper.find("#key-10").simulate("click");
    wrapper.find("#key-10").simulate("click");
    wrapper.find("#key-10").simulate("click");
    expect(wrapper.state("score")[2]).to.eql(54);
  });

  it("when getting a strike, should only update score after 2 more bowls", () => {
    const wrapper = mount(<App />);
    wrapper.find("#key-10").simulate("click");
    expect(wrapper.state("score")).to.eql([]);
    wrapper.find("#key-10").simulate("click");
    expect(wrapper.state("score")).to.eql([]);
    wrapper.find("#key-10").simulate("click");
    expect(wrapper.state("score")).to.eql([30]);
    wrapper.find("#key-5").simulate("click");
    expect(wrapper.state("score")).to.eql([30, 55]);
    wrapper.find("#key-2").simulate("click");
    expect(wrapper.state("score")).to.eql([30, 55, 72, 79]);
  });

  it("spares should give a score equal to 10 plus the next bowl", () => {
    const wrapper = mount(<App />);
    wrapper.find("#key-2").simulate("click");
    wrapper.find("#key-8").simulate("click");
    wrapper.find("#key-5").simulate("click");
    expect(wrapper.state("score")).to.eql([15]);
    wrapper.find("#key-5").simulate("click");
    wrapper.find("#key-2").simulate("click");
    expect(wrapper.state("score")).to.eql([15, 27]);
  });

  it("when getting a spare, should only update score after 1 more bowl", () => {
    const wrapper = mount(<App />);
    wrapper.find("#key-2").simulate("click");
    expect(wrapper.state("score")).to.eql([]);
    wrapper.find("#key-8").simulate("click");
    expect(wrapper.state("score")).to.eql([]);
    wrapper.find("#key-5").simulate("click");
    expect(wrapper.state("score")).to.eql([15]);
  });

  it("should allow for 2 more bowls after getting a strike on the last frame and include it in the score", () => {
    const wrapper = mount(<App />);
    wrapper.find("#key-10").simulate("click");
    wrapper.find("#key-10").simulate("click");
    wrapper.find("#key-10").simulate("click");
    wrapper.find("#key-10").simulate("click");
    wrapper.find("#key-10").simulate("click");
    wrapper.find("#key-10").simulate("click");
    wrapper.find("#key-10").simulate("click");
    wrapper.find("#key-10").simulate("click");
    wrapper.find("#key-10").simulate("click");
    wrapper.find("#key-10").simulate("click");
    wrapper.find("#key-10").simulate("click");
    wrapper.find("#key-10").simulate("click");
    expect(wrapper.state("bowls")[9].length).to.equal(3);
  });

  it("should allow for 1 more bowl after getting a spare on the last frame and include it in the score", () => {
    const wrapper = mount(<App />);
    wrapper.find("#key-2").simulate("click");
    wrapper.find("#key-8").simulate("click");
    wrapper.find("#key-2").simulate("click");
    wrapper.find("#key-8").simulate("click");
    wrapper.find("#key-2").simulate("click");
    wrapper.find("#key-8").simulate("click");
    wrapper.find("#key-2").simulate("click");
    wrapper.find("#key-8").simulate("click");
    wrapper.find("#key-2").simulate("click");
    wrapper.find("#key-8").simulate("click");
    wrapper.find("#key-2").simulate("click");
    wrapper.find("#key-8").simulate("click");
    wrapper.find("#key-2").simulate("click");
    wrapper.find("#key-8").simulate("click");
    wrapper.find("#key-2").simulate("click");
    wrapper.find("#key-8").simulate("click");
    wrapper.find("#key-2").simulate("click");
    wrapper.find("#key-8").simulate("click");
    wrapper.find("#key-2").simulate("click");
    wrapper.find("#key-8").simulate("click");
    wrapper.find("#key-2").simulate("click");
    expect(wrapper.state("bowls")[9].length).to.equal(3);
  });
});
