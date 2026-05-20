const applicationForms = document.querySelectorAll("[data-application-form]");
const trackLinks = document.querySelectorAll("[data-apply-track]");

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
