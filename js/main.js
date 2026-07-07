const root = document.documentElement;
const sidebarToggle = document.querySelector("[data-sidebar-toggle]");
const sidebar = document.querySelector(".sidebar");

function setSidebarState() {
  const collapsed = localStorage.getItem("comben-sidebar") === "collapsed";
  root.classList.toggle("sidebar-collapsed", collapsed);
}

setSidebarState();

sidebarToggle?.addEventListener("click", () => {
  if (window.matchMedia("(max-width: 980px)").matches) {
    root.classList.toggle("sidebar-open");
    return;
  }

  const nextCollapsed = !root.classList.contains("sidebar-collapsed");
  root.classList.toggle("sidebar-collapsed", nextCollapsed);
  localStorage.setItem("comben-sidebar", nextCollapsed ? "collapsed" : "expanded");
});

document.addEventListener("click", (event) => {
  if (!window.matchMedia("(max-width: 980px)").matches) return;
  if (!root.classList.contains("sidebar-open")) return;
  if (sidebar?.contains(event.target) || sidebarToggle?.contains(event.target)) return;
  root.classList.remove("sidebar-open");
});

document.querySelectorAll(".nav-group-head").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    button.closest(".nav-group")?.classList.toggle("collapsed");
  });
});

const moduleGrid = document.querySelector("[data-module-grid]");
const emptyState = document.querySelector("[data-empty-state]");
const searchInput = document.querySelector("[data-module-search]");
const categorySelect = document.querySelector("[data-category-filter]");
const statusSelect = document.querySelector("[data-status-filter]");
const resetButton = document.querySelector("[data-reset-filter]");

function normalize(value) {
  return String(value || "").toLowerCase().trim();
}

