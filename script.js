
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
