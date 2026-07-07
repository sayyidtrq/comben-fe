// js/commission-approval.js

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Dummy Data ---
  const dummyBatches = [
    {
      id: 'CB-2024-000512',
      period: 'May 2024',
      comm: '₹ 2,45,60,789.00',
      adj: '-₹ 12,34,567.00',
      net: '₹ 2,33,26,222.00',
      agents: '1,245',
      submittedBy: 'Rakesh Sharma',
      submittedRole: 'Manager - Comp Ops',
      submittedDate: '03 Jun 2024, 09:15 AM',
      level: 'Level 2',
      status: 'Waiting Approval',
      statusClass: 'status-wait'
    },
    {
      id: 'CB-2024-000511',
      period: 'May 2024',
      comm: '₹ 1,98,76,543.00',
      adj: '₹ 5,67,890.00',
      net: '₹ 2,04,44,433.00',
      agents: '954',
      submittedBy: 'Rakesh Sharma',
      submittedRole: 'Manager - Comp Ops',
      submittedDate: '03 Jun 2024, 09:10 AM',
      level: 'Level 2',
      status: 'Waiting Approval',
      statusClass: 'status-wait'
    },
    {
      id: 'CB-2024-000509',
      period: 'Apr 2024',
      comm: '₹ 1,65,43,210.00',
      adj: '-₹ 8,90,123.00',
      net: '₹ 1,56,53,087.00',
      agents: '820',
      submittedBy: 'Neha Iyer',
      submittedRole: 'Sr. Comp Analyst',
      submittedDate: '02 Jun 2024, 11:30 AM',
      level: 'Level 2',
      status: 'Waiting Approval',
      statusClass: 'status-wait'
    },
    {
      id: 'CB-2024-000508',
      period: 'Apr 2024',
      comm: '₹ 2,10,34,567.00',
      adj: '₹ 0.00',
      net: '₹ 2,10,34,567.00',
      agents: '1,100',
      submittedBy: 'Neha Iyer',
      submittedRole: 'Sr. Comp Analyst',
      submittedDate: '01 Jun 2024, 10:00 AM',
      level: 'Level 1',
      status: 'Waiting Approval',
      statusClass: 'status-wait'
    },
    {
      id: 'CB-2024-000507',
      period: 'Apr 2024',
      comm: '₹ 1,80,00,000.00',
      adj: '-₹ 5,00,000.00',
      net: '₹ 1,75,00,000.00',
      agents: '900',
      submittedBy: 'Amit Singh',
      submittedRole: 'Comp Analyst',
      submittedDate: '30 May 2024, 14:20 PM',
      level: 'Level 1',
      status: 'Need Revision',
      statusClass: 'status-revision'
    },
    {
      id: 'CB-2024-000506',
      period: 'Mar 2024',
      comm: '₹ 3,00,00,000.00',
      adj: '₹ 10,00,000.00',
      net: '₹ 3,10,00,000.00',
      agents: '1,500',
      submittedBy: 'Rakesh Sharma',
      submittedRole: 'Manager - Comp Ops',
      submittedDate: '28 May 2024, 09:00 AM',
      level: 'Level 3',
      status: 'Approved',
      statusClass: 'status-approved'
    },
    {
      id: 'CB-2024-000505',
      period: 'Mar 2024',
      comm: '₹ 1,50,00,000.00',
      adj: '₹ 0.00',
      net: '₹ 1,50,00,000.00',
      agents: '750',
      submittedBy: 'Neha Iyer',
      submittedRole: 'Sr. Comp Analyst',
      submittedDate: '25 May 2024, 16:45 PM',
      level: 'Level 3',
      status: 'Approved',
      statusClass: 'status-approved'
    },
    {
      id: 'CB-2024-000504',
      period: 'Feb 2024',
      comm: '₹ 2,20,00,000.00',
      adj: '-₹ 2,00,000.00',
      net: '₹ 2,18,00,000.00',
      agents: '1,050',
      submittedBy: 'Amit Singh',
      submittedRole: 'Comp Analyst',
      submittedDate: '20 May 2024, 11:15 AM',
      level: 'Level 1',
      status: 'Need Revision',
      statusClass: 'status-revision'
    },
    {
      id: 'CB-2024-000503',
      period: 'Feb 2024',
      comm: '₹ 1,90,00,000.00',
      adj: '₹ 1,50,000.00',
      net: '₹ 1,91,50,000.00',
      agents: '920',
      submittedBy: 'Rakesh Sharma',
      submittedRole: 'Manager - Comp Ops',
      submittedDate: '15 May 2024, 10:30 AM',
      level: 'Level 2',
      status: 'Waiting Approval',
      statusClass: 'status-wait'
    },
    {
      id: 'CB-2024-000502',
      period: 'Jan 2024',
      comm: '₹ 2,80,00,000.00',
      adj: '-₹ 8,00,000.00',
      net: '₹ 2,72,00,000.00',
      agents: '1,300',
      submittedBy: 'Neha Iyer',
      submittedRole: 'Sr. Comp Analyst',
      submittedDate: '10 May 2024, 13:00 PM',
      level: 'Level 3',
      status: 'Approved',
      statusClass: 'status-approved'
    },
    {
      id: 'CB-2024-000501',
      period: 'Jan 2024',
      comm: '₹ 1,70,00,000.00',
      adj: '₹ 0.00',
      net: '₹ 1,70,00,000.00',
      agents: '850',
      submittedBy: 'Amit Singh',
      submittedRole: 'Comp Analyst',
      submittedDate: '05 May 2024, 09:45 AM',
      level: 'Level 2',
      status: 'Waiting Approval',
      statusClass: 'status-wait'
    },
    {
      id: 'CB-2024-000500',
      period: 'Dec 2023',
      comm: '₹ 3,50,00,000.00',
      adj: '₹ 25,00,000.00',
      net: '₹ 3,75,00,000.00',
      agents: '1,800',
      submittedBy: 'Rakesh Sharma',
      submittedRole: 'Manager - Comp Ops',
      submittedDate: '01 May 2024, 10:00 AM',
      level: 'Level 3',
      status: 'Approved',
      statusClass: 'status-approved'
    }
  ];

  // --- 2. State ---
  let state = {
    activeTab: 'pending', // 'pending' or 'all'
    levelFilter: '',
    currentPage: 1,
    perPage: 10,
    filteredData: [],
    selectedId: null
  };

  // --- 3. DOM Elements ---
  const tabPending = document.querySelector('[data-tab="pending"]');
  const tabAll = document.querySelector('[data-tab="all"]');
  const levelFilter = document.getElementById('level-filter');
  const tableBody = document.getElementById('ca-table-body');
  const paginationInfo = document.getElementById('ca-pagination-info');
  const pageNumbers = document.getElementById('ca-page-numbers');
  const btnPrev = document.getElementById('ca-prev-btn');
  const btnNext = document.getElementById('ca-next-btn');
  const perPageSelect = document.getElementById('ca-per-page');
  const detailPane = document.getElementById('ca-detail-pane');
  const btnCloseDetail = document.getElementById('btn-close-detail');

  // Detail pane elements
  const dtId = document.getElementById('detail-title-id');
  const dtStatus = document.getElementById('detail-title-status');
  const dsPeriod = document.getElementById('ds-period');
  const dsComm = document.getElementById('ds-comm');
  const dsAdj = document.getElementById('ds-adj');
  const dsNet = document.getElementById('ds-net');
  const dsAgents = document.getElementById('ds-agents');
  const dsDate = document.getElementById('ds-date');

  const notesTextarea = document.querySelector('.notes-textarea');
  const charCount = document.querySelector('.char-count');

  // --- 4. Logic ---
  function updateTabs() {
    tabPending.classList.toggle('active', state.activeTab === 'pending');
    tabAll.classList.toggle('active', state.activeTab === 'all');
    applyFilters();
  }

  function applyFilters() {
    state.filteredData = dummyBatches.filter(b => {
      let matchTab = state.activeTab === 'all' || b.status === 'Waiting Approval';
      let matchLevel = state.levelFilter === '' || b.level === state.levelFilter;
      return matchTab && matchLevel;
    });

    // Reset page if out of bounds
    const maxPage = Math.ceil(state.filteredData.length / state.perPage) || 1;
    if (state.currentPage > maxPage) state.currentPage = 1;

    renderTable();
    renderPagination();
  }

  function renderTable() {
    tableBody.innerHTML = '';
    
    const startIndex = (state.currentPage - 1) * state.perPage;
    const endIndex = Math.min(startIndex + state.perPage, state.filteredData.length);
    const paginated = state.filteredData.slice(startIndex, endIndex);

    if (paginated.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 24px; color:#64748B;">No batches found</td></tr>`;
      return;
    }

    paginated.forEach(item => {
      const isSelected = item.id === state.selectedId;
      const tr = document.createElement('tr');
      if (isSelected) tr.classList.add('selected');
      
      const adjColor = item.adj.startsWith('-') ? 'text-red' : (item.adj !== '₹ 0.00' ? 'text-green' : '');
      
      tr.innerHTML = `
        <td class="text-teal">${item.id}</td>
        <td>${item.period}</td>
        <td>${item.comm}</td>
        <td class="${adjColor}">${item.adj}</td>
        <td>
          <div style="font-weight: 500; color: #1E293B;">${item.submittedBy}</div>
          <div style="font-size: 11px; color: #64748B;">${item.submittedRole}</div>
        </td>
        <td>${item.level}</td>
        <td><span class="${item.statusClass}">${item.status}</span></td>
        <td>
          <button class="view-icon-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></button>
        </td>
      `;

      tr.addEventListener('click', () => {
        state.selectedId = item.id;
        renderTable(); // re-render to show selected row highlight
        showDetailPane(item);
      });

      tableBody.appendChild(tr);
    });
  }

  function renderPagination() {
    const total = state.filteredData.length;
    const totalPages = Math.ceil(total / state.perPage) || 1;
    
    const start = total === 0 ? 0 : ((state.currentPage - 1) * state.perPage) + 1;
    const end = Math.min(start + state.perPage - 1, total);
    paginationInfo.textContent = `Showing ${start} to ${end} of ${total} entries`;

    btnPrev.disabled = state.currentPage === 1;
    btnNext.disabled = state.currentPage === totalPages;

    pageNumbers.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement('button');
      btn.className = `ca-icon-btn ${i === state.currentPage ? 'active' : ''}`;
      if (i === state.currentPage) {
        btn.style.backgroundColor = '#12B9C3';
        btn.style.color = 'white';
        btn.style.borderColor = '#12B9C3';
      }
      btn.textContent = i;
      btn.addEventListener('click', () => {
        state.currentPage = i;
        renderTable();
        renderPagination();
      });
      pageNumbers.appendChild(btn);
    }
  }

  function showDetailPane(item) {
    dtId.textContent = `Batch ID: ${item.id}`;
    dtStatus.textContent = `${item.status} - ${item.level}`;
    dtStatus.className = item.statusClass; // copy color class

    dsPeriod.textContent = item.period;
    dsComm.textContent = item.comm;
    dsAdj.textContent = item.adj;
    dsAdj.className = `summary-value ${item.adj.startsWith('-') ? 'text-red' : (item.adj !== '₹ 0.00' ? 'text-green' : '')}`;
    dsNet.textContent = item.net;
    dsAgents.textContent = item.agents;
    dsDate.textContent = item.submittedDate;

    // reset notes
    notesTextarea.value = '';
    charCount.textContent = '0/500';

    detailPane.classList.add('open');
    detailPane.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  function hideDetailPane() {
    state.selectedId = null;
    detailPane.classList.remove('open');
    renderTable(); // remove selection highlight
  }

  // --- 5. Event Listeners ---
  tabPending.addEventListener('click', () => {
    state.activeTab = 'pending';
    updateTabs();
  });
  tabAll.addEventListener('click', () => {
    state.activeTab = 'all';
    updateTabs();
  });
  
  levelFilter.addEventListener('change', (e) => {
    state.levelFilter = e.target.value;
    applyFilters();
  });

  perPageSelect.addEventListener('change', (e) => {
    state.perPage = parseInt(e.target.value);
    applyFilters();
  });

  btnPrev.addEventListener('click', () => {
    if (state.currentPage > 1) {
      state.currentPage--;
      renderTable();
      renderPagination();
    }
  });

  btnNext.addEventListener('click', () => {
    const totalPages = Math.ceil(state.filteredData.length / state.perPage) || 1;
    if (state.currentPage < totalPages) {
      state.currentPage++;
      renderTable();
      renderPagination();
    }
  });

  btnCloseDetail.addEventListener('click', hideDetailPane);

  notesTextarea.addEventListener('input', (e) => {
    const len = e.target.value.length;
    charCount.textContent = `${len}/500`;
  });

  // Init
  updateTabs();
});