function filterModules() {
  if (!moduleGrid) return;

  const query = normalize(searchInput?.value);
  const category = categorySelect?.value || "all";
  const status = statusSelect?.value || "active";
  let visibleCount = 0;

  moduleGrid.querySelectorAll("[data-module-card]").forEach((card) => {
    const haystack = normalize([
      card.dataset.title,
      card.dataset.description,
      card.dataset.category
    ].join(" "));
    const matchesQuery = !query || haystack.includes(query);
    const matchesCategory = category === "all" || card.dataset.category === category;
    const matchesStatus = status === "all" || card.dataset.status === status;
    const visible = matchesQuery && matchesCategory && matchesStatus;

    card.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  emptyState?.classList.toggle("show", visibleCount === 0);
}

[searchInput, categorySelect, statusSelect].forEach((control) => {
  control?.addEventListener("input", filterModules);
  control?.addEventListener("change", filterModules);
});

resetButton?.addEventListener("click", () => {
  if (searchInput) searchInput.value = "";
  if (categorySelect) categorySelect.value = "all";
  if (statusSelect) statusSelect.value = "active";
  filterModules();
});

filterModules();

const formulaTable = document.querySelector("[data-formula-table]");
const formulaRows = formulaTable ? Array.from(formulaTable.querySelectorAll("[data-formula-row]")) : [];
const formulaSearch = document.querySelector("[data-formula-search]");
const formulaFilters = Array.from(document.querySelectorAll("[data-formula-filter]"));
const advancedColumnFilters = Array.from(document.querySelectorAll("[data-advanced-column-filter]"));
const formulaClear = document.querySelector("[data-formula-clear]");
const formulaRefresh = document.querySelector("[data-refresh-formula]");
const formulaResult = document.querySelector("[data-formula-result]");
const formulaFooter = document.querySelector("[data-formula-footer]");
const formulaEmpty = document.querySelector("[data-formula-empty]");
const pageSize = document.querySelector("[data-page-size]");
const orderBySelect = document.querySelector("[data-order-by]");
const orderDirectionSelect = document.querySelector("[data-order-direction]");
const columnsToggle = document.querySelector("[data-columns-toggle]");
const columnsPopover = document.querySelector("[data-columns-popover]");
const columnToggles = Array.from(document.querySelectorAll("[data-column-toggle]"));
const activeCount = document.querySelector("[data-active-count]");
const draftCount = document.querySelector("[data-draft-count]");
const toast = document.querySelector("[data-toast]");
const filterDrawer = document.querySelector("[data-filter-drawer]");
const periodButton = document.querySelector("[data-open-calendar]");
const periodPopover = document.querySelector("[data-period-popover]");
const periodStart = document.querySelector("[data-period-start]");
const periodEnd = document.querySelector("[data-period-end]");
const modal = document.querySelector("[data-formula-modal]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalSubtitle = document.querySelector("[data-modal-subtitle]");
const formulaForm = document.querySelector("[data-formula-form]");
const saveFormulaButton = document.querySelector("[data-save-formula]");
let activeFormulaRow = null;
let formulaMode = "view";
let sortState = {
  key: orderBySelect?.value || "code",
  direction: orderDirectionSelect?.value || "asc"
};

function getFormulaFilter(name) {
  return document.querySelector(`[data-formula-filter="${name}"]`)?.value || "all";
}

function getAdvancedColumnFilter(name) {
  return document.querySelector(`[data-advanced-column-filter="${name}"]`)?.value || "";
}

function parseDisplayDate(value) {
  if (!value) return 0;
  const datePart = value.trim().split(" ")[0];
  const [month, day, year] = datePart.split("/");
  return new Date(Number(year), Number(month) - 1, Number(day)).getTime();
}

function getSortValue(row, key) {
  if (key === "date") return parseDisplayDate(row.querySelector("td:nth-child(7)")?.textContent);
  if (key === "updated") return parseDisplayDate(row.querySelector("td:nth-child(9)")?.textContent);
  return normalize(row.dataset[key] || "");
}

function matchesColumnFilter(row, key, value) {
  if (!value || value === "all") return true;
  if (key === "date") return row.querySelector("td:nth-child(7)")?.textContent.trim() === toDisplayDate(value);
  if (key === "updatedDate") {
    return row.querySelector("td:nth-child(9)")?.textContent.trim().startsWith(toDisplayDate(value));
  }
  if (key === "updatedBy") {
    return normalize(row.querySelector(".updated-by")?.textContent).includes(normalize(value));
  }
  if (["code", "name"].includes(key)) return normalize(row.dataset[key]).includes(normalize(value));
  return row.dataset[key] === value;
}

function sortFormulaRows(rows) {
  const direction = sortState.direction === "desc" ? -1 : 1;
  return rows.sort((a, b) => {
    const aValue = getSortValue(a, sortState.key);
    const bValue = getSortValue(b, sortState.key);
    if (typeof aValue === "number" || typeof bValue === "number") {
      return ((aValue || 0) - (bValue || 0)) * direction;
    }
    return String(aValue).localeCompare(String(bValue)) * direction;
  });
}

function updateSortIndicators() {
  document.querySelectorAll("[data-sort-key]").forEach((button) => {
    const key = button.dataset.sortKey;
    const icon = document.querySelector(`[data-sort-icon="${key}"]`);
    const active = key === sortState.key;
    button.classList.toggle("active", active);
    if (icon) icon.innerHTML = active ? (sortState.direction === "asc" ? "&uarr;" : "&darr;") : "&#8597;";
  });
  if (orderBySelect) orderBySelect.value = sortState.key;
  if (orderDirectionSelect) orderDirectionSelect.value = sortState.direction;
}

function updateFormulaList() {
  if (!formulaTable) return;

  if (orderBySelect && orderBySelect.value !== sortState.key) {
    sortState.key = orderBySelect.value;
  }
  if (orderDirectionSelect && orderDirectionSelect.value !== sortState.direction) {
    sortState.direction = orderDirectionSelect.value;
  }

  const query = normalize(formulaSearch?.value);
  const filters = {
    product: getFormulaFilter("product"),
    position: getFormulaFilter("position"),
    channel: getFormulaFilter("channel"),
    branch: getFormulaFilter("branch"),
    status: getFormulaFilter("status")
  };
  const advancedFilters = {
    code: getAdvancedColumnFilter("code"),
    name: getAdvancedColumnFilter("name"),
    product: getAdvancedColumnFilter("product"),
    position: getAdvancedColumnFilter("position"),
    channel: getAdvancedColumnFilter("channel"),
    branch: getAdvancedColumnFilter("branch"),
    date: getAdvancedColumnFilter("date"),
    status: getAdvancedColumnFilter("status"),
    updatedBy: getAdvancedColumnFilter("updatedBy"),
    updatedDate: getAdvancedColumnFilter("updatedDate")
  };
  const limit = Number(pageSize?.value || 10);
  let matchCount = 0;
  let visibleCount = 0;
  const matchedRows = [];

  formulaRows.forEach((row) => {
    const searchable = normalize([
      row.dataset.code,
      row.dataset.name,
      row.dataset.product,
      row.dataset.position,
      row.dataset.channel,
      row.dataset.branch,
      row.dataset.status
    ].join(" "));
    const matchesQuery = !query || searchable.includes(query);
    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      return value === "all" || row.dataset[key] === value;
    });
    const matchesAdvancedFilters = Object.entries(advancedFilters).every(([key, value]) => {
      return matchesColumnFilter(row, key, value);
    });
    const matches = matchesQuery && matchesFilters && matchesAdvancedFilters;

    if (matches) matchCount += 1;
    if (matches) matchedRows.push(row);
    row.hidden = true;
  });

  sortFormulaRows(matchedRows).forEach((row) => {
    formulaTable.appendChild(row);
    const visible = visibleCount < limit;
    row.hidden = !visible;
    if (visible) visibleCount += 1;
  });

  const totalText = matchCount === 0
    ? "Showing 0 results"
    : `Showing 1 to ${visibleCount} of ${matchCount} results`;

  if (formulaResult) formulaResult.textContent = totalText;
  if (formulaFooter) formulaFooter.textContent = totalText;
  formulaEmpty?.classList.toggle("show", matchCount === 0);

  if (activeCount && !activeCount.dataset.locked) activeCount.textContent = "128";
  if (draftCount && !draftCount.dataset.locked) draftCount.textContent = "16";
  updateSortIndicators();
}

[formulaSearch, pageSize, orderBySelect, orderDirectionSelect, ...formulaFilters, ...advancedColumnFilters].forEach((control) => {
  control?.addEventListener("input", updateFormulaList);
  control?.addEventListener("change", updateFormulaList);
});

orderBySelect?.addEventListener("change", () => {
  sortState.key = orderBySelect.value;
  updateFormulaList();
});

orderDirectionSelect?.addEventListener("change", () => {
  sortState.direction = orderDirectionSelect.value;
  updateFormulaList();
});

document.querySelectorAll("[data-sort-key]").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.sortKey;
    if (sortState.key === key) {
      sortState.direction = sortState.direction === "asc" ? "desc" : "asc";
    } else {
      sortState.key = key;
      sortState.direction = key === "date" || key === "updated" ? "desc" : "asc";
    }
    if (orderBySelect) orderBySelect.value = sortState.key;
    if (orderDirectionSelect) orderDirectionSelect.value = sortState.direction;
    updateFormulaList();
    showToast(`Ordered by ${button.textContent.trim()} ${sortState.direction === "asc" ? "ascending" : "descending"}.`);
  });
});

