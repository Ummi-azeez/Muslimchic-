document.addEventListener("DOMContentLoaded", () => {
    // Initialize cart from Local Storage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to Update Cart Count in Navigation Bar
    function updateCartCount() {
        const cartCountElement = document.querySelector(".cart-count");
        if (cartCountElement) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = totalItems;
        }
    }

    // Function to Add an Item to Cart
    function addToCart(product) {
        const existingProduct = cart.find(item => item.name === product.name);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        // Save Cart to Local Storage
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} has been added to your cart!`);
        updateCartCount();
    }

    // Set Up Event Listeners for Add to Cart Buttons
    const productButtons = document.querySelectorAll(".product .btn");
    productButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productCard = button.parentElement;
            const productName = productCard.querySelector("h3").textContent;
            const productPrice = parseInt(
                productCard.querySelector("p").textContent.replace("₦", "").replace(",", "")
            );
            const productImage = productCard.querySelector("img").src;

            addToCart({ name: productName, price: productPrice, image: productImage });
        });
    });

    // Form Validation for All Pages
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        form.addEventListener("submit", (e) => {
            const inputs = form.querySelectorAll("input[required], textarea[required]");
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    alert(`Please fill in the required field: ${input.previousElementSibling.textContent}`);
                    input.focus();
                    e.preventDefault();
                }
            });

            if (isValid) {
                alert("Form submitted successfully!");
            }
        });
    });

    // Smooth Scroll for Navigation and Footer Links
    const smoothLinks = document.querySelectorAll("a[href^='#']");
    smoothLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Interactive Hover Effects for Team and Product Cards
    const interactiveCards = document.querySelectorAll(".team-member, .product");
    interactiveCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
            card.style.transform = "scale(1.05)";
        });

        card.addEventListener("mouseleave", () => {
            card.style.boxShadow = "none";
            card.style.transform = "scale(1)";
        });
    });

    // Logout Functionality for Account Page
    const logoutButton = document.querySelector(".btn[onclick='logoutUser()']");
    if (logoutButton) {
        window.logoutUser = function () {
            alert("You have been logged out.");
            window.location.href = "login.html";
        };
    }

    // Ambassador Scroll to Application Section
    const applyNowButton = document.querySelector(".ambassador-hero .btn");
    if (applyNowButton) {
        applyNowButton.addEventListener("click", (e) => {
            const applySection = document.querySelector("#apply-now");
            if (applySection) {
                e.preventDefault();
                applySection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    // Initialize Cart Count on Page Load
    updateCartCount();
});
