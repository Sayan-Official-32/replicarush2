Features
Authentication: Email-based login and secure auth flow handled via Supabase authentication.​

Live demo video: Embedded demo video in the README so visitors can quickly see the app in action.​

Working “Get in touch”: Contact form validates inputs, saves messages into a contacts table in Supabase, and triggers an email notification so you can reply.​

Modern UI: React, Vite, Tailwind CSS, and utility classes like glass, text-gradient, and motion-based animations for sections and buttons.​

Responsive layout: Fully responsive sections (hero, features, contact) optimized for desktop and mobile.​

Demo
Live Demo: link

Video Demo:

text
[![Replicarush 2 Demo](public/demo/replicarush-demo.gif)](public/demo/replicarush-demo.mp4)
Place replicarush-demo.gif and replicarush-demo.mp4 under public/demo/ and adjust the paths if needed.​

Tech Stack
Frontend: React, TypeScript, Vite, Tailwind CSS, framer-motion, lucide-react, shadcn-style UI primitives.​

Backend: Supabase (PostgreSQL, Auth, Edge Functions).​

Validation: zod for schema validation of contact form data.​

Email / Contact: Supabase functions for sending email notifications from contact submissions.​

Project Structure
src/pages – Top-level pages (hero, sections, contact page wrappers).​

src/components – Reusable UI blocks (navigation, feature cards, ContactForm, etc.).​

src/integrations/supabase – Supabase client and integration helpers.​

src/context / src/hooks – Shared state and custom hooks used across sections.​

Authentication
Supabase auth handles sign-up, login, and session management.​

Environment variables store Supabase URL and anon key, loaded in the frontend via Vite.​

Protected logic uses the Supabase client to check current user/session before performing sensitive operations.​

Contact / Get in Touch
The contact form uses a ContactForm component with name, email, and message fields validated by zod.​

On submit, valid data is inserted into the contacts table in Supabase and then an Edge Function (for example contact-email) sends an email notification to your inbox.​

The UI shows inline validation errors, a loading state (“Sending…”), and a success state (“Sent!”) with toast notifications.​

Getting Started
Clone the repo and install dependencies:

bash
git clone https://github.com/Sayan-Official-32/replicarush2.git
cd replicarush2
npm install
Configure environment variables in a .env file for Supabase URL and anon key.​

Start the dev server:

bash
npm run dev