formulaClear?.addEventListener("click", () => {
  if (formulaSearch) formulaSearch.value = "";
  formulaFilters.forEach((control) => {
    control.value = "all";
  });
  advancedColumnFilters.forEach((control) => {
    if (control.tagName === "SELECT") control.value = "all";
    if (control.tagName === "INPUT") control.value = "";
  });
  document.querySelectorAll("[data-advanced-filter]").forEach((control) => {
    if (control.type === "checkbox") {
      control.checked = false;
      return;
    }
    if (control.tagName === "SELECT") control.selectedIndex = 0;
    if (control.tagName === "INPUT") control.value = "";
  });
  if (orderBySelect) orderBySelect.value = "code";
  if (orderDirectionSelect) orderDirectionSelect.value = "asc";
  sortState = { key: "code", direction: "asc" };
  updateFormulaList();
});

formulaRefresh?.addEventListener("click", updateFormulaList);

updateFormulaList();

columnsToggle?.addEventListener("click", (event) => {
  event.stopPropagation();
  columnsPopover?.classList.toggle("show");
});

columnToggles.forEach((toggle) => {
  toggle.addEventListener("change", () => {
    const column = toggle.dataset.columnToggle;
    document.querySelectorAll(`[data-column="${column}"]`).forEach((cell) => {
      cell.classList.toggle("column-hidden", !toggle.checked);
    });
    showToast(`${column} column ${toggle.checked ? "ditampilkan" : "disembunyikan"}.`);
  });
});

