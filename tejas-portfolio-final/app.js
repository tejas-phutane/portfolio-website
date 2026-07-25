// Portfolio Application State
const AppState = {
    currentTab: 'about',
    projectsExpanded: false,

    // Project data for modals
    projects: {
        'multi-stream-analytics': {
            title: 'Multi-Stream Video Analytics Platform',
            status: 'Production Deployed',
            imageUrl: 'images/project-placeholder-1.svg',
            problem: 'Real-time inventory tracking across 4 processing lines. Manual counting was error-prone (75% accuracy) and labor-intensive. System needed to process multiple high-resolution streams simultaneously with sub-50ms latency per frame.',
            approach: 'Built GPU-accelerated multi-stream pipeline using NVIDIA DeepStream SDK. Custom YOLOv5 model trained on 8,000+ annotated images. TensorRT optimization reduced latency by 50%. Kafka handles streaming analytics, TimescaleDB stores time-series data.',
            implementation: [
                '4-camera RTSP feed ingestion with failover handling',
                'YOLOv5 object detection + secondary SKU classification',
                'TensorRT engine for 50% latency improvement',
                'Kafka pipeline for distributed real-time analytics',
                'Streamlit dashboard for monitoring'
            ],
            results: [
                { metric: '99.2%', description: 'detection accuracy' },
                { metric: '42ms', description: 'avg latency' },
                { metric: '4 streams', description: 'concurrent' },
                { metric: '85%', description: 'labor reduction' }
            ],
            stack: ['Python', 'C++', 'YOLOv5', 'DeepStream', 'TensorRT', 'Kafka', 'TimescaleDB']
        },

        'valve-inspection': {
            title: 'Valve Guide Vision QC System',
            status: 'In Progress',
            imageUrl: 'images/project-placeholder-2.svg',
            problem: 'Automated visual inspection for precision manufacturing with ±100 micron tolerance. Legacy system had no QC capability.',
            approach: 'High-resolution line-scan camera with precision optics. CNN-based defect detection trained on 5000+ samples. PLC integration for production line synchronization.',
            implementation: [
                'High-resolution line-scan camera system with precision optics',
                'Custom CNN architecture based on ResNet50',
                'Training on 5000+ labeled defect samples',
                'NVIDIA Triton inference server for real-time processing',
                'PLC integration for production line control',
                'MLflow for model versioning and experiment tracking'
            ],
            results: [
                { metric: '96.3%', description: 'defect detection' },
                { metric: '3 sec', description: 'per part' },
                { metric: '50µ', description: 'min defect size' },
                { metric: '<2%', description: 'false positives' }
            ],
            stack: ['CNN', 'Triton', 'PLC', 'MLflow', 'Hikvision Cameras']
        },

        'robot-analytics': {
            title: 'Robot Performance Analytics',
            status: 'Production',
            imageUrl: 'images/project-placeholder-1.svg',
            problem: 'Deployed robotic systems lacked performance visibility. No way to identify bottlenecks or predict throughput, limiting optimization potential and client ROI demonstration.',
            approach: 'Built comprehensive analytics framework logging all robot operations and vision detections to PostgreSQL. Developed regression models predicting throughput based on waste characteristics with 91% accuracy.',
            implementation: [
                'PostgreSQL database logging 10,000+ operations daily',
                'Regression models for throughput prediction',
                'Real-time Plotly dashboards for monitoring',
                'pandas for data processing and analysis',
                'scikit-learn for machine learning models',
                'Identified 3 major optimization opportunities'
            ],
            results: [
                { metric: '91%', description: 'throughput prediction' },
                { metric: '10,000+', description: 'daily operations' },
                { metric: '15%', description: 'cycle gain' },
                { metric: 'Real-time', description: 'dashboard updates' }
            ],
            stack: ['PostgreSQL', 'pandas', 'scikit-learn', 'Plotly', 'MQTT', 'Jupyter']
        },

        'pepper-robot': {
            title: 'Pepper Humanoid Integration',
            status: 'Completed',
            imageUrl: 'images/pepper.webp',
            problem: 'Enhance Pepper robot interactivity for public exhibitions with face recognition and object detection capabilities.',
            approach: 'Integrated YOLOv3 for real-time object detection and NAOqi SDK for robot control. Added face recognition using OpenCV and custom choreography programming.',
            implementation: [
                'YOLOv3 integration for object detection',
                'Face recognition pipeline using OpenCV',
                'NAOqi SDK for robot control and behaviors',
                'Custom choreography programming',
                'Real-time interaction handling'
            ],
            results: [
                { metric: '95%', description: 'recognition accuracy' },
                { metric: '500+', description: 'visitors interacted' },
                { metric: '10+', description: 'custom behaviors' },
                { metric: 'Real-time', description: 'response time' }
            ],
            stack: ['Python', 'YOLOv3', 'OpenCV', 'NAOqi SDK']
        },

        'da-vinci-robot': {
            title: 'Da Vinci Gesture Control',
            status: 'Completed',
            imageUrl: 'images/da-vinci.avif',
            problem: 'Retrofit medical robot with modern gesture-based control interface for educational demonstrations.',
            approach: 'Integrated Leap Motion sensor with ROS platform. Developed gesture recognition algorithms and mapped movements to robot kinematics.',
            implementation: [
                'Leap Motion sensor integration',
                'Gesture recognition algorithms',
                'ROS platform integration',
                'Forward/inverse kinematics mapping',
                'Safety protocols and constraints'
            ],
            results: [
                { metric: '98%', description: 'gesture accuracy' },
                { metric: '5 DOF', description: 'control precision' },
                { metric: '<100ms', description: 'latency' },
                { metric: 'Safe', description: 'operation protocols' }
            ],
            stack: ['ROS', 'Leap Motion', 'Python', 'C++', 'Arduino']
        },

        'air-hockey': {
            title: 'Air Hockey SCARA System',
            status: 'Completed',
            imageUrl: 'images/air_hockey.jpg',
            problem: 'Create autonomous air hockey robot with high-speed vision and precise motion control for entertainment and demonstration.',
            approach: 'High-speed camera system with real-time vision processing. Trajectory prediction algorithms and SCARA robot control for puck interception.',
            implementation: [
                'High-speed camera integration',
                'Real-time puck tracking algorithms',
                'Trajectory prediction using physics models',
                'SCARA robot motion planning',
                'Defensive and offensive strategies'
            ],
            results: [
                { metric: '240 FPS', description: 'vision processing' },
                { metric: '95%', description: 'interception rate' },
                { metric: '<50ms', description: 'response time' },
                { metric: 'Adaptive', description: 'AI strategies' }
            ],
            stack: ['OpenCV', 'Python', 'Epson SCARA', 'Real-time CV']
        },

        'warehouse-automation': {
            title: 'Autonomous Warehouse System',
            status: 'Competition',
            imageUrl: 'images/project-placeholder-2.svg',
            problem: 'Develop multi-robot coordination system for warehouse automation with collision-free operation.',
            approach: 'Dual UR5 robot system with MQTT-based coordination. MoveIt motion planning for collision-free paths and real-time communication.',
            implementation: [
                'Dual UR5 robot system in Gazebo simulation',
                'MoveIt motion planning framework',
                'MQTT-based coordination protocol',
                'Google Sheets integration for order tracking',
                'Real-time package delivery monitoring'
            ],
            results: [
                { metric: 'Zero', description: 'collisions' },
                { metric: 'Parallel', description: 'task execution' },
                { metric: 'Real-time', description: 'tracking' },
                { metric: '2', description: 'coordinated robots' }
            ],
            stack: ['ROS', 'MoveIt', 'MQTT', 'Python', 'Gazebo', 'URDF']
        },

        'waste-sorting-robot': {
            title: 'Vision and Robot for Sorting Random Objects on Conveyor',
            status: 'Production',
            imageUrl: 'images/project-placeholder-2.svg',
            problem: 'Manual sorting of waste on conveyor belts was inefficient and labor-intensive. Needed automated system to identify and sort various objects for recycling optimization.',
            approach: 'Integrated computer vision pipeline with robotic manipulation. YOLO-based object detection for real-time classification, ROS2 for robot control and coordination.',
            implementation: [
                'High-resolution camera system for object detection on moving conveyor',
                'YOLOv8 model trained on diverse waste object dataset',
                'ROS2 nodes for vision processing and robot control',
                'Conveyor synchronization with robotic picking cycles',
                'Real-time decision making for sorting categories'
            ],
            results: [
                { metric: '95%', description: 'sorting accuracy' },
                { metric: '300', description: 'objects/min' },
                { metric: '60%', description: 'labor reduction' },
                { metric: '<500ms', description: 'response time' }
            ],
            stack: ['ROS2', 'YOLOv8', 'OpenCV', 'Python', 'C++', 'TensorRT']
        },

        'ai-quality-control': {
            title: 'AI-powered Quality Control System for Manufacturing',
            status: 'Production Deployed',
            imageUrl: 'images/project-placeholder-1.svg',
            problem: 'Traditional quality control relied on manual inspection, leading to inconsistencies and high defect rates. Needed automated, real-time defect detection to improve product quality and reduce waste.',
            approach: 'Developed deep learning-based inspection system using computer vision. Trained CNN models on manufacturing defect datasets with automated data augmentation and deployed on edge devices for real-time processing.',
            implementation: [
                'High-resolution industrial cameras for defect capture',
                'Custom CNN architecture trained on 50,000+ defect samples',
                'Real-time inference on NVIDIA Jetson edge devices',
                'Integration with manufacturing PLC systems',
                'Automated alert system for quality issues'
            ],
            results: [
                { metric: '98.5%', description: 'defect detection accuracy' },
                { metric: '0.2 sec', description: 'per inspection' },
                { metric: '75%', description: 'defect reduction' },
                { metric: '40%', description: 'cost savings' }
            ],
            stack: ['Python', 'TensorFlow', 'OpenCV', 'NVIDIA Jetson', 'PLC Integration', 'Kafka']
        },

        'autonomous-warehouse-robot': {
            title: 'Autonomous Navigation Robot for Warehouses',
            status: 'Production',
            imageUrl: 'images/project-placeholder-2.svg',
            problem: 'Warehouse operations faced inefficiencies with manual material handling and navigation challenges. Required autonomous robots for safe, efficient goods transportation in dynamic environments.',
            approach: 'Implemented SLAM-based navigation with multi-sensor fusion. Used ROS navigation stack with custom path planning algorithms optimized for warehouse constraints and real-time obstacle avoidance.',
            implementation: [
                'LiDAR and camera-based SLAM for mapping and localization',
                'Multi-sensor fusion (LiDAR, IMU, odometry) for robust navigation',
                'Custom path planning algorithms for warehouse optimization',
                'Real-time obstacle detection and avoidance',
                'Fleet management system for multiple robots'
            ],
            results: [
                { metric: '99.9%', description: 'navigation reliability' },
                { metric: '50%', description: 'operational efficiency' },
                { metric: 'Zero', description: 'accidents' },
                { metric: '24/7', description: 'operation capability' }
            ],
            stack: ['ROS', 'C++', 'Python', 'LiDAR', 'SLAM', 'Navigation Stack']
        },

        'computer-vision-defect': {
            title: 'Computer Vision System for Defect Detection',
            status: 'In Progress',
            imageUrl: 'images/project-placeholder-1.svg',
            problem: 'Surface defect detection in manufacturing required expert inspectors and was prone to human error. Needed automated system to detect micro-defects with high precision and speed.',
            approach: 'Built advanced computer vision pipeline using deep learning. Implemented instance segmentation models with attention mechanisms for precise defect localization and classification.',
            implementation: [
                'High-resolution imaging system with controlled lighting',
                'Mask R-CNN based instance segmentation for defect detection',
                'Attention-based neural networks for feature extraction',
                'Automated data pipeline for continuous model improvement',
                'Real-time processing with GPU acceleration'
            ],
            results: [
                { metric: '97.8%', description: 'detection precision' },
                { metric: '0.5 sec', description: 'processing time' },
                { metric: '85%', description: 'false positive reduction' },
                { metric: '50µ', description: 'min defect size' }
            ],
            stack: ['PyTorch', 'OpenCV', 'CUDA', 'TensorRT', 'DeepStream', 'MLflow']
        },

        'robotic-arm-assembly': {
            title: 'Robotic Arm for Assembly Line Automation',
            status: 'Production',
            imageUrl: 'images/project-placeholder-2.svg',
            problem: 'Manual assembly processes were slow, inconsistent, and ergonomically challenging. Required robotic automation to improve speed, precision, and worker safety in assembly operations.',
            approach: 'Integrated 6-DOF robotic arm with vision-guided manipulation. Used force-torque sensing for delicate assembly tasks and developed adaptive control algorithms for varying part tolerances.',
            implementation: [
                '6-DOF robotic arm with force-torque sensor integration',
                'Vision-guided pick-and-place with sub-millimeter precision',
                'Adaptive control algorithms for part variation handling',
                'Safety systems with collision detection and emergency stop',
                'HMI interface for production monitoring and control'
            ],
            results: [
                { metric: '99.5%', description: 'assembly accuracy' },
                { metric: '3x', description: 'production speed' },
                { metric: '90%', description: 'defect reduction' },
                { metric: 'Improved', description: 'worker ergonomics' }
            ],
            stack: ['ROS', 'MoveIt', 'Python', 'C++', 'OpenCV', 'Force Sensors']
        }
    }
};

