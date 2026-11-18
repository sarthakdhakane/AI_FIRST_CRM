# 🚀 AI-First CRM – HCP Interaction Management

An AI-powered Customer Relationship Management (CRM) application designed for **Healthcare Professional (HCP) interaction management**. The application enables pharmaceutical sales representatives to log HCP interactions using **natural language** through an AI assistant or by reviewing a structured interaction form.

The project leverages **LangGraph**, **Groq LLM**, **FastAPI**, **React**, **Redux**, and **PostgreSQL** to provide an intelligent CRM workflow.

---

# 📌 Project Overview

Traditional CRM systems require users to manually enter interaction details after meeting healthcare professionals. This project introduces an **AI-first workflow** where users simply describe their interaction in natural language.

The AI agent:

- Detects the user's intent
- Extracts structured information
- Updates the CRM form automatically
- Stores interaction history
- Generates summaries
- Suggests intelligent follow-up actions

---

# ✨ Features

## AI-Powered Interaction Logging

- Log HCP interactions using conversational language.
- Automatic extraction of:
  - HCP Name
  - Interaction Type
  - Date
  - Time
  - Attendees
  - Topics Discussed
  - Voice Summary
  - Materials Shared
  - Samples Distributed
  - Sentiment
  - Outcomes
  - Follow-up Actions

---

## AI Chat Assistant

Users can interact with the CRM naturally through chat.

Example:

> Today I met Dr Amit Sharma. We discussed CardioX. I shared two brochures. The doctor showed positive interest.

The AI automatically fills the interaction form.

---

## Edit Interaction Tool

Modify any field using natural language.

Example:

> Actually the doctor's name is Dr Amit Kumar Sharma.

The AI updates only the requested field.

---

## Search Previous Interactions

Retrieve historical interactions with any HCP stored in PostgreSQL.

Example:

> Show previous interactions with Dr Amit Sharma.

---

## AI Interaction Summary

Generate concise summaries of the current interaction.

Example:

> Summarize today's interaction.

---

## AI Follow-up Recommendations

Generate intelligent follow-up actions.

Example:

> Suggest follow-up actions.

---

# 🛠️ LangGraph Agent

The application uses **LangGraph** to orchestrate multiple AI tools.

The agent performs:

- Intent Classification
- Tool Selection
- Memory Management
- Response Generation

---

# 🔧 LangGraph Tools

## 1. Log Interaction

Purpose:

Extract structured interaction details from natural language.

Example:

```
Today I met Dr Rahul Sharma.
We discussed CardioX.
```

---

## 2. Edit Interaction

Updates existing interaction details.

Example:

```
Actually the doctor's name is Dr Amit Sharma.
```

---

## 3. Search HCP

Retrieves previous interactions stored in PostgreSQL.

Example:

```
Show previous interactions with Dr Rahul Sharma.
```

---

## 4. Summarize Interaction

Generates a concise AI summary.

---

## 5. Suggest Follow-up

Provides AI-generated follow-up recommendations.

---

# 🏗️ System Architecture

```
                    React Frontend
                           │
                           │ REST API
                           ▼
                    FastAPI Backend
                           │
                           ▼
                    LangGraph Agent
                           │
        ┌──────────┬──────────┬──────────┐
        │          │          │          │
        ▼          ▼          ▼          ▼
    Log Tool   Edit Tool  Search Tool Summary Tool
                           │
                           ▼
                    Follow-up Tool
                           │
                           ▼
                        Groq LLM
                           │
                           ▼
                    PostgreSQL Database
```

---

# 💻 Tech Stack

## Frontend

- React
- Redux Toolkit
- Tailwind CSS
- Axios

## Backend

- Python
- FastAPI
- SQLAlchemy
- LangGraph

## AI

- Groq
- Gemma2-9B-IT
- LangChain

## Database

- PostgreSQL

---

# 📂 Project Structure

```
AI-First-CRM
│
├── backend
│   ├── app
│   │   ├── agent
│   │   ├── api
│   │   ├── database
│   │   ├── models
│   │   ├── repositories
│   │   ├── services
│   │   └── schemas
│   │
│   ├── requirements.txt
│   └── .env.example
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── redux
│   │   ├── services
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/dhakanegovind/AI-First-CRM.git

cd AI-First-CRM
```

---

# Backend Setup

```bash
cd backend

python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create `.env`

```
GROQ_API_KEY=YOUR_GROQ_API_KEY
DATABASE_URL=postgresql://postgres:password@localhost:5432/ai_first_crm
```

Run backend

```bash
python -m uvicorn app.main:app --reload
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Application

```
Frontend:
http://localhost:5173

Backend:
http://127.0.0.1:8000
```

---

# Example Workflow

### Step 1

```
Today I met Dr Rahul Sharma.

We discussed CardioX.

I shared two brochures.

The doctor showed positive interest.
```

↓

AI extracts interaction details automatically.

---

### Step 2

```
Actually the doctor's name is Dr Amit Sharma.
```

↓

Interaction is updated.

---

### Step 3

```
Summarize today's interaction.
```

↓

AI generates summary.

---

### Step 4

```
Suggest follow-up actions.
```

↓

AI recommends follow-up activities.

---

### Step 5

```
Show previous interactions with Dr Amit Sharma.
```

↓

Previous interaction history is displayed.

---

# Future Enhancements

- Voice-to-text interaction logging
- File and PDF attachment support
- Calendar integration for follow-up meetings
- Email automation
- Multi-user authentication
- Analytics dashboard
- HCP visit history visualization

---

# Author

**Govind Dhakane**

B.Tech Computer Engineering

MES Wadia College of Engineering, Pune

GitHub: https://github.com/dhakanegovind

---

# Acknowledgements

This project was developed as part of the **AI-First CRM HCP Module Technical Assignment**, demonstrating the use of **LangGraph**, **Groq LLM**, **FastAPI**, **React**, and **PostgreSQL** to build an AI-powered CRM for healthcare sales representatives.
