document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    const container = document.querySelector('.video-container');
    const slices = {
        stars: document.querySelector('.stars'),
        typography: document.querySelector('.typography'),
        hat: document.querySelector('.hat'),
        flourishesLeft: document.querySelector('.flourishes-left'),
        flourishesRight: document.querySelector('.flourishes-right'),
        banner: document.querySelector('.banner')
    };
    const logoFull = document.querySelector('.logo-full');
    const playBtn = document.querySelector('#play-btn');

    canvas.width = 1080;
    canvas.height = 1920;

    let particles = [];
    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 20;
            this.vx = (Math.random() - 0.5) * 1.5;
            this.vy = -(Math.random() * 2 + 2);
            this.size = Math.random() * 3 + 1;
            this.z = Math.random() * 2 + 0.5; // Depth factor
            this.alpha = (Math.random() * 0.3 + 0.1) * this.z;
        }
        update() {
            this.x += this.vx * this.z;
            this.y += this.vy * this.z;
            if (this.y < -100) this.reset();
        }
        draw() {
            ctx.fillStyle = `rgba(0, 0, 0, ${this.alpha})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * this.z, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        for (let i = 0; i < 180; i++) particles.push(new Particle());
    }
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    const mainTl = gsap.timeline({ repeat: -1, paused: true });

    function create3DSequence() {
        mainTl.clear();

        // 1. Initial State: Hidden and deep in 3D space
        gsap.set(Object.values(slices), { 
            opacity: 0, 
            z: -1500, 
            rotationX: 70, 
            rotationY: -30,
            filter: "invert(1) blur(10px)",
            transformOrigin: "50% 50%"
        });
        gsap.set(logoFull, { opacity: 0, z: 0, filter: "invert(1) drop-shadow(0 0 0px rgba(0,0,0,0))" });

        // 2. Hat (Boné) first - 1.5s
        mainTl.to(slices.hat, {
            duration: 2.5,
            opacity: 1,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            filter: "invert(1) blur(0px)",
            ease: "power4.out"
        }, 1)

        // 3. Typography (FUNN ARENA) - 3s
        .to(slices.typography, {
            duration: 2.2,
            opacity: 1,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            filter: "invert(1) blur(0px)",
            ease: "expo.out"
        }, 2.8)

        // 4. Stars - 4.5s
        .to(slices.stars, {
            duration: 2,
            opacity: 1,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            filter: "invert(1) blur(0px)",
            ease: "back.out(1.5)"
        }, 4.5)

        // 5. Flourishes and Banner - 6s
        .to([slices.flourishesLeft, slices.flourishesRight, slices.banner], {
            duration: 2,
            opacity: 1,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            filter: "invert(1) blur(0px)",
            ease: "power3.out",
            stagger: 0.4
        }, 6)

        // 6. Transition to Full Logo (Seamless handoff)
        .set(logoFull, { opacity: 1 }, 9)
        .set(Object.values(slices), { opacity: 0 }, 9)

        // 7. 3D Hover & Shadow (9s-12s)
        .to(logoFull, {
            duration: 4,
            rotationY: 15,
            rotationX: 8,
            z: 80,
            filter: "invert(1) drop-shadow(0 40px 60px rgba(0,0,0,0.1))",
            repeat: 1,
            yoyo: true,
            ease: "sine.inOut"
        }, 9)

        // 8. Shatter / Dissolve - 14s+
        .to(logoFull, {
            duration: 2.5,
            opacity: 0,
            z: 2000, 
            rotationZ: 25,
            rotationX: -90,
            filter: "invert(1) blur(40px)",
            ease: "power2.in"
        }, 14)
        
        .to({}, { duration: 1.5 });
    }

    playBtn.addEventListener('click', () => {
        create3DSequence();
        mainTl.play();
        playBtn.style.display = 'none';
    });

    // Auto-start for preview
    setTimeout(() => {
        create3DSequence();
        mainTl.play();
        playBtn.style.display = 'none';
    }, 1000);
});
