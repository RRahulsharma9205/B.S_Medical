/* =========================
   INITIALIZE ICONS
========================= */

lucide.createIcons();


/* =========================
   PAGE LOADER
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        const loader = document.querySelector(".page-loader");

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.remove();

        }, 500);

    }, 1500);

});


/* =========================
   NAVBAR SCROLL
========================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");

const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {

    mobileMenu.classList.toggle("show");

});


document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("show");

    });

});


/* =========================
   DARK MODE
========================= */

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const isDark =
        document.body.classList.contains("dark-mode");

    localStorage.setItem("darkMode", isDark);

});


if (localStorage.getItem("darkMode") === "true") {

    document.body.classList.add("dark-mode");

}


/* =========================
   COUNTERS
========================= */

const counters =
    document.querySelectorAll("[data-counter]");


const counterObserver =
    new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const element = entry.target;

                const target =
                    Number(element.dataset.counter);

                let current = 0;

                const increment =
                    target / 60;

                const updateCounter = () => {

                    current += increment;

                    if (current < target) {

                        element.textContent =
                            Math.floor(current) +
                            (target === 100 ? "%" : "+");

                        requestAnimationFrame(updateCounter);

                    } else {

                        element.textContent =
                            target +
                            (target === 100 ? "%" : "+");

                    }

                };

                updateCounter();

                counterObserver.unobserve(element);

            }

        });

    });


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =========================
   PRODUCT DATA
========================= */

const products = [

    {

        name: "Advanced Care Tablets",

        category: "tablets",

        description:
            "High-quality pharmaceutical tablets developed with advanced manufacturing standards.",

        icon: "pill"

    },

    {

        name: "Precision Capsules",

        category: "capsules",

        description:
            "Reliable capsule formulations manufactured with strict quality control.",

        icon: "capsule"

    },

    {

        name: "Healthcare Syrup",

        category: "syrups",

        description:
            "Carefully formulated liquid healthcare solutions.",

        icon: "flask-conical"

    },

    {

        name: "Medical Device Series",

        category: "devices",

        description:
            "Modern medical devices designed for healthcare professionals.",

        icon: "stethoscope"

    },

    {

        name: "Vitality Capsules",

        category: "capsules",

        description:
            "Premium healthcare formulations focused on everyday wellness.",

        icon: "heart-pulse"

    },

    {

        name: "Advanced Tablet Series",

        category: "tablets",

        description:
            "Consistent and carefully manufactured pharmaceutical products.",

        icon: "activity"

    }

];


const productsGrid =
    document.getElementById("productsGrid");


