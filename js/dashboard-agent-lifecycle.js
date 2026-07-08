document.addEventListener('DOMContentLoaded', () => {
  // Chart Instances
  let barChart, donutChart;
  
  // Initialize Charts
  function initCharts() {
    const barCtx = document.getElementById('activeAgentsChart').getContext('2d');
    const donutCtx = document.getElementById('agentStatusChart').getContext('2d');

    // Horizontal Bar Chart
    barChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Jakarta Selatan', 'Surabaya', 'Bandung', 'Medan', 'Makassar', 'Balikpapan', 'Semarang', 'Palembang', 'Denpasar', 'Banjarmasin'],
        datasets: [{
          label: 'Jumlah Agen',
          data: [812, 678, 512, 421, 389, 312, 298, 287, 256, 217],
          backgroundColor: '#12B9C3',
          borderRadius: 4,
          barThickness: 12
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { color: '#F3F4F6' },
            ticks: { font: { size: 10 }, color: '#6B7280' }
          },
          y: {
            grid: { display: false },
            ticks: { font: { size: 11 }, color: '#374151' }
          }
        }
      }
    });

    // Donut Chart
    donutChart = new Chart(donutCtx, {
      type: 'doughnut',
      data: {
        labels: ['Active', 'Inactive', 'Suspend', 'Resign'],
        datasets: [{
          data: [4028, 412, 182, 160],
          backgroundColor: ['#12B9C3', '#3B82F6', '#F59E0B', '#8B5CF6'],
          borderWidth: 0,
          cutout: '75%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 0
        },
        plugins: {
          legend: {
            display: false // We will use a custom HTML legend to match exactly
          }
        }
      },
      plugins: [{
        id: 'centerText',
        beforeDraw: function(chart) {
          const width = chart.width, height = chart.height, ctx = chart.ctx;
          ctx.restore();
          
          const centerX = chart.width / 2;
          const centerY = chart.height / 2;
          
          ctx.font = "bold 20px Inter, sans-serif";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#111827";
          
          const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
          const text = total.toLocaleString('id-ID');
          const textX = Math.round(centerX - ctx.measureText(text).width / 2);
          ctx.fillText(text, textX, centerY - 10);
          
          ctx.font = "500 12px Inter, sans-serif";
          ctx.fillStyle = "#6B7280";
          const subText = "Total";
          const subTextX = Math.round(centerX - ctx.measureText(subText).width / 2);
          ctx.fillText(subText, subTextX, centerY + 10);
          ctx.save();
        }
      }]
    });

    // Render Custom Legend
    function renderDonutLegend() {
      const data = donutChart.data.datasets[0].data;
      const labels = donutChart.data.labels;
      const colors = donutChart.data.datasets[0].backgroundColor;
      const total = data.reduce((a, b) => a + b, 0);
      
      let html = '';
      data.forEach((val, i) => {
        const perc = ((val / total) * 100).toFixed(1) + '%';
        html += `
          <div class="legend-item">
            <div class="legend-dot" style="background: ${colors[i]};"></div>
            <div class="legend-name">${labels[i]}</div>
            <div class="legend-value">${val.toLocaleString('id-ID')}</div>
            <div class="legend-perc">${perc}</div>
          </div>
        `;
      });
      document.getElementById('donutLegend').innerHTML = html;
    }
    renderDonutLegend();
    
    // Attach to chart update so it refreshes when data changes
    const originalUpdate = donutChart.update.bind(donutChart);
    donutChart.update = function() {
      originalUpdate();
      renderDonutLegend();
    };
  }

  // Initial List Data
  const licensesData = [
    [
      { initials: 'AH', name: 'Andi Hermawan', id: 'AGT-000123', date: '15 Jun 2025', days: '15 hari lagi', color: '#E3F2FD', text: '#1E88E5' },
      { initials: 'DS', name: 'Dewi Sartika', id: 'AGT-000456', date: '20 Jun 2025', days: '20 hari lagi', color: '#F3E5F5', text: '#8E24AA' },
      { initials: 'RP', name: 'Rudi Pratama', id: 'AGT-000789', date: '27 Jun 2025', days: '27 hari lagi', color: '#E0F2F1', text: '#00897B' }
    ],
    [
      { initials: 'YL', name: 'Yuliana Lestari', id: 'AGT-001234', date: '05 Jul 2025', days: '35 hari lagi', color: '#FFF3E0', text: '#FB8C00' },
      { initials: 'BS', name: 'Bambang Setiawan', id: 'AGT-001567', date: '12 Jul 2025', days: '42 hari lagi', color: '#E8F5E9', text: '#43A047' },
      { initials: 'MK', name: 'Mila Karmila', id: 'AGT-001890', date: '15 Jul 2025', days: '45 hari lagi', color: '#FFEBEE', text: '#E53935' }
    ]
  ];
  let licensesIndex = 0;

  const approvalsData = [
    [
      { name: 'Siti Nurhaliza', id: 'AGT-002345', role: 'Agen', branch: 'Jakarta Selatan', date: '22 Mei 2025', by: 'Rina Setiawati', ok: true },
      { name: 'Fajar Ramadhan', id: 'AGT-002346', role: 'Agen', branch: 'Bandung', date: '21 Mei 2025', by: 'Rina Setiawati', ok: true },
      { name: 'Nanda Pratama', id: 'AGT-002347', role: 'Unit Manager', branch: 'Surabaya', date: '20 Mei 2025', by: 'Budi Santoso', ok: true }
    ],
    [
      { name: 'Maya Lestari', id: 'AGT-002348', role: 'Agen', branch: 'Medan', date: '19 Mei 2025', by: 'Rina Setiawati', ok: true },
      { name: 'Ahmad Fauzi', id: 'AGT-002349', role: 'Agen', branch: 'Makassar', date: '18 Mei 2025', by: 'Dedi Kurniawan', ok: true },
      { name: 'Bima Sakti', id: 'AGT-002350', role: 'Agen', branch: 'Bali', date: '17 Mei 2025', by: 'Rina Setiawati', ok: false }
    ]
  ];
  let approvalsIndex = 0;

  const activitiesData = [
    [
      { iconType: 'onboarding', title: 'Onboarding dimulai untuk Dinda Ayu Lestari', id: 'AGT-002567', detail: 'Jakarta Selatan', time: '10:24' },
      { iconType: 'verify', title: 'Dokumen berhasil diverifikasi untuk Riko Ananda', id: 'AGT-002566', detail: 'Bandung', time: '09:47' },
      { iconType: 'mutation', title: 'Pengajuan mutasi untuk Budi Setiawan', id: 'AGT-001234', detail: 'Dari Surabaya ke Jakarta Selatan', time: 'Kemarin 16:32' }
    ],
    [
      { iconType: 'recruit', title: 'Persetujuan rekrutmen untuk 3 kandidat', id: '', detail: 'Oleh: Rina Setiawati', time: 'Kemarin 14:10' },
      { iconType: 'license', title: 'Lisensi akan kadaluarsa untuk 12 agen', id: '', detail: 'Dalam 30 hari ke depan', time: 'Kemarin 09:15' },
      { iconType: 'onboarding', title: 'Onboarding selesai untuk Reza Pahlevi', id: 'AGT-002560', detail: 'Semarang', time: 'Kemarin 08:00' }
    ]
  ];
  let activitiesIndex = 0;

  // Render Functions
  function renderLicenses() {
    const list = document.getElementById('licensesList');
    list.innerHTML = '';
    licensesData[licensesIndex].forEach(item => {
      list.innerHTML += `
        <div class="al-list-item">
          <div class="al-list-avatar" style="background-color: ${item.color}; color: ${item.text};">${item.initials}</div>
          <div class="al-list-content">
            <div class="al-list-title">${item.name}</div>
            <div class="al-list-subtitle">${item.id}</div>
          </div>
          <div class="al-list-meta">
            <div class="al-list-meta-title">${item.date}</div>
            <div class="al-list-meta-subtitle">${item.days}</div>
          </div>
        </div>`;
    });
  }

  function renderApprovals() {
    const list = document.getElementById('approvalsList');
    list.innerHTML = '';
    approvalsData[approvalsIndex].forEach(item => {
      const iconStr = item.ok 
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
      
      list.innerHTML += `
        <div class="al-list-item" style="border-bottom: 1px solid #F3F4F6; padding-bottom: 12px;">
          <div class="activity-icon" style="background: ${item.ok ? '#E8F5E9' : '#FFEBEE'};">${iconStr}</div>
          <div class="al-list-content">
            <div class="al-list-title">${item.name}</div>
            <div class="al-list-subtitle">${item.id}</div>
          </div>
          <div class="al-list-content">
            <div class="al-list-title" style="font-weight: 500;">${item.role}</div>
            <div class="al-list-subtitle">${item.branch}</div>
          </div>
          <div class="al-list-meta">
            <div class="al-list-meta-title" style="font-weight: 500;">${item.date}</div>
            <div class="al-list-meta-subtitle" style="color: #6B7280;">Oleh: ${item.by}</div>
          </div>
        </div>`;
    });
  }

  function renderActivities() {
    const list = document.getElementById('activitiesList');
    list.innerHTML = '';
    
    const icons = {
      'onboarding': '<svg viewBox="0 0 24 24" fill="none" stroke="#1E88E5" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><circle cx="20" cy="11" r="2"/></svg>',
      'verify': '<svg viewBox="0 0 24 24" fill="none" stroke="#00897B" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="m9 15 2 2 4-4"/></svg>',
      'mutation': '<svg viewBox="0 0 24 24" fill="none" stroke="#FB8C00" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>',
      'recruit': '<svg viewBox="0 0 24 24" fill="none" stroke="#8E24AA" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/></svg>',
      'license': '<svg viewBox="0 0 24 24" fill="none" stroke="#E53935" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
    };
    
    const colors = {
      'onboarding': '#E3F2FD', 'verify': '#E0F2F1', 'mutation': '#FFF3E0', 'recruit': '#F3E5F5', 'license': '#FFEBEE'
    };

    activitiesData[activitiesIndex].forEach(item => {
      const detailStr = item.id ? `${item.id} &bull; ${item.detail}` : item.detail;
      list.innerHTML += `
        <div class="activity-item">
          <div class="activity-icon" style="background: ${colors[item.iconType]};">${icons[item.iconType]}</div>
          <div class="activity-content">
            <div class="activity-title">${item.title}</div>
            <div class="activity-time">${detailStr}</div>
          </div>
          <div class="al-list-meta-subtitle" style="color: #6B7280; font-weight: 500;">${item.time}</div>
        </div>`;
    });
  }

  // Event Listeners for global functions
  window.loadNextLicenses = () => {
    licensesIndex = (licensesIndex + 1) % licensesData.length;
    renderLicenses();
  };
  window.loadNextApprovals = () => {
    approvalsIndex = (approvalsIndex + 1) % approvalsData.length;
    renderApprovals();
  };
  window.loadNextActivities = () => {
    activitiesIndex = (activitiesIndex + 1) % activitiesData.length;
    renderActivities();
  };

  // Filter Data Swapping logic (Dummy interactivitiy)
  const branchSelect = document.getElementById('branchSelect');
  const monthSelect = document.getElementById('monthSelect');
  
  function randomizeData() {
    // Randomize metric cards
    document.getElementById('val-applicants').innerText = (Math.random() * 2000 + 1000).toFixed(0).replace('.', ',');
    document.getElementById('val-onboarding').innerText = (Math.random() * 300 + 100).toFixed(0);
    document.getElementById('val-active').innerText = (Math.random() * 4000 + 2000).toFixed(0).replace('.', ',');
    document.getElementById('val-mutation').innerText = (Math.random() * 150 + 50).toFixed(0);
    document.getElementById('val-licenses').innerText = (Math.random() * 300 + 100).toFixed(0);
    document.getElementById('val-approvals').innerText = (Math.random() * 100 + 20).toFixed(0);

    // Randomize Pipeline
    document.getElementById('funnel-new').innerText = (Math.random() * 1000 + 500).toFixed(0).replace('.', ',');
    document.getElementById('funnel-screen').innerText = (Math.random() * 500 + 300).toFixed(0);
    document.getElementById('funnel-interview').innerText = (Math.random() * 300 + 100).toFixed(0);
    document.getElementById('funnel-overall').innerText = (Math.random() * 5 + 3).toFixed(1) + '%';
    
    // Randomize Bar Chart
    if(barChart) {
      barChart.data.datasets[0].data = Array.from({length: 10}, () => Math.floor(Math.random() * 800 + 100));
      barChart.update();
    }
    
    // Randomize Donut
    if(donutChart) {
      donutChart.data.datasets[0].data = [
        Math.floor(Math.random() * 3000 + 1000), 
        Math.floor(Math.random() * 500 + 100), 
        Math.floor(Math.random() * 200 + 50), 
        Math.floor(Math.random() * 200 + 50)
      ];
      donutChart.update();
    }
  }

  if(branchSelect) {
    branchSelect.addEventListener('change', randomizeData);
  }
  if(monthSelect) {
    monthSelect.addEventListener('change', randomizeData);
  }

  // Init everything
  initCharts();
  renderLicenses();
  renderApprovals();
  renderActivities();
});
