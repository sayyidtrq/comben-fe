import re

with open('pages/dashboard-agent-lifecycle.html', 'r') as f:
    content = f.read()

main_content = """    <main class="page-main">
      <section class="dashboard-page" aria-labelledby="dashboard-title">
        <!-- Dashboard Header -->
        <div class="content-header page-heading-row">
          <div>
            <h1 class="content-title" id="dashboard-title">Dashboard Agent Lifecycle</h1>
            <p class="content-subtitle">Ringkasan kinerja rekrutmen dan lifecycle agen</p>
          </div>
          <div class="filter-row">
            <div class="filter-dropdown" id="monthFilter">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <select id="monthSelect">
                <option value="Mei 2025">Mei 2025</option>
                <option value="Apr 2025">Apr 2025</option>
                <option value="Mar 2025">Mar 2025</option>
              </select>
            </div>
            <div class="filter-dropdown" id="branchFilter">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              <select id="branchSelect">
                <option value="Semua Cabang">Semua Cabang</option>
                <option value="Jakarta Selatan">Jakarta Selatan</option>
                <option value="Surabaya">Surabaya</option>
                <option value="Bandung">Bandung</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Metrics Row -->
        <div class="al-metrics-row">
          <div class="al-metric-card">
            <div class="al-metric-header">
              <div class="al-metric-icon icon-teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/></svg>
              </div>
            </div>
            <div class="al-metric-title">Total Applicants</div>
            <div class="al-metric-value" id="val-applicants">2.458</div>
            <div class="al-metric-trend positive" id="trend-applicants">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14"><polyline points="18 15 12 9 6 15"/></svg>
              12.4% dari Apr 2025
            </div>
          </div>

          <div class="al-metric-card">
            <div class="al-metric-header">
              <div class="al-metric-icon icon-blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><circle cx="20" cy="11" r="2"/></svg>
              </div>
            </div>
            <div class="al-metric-title">Onboarding in Progress</div>
            <div class="al-metric-value" id="val-onboarding">318</div>
            <div class="al-metric-trend positive" id="trend-onboarding">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14"><polyline points="18 15 12 9 6 15"/></svg>
              8.7% dari Apr 2025
            </div>
          </div>

          <div class="al-metric-card">
            <div class="al-metric-header">
              <div class="al-metric-icon icon-green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
            </div>
            <div class="al-metric-title">Active Agents</div>
            <div class="al-metric-value" id="val-active">4.782</div>
            <div class="al-metric-trend positive" id="trend-active">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14"><polyline points="18 15 12 9 6 15"/></svg>
              5.6% dari Apr 2025
            </div>
          </div>

          <div class="al-metric-card">
            <div class="al-metric-header">
              <div class="al-metric-icon icon-orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
              </div>
            </div>
            <div class="al-metric-title">Pending Mutation</div>
            <div class="al-metric-value" id="val-mutation">126</div>
            <div class="al-metric-trend negative" id="trend-mutation">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg>
              3.1% dari Apr 2025
            </div>
          </div>

          <div class="al-metric-card">
            <div class="al-metric-header">
              <div class="al-metric-icon icon-yellow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
            </div>
            <div class="al-metric-title">Licenses Expiring (≤ 60 hari)</div>
            <div class="al-metric-value" id="val-licenses">243</div>
            <div class="al-metric-trend positive" id="trend-licenses">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14"><polyline points="18 15 12 9 6 15"/></svg>
              7.2% dari Apr 2025
            </div>
          </div>

          <div class="al-metric-card">
            <div class="al-metric-header">
              <div class="al-metric-icon icon-purple">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
              </div>
            </div>
            <div class="al-metric-title">Pending Approvals</div>
            <div class="al-metric-value" id="val-approvals">89</div>
            <div class="al-metric-trend negative" id="trend-approvals">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg>
              11.2% dari Apr 2025
            </div>
          </div>
        </div>

        <div class="dashboard-al-grid">
          <!-- Pipeline Rekrutmen -->
          <article class="al-card col-span-12">
            <div class="al-card-header">
              <h2 class="al-card-title">Pipeline Rekrutmen <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></h2>
              <div class="filter-dropdown">
                <select id="funnelMonthSelect">
                  <option>Mei 2025</option>
                  <option>Apr 2025</option>
                </select>
              </div>
            </div>
            
            <div class="funnel-container">
              <div class="funnel-stage stage-new">
                <div class="funnel-stage-name">New Applicant</div>
                <div class="funnel-stage-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/></svg></div>
                <div class="funnel-stage-value" id="funnel-new">1.126</div>
                <div class="funnel-stage-rate" id="funnel-new-rate">45.8%</div>
              </div>
              <div class="funnel-stage stage-screen">
                <div class="funnel-stage-name">Screening</div>
                <div class="funnel-stage-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><circle cx="10" cy="12" r="2"/><path d="m14 16-2-2"/></svg></div>
                <div class="funnel-stage-value" id="funnel-screen">684</div>
                <div class="funnel-stage-rate" id="funnel-screen-rate">27.8%</div>
              </div>
              <div class="funnel-stage stage-interview">
                <div class="funnel-stage-name">Interview</div>
                <div class="funnel-stage-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
                <div class="funnel-stage-value" id="funnel-interview">352</div>
                <div class="funnel-stage-rate" id="funnel-interview-rate">14.3%</div>
              </div>
              <div class="funnel-stage stage-verify">
                <div class="funnel-stage-name">Verification</div>
                <div class="funnel-stage-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg></div>
                <div class="funnel-stage-value" id="funnel-verify">196</div>
                <div class="funnel-stage-rate" id="funnel-verify-rate">8.0%</div>
              </div>
              <div class="funnel-stage stage-approved">
                <div class="funnel-stage-name">Approved</div>
                <div class="funnel-stage-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
                <div class="funnel-stage-value" id="funnel-approved">142</div>
                <div class="funnel-stage-rate" id="funnel-approved-rate">8.0%</div>
              </div>
              <div class="funnel-stage stage-rejected">
                <div class="funnel-stage-name">Rejected</div>
                <div class="funnel-stage-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></div>
                <div class="funnel-stage-value" id="funnel-rejected">184</div>
                <div class="funnel-stage-rate" id="funnel-rejected-rate">7.5%</div>
              </div>
            </div>
            
            <div class="funnel-conversion">
              Conversion Rate (Approved/Applicant): <span id="funnel-overall">5.8%</span>
            </div>
          </article>

          <!-- Active Agents by Branch -->
          <article class="al-card col-span-8">
            <div class="al-card-header">
              <h2 class="al-card-title">Active Agents by Branch / Channel <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></h2>
              <div class="filter-dropdown">
                <select id="topBranchSelect">
                  <option>Top 10</option>
                  <option>Top 5</option>
                </select>
              </div>
            </div>
            <div class="chart-container">
              <canvas id="activeAgentsChart"></canvas>
            </div>
          </article>

          <!-- Licenses Expiring Soon -->
          <article class="al-card col-span-4">
            <div class="al-card-header">
              <h2 class="al-card-title">Licenses Expiring Soon <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></h2>
              <button class="al-card-action" onclick="loadNextLicenses()">Lihat semua</button>
            </div>
            <div class="al-list" id="licensesList">
              <!-- JS injected -->
            </div>
            <button class="action-btn btn-outline" style="margin-top: 16px; width: 100%; justify-content: center;" onclick="loadNextLicenses()">
              Lihat semua (243) <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </article>

          <!-- Distribusi Status Agen -->
          <article class="al-card col-span-4">
            <div class="al-card-header">
              <h2 class="al-card-title">Distribusi Status Agen <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></h2>
            </div>
            <div class="chart-container" style="height: 200px;">
              <canvas id="agentStatusChart"></canvas>
            </div>
            <div style="font-size: 11px; color: #6B7280; margin-top: 10px;">Periode: Mei 2025</div>
          </article>

          <!-- Latest Approvals -->
          <article class="al-card col-span-4">
            <div class="al-card-header">
              <h2 class="al-card-title">Latest Approvals <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></h2>
              <button class="al-card-action" onclick="loadNextApprovals()">Lihat semua</button>
            </div>
            <div class="al-list" id="approvalsList">
              <!-- JS Injected -->
            </div>
          </article>

          <!-- Aktivitas Terbaru -->
          <article class="al-card col-span-4">
            <div class="al-card-header">
              <h2 class="al-card-title">Aktivitas Terbaru <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></h2>
              <button class="al-card-action" onclick="loadNextActivities()">Lihat semua</button>
            </div>
            <div class="al-list" id="activitiesList" style="gap: 12px;">
              <!-- JS Injected -->
            </div>
          </article>
        </div>
      </section>
    </main>"""

# Using regex that matches any class attribute for the main tag
new_content = re.sub(r'<main[^>]*>.*?</main>', main_content, content, flags=re.DOTALL)

with open('pages/dashboard-agent-lifecycle.html', 'w') as f:
    f.write(new_content)
