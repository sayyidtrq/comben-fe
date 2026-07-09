import re

with open('pages/agent-master-list.html', 'r') as f:
    html = f.read()

new_main = """    <main class="page-main">
      <section class="agent-master-page" aria-labelledby="agent-master-title" style="padding: 24px;">
        <!-- Header -->
        <div class="content-header page-heading-row" style="margin-bottom: 24px;">
          <div>
            <h1 class="content-title" id="agent-master-title">Agent Master List</h1>
            <p class="content-subtitle">Kelola seluruh data agen dalam satu daftar terpusat.</p>
          </div>
        </div>

        <!-- Metrics Row -->
        <div class="stats-grid" style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 16px; margin-bottom: 24px;">
          <!-- Total Agent -->
          <div class="stat-card" style="padding: 16px; min-height: 80px; display: grid; gap: 12px; grid-template-columns: 48px 1fr; background: white; border-radius: 8px; border: 1px solid #E5E7EB; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            <div class="stat-icon" style="width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #E0F2FE; color: #0284C7;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
            <div>
              <div class="stat-label" style="font-size: 12px; color: #6B7280; font-weight: 500;">Total Agent</div>
              <div class="stat-value" style="font-size: 20px; font-weight: 700; color: #111827;">4.782</div>
              <div class="stat-caption" style="font-size: 11px; color: #10B981; margin-top: 4px;">↑ 5.6% <span style="color: #9CA3AF;">dari Apr 2025</span></div>
            </div>
          </div>
          <!-- Active -->
          <div class="stat-card" style="padding: 16px; min-height: 80px; display: grid; gap: 12px; grid-template-columns: 48px 1fr; background: white; border-radius: 8px; border: 1px solid #E5E7EB; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            <div class="stat-icon" style="width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #D1FAE5; color: #059669;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
            <div>
              <div class="stat-label" style="font-size: 12px; color: #6B7280; font-weight: 500;">Active</div>
              <div class="stat-value" style="font-size: 20px; font-weight: 700; color: #111827;">4.028</div>
              <div class="stat-caption" style="font-size: 11px; color: #10B981; margin-top: 4px;">↑ 6.2% <span style="color: #9CA3AF;">dari Apr 2025</span></div>
            </div>
          </div>
          <!-- Inactive -->
          <div class="stat-card" style="padding: 16px; min-height: 80px; display: grid; gap: 12px; grid-template-columns: 48px 1fr; background: white; border-radius: 8px; border: 1px solid #E5E7EB; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            <div class="stat-icon" style="width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #DBEAFE; color: #2563EB;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
            <div>
              <div class="stat-label" style="font-size: 12px; color: #6B7280; font-weight: 500;">Inactive</div>
              <div class="stat-value" style="font-size: 20px; font-weight: 700; color: #111827;">412</div>
              <div class="stat-caption" style="font-size: 11px; color: #10B981; margin-top: 4px;">↑ 2.0% <span style="color: #9CA3AF;">dari Apr 2025</span></div>
            </div>
          </div>
          <!-- Suspend -->
          <div class="stat-card" style="padding: 16px; min-height: 80px; display: grid; gap: 12px; grid-template-columns: 48px 1fr; background: white; border-radius: 8px; border: 1px solid #E5E7EB; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            <div class="stat-icon" style="width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #FEF3C7; color: #D97706;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div>
            <div>
              <div class="stat-label" style="font-size: 12px; color: #6B7280; font-weight: 500;">Suspend</div>
              <div class="stat-value" style="font-size: 20px; font-weight: 700; color: #111827;">182</div>
              <div class="stat-caption" style="font-size: 11px; color: #EF4444; margin-top: 4px;">↓ 3.3% <span style="color: #9CA3AF;">dari Apr 2025</span></div>
            </div>
          </div>
          <!-- Resign -->
          <div class="stat-card" style="padding: 16px; min-height: 80px; display: grid; gap: 12px; grid-template-columns: 48px 1fr; background: #FAF5FF; border-radius: 8px; border: 1px solid #E9D5FF; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            <div class="stat-icon" style="width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #F3E8FF; color: #9333EA;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg></div>
            <div>
              <div class="stat-label" style="font-size: 12px; color: #6B7280; font-weight: 500;">Resign</div>
              <div class="stat-value" style="font-size: 20px; font-weight: 700; color: #7E22CE;">160</div>
              <div class="stat-caption" style="font-size: 11px; color: #EF4444; margin-top: 4px;">↓ 1.8% <span style="color: #9CA3AF;">dari Apr 2025</span></div>
            </div>
          </div>
          <!-- License Expiring -->
          <div class="stat-card" style="padding: 16px; min-height: 80px; display: grid; gap: 12px; grid-template-columns: 48px 1fr; background: white; border-radius: 8px; border: 1px solid #E5E7EB; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            <div class="stat-icon" style="width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #FFF7ED; color: #EA580C;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
            <div>
              <div class="stat-label" style="font-size: 12px; color: #6B7280; font-weight: 500; white-space: nowrap;">License Expiring <span style="font-size: 10px; color: #9CA3AF; font-weight: 400;">(≤ 60 hari)</span></div>
              <div class="stat-value" style="font-size: 20px; font-weight: 700; color: #111827;">243</div>
              <div class="stat-caption" style="font-size: 11px; color: #10B981; margin-top: 4px;">↑ 7.2% <span style="color: #9CA3AF;">dari Apr 2025</span></div>
            </div>
          </div>
        </div>

        <!-- Filter Panel -->
        <div class="filter-panel" style="margin-bottom: 24px; background: white; padding: 16px; border-radius: 8px; border: 1px solid #E5E7EB; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
          <div class="filter-grid" style="display: grid; grid-template-columns: minmax(200px, 1.5fr) repeat(4, 1fr) auto auto; gap: 12px; align-items: flex-end;">
            <div class="field" style="position: relative;">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" width="16" height="16" style="position: absolute; left: 12px; top: 12px;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input type="text" class="input" placeholder="Cari kode agen, nama, supervisor..." style="width: 100%; height: 40px; padding-left: 36px; border: 1px solid #D1D5DB; border-radius: 6px; font-size: 13px;">
            </div>
            <div class="control-label" style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 11px; font-weight: 500; color: #6B7280;">Cabang</span>
              <select class="select" style="height: 40px; border: 1px solid #D1D5DB; border-radius: 6px; font-size: 13px; padding: 0 12px;"><option>Semua Cabang</option></select>
            </div>
            <div class="control-label" style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 11px; font-weight: 500; color: #6B7280;">Channel</span>
              <select class="select" style="height: 40px; border: 1px solid #D1D5DB; border-radius: 6px; font-size: 13px; padding: 0 12px;"><option>Semua Channel</option></select>
            </div>
            <div class="control-label" style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 11px; font-weight: 500; color: #6B7280;">Position</span>
              <select class="select" style="height: 40px; border: 1px solid #D1D5DB; border-radius: 6px; font-size: 13px; padding: 0 12px;"><option>Semua Position</option></select>
            </div>
            <div class="control-label" style="display: flex; flex-direction: column; gap: 4px;">
              <span style="font-size: 11px; font-weight: 500; color: #6B7280;">Status</span>
              <select class="select" style="height: 40px; border: 1px solid #D1D5DB; border-radius: 6px; font-size: 13px; padding: 0 12px;"><option>Semua Status</option></select>
            </div>
            <div>
              <button class="btn btn-text" style="background: transparent; border: none; cursor: pointer; color: #4B5563; font-weight: 600; padding: 0 16px; height: 40px; display: inline-flex; align-items: center; font-size: 13px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" style="margin-right: 6px;"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg> Reset Filter</button>
            </div>
            <div>
              <button class="btn btn-outline" style="background: white; border: 1px solid #D1D5DB; cursor: pointer; color: #374151; font-weight: 500; padding: 0 16px; height: 40px; border-radius: 6px; display: inline-flex; align-items: center; font-size: 13px;">Sembunyikan Filter <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" style="margin-left: 6px;"><path d="m18 15-6-6-6 6"/></svg></button>
            </div>
          </div>
        </div>

        <!-- Action Bar & Table -->
        <div class="table-panel" style="background: white; border-radius: 8px; border: 1px solid #E5E7EB; box-shadow: 0 1px 2px rgba(0,0,0,0.05); overflow: hidden;">
          <div class="table-toolbar" style="padding: 16px; border-bottom: 1px solid #E5E7EB; display: flex; justify-content: space-between; align-items: center;">
            <div class="table-actions" style="display: flex; gap: 16px; align-items: center;">
              <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; color: #6B7280; cursor: pointer;">
                <input type="checkbox" style="width: 16px; height: 16px; border-radius: 4px; border: 1px solid #D1D5DB;"> 0 dipilih
              </label>
              <button class="btn btn-text" style="background: transparent; border: none; cursor: pointer; color: #10B981; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; font-size: 13px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg> Aktifkan</button>
              <button class="btn btn-text" style="background: transparent; border: none; cursor: pointer; color: #F59E0B; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; font-size: 13px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Suspend</button>
              <button class="btn btn-text" style="background: transparent; border: none; cursor: pointer; color: #EF4444; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; font-size: 13px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/></svg> Resign</button>
              <button class="btn btn-text" style="background: transparent; border: none; cursor: pointer; color: #4B5563; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; margin-left: 8px; font-size: 13px;">Lainnya <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button>
            </div>
            <div class="filter-right" style="display: flex; gap: 12px; align-items: center;">
              <button class="btn btn-outline" style="background: white; border: 1px solid #D1D5DB; cursor: pointer; color: #374151; font-weight: 500; padding: 0 16px; height: 36px; border-radius: 6px; display: inline-flex; align-items: center; font-size: 13px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" style="margin-right: 6px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Export <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14" stroke-width="2" style="margin-left: 4px;"><path d="m6 9 6 6 6-6"/></svg></button>
              <button class="btn btn-primary" style="background: #12B9C3; border: none; cursor: pointer; color: white; font-weight: 500; padding: 0 16px; height: 36px; border-radius: 6px; display: inline-flex; align-items: center; font-size: 13px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" stroke-width="2" style="margin-right: 6px;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Tambah Agen</button>
            </div>
          </div>
          
          <div class="table-wrap" style="width: 100%; overflow-x: auto;">
            <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
              <thead>
                <tr style="border-bottom: 1px solid #E5E7EB; background: #F9FAFB;">
                  <th style="padding: 12px 16px; width: 48px; text-align: center;"><input type="checkbox" style="width: 16px; height: 16px; border-radius: 4px; border: 1px solid #D1D5DB;"></th>
                  <th style="padding: 12px 16px; width: 110px; font-weight: 600; color: #4B5563;">Agent Code <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="12" height="12" style="vertical-align: middle; margin-left: 4px;"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg></th>
                  <th style="padding: 12px 16px; font-weight: 600; color: #4B5563;">Name</th>
                  <th style="padding: 12px 16px; width: 120px; font-weight: 600; color: #4B5563;">Position</th>
                  <th style="padding: 12px 16px; width: 130px; font-weight: 600; color: #4B5563;">Branch</th>
                  <th style="padding: 12px 16px; width: 130px; font-weight: 600; color: #4B5563;">Channel</th>
                  <th style="padding: 12px 16px; width: 140px; font-weight: 600; color: #4B5563;">Supervisor</th>
                  <th style="padding: 12px 16px; width: 110px; font-weight: 600; color: #4B5563;">Join Date <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="12" height="12" style="vertical-align: middle; margin-left: 4px;"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg></th>
                  <th style="padding: 12px 16px; width: 140px; font-weight: 600; color: #4B5563;">License Status</th>
                  <th style="padding: 12px 16px; width: 110px; font-weight: 600; color: #4B5563;">Agent Status</th>
                  <th style="padding: 12px 16px; width: 60px; text-align: center; font-weight: 600; color: #4B5563;">Actions</th>
                </tr>
              </thead>
              <tbody id="agentTableBody">
                <!-- Data will be populated via JS -->
              </tbody>
            </table>
          </div>
          
          <div class="table-footer" style="padding: 12px 16px; border-top: 1px solid #E5E7EB; display: flex; justify-content: space-between; align-items: center; background: white;">
            <div class="pagination-info" style="font-size: 13px; color: #6B7280;">Menampilkan 1 - 10 dari 4.782 data</div>
            <div class="filter-right" style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 13px; color: #6B7280;">Rows per page</span>
              <select class="select" style="height: 32px; border: 1px solid #D1D5DB; border-radius: 6px; padding: 0 12px; font-size: 13px; background: white;"><option>10</option></select>
              <div style="display: flex; gap: 4px; margin-left: 12px;">
                <button style="width: 32px; height: 32px; border: 1px solid #D1D5DB; background: white; border-radius: 6px; cursor: pointer; color: #6B7280; font-size: 13px;">&laquo;</button>
                <button style="width: 32px; height: 32px; border: 1px solid #D1D5DB; background: white; border-radius: 6px; cursor: pointer; color: #6B7280; font-size: 13px;">&lsaquo;</button>
                <button style="width: 32px; height: 32px; border: none; background: #12B9C3; border-radius: 6px; cursor: pointer; color: white; font-size: 13px; font-weight: 500;">1</button>
                <button style="width: 32px; height: 32px; border: 1px solid #D1D5DB; background: white; border-radius: 6px; cursor: pointer; color: #4B5563; font-size: 13px;">2</button>
                <button style="width: 32px; height: 32px; border: 1px solid #D1D5DB; background: white; border-radius: 6px; cursor: pointer; color: #4B5563; font-size: 13px;">3</button>
                <button style="width: 32px; height: 32px; border: 1px solid #D1D5DB; background: white; border-radius: 6px; cursor: pointer; color: #4B5563; font-size: 13px;">4</button>
                <button style="width: 32px; height: 32px; border: 1px solid #D1D5DB; background: white; border-radius: 6px; cursor: pointer; color: #4B5563; font-size: 13px;">5</button>
                <button style="width: 32px; height: 32px; border: 1px solid #D1D5DB; background: white; border-radius: 6px; cursor: pointer; color: #6B7280; font-size: 13px;">&rsaquo;</button>
                <button style="width: 32px; height: 32px; border: 1px solid #D1D5DB; background: white; border-radius: 6px; cursor: pointer; color: #6B7280; font-size: 13px;">&raquo;</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>"""

html = re.sub(r'<main class="page-main">.*?</main>', new_main, html, flags=re.DOTALL)

with open('pages/agent-master-list.html', 'w') as f:
    f.write(html)
