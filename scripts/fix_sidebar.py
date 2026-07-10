import glob
import re

new_sidebar = """    <nav class="nav-list">
      <!-- 1. Dashboards -->
      <div class="nav-section-title">Dashboards</div>
      <a class="nav-link {active_al}" href="dashboard-agent-lifecycle.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg><span class="nav-text">Dashboard Agent Lifecycle</span><span></span></a>
      <a class="nav-link {active_dashboard}" href="dashboard.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 13h6V4H4v9Z"/><path d="M14 20h6V4h-6v16Z"/><path d="M4 20h6v-3H4v3Z"/></svg><span class="nav-text">Dashboard Commission</span><span></span></a>

      <!-- 2. Agent Lifecycle -->
      <div class="nav-section-title">Agent Lifecycle</div>
      <div class="nav-group {group_recruitment}">
        <a class="nav-group-head" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span class="nav-text">Recruitment & Onboarding</span><span class="nav-chevron">⌃</span></a>
        <div class="nav-submenu">
          <a class="nav-sub-link {active_pipeline}" href="#">Recruitment Pipeline</a>
          <a class="nav-sub-link {active_candidates}" href="#">Candidates List</a>
          <a class="nav-sub-link {active_recruit_app}" href="#">Recruitment Approval</a>
          <a class="nav-sub-link {active_verify}" href="#">Document Verification</a>
          <a class="nav-sub-link {active_onboarding}" href="#">Agent Onboarding</a>
        </div>
      </div>
      <div class="nav-group {group_management}">
        <a class="nav-group-head" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><span class="nav-text">Agent Management</span><span class="nav-chevron">⌃</span></a>
        <div class="nav-submenu">
          <a class="nav-sub-link {active_master}" href="#">Agent Master List</a>
          <a class="nav-sub-link {active_tree}" href="#">Agent Hierarchy Tree</a>
          <a class="nav-sub-link {active_status}" href="#">Agent Status & License</a>
          <a class="nav-sub-link {active_mutation}" href="#">Agent Mutation Request</a>
        </div>
      </div>

      <!-- 3. Data & Master -->
      <div class="nav-section-title">Data & Master</div>
      <a class="nav-link {active_modules}" href="modules.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/><circle cx="7" cy="5" r="1.5"/><circle cx="7" cy="12" r="1.5"/><circle cx="7" cy="19" r="1.5"/></svg><span class="nav-text">Master Data</span><span></span></a>
      <div class="nav-group {group_data_mgmt}">
        <a class="nav-group-head" href="data-integration.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7a8 3 0 1 0 16 0A8 3 0 1 0 4 7"/><path d="M4 7v10a8 3 0 0 0 16 0V7"/><path d="M4 12a8 3 0 0 0 16 0"/></svg><span class="nav-text">Data Management</span><span class="nav-chevron">⌃</span></a>
        <div class="nav-submenu">
          <a class="nav-sub-link {active_import}" href="data-integration.html">Import Data</a>
          <a class="nav-sub-link {active_mapping}" href="data-mapping.html">Data Mapping</a>
          <a class="nav-sub-link {active_logs}" href="integration-logs.html">Integration Logs</a>
          <a class="nav-sub-link {active_quality}" href="data-quality.html">Data Quality</a>
          <a class="nav-sub-link {active_prep}" href="data-preparation.html">Data Preparation</a>
        </div>
      </div>

      <!-- 4. Commission & Benefit -->
      <div class="nav-section-title">Commission & Benefit</div>
      <div class="nav-group {group_formula}">
        <a class="nav-group-head" href="formula-list.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h7"/><path d="m15 15 2 2 4-4"/></svg><span class="nav-text">Formula & Rules</span><span class="nav-chevron">⌃</span></a>
        <div class="nav-submenu">
          <a class="nav-sub-link {active_formula}" href="formula-list.html">Formula List</a>
          <a class="nav-sub-link {active_rule}" href="rule-builder.html">Rule Builder</a>
        </div>
      </div>
      <div class="nav-group {group_commission}">
        <a class="nav-group-head" href="commission-calculation.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19V5"/><path d="M4 19h16"/><path d="m7 15 4-4 3 3 5-7"/></svg><span class="nav-text">Commission Processing</span><span class="nav-chevron">⌃</span></a>
        <div class="nav-submenu">
          <a class="nav-sub-link {active_calc}" href="commission-calculation.html">Commission Calculation</a>
          <a class="nav-sub-link {active_adjust}" href="adjustment-management.html">Adjustment Management</a>
          <a class="nav-sub-link {active_comm_app}" href="commission-approval.html">Commission Approval</a>
        </div>
      </div>
      <div class="nav-group {group_reports}">
        <a class="nav-group-head" href="payout-file.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/></svg><span class="nav-text">Reports & Payout</span><span class="nav-chevron">⌃</span></a>
        <div class="nav-submenu">
          <a class="nav-sub-link {active_payout}" href="payout-file.html">Pay Order / Payout File</a>
          <a class="nav-sub-link {active_eslip}" href="e-slip-agent.html">e-Slip Agent</a>
        </div>
      </div>
    </nav>"""

