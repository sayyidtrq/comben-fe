(() => {
  const toast = document.querySelector("[data-mutation-toast]");
  const state = {
    pending: 24,
    documentRemoved: false
  };

  const currentValues = {
    branch: "Bandung",
    channel: "Agency",
    position: "Agen",
    upline: "Rudi Pratama - AGT-000789"
  };

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
    if (!silent) showToast(`${type === "period" ? "Periode" : "Filter cabang"} diubah ke ${value}.`);
  }

  function formatDate(dateValue) {
    if (!dateValue) return "22 Mei 2025";
    const [year, month, day] = dateValue.split("-");
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
      "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
    ];
    return `${Number(day)} ${monthNames[Number(month) - 1]} ${year}`;
  }

  function setSummaryValue(scope, key, value) {
    const target = document.querySelector(`[data-summary-${scope}="${key}"]`);
    if (!target) return;
    if (key === "upline") {
      const [name, code] = value.split(" - ");
      target.innerHTML = `${name}<br><small>${code || ""}</small>`;
      return;
    }
    target.textContent = value;
  }

  function updateSummary() {
    Object.entries(currentValues).forEach(([key, value]) => setSummaryValue("before", key, value));
    document.querySelectorAll("[data-new-field]").forEach((field) => {
      setSummaryValue("after", field.dataset.newField, field.value);
    });
    const date = document.querySelector("[data-effective-date]")?.value;
    const dateLabel = document.querySelector("[data-summary-date]");
    if (dateLabel) dateLabel.textContent = formatDate(date);
  }

  function mutationChangeText() {
    const type = document.querySelector("[data-mutation-type]")?.value || "Perubahan Cabang";
    const map = {
      "Perubahan Cabang": ["branch", "Cabang"],
      "Perubahan Posisi": ["position", "Posisi"],
      "Perubahan Upline": ["upline", "Upline"],
      "Perubahan Channel": ["channel", "Channel"]
    };
    const [key, label] = map[type] || map["Perubahan Cabang"];
    const nextField = document.querySelector(`[data-new-field="${key}"]`);
    const nextValue = nextField?.value || "";
    return `${label}: ${currentValues[key]} -> ${nextValue}`;
  }

  function selectedAgent() {
    const raw = document.querySelector("[data-agent-select]")?.value || "Dewi Sartika|AGT-000456|Aktif";
    const [name, code, status] = raw.split("|");
    return { name, code, status };
  }

  function updateReasonCount() {
    const reason = document.querySelector("[data-mutation-reason]");
    const counter = document.querySelector("[data-reason-count]");
    if (reason && counter) counter.textContent = String(reason.value.length);
  }

  function validateForm() {
    const required = [
      document.querySelector("[data-agent-select]"),
      document.querySelector("[data-mutation-type]"),
      ...document.querySelectorAll("[data-new-field]"),
      document.querySelector("[data-effective-date]"),
      document.querySelector("[data-mutation-reason]")
    ].filter(Boolean);

    const invalid = required.filter((field) => !String(field.value || "").trim());
    required.forEach((field) => {
      field.style.borderColor = invalid.includes(field) ? "#f04454" : "";
    });
    return invalid.length === 0;
  }

  function addHistoryRow() {
    const body = document.querySelector("[data-history-body]");
    if (!body) return;
    const agent = selectedAgent();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>22 Mei 2025</td>
      <td>${document.querySelector("[data-mutation-type]")?.value || "Perubahan Cabang"}</td>
      <td>${mutationChangeText()}</td>
      <td>${formatDate(document.querySelector("[data-effective-date]")?.value)}</td>
      <td><span class="mut-pill pending">Menunggu</span></td>
      <td><b>${agent.name}</b><small>${agent.code}</small></td>
    `;
    body.prepend(row);
  }

  function resetForm() {
    const form = document.querySelector("[data-mutation-form]");
    form?.reset();
    const doc = document.querySelector(".support-doc");
    if (doc) doc.hidden = false;
    state.documentRemoved = false;
    updateReasonCount();
    updateSummary();
    showToast("Form permintaan mutasi dikembalikan ke data awal.");
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

  document.querySelector("[data-mutation-search]")?.addEventListener("input", (event) => {
    const value = event.target.value.trim();
    if (value.length >= 3) showToast(`Mencari "${value}" di data mutasi agen.`);
  });

  document.querySelectorAll("[data-new-field], [data-effective-date], [data-mutation-type]").forEach((field) => {
    field.addEventListener("change", updateSummary);
  });

  document.querySelector("[data-mutation-reason]")?.addEventListener("input", updateReasonCount);

  document.querySelector("[data-remove-document]")?.addEventListener("click", () => {
    const doc = document.querySelector(".support-doc");
    if (doc) doc.hidden = true;
    state.documentRemoved = true;
    showToast("Dokumen pendukung dihapus dari draft permintaan.");
  });

  document.querySelector("[data-reset-form]")?.addEventListener("click", resetForm);

  document.querySelector("[data-show-all-history]")?.addEventListener("click", () => {
    showToast("Menampilkan semua riwayat mutasi agen.");
  });

  document.querySelector("[data-mutation-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateForm()) {
      showToast("Lengkapi field wajib sebelum mengirim permintaan.");
      return;
    }

    state.pending += 1;
    const pending = document.querySelector("[data-metric-pending]");
    if (pending) pending.textContent = String(state.pending);
    addHistoryRow();
    showToast(state.documentRemoved
      ? "Permintaan dikirim tanpa dokumen pendukung."
      : "Permintaan mutasi berhasil dikirim untuk persetujuan.");
  });

  document.addEventListener("click", () => closeDropdowns());
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDropdowns();
  });

  setFilterOption("period", "Mei 2025", true);
  setFilterOption("branch", "Semua Cabang", true);
  updateReasonCount();
  updateSummary();
})();
