# Tejas Phutane - Senior Robotics Engineer Portfolio

[![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?style=flat&logo=vercel)](https://vercel.com/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/tejas-phutane)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/TejasPhutane)

## Overview

This is a modern, professional portfolio website showcasing the work and expertise of Tejas Phutane, a Senior Robotics Engineer specializing in autonomous waste management systems. Built with **Next.js (App Router)** and **TypeScript**, the site highlights his technical skills, professional experience, key projects, and robotic systems development.

It features custom-crafted interactive React components, dynamic states, scroll-active navigation, an asynchronous image perception search API (Tavily), and custom email contact routing.

---

## Key Features

- **Local Portfolio Studio (`/studio`)**: Private no-code visual dashboard for editing projects, career experience, services, bio, AI Twin memory, and uploading project images directly in your browser.
- **AI Digital Twin Assistant**: Grounded conversational AI powered by OpenRouter `openai/gpt-oss-120b` with multi-turn tool calling and lead capture.
- **Next.js App Router**: Built with a modern, file-based routing architecture with static prerendering.
- **Dynamic React States**: Interactive project details, modal popups, and category expansion states.
- **Responsive Navigation**: Smooth scrolling navigation with automatic active-section highlighting.
- **Project Metrics Grid**: Project cards featuring success rates, computational metrics, and hardware stacks.
- **Technical Skills Matrix**: Comprehensive skills categorization spanning Robotics & Control, Computer Vision & AI, Programming, and Deployments.
- **Contact API Handler**: Clean contact form forwarding emails via Next.js Route Handler and the Resend API.
- **Accessibility & Custom 404**: Clean keyboard accessibility support and a customized dark-mode 404 error page.

---

## 🎨 Local Portfolio Studio (No-Code Editing)

You can manage all portfolio content, images, and AI memory visually without editing code:

1. **Start the local development server:**
   ```bash
   npm run dev
   ```
2. **Open the Studio in your browser:**
   ```
   http://localhost:3000/studio
   ```
3. **Features:**
   - 📂 **Projects:** Add new projects, edit deep-dive problem/approach formulations, and upload project images directly to `public/images/`.
   - 💼 **Experience:** Add/edit career positions, metrics, and skill tags.
   - ⚡ **Services:** Add/edit consulting offerings and select Lucide icons.
   - 📖 **About & Bio:** Edit narrative paragraphs, engineering tenets, and exploration cards.
   - 🧠 **AI Twin Memory:** Update the system prompt to teach your AI Digital Twin about your newest deployments or hardware milestones.
4. **Publish your edits:**
   Click **"Save Changes"** in the Studio, then commit and push to GitHub:
   ```bash
   git add .
   git commit -m "content: update projects and experience"
   git push origin master
   ```
   *Vercel will automatically build and deploy your updated static site in ~30 seconds.*

---

## Technologies Used

### Frontend & Core
- **Next.js (v16)**: React framework with App Router, server-rendered components, and route optimization.
- **React (v19)**: State management, Hooks, and client-side page interactivity.
- **TypeScript**: Full static type-checking and code completion.
- **Lucide Icons**: Beautiful, lightweight utility iconography.
- **CSS3 (Vanilla)**: High-fidelity premium dark-mode styling utilizing variables and responsive flexbox layouts.

### API & Integrations
- **Resend SDK**: For serverless email dispatch on form submission.
- **Tavily API**: Used for fetching contextually rich project-related search images dynamically.

---

## Project Structure

```text
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts        # Next.js Route Handler for contact form
│   ├── globals.css             # Main stylesheet (design system, transitions, variables)
│   ├── layout.tsx              # Root layout with Google font loading & SEO metadata
│   ├── page.tsx                # Main portfolio React page (UI states, modal, features)
│   └── not-found.tsx           # Custom 404 page in premium dark theme
├── public/
│   └── images/                 # Profile & project images/GIFs
├── content/
│   └── about-tejas-phutane.md  # Detailed markdown source files
├── package.json                # NPM dependencies & scripts
├── tsconfig.json               # TypeScript configuration
├── next.config.ts              # Next.js configuration
├── eslint.config.mjs           # ESLint configuration
└── .gitignore                  # Git ignore rules
```

---

## Getting Started

### Prerequisites
- Node.js (v18.17.0 or higher recommended)
- npm or yarn

### Local Development

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd portfolio-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. **Build for production:**
   ```bash
   npm run build
   ```
   To preview the built production app locally:
   ```bash
   npm run start
   ```

---

## Vercel Deployment Instructions

Next.js projects deploy out-of-the-box on Vercel with zero configuration required.

### Method 1: Git Integration (Recommended)
1. Push your repository to **GitHub, GitLab, or Bitbucket**.
2. Sign in to your Vercel Dashboard at [vercel.com](https://vercel.com/).
3. Import your project repository.
4. Vercel automatically detects Next.js, configures the build settings, and provisions your site.
5. **(Optional)** Add the environment variable for email delivery:
   - Go to your Vercel Project **Settings > Environment Variables**.
   - Add `RESEND_API_KEY` containing your Resend API token.
6. Click **Deploy**. Future updates pushed to your default branch will build and deploy automatically.

### Method 2: Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Log in and deploy from the project root:
   ```bash
   vercel
   ```
3. To release to production:
   ```bash
   vercel --prod
   ```

---

## Professional Information

**Tejas Phutane**  
Senior Robotics Engineer  
Mumbai, India (Open to global opportunities / relocation)  

### Contact
- **Email:** [tejasphutane.work@gmail.com](mailto:tejasphutane.work@gmail.com)
- **Phone:** +91-8484016205
- **LinkedIn:** [linkedin.com/in/tejas-phutane](https://linkedin.com/in/tejas-phutane)
- **GitHub:** [github.com/TejasPhutane](https://github.com/TejasPhutane)

### Expertise Areas
- Robotics & Control Systems
- Computer Vision & AI Perception
- Production-Grade Vision QC Systems
- Autonomous Systems Development & ROS/ROS2
- Technical Leadership & Mentorship

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with ❤️ by Tejas Phutane | Last updated: July 2026*