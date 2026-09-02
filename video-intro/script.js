document.addEventListener('DOMContentLoaded', () => {
    const slices = document.querySelectorAll('.slice');
    const logoFull = document.querySelector('.logo-full');
    const flash = document.querySelector('.flash');
    const bgImg = document.querySelector('#bg-img');
    const playBtn = document.querySelector('#play-btn');
    const container = document.querySelector('.video-container');

    const tl = gsap.timeline({ paused: true });

    // Create particles background
    function createParticles() {
        for (let i = 0; i < 60; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            container.appendChild(p);
            const size = Math.random() * 3 + 1;
            gsap.set(p, {
                x: Math.random() * 1080,
                y: Math.random() * 1920,
                width: size,
                height: size,
                opacity: Math.random() * 0.4,
                zIndex: 5
            });
            gsap.to(p, {
                y: "-=200",
                duration: Math.random() * 15 + 10,
                repeat: -1,
                ease: "none",
                delay: Math.random() * 10
            });
        }
    }

    createParticles();

    function buildAnimation() {
        tl.clear();

        // Initial positions
        gsap.set(slices, { opacity: 0, scale: 2, filter: 'blur(20px) brightness(5)' });
        gsap.set(logoFull, { opacity: 0, scale: 0.9 });
        gsap.set(flash, { opacity: 0 });
        gsap.set(bgImg, { scale: 1.2, filter: 'brightness(0.2)' });

        // Offset positions for slices
        const offsets = [
            { x: -500, y: -500 }, // stars
            { x: 500, y: -300 },  // funn
            { x: -600, y: 100 },  // arena
            { x: 600, y: 400 },   // hat
            { x: 0, y: 800 }      // footer
        ];

        slices.forEach((slice, i) => {
            gsap.set(slice, { x: offsets[i].x, y: offsets[i].y });
        });

        // 1. Background fade in
        tl.to(bgImg, { duration: 1.5, filter: 'brightness(0.3)', scale: 1, ease: "power2.inOut" });

        // 2. Fly in slices
        tl.to(slices, {
            duration: 1.2,
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: 'blur(0px) brightness(1)',
            stagger: 0.1,
            ease: "expo.out"
        }, "-=0.5");

        // 3. Assemble & Flash
        tl.to(flash, {
            duration: 0.1,
            opacity: 1,
            ease: "none"
        })
        .set(slices, { opacity: 0 })
        .set(logoFull, { opacity: 1 })
        .to(flash, {
            duration: 0.6,
            opacity: 0,
            ease: "power2.out"
        })
        .to(logoFull, {
            duration: 2,
            scale: 1,
            filter: 'drop-shadow(0 0 50px rgba(255,255,255,0.4))',
            ease: "power4.out"
        }, "-=0.6")
        
        // 4. Light Sweep
        .fromTo(logoFull, {
            maskImage: 'linear-gradient(45deg, transparent 0%, white 50%, transparent 100%)',
            maskSize: '200% 100%',
            maskPosition: '-100% 0%'
        }, {
            duration: 1.5,
            maskPosition: '100% 0%',
            ease: "power2.inOut"
        }, "-=1")
        .set(logoFull, { maskImage: 'none' }) // Remove mask after sweep
        
        // 5. Subtle zoom out/drift
        .to(logoFull, {
            duration: 10,
            scale: 1.05,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        tl.play();
    }

    playBtn.addEventListener('click', buildAnimation);

    // Initial run
    setTimeout(buildAnimation, 1000);
});
