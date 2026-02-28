# Cloudflare AI Tech Interviewer 🚀

**Live Demo:** https://cf-ai-tech-interviewer-ui.pages.dev
**Backend API:** https://backend.antoniorfigueiras.workers.dev

## Overview
This project is an AI-powered technical interview simulator built for the Cloudflare Software Engineering Internship assignment. It acts as a senior engineer asking technical questions based on the candidate's applied role and evaluates their answers.

## Architecture
This application leverages the Cloudflare Developer Platform:
* **Frontend:** React.js (Vite) hosted on **Cloudflare Pages**.
* **Backend / Workflow:** A **Cloudflare Worker** that handles incoming requests, manages CORS, and acts as the orchestrator.
* **AI Model:** **Workers AI** using the `@cf/meta/llama-3.3-70b-instruct-fp8-fast` model to generate dynamic interview questions and evaluate responses via System Prompts.

## How to Run Locally

### Prerequisites
* Node.js installed
* Wrangler CLI installed (`npm install -g wrangler`)

### 1. Backend (Worker)
1. Navigate to the backend directory: `cd backend`
2. Run the local development server: `npx wrangler dev`
3. The API will be available at `http://localhost:8787`

### 2. Frontend (React UI)
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. In `src/App.jsx`, ensure the fetch URL points to your local backend (`http://localhost:8787`) or the deployed URL.
4. Run the development server: `npm run dev`
5. Open the local link provided (usually `http://localhost:5173`) in your browser.

## Prompts Used
AI-assisted coding was used to structure the project. All prompts are documented in the `PROMPTS.md` file.