(() => {
  const periodValues = ["Mei 2025", "Juni 2025", "Juli 2025"];
  const branchValues = ["Semua Cabang", "Jakarta Selatan", "Bandung", "Surabaya"];
  const zoomValues = [25, 50, 75, 100, 125, 150, 200];

  const toast = document.querySelector("[data-dv-toast]");
  const candidateSelect = document.querySelector("[data-candidate-select]");
  const documentSelect = document.querySelector("[data-document-select]");
  const zoomSelect = document.querySelector("[data-zoom-select]");
  const zoomTarget = document.querySelector("[data-zoom-target]");

  const state = {
    period: 0,
    branch: 0,
    selectedDoc: "KTP",
    zoom: 100
  };

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function setFilter(type) {
    const values = type === "period" ? periodValues : branchValues;
    state[type] = (state[type] + 1) % values.length;
    const label = document.querySelector(`[data-filter-value="${type}"]`);
    if (label) label.textContent = values[state[type]];
    showToast(`${type === "period" ? "Periode" : "Cabang"} diubah ke ${values[state[type]]}.`);
  }

  function setCandidate(index) {
    if (!candidateSelect) return;
    const nextIndex = (index + candidateSelect.options.length) % candidateSelect.options.length;
    candidateSelect.selectedIndex = nextIndex;
    showToast(`Menampilkan kandidat ${candidateSelect.value}.`);
  }

  function selectDocument(docName) {
    state.selectedDoc = docName;
    document.querySelectorAll("[data-doc-row]").forEach((row) => {
      row.classList.toggle("selected", row.dataset.doc === docName);
    });
    if (documentSelect && documentSelect.value !== docName) {
      const option = Array.from(documentSelect.options).find((item) => item.value === docName);
      if (option) documentSelect.value = docName;
    }
    showToast(`Preview dokumen ${docName} dipilih.`);
  }

  function statusMarkup(status) {
    const map = {
      verified: ["verified", "Verified"],
      revision: ["revision", "Need Revision"],
      rejected: ["rejected", "Rejected"],
      pending: ["pending", "Pending"]
    };
    const [className, label] = map[status] || map.pending;
    return `<span class="pill ${className}">${label}</span>`;
  }

  function updateSelectedStatus(status) {
    const selectedRow = document.querySelector(`[data-doc-row][data-doc="${state.selectedDoc}"]`);
    const statusCell = selectedRow?.querySelector("[data-status-cell]");
    if (statusCell) statusCell.innerHTML = statusMarkup(status);
  }

  function approveAllDocuments() {
    document.querySelectorAll("[data-status-cell]").forEach((cell) => {
      cell.innerHTML = statusMarkup("verified");
    });
    showToast("Semua dokumen berhasil ditandai Verified.");
  }

  function handleAction(action) {
    if (action === "approve-all") {
      approveAllDocuments();
      return;
    }
    updateSelectedStatus(action);
    const label = action === "verified" ? "Verified" : action === "revision" ? "Need Revision" : "Rejected";
    showToast(`${state.selectedDoc} ditandai ${label}.`);
  }

  function setZoom(value, silent = false) {
    const nearest = zoomValues.reduce((best, item) => (
      Math.abs(item - value) < Math.abs(best - value) ? item : best
    ), zoomValues[0]);
    state.zoom = nearest;
    if (zoomSelect) zoomSelect.value = String(nearest);
    if (zoomTarget) {
      zoomTarget.style.transform = `scale(${nearest / 100})`;
      zoomTarget.style.transformOrigin = "top left";
    }
    if (!silent) showToast(`Zoom preview ${nearest}%.`);
  }

  function syncSidebarChevrons() {
    document.querySelectorAll(".agent-menu-group").forEach((group) => {
      const chevron = group.querySelector(".agent-chevron");
      if (!chevron) return;
      chevron.textContent = group.classList.contains("collapsed") ? "v" : "^";
    });
  }

  document.addEventListener("click", (event) => {
    const head = event.target.closest?.(".agent-group-head");
    if (!head) return;
    const group = head.closest(".agent-menu-group");
    if (!group) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    group.classList.toggle("collapsed");
    syncSidebarChevrons();
  }, true);

  document.querySelectorAll('.agent-menu a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const label = link.textContent.trim().replace(/\s+/g, " ");
      showToast(`${label} belum memiliki halaman di prototype ini.`);
    });
  });

  document.querySelectorAll("[data-cycle-filter]").forEach((button) => {
    button.addEventListener("click", () => setFilter(button.dataset.cycleFilter));
  });

  document.querySelector("[data-candidate-prev]")?.addEventListener("click", () => {
    setCandidate((candidateSelect?.selectedIndex || 0) - 1);
  });

  document.querySelector("[data-candidate-next]")?.addEventListener("click", () => {
    setCandidate((candidateSelect?.selectedIndex || 0) + 1);
  });

  candidateSelect?.addEventListener("change", () => showToast(`Menampilkan kandidat ${candidateSelect.value}.`));

  documentSelect?.addEventListener("change", () => selectDocument(documentSelect.value));

  document.querySelectorAll("[data-doc-row]").forEach((row) => {
    row.addEventListener("click", () => selectDocument(row.dataset.doc));
  });

  document.querySelectorAll("[data-doc-action]").forEach((button) => {
    button.addEventListener("click", () => handleAction(button.dataset.docAction));
  });

  document.querySelector("[data-zoom-out]")?.addEventListener("click", () => setZoom(state.zoom - 25));
  document.querySelector("[data-zoom-in]")?.addEventListener("click", () => setZoom(state.zoom + 25));
  zoomSelect?.addEventListener("change", () => setZoom(Number(zoomSelect.value)));

  document.querySelector("[data-download-preview]")?.addEventListener("click", () => {
    showToast("Preview dokumen siap diunduh.");
  });

  syncSidebarChevrons();
  setZoom(100, true);
})();
