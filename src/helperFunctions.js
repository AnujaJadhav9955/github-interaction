

export function clearProfile() {
  const profile = document.getElementById("profile");
  profile.innerHTML = "";
}

export function showProfile(res) {
  const profile = document.getElementById("profile");
  profile.classList.remove("invisible");
  profile.classList.add("visible");
  profile.innerHTML = `
            <div class="grid grid-cols-6 grid-flow-row">
              <div class="lg:row-span-3 col-span-6 lg:pr-10 lg:col-span-2"> <img class="ring w-full " src="${
                res.owner.avatar_url
              }" alt=""></div>
              <div class="property-container">
                <div class="property"> Stars  ${res.stargazers_count}</div>
              </div>
              <div class="property-container">
              <div class="property"> Forks ${res.forks_count} </div>
             </div>
             <div class="property-container">
              <div class="property"> Populor  ${
                res.stargazers_count * 1 + res.forks_count * 2 >= 500
                  ? " 👍🏻"
                  : " 👎🏻"
              } </div>
              </div>
             <div class="name pb-20 lg:pb-0">Owner: ${res.owner.login}</div>
              <div class="name">Repository: ${res.name}</div>
            </div>
            `;
}

export function showAlert(msg) {
  const profile = document.getElementById("profile");
  profile.classList.remove("invisible");
  profile.classList.add("visible");
  profile.innerHTML = `<div class="flex-center text-font rounded-md bg-red-300 h-20 lg:h-10 w-full">${msg}</div>`;
}

export function validateInputFields(owner, repo) {
  const errorMessage = document.getElementById("errorMessage");
  let errors = [];

  if (owner?.value?.trim() == "") {
    errors.push("Please enter owner name!");
  }
  if (repo?.value?.trim() == "") {
    errors.push("Please enter repository name!");
  }
  if (errors.length > 0) {
    errorMessage.removeAttribute("hidden");
    errorMessage.innerHTML = errors.join(" ");
  }
  if (owner.value && repo.value) {
    errorMessage.setAttribute("visibility", "hidden");
    errors = [];
    errorMessage.innerHTML = "";
  }
}
