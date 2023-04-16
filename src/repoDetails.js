import { Octokit } from "https://cdn.skypack.dev/octokit";

const searchBtn = document.getElementById("searchBtn");
const profile = document.getElementById("profile");

searchBtn.addEventListener("click", (e) => {
  const octokit = new Octokit({
    auth: "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",
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
          showAlert("Repository Not Found", "alert alert-danger");
        }
        console.log(e.message);
      }
    })();
  } else {
    //clear profile
    clearProfile();
  }
});

function showProfile(res) {
  profile.classList.remove("invisible");
  profile.classList.add("visible");
  profile.innerHTML = `
          <div class="grid grid-cols-6 grid-flow-row">
            <div  class="row-span-3 col-span-2"> <img class="ring object-contain h-48 w-48" src="${
              res.owner.avatar_url
            }" alt=""></div>
            <div class="col-span-1">
              <div class=" flex items-center justify-center rounded-xl h-10  w-40 shadow-xs bg-gradient-to-r from-green-400 to-blue-500"> Stars  ${
                res.stargazers_count
              }</div>
            </div>
            <div class="col-span-1">
            <div class="flex items-center justify-center rounded-xl h-10  w-40 shadow-xs bg-gradient-to-r from-green-400 to-blue-500"> Forks ${
              res.forks_count
            } </div>
           </div>
          <div class="col-span-1">
          <div class="flex items-center justify-center rounded-xl h-10  w-40 shadow-xs bg-gradient-to-r from-green-400 to-blue-500"> Populor ${
            res.stargazers_count * 1 + res.forks_count * 2 >= 500
          } </div>
          </div>
            <div class="col-span-4">Name: ${res.owner.login}</div>
            <div class="col-span-4">Repository: ${res.name}</div>
          </div>
          `;
}

function clearProfile() {
  profile.innerHTML = "";
}
function showAlert(msg, cls) {
    profile.classList.remove("invisible");
    profile.classList.add("visible");
    profile.innerHTML = `<div class="">${msg}</div>`;
}