// Image Fetcher Class for Tavily API
class ImageFetcher {
    constructor() {
        this.apiKey = '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';
        this.apiUrl = 'https://api.tavily.com/search';
    }

    async fetchProjectImages() {
        const projects = Object.keys(AppState.projects);

        for (const projectId of projects) {
            try {
                const imageUrl = await this.fetchImageForProject(projectId);
                if (imageUrl) {
                    AppState.projects[projectId].imageUrl = imageUrl;
                    this.updateProjectImage(projectId, imageUrl);
                }
            } catch (error) {
                console.warn(`Failed to fetch image for ${projectId}:`, error);
                // Keep the default placeholder
            }
        }
    }

    async fetchImageForProject(projectId) {
        const project = AppState.projects[projectId];
        const query = this.generateSearchQuery(project);

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    query: query,
                    include_images: true,
                    max_results: 5
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();

            // Assuming the response has images array
            if (data.images && data.images.length > 0) {
                return data.images[0].url; // Return first image
            }

            return null;
        } catch (error) {
            console.error(`Error fetching image for ${projectId}:`, error);
            return null;
        }
    }

    generateSearchQuery(project) {
        // Create search query from title and key tech stack items
        const title = project.title.toLowerCase();
        const keyTech = project.stack.slice(0, 3).join(' '); // First 3 tech items
        return `${title} ${keyTech} technology project`;
    }

    updateProjectImage(projectId, imageUrl) {
        // Update the image src in the DOM if the element exists
        const imgElement = document.querySelector(`img[alt*="${AppState.projects[projectId].title}"]`);
        if (imgElement) {
            imgElement.src = imageUrl;
            imgElement.onerror = () => {
                // Fallback to placeholder if image fails to load
                imgElement.src = AppState.projects[projectId].imageUrl;
            };
        }
    }
}