document.addEventListener("click", (event) => {
  if (!columnsPopover?.classList.contains("show")) return;
  if (columnsPopover.contains(event.target) || columnsToggle?.contains(event.target)) return;
  columnsPopover.classList.remove("show");
});

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function toDateInputValue(value) {
  if (!value) return "2024-01-01";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const [month, day, year] = value.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function toDisplayDate(value) {
  if (!value) return "01/01/2024";
  if (value.includes("/")) return value;
  const [year, month, day] = value.split("-");
  return `${month}/${day}/${year}`;
}

function setDrawer(open) {
  root.classList.toggle("drawer-open", open);
}

document.querySelector("[data-open-filter-drawer]")?.addEventListener("click", () => setDrawer(true));
document.querySelector("[data-close-filter-drawer]")?.addEventListener("click", () => setDrawer(false));
document.querySelector("[data-drawer-backdrop]")?.addEventListener("click", () => setDrawer(false));

document.querySelector("[data-apply-advanced]")?.addEventListener("click", () => {
  updateFormulaList();
  setDrawer(false);
  showToast("Advanced filter diterapkan ke daftar formula.");
});

periodButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  periodPopover?.classList.toggle("show");
});

document.querySelector("[data-apply-period]")?.addEventListener("click", () => {
  const start = toDisplayDate(periodStart?.value);
  const end = toDisplayDate(periodEnd?.value);
  const spans = periodButton?.querySelectorAll("span");
  if (spans?.length >= 3) {
    spans[0].textContent = start;
    spans[2].textContent = end;
  }
  periodPopover?.classList.remove("show");
  showToast(`Effective period diterapkan: ${start} - ${end}.`);
});

document.addEventListener("click", (event) => {
  if (!periodPopover?.classList.contains("show")) return;
  if (periodPopover.contains(event.target) || periodButton?.contains(event.target)) return;
  periodPopover.classList.remove("show");
});

document.querySelector("[data-reset-advanced]")?.addEventListener("click", () => {
  advancedColumnFilters.forEach((control) => {
    if (control.tagName === "SELECT") control.value = "all";
    if (control.tagName === "INPUT") control.value = "";
  });
  document.querySelectorAll("[data-advanced-filter]").forEach((control) => {
    if (control.type === "checkbox") {
      control.checked = false;
      return;
    }
    if (control.tagName === "SELECT") control.selectedIndex = 0;
    if (control.tagName === "INPUT") control.value = "";
  });
  if (orderBySelect) orderBySelect.value = "code";
  if (orderDirectionSelect) orderDirectionSelect.value = "asc";
  sortState = { key: "code", direction: "asc" };
  updateFormulaList();
  showToast("Advanced filter di-reset.");
});

document.querySelectorAll("[data-show-toast]").forEach((button) => {
  button.addEventListener("click", () => showToast(button.dataset.showToast));
});

function statusClass(status) {
  if (status === "Draft") return "status-pill draft";
  if (status === "Inactive") return "status-pill inactive";
  return "status-pill";
}

function rowData(row) {
  const cells = row.querySelectorAll("td");
  return {
    code: row.dataset.code || cells[0]?.textContent.trim(),
    name: row.dataset.name || cells[1]?.textContent.trim(),
    product: row.dataset.product || cells[2]?.textContent.trim(),
    position: row.dataset.position || cells[3]?.textContent.trim(),
    channel: row.dataset.channel || cells[4]?.textContent.trim(),
    branch: row.dataset.branch || cells[5]?.textContent.trim(),
    date: cells[6]?.textContent.trim() || "01/01/2024",
    status: row.dataset.status || "Draft",
    available: row.dataset.available !== "false"
  };
}

