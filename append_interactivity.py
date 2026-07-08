import re

with open('js/dashboard.js', 'r') as f:
    content = f.read()

# Make sure we don't append multiple times
if 'monthlyFilter.addEventListener' not in content:
    addition = """
    // Interactivity for filters
    const monthlyFilter = document.getElementById('monthlyTrendFilter');
    if (monthlyFilter) {
      monthlyFilter.addEventListener('change', (e) => {
        const chart = Chart.getChart('monthlyTrendChart');
        if (chart) {
          if (e.target.value === 'Last Year') {
            chart.data.datasets[0].data = [400000, 600000, 750000, 900000, 1100000, 700000, 950000, 850000, 500000, 650000, 700000, 1200000];
          } else {
            chart.data.datasets[0].data = [500000, 750000, 800000, 1000000, 1245780, 850000, 1200000, 800000, 450000, 600000, 800000, 1300000];
          }
          chart.update();
        }
      });
    }

    const agentsFilter = document.getElementById('topAgentsFilter');
    if (agentsFilter) {
      agentsFilter.addEventListener('change', (e) => {
        const chart = Chart.getChart('topAgentsChart');
        if (chart) {
          if (e.target.value === 'Last Month') {
            chart.data.labels = ['Kevin Chang', 'Aiman Rahman', 'Farah Izzati', 'Siti Nurhaliza', 'Daniel Wong'];
            chart.data.datasets[0].data = [78000, 65000, 61000, 59000, 42000];
          } else {
            chart.data.labels = ['Aiman Rahman', 'Siti Nurhaliza', 'Daniel Wong', 'Farah Izzati', 'Kevin Chang'];
            chart.data.datasets[0].data = [85420, 72310, 65870, 54210, 49860];
          }
          chart.update();
        }
      });
    }

    const productsFilter = document.getElementById('topProductsFilter');
    if (productsFilter) {
      productsFilter.addEventListener('change', (e) => {
        const chart = Chart.getChart('topProductsChart');
        if (chart) {
          if (e.target.value === 'Last Month') {
            chart.data.labels = ['Investment Link', 'Medical Plan', 'Critical Illness', 'Personal Accident', 'Term Life'];
            chart.data.datasets[0].data = [3950000, 3600000, 1800000, 1500000, 1100000];
          } else {
            chart.data.labels = ['Medical Plan', 'Investment Link', 'Term Life', 'Critical Illness', 'Personal Accident'];
            chart.data.datasets[0].data = [4250000, 3180000, 2120000, 1540000, 1360000];
          }
          chart.update();
        }
      });
    }

    const lowPerfFilter = document.getElementById('lowPerfFilter');
    if (lowPerfFilter) {
      lowPerfFilter.addEventListener('change', (e) => {
        if (e.target.value === 'Last Month') {
          dummyData[0] = [
            { id: 1, area: 'Kuching', sales: '280,000', commission: '28,000', policies: 140, agents: 25, target: '▼ -20.1%', perf: 'Poor' },
            { id: 2, area: 'Ipoh', sales: '240,500', commission: '24,050', policies: 110, agents: 22, target: '▼ -18.5%', perf: 'Poor' },
            { id: 3, area: 'Melaka', sales: '195,000', commission: '19,500', policies: 95, agents: 18, target: '▼ -16.2%', perf: 'Poor' },
            { id: 4, area: 'Klang', sales: '170,200', commission: '17,020', policies: 82, agents: 14, target: '▼ -15.4%', perf: 'Poor' },
            { id: 5, area: 'Sandakan', sales: '150,000', commission: '15,000', policies: 68, agents: 11, target: '▼ -14.0%', perf: 'Poor' }
          ];
        } else {
          dummyData[0] = [
            { id: 1, area: 'Johor Bahru', sales: '320,450', commission: '32,150', policies: 152, agents: 28, target: '▼ -24.6%', perf: 'Poor' },
            { id: 2, area: 'Kota Bharu', sales: '210,320', commission: '21,060', policies: 98, agents: 19, target: '▼ -21.3%', perf: 'Poor' },
            { id: 3, area: 'Sandakan', sales: '180,980', commission: '18,430', policies: 86, agents: 17, target: '▼ -19.8%', perf: 'Poor' },
            { id: 4, area: 'Sibu', sales: '165,750', commission: '16,570', policies: 74, agents: 15, target: '▼ -18.4%', perf: 'Poor' },
            { id: 5, area: 'Labuan', sales: '142,220', commission: '14,220', policies: 62, agents: 12, target: '▼ -17.6%', perf: 'Poor' }
          ];
        }
        renderTable(1);
      });
    }

    const lowPerfViewAll = document.getElementById('lowPerfViewAll');
    if (lowPerfViewAll) {
      lowPerfViewAll.addEventListener('click', (e) => {
        e.preventDefault();
        const paginationContainer = document.querySelector('.table-pagination');
        if (paginationContainer) {
          paginationContainer.style.display = 'none';
        }
        lowPerfTbody.innerHTML = '';
        let allData = [];
        dummyData.forEach(pageData => {
          allData = allData.concat(pageData);
        });
        allData.forEach(item => {
          lowPerfTbody.innerHTML += `
            <tr>
              <td>${item.id}</td>
              <td>${item.area}</td>
              <td class="text-right">${item.sales}</td>
              <td class="text-right">${item.commission}</td>
              <td class="text-center">${item.policies}</td>
              <td class="text-center">${item.agents}</td>
              <td class="text-right trend-negative">${item.target}</td>
              <td class="text-center"><span class="badge-poor">${item.perf}</span></td>
            </tr>
          `;
        });
      });
    }
"""
    # Insert just before the last } (which is the end of the DOMContentLoaded block or the end of the file)
    # Actually, the file currently ends with `  }` or `});` ? Let's just strip and append, and wrap it if needed.
    # We'll just replace the last closing bracket of the if (lowPerfTbody) block.
    # The if (lowPerfTbody && paginationControls.length > 0) { ... } ends right before the end of the file.
    
    # We can just append it before the very last '  }\n});' or whatever it is.
    content = content.replace("paginationControls[4].addEventListener('click', () => { if (currentPage < 3) renderTable(currentPage + 1); });",
    "paginationControls[4].addEventListener('click', () => { if (currentPage < 3) renderTable(currentPage + 1); });\n" + addition)
    
    with open('js/dashboard.js', 'w') as f:
        f.write(content)
