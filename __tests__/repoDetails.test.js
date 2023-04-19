/**
 * @jest-environment jsdom
 */

import {
  validateInputFields,
  showAlert,
  showProfile,
  clearProfile,
} from "../src/helperFunctions.js";
import data from "./mockResponse.json";
const $ = require("jquery");

describe("some tests", () => {
  it("Check If profile is cleared", () => {
    document.body.innerHTML = `
        <div id="profile"><div></div></div>
      `;
    clearProfile();
    expect(profile.innerHTML).toEqual("");
  });
  it("Check If API is called", () => {
    const owner = {
      value: "AnujaJadhav9955",
    };
    const repo = {
      value: "fashion-store",
    };
    document.body.innerHTML = `
        <button id="searchBtn"></button>
      `;

    $("#searchBtn").on("click", async () => {
      expect($("#searchBtn").addEventListener).toBeCalledWith("clck");
      await expect(
        `https://api.github.com/repos/${owner.value}/${repo.value}`
      ).resolves.toEqual(data);
    });
  });

  it("Check If validateInputFields called properly with no error", () => {
    document.body.innerHTML = `
        <div id="errorMessage" hidden></div>
      `;
    const owner = {
      value: "AnujaJadhav9955",
    };
    const repo = {
      value: "fashion-store",
    };
    validateInputFields(owner, repo);

    expect(errorMessage.innerHTML).toEqual("");
  });

  it("Check If validateInputFields called properly with error when owner is not specified", () => {
    document.body.innerHTML = `
        <div id="errorMessage" hidden></div>
         `;
    const owner = {
      value: "",
    };
    const repo = {
      value: "fashion-store",
    };
    validateInputFields(owner, repo);
    expect(errorMessage.innerHTML).toEqual("Please enter owner name!");
  });

  it("Check If validateInputFields called properly with error when owner and repo name not specified", () => {
    document.body.innerHTML = `
        <div id="errorMessage" class="text-red-500" hidden></div>
         `;
    const owner = {
      value: "",
    };
    const repo = {
      value: "",
    };
    validateInputFields(owner, repo);
    expect(errorMessage.innerHTML).toEqual(
      "Please enter owner name! Please enter repository name!"
    );
  });

  it("Check If showAlert called properly", () => {
    document.body.innerHTML = `
        <div id="profile" class="invisible box"></div>
      `;

    expect(profile.classList.contains("invisible")).toBe(true);
    showAlert("Repository Not Found");
    expect(profile.classList.contains("invisible")).toBe(false);
    expect(profile.classList.contains("visible")).toBe(true);
  });

  it("Check If showProfile called properly", () => {
    document.body.innerHTML = `
        <div id="profile" class="invisible box"></div>
      `;
    const data = {
      owner: {
        avatar_url: "",
        login: "AnujaJadhav9955",
      },
      stargazers_count: 1,
      forks_count: 1,
      name: "fashion-store",
    };
    expect(profile.classList.contains("invisible")).toBe(true);
    showProfile(data);
    expect(profile.classList.contains("invisible")).toBe(false);
    expect(profile.classList.contains("visible")).toBe(true);
  });
});
