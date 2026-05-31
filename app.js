const applicationForms = document.querySelectorAll("[data-application-form]");
const trackLinks = document.querySelectorAll("[data-apply-track]");
const workerRegistrationForms = document.querySelectorAll("[data-worker-registration-form]");

trackLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const track = link.dataset.applyTrack || "";
    window.setTimeout(() => {
      const trackSelect = document.querySelector('select[name="track"]');
      if (trackSelect && track) {
        trackSelect.value = track;
        trackSelect.focus({ preventScroll: true });
      }
    }, 80);
  });
});

applicationForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const defaultTrack = form.dataset.defaultTrack || "";
    const applicant = {
      name: String(data.get("name") || "").trim(),
      whatsapp: String(data.get("whatsapp") || "").replace(/[^\d+]/g, ""),
      email: String(data.get("email") || "").trim(),
      location: String(data.get("location") || "").trim(),
      track: String(data.get("track") || defaultTrack).trim(),
      source: String(data.get("source") || "").trim(),
      note: String(data.get("note") || "").trim(),
    };

    if (!applicant.name || !applicant.whatsapp || !applicant.location || !applicant.track) {
      alert("Please complete your name, WhatsApp number, location, and selected sales track.");
      return;
    }

    const message = [
      "NEW COMMISSION SALES APPLICATION",
      "",
      `Selected track: ${applicant.track}`,
      `Name: ${applicant.name}`,
      `WhatsApp: ${applicant.whatsapp}`,
      `Email: ${applicant.email || "Not provided"}`,
      `Location: ${applicant.location}`,
      `Heard from: ${applicant.source || "Not specified"}`,
      `Notes: ${applicant.note || "Not specified"}`,
    ].join("\n");

    const primaryWhatsApp = "260973028342";
    const url = `https://wa.me/${primaryWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    const success =
      form.querySelector("[data-form-success]") ||
      form.parentElement?.querySelector("[data-form-success]");
    if (success) {
      success.style.display = "block";
    }
    form.reset();
  });
});

function setWorkerMessage(form, message, isError = false) {
  const container = form.closest(".form-card") || document;
  const messageBox = container.querySelector("[data-worker-message]");
  if (!messageBox) {
    return;
  }

  messageBox.textContent = message;
  messageBox.style.display = "block";
  messageBox.classList.toggle("error", isError);
}

workerRegistrationForms.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const payload = {
      fullName: String(data.get("fullName") || "").trim(),
      email: String(data.get("email") || "").trim(),
      whatsapp: String(data.get("whatsapp") || "").trim(),
      consent: data.get("consent") === "on",
    };

    if (!payload.fullName || !payload.email || !payload.whatsapp || !payload.consent) {
      setWorkerMessage(form, "Please complete every required field before submitting.", true);
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
    }

    try {
      const response = await fetch("api/worker-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Registration could not be saved.");
      }

      const container = form.closest(".form-card") || document;
      const employeeResult = container.querySelector("[data-employee-result]");
      const employeeNumber = container.querySelector("[data-employee-number]");

      if (employeeNumber) {
        employeeNumber.textContent = result.employeeNumber;
      }

      if (employeeResult) {
        employeeResult.hidden = false;
      }

      setWorkerMessage(form, "Registration received. Your employee number has been assigned.");
      form.reset();
    } catch (error) {
      setWorkerMessage(
        form,
        error.message || "Registration service is temporarily unavailable. Please try again shortly.",
        true
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Submit Registration";
      }
    }
  });
});
