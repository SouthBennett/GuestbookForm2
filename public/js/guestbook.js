document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("guest-book-form");

  form.addEventListener("submit", (e) => {
    let isValid = true;

    // First Name Validation
    const fname = document.getElementById("fname").value.trim();
    if (fname === "") {
      document.getElementById("err-fname").textContent =
        "First name is required.";
      isValid = false;
    } else {
      document.getElementById("err-fname").textContent = "";
    }

    // Last Name Validation
    const lname = document.getElementById("lname").value.trim();
    if (lname === "") {
      document.getElementById("err-lname").textContent =
        "Last name is required.";
      isValid = false;
    } else {
      document.getElementById("err-lname").textContent = "";
    }

    //Validate Email
    const email = document.getElementById("email").value.trim();

    if (email !== "") {
      if (!email.includes("@") || !email.includes(".")) {
        document.getElementById("err-email").textContent =
          "Email must include '@' and a dot (.)";
        isValid == false;
      } else {
        document.getElementById("err-email").textContent = "";
      }
    } else {
      document.getElementById("err-email").textContent = "";
    }

    // Mailing list dependency
    const mailingListChecked = document.getElementById("mailing-list").checked;
    const emailVal = document.getElementById("email").value.trim();

    // If mailing list is checked, email is required
    if (mailingListChecked) {
      if (emailVal === "") {
        document.getElementById("err-mailing-list").textContent =
          "Email is required if you join the mailing list.";
        isValid = false;
      } else {
        document.getElementById("err-mailing-list").textContent = "";
      }
    } else {
      document.getElementById("err-mailing-list").textContent = "";
    }

    // LinkedIn Validation (if user has linkedin it must start with "https://linkedin.com/in/")
    const linkedin = document.getElementById("linkedin-url").value.trim();

    if (linkedin !== "") {
      if (!linkedin.startsWith("https://linkedin.com/in/")) {
        document.getElementById("err-linkedin").textContent =
          'Must start Linkedin URL with "https://linkedin.com/in/" ';
        isValid = false;
      } else {
        document.getElementById("err-linkedin").textContent = "";
      }
    } else {
      // Clear existing errors if the field is left blank
      document.getElementById("err-linkedin").textContent = "";
    }

    // Connection validation
    const connection = document.getElementById("connection").value;
    const otherField = document.getElementById("other");
    const otherWrapper = document.getElementById("other-wrapper");

    // Requires the user to select a how we met option
    if (connection === "none" || connection === "") {
      document.getElementById("err-connection").textContent =
        "Select how we met";
      isValid = false;
    } else {
      document.getElementById("err-connection").textContent = "";
    }

    // Toggle "Other" field visibility
    if (connection === "Other") {
      otherWrapper.classList.remove("hidden");

      // If other is selected, require input
      if (otherField.value.trim() === "") {
        document.getElementById("err-other").textContent =
          "Please select how we met";
        isValid = false;
      } else {
        document.getElementById("err-other").textContent = "";
      }
    } else {
      otherWrapper.classList.add("hidden");
      document.getElementById("err-other").textContent = "";
    }
    if (!isValid) e.preventDefault();
  });

  // How we met text box if the user selects "Other"
  const connectionSelect = document.getElementById("connection");
  const otherWrapper = document.getElementById("other-wrapper");

  connectionSelect.addEventListener("change", () => {
    if (connectionSelect.value === "Other") {
      otherWrapper.classList.remove("hidden");
    } else {
      otherWrapper.classList.add("hidden");
    }
  });

  // Show or hide Email/Text
  const mailingListCheckbox = document.getElementById("mailing-list");
  const emailSection = document.getElementById("email-section");

  if (!mailingListCheckbox.checked) {
    emailSection.classList.add("hidden");
  }

  // Show HTML and Text buttons when box is checked
  mailingListCheckbox.addEventListener("change", () => {
    if (mailingListCheckbox.checked) {
      emailSection.classList.remove("hidden");
    } else {
      emailSection.classList.add("hidden");
    }
  });
});