function setFormData(data) {
  if (!formulaForm) return;
  formulaForm.elements.code.value = data.code;
  formulaForm.elements.name.value = data.name;
  formulaForm.elements.product.value = data.product;
  formulaForm.elements.position.value = data.position;
  formulaForm.elements.channel.value = data.channel;
  formulaForm.elements.branch.value = data.branch;
  formulaForm.elements.status.value = data.status;
  formulaForm.elements.date.value = toDateInputValue(data.date);
  formulaForm.elements.expression.value = `commission = premium * rate\nproduct = "${data.product}"\nchannel = "${data.channel}"`;
}

function setFormReadonly(readonly) {
  if (!formulaForm) return;
  Array.from(formulaForm.elements).forEach((field) => {
    field.disabled = readonly;
  });
  if (saveFormulaButton) saveFormulaButton.hidden = readonly;
}

function openFormulaModal(mode, row) {
  formulaMode = mode;
  activeFormulaRow = row || null;

  const data = row ? rowData(row) : {
    code: `FML-NEW-${String(formulaRows.length + 1).padStart(3, "0")}`,
    name: "New Commission Formula",
    product: "Premier Life",
    position: "Agent",
    channel: "Agency",
    branch: "Head Office",
    date: "01/01/2024",
    status: "Draft",
    available: true
  };

  if (modalTitle) {
    modalTitle.textContent = mode === "new" ? "New Formula" : mode === "edit" ? "Edit Formula" : "Formula Detail";
  }
  if (modalSubtitle) {
    modalSubtitle.textContent = mode === "view" ? `${data.code} preview and audit metadata` : "Dummy form is editable for presentation flow";
  }

  setFormData(data);
  setFormReadonly(mode === "view");
  root.classList.add("modal-open");
}

function closeFormulaModal() {
  root.classList.remove("modal-open");
}

document.querySelector("[data-new-formula]")?.addEventListener("click", () => openFormulaModal("new"));
document.querySelector("[data-close-modal]")?.addEventListener("click", closeFormulaModal);
document.querySelectorAll("[data-close-modal]").forEach((button) => button.addEventListener("click", closeFormulaModal));
document.querySelector("[data-modal-backdrop]")?.addEventListener("click", closeFormulaModal);

function applyRowData(row, data) {
  row.dataset.code = data.code;
  row.dataset.name = data.name;
  row.dataset.product = data.product;
  row.dataset.position = data.position;
  row.dataset.channel = data.channel;
  row.dataset.branch = data.branch;
  row.dataset.status = data.status;
  row.dataset.available = data.available === false ? "false" : "true";

  const cells = row.querySelectorAll("td");
  cells[0].innerHTML = `<span class="code-link">${data.code}</span>`;
  cells[1].textContent = data.name;
  cells[2].textContent = data.product;
  cells[3].textContent = data.position;
  cells[4].textContent = data.channel;
  cells[5].textContent = data.branch;
  cells[6].textContent = data.date;
  cells[7].innerHTML = `<span class="${statusClass(data.status)}">${data.status}</span>`;
  cells[8].innerHTML = `Just now<span class="updated-by">Admin User</span>`;
  updateAvailabilityButton(row);
}

function cloneFormulaRow(sourceRow, overrides = {}) {
  if (!formulaTable) return null;
  const clone = sourceRow.cloneNode(true);
  const base = rowData(sourceRow);
  const data = { ...base, ...overrides };
  applyRowData(clone, data);
  sourceRow.after(clone);
  formulaRows.push(clone);
  updateFormulaList();
  return clone;
}

saveFormulaButton?.addEventListener("click", () => {
  if (!formulaForm) return;
  const data = {
    code: formulaForm.elements.code.value.trim(),
    name: formulaForm.elements.name.value.trim(),
    product: formulaForm.elements.product.value,
    position: formulaForm.elements.position.value,
    channel: formulaForm.elements.channel.value,
    branch: formulaForm.elements.branch.value,
    status: formulaForm.elements.status.value,
    date: toDisplayDate(formulaForm.elements.date.value),
    available: activeFormulaRow ? rowData(activeFormulaRow).available : true
  };

  if (!data.code || !data.name) {
    showToast("Formula code dan name wajib diisi.");
    return;
  }

  if (formulaMode === "new") {
    cloneFormulaRow(formulaRows[0], data);
    showToast(`${data.code} berhasil dibuat sebagai dummy formula.`);
  } else if (activeFormulaRow) {
    applyRowData(activeFormulaRow, data);
    updateFormulaList();
    showToast(`${data.code} berhasil diperbarui.`);
  }

  closeFormulaModal();
});