for filepath in glob.glob('pages/*.html'):
    with open(filepath, 'r') as f:
        content = f.read()

    # Determine active states
    state = {
        'active_al': '', 'active_dashboard': '', 'active_modules': '',
        'group_recruitment': 'collapsed', 'active_pipeline': '', 'active_candidates': '', 'active_recruit_app': '', 'active_verify': '', 'active_onboarding': '',
        'group_management': 'collapsed', 'active_master': '', 'active_tree': '', 'active_status': '', 'active_mutation': '',
        'group_data_mgmt': 'collapsed', 'active_import': '', 'active_mapping': '', 'active_logs': '', 'active_quality': '', 'active_prep': '',
        'group_formula': 'collapsed', 'active_formula': '', 'active_rule': '',
        'group_commission': 'collapsed', 'active_calc': '', 'active_adjust': '', 'active_comm_app': '',
        'group_reports': 'collapsed', 'active_payout': '', 'active_eslip': ''
    }

    if 'dashboard-agent-lifecycle.html' in filepath:
        state['active_al'] = 'active'
    elif 'dashboard.html' in filepath:
        state['active_dashboard'] = 'active'
    elif 'modules.html' in filepath:
        state['active_modules'] = 'active'
    elif 'data-integration.html' in filepath:
        state['group_data_mgmt'] = ''
        state['active_import'] = 'active'
    elif 'data-mapping.html' in filepath:
        state['group_data_mgmt'] = ''
        state['active_mapping'] = 'active'
    elif 'integration-logs.html' in filepath:
        state['group_data_mgmt'] = ''
        state['active_logs'] = 'active'
    elif 'data-quality.html' in filepath:
        state['group_data_mgmt'] = ''
        state['active_quality'] = 'active'
    elif 'data-preparation.html' in filepath:
        state['group_data_mgmt'] = ''
        state['active_prep'] = 'active'
    elif 'formula-list.html' in filepath:
        state['group_formula'] = ''
        state['active_formula'] = 'active'
    elif 'rule-builder.html' in filepath:
        state['group_formula'] = ''
        state['active_rule'] = 'active'
    elif 'commission-calculation.html' in filepath:
        state['group_commission'] = ''
        state['active_calc'] = 'active'
    elif 'adjustment-management.html' in filepath:
        state['group_commission'] = ''
        state['active_adjust'] = 'active'
    elif 'commission-approval.html' in filepath:
        state['group_commission'] = ''
        state['active_comm_app'] = 'active'
    elif 'payout-file.html' in filepath:
        state['group_reports'] = ''
        state['active_payout'] = 'active'
    elif 'e-slip-agent.html' in filepath:
        state['group_reports'] = ''
        state['active_eslip'] = 'active'
    
    sidebar = new_sidebar.format(**state)
    
    # Replace nav-list block
    new_content = re.sub(r'<nav class="nav-list">.*?</nav>', sidebar, content, flags=re.DOTALL)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated sidebar in {filepath}")
