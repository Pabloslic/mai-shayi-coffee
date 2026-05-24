// Select the hamburger button that opens and closes the mobile navigation.
const menuToggle = document.querySelector(".menu-toggle");

// Select the navigation menu that becomes a dropdown on tablet and mobile screens.
const siteMenu = document.querySelector("#site-menu");

// Listen for clicks on the hamburger button.
menuToggle.addEventListener("click", () => {
  // Toggle the menu's open class and store whether it is now open.
  const isOpen = siteMenu.classList.toggle("is-open");

  // Lock page scrolling while the mobile dropdown is open.
  document.body.classList.toggle("menu-open", isOpen);

  // Animate the hamburger icon into an X when the menu is open.
  menuToggle.classList.toggle("is-active", isOpen);

  // Keep the accessibility state accurate for screen readers.
  menuToggle.setAttribute("aria-expanded", String(isOpen));

  // Change the button label so screen readers know what action the button will perform next.
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

// Close the dropdown menu whenever a user clicks one of the navigation links.
siteMenu.querySelectorAll("a").forEach((link) => {
  // Each link receives the same close-menu behavior.
  link.addEventListener("click", () => {
    // Remove the class that opens the animated dropdown.
    siteMenu.classList.remove("is-open");

    // Allow the page to scroll again after the menu closes.
    document.body.classList.remove("menu-open");

    // Return the hamburger icon from X shape back to three lines.
    menuToggle.classList.remove("is-active");

    // Reset accessibility state after closing the menu.
    menuToggle.setAttribute("aria-expanded", "false");

    // Reset the button label after closing the menu.
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Handle the footer subscribe form without sending data to a server.
document.querySelector(".subscribe").addEventListener("submit", (event) => {
  // Stop the browser from refreshing the page on submit.
  event.preventDefault();

  // Find the email input inside the submitted form.
  const input = event.currentTarget.querySelector("input");

  // Clear the email field after the user submits.
  input.value = "";

  // Show a lightweight confirmation message in the placeholder.
  input.placeholder = "Thanks for subscribing";
});

// Add a blur-to-clear loading effect to every image that uses native lazy loading.
document.querySelectorAll('img[loading="lazy"]').forEach((image) => {
  // Mark the image as loading so CSS can blur and fade it.
  image.classList.add("is-loading");

  // Helper function that swaps the loading style for the loaded style.
  const markLoaded = () => {
    // Remove the blurred loading state.
    image.classList.remove("is-loading");

    // Add the final loaded state with a smooth CSS transition.
    image.classList.add("is-loaded");
  };

  // If the image is already cached and complete, mark it loaded immediately.
  if (image.complete) {
    markLoaded();
  } else {
    // Otherwise, wait for the image to load before clearing the loading style.
    image.addEventListener("load", markLoaded, { once: true });

    // If the image fails, still remove the loading state so it does not stay blurred forever.
    image.addEventListener("error", markLoaded, { once: true });
  }
});

// Select all blocks that should slide in as the user scrolls.
const revealTargets = document.querySelectorAll(
  ".quick-links a, .section-heading, .section-copy, .image-stack img, .product-card, .origin-card, .equipment-grid article, .machine-banner, .gallery-grid img, .services article, .press article, .contact article"
);

// Assign animation classes and small staggered delays to each reveal target.
revealTargets.forEach((target, index) => {
  // Rotate between left, up, and right slide directions for visual variety.
  const direction = index % 3 === 0 ? "slide-in-left" : index % 3 === 1 ? "slide-in-up" : "slide-in-right";

  // Add the base reveal class plus the chosen direction class.
  target.classList.add("reveal", direction);

  // Add a short repeated delay pattern so nearby cards do not animate all at once.
  target.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
});

// IntersectionObserver detects when reveal targets enter the viewport.
const revealObserver = new IntersectionObserver(
  // The callback runs whenever observed elements cross the visibility threshold.
  (entries) => {
    // Check each observed element that changed visibility.
    entries.forEach((entry) => {
      // Ignore elements that have not entered the viewport yet.
      if (!entry.isIntersecting) {
        return;
      }

      // Add the visible class so CSS plays the slide-in animation.
      entry.target.classList.add("is-visible");

      // Stop observing once the animation has played to avoid repeated work.
      revealObserver.unobserve(entry.target);
    });
  },
  {
    // Use the browser viewport as the observation area.
    root: null,

    // Trigger once about 16% of the element is visible.
    threshold: 0.16,

    // Start the animation slightly before the element reaches the very bottom of the viewport.
    rootMargin: "0px 0px -40px 0px",
  }
);

// Start observing every target that should animate on scroll.
revealTargets.forEach((target) => revealObserver.observe(target));