formulaTable?.addEventListener("click", (event) => {
  const button = event.target.closest(".action-icon");
  if (!button) return;
  const row = button.closest("[data-formula-row]");
  if (!row) return;
  const action = button.getAttribute("aria-label");
  const data = rowData(row);

  if (action === "Toggle availability") {
    const nextAvailable = row.dataset.available === "false";
    row.dataset.available = nextAvailable ? "true" : "false";
    updateAvailabilityButton(row);
    showToast(`${data.code} sekarang ${nextAvailable ? "available" : "not available"}.`);
  } else if (action === "Edit") {
    openFormulaModal("edit", row);
  } else if (action === "Copy") {
    const copyCode = `${data.code}-CP`;
    cloneFormulaRow(row, {
      ...data,
      code: copyCode,
      name: `${data.name} Copy`,
      status: "Draft"
    });
    showToast(`${copyCode} berhasil dibuat dari ${data.code}.`);
  }
});

function updateAvailabilityButton(row) {
  const button = row.querySelector('[aria-label="Toggle availability"]');
  if (!button) return;
  const available = row.dataset.available !== "false";
  button.classList.toggle("availability-on", available);
  button.classList.toggle("availability-off", !available);
  button.title = available ? "Available" : "Not available";
  button.innerHTML = available
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3l18 18"/><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/><path d="M9.9 5.2A9.2 9.2 0 0 1 12 5c6.5 0 10 7 10 7a16.4 16.4 0 0 1-3.1 4.1"/><path d="M6.6 6.6C3.7 8.4 2 12 2 12s3.5 7 10 7a9.6 9.6 0 0 0 4.4-1"/></svg>';
}

formulaRows.forEach(updateAvailabilityButton);

const importQueue = document.querySelector("[data-import-queue]");
const importSearch = document.querySelector("[data-import-search]");
const importSourceFilter = document.querySelector("[data-import-source-filter]");
const importMethodFilter = document.querySelector("[data-import-method-filter]");
const importPeriod = document.querySelector("[data-import-period]");
const queueCount = document.querySelector("[data-queue-count]");
const currentFile = document.querySelector("[data-current-file]");
const uploadSelected = document.querySelector("[data-upload-selected]");
const dropzone = document.querySelector("[data-dropzone]");
let queueExpanded = false;
let selectedImportFile = "Agent_Master_May2025.xlsx";

function importRows() {
  return importQueue ? Array.from(importQueue.querySelectorAll("[data-import-row]")) : [];
}

function importStatusPill(status) {
  if (status === "In Progress") return "status-pill progress";
  if (status === "Warning") return "status-pill draft";
  if (status === "Failed") return "status-pill inactive";
  return "status-pill";
}

function setImportProgress(row, percent, status) {
  const progress = row.querySelector(".progress-line i");
  const progressText = row.querySelector("td:nth-child(5) b");
  const statusCell = row.querySelector("td:nth-child(4)");
  if (progress) progress.style.width = `${percent}%`;
  if (progressText) progressText.textContent = `${percent}%`;
  if (statusCell && status) {
    statusCell.innerHTML = `<span class="${importStatusPill(status)}">${status}</span>`;
    row.dataset.status = status;
  }
}

function updateImportQueue() {
  if (!importQueue) return;
  const query = normalize(importSearch?.value);
  const source = importSourceFilter?.value || "all";
  const method = importMethodFilter?.value || "all";
  let visible = 0;

  importRows().forEach((row) => {
    const text = normalize(row.textContent);
    const matchesQuery = !query || text.includes(query);
    const matchesSource = source === "all" || row.dataset.source === source;
    const matchesMethod = method === "all" || row.dataset.method === method;
    const matchesExpanded = queueExpanded || !row.hasAttribute("data-extra-row");
    const show = matchesQuery && matchesSource && matchesMethod && matchesExpanded;
    row.hidden = !show;
    if (show) visible += 1;
  });

  if (queueCount) queueCount.textContent = String(visible);
}

