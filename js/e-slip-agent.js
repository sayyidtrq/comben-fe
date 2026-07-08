/* js/e-slip-agent.js */

// Dummy dataset for agents
const agentData = {
  "AGT-0001": {
    name: "Juan Dela Cruz",
    role: "Senior Agent",
    avatar: "../assets/images/agent_avatar.png",
    branch: "Manila Main Branch",
    period: "May 01 - May 31, 2024",
    bank: "BDO Unibank, Inc.",
    accountNo: "**** **** **** 1234",
    payoutDate: "May 10, 2024",
    stats: {
      gross: "₱ 520,450.00",
      deduction: "₱ 65,250.00",
      net: "₱ 455,200.00",
      policyCount: "45",
      payoutStatus: "Paid",
      payoutDateText: "Payout Date: May 10, 2024",
      trends: {
        gross: "▲ 12.45%",
        deduction: "▼ 4.32%",
        net: "▲ 15.21%",
        policies: "▲ 8.32%"
      }
    },
    breakdown: {
      basicDetails: "From 45 policies",
      basicVal: "₱ 520,450.00",
      bonusDetails: "Performance Bonus",
      bonusVal: "₱ 65,250.00",
      overrideDetails: "Override Commission",
      overrideVal: "₱ 22,100.00",
      incentiveDetails: "Sales Incentive",
      incentiveVal: "₱ 9,850.00",
      adjustDetails: "Manual Adjustment",
      adjustVal: "₱ 8,260.00",
      deductDetails: "Chargebacks / Reversals",
      deductVal: "(₱ 12,540.00)",
      taxDetails: "Withholding Tax (10%)",
      taxVal: "(₱ 6,510.00)",
      netVal: "₱ 455,200.00"
    },
    summary: {
      totalGross: "₱ 617,650.00",
      totalDeductions: "₱ 65,250.00",
      netPayable: "₱ 455,200.00",
      paymentStatus: "Paid",
      approvalStatus: "Approved",
      approvedBy: "Maria Santos",
      approvedDate: "May 08, 2024 03:45 PM",
      refNo: "ES-2024-05-0001"
    },
    policies: {
      total: 45,
      pages: {
        1: [
          { no: "POL-2024-000123", product: "Bright Life Protect", date: "May 05, 2024", premium: "₱ 25,000.00", comm: "₱ 5,000.00" },
          { no: "POL-2024-000124", product: "Bright Health Plus", date: "May 06, 2024", premium: "₱ 18,500.00", comm: "₱ 3,700.00" },
          { no: "POL-2024-000125", product: "Bright Future Plan", date: "May 07, 2024", premium: "₱ 30,000.00", comm: "₱ 6,000.00" },
          { no: "POL-2024-000126", product: "Bright Secure", date: "May 08, 2024", premium: "₱ 22,000.00", comm: "₱ 4,400.00" },
          { no: "POL-2024-000127", product: "Bright Life Protect", date: "May 09, 2024", premium: "₱ 15,000.00", comm: "₱ 3,000.00" }
        ],
        2: [
          { no: "POL-2024-000128", product: "Bright Health Plus", date: "May 10, 2024", premium: "₱ 21,000.00", comm: "₱ 4,200.00" },
          { no: "POL-2024-000129", product: "Bright Future Plan", date: "May 11, 2024", premium: "₱ 29,000.00", comm: "₱ 5,800.00" },
          { no: "POL-2024-000130", product: "Bright Secure", date: "May 12, 2024", premium: "₱ 23,000.00", comm: "₱ 4,600.00" },
          { no: "POL-2024-000131", product: "Bright Life Protect", date: "May 13, 2024", premium: "₱ 17,000.00", comm: "₱ 3,400.00" },
          { no: "POL-2024-000132", product: "Bright Health Plus", date: "May 14, 2024", premium: "₱ 20,500.00", comm: "₱ 4,100.00" }
        ],
        3: [
          { no: "POL-2024-000133", product: "Bright Future Plan", date: "May 15, 2024", premium: "₱ 35,000.00", comm: "₱ 7,000.00" },
          { no: "POL-2024-000134", product: "Bright Secure", date: "May 16, 2024", premium: "₱ 19,000.00", comm: "₱ 3,800.00" },
          { no: "POL-2024-000135", product: "Bright Life Protect", date: "May 17, 2024", premium: "₱ 15,000.00", comm: "₱ 3,000.00" },
          { no: "POL-2024-000136", product: "Bright Health Plus", date: "May 18, 2024", premium: "₱ 22,000.00", comm: "₱ 4,400.00" },
          { no: "POL-2024-000137", product: "Bright Future Plan", date: "May 19, 2024", premium: "₱ 28,000.00", comm: "₱ 5,600.00" }
        ],
        4: [
          { no: "POL-2024-000138", product: "Bright Secure", date: "May 20, 2024", premium: "₱ 24,000.00", comm: "₱ 4,800.00" },
          { no: "POL-2024-000139", product: "Bright Life Protect", date: "May 21, 2024", premium: "₱ 18,000.00", comm: "₱ 3,600.00" },
          { no: "POL-2024-000140", product: "Bright Health Plus", date: "May 22, 2024", premium: "₱ 21,500.00", comm: "₱ 4,300.00" },
          { no: "POL-2024-000141", product: "Bright Future Plan", date: "May 23, 2024", premium: "₱ 30,000.00", comm: "₱ 6,000.00" },
          { no: "POL-2024-000142", product: "Bright Secure", date: "May 24, 2024", premium: "₱ 25,000.00", comm: "₱ 5,000.00" }
        ],
        5: [
          { no: "POL-2024-000143", product: "Bright Life Protect", date: "May 25, 2024", premium: "₱ 16,000.00", comm: "₱ 3,200.00" },
          { no: "POL-2024-000144", product: "Bright Health Plus", date: "May 26, 2024", premium: "₱ 20,000.00", comm: "₱ 4,000.00" },
          { no: "POL-2024-000145", product: "Bright Future Plan", date: "May 27, 2024", premium: "₱ 31,000.00", comm: "₱ 6,200.00" },
          { no: "POL-2024-000146", product: "Bright Secure", date: "May 28, 2024", premium: "₱ 22,500.00", comm: "₱ 4,500.00" },
          { no: "POL-2024-000147", product: "Bright Life Protect", date: "May 29, 2024", premium: "₱ 14,000.00", comm: "₱ 2,800.00" }
        ]
      }
    }
  },
  "AGT-0002": {
    name: "Maria Santos",
    role: "Agency Manager",
    avatar: "../assets/images/agent_maria_santos.png",
    branch: "Cebu Branch",
    period: "May 01 - May 31, 2024",
    bank: "Metrobank",
    accountNo: "**** **** **** 5678",
    payoutDate: "May 10, 2024",
    stats: {
      gross: "₱ 380,200.00",
      deduction: "₱ 38,400.00",
      net: "₱ 341,800.00",
      policyCount: "32",
      payoutStatus: "Paid",
      payoutDateText: "Payout Date: May 10, 2024",
      trends: {
        gross: "▲ 8.12%",
        deduction: "▼ 2.10%",
        net: "▲ 10.45%",
        policies: "▲ 5.40%"
      }
    },
    breakdown: {
      basicDetails: "From 32 policies",
      basicVal: "₱ 380,200.00",
      bonusDetails: "Override Bonus",
      bonusVal: "₱ 42,500.00",
      overrideDetails: "Manager Override",
      overrideVal: "₱ 18,300.00",
      incentiveDetails: "Campaign Incentive",
      incentiveVal: "₱ 6,400.00",
      adjustDetails: "System Correction",
      adjustVal: "₱ 3,200.00",
      deductDetails: "Lapsed Charges",
      deductVal: "(₱ 8,400.00)",
      taxDetails: "Withholding Tax (10%)",
      taxVal: "(₱ 4,200.00)",
      netVal: "₱ 341,800.00"
    },
    summary: {
      totalGross: "₱ 447,400.00",
      totalDeductions: "₱ 38,400.00",
      netPayable: "₱ 341,800.00",
      paymentStatus: "Paid",
      approvalStatus: "Approved",
      approvedBy: "Director Ramos",
      approvedDate: "May 07, 2024 02:15 PM",
      refNo: "ES-2024-05-0002"
    },
    policies: {
      total: 32,
      pages: {
        1: [
          { no: "POL-2024-000301", product: "Bright Health Plus", date: "May 02, 2024", premium: "₱ 18,500.00", comm: "₱ 3,700.00" },
          { no: "POL-2024-000302", product: "Bright Life Protect", date: "May 03, 2024", premium: "₱ 25,000.00", comm: "₱ 5,000.00" },
          { no: "POL-2024-000303", product: "Bright Future Plan", date: "May 05, 2024", premium: "₱ 30,000.00", comm: "₱ 6,000.00" },
          { no: "POL-2024-000304", product: "Bright Secure", date: "May 06, 2024", premium: "₱ 22,000.00", comm: "₱ 4,400.00" },
          { no: "POL-2024-000305", product: "Bright Life Protect", date: "May 08, 2024", premium: "₱ 15,000.00", comm: "₱ 3,000.00" }
        ],
        2: [
          { no: "POL-2024-000306", product: "Bright Health Plus", date: "May 10, 2024", premium: "₱ 18,500.00", comm: "₱ 3,700.00" },
          { no: "POL-2024-000307", product: "Bright Future Plan", date: "May 11, 2024", premium: "₱ 30,000.00", comm: "₱ 6,000.00" },
          { no: "POL-2024-000308", product: "Bright Secure", date: "May 12, 2024", premium: "₱ 22,000.00", comm: "₱ 4,400.00" },
          { no: "POL-2024-000309", product: "Bright Life Protect", date: "May 14, 2024", premium: "₱ 20,000.00", comm: "₱ 4,000.00" },
          { no: "POL-2024-000310", product: "Bright Health Plus", date: "May 15, 2024", premium: "₱ 15,000.00", comm: "₱ 3,000.00" }
        ],
        3: [
          { no: "POL-2024-000311", product: "Bright Future Plan", date: "May 16, 2024", premium: "₱ 25,000.00", comm: "₱ 5,000.00" },
          { no: "POL-2024-000312", product: "Bright Secure", date: "May 18, 2024", premium: "₱ 24,000.00", comm: "₱ 4,800.00" },
          { no: "POL-2024-000313", product: "Bright Life Protect", date: "May 19, 2024", premium: "₱ 18,000.00", comm: "₱ 3,600.00" },
          { no: "POL-2024-000314", product: "Bright Health Plus", date: "May 20, 2024", premium: "₱ 21,500.00", comm: "₱ 4,300.00" },
          { no: "POL-2024-000315", product: "Bright Future Plan", date: "May 22, 2024", premium: "₱ 30,000.00", comm: "₱ 6,000.00" }
        ],
        4: [
          { no: "POL-2024-000316", product: "Bright Secure", date: "May 24, 2024", premium: "₱ 15,000.00", comm: "₱ 3,000.00" },
          { no: "POL-2024-000317", product: "Bright Life Protect", date: "May 25, 2024", premium: "₱ 20,000.00", comm: "₱ 4,000.00" },
          { no: "POL-2024-000318", product: "Bright Health Plus", date: "May 26, 2024", premium: "₱ 22,000.00", comm: "₱ 4,400.00" },
          { no: "POL-2024-000319", product: "Bright Future Plan", date: "May 28, 2024", premium: "₱ 28,000.00", comm: "₱ 5,600.00" },
          { no: "POL-2024-000320", product: "Bright Secure", date: "May 29, 2024", premium: "₱ 25,000.00", comm: "₱ 5,000.00" }
        ],
        5: [
          { no: "POL-2024-000321", product: "Bright Life Protect", date: "May 30, 2024", premium: "₱ 16,000.00", comm: "₱ 3,200.00" }
        ]
      }
    }
  },
  "AGT-0003": {
    name: "Aisyah Putri",
    role: "Agent",
    avatar: "../assets/images/agent_aisyah_putri.png",
    branch: "Jakarta Branch",
    period: "May 01 - May 31, 2024",
    bank: "Bank Mandiri",
    accountNo: "**** **** **** 9911",
    payoutDate: "May 10, 2024",
    stats: {
      gross: "₱ 220,150.00",
      deduction: "₱ 15,400.00",
      net: "₱ 204,750.00",
      policyCount: "18",
      payoutStatus: "Paid",
      payoutDateText: "Payout Date: May 10, 2024",
      trends: {
        gross: "▲ 4.50%",
        deduction: "▼ 1.20%",
        net: "▲ 6.25%",
        policies: "▲ 2.50%"
      }
    },
    breakdown: {
      basicDetails: "From 18 policies",
      basicVal: "₱ 220,150.00",
      bonusDetails: "Referral Bonus",
      bonusVal: "₱ 15,000.00",
      overrideDetails: "No Override",
      overrideVal: "₱ 0.00",
      incentiveDetails: "Quarterly Target",
      incentiveVal: "₱ 8,500.00",
      adjustDetails: "Manual Adjustment",
      adjustVal: "₱ 1,500.00",
      deductDetails: "Admin Fees",
      deductVal: "(₱ 2,400.00)",
      taxDetails: "Withholding Tax (10%)",
      taxVal: "(₱ 1,300.00)",
      netVal: "₱ 204,750.00"
    },
    summary: {
      totalGross: "₱ 243,650.00",
      totalDeductions: "₱ 15,400.00",
      netPayable: "₱ 204,750.00",
      paymentStatus: "Paid",
      approvalStatus: "Approved",
      approvedBy: "Indra Wijaya",
      approvedDate: "May 08, 2024 10:00 AM",
      refNo: "ES-2024-05-0003"
    },
    policies: {
      total: 18,
      pages: {
        1: [
          { no: "POL-2024-000401", product: "Bright Life Protect", date: "May 03, 2024", premium: "₱ 15,000.00", comm: "₱ 3,000.00" },
          { no: "POL-2024-000402", product: "Bright Health Plus", date: "May 04, 2024", premium: "₱ 20,000.00", comm: "₱ 4,000.00" },
          { no: "POL-2024-000403", product: "Bright Future Plan", date: "May 07, 2024", premium: "₱ 28,000.00", comm: "₱ 5,600.00" },
          { no: "POL-2024-000404", product: "Bright Secure", date: "May 10, 2024", premium: "₱ 25,000.00", comm: "₱ 5,000.00" },
          { no: "POL-2024-000405", product: "Bright Life Protect", date: "May 12, 2024", premium: "₱ 16,000.00", comm: "₱ 3,200.00" }
        ],
        2: [
          { no: "POL-2024-000406", product: "Bright Health Plus", date: "May 14, 2024", premium: "₱ 22,000.00", comm: "₱ 4,400.00" },
          { no: "POL-2024-000407", product: "Bright Future Plan", date: "May 15, 2024", premium: "₱ 18,000.00", comm: "₱ 3,600.00" },
          { no: "POL-2024-000408", product: "Bright Secure", date: "May 18, 2024", premium: "₱ 24,000.00", comm: "₱ 4,800.00" },
          { no: "POL-2024-000409", product: "Bright Life Protect", date: "May 20, 2024", premium: "₱ 30,000.00", comm: "₱ 6,000.00" },
          { no: "POL-2024-000410", product: "Bright Health Plus", date: "May 22, 2024", premium: "₱ 21,500.00", comm: "₱ 4,300.00" }
        ],
        3: [
          { no: "POL-2024-000411", product: "Bright Future Plan", date: "May 24, 2024", premium: "₱ 25,000.00", comm: "₱ 5,000.00" },
          { no: "POL-2024-000412", product: "Bright Secure", date: "May 25, 2024", premium: "₱ 19,000.00", comm: "₱ 3,800.00" },
          { no: "POL-2024-000413", product: "Bright Life Protect", date: "May 27, 2024", premium: "₱ 15,000.00", comm: "₱ 3,000.00" }
        ]
      }
    }
  }
};