// Navigation Management Class
class NavigationManager {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('.content-section');
        this.currentSection = 'about';
        this.init();
    }

    init() {
        // Handle nav link clicks
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });

        // Handle scroll to update active nav link
        window.addEventListener('scroll', () => this.updateActiveNavLink());

        // Handle URL hash for direct section access
        this.handleUrlHash();
        window.addEventListener('hashchange', () => this.handleUrlHash());

        // Initial active link update
        this.updateActiveNavLink();
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            this.currentSection = sectionId;
            this.updateUrlHash(sectionId);
        }
    }

    updateActiveNavLink() {
        const scrollPosition = window.scrollY + 200; // Offset for header

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                if (this.currentSection !== sectionId) {
                    this.currentSection = sectionId;
                    this.updateActiveNavClasses(sectionId);
                    this.updateUrlHash(sectionId);
                }
            }
        });
    }

    updateActiveNavClasses(activeId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }

    updateUrlHash(sectionId) {
        history.replaceState(null, null, `#${sectionId}`);
    }

    handleUrlHash() {
        const hash = window.location.hash.substring(1);
        if (hash && ['about', 'skills', 'experience', 'projects', 'services', 'contact'].includes(hash)) {
            this.scrollToSection(hash);
        }
    }
}

// Project Manager Class
class ProjectManager {
    constructor() {
        this.viewAllBtn = document.getElementById('view-all-btn');
        this.allProjectsSection = document.getElementById('all-projects-section');
        this.modal = document.getElementById('project-modal');
        this.modalContent = document.getElementById('project-detail-content');
        this.isExpanded = false;
        this.init();
    }

