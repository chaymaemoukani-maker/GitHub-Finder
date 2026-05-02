## Description : 
**GitHub Finder is a web application that allows users to search for any GitHub username and display real-time profile information and repositories using the GitHub REST API.**

### 🚀 Features 
1. 🔍 Search GitHub users by username
2. 👤 Display user profile (avatar, name, bio, followers, following, repos)
3. 📁 Show top repositories sorted by stars
4. ⚡ Real-time data using GitHub API
5. ⏳ Loading, error, and welcome states
6. ⭐ Bookmark favorite users (stored in LocalStorage)
7. 📱 Responsive and modern UI


### 🛠️ Technologies Used 
- HTML5
- CSS3 (modern UI with animations)
- JavaScript 
- GitHub REST API
- LocalStorage
### 🔗 API Used
#### Get user info:
```https://api.github.com/users/{username}```
#### Get repositories:
``` https://api.github.com/users/{username}/repos?sort=stars&per_page=5 ```
### 📦 Project Structure
```bash
├── index.html
├── style.css
├── script.js
├── config.js
└── README.md
```
### ⚙️ How it works 
```
User enters a GitHub username
App sends request to GitHub API
Profile data is fetched and displayed
Repositories are loaded and shown
User can bookmark profiles for later
```