function queueActionIcon(action) {
  if (action === "Retry") {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>';
  }
  if (action === "Inspect") {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3"/><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/></svg>';
  }
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>';
}

function addImportRow(fileName = selectedImportFile, source = "Excel Upload", method = "Manual Upload") {
  if (!importQueue) return;
  const row = document.createElement("tr");
  row.dataset.importRow = "";
  row.dataset.source = source;
  row.dataset.method = method;
  row.dataset.status = "In Progress";
  row.innerHTML = `
    <td>${fileName}</td>
    <td>${source}</td>
    <td>${Math.floor(4200 + Math.random() * 46000).toLocaleString("en-US")}</td>
    <td><span class="status-pill progress">In Progress</span></td>
    <td><span class="progress-line"><i style="width:24%"></i></span><b>24%</b></td>
    <td>Just now</td>
    <td><span class="row-actions compact"><button class="action-icon" type="button" data-import-action="Inspect" aria-label="Inspect">${queueActionIcon("Inspect")}</button><button class="action-icon" type="button" data-import-action="More" aria-label="More"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5h.01M12 12h.01M12 19h.01"/></svg></button></span></td>
  `;
  importQueue.prepend(row);
  updateImportQueue();
  showToast(`${fileName} masuk ke import queue.`);
  window.setTimeout(() => {
    setImportProgress(row, 76, "In Progress");
  }, 500);
  window.setTimeout(() => {
    setImportProgress(row, 100, "Success");
    showToast(`${fileName} selesai diproses.`);
  }, 1400);
}

[importSearch, importSourceFilter, importMethodFilter].forEach((control) => {
  control?.addEventListener("input", updateImportQueue);
  control?.addEventListener("change", updateImportQueue);
});

importPeriod?.addEventListener("change", () => {
  showToast(`Commission period diganti ke ${importPeriod.value}.`);
});

document.querySelectorAll("[data-source-tab]").forEach((tabButton) => {
  tabButton.addEventListener("click", () => {
    document.querySelectorAll("[data-source-tab]").forEach((item) => item.classList.remove("active-source"));
    tabButton.classList.add("active-source");
    const source = tabButton.dataset.sourceTab;
    const uploadTitle = document.querySelector("[data-upload-title]");
    const uploadCopy = document.querySelector("[data-upload-copy]");
    if (uploadTitle) uploadTitle.textContent = source === "Excel Upload" ? "Drag and drop your file here" : `${source} connection ready`;
    if (uploadCopy) uploadCopy.textContent = source === "DTS Scheduler" ? "Next scheduler: 22 May 2025, 08:00 AM" : source === "Core System / API" ? "Endpoint verified: policy, agent, premium data available" : "Accepted formats: .xlsx, .xls, .csv | Max size: 50 MB";
    showToast(`${source} dipilih sebagai source import.`);
  });
});

document.querySelector("[data-choose-file]")?.addEventListener("click", () => {
  selectedImportFile = "Agent_Master_May2025.xlsx";
  if (uploadSelected) uploadSelected.textContent = selectedImportFile;
  if (currentFile) currentFile.textContent = selectedImportFile;
  dropzone?.classList.add("is-ready");
  showToast(`${selectedImportFile} siap di-import.`);
});

dropzone?.addEventListener("click", (event) => {
  if (event.target.closest("button")) return;
  document.querySelector("[data-choose-file]")?.click();
});

document.querySelector("[data-new-import]")?.addEventListener("click", () => {
  selectedImportFile = `New_Commission_Source_${String(importRows().length + 1).padStart(2, "0")}.xlsx`;
  if (uploadSelected) uploadSelected.textContent = selectedImportFile;
  if (currentFile) currentFile.textContent = selectedImportFile;
  dropzone?.classList.add("is-ready");
  addImportRow(selectedImportFile);
});

document.querySelector("[data-import-refresh]")?.addEventListener("click", () => {
  importRows().forEach((row) => {
    if (row.dataset.status !== "In Progress") return;
    const current = Number(row.querySelector("td:nth-child(5) b")?.textContent.replace("%", "") || 0);
    setImportProgress(row, Math.min(100, current + 12), current + 12 >= 100 ? "Success" : "In Progress");
  });
  updateImportQueue();
  showToast("Import queue berhasil di-refresh.");
});

