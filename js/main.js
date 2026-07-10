const root = document.documentElement;
let sidebarToggle = null;
let sidebar = null;

window.initCombenLayout = function() {
  sidebarToggle = document.querySelector("[data-sidebar-toggle]");
  sidebar = document.querySelector(".sidebar");

  function pruneDeprecatedNavItems() {
    document.querySelectorAll(".nav-sub-link").forEach((item) => {
      const label = item.textContent.trim();
      const href = item.getAttribute("href") || "";
      if (label === "Interview Mendatang" || label === "Candidate Detail" || href.includes("recruitment-interviews.html") || href.includes("candidate-detail.html")) {
        item.remove();
      }
    });
  }

  pruneDeprecatedNavItems();

  function setSidebarState() {
    const collapsed = localStorage.getItem("comben-sidebar") === "collapsed";
    root.classList.toggle("sidebar-collapsed", collapsed);
  }

  setSidebarState();

  function syncNavigationState() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-link.active, .nav-sub-link.active").forEach((item) => {
      item.classList.remove("active");
    });

    document.querySelectorAll(".nav-group").forEach((group) => {
      group.classList.remove("nav-group-active");
    });

    document.querySelectorAll(".nav-link[href], .nav-sub-link[href]").forEach((item) => {
      const hrefPage = item.getAttribute("href")?.split("/").pop();
      if (hrefPage !== currentPage) return;

      item.classList.add("active");
      const group = item.closest(".nav-group");
      if (group) {
        group.classList.add("nav-group-active");
        group.classList.remove("collapsed");
      }
    });
  }

  syncNavigationState();

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
};

// Fallback in case layout is already there (e.g. without layout loader)
if (document.querySelector(".sidebar") && document.querySelector(".sidebar").innerHTML.trim() !== "") {
  window.initCombenLayout();
}

const moduleGrid = document.querySelector("[data-module-grid]");
const modulePage = moduleGrid?.closest(".modules-page") || document;
const emptyState = modulePage.querySelector("[data-empty-state]");
const searchInput = modulePage.querySelector("[data-module-search]");
const categorySelect = modulePage.querySelector("[data-category-filter]");
const statusSelect = modulePage.querySelector("[data-status-filter]");
const resetButton = modulePage.querySelector("[data-reset-filter]");

function normalize(value) {
  return String(value || "").toLowerCase().trim();
}

function filterModules() {
  if (!moduleGrid) return;

  const query = normalize(searchInput?.value);
  const category = categorySelect?.value || "all";
  const status = statusSelect?.value || "all";
  let visibleCount = 0;

  moduleGrid.querySelectorAll("[data-module-card]").forEach((card) => {
    const haystack = normalize([
      card.dataset.title,
      card.dataset.description,
      card.dataset.category,
      card.querySelector(".status-pill")?.textContent
    ].join(" "));
    const matchesQuery = !query || haystack.includes(query);
    const matchesCategory = category === "all" || normalize(card.dataset.category) === normalize(category);
    const matchesStatus = status === "all" || normalize(card.dataset.status) === normalize(status);
    const visible = matchesQuery && matchesCategory && matchesStatus;

    card.hidden = !visible;
    card.style.display = visible ? "" : "none";
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
  if (statusSelect) statusSelect.value = "all";
  filterModules();
});

filterModules();

moduleGrid?.querySelectorAll("[data-module-card]").forEach((card) => {
  const link = card.querySelector(".card-arrow[href]");
  if (!link) return;

  card.setAttribute("role", "link");
  card.setAttribute("tabindex", "0");

  const goToModule = (event) => {
    if (event.target.closest("a, button, input, select, textarea")) return;
    window.location.href = link.href;
  };

  card.addEventListener("click", goToModule);
  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    window.location.href = link.href;
  });
});

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
const importResetFilter = document.querySelector("[data-import-reset-filter]");
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

