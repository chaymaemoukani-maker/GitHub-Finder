
  const state = {
    currentUser: null,
    bookmarks: [],
    isViewingBookmarks: false
  };

  const searchInput = document.getElementById('search-box');
  const searchBtn = document.getElementById('btn-search');
  const userProfile = document.getElementById('userprofil');
  const reposList = document.getElementById('reposList');
  const welcomeState = document.getElementById('welcomeState');
  const loadingState = document.getElementById('loadingState');
  const errorState = document.getElementById('errorState');
  console.log({
  welcomeState,
  loadingState,
  errorState,
  userProfile,
  reposList
});


  showWelcome();

console.log(welcomeState);
console.log(loadingState);
console.log(userProfile);
console.log(errorState);
console.log(reposList);

async function fetchUser(username) {

  try {

    showLoading();

    const response = await fetch(`https://api.github.com/users/${username}`, {
       headers : {
        Authorization: `token ${env.Token}`
       }
    });
    if (response.status === 404) {
      throw new Error(`User "${username}" not found`);
    }if (response.status === 403) {
      throw new Error("API limit reached ❌");
    }

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    displayUserProfile(data); 
    fetchUserRepos(username);

  } catch (error) {

    showError(error.message);

  }
}
async function fetchUserRepos(username) {

  try {

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=stars&per_page=5`, 
      {
        headers : {
            Authorization: `token ${env.Token}`
       }
      }
    );

    if (!response.ok) {
      throw new Error("Error loading repos");
    }

    const repos = await response.json();

    displayRepositories(repos);

    loadingState.style.display = "none";

  } catch (error) {
    showError(error.message);
  }
}

function showLoading() {
  loadingState.style.display = "block";
  userProfile.style.display = "none";
  reposList.innerHTML = "";
  errorState.style.display = "none";
  welcomeState.style.display = "none"; 
}

function showError(message) {
  errorState.innerHTML = message;
  errorState.style.display = "block";
  loadingState.style.display = "none";
  userProfile.style.display = "none";
  reposList.innerHTML = "";
}

function showWelcome() {
  welcomeState.style.display = "block";
  userProfile.style.display = "none";
  reposList.innerHTML = "";
  errorState.style.display = "none";
  loadingState.style.display = "none"; 
}
function displayUserProfile(user) {
  userProfile.style.display = "flex";

  userProfile.innerHTML = `
    <img src="${user.avatar_url}" class="avatar">
    <div class="profile-info">
      <h2>${user.name || "No Name"}</h2>
      <p class="username">@${user.login}</p>
      <p class="bio">${user.bio || "No bio available"}</p>

      <div class="stats">
        <div>
          <p>Followers</p>
          <strong>${user.followers}</strong>
        </div>
        <div>
          <p>Following</p>
          <strong>${user.following}</strong>
        </div>
        <div>
          <p>Public Repos</p>
          <strong>${user.public_repos}</strong>
        </div>
      </div>

      <a href="${user.html_url}" target="_blank">
        Visit GitHub Profile →
      </a>
    </div>
  `;
}
