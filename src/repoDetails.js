import { Octokit }  from "https://cdn.skypack.dev/@octokit/rest";

import {
  clearProfile,
  showProfile,
  showAlert,
  validateInputFields,
} from "./helperFunctions.js";
import config from "../config.js";

const searchBtn = document.getElementById("searchBtn");

  searchBtn.addEventListener("click", (e) => {
    const octokit = new Octokit({
      auth: config.auth,
      userAgent: "myApp v1.2.3",
      baseUrl: "https://api.github.com",
      previews: ["jean-grey", "symmetra"],
      log: {
        debug: () => {},
        info: () => {},
        warn: console.warn,
        error: console.error,
      },
   });

    const owner = document.getElementById("searchUser");
    const repo = document.getElementById("searchRepo");
    validateInputFields(owner, repo);
    if (owner.value !== "" && repo.value !== "") {
      (async () => {
        try {
          const { data } = await octokit.request("GET /repos/{owner}/{repo}", {
            owner: owner.value,
            repo: repo.value,
          });
          showProfile(data);
        } catch (e) {
          if (e.message == "Not Found") {
            showAlert("Repository Not Found");
          }
          console.log(e.message);
        }
      })();
    } else {
      //clear profile
      clearProfile();
    }
  });
