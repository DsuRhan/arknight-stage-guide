# Arknight Stage Guide

A simple **frontend web project** to display and explore Arknights stage data.  
Built as part of the **Month 2 Evaluation Project**.

## 🚀 Live Demo
[arknight-stage-guide.vercel.app](https://arknight-stage-guide.vercel.app)

## 📂 Project Structure
project-name/
├─ index.html
├─ detail.html
├─ assets/
│ ├─ css/
│ └─ img/
├─ src/
│ ├─ main.js
│ ├─ modules/
│ │ ├─ api.js
│ │ ├─ ui.js
│ │ ├─ storage.js
│ │ └─ utils.js
└─ README.md

## ✨ Features
- Fetch stage data from [Penguin Stats API](https://penguin-stats.io).
- **Async/await** for all API calls with error handling.
- Dynamic UI rendering with JavaScript DOM manipulation.
- **localStorage & sessionStorage** to cache data and preferences.
- Modular code with ES Modules (`import/export`).
- Two pages:
  - `index.html` → stage list
  - `detail.html` → stage detail view

## 🛠️ Tech Stack
- HTML5 + CSS3
- JavaScript (ES Modules)
- Web Fetch API
- Vercel (deployment)

## 📊 Learning Outcomes
- Applying `fetch` with async/await
- Error handling with try/catch
- Data parsing with JSON
- Array methods (`map`, `filter`, `reduce`)
- Modularization and clean folder structure
- Basic UI/UX design

## 🔮 Future Improvements
- Add search & filter features
- Loading/skeleton UI
- Offline caching
- More detailed stage info & images

---
Made with 💻 for learning purposes.
