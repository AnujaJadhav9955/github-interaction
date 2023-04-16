import { Octokit } from "https://cdn.skypack.dev/octokit";

const searchBtn = document.getElementById("searchBtn");
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
  (async () => {
    try {
      const { data } = await octokit.request("GET /repos/{owner}/{repo}", {
        owner: owner.value,
        repo: repo.value,
      });
      console.log(data);
    } catch (e) {
      console.log(e.message);
    }
  })();
});
