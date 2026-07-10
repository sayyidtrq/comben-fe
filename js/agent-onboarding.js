(() => {
  const toast = document.querySelector("[data-onboarding-toast]");
  const state = { codeSeed: 124 };

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2400);
  }

  function closeDropdowns(exceptType = "") {
    document.querySelectorAll("[data-dropdown]").forEach((dropdown) => {
      if (dropdown.dataset.dropdown === exceptType) return;
      dropdown.classList.remove("open");
      dropdown.querySelector("[data-dropdown-toggle]")?.setAttribute("aria-expanded", "false");
    });
  }

  function toggleDropdown(type) {
    const dropdown = document.querySelector(`[data-dropdown="${type}"]`);
    if (!dropdown) return;
    const open = !dropdown.classList.contains("open");
    closeDropdowns(type);
    dropdown.classList.toggle("open", open);
    dropdown.querySelector("[data-dropdown-toggle]")?.setAttribute("aria-expanded", String(open));
  }

  function setFilterOption(type, value, silent = false) {
    const label = document.querySelector(`[data-filter-value="${type}"]`);
    if (label) label.textContent = value;
    document.querySelectorAll(`[data-filter-option="${type}"]`).forEach((option) => {
      option.classList.toggle("active", option.dataset.value === value);
    });
    closeDropdowns();
    if (!silent) showToast(`${type === "period" ? "Periode" : "Filter lokasi"} diubah ke ${value}.`);
  }

  function updateChecklist(scope, countSelector, progressSelector) {
    const list = document.querySelector(scope);
    if (!list) return;
    const checks = Array.from(list.querySelectorAll('input[type="checkbox"]'));
    const done = checks.filter((item) => item.checked).length;
    const total = checks.length || 1;
    const counter = document.querySelector(countSelector);
    const progress = progressSelector ? document.querySelector(progressSelector) : null;

    if (counter) counter.textContent = `${done} / ${total} ${scope.includes("training") ? "Selesai" : "Lengkap"}`;
    if (progress) progress.style.width = `${Math.round((done / total) * 100)}%`;

    checks.forEach((item) => {
      const em = item.closest("label")?.querySelector("em");
      if (!em) return;
      em.textContent = item.checked
        ? (scope.includes("training") ? "Selesai 22 Mei 2025" : "Selesai")
        : (scope.includes("training") ? "Belum selesai" : "Belum diunggah");
    });

    updateSummary();
  }

  function updateSummary() {
    const checks = Array.from(document.querySelectorAll('.check-list input[type="checkbox"]'));
    const done = checks.filter((item) => item.checked).length;
    const total = checks.length || 1;
    const percent = Math.round((done / total) * 100);
    const percentEl = document.querySelector("[data-progress-percent]");
    const readiness = document.querySelector("[data-readiness-score]");
    const donut = document.querySelector(".donut");

    if (percentEl) percentEl.textContent = `${percent}%`;
    if (readiness) readiness.textContent = String(Math.min(100, 54 + Math.round(percent * 0.4)));
    if (donut) donut.style.setProperty("--value", percent);
  }

  function validateRequiredFields() {
    const fields = Array.from(document.querySelectorAll("[data-required-field]"));
    const invalid = fields.filter((field) => !String(field.value || "").trim());
    invalid.forEach((field) => {
      field.style.borderColor = "#f04454";
    });
    fields.filter((field) => field.value).forEach((field) => {
      field.style.borderColor = "";
    });
    return invalid.length === 0;
  }

  document.querySelectorAll("[data-dropdown-toggle]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleDropdown(button.dataset.dropdownToggle);
    });
  });

  document.querySelectorAll("[data-filter-option]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      setFilterOption(button.dataset.filterOption, button.dataset.value);
    });
  });

  document.querySelectorAll("[data-show-toast]").forEach((button) => {
    button.addEventListener("click", () => showToast(button.dataset.showToast));
  });

  document.querySelector("[data-generate-code]")?.addEventListener("click", () => {
    state.codeSeed += 1;
    const input = document.querySelector("[data-agent-code]");
    if (input) input.value = `AGT-${String(state.codeSeed).padStart(6, "0")}`;
    showToast("Kode agen baru berhasil dibuat.");
  });

  document.querySelector("[data-note]")?.addEventListener("input", (event) => {
    const counter = document.querySelector("[data-char-count]");
    if (counter) counter.textContent = String(event.target.value.length);
  });

  document.querySelectorAll('.check-list input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateChecklist("[data-training-list]", "[data-training-count]", "[data-training-progress]");
      updateChecklist("[data-document-list]", "[data-doc-count]");
      showToast("Progress onboarding diperbarui.");
    });
  });

  document.querySelector("[data-prepare-portal]")?.addEventListener("click", () => {
    const status = document.querySelector("[data-portal-status]");
    if (status) {
      status.textContent = "Siap Aktivasi";
      status.style.background = "#dcf9e8";
      status.style.color = "#14a264";
    }
    showToast("Akun portal disiapkan untuk AGT000124.");
  });

  document.querySelector("[data-save-draft]")?.addEventListener("click", () => showToast("Draft onboarding berhasil disimpan."));

  document.querySelector("[data-submit-onboarding]")?.addEventListener("click", () => {
    if (!validateRequiredFields()) {
      showToast("Lengkapi field wajib sebelum submit.");
      return;
    }
    showToast("Onboarding berhasil dikirim untuk approval.");
  });

  document.querySelector("[data-complete-onboarding]")?.addEventListener("click", () => {
    if (!validateRequiredFields()) {
      showToast("Lengkapi field wajib sebelum menyelesaikan onboarding.");
      return;
    }
    document.querySelectorAll('.check-list input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = true;
    });
    updateChecklist("[data-training-list]", "[data-training-count]", "[data-training-progress]");
    updateChecklist("[data-document-list]", "[data-doc-count]");
    showToast("Onboarding selesai. Progress kini 100%.");
  });

  document.querySelector("[data-global-search]")?.addEventListener("input", (event) => {
    const value = event.target.value.trim();
    if (value.length >= 3) showToast(`Mencari "${value}" di data onboarding.`);
  });

  document.addEventListener("click", () => closeDropdowns());
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDropdowns();
  });

  setFilterOption("period", "Mei 2025", true);
  setFilterOption("branch", "Surabaya", true);
  updateChecklist("[data-training-list]", "[data-training-count]", "[data-training-progress]");
  updateChecklist("[data-document-list]", "[data-doc-count]");
})();
