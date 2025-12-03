📋 project-1-website-CadeAnthonyKrueger

A unified React/Vite application supporting Apollo MedFlight’s communication center operations.

🚀 Overview

This application serves as a unified hub for Apollo MedFlight’s communication center, giving staff a streamlined and centralized way to manage the entire shift-brief lifecycle. It brings everything into one place so teams can stay aligned, maintain continuity between rotations, and access important information without navigating through scattered tools, outdated spreadsheets, or handwritten notes.

🛠️ Tech Stack

Frontend

React 19

Vite 7

TypeScript

Sass (SCSS Modules)

React Router DOM 7

Zustand (state management)

React DatePicker

React Tooltip

Tooling

ESLint

TypeScript ESLint

Vite React Plugin

📦 Project Setup
1. Clone the repository
git clone https://github.com/CadeAnthonyKrueger/project-1-website-CadeAnthonyKrueger.git

2. Navigate into the client folder

This project uses a dedicated React/Vite client directory.

cd project-1-website-CadeAnthonyKrueger/client

3. Install dependencies
npm install

4. Start the development server
npm run dev


The app will launch on a local Vite dev server, typically:

http://localhost:5173/

🧱 Project Scripts
Script	Description
npm run dev	Starts Vite dev server
npm run build	Builds TypeScript + production bundle
npm run preview	Serves built version for testing
npm run lint	Runs ESLint on the codebase
🗂️ Folder Structure (Client)
client/
│
├── src/
│   ├── components/
│   ├── views/
│   ├── stores/           # Zustand stores (shift brief, QA/QI, etc.)
│   ├── styles/           # SCSS modules / global style sheets
│   ├── router/           # React Router config
│   └── main.tsx          # App entry point
│
├── public/
│
├── package.json
├── tsconfig.json
└── vite.config.ts

🔧 Environment Variables

None required at this time.

(If you add SQLite, an API layer, or auth later, this section will be updated.)

📸 Screenshots (Optional)

You can add UI screenshots here.
Example:

![Shift Brief UI](./screenshots/shift-brief.png)

🤝 Contributing

Fork the repo

Create a new branch

Commit your changes

Push and submit a PR

📄 License

This project is for educational use under WTAMU GitHub Classroom unless you choose to extend licensing.