function renderProducts(filter = "all") {

    productsGrid.innerHTML = "";

    const filteredProducts =
        filter === "all"
            ? products
            : products.filter(product =>
                product.category === filter
            );


    filteredProducts.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div class="product-image">

                <i data-lucide="${product.icon}"
                   size="60">
                </i>

            </div>

            <h3>
                ${product.name}
            </h3>

            <p>
                ${product.description}
            </p>

        `;


        card.addEventListener("click", () => {

            openProductModal(product);

        });


        productsGrid.appendChild(card);

    });


    lucide.createIcons();

}


renderProducts();


/* =========================
   PRODUCT FILTER
========================= */

document.querySelectorAll(".filter-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            document.querySelectorAll(".filter-btn")
                .forEach(btn =>
                    btn.classList.remove("active")
                );


            button.classList.add("active");


            renderProducts(
                button.dataset.filter
            );

        });

    });


/* =========================
   PRODUCT MODAL
========================= */

const modal =
    document.getElementById("productModal");

const modalBody =
    document.getElementById("modalBody");

const modalClose =
    document.getElementById("modalClose");


function openProductModal(product) {

    modalBody.innerHTML = `

        <div class="product-image">

            <i data-lucide="${product.icon}"
               size="80">
            </i>

        </div>

        <h2>
            ${product.name}
        </h2>

        <p>
            ${product.description}
        </p>

        <br>

        <strong>
            Category:
        </strong>

        ${product.category.toUpperCase()}

    `;


    modal.classList.add("show");

    lucide.createIcons();

}


modalClose.addEventListener("click", () => {

    modal.classList.remove("show");

});


modal.addEventListener("click", (event) => {

    if (event.target === modal) {

        modal.classList.remove("show");

    }

});


/* =========================
   CONTACT FORM
========================= */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const button =
        contactForm.querySelector("button");

    button.innerHTML =
        "Sending Message...";

    button.disabled = true;


    setTimeout(() => {

        alert(
            "Thank you! Your message has been submitted successfully."
        );


        contactForm.reset();

        button.innerHTML =
            `Send Message <i data-lucide="send"></i>`;

        button.disabled = false;

        lucide.createIcons();

    }, 1500);

});


/* =========================
   THREE.JS 3D HERO
========================= */

const container =
    document.getElementById("hero3D");


const scene =
    new THREE.Scene();


const camera =
    new THREE.PerspectiveCamera(

        45,

        container.clientWidth /
        container.clientHeight,

        0.1,

        1000

    );


camera.position.z = 8;


const renderer =
    new THREE.WebGLRenderer({

        alpha: true,

        antialias: true

    });


renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);


renderer.setSize(

    container.clientWidth,

    container.clientHeight

);


container.appendChild(
    renderer.domElement
);


/* =========================
   LIGHTING
========================= */

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        1.5
    );


scene.add(ambientLight);


const pointLight =
    new THREE.PointLight(
        0x00d9ff,
        3,
        100
    );


pointLight.position.set(
    4,
    3,
    5
);


scene.add(pointLight);


/* =========================
   MAIN 3D MOLECULE
========================= */

const geometry =
    new THREE.IcosahedronGeometry(
        2.2,
        2
    );


const material =
    new THREE.MeshPhysicalMaterial({

        color: 0x00bfe8,

        metalness: 0.7,

        roughness: 0.15,

        transparent: true,

        opacity: 0.85,

        transmission: 0.2

    });


const molecule =
    new THREE.Mesh(
        geometry,
        material
    );


scene.add(molecule);


/* =========================
   WIREFRAME
========================= */

const wireGeometry =
    new THREE.IcosahedronGeometry(
        2.5,
        2
    );


const wireMaterial =
    new THREE.MeshBasicMaterial({

        color: 0x70e8ff,

        wireframe: true,

        transparent: true,

        opacity: 0.2

    });


const wire =
    new THREE.Mesh(
        wireGeometry,
        wireMaterial
    );


scene.add(wire);


/* =========================
   PARTICLES
========================= */

const particleGeometry =
    new THREE.BufferGeometry();


const particleCount = 350;


const particlePositions =
    new Float32Array(
        particleCount * 3
    );


for (let i = 0; i < particleCount * 3; i++) {

    particlePositions[i] =
        (Math.random() - 0.5) * 15;

}


particleGeometry.setAttribute(

    "position",

    new THREE.BufferAttribute(

        particlePositions,

        3

    )

);


const particleMaterial =
    new THREE.PointsMaterial({

        color: 0x00bfe8,

        size: 0.035,

        transparent: true,

        opacity: 0.8

    });


const particles =
    new THREE.Points(

        particleGeometry,

        particleMaterial

    );


scene.add(particles);


/* =========================
   MOUSE INTERACTION
========================= */

let mouseX = 0;

let mouseY = 0;


window.addEventListener(
    "mousemove",
    (event) => {

        mouseX =
            (event.clientX /
                window.innerWidth -
                0.5) *
            2;


        mouseY =
            (event.clientY /
                window.innerHeight -
                0.5) *
            2;

    }
);


/* =========================
   ANIMATION
========================= */

function animate() {

    requestAnimationFrame(
        animate
    );


    molecule.rotation.x += 0.003;

    molecule.rotation.y += 0.005;


    wire.rotation.x -= 0.002;

    wire.rotation.y -= 0.003;


    particles.rotation.y += 0.0005;


    molecule.position.x +=
        (mouseX * 0.5 -
            molecule.position.x) *
        0.03;


    molecule.position.y +=
        (-mouseY * 0.5 -
            molecule.position.y) *
        0.03;


    renderer.render(
        scene,
        camera
    );

}


animate();


/* =========================
   RESIZE
========================= */

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            container.clientWidth /
            container.clientHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(

            container.clientWidth,

            container.clientHeight

        );

    }
);


/* =========================
   GSAP ANIMATIONS
========================= */

gsap.registerPlugin(
    ScrollTrigger
);


gsap.from(".hero-content > *", {

    opacity: 0,

    y: 40,

    duration: 1,

    stagger: 0.15,

    ease: "power3.out"

});


gsap.utils.toArray(".section-heading").forEach(section => {

    gsap.from(section, {

        scrollTrigger: {

            trigger: section,

            start: "top 80%"

        },

        opacity: 0,

        y: 50,

        duration: 1

    });

});


gsap.utils.toArray(".process-card, .quality-card, .about-card, .product-card")
    .forEach(card => {

        gsap.from(card, {

            scrollTrigger: {

                trigger: card,

                start: "top 90%"

            },

            opacity: 0,

            y: 40,

            duration: 0.7

        });

    });