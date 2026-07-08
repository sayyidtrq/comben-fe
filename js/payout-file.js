// js/payout-file.js

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Table Row Selection Simulation ---
  const tableRows = document.querySelectorAll('#batch-table tbody tr');
  const sumBatch = document.getElementById('sum-batch');
  const sumAmount = document.getElementById('sum-amount');
  const sumFStatus = document.getElementById('sum-fstatus');
  const sumAgents = document.getElementById('sum-agents');
  const sumPStatus = document.getElementById('sum-pstatus');
  const sumCreated = document.getElementById('sum-created');
  const sumNet = document.getElementById('sum-net');

  // We can just extract data from the row when clicked
  tableRows.forEach(row => {
    row.addEventListener('click', () => {
      // Remove selected class from all
      tableRows.forEach(r => r.classList.remove('selected'));
      // Add to clicked
      row.classList.add('selected');

      const cells = row.querySelectorAll('td');
      const batchId = cells[0].textContent;
      const agents = cells[3].textContent;
      const amount = cells[4].textContent;
      const fStatusHTML = cells[5].innerHTML;
      const pStatusHTML = cells[6].innerHTML;
      const created = cells[7].textContent;

      // Update summary section
      sumBatch.textContent = batchId;
      sumAmount.textContent = amount;
      sumFStatus.innerHTML = fStatusHTML;
      sumAgents.textContent = agents;
      sumPStatus.innerHTML = pStatusHTML;
      sumCreated.textContent = created;
      sumNet.textContent = amount; // Net payout is roughly amount
      
      // Reset Timeline when a different row is clicked to show interactivity
      resetTimeline();
    });
  });

  // --- 2. Generate File Logic ---
  const btnGenerateFile = document.getElementById('btn-generate-file');
  const dlButtons = document.querySelectorAll('.btn-dl');
  
  const tlGeneratedDot = document.getElementById('tl-generated-dot');
  const tlGeneratedDesc = document.getElementById('tl-generated-desc');
  
  const tlPaidDot = document.getElementById('tl-paid-dot');
  const tlPaidTitle = document.getElementById('tl-paid-title');
  const tlPaidDesc = document.getElementById('tl-paid-desc');
  
  const tlReconDot = document.getElementById('tl-recon-dot');

  // By default disable downloads
  dlButtons.forEach(btn => btn.disabled = true);

  function resetTimeline() {
    dlButtons.forEach(btn => btn.disabled = true);
    
    tlGeneratedDot.className = 'tl-dot';
    tlGeneratedDesc.innerHTML = 'Pending';
    
    tlPaidDot.className = 'tl-dot';
    tlPaidTitle.style.color = '#64748B';
    tlPaidDesc.innerHTML = 'Pending';
    
    tlReconDot.className = 'tl-dot';
  }

  btnGenerateFile.addEventListener('click', () => {
    // Change button temporarily
    const originalText = btnGenerateFile.innerHTML;
    btnGenerateFile.innerHTML = 'Generating...';
    btnGenerateFile.style.opacity = '0.7';

    setTimeout(() => {
      btnGenerateFile.innerHTML = originalText;
      btnGenerateFile.style.opacity = '1';
      
      // Update Timeline
      tlGeneratedDot.className = 'tl-dot done';
      tlGeneratedDesc.innerHTML = 'Just now<br>By: Admin User';
      
      // Enable downloads
      dlButtons.forEach(btn => {
        btn.disabled = false;
        // add alert when clicked
        btn.onclick = () => alert('Downloading ' + btn.textContent.trim() + ' file...');
      });
      
      alert('File successfully generated! You can now download the CSV, TXT, or XLSX file.');
    }, 1500);
  });

  // --- 3. Filter and Pagination Interaction ---
  document.querySelectorAll('.pagination').forEach(paginationEl => {
    paginationEl.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const btnEl = e.target.closest('.page-btn');
        
        if(!btnEl.innerHTML.includes('svg')) {
          paginationEl.querySelectorAll('.page-btn').forEach(b => {
            if(!b.innerHTML.includes('svg')) b.classList.remove('active');
          });
          btnEl.classList.add('active');
        }
        
        // Find the corresponding table to update
        const container = paginationEl.closest('.pf-card');
        const tbody = container ? container.querySelector('.pf-table tbody') : null;
        
        if (tbody) {
          const rows = Array.from(tbody.querySelectorAll('tr'));
          // Shuffle rows to simulate data loading
          rows.sort(() => Math.random() - 0.5);
          tbody.innerHTML = '';
          
          rows.forEach(r => {
            const cells = r.querySelectorAll('td');
            // Randomize amounts slightly
            cells.forEach(cell => {
              if (cell.textContent.includes('₱')) {
                let amountStr = cell.textContent.replace(/[^0-9.-]+/g,"");
                if (amountStr) {
                  let amount = parseFloat(amountStr);
                  amount = amount * (0.8 + (Math.random() * 0.4));
                  cell.innerHTML = '₱ ' + amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
                }
              }
            });
            tbody.appendChild(r);
            r.classList.remove('selected');
          });
          
          // Reset summary if this is the batch table
          if (container.querySelector('thead').innerHTML.includes('Total Agents')) {
            sumBatch.textContent = "-";
            sumAmount.textContent = "-";
            sumAgents.textContent = "-";
            sumFStatus.innerHTML = "";
            sumPStatus.innerHTML = "";
            sumCreated.textContent = "-";
            sumNet.textContent = "-";
          }
        }
      });
    });
  });

  document.getElementById('btn-generate-pay-order').addEventListener('click', () => {
    alert('Generating Pay Order for selected criteria...');
  });
  document.getElementById('btn-export-bank').addEventListener('click', () => {
    alert('Exporting Bank File...');
  });
  document.getElementById('btn-reconcile').addEventListener('click', () => {
    alert('Starting Reconciliation Process...');
  });
  document.getElementById('btn-save-draft').addEventListener('click', () => {
    alert('Draft saved successfully.');
  });
});
