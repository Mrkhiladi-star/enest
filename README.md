# AI Meeting Notes
AI-powered meeting notes application built using Next.js, MongoDB, and Groq LLM.

## Features

- Paste raw meeting notes
- AI converts notes into structured output
- Auto summary generation
- Action items extraction
- Owner / deadline / priority detection
- Decisions & questions detection
- Follow-up suggestions
- Dashboard with all meetings
- Search meetings
- Weekly digest by owner
- Public shareable meeting links
- Mark tasks done
- Delete tasks
- Mobile responsive navbar

## Tech Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- MongoDB
- Mongoose
- Groq API (Llama 3.1)

## How AI Works

Raw meeting notes are sent to Groq LLM.

The model extracts:

- Summary
- Category Tag
- Action Items
- Owners
- Deadlines
- Priorities
- Decisions
- Questions
- Follow-ups

Structured JSON is stored in MongoDB.



## Why These Automation Features

Implemented:

### 1. Auto Tagging

Automatically classifies meetings into:

- Product
- Hiring
- Marketing
- Engineering
- General

### 2. Weekly Digest

Combines all open tasks grouped by owner for quick review.

### 3. Shareable Link

Public read-only page for external sharing.

---

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