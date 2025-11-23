# Tejas Phutane - Senior Robotics Engineer Portfolio

[![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange)](https://firebase.google.com/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/tejas-phutane)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/TejasPhutane)

## Overview

This is a professional portfolio website showcasing the work and expertise of Tejas Phutane, a Senior Robotics Engineer specializing in autonomous waste management systems. The site features a comprehensive overview of his background, technical skills, professional experience, notable projects, and services offered.

The portfolio highlights Tejas's extensive experience in robotics, computer vision, AI/ML deployment, and production-grade system development. It demonstrates his contributions to India's first Robotic Gallery at Gujarat Science City and his current role leading perception and motion control for autonomous waste sorting robots.

## Key Features

- **Responsive Design**: Fully responsive layout that works seamlessly across desktop, tablet, and mobile devices
- **Interactive Navigation**: Smooth scrolling navigation with active section highlighting
- **Project Showcase**: Detailed project cards with metrics, technologies, and expandable details
- **Skills Overview**: Comprehensive technical skills categorized by domain (Robotics, Computer Vision, Programming, etc.)
- **Experience Timeline**: Chronological display of professional experience with key achievements
- **Contact Integration**: Functional contact form with professional contact information
- **Accessibility**: Keyboard navigation support and screen reader friendly
- **Performance Optimized**: Fast loading with optimized images and efficient JavaScript

## Technologies Used

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)**: Interactive functionality and DOM manipulation
- **Lucide Icons**: Beautiful, consistent iconography

### Hosting & Deployment
- **Firebase Hosting**: Fast, secure web hosting with CDN
- **Firebase CLI**: Command-line tools for deployment

### Development Tools
- **Git**: Version control
- **VS Code**: Development environment

## Project Structure

```
tejas-portfolio-final/
├── index.html          # Main portfolio page
├── style.css           # Stylesheet with responsive design
├── app.js              # JavaScript for interactivity
└── images/             # Project images and assets
    ├── profile.png
    ├── project images...
    └── ...

content/
└── about-tejas-phutane.md  # Detailed about content

.firebaserc              # Firebase project configuration
.gitignore              # Git ignore rules
tejas-portfolio-final.zip  # Backup/archive
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for cloning the repository)
- Node.js and npm (for Firebase CLI, optional for local development)

### Local Development

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd tejas-portfolio
   ```

2. **Open the portfolio:**
   - Simply open `tejas-portfolio-final/index.html` in your web browser
   - For a better development experience, use a local server:

3. **Using Python (recommended for simple hosting):**
   ```bash
   cd tejas-portfolio-final
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

4. **Using Node.js (if available):**
   ```bash
   npx serve tejas-portfolio-final
   ```

### Development Notes
- The site is built with vanilla HTML/CSS/JS for maximum compatibility
- No build process required - all files are ready to deploy
- Images are optimized for web delivery
- JavaScript is modular and follows modern ES6+ practices

## Firebase Deployment Instructions

### Prerequisites
- Node.js installed (version 14 or higher)
- Firebase account and project created
- Firebase CLI installed globally

### Installation

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```
   Follow the browser authentication flow.

3. **Initialize Firebase (if not already done):**
   ```bash
   firebase init hosting
   ```
   - Select the project: `tejas-phutane-portfolio`
   - Choose `tejas-portfolio-final` as the public directory
   - Configure as a single-page app: Yes
   - Set up automatic builds: No

### Deployment

1. **Deploy to Firebase Hosting:**
   ```bash
   firebase deploy --only hosting
   ```

2. **Verify Deployment:**
   - The command will output the hosting URL
   - Visit the URL to see your live portfolio

### Post-Deployment
- The site will be available at: `https://tejas-phutane-portfolio.web.app`
- Custom domain can be configured in Firebase Console if desired
- SSL certificate is automatically provided by Firebase

### Updating the Site
1. Make your changes to the code
2. Test locally
3. Deploy again with: `firebase deploy --only hosting`

## Professional Information

**Tejas Phutane**  
Senior Robotics Engineer  
Wastefull Insights, Vadodara, Gujarat, India  
Open to global opportunities

### Contact
- **Email:** [tejasphutane.work@gmail.com](mailto:tejasphutane.work@gmail.com)
- **Phone:** +91-8484016205
- **LinkedIn:** [linkedin.com/in/tejas-phutane](https://linkedin.com/in/tejas-phutane)
- **GitHub:** [github.com/TejasPhutane](https://github.com/TejasPhutane)
- **Location:** Mumbai, India (Open to relocation)

### Expertise Areas
- Robotics & Control Systems
- Computer Vision & AI
- Production-Grade Vision Systems
- Autonomous Systems Development
- Technical Leadership & Mentorship

## License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with ❤️ by Tejas Phutane | Last updated: November 2025*