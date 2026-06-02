# Interactive Census Data Dashboard

An internship project that presents census data through an interactive dashboard for exploring states, districts, population age groups, and literacy insights.

## Overview

This project is split into two parts:

- `backend/`: A Node.js + Express API that serves sample census data.
- `frontend/`: A lightweight HTML, CSS, and JavaScript dashboard that consumes the API and visualizes population data with D3.js.

## Features

- State-wise and district-wise selection
- Census data fetched dynamically from an API
- Bar chart visualization using D3.js
- Simple full-stack structure for learning data dashboard development

## Tech Stack

- Node.js
- Express.js
- HTML5
- CSS3
- JavaScript
- Axios
- D3.js

## Project Structure

```text
Project Cencus/
├── backend/
│   ├── index.js
│   ├── package.json
│   └── Procfile
├── frontend/
│   ├── app.js
│   ├── index.html
│   └── styles.css
└── README.md
```

## How To Run

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Start the backend server

```bash
npm start
```

The API runs by default at `http://localhost:3000`.

### 3. Open the frontend

Open `frontend/index.html` in your browser.

## API Endpoints

- `GET /api/states`
- `GET /api/districts?stateCode=MH`
- `GET /api/census?districtCode=PUN`

## Sample Data Included

The current sample dataset includes:

- Maharashtra
- Karnataka
- Pune
- Mumbai
- Bangalore

## Internship Context

This repository contains the work completed for the Capabl Summer Internship project on an Interactive Census Data Dashboard.

The participation certificate is included at `docs/certificate.pdf`.

## Future Improvements

- Add more states and districts
- Use real census datasets from official sources
- Add more chart types and filters
- Improve responsiveness and dashboard styling
- Deploy the frontend and backend online

## Author

Nadeem Ahamad
