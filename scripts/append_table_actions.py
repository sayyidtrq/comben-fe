import re

with open('js/data-preparation.js', 'r') as f:
    content = f.read()

if 'btn-dp-exclude' not in content:
    addition = """
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
"""
    # Insert before the last `});`
    content = content.replace("  applyFilters(); // Initial render\n",
    "  applyFilters(); // Initial render\n" + addition + "\n")
    
    with open('js/data-preparation.js', 'w') as f:
        f.write(content)
