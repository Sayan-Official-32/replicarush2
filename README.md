🚀 ReplicaRush

ReplicaRush is a modern, responsive web application built using React + Vite and powered by Supabase for authentication, database, and serverless functions.
It features a clean UI, secure authentication flow, and a fully functional “Get in Touch” system with email notifications.

🌟 Features
🔐 Authentication

Email-based login and signup

Secure authentication handled via Supabase Auth

Session management using Supabase client

Protected logic checks current user/session before sensitive operations

🎥 Live Demo

Live Demo: (Add your deployed link here)

Video Demo: Embedded demo video for quick preview

📁 Demo Assets

public/demo/
├── replicarush-demo.gif
└── replicarush-demo.mp4


Adjust paths in the README if needed.

📬 Get in Touch (Contact System)

Working contact form with:

Name

Email

Message

Validation using zod

On submit:

Data is stored in Supabase PostgreSQL

An Edge Function sends an email notification

UI states:

Inline validation errors

Loading state (“Sending…”)

Success state (“Sent!”)

Toast notifications

🎨 Modern UI & UX

React + TypeScript + Vite

Tailwind CSS utility-first styling

UI features:

Glassmorphism effects

Gradient text

Motion-based animations

Animations using framer-motion

Icons from lucide-react

shadcn-style UI primitives

📱 Responsive Layout

Fully responsive design

Optimized for:

Desktop

Tablet

Mobile

Sections included:

Hero

Features

Contact

🛠 Tech Stack
Frontend

React

TypeScript

Vite

Tailwind CSS

framer-motion

lucide-react

shadcn-style UI components

Backend

Supabase

PostgreSQL

Authentication

Edge Functions

Validation & Utilities

zod – schema validation

Supabase client SDK

📁 Project Structure
src/
├── pages/                 # Top-level pages & section wrappers
│   ├── Hero
│   ├── Features
│   └── Contact
│
├── components/            # Reusable UI components
│   ├── Navbar
│   ├── FeatureCard
│   ├── ContactForm
│   └── ...
│
├── integrations/
│   └── supabase/          # Supabase client & helpers
│
├── context/               # Global state providers
├── hooks/                 # Custom hooks
└── ...

🔑 Environment Variables

Create a .env file in the project root:

VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key


⚠️ Notes:

Variables must start with VITE_

Do NOT commit .env to GitHub

▶️ How to Run This Project Locally
✅ Prerequisites

Make sure you have:

Node.js (v18 or later recommended)

npm

A Supabase account

Check Node version:

node -v

1️⃣ Clone the Repository
git clone https://github.com/Sayan-Official-32/replicarush2.git
cd replicarush2

2️⃣ Install Dependencies
npm install

3️⃣ Setup Supabase

Go to https://supabase.com

Create a new project

Copy:

Project URL

Anon Public Key

4️⃣ Setup Database (Contact Form)

In Supabase → SQL Editor, run:

create table contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default now()
);


Enable Row Level Security (RLS)

Add a policy allowing INSERT

5️⃣ Email Notifications

Create a Supabase Edge Function (e.g. contact-email)

Trigger it after inserting into contacts

Sends email notification to your inbox

(Optional but recommended)

6️⃣ Start Development Server
npm run dev


You’ll see:

Local: http://localhost:8080/


Open the URL in your browser 🎉

🧪 Production Build (Optional)
npm run build


Preview the production build:

npm run preview