let currentAgentId = "AGT-0001";
let currentPaginationPage = 1;

// Toast helper from main.js or custom fallback
function triggerToast(message) {
  const toast = document.querySelector("[data-toast]");
  if (toast) {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(triggerToast.timer);
    triggerToast.timer = window.setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  } else {
    alert(message);
  }
}

// Function to update all DOM elements based on selected agent data
function updateUI(agentId) {
  const data = agentData[agentId];
  if (!data) return;

  currentAgentId = agentId;
  currentPaginationPage = 1;

  // Stats Card Update
  document.getElementById("stat-gross-commission").textContent = data.stats.gross;
  document.getElementById("stat-total-deduction").textContent = data.stats.deduction;
  document.getElementById("stat-net-commission").textContent = data.stats.net;
  document.getElementById("stat-policy-count").textContent = data.stats.policyCount;
  document.getElementById("stat-payout-date").textContent = data.stats.payoutDateText;

  // Trend Badges
  const cardElements = document.querySelectorAll(".eslip-stat-card");
  if (cardElements.length >= 4) {
    cardElements[0].querySelector(".trend-badge").textContent = data.stats.trends.gross;
    cardElements[1].querySelector(".trend-badge").textContent = data.stats.trends.deduction;
    cardElements[2].querySelector(".trend-badge").textContent = data.stats.trends.net;
    cardElements[3].querySelector(".trend-badge").textContent = data.stats.trends.policies;
  }

  // Agent profile
  document.getElementById("agent-avatar-img").src = data.avatar;
  document.getElementById("slip-agent-name").textContent = data.name;
  document.getElementById("slip-agent-id").textContent = agentId;
  document.getElementById("slip-agent-role").textContent = data.role;
  document.getElementById("slip-branch").textContent = data.branch;
  document.getElementById("slip-period").textContent = data.period;
  document.getElementById("slip-bank").textContent = data.bank;
  document.getElementById("slip-account-no").textContent = data.accountNo;
  document.getElementById("slip-payout-date").textContent = data.payoutDate;

  // Breakdown details
  document.getElementById("slip-basic-details").textContent = data.breakdown.basicDetails;
  document.getElementById("slip-basic-val").textContent = data.breakdown.basicVal;
  document.getElementById("slip-bonus-details").textContent = data.breakdown.bonusDetails;
  document.getElementById("slip-bonus-val").textContent = data.breakdown.bonusVal;
  document.getElementById("slip-override-details").textContent = data.breakdown.overrideDetails;
  document.getElementById("slip-override-val").textContent = data.breakdown.overrideVal;
  document.getElementById("slip-incentive-details").textContent = data.breakdown.incentiveDetails;
  document.getElementById("slip-incentive-val").textContent = data.breakdown.incentiveVal;
  document.getElementById("slip-adjust-details").textContent = data.breakdown.adjustDetails;
  document.getElementById("slip-adjust-val").textContent = data.breakdown.adjustVal;
  document.getElementById("slip-deduct-details").textContent = data.breakdown.deductDetails;
  document.getElementById("slip-deduct-val").textContent = data.breakdown.deductVal;
  document.getElementById("slip-tax-details").textContent = data.breakdown.taxDetails;
  document.getElementById("slip-tax-val").textContent = data.breakdown.taxVal;
  document.getElementById("slip-net-payable-val").textContent = data.breakdown.netVal;

  // Slip summary
  document.getElementById("sum-total-gross").textContent = data.summary.totalGross;
  document.getElementById("sum-total-deductions").textContent = data.summary.totalDeductions;
  document.getElementById("sum-net-payable").textContent = data.summary.netPayable;
  document.getElementById("sum-payment-status").textContent = data.summary.paymentStatus;
  document.getElementById("sum-approval-status").textContent = data.summary.approvalStatus;
  document.getElementById("sum-approved-by").textContent = data.summary.approvedBy;
  document.getElementById("sum-approved-date").textContent = data.summary.approvedDate;
  document.getElementById("sum-ref-no").textContent = data.summary.refNo;

  // QR Code Text update
  document.getElementById("qr-ref-text").textContent = data.summary.refNo;

  // Update table & pagination
  updateTableAndPagination();
}

