# AI Meeting Notes

AI-powered meeting intelligence platform that converts raw meeting notes or transcripts into structured, actionable outputs.

Built with Next.js, MongoDB, and Groq LLM API.

## Live Demo

https://enest-beryl.vercel.app/

## GitHub Repository

https://github.com/Mrkhiladi-star/enest


# Problem Statement

Teams often finish meetings with unstructured notes, unclear ownership, and missed deadlines.

This application solves that by transforming raw notes into:

- concise summaries
- action items
- owners
- deadlines
- priorities
- decisions
- open questions
- follow-up suggestions


# Core Features

## AI Processing

- Convert raw notes into structured JSON
- Generate 3–5 line smart summary
- Detect meeting category automatically
- Extract tasks with metadata

## Meeting Management

- Dashboard of all meetings
- Search meetings by title / summary / tag
- Open task count
- Overdue task visibility

## Task Actions

- Mark task as done
- Delete incorrect task

## Automation Features Implemented

### 1. Auto Tagging

Meetings classified into:

- Product
- Hiring
- Engineering
- Marketing
- Design
- General

### 2. Weekly Digest

Aggregates all open tasks from recent meetings and groups them by owner.

### 3. Shareable Public Link

Read-only meeting page for external stakeholders.


# Tech Stack

## Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS

## Backend

- Next.js API Routes
- Server Actions

## Database

- MongoDB Atlas
- Mongoose ODM

## AI Layer

- Groq API
- Llama 3.1 8B Instant

## Deployment

- Vercel


# System Architecture

User Input Notes  
↓  
Frontend Form (Next.js)  
↓  
API Route `/api/process`  
↓  
Groq LLM Processing  
↓  
Structured JSON Response  
↓  
MongoDB Storage  
↓  
Dashboard / Meeting Pages / Digest


# How AI Processing Works

Prompt engineering is used to instruct the model to return strict JSON with:

```json
{
  "summary": "",
  "tag": "",
  "actionItems": [],
  "decisions": [],
  "questions": [],
  "followups": []
}
```  


## Run Locally

npm install

npm run dev


## Environment Variables

MONGODB_URI=

GROQ_API_KEY=

NEXT_PUBLIC_URL=http://localhost:3000


## Author

Built by:
Ramu Yadav
B.Tech 3rd Year, Computer Science and Engineering
National Institute Of Technology Mizoram
Portfolio : https://mrkhiladi.vercel.app/
