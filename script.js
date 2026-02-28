// Data for Skills
const skills = [
    { name: "Java", icon: "fab fa-java", delay: "delay-100" },
    { name: "C++", icon: "fas fa-code", delay: "delay-200" },
    { name: "DBMS / SQL", icon: "fas fa-database", delay: "delay-300" },
    { name: "Python (Basics)", icon: "fab fa-python", delay: "delay-400" },
    { name: "DSA", icon: "fas fa-laptop-code", delay: "delay-500" },
    { name: "HTML & CSS", icon: "fab fa-html5", delay: "delay-600" },
    { name: "React", icon: "fab fa-react", delay: "delay-700" },
    { name: "Node.js", icon: "fab fa-node-js", delay: "delay-800" },
    { name: "Java Spring Boot", icon: "fas fa-leaf", delay: "delay-900" }
];

// Data for Projects
const projects = [
    {
        title: "Online Charity System",
        description: "Developed an Online Charity System using Java, JDBC, HTML, and CSS. The system manages user registrations, donor registration, donations, change password, with a secure database backend and a responsive user interface.",
        tech: ["Java", "JDBC", "HTML/CSS"],
        delay: ""
    },
    {
        title: "Online Book Store",
        description: "Built a web application using Spring Boot with features like a home page, available books listing, and a My Books section. Utilized MySQL for database management to store and retrieve book details efficiently.",
        tech: ["Spring Boot", "MySQL", "Java"],
        delay: "delay-100"
    },
    {
        title: "AgroBid – Farmer Vendor Bidding System",
        description: "AgroBid is a comprehensive web application designed to bridge the gap between farmers and vendors through an efficient bidding system. Built with a robust .NET backend and a dynamic React.js frontend, the platform facilitates seamless transactions and fosters fair market practices.",
        tech: ["Spring Boot", "MySQL", "Java", "React.js", "JWT", ".NET"],
        delay: "delay-100"
    }
];

// Render Skills
const skillsContainer = document.getElementById('skills-container');
if (skillsContainer) {
    skills.forEach(skill => {
        const skillHTML = `
            <div class="col-md-6 col-lg-3 reveal-bottom ${skill.delay}">
                <div class="skill-card text-center p-4 glass-card h-100">
                    <i class="${skill.icon} fa-3x mb-3 text-accent"></i>
                    <h4 class="mb-0">${skill.name}</h4>
                </div>
            </div>
        `;
        skillsContainer.innerHTML += skillHTML;
    });
}

// Render Projects
const projectsContainer = document.getElementById('projects-container');
if (projectsContainer) {
    projects.forEach(project => {
        const badges = project.tech.map(t => `<span class="badge bg-secondary me-2">${t}</span>`).join('');
        const projectHTML = `
            <div class="col-md-6 reveal-bottom ${project.delay}">
                <div class="project-card glass-card p-4 h-100 d-flex flex-column">
                    <h3 class="h4 mb-3">${project.title}</h3>
                    <p class="text-muted-light flex-grow-1">
                        ${project.description}
                    </p>
                    <div class="mt-3">
                        ${badges}
                    </div>
                </div>
            </div>
        `;
        projectsContainer.innerHTML += projectHTML;
    });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation
// Note: We need to re-select elements after injection or use MutationObserver, 
// but for simplicity, we'll run this after a short timeout or ensure elements are in DOM.
// Since we inject synchronously above, we can just select them now.

const revealOnScroll = () => {
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom');
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;

        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('reveal-active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            // Close mobile menu if open
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('.contact-submit-btn');
        const originalText = submitBtn.innerHTML;

        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>SENDING...';

        const data = {
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-email').value,
            message: document.getElementById('contact-message').value
        };

        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Success feedback
                submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>MESSAGE SENT!';
                submitBtn.style.background = '#10b981'; // Green
                this.reset();
            } else {
                throw new Error();
            }
        } catch (error) {
            // Error feedback
            submitBtn.innerHTML = '<i class="fas fa-times me-2"></i>FAILED TO SEND';
            submitBtn.style.background = '#ef4444'; // Red
        } finally {
            submitBtn.disabled = false;
            // Revert button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        }
    });
}
