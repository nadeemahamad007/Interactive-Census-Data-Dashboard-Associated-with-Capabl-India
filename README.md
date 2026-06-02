# Interactive Census Data Dashboard

An interactive full-stack census dashboard built during the Capabl Summer Internship to explore state and district demographics, population age groups, and literacy insights through dynamic visualizations.

![HTML5](https://img.shields.io/badge/HTML5-Frontend-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Styling-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Interactive-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![D3.js](https://img.shields.io/badge/D3.js-Data%20Visualization-F28E2B?style=for-the-badge&logo=d3.js&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-API-000000?style=for-the-badge&logo=express&logoColor=white)
![GitHub Ready](https://img.shields.io/badge/GitHub-Ready-1F6FEB?style=for-the-badge&logo=github&logoColor=white)

## Overview

This project combines a simple Express backend with a dashboard-style frontend for exploring sample census data. Users can select a state and district, view quick summary metrics, and analyze age-group population distribution in a visual format.

## Key Features

- Dashboard layout with a modern responsive interface
- State and district filters for data exploration
- KPI cards for selected location, total population, and literacy rate
- Population by age-group bar chart using D3.js
- District insight panel with quick observations
- Sample multi-district dataset for Maharashtra and Karnataka

## Tech Stack

- HTML5
- CSS3
- JavaScript
- D3.js
- Axios
- Node.js
- Express.js

## Project Structure

```text
Project Cencus/
|-- backend/
|   |-- index.js
|   |-- package.json
|   `-- Procfile
|-- docs/
|   `-- certificate.pdf
|-- frontend/
|   |-- app.js
|   |-- index.html
|   `-- styles.css
`-- README.md
```

## How It Works

1. The frontend loads the list of states from the backend API.
2. After a state is selected, the corresponding districts are fetched dynamically.
3. When a district is selected, the dashboard updates its metrics, insights, and chart.
4. D3.js renders the population age-group visualization for the chosen district.

## Local Setup

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Start the backend server

```bash
npm start
```

The backend runs at `http://localhost:3000`.

### 3. Open the frontend

Open `frontend/index.html` in your browser.

## API Endpoints

- `GET /api/states`
- `GET /api/districts?stateCode=MH`
- `GET /api/census?districtCode=PUN`

## Sample Data

The current project includes sample dashboard data for:

- Maharashtra
- Karnataka
- Pune
- Mumbai
- Bangalore

## Internship Context

This repository contains the internship project completed under Capabl India for building an interactive census data dashboard.

The participation certificate is available at `docs/certificate.pdf`.

## Possible Enhancements

- Add more states and districts from a real census dataset
- Add pie charts, trend charts, and comparison views
- Integrate a database instead of static in-memory data
- Deploy the frontend and backend online
- Add search, export, and advanced dashboard filters

## Author

Nadeem Ahamad

Prepared as a Data Science Internship Project and refined for GitHub portfolio presentation.
