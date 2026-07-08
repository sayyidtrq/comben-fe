import re

with open('js/data-preparation.js', 'r') as f:
    content = f.read()

# Make sure we don't append multiple times
if 'dateRangeBtn.addEventListener' not in content:
    addition = """
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
"""
    # Insert before the last `});`
    content = content.replace("  applyFilters(); // Initial render\n});",
    "  applyFilters(); // Initial render\n" + addition + "\n});")
    
    with open('js/data-preparation.js', 'w') as f:
        f.write(content)
