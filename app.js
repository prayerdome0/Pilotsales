const applicationForms = document.querySelectorAll("[data-application-form]");
const trackLinks = document.querySelectorAll("[data-apply-track]");
const workerRegistrationForms = document.querySelectorAll("[data-worker-registration-form]");
const salesApplicantForms = document.querySelectorAll("[data-sales-applicant-intake-form]");

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
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const payload = {
      fullName: String(data.get("name") || "").trim(),
      whatsapp: String(data.get("whatsapp") || "").replace(/[^\d+]/g, ""),
      email: String(data.get("email") || "").trim(),
      location: String(data.get("location") || "").trim(),
      salesExperience: String(data.get("note") || "").trim(),
      availability: "Quick application - needs review",
      readiness: "Need more information first",
      sourceChannel: String(data.get("source") || "Public quick application").trim(),
      notes: String(data.get("note") || "").trim(),
      consent: data.get("consent") === "on",
      pseWebsite: String(data.get("pseWebsite") || "").trim(),
    };

    if (!payload.fullName || !payload.whatsapp || !payload.email || !payload.location || !payload.consent) {
      alert("Please complete your name, WhatsApp number, email, location, and consent.");
      return;
    }

    const success =
      form.querySelector("[data-form-success]") ||
      form.parentElement?.querySelector("[data-form-success]");
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
    }

    try {
      const response = await fetch("api/sales-applicant-intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Applicant intake could not be saved.");
      }

      if (success) {
        success.textContent = `Application received. Reference ${result.applicationId}. PSE will assign the sales field internally.`;
        success.style.display = "block";
        success.classList.remove("error");
      }
      form.reset();
    } catch (error) {
      if (success) {
        success.textContent = error.message || "Applicant intake is temporarily unavailable. Please try again shortly.";
        success.style.display = "block";
        success.classList.add("error");
      } else {
        alert(error.message || "Applicant intake is temporarily unavailable. Please try again shortly.");
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Submit Quick Application";
      }
    }
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

function setSalesApplicantMessage(form, message, isError = false) {
  const container = form.closest(".form-card") || document;
  const messageBox = container.querySelector("[data-sales-applicant-message]");
  if (!messageBox) {
    return;
  }

  messageBox.textContent = message;
  messageBox.style.display = "block";
  messageBox.classList.toggle("error", isError);
}

salesApplicantForms.forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const payload = {
      fullName: String(data.get("fullName") || "").trim(),
      whatsapp: String(data.get("whatsapp") || "").trim(),
      email: String(data.get("email") || "").trim(),
      location: String(data.get("location") || "").trim(),
      timeZone: String(data.get("timeZone") || "").trim(),
      preferredLanguage: String(data.get("preferredLanguage") || "").trim(),
      startDate: String(data.get("startDate") || "").trim(),
      salesExperience: String(data.get("salesExperience") || "").trim(),
      doorToDoorComfort: String(data.get("doorToDoorComfort") || "").trim(),
      phoneDmComfort: String(data.get("phoneDmComfort") || "").trim(),
      b2bComfort: String(data.get("b2bComfort") || "").trim(),
      homeownerComfort: String(data.get("homeownerComfort") || "").trim(),
      availability: String(data.get("availability") || "").trim(),
      readiness: String(data.get("readiness") || "").trim(),
      transportation: String(data.get("transportation") || "").trim(),
      internetEquipment: String(data.get("internetEquipment") || "").trim(),
      socialProfile: String(data.get("socialProfile") || "").trim(),
      licensesCertifications: String(data.get("licensesCertifications") || "").trim(),
      proofLinks: String(data.get("proofLinks") || "").trim(),
      whyPse: String(data.get("whyPse") || "").trim(),
      bestContactTime: String(data.get("bestContactTime") || "").trim(),
      sourceChannel: String(data.get("sourceChannel") || "").trim(),
      notes: String(data.get("notes") || "").trim(),
      consent: data.get("consent") === "on",
      pseWebsite: String(data.get("pseWebsite") || "").trim(),
    };

    if (
      !payload.fullName ||
      !payload.whatsapp ||
      !payload.email ||
      !payload.location ||
      !payload.availability ||
      !payload.readiness ||
      !payload.consent
    ) {
      setSalesApplicantMessage(form, "Please complete every required field before submitting.", true);
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
    }

    try {
      const response = await fetch("api/sales-applicant-intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Applicant intake could not be saved.");
      }

      setSalesApplicantMessage(
        form,
        `Application received. Reference ${result.applicationId}. PSE will review and assign the best-fit sales field internally.`
      );
      form.reset();
    } catch (error) {
      setSalesApplicantMessage(
        form,
        error.message || "Applicant intake is temporarily unavailable. Please try again shortly.",
        true
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Submit Application";
      }
    }
  });
});