function updateTableAndPagination() {
  const data = agentData[currentAgentId];
  if (!data) return;

  const tableBody = document.getElementById("contributions-table-body");
  const pagesData = data.policies.pages;
  const currentPageData = pagesData[currentPaginationPage] || [];

  // Generate table rows HTML
  let rowsHtml = "";
  if (currentPageData.length === 0) {
    rowsHtml = `<tr><td colspan="5" style="text-align: center; color: var(--muted);">No policies found for this page.</td></tr>`;
  } else {
    currentPageData.forEach(row => {
      rowsHtml += `
        <tr>
          <td>${row.no}</td>
          <td>${row.product}</td>
          <td>${row.date}</td>
          <td class="text-right">${row.premium}</td>
          <td class="text-right">${row.comm}</td>
        </tr>
      `;
    });
  }
  tableBody.innerHTML = rowsHtml;

  // Update text: e.g. "Showing 1 to 5 of 45 policies"
  const totalPolicies = data.policies.total;
  const itemsPerPage = 5;
  const startItem = (currentPaginationPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPaginationPage * itemsPerPage, totalPolicies);
  
  document.getElementById("contributions-pagination-text").textContent = 
    `Showing ${startItem} to ${endItem} of ${totalPolicies} policies`;

  // Render pagination buttons active state
  const pagContainer = document.querySelector(".pagination");
  const numPages = Object.keys(pagesData).length;

  // Render buttons dynamically to match available pages
  let pagHtml = `<button class="page-button" type="button" id="pag-prev" ${currentPaginationPage === 1 ? 'disabled' : ''}>&lsaquo;</button>`;
  for (let i = 1; i <= 5; i++) {
    if (i <= numPages) {
      pagHtml += `<button class="page-button ${i === currentPaginationPage ? 'active' : ''}" type="button" data-page="${i}">${i}</button>`;
    }
  }
  pagHtml += `<button class="page-button" type="button" id="pag-next" ${currentPaginationPage === numPages ? 'disabled' : ''}>&rsaquo;</button>`;
  
  pagContainer.innerHTML = pagHtml;

  // Rebind events to pagination buttons
  pagContainer.querySelectorAll(".page-button[data-page]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      currentPaginationPage = parseInt(e.currentTarget.getAttribute("data-page"));
      updateTableAndPagination();
    });
  });

  const prevBtn = document.getElementById("pag-prev");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPaginationPage > 1) {
        currentPaginationPage--;
        updateTableAndPagination();
      }
    });
  }

  const nextBtn = document.getElementById("pag-next");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentPaginationPage < numPages) {
        currentPaginationPage++;
        updateTableAndPagination();
      }
    });
  }
}

