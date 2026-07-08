// js/data-preparation.js

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Dummy Data ---
  const dummyData = [
    { id: 'AGT-00012345', date: '05/15/2024', source: 'Agent Upload', sourceIcon: 'X', sourceClass: 'icon-excel', issueType: 'Missing Agent Code', issueClass: 'pill-orange', desc: "Agent code is missing for Agent Name 'John Smith'.", status: 'New', statusClass: 'status-new' },
    { id: 'POL-00067890', date: '05/14/2024', source: 'Policy Upload', sourceIcon: 'C', sourceClass: 'icon-csv', issueType: 'Missing Product Code', issueClass: 'pill-orange', desc: "Product code is missing for Policy 'POL-00067890'.", status: 'New', statusClass: 'status-new' },
    { id: 'PRM-00123456', date: '05/13/2024', source: 'Premium Upload', sourceIcon: 'X', sourceClass: 'icon-excel', issueType: 'Invalid Date Format', issueClass: 'pill-blue', desc: "Premium date format is invalid. Expected MM/DD/YYYY.", status: 'In Progress', statusClass: 'status-progress' },
    { id: 'AGT-00023456', date: '05/12/2024', source: 'Agent Upload', sourceIcon: 'C', sourceClass: 'icon-csv', issueType: 'Duplicate Record', issueClass: 'pill-blue', desc: "Duplicate record found for Agent Code 'AGT-00023456'.", status: 'New', statusClass: 'status-new' },
    { id: 'POL-00034567', date: '05/10/2024', source: 'Policy Upload', sourceIcon: 'X', sourceClass: 'icon-excel', issueType: 'Invalid Product Code', issueClass: 'pill-blue', desc: "Product code 'PRD-9999' is not valid.", status: 'In Progress', statusClass: 'status-progress' },
    { id: 'PRM-00134567', date: '05/01/2024', source: 'Premium Upload', sourceIcon: 'C', sourceClass: 'icon-csv', issueType: 'Missing Agent Code', issueClass: 'pill-orange', desc: "Agent code is missing for premium record.", status: 'Resolved', statusClass: 'status-resolved' },
    { id: 'POL-00045678', date: '04/29/2024', source: 'Policy Upload', sourceIcon: 'X', sourceClass: 'icon-excel', issueType: 'Missing Effective Date', issueClass: 'pill-orange', desc: "Policy effective date is missing.", status: 'New', statusClass: 'status-new' },
    { id: 'AGT-00056789', date: '04/28/2024', source: 'Agent Upload', sourceIcon: 'C', sourceClass: 'icon-csv', issueType: 'Data Type Mismatch', issueClass: 'pill-blue', desc: "Agent age has non-numeric value 'N/A'.", status: 'In Progress', statusClass: 'status-progress' },
    { id: 'PRM-00145678', date: '04/25/2024', source: 'Premium Upload', sourceIcon: 'X', sourceClass: 'icon-excel', issueType: 'Duplicate Record', issueClass: 'pill-blue', desc: "Duplicate premium payment detected.", status: 'Resolved', statusClass: 'status-resolved' },
    { id: 'POL-00056789', date: '04/20/2024', source: 'Policy Upload', sourceIcon: 'C', sourceClass: 'icon-csv', issueType: 'Missing Product Code', issueClass: 'pill-orange', desc: "Product code is missing for Policy 'POL-00056789'.", status: 'New', statusClass: 'status-new' },
    { id: 'AGT-00067890', date: '04/15/2024', source: 'Agent Upload', sourceIcon: 'X', sourceClass: 'icon-excel', issueType: 'Missing Agent Code', issueClass: 'pill-orange', desc: "Agent code is missing for Agent Name 'Jane Doe'.", status: 'In Progress', statusClass: 'status-progress' },
    { id: 'PRM-00156789', date: '04/10/2024', source: 'Premium Upload', sourceIcon: 'C', sourceClass: 'icon-csv', issueType: 'Invalid Date Format', issueClass: 'pill-blue', desc: "Invalid effective date '31/02/2024'.", status: 'New', statusClass: 'status-new' },
    { id: 'POL-00067891', date: '04/05/2024', source: 'Policy Upload', sourceIcon: 'X', sourceClass: 'icon-excel', issueType: 'Data Type Mismatch', issueClass: 'pill-blue', desc: "Premium amount is not a number.", status: 'Resolved', statusClass: 'status-resolved' },
    { id: 'AGT-00078901', date: '04/01/2024', source: 'Agent Upload', sourceIcon: 'C', sourceClass: 'icon-csv', issueType: 'Missing Agent Code', issueClass: 'pill-orange', desc: "Agent code missing for 'Michael Smith'.", status: 'New', statusClass: 'status-new' },
    { id: 'PRM-00167890', date: '03/25/2024', source: 'Premium Upload', sourceIcon: 'X', sourceClass: 'icon-excel', issueType: 'Duplicate Record', issueClass: 'pill-blue', desc: "Exact duplicate record on line 450.", status: 'In Progress', statusClass: 'status-progress' }
  ];

  // --- 2. State Variables ---
  let currentState = {
    source: '',
    issueType: '',
    status: '',
    search: '',
    dateRange: '05/13/2024 - 05/20/2024',
    currentPage: 1,
    perPage: 10,
    filteredData: []
  };

  // --- 3. DOM Elements ---
  const elSource = document.getElementById('filter-source');
  const elIssueType = document.getElementById('filter-issue-type');
  const elStatus = document.getElementById('filter-status');
  const elSearch = document.getElementById('filter-search');
  const btnClear = document.getElementById('btn-clear-filters');
  const tableBody = document.getElementById('table-body');
  const elPerPage = document.getElementById('per-page');
  const paginationControls = document.getElementById('pagination-controls');
  const paginationInfo = document.getElementById('pagination-info');
  const selectAllCheckbox = document.getElementById('select-all');

  // --- 4. Filtering Logic ---
  function applyFilters() {
    let filtered = dummyData.filter(item => {
      let matchSource = currentState.source === '' || item.source === currentState.source;
      let matchIssue = currentState.issueType === '' || item.issueType === currentState.issueType;
      let matchStatus = currentState.status === '' || item.status === currentState.status;
      
      let searchLower = currentState.search.toLowerCase();
      let matchSearch = currentState.search === '' || 
                        item.id.toLowerCase().includes(searchLower) || 
                        item.desc.toLowerCase().includes(searchLower);

      let matchDate = true;
      if (currentState.dateRange === '05/13/2024 - 05/20/2024') {
        // e.g. dates matching May 13 to May 20
        matchDate = item.date.startsWith('05/13') || item.date.startsWith('05/14') || item.date.startsWith('05/15');
      } else if (currentState.dateRange === 'Last 30 Days') {
        // e.g. dates matching April and May
        matchDate = item.date.startsWith('05/') || item.date.startsWith('04/');
      }

      return matchSource && matchIssue && matchStatus && matchSearch && matchDate;
    });

    currentState.filteredData = filtered;
    
    // Reset to page 1 if current page is out of bounds
    const maxPage = Math.ceil(filtered.length / currentState.perPage) || 1;
    if (currentState.currentPage > maxPage) {
      currentState.currentPage = 1;
    }

    renderTable();
    renderPagination();
  }

  // --- 5. Render Table ---
  function renderTable() {
    tableBody.innerHTML = '';
    
    const startIndex = (currentState.currentPage - 1) * currentState.perPage;
    const endIndex = Math.min(startIndex + currentState.perPage, currentState.filteredData.length);
    const paginatedData = currentState.filteredData.slice(startIndex, endIndex);

    if (paginatedData.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 32px; color: #64748B;">No records found matching the current filters.</td></tr>`;
      return;
    }

    paginatedData.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="checkbox-cell"><input type="checkbox" class="dp-checkbox row-checkbox"></td>
        <td>
          <div class="source-cell">
            <span class="source-icon ${item.sourceClass}">${item.sourceIcon}</span> ${item.source}
          </div>
        </td>
        <td>${item.id}</td>
        <td><span class="issue-type-pill ${item.issueClass}">${item.issueType}</span></td>
        <td>${item.desc}</td>
        <td><span class="status-badge ${item.statusClass}">${item.status}</span></td>
        <td>
          <div class="action-cell">
            <button class="view-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> View</button>
            <button class="more-btn"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="12" cy="19" r="2"/></svg></button>
          </div>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    // Reset select all checkbox
    selectAllCheckbox.checked = false;
    bindRowCheckboxes();
  }

  // --- 6. Render Pagination ---
  function renderPagination() {
    const totalItems = currentState.filteredData.length;
    const totalPages = Math.ceil(totalItems / currentState.perPage) || 1;
    
    // Update Info Text
    const startIndex = totalItems === 0 ? 0 : ((currentState.currentPage - 1) * currentState.perPage) + 1;
    const endIndex = Math.min(startIndex + currentState.perPage - 1, totalItems);
    paginationInfo.textContent = `Showing ${startIndex} to ${endIndex} of ${totalItems} records`;

    // Render Controls
    let html = '';
    
    // First & Prev buttons
    const prevDisabled = currentState.currentPage === 1 ? 'disabled' : '';
    html += `<button class="page-btn" data-action="first" ${prevDisabled}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg></button>`;
    html += `<button class="page-btn" data-action="prev" ${prevDisabled}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="m15 18-6-6 6-6"/></svg></button>`;

    // Page Numbers (Simplified logic: show up to 3 pages around current)
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentState.currentPage - 1 && i <= currentState.currentPage + 1)) {
        const activeClass = i === currentState.currentPage ? 'active' : '';
        html += `<button class="page-btn ${activeClass}" data-page="${i}">${i}</button>`;
      } else if (i === currentState.currentPage - 2 || i === currentState.currentPage + 2) {
        html += `<span style="padding: 0 4px; color: #94A3B8;">...</span>`;
      }
    }

    // Next & Last buttons
    const nextDisabled = currentState.currentPage === totalPages ? 'disabled' : '';
    html += `<button class="page-btn" data-action="next" ${nextDisabled}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="m9 18 6-6-6-6"/></svg></button>`;
    html += `<button class="page-btn" data-action="last" ${nextDisabled}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="m13 17 5-5-5-5"/><path d="m6 17 5-5-5-5"/></svg></button>`;

    paginationControls.innerHTML = html;

    // Bind Pagination Clicks
    paginationControls.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (btn.disabled) return;
        
        const action = btn.getAttribute('data-action');
        const page = btn.getAttribute('data-page');

        if (page) {
          currentState.currentPage = parseInt(page);
        } else if (action === 'prev') {
          currentState.currentPage--;
        } else if (action === 'next') {
          currentState.currentPage++;
        } else if (action === 'first') {
          currentState.currentPage = 1;
        } else if (action === 'last') {
          currentState.currentPage = totalPages;
        }

        renderTable();
        renderPagination();
      });
    });
  }

  // --- 7. Select All Checkbox ---
  function bindRowCheckboxes() {
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    rowCheckboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const allChecked = Array.from(rowCheckboxes).every(c => c.checked);
        const someChecked = Array.from(rowCheckboxes).some(c => c.checked);
        selectAllCheckbox.checked = allChecked;
        selectAllCheckbox.indeterminate = someChecked && !allChecked;
      });
    });
  }

  selectAllCheckbox.addEventListener('change', (e) => {
    const rowCheckboxes = document.querySelectorAll('.row-checkbox');
    rowCheckboxes.forEach(cb => {
      cb.checked = e.target.checked;
    });
  });

  // --- 8. Event Listeners for Filters ---
  elSource.addEventListener('change', (e) => {
    currentState.source = e.target.value;
    applyFilters();
  });

  elIssueType.addEventListener('change', (e) => {
    currentState.issueType = e.target.value;
    applyFilters();
  });

  elStatus.addEventListener('change', (e) => {
    currentState.status = e.target.value;
    applyFilters();
  });

  elSearch.addEventListener('input', (e) => {
    currentState.search = e.target.value;
    applyFilters();
  });

  elPerPage.addEventListener('change', (e) => {
    currentState.perPage = parseInt(e.target.value);
    applyFilters(); // Re-apply to reset page if necessary
  });

  btnClear.addEventListener('click', () => {
    // Reset state
    currentState.source = '';
    currentState.issueType = '';
    currentState.status = '';
    currentState.search = '';
    currentState.currentPage = 1;
    
    // Reset DOM elements
    elSource.value = '';
    elIssueType.value = '';
    elStatus.value = '';
    elSearch.value = '';

    applyFilters();
  });

  // --- Initialization ---
  applyFilters(); // Initial render

  // --- 10. Table Action Buttons Interactivity ---
  const btnExclude = document.getElementById('btn-dp-exclude');
  const btnRevalidate = document.getElementById('btn-dp-revalidate');
  const btnDownload = document.getElementById('btn-dp-download');
  
  if (btnExclude) {
    btnExclude.addEventListener('click', () => {
      const rowCheckboxes = document.querySelectorAll('.row-checkbox:checked');
      if (rowCheckboxes.length === 0) {
        if (typeof showToast === 'function') showToast('Please select at least one record to exclude.');
        return;
      }
      
      const count = rowCheckboxes.length;
      if (typeof showToast === 'function') showToast(`${count} record(s) excluded from calculation.`);
      
      rowCheckboxes.forEach(cb => cb.checked = false);
      const selectAll = document.getElementById('select-all');
      if (selectAll) selectAll.checked = false;
    });
  }
  
  if (btnRevalidate) {
    btnRevalidate.addEventListener('click', () => {
      const originalText = btnRevalidate.innerHTML;
      btnRevalidate.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Revalidating...`;
      
      if (!document.getElementById('spin-style')) {
        const style = document.createElement('style');
        style.id = 'spin-style';
        style.innerHTML = `@keyframes spin { 100% { transform: rotate(360deg); } }`;
        document.head.appendChild(style);
      }
      
      setTimeout(() => {
        btnRevalidate.innerHTML = originalText;
        if (typeof showToast === 'function') showToast('Revalidation complete. All data up to date.');
      }, 1500);
    });
  }
  
  if (btnDownload) {
    btnDownload.addEventListener('click', () => {
      const originalText = btnDownload.innerHTML;
      btnDownload.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Generating...`;
      
      if (!document.getElementById('spin-style')) {
        const style = document.createElement('style');
        style.id = 'spin-style';
        style.innerHTML = `@keyframes spin { 100% { transform: rotate(360deg); } }`;
        document.head.appendChild(style);
      }
      
      setTimeout(() => {
        btnDownload.innerHTML = originalText;
        if (typeof showToast === 'function') showToast('error_log_052024.csv downloaded successfully.');
      }, 1000);
    });
  }


  // --- 9. Date Range Dropdown Interactivity ---
  const dateRangeBtn = document.getElementById('date-range-btn');
  const dateRangeDropdown = document.getElementById('date-range-dropdown');
  const dateRangeText = document.getElementById('date-range-text');
  
  if (dateRangeBtn && dateRangeDropdown && dateRangeText) {
    // Toggle dropdown
    dateRangeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = dateRangeDropdown.style.display === 'block';
      dateRangeDropdown.style.display = isVisible ? 'none' : 'block';
    });
    
    // Select option
    const options = dateRangeDropdown.querySelectorAll('.date-option');
    options.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedRange = opt.getAttribute('data-range');
        dateRangeText.textContent = selectedRange;
        dateRangeDropdown.style.display = 'none';
        
        currentState.dateRange = selectedRange;
        applyFilters();
      });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      dateRangeDropdown.style.display = 'none';
    });
  }

});