importResetFilter?.addEventListener("click", () => {
  if (importSearch) importSearch.value = "";
  if (importPeriod) importPeriod.value = "May 2025";
  if (importSourceFilter) importSourceFilter.value = "all";
  if (importMethodFilter) importMethodFilter.value = "all";
  queueExpanded = false;
  const viewQueue = document.querySelector("[data-view-queue]");
  if (viewQueue) viewQueue.textContent = "View Full Queue ->";
  updateImportQueue();
  showToast("Filter import data direset.");
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

const adjustmentTable = document.querySelector("[data-adjustment-table]");
const adjustmentSearch = document.querySelector("[data-adjustment-search]");
const adjustmentRows = adjustmentTable ? Array.from(adjustmentTable.querySelectorAll("[data-adjustment-row]")) : [];
const adjustmentForm = document.querySelector("[data-adjustment-form]");
const reasonCount = document.querySelector("[data-reason-count]");
const adjustmentResult = document.querySelector("[data-adjustment-result]");
const adjustmentColumnFilters = Array.from(document.querySelectorAll("[data-adjustment-column-filter]"));
const createdSortButton = document.querySelector("[data-sort-created]");
const createdSortIcon = document.querySelector("[data-sort-created-icon]");
let activeAdjustmentRow = null;
let adjustmentCreatedSort = "desc";

function formatIdr(value) {
  return Number(value || 0).toLocaleString("en-US");
}

function adjustmentStatusPill(status) {
  if (status === "Pending Approval" || status === "Draft") return "status-pill draft";
  if (status === "Rejected") return "status-pill inactive";
  return "status-pill";
}

function adjustmentTypeClass(type) {
  const key = normalize(type).replace(/\s+/g, "-");
  if (key.includes("allowance")) return "type-pill type-allowance";
  if (key.includes("deduction")) return "type-pill type-deduction";
  if (key.includes("medical")) return "type-pill type-medical";
  if (key.includes("cancellation")) return "type-pill type-cancel";
  if (key.includes("advance")) return "type-pill type-advance";
  if (key.includes("loan")) return "type-pill type-loan";
  return "type-pill type-manual";
}

function updateAdjustmentCounter() {
  if (!adjustmentForm || !reasonCount) return;
  reasonCount.textContent = `${adjustmentForm.elements.reason.value.length} / 500`;
}

function adjustmentFilterValue(name) {
  return document.querySelector(`[data-adjustment-filter="${name}"]`)?.value || "";
}

function parseAdjustmentCreated(row) {
  const value = row.dataset.created || row.querySelector("td:nth-child(9)")?.textContent || "";
  if (normalize(value) === "just now") return Date.now();
  const [day, month, year] = value.trim().split(/\s+/);
  const months = {
    jan: 0, january: 0,
    feb: 1, february: 1,
    mar: 2, march: 2,
    apr: 3, april: 3,
    may: 4,
    jun: 5, june: 5,
    jul: 6, july: 6,
    aug: 7, august: 7,
    sep: 8, september: 8,
    oct: 9, october: 9,
    nov: 10, november: 10,
    dec: 11, december: 11
  };
  return new Date(Number(year), months[normalize(month)] ?? 0, Number(day)).getTime() || 0;
}

function updateAdjustmentList() {
  if (!adjustmentTable) return;
  const query = normalize(adjustmentSearch?.value);
  const status = adjustmentFilterValue("status") || "all";
  const type = adjustmentFilterValue("type") || "all";
  const minimum = Number(adjustmentFilterValue("minimum") || 0);
  const columnFilters = Object.fromEntries(adjustmentColumnFilters.map((control) => [
    control.dataset.adjustmentColumnFilter,
    normalize(control.value)
  ]));
  let visible = 0;

  adjustmentRows.forEach((row) => {
    const amount = Math.abs(Number(row.dataset.amount || 0));
    const amountFilter = Number(columnFilters.amount || 0);
    const reason = row.querySelector("td:nth-child(7)")?.textContent || "";
    const created = row.dataset.created || row.querySelector("td:nth-child(9)")?.textContent || "";
    const matchesQuery = !query || normalize(row.textContent).includes(query);
    const matchesStatus = status === "all" || row.dataset.status === status;
    const matchesType = type === "all" || row.dataset.type === type;
    const matchesAmount = !minimum || amount >= minimum;
    const matchesColumnFilters = (
      (!columnFilters.id || normalize(row.dataset.id).includes(columnFilters.id)) &&
      (!columnFilters.agent || normalize(row.dataset.agent).includes(columnFilters.agent)) &&
      (!columnFilters.period || normalize(row.dataset.period) === columnFilters.period) &&
      (!columnFilters.type || normalize(row.dataset.type) === columnFilters.type) &&
      (!columnFilters.amount || amount >= amountFilter) &&
      (!columnFilters.reason || normalize(reason).includes(columnFilters.reason)) &&
      (!columnFilters.status || normalize(row.dataset.status) === columnFilters.status) &&
      (!columnFilters.created || normalize(created).includes(columnFilters.created))
    );
    const show = matchesQuery && matchesStatus && matchesType && matchesAmount && matchesColumnFilters;
    row.hidden = !show;
    if (show) visible += 1;
  });

  adjustmentRows
    .slice()
    .sort((a, b) => {
      const diff = parseAdjustmentCreated(a) - parseAdjustmentCreated(b);
      return adjustmentCreatedSort === "asc" ? diff : -diff;
    })
    .forEach((row) => adjustmentTable.appendChild(row));

  if (adjustmentResult) {
    adjustmentResult.textContent = visible
      ? `Showing 1 to ${visible} of 178 adjustments`
      : "Showing 0 adjustments";
  }
}

function fillAdjustmentForm(row) {
  if (!adjustmentForm || !row) return;
  activeAdjustmentRow = row;
  adjustmentForm.elements.agent.value = row.dataset.agent;
  adjustmentForm.elements.period.value = row.dataset.period;
  adjustmentForm.elements.type.value = row.dataset.type;
  adjustmentForm.elements.amount.value = Math.abs(Number(row.dataset.amount || 0));
  adjustmentForm.elements.reason.value = row.querySelector("td:nth-child(7)")?.textContent.trim() || "";
  adjustmentForm.elements.status.value = row.dataset.status;
  updateAdjustmentCounter();
  showToast(`${row.dataset.id} dimuat ke form edit.`);
}

function resetAdjustmentForm() {
  adjustmentForm?.reset();
  activeAdjustmentRow = null;
  updateAdjustmentCounter();
}

function upsertAdjustment(status) {
  if (!adjustmentForm || !adjustmentTable) return;
  const data = {
    id: activeAdjustmentRow?.dataset.id || `ADJ-2025-${String(568 + adjustmentRows.length).padStart(5, "0")}`,
    agent: adjustmentForm.elements.agent.value,
    period: adjustmentForm.elements.period.value,
    type: adjustmentForm.elements.type.value,
    amount: Number(adjustmentForm.elements.amount.value || 0),
    reason: adjustmentForm.elements.reason.value.trim(),
    status
  };

  if (!data.agent || !data.type || !data.amount || !data.reason) {
    showToast("Agent, type, amount, dan reason wajib diisi.");
    return;
  }

  const signedAmount = ["Deduction", "Medical Cost", "Cancellation", "Advance Commission", "Loan"].includes(data.type)
    ? -Math.abs(data.amount)
    : Math.abs(data.amount);
  const row = activeAdjustmentRow || adjustmentRows[0].cloneNode(true);
  row.dataset.id = data.id;
  row.dataset.agent = data.agent;
  row.dataset.period = data.period;
  row.dataset.type = data.type;
  row.dataset.status = data.status;
  row.dataset.amount = String(signedAmount);
  row.dataset.created = "Just now";
  row.innerHTML = `<td><input type="checkbox"></td><td><strong>${data.id}</strong></td><td>${data.agent}</td><td>${data.period}</td><td><span class="${adjustmentTypeClass(data.type)}">${data.type}</span></td><td class="${signedAmount < 0 ? "negative" : ""}">${signedAmount < 0 ? "-" : ""}${formatIdr(Math.abs(signedAmount))}</td><td>${data.reason}</td><td><span class="${adjustmentStatusPill(data.status)}">${data.status}</span></td><td>Just now</td><td><button class="action-icon adjustment-action-dot" type="button" data-adjustment-menu aria-label="Open actions">...</button></td>`;
  if (!activeAdjustmentRow) {
    adjustmentTable.prepend(row);
    adjustmentRows.unshift(row);
  }
  updateAdjustmentList();
  showToast(`${data.id} ${status === "Draft" ? "disimpan sebagai draft" : "dikirim untuk approval"}.`);
  resetAdjustmentForm();
}

adjustmentSearch?.addEventListener("input", updateAdjustmentList);
document.querySelectorAll("[data-adjustment-filter]").forEach((control) => {
  control.addEventListener("input", updateAdjustmentList);
  control.addEventListener("change", updateAdjustmentList);
});

adjustmentColumnFilters.forEach((control) => {
  control.addEventListener("input", updateAdjustmentList);
  control.addEventListener("change", updateAdjustmentList);
});

document.querySelector("[data-clear-adjustment-columns]")?.addEventListener("click", () => {
  adjustmentColumnFilters.forEach((control) => {
    control.value = "";
  });
  updateAdjustmentList();
});

createdSortButton?.addEventListener("click", () => {
  adjustmentCreatedSort = adjustmentCreatedSort === "desc" ? "asc" : "desc";
  if (createdSortIcon) createdSortIcon.innerHTML = adjustmentCreatedSort === "desc" ? "&darr;" : "&uarr;";
  updateAdjustmentList();
});

document.querySelectorAll("[data-adjustment-filter-card]").forEach((card) => {
  card.addEventListener("click", () => {
    const status = card.dataset.adjustmentFilterCard;
    const statusFilter = document.querySelector('[data-adjustment-column-filter="status"]');
    if (statusFilter) statusFilter.value = status === "all" ? "" : status;
    updateAdjustmentList();
    showToast(status === "all" ? "Menampilkan semua adjustment." : `Filter ${status} diterapkan.`);
  });
});

const agentCombobox = document.querySelector("[data-agent-combobox]");
const agentInput = document.querySelector("[data-agent-input]");
const agentMenu = document.querySelector("[data-agent-menu]");

function setAgentMenu(open) {
  agentCombobox?.classList.toggle("is-open", open);
}

function filterAgentOptions() {
  if (!agentMenu || !agentInput) return;
  const query = normalize(agentInput.value);
  agentMenu.querySelectorAll("[data-agent-option]").forEach((option) => {
    option.hidden = query && !normalize(option.textContent).includes(query);
  });
}

agentInput?.addEventListener("focus", () => {
  filterAgentOptions();
  setAgentMenu(true);
});

agentInput?.addEventListener("input", () => {
  filterAgentOptions();
  setAgentMenu(true);
});

document.querySelector("[data-agent-toggle]")?.addEventListener("click", () => {
  filterAgentOptions();
  setAgentMenu(!agentCombobox?.classList.contains("is-open"));
  agentInput?.focus();
});

agentMenu?.addEventListener("click", (event) => {
  const option = event.target.closest("[data-agent-option]");
  if (!option || !agentInput) return;
  agentInput.value = option.dataset.agentOption;
  setAgentMenu(false);
});

adjustmentForm?.elements.reason?.addEventListener("input", updateAdjustmentCounter);
document.querySelector("[data-save-adjustment]")?.addEventListener("click", () => upsertAdjustment("Draft"));
document.querySelector("[data-submit-adjustment]")?.addEventListener("click", () => upsertAdjustment("Pending Approval"));
document.querySelector("[data-reset-adjustment]")?.addEventListener("click", resetAdjustmentForm);

document.querySelector("[data-adjustment-attachment]")?.addEventListener("click", () => {
  const label = document.querySelector("[data-attachment-label]");
  if (label) label.textContent = "adjustment-supporting-doc.pdf attached";
  document.querySelector("[data-adjustment-attachment]")?.classList.add("is-ready");
  showToast("Attachment dummy berhasil ditambahkan.");
});

document.querySelector("[data-bulk-adjustment]")?.addEventListener("click", () => {
  if (adjustmentForm) {
    adjustmentForm.elements.agent.value = "Agen Makmur Jaya";
    adjustmentForm.elements.period.value = "May 2025";
    adjustmentForm.elements.type.value = "Allowance";
    adjustmentForm.elements.amount.value = "10000000";
    adjustmentForm.elements.reason.value = "Bulk upload adjustment";
  }
  upsertAdjustment("Pending Approval");
  showToast("Bulk upload template diproses sebagai dummy adjustment.");
});

document.querySelector("[data-select-all-adjustments]")?.addEventListener("change", (event) => {
  adjustmentRows.forEach((row) => {
    if (!row.hidden) row.querySelector('input[type="checkbox"]').checked = event.target.checked;
  });
});

function closeAdjustmentMenu() {
  document.querySelector("[data-adjustment-action-menu]")?.remove();
}

adjustmentTable?.addEventListener("click", (event) => {
  const menuButton = event.target.closest("[data-adjustment-menu]");
  if (!menuButton) return;
  const row = menuButton.closest("[data-adjustment-row]");
  closeAdjustmentMenu();
  const rect = menuButton.getBoundingClientRect();
  const menu = document.createElement("div");
  menu.className = "adjustment-menu-popover show";
  menu.dataset.adjustmentActionMenu = "";
  menu.style.top = `${rect.bottom + 8}px`;
  menu.style.left = `${Math.max(16, rect.right - 170)}px`;
  menu.innerHTML = `<button type="button" data-adj-action="edit">Edit Adjustment</button><button type="button" data-adj-action="approve">Approve</button><button type="button" data-adj-action="reject">Reject</button><button type="button" data-adj-action="duplicate">Duplicate</button>`;
  document.body.appendChild(menu);
  menu.addEventListener("click", (menuEvent) => {
    const action = menuEvent.target.dataset.adjAction;
    if (!action || !row) return;
    if (action === "edit") fillAdjustmentForm(row);
    if (action === "approve" || action === "reject") {
      const status = action === "approve" ? "Approved" : "Rejected";
      row.dataset.status = status;
      row.querySelector("td:nth-child(8)").innerHTML = `<span class="${adjustmentStatusPill(status)}">${status}</span>`;
      showToast(`${row.dataset.id} ${status.toLowerCase()}.`);
    }
    if (action === "duplicate") {
      fillAdjustmentForm(row);
      activeAdjustmentRow = null;
      showToast(`${row.dataset.id} disalin ke form.`);
    }
    closeAdjustmentMenu();
    updateAdjustmentList();
  });
});

document.querySelector("[data-open-adjustment-filter]")?.addEventListener("click", () => {
  root.classList.add("adjustment-drawer-open");
});
document.querySelector("[data-close-adjustment-filter]")?.addEventListener("click", () => {
  root.classList.remove("adjustment-drawer-open");
});
document.querySelector("[data-adjustment-drawer-backdrop]")?.addEventListener("click", () => {
  root.classList.remove("adjustment-drawer-open");
});
document.querySelector("[data-apply-adjustment-filter]")?.addEventListener("click", () => {
  updateAdjustmentList();
  root.classList.remove("adjustment-drawer-open");
  showToast("Adjustment filter diterapkan.");
});
document.querySelector("[data-reset-adjustment-filter]")?.addEventListener("click", () => {
  document.querySelectorAll("[data-adjustment-filter]").forEach((control) => {
    if (control.tagName === "SELECT") control.value = "all";
    if (control.tagName === "INPUT") control.value = "";
  });
  adjustmentColumnFilters.forEach((control) => {
    control.value = "";
  });
  updateAdjustmentList();
});

document.addEventListener("click", (event) => {
  if (event.target.closest("[data-adjustment-menu]") || event.target.closest("[data-adjustment-action-menu]")) return;
  if (event.target.closest("[data-agent-combobox]")) return;
  setAgentMenu(false);
  closeAdjustmentMenu();
});

updateAdjustmentCounter();
updateAdjustmentList();

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setDrawer(false);
    closeFormulaModal();
    document.querySelector("[data-schedule-popover]")?.classList.remove("show");
    root.classList.remove("adjustment-drawer-open");
    setAgentMenu(false);
    closeAdjustmentMenu();
  }
});