    init() {
        // View all projects button
        if (this.viewAllBtn) {
            this.viewAllBtn.addEventListener('click', () => this.toggleProjects());
        }

        // Project detail buttons
        this.setupProjectDetails();

        // Modal close handlers
        this.setupModalClose();
    }

    toggleProjects() {
        this.isExpanded = !this.isExpanded;
        AppState.projectsExpanded = this.isExpanded;

        const btnText = this.viewAllBtn.querySelector('.btn-text');
        const btnIcon = this.viewAllBtn.querySelector('.btn-icon');

        if (this.isExpanded) {
            this.allProjectsSection.style.display = 'block';
            btnText.textContent = 'Show Less';
            btnIcon.textContent = '↑';

            // Smooth scroll to all projects section
            setTimeout(() => {
                this.allProjectsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        } else {
            this.allProjectsSection.style.display = 'none';
            btnText.textContent = 'View All Projects';
            btnIcon.textContent = '↓';
        }
    }

    setupProjectDetails() {
        document.querySelectorAll('.btn-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const projectId = btn.dataset.project;
                this.showProjectDetail(projectId);
            });
        });
    }

    showProjectDetail(projectId) {
        const project = AppState.projects[projectId];
        if (!project) return;

        // Render project detail content
        this.modalContent.innerHTML = this.renderProjectDetail(project);

        // Show modal
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus management
        this.modal.focus();
    }

    renderProjectDetail(project) {
        return `
            <h2>${project.title}</h2>
            <div class="project-status ${project.status.toLowerCase().replace(' ', '-')}" style="display: inline-block; margin-bottom: 1.5rem;">${project.status}</div>

            <div style="margin: 2rem 0;">
                <h3>Problem</h3>
                <p>${project.problem}</p>
            </div>

            <div style="margin: 2rem 0;">
                <h3>Approach</h3>
                <p>${project.approach}</p>
            </div>

            <div style="margin: 2rem 0;">
                <h3>Technical Implementation</h3>
                <ul class="timeline-achievements">
                    ${project.implementation.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>

            <div style="margin: 2rem 0;">
                <h3>Results</h3>
                <div class="project-metrics">
                    ${project.results.map(r => `
                        <div class="metric">
                            <span class="metric-value">${r.metric}</span>
                            <span class="metric-label">${r.description}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div style="margin: 2rem 0;">
                <h3>Technology Stack</h3>
                <div class="tech-stack">
                    ${project.stack.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>
        `;
    }

    setupModalClose() {
        // Close button
        const closeBtn = this.modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeProjectDetail());
        }

        // Overlay click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeProjectDetail();
            }
        });

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeProjectDetail();
            }
        });
    }

    closeProjectDetail() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';

        // Return focus to triggering element
        const activeElement = document.activeElement;
        if (activeElement && activeElement.blur) {
            activeElement.blur();
        }
    }
}

// Responsive Manager Class
class ResponsiveManager {
    constructor() {
        this.init();
    }

    init() {
        this.handleResponsiveLayout();
        window.addEventListener('resize', () => this.handleResponsiveLayout());
    }

    handleResponsiveLayout() {
        const featuredCards = document.querySelectorAll('.project-card.featured');

        if (window.innerWidth < 1024) {
            featuredCards.forEach(card => {
                card.style.gridTemplateColumns = '1fr';
            });
        } else {
            featuredCards.forEach(card => {
                card.style.gridTemplateColumns = '1fr 1.5fr';
            });
        }

        // Handle mobile navigation
        this.handleMobileNavigation();
    }

    handleMobileNavigation() {
        const navContainer = document.querySelector('.nav-container');
        const tabs = document.querySelectorAll('.tab-button');

        if (window.innerWidth < 768) {
            // Enable horizontal scrolling for tabs on mobile
            navContainer.style.overflowX = 'auto';
            navContainer.style.scrollbarWidth = 'none';
            navContainer.style.msOverflowStyle = 'none';
        } else {
            // Reset for desktop
            navContainer.style.overflowX = 'visible';
        }
    }
}

// Animation Manager Class
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe content sections
        document.querySelectorAll('.content-container > *').forEach(section => {
            if (!section.classList.contains('tab-content')) {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(section);
            }
        });
    }
}

// Contact Form Manager
class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Submit form to Vercel API
            const result = await this.submitForm(data);

            // Show success message
            this.showMessage(result.message || 'Message sent successfully! I\'ll get back to you soon.', 'success');

            // Reset form
            this.form.reset();

        } catch (error) {
            // Show error message
            this.showMessage('Failed to send message. Please try again or contact me directly.', 'error');
            console.error('Form submission error:', error);
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    async submitForm(data) {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || 'Network error');
        }

        return await response.json();
    }

    showMessage(message, type) {
        // Remove existing message
        const existingMessage = this.form.parentNode.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;

        // Insert after form
        this.form.parentNode.insertBefore(messageEl, this.form.nextSibling);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }
}

// Keyboard Navigation Manager
class KeyboardManager {
    constructor(navigationManager) {
        this.navigationManager = navigationManager;
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    handleKeydown(e) {
        // Section navigation with arrow keys
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            this.navigateSections(e.key === 'ArrowLeft' ? -1 : 1);
        }

        // Tab key for focus management
        if (e.key === 'Tab') {
            this.handleTabFocus(e);
        }
    }

    navigateSections(direction) {
        const sections = ['about', 'skills', 'experience', 'projects', 'services', 'contact'];
        const currentIndex = sections.indexOf(this.navigationManager.currentSection);

        if (currentIndex === -1) return;

        let newIndex = currentIndex + direction;
        if (newIndex < 0) newIndex = sections.length - 1;
        if (newIndex >= sections.length) newIndex = 0;

        const newSection = sections[newIndex];
        this.navigationManager.scrollToSection(newSection);
    }

    handleTabFocus(e) {
        const focusedElement = document.activeElement;

        // If focus is on a nav link, ensure proper navigation
        if (focusedElement.classList.contains('nav-link')) {
            const navLinks = Array.from(document.querySelectorAll('.nav-link'));
            const currentIndex = navLinks.indexOf(focusedElement);

            if (e.shiftKey) {
                // Shift+Tab: move to previous nav link or last element before nav
                if (currentIndex === 0) {
                    // Move focus to last focusable element before nav
                    const header = document.querySelector('.site-header');
                    const focusableElements = header.querySelectorAll('a, button');
                    if (focusableElements.length > 0) {
                        focusableElements[focusableElements.length - 1].focus();
                        e.preventDefault();
                    }
                }
            } else {
                // Tab: move to next nav link or first element in content
                if (currentIndex === navLinks.length - 1) {
                    // Move focus to first focusable element in current section
                    const currentSection = document.getElementById(this.navigationManager.currentSection);
                    const focusableElements = currentSection.querySelectorAll('a, button, input, select, textarea');
                    if (focusableElements.length > 0) {
                        focusableElements[0].focus();
                        e.preventDefault();
                    }
                }
            }
        }
    }
}

// Application Initialization
class PortfolioApp {
    constructor() {
        this.init();
    }

    async init() {
        // Initialize managers
        this.navigationManager = new NavigationManager();
        this.projectManager = new ProjectManager();
        this.contactFormManager = new ContactFormManager();
        this.responsiveManager = new ResponsiveManager();
        this.animationManager = new AnimationManager();
        this.keyboardManager = new KeyboardManager(this.navigationManager);

        // Setup global event listeners
        this.setupGlobalEvents();

        // Initialize with default state
        this.restoreState();

        // Fetch project images asynchronously
        this.imageFetcher = new ImageFetcher();
        this.imageFetcher.fetchProjectImages();
    }

    setupGlobalEvents() {
        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            const hash = window.location.hash.substring(1);
            if (hash) {
                this.navigationManager.scrollToSection(hash);
            }
        });

        // Handle page visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause animations or heavy operations
            } else {
                // Resume operations
            }
        });
    }

    restoreState() {
        // Restore section state from URL hash
        const hash = window.location.hash.substring(1);
        if (hash && ['about', 'skills', 'experience', 'projects', 'services', 'contact'].includes(hash)) {
            this.navigationManager.scrollToSection(hash);
        } else {
            // Default to about section
            this.navigationManager.scrollToSection('about');
        }

        // Restore projects expanded state
        if (AppState.projectsExpanded) {
            this.projectManager.toggleProjects();
        }
    }
}

// Initialize application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new PortfolioApp());
} else {
    new PortfolioApp();
}

// Export for debugging (optional)
if (typeof window !== 'undefined') {
    window.PortfolioApp = PortfolioApp;
    window.AppState = AppState;
}