/* js/e-slip-policy-contributions.js */

document.addEventListener("DOMContentLoaded", () => {
  const data = window.eslipAgentData || {};
  const params = new URLSearchParams(window.location.search);
  const agentSelect = document.getElementById("all-agent-filter");
  const productSelect = document.getElementById("all-product-filter");
  const dateSelect = document.getElementById("all-date-filter");
  const pageSizeSelect = document.getElementById("all-page-size");
  const tableBody = document.getElementById("all-contributions-body");
  const pagination = document.getElementById("all-pagination");
  const resultCount = document.getElementById("all-result-count");
  const paginationText = document.getElementById("all-pagination-text");
  const subtitle = document.getElementById("contributions-subtitle");
  const backLink = document.getElementById("back-to-eslip");
  const totalPoliciesEl = document.getElementById("all-total-policies");
  const totalPremiumEl = document.getElementById("all-total-premium");
  const totalCommissionEl = document.getElementById("all-total-commission");

  let selectedAgent = params.get("agent") || "AGT-0001";
  let currentPage = 1;

  const products = ["Bright Life Protect", "Bright Health Plus", "Bright Future Plan", "Bright Secure"];

  function pesoToNumber(value) {
    return Number(String(value).replace(/[^\d.-]/g, "")) || 0;
  }

  function formatPeso(value) {
    return `₱ ${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  function buildPolicies(agentId) {
    const agent = data[agentId];
    if (!agent) return [];

    const rows = Object.values(agent.policies.pages).flat().map(row => ({
      ...row,
      agentId,
      agentName: agent.name
    }));

    for (let i = rows.length; i < agent.policies.total; i += 1) {
      const no = `POL-2024-${String(148 + i).padStart(6, "0")}`;
      const product = products[i % products.length];
      const day = String((i % 27) + 3).padStart(2, "0");
      const premium = 15000 + (i % 9) * 2500;
      rows.push({
        no,
        product,
        date: `May ${day}, 2024`,
        premium: formatPeso(premium),
        comm: formatPeso(premium * 0.2),
        agentId,
        agentName: agent.name
      });
    }

    return rows;
  }

  function dateBucket(row) {
    const match = row.date.match(/May\s+(\d{2})/);
    const day = match ? Number(match[1]) : 1;
    if (day <= 10) return "early";
    if (day <= 20) return "mid";
    return "late";
  }

  function filteredRows() {
    const product = productSelect.value;
    const dateRange = dateSelect.value;
    return buildPolicies(selectedAgent).filter(row => {
      const productMatches = product === "all" || row.product === product;
      const dateMatches = dateRange === "all" || dateBucket(row) === dateRange;
      return productMatches && dateMatches;
    });
  }

  function render() {
    const agent = data[selectedAgent];
    const rows = filteredRows();
    const pageSize = Number(pageSizeSelect.value);
    const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
    currentPage = Math.min(currentPage, totalPages);

    const startIndex = (currentPage - 1) * pageSize;
    const visibleRows = rows.slice(startIndex, startIndex + pageSize);
    const startItem = rows.length ? startIndex + 1 : 0;
    const endItem = Math.min(startIndex + pageSize, rows.length);

    subtitle.textContent = `${agent.name} (${selectedAgent}) · May 01 - May 31, 2024`;
    backLink.href = `e-slip-agent.html?agent=${encodeURIComponent(selectedAgent)}`;
    totalPoliciesEl.textContent = String(agent.policies.total);
    totalPremiumEl.textContent = formatPeso(rows.reduce((sum, row) => sum + pesoToNumber(row.premium), 0));
    totalCommissionEl.textContent = formatPeso(rows.reduce((sum, row) => sum + pesoToNumber(row.comm), 0));
    resultCount.textContent = `Showing ${startItem} to ${endItem} of ${rows.length} policies`;
    paginationText.textContent = resultCount.textContent;

    tableBody.innerHTML = visibleRows.length
      ? visibleRows.map(row => `
        <tr>
          <td><strong>${row.no}</strong></td>
          <td>${row.agentName}</td>
          <td>${row.product}</td>
          <td>${row.date}</td>
          <td class="text-right">${row.premium}</td>
          <td class="text-right">${row.comm}</td>
        </tr>
      `).join("")
      : `<tr><td colspan="6" style="text-align:center;color:var(--muted);">No policies match the selected filters.</td></tr>`;

    let paginationHtml = `<button class="page-button" type="button" data-page="prev" ${currentPage === 1 ? "disabled" : ""}>&lsaquo;</button>`;
    for (let page = 1; page <= totalPages; page += 1) {
      paginationHtml += `<button class="page-button ${page === currentPage ? "active" : ""}" type="button" data-page="${page}">${page}</button>`;
    }
    paginationHtml += `<button class="page-button" type="button" data-page="next" ${currentPage === totalPages ? "disabled" : ""}>&rsaquo;</button>`;
    pagination.innerHTML = paginationHtml;
  }

  function goToPage(value) {
    if (value === "prev") currentPage -= 1;
    else if (value === "next") currentPage += 1;
    else currentPage = Number(value);
    render();
  }

  if (!data[selectedAgent]) selectedAgent = "AGT-0001";
  agentSelect.value = selectedAgent;

  agentSelect.addEventListener("change", event => {
    selectedAgent = event.target.value;
    currentPage = 1;
    render();
  });

  [productSelect, dateSelect, pageSizeSelect].forEach(control => {
    control.addEventListener("change", () => {
      currentPage = 1;
      render();
    });
  });

  document.getElementById("all-reset").addEventListener("click", () => {
    agentSelect.value = "AGT-0001";
    productSelect.value = "all";
    dateSelect.value = "all";
    selectedAgent = "AGT-0001";
    currentPage = 1;
    render();
    triggerToast("Policy contribution filters have been reset.");
  });

  document.getElementById("all-apply").addEventListener("click", () => {
    currentPage = 1;
    render();
    triggerToast("Policy contribution filters applied.");
  });

  document.getElementById("all-refresh").addEventListener("click", () => {
    render();
    triggerToast("Policy contributions refreshed.");
  });

  pagination.addEventListener("click", event => {
    const button = event.target.closest("[data-page]");
    if (!button || button.disabled) return;
    goToPage(button.dataset.page);
  });

  render();
});