(() => {
  const PRODUCTS = ["Bright Life Protect", "Bright Health Plus", "Bright Future Plan", "Bright Secure"];

  function peso(value) {
    const sign = value < 0 ? "-" : "";
    const abs = Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${sign}\u20B1 ${abs}`;
  }

  function buildPolicies(seedId, count, startYear, startMonth, startDay) {
    const rows = [];
    let day = startDay;
    let month = startMonth;
    for (let i = 0; i < count; i += 1) {
      const product = PRODUCTS[i % PRODUCTS.length];
      const premium = 12000 + ((i * 733) % 20000);
      const roundedPremium = Math.round(premium / 500) * 500;
      const commission = Math.round(roundedPremium * 0.2);
      const code = `POL-${startYear}-${String(seedId + i).padStart(6, "0")}`;
      const dateStr = new Date(startYear, month - 1, day).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
      });
      rows.push({ code, product, date: dateStr, premium: roundedPremium, commission });
      day += 1;
      if (day > 28) {
        day = 1;
        month += 1;
      }
    }
    return rows;
  }

  const AGENTS = {
    "AGT-0001": {
      code: "AGT-0001",
      initials: "JD",
      name: "Juan Dela Cruz",
      role: "Senior Agent",
      branch: "Manila Main Branch",
      period: "May 01 - May 31, 2024",
      account: "**** **** **** 1234",
      payoutDate: "May 10, 2024",
      bank: "BDO Unibank, Inc.",
      breakdown: [
        { desc: "1. Basic Commission", details: "From 45 policies", amount: 520450 },
        { desc: "2. Bonus", details: "Performance Bonus", amount: 65250 },
        { desc: "3. Override", details: "Override Commission", amount: 22100 },
        { desc: "4. Incentive", details: "Sales Incentive", amount: 9850 },
        { desc: "5. Adjustment", details: "Manual Adjustment", amount: 8260 },
        { desc: "6. Deduction", details: "Chargebacks / Reversals", amount: -12540 },
        { desc: "7. Tax", details: "Withholding Tax (10%)", amount: -6510 }
      ],
      netPayable: 455200,
      kpi: {
        gross: 520450,
        grossTrend: "\u25B2 12.45%",
        grossUp: true,
        deduction: 65250,
        deductionTrend: "\u25BC 4.32%",
        deductionUp: false,
        net: 455200,
        netTrend: "\u25B2 15.21%",
        netUp: true,
        policyCount: 45,
        policyTrend: "\u25B2 8.32%",
        policyUp: true,
        payoutStatus: "Paid",
        payoutDate: "May 10, 2024"
      },
      summary: {
        totalGross: 617650,
        totalDeductions: 65250,
        netPayable: 455200,
        paymentStatus: "Paid",
        approvalStatus: "Approved",
        approvedBy: "Maria Santos",
        approvedDate: "May 08, 2024 03:45 PM",
        referenceNo: "ES-2024-05-0001"
      },
      policyCount: 45,
      policies: [
        { code: "POL-2024-000123", product: "Bright Life Protect", date: "May 05, 2024", premium: 25000, commission: 5000 },
        { code: "POL-2024-000124", product: "Bright Health Plus", date: "May 06, 2024", premium: 18500, commission: 3700 },
        { code: "POL-2024-000125", product: "Bright Future Plan", date: "May 07, 2024", premium: 30000, commission: 6000 },
        { code: "POL-2024-000126", product: "Bright Secure", date: "May 08, 2024", premium: 22000, commission: 4400 },
        { code: "POL-2024-000127", product: "Bright Life Protect", date: "May 09, 2024", premium: 15000, commission: 3000 },
        ...buildPolicies(128, 40, 2024, 5, 10)
      ]
    },
    "AGT-0002": {
      code: "AGT-0002",
      initials: "MS",
      name: "Maria Santos",
      role: "Agency Manager",
      branch: "Quezon City Branch",
      period: "May 01 - May 31, 2024",
      account: "**** **** **** 5678",
      payoutDate: "May 10, 2024",
      bank: "BPI Family Savings Bank",
      breakdown: [
        { desc: "1. Basic Commission", details: "From 32 policies", amount: 380200 },
        { desc: "2. Bonus", details: "Performance Bonus", amount: 41000 },
        { desc: "3. Override", details: "Override Commission", amount: 15300 },
        { desc: "4. Incentive", details: "Sales Incentive", amount: 6200 },
        { desc: "5. Adjustment", details: "Manual Adjustment", amount: 2100 },
        { desc: "6. Deduction", details: "Chargebacks / Reversals", amount: -9800 },
        { desc: "7. Tax", details: "Withholding Tax (10%)", amount: -4010 }
      ],
      netPayable: 430990,
      kpi: {
        gross: 380200,
        grossTrend: "\u25B2 9.10%",
        grossUp: true,
        deduction: 13810,
        deductionTrend: "\u25BC 2.15%",
        deductionUp: false,
        net: 430990,
        netTrend: "\u25B2 11.40%",
        netUp: true,
        policyCount: 32,
        policyTrend: "\u25B2 5.60%",
        policyUp: true,
        payoutStatus: "Paid",
        payoutDate: "May 10, 2024"
      },
      summary: {
        totalGross: 444800,
        totalDeductions: 13810,
        netPayable: 430990,
        paymentStatus: "Paid",
        approvalStatus: "Approved",
        approvedBy: "Juan Dela Cruz",
        approvedDate: "May 08, 2024 02:10 PM",
        referenceNo: "ES-2024-05-0002"
      },
      policyCount: 32,
      policies: [
        { code: "POL-2024-000201", product: "Bright Health Plus", date: "May 04, 2024", premium: 19500, commission: 3900 },
        { code: "POL-2024-000202", product: "Bright Secure", date: "May 05, 2024", premium: 26000, commission: 5200 },
        { code: "POL-2024-000203", product: "Bright Life Protect", date: "May 06, 2024", premium: 21000, commission: 4200 },
        { code: "POL-2024-000204", product: "Bright Future Plan", date: "May 07, 2024", premium: 28500, commission: 5700 },
        { code: "POL-2024-000205", product: "Bright Health Plus", date: "May 08, 2024", premium: 16000, commission: 3200 },
        ...buildPolicies(206, 27, 2024, 5, 9)
      ]
    }
  };

  const els = {
    agentSelect: document.querySelector("[data-eslip-agent]"),
    productFilter: document.querySelector('[data-eslip-filter="product"]'),
    branchFilter: document.querySelector('[data-eslip-filter="branch"]'),
    channelFilter: document.querySelector('[data-eslip-filter="channel"]'),
    resetBtn: document.querySelector("[data-eslip-reset]"),
    applyBtn: document.querySelector("[data-eslip-apply]"),
    search: document.querySelector("[data-eslip-search]"),
    breakdownBody: document.querySelector("[data-eslip-breakdown]"),
    policyBody: document.querySelector("[data-policy-rows]"),
    policyEmpty: document.querySelector("[data-policy-empty]"),
    policyInfo: document.querySelector("[data-policy-info]"),
    policyPagination: document.querySelector("[data-policy-pagination]"),
    qrGrid: document.querySelector("[data-qr-grid]"),
    toast: document.querySelector("[data-toast]")
  };

  const state = {
    agentCode: "AGT-0001",
    page: 1,
    perPage: 5
  };

  function showToast(message) {
    if (!els.toast) return;
    els.toast.textContent = message;
    els.toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => els.toast.classList.remove("show"), 2600);
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = value;
    });
  }

  function renderDetail(agent) {
    setText('[data-detail="initials"]', agent.initials);
    setText('[data-detail="name"]', agent.name);
    setText('[data-detail="code"]', agent.code);
    setText('[data-detail="role"]', agent.role);
    setText('[data-detail="branch"]', agent.branch);
    setText('[data-detail="period"]', agent.period);
    setText('[data-detail="account"]', agent.account);
    setText('[data-detail="payoutDate"]', agent.payoutDate);
    setText('[data-detail="bank"]', agent.bank);
    setText('[data-detail="netPayable"]', peso(agent.netPayable));

    if (els.breakdownBody) {
      els.breakdownBody.innerHTML = agent.breakdown.map((row) => `
        <tr>
          <td>${row.desc}</td>
          <td>${row.details}</td>
          <td class="amount${row.amount < 0 ? " negative" : ""}">${row.amount < 0 ? `(${peso(Math.abs(row.amount))})` : peso(row.amount)}</td>
        </tr>
      `).join("");
    }
  }

  function renderKpi(agent) {
    const kpi = agent.kpi;
    setText('[data-kpi="gross"]', peso(kpi.gross));
    setText('[data-kpi="deduction"]', peso(kpi.deduction));
    setText('[data-kpi="net"]', peso(kpi.net));
    setText('[data-kpi="policyCount"]', String(kpi.policyCount));
    setText('[data-kpi="payoutStatus"]', kpi.payoutStatus);
    setText('[data-kpi="payoutDate"]', kpi.payoutDate);

    const grossTrendEl = document.querySelector('[data-kpi="grossTrend"]');
    const deductionTrendEl = document.querySelector('[data-kpi="deductionTrend"]');
    const netTrendEl = document.querySelector('[data-kpi="netTrend"]');
    const policyTrendEl = document.querySelector('[data-kpi="policyTrend"]');

    [
      [grossTrendEl, kpi.grossTrend, kpi.grossUp],
      [deductionTrendEl, kpi.deductionTrend, kpi.deductionUp],
      [netTrendEl, kpi.netTrend, kpi.netUp],
      [policyTrendEl, kpi.policyTrend, kpi.policyUp]
    ].forEach(([el, text, up]) => {
      if (!el) return;
      el.textContent = text;
      el.classList.toggle("up", !!up);
      el.classList.toggle("down", !up);
    });
  }

  function renderSummary(agent) {
    const summary = agent.summary;
    setText('[data-summary="totalGross"]', peso(summary.totalGross));
    setText('[data-summary="totalDeductions"]', peso(summary.totalDeductions));
    setText('[data-summary="netPayable"]', peso(summary.netPayable));
    setText('[data-summary="paymentStatus"]', summary.paymentStatus);
    setText('[data-summary="approvalStatus"]', summary.approvalStatus);
    setText('[data-summary="approvedBy"]', summary.approvedBy);
    setText('[data-summary="approvedDate"]', summary.approvedDate);
    setText('[data-summary="referenceNo"]', summary.referenceNo);
    setText('[data-summary="referenceNoQr"]', summary.referenceNo);
    renderQr(summary.referenceNo);
  }

  function renderQr(reference) {
    if (!els.qrGrid) return;
    const size = 9;
    const seed = Array.from(reference).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    const isFinder = (r, c) => (r < 3 && c < 3) || (r < 3 && c >= size - 3) || (r >= size - 3 && c < 3);
    let html = "";
    for (let r = 0; r < size; r += 1) {
      for (let c = 0; c < size; c += 1) {
        let on = isFinder(r, c);
        if (!on) {
          const value = (seed + r * 13 + c * 7 + r * c) % 5;
          on = value === 0 || value === 2;
        }
        html += `<span${on ? ' class="on"' : ""}></span>`;
      }
    }
    els.qrGrid.innerHTML = html;
  }

  function getFilteredPolicies(agent) {
    const product = els.productFilter?.value || "all";
    const branch = els.branchFilter?.value || "all";
    const query = (els.search?.value || "").trim().toLowerCase();

    return agent.policies.filter((row) => {
      const matchesProduct = product === "all" || row.product === product;
      const matchesBranch = branch === "all" || branch === agent.branch;
      const matchesQuery = !query || row.code.toLowerCase().includes(query) || row.product.toLowerCase().includes(query);
      return matchesProduct && matchesBranch && matchesQuery;
    });
  }

  function renderPolicyTable(agent) {
    const filtered = getFilteredPolicies(agent);
    const totalPages = Math.max(1, Math.ceil(filtered.length / state.perPage));
    state.page = Math.min(state.page, totalPages);

    const start = (state.page - 1) * state.perPage;
    const pageRows = filtered.slice(start, start + state.perPage);

    if (els.policyBody) {
      els.policyBody.innerHTML = pageRows.map((row) => `
        <tr>
          <td class="policy-code">${row.code}</td>
          <td>${row.product}</td>
          <td>${row.date}</td>
          <td class="num">${row.premium.toLocaleString("en-US")}</td>
          <td class="num">${row.commission.toLocaleString("en-US")}</td>
        </tr>
      `).join("");
    }

    els.policyEmpty?.classList.toggle("show", filtered.length === 0);

    if (els.policyInfo) {
      if (filtered.length === 0) {
        els.policyInfo.textContent = "No policies match this filter.";
      } else {
        const to = Math.min(start + state.perPage, filtered.length);
        els.policyInfo.textContent = `Showing ${start + 1} to ${to} of ${filtered.length} policies`;
      }
    }

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    if (!els.policyPagination) return;
    const maxButtons = 5;
    let startPage = Math.max(1, state.page - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);
    startPage = Math.max(1, endPage - maxButtons + 1);

    let html = `<button class="page-button" type="button" data-policy-prev ${state.page === 1 ? "disabled" : ""}>&lt;</button>`;
    for (let p = startPage; p <= endPage; p += 1) {
      html += `<button class="page-button${p === state.page ? " active" : ""}" type="button" data-policy-page="${p}">${p}</button>`;
    }
    html += `<button class="page-button" type="button" data-policy-next ${state.page === totalPages ? "disabled" : ""}>&gt;</button>`;
    els.policyPagination.innerHTML = html;

    els.policyPagination.querySelectorAll("[data-policy-page]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.page = Number(btn.dataset.policyPage);
        renderPolicyTable(AGENTS[state.agentCode]);
      });
    });
    els.policyPagination.querySelector("[data-policy-prev]")?.addEventListener("click", () => {
      if (state.page > 1) {
        state.page -= 1;
        renderPolicyTable(AGENTS[state.agentCode]);
      }
    });
    els.policyPagination.querySelector("[data-policy-next]")?.addEventListener("click", () => {
      state.page += 1;
      renderPolicyTable(AGENTS[state.agentCode]);
    });
  }

  function renderAll() {
    const agent = AGENTS[state.agentCode];
    if (!agent) return;
    renderDetail(agent);
    renderKpi(agent);
    renderSummary(agent);
    renderPolicyTable(agent);
  }

  els.agentSelect?.addEventListener("change", () => {
    state.agentCode = els.agentSelect.value;
    state.page = 1;
    renderAll();
    showToast(`Menampilkan e-Slip untuk ${AGENTS[state.agentCode].name}.`);
  });

  els.applyBtn?.addEventListener("click", () => {
    state.page = 1;
    renderPolicyTable(AGENTS[state.agentCode]);
    showToast("Filter e-Slip berhasil diterapkan.");
  });

  els.resetBtn?.addEventListener("click", () => {
    if (els.productFilter) els.productFilter.value = "all";
    if (els.branchFilter) els.branchFilter.value = "all";
    if (els.channelFilter) els.channelFilter.value = "all";
    if (els.search) els.search.value = "";
    state.page = 1;
    renderPolicyTable(AGENTS[state.agentCode]);
    showToast("Filter e-Slip di-reset.");
  });

  [els.productFilter, els.branchFilter, els.channelFilter].forEach((control) => {
    control?.addEventListener("change", () => {
      state.page = 1;
      renderPolicyTable(AGENTS[state.agentCode]);
    });
  });

  els.search?.addEventListener("input", () => {
    state.page = 1;
    renderPolicyTable(AGENTS[state.agentCode]);
  });

  renderAll();
})();
