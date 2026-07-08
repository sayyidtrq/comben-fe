document.addEventListener('DOMContentLoaded', () => {
  const agentTableBody = document.getElementById('agentTableBody');
  
  if (agentTableBody) {
    const agents = [
      { code: 'AGT-002345', name: 'Siti Nurhaliza', pos: 'Agen', branch: 'Jakarta Selatan', channel: 'Agency', sv: 'Dedi Kurniawan', join: '22 Mei 2025', licStatus: 'Aktif', licStyle: 'color: #10B981; font-weight: 500;', agStatus: 'Active', agColor: '#10B981' },
      { code: 'AGT-002346', name: 'Fajar Ramadhan', pos: 'Agen', branch: 'Bandung', channel: 'Agency', sv: 'Dedi Kurniawan', join: '21 Mei 2025', licStatus: 'Aktif', licStyle: 'color: #10B981; font-weight: 500;', agStatus: 'Active', agColor: '#10B981' },
      { code: 'AGT-002347', name: 'Nanda Pratama', pos: 'Unit Manager', branch: 'Surabaya', channel: 'Agency', sv: 'Budi Santoso', join: '20 Mei 2025', licStatus: 'Aktif', licStyle: 'color: #10B981; font-weight: 500;', agStatus: 'Active', agColor: '#10B981' },
      { code: 'AGT-002348', name: 'Maya Lestari', pos: 'Agen', branch: 'Medan', channel: 'Agency', sv: 'Rina Setiawati', join: '19 Mei 2025', licStatus: 'Aktif', licStyle: 'color: #10B981; font-weight: 500;', agStatus: 'Active', agColor: '#10B981' },
      { code: 'AGT-002349', name: 'Ahmad Fauzi', pos: 'Agen', branch: 'Makassar', channel: 'Agency', sv: 'Dedi Kurniawan', join: '18 Mei 2025', licStatus: 'Aktif', licStyle: 'color: #10B981; font-weight: 500;', agStatus: 'Active', agColor: '#10B981' },
      { code: 'AGT-002350', name: 'Dewi Sartika', pos: 'Agen', branch: 'Bandung', channel: 'Bancassurance', sv: 'Dedi Kurniawan', join: '17 Mei 2025', licStatus: 'Expiring (30 hari)', licStyle: 'color: #F59E0B; font-weight: 500;', agStatus: 'Active', agColor: '#10B981' },
      { code: 'AGT-002351', name: 'Rudi Pratama', pos: 'Agen', branch: 'Jakarta Selatan', channel: 'Agency', sv: 'Rina Setiawati', join: '15 Mei 2025', licStatus: 'Expiring (45 hari)', licStyle: 'color: #F59E0B; font-weight: 500;', agStatus: 'Active', agColor: '#10B981' },
      { code: 'AGT-002352', name: 'Yuliana Lestari', pos: 'Agen', branch: 'Jakarta Pusat', channel: 'Bancassurance', sv: 'Budi Santoso', join: '14 Mei 2025', licStatus: 'Aktif', licStyle: 'color: #10B981; font-weight: 500;', agStatus: 'Inactive', agColor: '#3B82F6' },
      { code: 'AGT-002353', name: 'Bambang Setiawan', pos: 'Agen', branch: 'Surabaya', channel: 'Agency', sv: 'Dedi Kurniawan', join: '12 Mei 2025', licStatus: 'Expired', licStyle: 'color: #EF4444; font-weight: 500;', agStatus: 'Inactive', agColor: '#3B82F6' },
      { code: 'AGT-002354', name: 'Andi Hermawan', pos: 'Agen', branch: 'Jakarta Barat', channel: 'Digital', sv: 'Rina Setiawati', join: '10 Mei 2025', licStatus: 'Expiring (15 hari)', licStyle: 'color: #F59E0B; font-weight: 500;', agStatus: 'Suspend', agColor: '#F59E0B' }
    ];

    let html = '';
    agents.forEach(a => {
      html += `
        <tr>
          <td style="text-align: center;"><input type="checkbox" style="width: 16px; height: 16px; border-radius: 4px; border: 1px solid #D1D5DB;"></td>
          <td style="font-weight: 500; color: #374151;">${a.code}</td>
          <td style="font-weight: 500; color: #111827;">
            <a href="agent-profile.html" style="color: #2563EB; text-decoration: none;">${a.name}</a>
          </td>
          <td>${a.pos}</td>
          <td>${a.branch}</td>
          <td>${a.channel}</td>
          <td>${a.sv}</td>
          <td>${a.join}</td>
          <td><span style="${a.licStyle}">${a.licStatus}</span></td>
          <td style="color: ${a.agColor}; font-weight: 500;">${a.agStatus}</td>
          <td style="text-align: center;">
            <button class="icon-button" style="padding: 4px; color: #9CA3AF;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" stroke-width="2">
                <circle cx="12" cy="12" r="1"/>
                <circle cx="12" cy="5" r="1"/>
                <circle cx="12" cy="19" r="1"/>
              </svg>
            </button>
          </td>
        </tr>
      `;
    });

    agentTableBody.innerHTML = html;
  }
});
