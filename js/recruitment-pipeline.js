(() => {
const pipelineRoot = document.querySelector("[data-recruitment-page]");
const pipelineToast = document.querySelector("[data-pipeline-toast]");
const candidateModal = document.querySelector("[data-candidate-modal]");

const funnelData = {
  "april-2025": {
    conversion: "5.1%",
    trend: "↑ 0.3% dari Mar 2025",
    values: {
      "new-applicant": "1.018",
      screening: "612",
      interview: "318",
      verification: "173",
      approved: "128"
    }
  },
  "mei-2025": {
    conversion: "5.8%",
    trend: "↑ 0.7% dari Apr 2025",
    values: {
      "new-applicant": "1.126",
      screening: "684",
      interview: "352",
      verification: "196",
      approved: "142"
    }
  },
  "juni-2025": {
    conversion: "6.4%",
    trend: "↑ 0.6% dari Mei 2025",
    values: {
      "new-applicant": "1.284",
      screening: "792",
      interview: "418",
      verification: "244",
      approved: "168"
    }
  }
};

function showPipelineToast(message) {
  if (!pipelineToast) return;
  pipelineToast.textContent = message;
  pipelineToast.classList.add("show");
  window.clearTimeout(showPipelineToast.timer);
  showPipelineToast.timer = window.setTimeout(() => pipelineToast.classList.remove("show"), 2200);
}

if (pipelineRoot) {
  const search = pipelineRoot.querySelector("[data-pipeline-search]");
  const stageFilter = pipelineRoot.querySelector("[data-stage-filter]");
  const periodFilter = pipelineRoot.querySelector("[data-period-filter]");
  const branchFilter = pipelineRoot.querySelector("[data-branch-filter]");
  const sourceFilter = pipelineRoot.querySelector("[data-source-filter]");
  const statusFilter = pipelineRoot.querySelector("[data-status-filter]");
  const resetFilter = pipelineRoot.querySelector("[data-reset-pipeline]");
  const funnelPeriod = pipelineRoot.querySelector("[data-funnel-period]");
  const cards = Array.from(pipelineRoot.querySelectorAll("[data-candidate-card]"));

  function normalize(value) {
    return String(value || "").toLowerCase().trim();
  }

  function filterCards() {
    const query = normalize(search?.value);
    const stage = stageFilter?.value || "all";
    const branch = branchFilter?.value || "all";
    const source = sourceFilter?.value || "all";
    const status = statusFilter?.value || "all";

    cards.forEach((card) => {
      const haystack = normalize(card.textContent);
      const visible = (!query || haystack.includes(query))
        && (stage === "all" || card.dataset.stage === stage)
        && (branch === "all" || card.dataset.branch === branch)
        && (source === "all" || card.dataset.source === source)
        && (status === "all" || card.dataset.status === status);
      card.hidden = !visible;
      card.style.display = visible ? "" : "none";
    });

    pipelineRoot.querySelectorAll(".pipeline-column").forEach((column) => {
      const visibleCards = Array.from(column.querySelectorAll("[data-candidate-card]")).filter((card) => !card.hidden && card.style.display !== "none");
      column.classList.toggle("is-filter-empty", visibleCards.length === 0);
    });
  }

  [search, stageFilter, branchFilter, sourceFilter, statusFilter].forEach((control) => {
    control?.addEventListener("input", filterCards);
    control?.addEventListener("keyup", filterCards);
    control?.addEventListener("search", filterCards);
    control?.addEventListener("change", filterCards);
  });

  resetFilter?.addEventListener("click", () => {
    if (search) search.value = "";
    if (periodFilter) periodFilter.value = "mei-2025";
    if (branchFilter) branchFilter.value = "all";
    if (stageFilter) stageFilter.value = "all";
    if (sourceFilter) sourceFilter.value = "all";
    if (statusFilter) statusFilter.value = "all";
    filterCards();
    showPipelineToast("Filter pipeline direset.");
  });

  function textAfter(label, card) {
    const line = Array.from(card.querySelectorAll(".candidate-meta, .candidate-date, .candidate-next"))
      .find((item) => item.textContent.trim().startsWith(label));
    return line?.textContent.replace(label, "").trim() || "-";
  }

  function openCandidateModal(card) {
    if (!candidateModal) return;
    const name = card.querySelector(".candidate-name")?.textContent.trim() || "Kandidat";
    const initials = card.querySelector(".candidate-avatar")?.textContent.trim() || name.slice(0, 2);
    const next = card.querySelector(".candidate-next .stage-chip")?.textContent.trim() || "-";
    const stage = card.closest(".pipeline-column")?.querySelector(".column-title-row span")?.textContent.trim() || "-";

    candidateModal.querySelector("[data-modal-initials]").textContent = initials;
    candidateModal.querySelector("[data-modal-name]").textContent = name;
    candidateModal.querySelector("[data-modal-id]").textContent = textAfter("ID:", card);
    candidateModal.querySelector("[data-modal-source]").textContent = textAfter("Sumber:", card);
    candidateModal.querySelector("[data-modal-branch]").textContent = textAfter("Cabang:", card);
    candidateModal.querySelector("[data-modal-stage]").textContent = stage;
    candidateModal.querySelector("[data-modal-date]").textContent = textAfter("Diperbarui:", card);
    candidateModal.querySelector("[data-modal-next]").textContent = next;
    candidateModal.hidden = false;
  }

  function closeCandidateModal() {
    if (candidateModal) candidateModal.hidden = true;
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cards.forEach((item) => item.classList.remove("is-selected"));
      card.classList.add("is-selected");
      openCandidateModal(card);
    });
  });

  candidateModal?.querySelectorAll("[data-close-candidate]").forEach((control) => {
    control.addEventListener("click", closeCandidateModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCandidateModal();
  });

  function updateFunnel(period, silent = false) {
    const data = funnelData[period];
    if (!data) return;
    const conversion = pipelineRoot.querySelector("[data-conversion-value]");
    const trend = pipelineRoot.querySelector("[data-conversion-trend]");
    if (conversion) conversion.textContent = data.conversion;
    if (trend) trend.textContent = data.trend;
    Object.entries(data.values).forEach(([key, value]) => {
      const target = pipelineRoot.querySelector(`[data-funnel-value="${key}"]`);
      if (target) target.textContent = value;
    });
    const base = Number(data.values["new-applicant"].replace(/\./g, ""));
    Object.entries(data.values).forEach(([key, value]) => {
      const target = pipelineRoot.querySelector(`[data-funnel-rate="${key}"]`);
      const numeric = Number(value.replace(/\./g, ""));
      if (target) target.textContent = key === "new-applicant" ? "100%" : `${((numeric / base) * 100).toFixed(1)}%`;
    });
    if (!silent) showPipelineToast(`Funnel Rekrutmen diperbarui ke ${funnelPeriod.options[funnelPeriod.selectedIndex].text}.`);
  }

  funnelPeriod?.addEventListener("change", () => updateFunnel(funnelPeriod.value));

  periodFilter?.addEventListener("change", () => {
    if (funnelPeriod) funnelPeriod.value = periodFilter.value;
    updateFunnel(periodFilter.value);
  });

  pipelineRoot.querySelectorAll("[data-pipeline-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      const column = button.closest(".pipeline-column");
      const stage = column?.querySelector("[data-candidate-card]")?.dataset.stage;
      if (stageFilter && stage) {
        stageFilter.value = stage;
        filterCards();
      }
      showPipelineToast(button.dataset.pipelineAction);
    });
  });

  filterCards();
  if (funnelPeriod) updateFunnel(funnelPeriod.value, true);
}
})();