// Initial binding when window loads
document.addEventListener("DOMContentLoaded", () => {
  const agentSelect = document.getElementById("filter-agent");
  const btnApply = document.getElementById("btn-apply");
  const btnReset = document.getElementById("btn-reset");
  const btnDownload = document.getElementById("btn-download");
  const btnSend = document.getElementById("btn-send");
  const btnPrint = document.getElementById("btn-print");
  const btnViewAll = document.getElementById("btn-view-all");

  // Dropdown change listener
  if (agentSelect) {
    agentSelect.addEventListener("change", (e) => {
      const selectedId = e.target.value;
      updateUI(selectedId);
      triggerToast(`Loaded data for ${agentData[selectedId].name} (${selectedId})`);
    });
  }

  // Buttons triggers
  if (btnDownload) {
    btnDownload.addEventListener("click", () => {
      const name = agentData[currentAgentId].name;
      triggerToast(`Downloading e-Slip PDF for ${name}...`);
    });
  }

  if (btnSend) {
    btnSend.addEventListener("click", () => {
      const name = agentData[currentAgentId].name;
      triggerToast(`e-Slip successfully sent to Agent ${name} (${currentAgentId}).`);
    });
  }

  if (btnPrint) {
    btnPrint.addEventListener("click", () => {
      triggerToast("Preparing e-Slip for printing...");
    });
  }

  if (btnViewAll) {
    btnViewAll.addEventListener("click", (e) => {
      e.preventDefault();
      triggerToast("Viewing all policy contributions (demo mode).");
    });
  }

  if (btnApply) {
    btnApply.addEventListener("click", () => {
      const periodVal = document.getElementById("filter-period").value;
      const productVal = document.getElementById("filter-product").value;
      const branchVal = document.getElementById("filter-branch").value;
      const channelVal = document.getElementById("filter-channel").value;
      
      triggerToast(`Filters applied! Period: ${periodVal}, Product: ${productVal}, Branch: ${branchVal}, Channel: ${channelVal}`);
    });
  }

  if (btnReset) {
    btnReset.addEventListener("click", () => {
      // Restore defaults
      if (agentSelect) agentSelect.value = "AGT-0001";
      document.getElementById("filter-period").value = "May 2024";
      document.getElementById("filter-product").value = "all";
      document.getElementById("filter-branch").value = "all";
      document.getElementById("filter-channel").value = "all";

      updateUI("AGT-0001");
      triggerToast("Filters and agent selection have been reset to default.");
    });
  }

  // Initial UI Render
  updateUI("AGT-0001");
});