document.querySelector("[data-view-queue]")?.addEventListener("click", (event) => {
  queueExpanded = !queueExpanded;
  event.currentTarget.textContent = queueExpanded ? "Show Less Queue" : "View Full Queue ->";
  updateImportQueue();
});

document.querySelector("[data-view-files]")?.addEventListener("click", () => {
  queueExpanded = true;
  updateImportQueue();
  showToast("Menampilkan seluruh imported files yang tersedia.");
});

importQueue?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-import-action]");
  if (!button) return;
  const row = button.closest("[data-import-row]");
  const fileName = row?.querySelector("td")?.textContent.trim() || "Selected file";
  const action = button.dataset.importAction;
  if (action === "Retry" && row) {
    setImportProgress(row, 42, "In Progress");
    showToast(`${fileName} di-retry dan masuk proses lagi.`);
    window.setTimeout(() => setImportProgress(row, 100, "Success"), 1100);
    return;
  }
  showToast(`${action} untuk ${fileName} dibuka dalam mode demo.`);
});

document.querySelectorAll("[data-file-name]").forEach((fileButton) => {
  fileButton.addEventListener("click", () => {
    document.querySelectorAll("[data-file-name]").forEach((item) => item.classList.remove("active"));
    fileButton.classList.add("active");
    selectedImportFile = fileButton.dataset.fileName;
    if (currentFile) currentFile.textContent = selectedImportFile;
    if (uploadSelected) uploadSelected.textContent = selectedImportFile;
    showToast(`${selectedImportFile} dipilih untuk preview mapping.`);
  });
});

document.querySelectorAll("[data-map-now]").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("[data-map-row]");
    if (!row || row.classList.contains("is-mapped")) return;
    row.classList.add("is-mapped");
    button.textContent = "Mapped";
    button.disabled = true;
    const unmapped = document.querySelectorAll("[data-map-row]:not(.is-mapped)").length;
    const mapped = 28 - unmapped;
    const mappedCount = document.querySelector("[data-mapped-count]");
    const unmappedCount = document.querySelector("[data-unmapped-count]");
    const mappedPercent = document.querySelector("[data-mapped-percent]");
    const qualityScore = document.querySelector("[data-quality-score]");
    if (mappedCount) mappedCount.textContent = String(mapped);
    if (unmappedCount) unmappedCount.textContent = String(unmapped);
    if (mappedPercent) mappedPercent.textContent = `${mapped} (${Math.round((mapped / 28) * 100)}%)`;
    if (qualityScore) qualityScore.textContent = unmapped === 0 ? "99%" : "98%";
    showToast("Field mapping berhasil diperbarui.");
  });
});

document.querySelector("[data-view-mapping]")?.addEventListener("click", () => {
  showToast("Full mapping preview dibuka dalam mode demo.");
});

document.querySelector("[data-quality-toggle]")?.addEventListener("change", (event) => {
  const note = document.querySelector("[data-footer-note]");
  if (note) {
    note.textContent = event.target.checked
      ? "Quality checks aktif: duplicate, missing value, and mapping validation."
      : "Quality check will follow default validation rules.";
  }
});

document.querySelector("[data-schedule-import]")?.addEventListener("click", () => {
  document.querySelector("[data-schedule-popover]")?.classList.toggle("show");
});

document.querySelector("[data-confirm-schedule]")?.addEventListener("click", () => {
  document.querySelector("[data-schedule-popover]")?.classList.remove("show");
  showToast("Import dijadwalkan untuk 22 May 2025, 08:00 WIB.");
});

document.querySelector("[data-start-import]")?.addEventListener("click", () => {
  addImportRow(selectedImportFile || "Manual_Import_File.xlsx");
});

updateImportQueue();

document.addEventListener("click", (event) => {
  const popover = document.querySelector("[data-schedule-popover]");
  const trigger = document.querySelector("[data-schedule-import]");
  if (!popover?.classList.contains("show")) return;
  if (popover.contains(event.target) || trigger?.contains(event.target)) return;
  popover.classList.remove("show");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setDrawer(false);
    closeFormulaModal();
    document.querySelector("[data-schedule-popover]")?.classList.remove("show");
  }
});
