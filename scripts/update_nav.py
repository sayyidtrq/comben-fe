import os
import glob
import re

base_nav = """    <nav class="nav-list">
      <!-- 1. Dashboards -->
      <div class="nav-section-title">Dashboards</div>
      <a class="nav-link" href="dashboard-agent-lifecycle.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg><span class="nav-text">Dashboard Agent Lifecycle</span><span></span></a>
      <a class="nav-link" href="dashboard.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 13h6V4H4v9Z"/><path d="M14 20h6V4h-6v16Z"/><path d="M4 20h6v-3H4v3Z"/></svg><span class="nav-text">Dashboard Commission</span><span></span></a>

      <!-- 2. Agent Lifecycle -->
      <div class="nav-section-title">Agent Lifecycle</div>
      <div class="nav-group collapsed">
        <a class="nav-group-head" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg><span class="nav-text">Recruitment & Onboarding</span><span class="nav-chevron">⌃</span></a>
        <div class="nav-submenu">
          <a class="nav-sub-link" href="recruitment-pipeline.html">Recruitment Pipeline</a>
          <a class="nav-sub-link" href="candidate-list.html">Candidates List</a>
          <a class="nav-sub-link" href="#">Document Verification</a>
          <a class="nav-sub-link" href="recruitment-approval.html">Recruitment Approval</a>
          <a class="nav-sub-link" href="#">Agent Onboarding</a>
        </div>
      </div>
      <div class="nav-group collapsed">
        <a class="nav-group-head" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg><span class="nav-text">Agent Management</span><span class="nav-chevron">⌃</span></a>
        <div class="nav-submenu">
          <a class="nav-sub-link" href="agent-master-list.html">Agent Master List</a>
          <a class="nav-sub-link" href="agent-hierarchy.html">Agent Hierarchy Tree</a>
          <a class="nav-sub-link" href="agent-status-license.html">Agent Status & License</a>
          <a class="nav-sub-link" href="#">Agent Mutation Request</a>
        </div>
      </div>

      <!-- 3. Data & Master -->
      <div class="nav-section-title">Data & Master</div>
      <a class="nav-link" href="modules.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/><circle cx="7" cy="5" r="1.5"/><circle cx="7" cy="12" r="1.5"/><circle cx="7" cy="19" r="1.5"/></svg><span class="nav-text">Master Data</span><span></span></a>
      <div class="nav-group collapsed">
        <a class="nav-group-head" href="data-integration.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 7a8 3 0 1 0 16 0A8 3 0 1 0 4 7"/><path d="M4 7v10a8 3 0 0 0 16 0V7"/><path d="M4 12a8 3 0 0 0 16 0"/></svg><span class="nav-text">Data Management</span><span class="nav-chevron">⌃</span></a>
        <div class="nav-submenu">
          <a class="nav-sub-link" href="data-integration.html">Import Data</a>
          <a class="nav-sub-link" href="data-mapping.html">Data Mapping</a>
          <a class="nav-sub-link" href="integration-logs.html">Integration Logs</a>
          <a class="nav-sub-link" href="data-quality.html">Data Quality</a>
          <a class="nav-sub-link" href="data-preparation.html">Data Preparation</a>
        </div>
      </div>

      <!-- 4. Commission & Benefit -->
      <div class="nav-section-title">Commission & Benefit</div>
      <div class="nav-group collapsed">
        <a class="nav-group-head" href="formula-list.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h7"/><path d="m15 15 2 2 4-4"/></svg><span class="nav-text">Formula & Rules</span><span class="nav-chevron">⌃</span></a>
        <div class="nav-submenu">
          <a class="nav-sub-link" href="formula-list.html">Formula List</a>
          <a class="nav-sub-link" href="rule-builder.html">Rule Builder</a>
        </div>
      </div>
      <div class="nav-group collapsed">
        <a class="nav-group-head" href="commission-calculation.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19V5"/><path d="M4 19h16"/><path d="m7 15 4-4 3 3 5-7"/></svg><span class="nav-text">Commission Processing</span><span class="nav-chevron">⌃</span></a>
        <div class="nav-submenu">
          <a class="nav-sub-link" href="commission-calculation.html">Commission Calculation</a>
          <a class="nav-sub-link" href="adjustment-management.html">Adjustment Management</a>
          <a class="nav-sub-link" href="commission-approval.html">Commission Approval</a>
        </div>
      </div>
      <div class="nav-group collapsed">
        <a class="nav-group-head" href="payout-file.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/></svg><span class="nav-text">Reports & Payout</span><span class="nav-chevron">⌃</span></a>
        <div class="nav-submenu">
          <a class="nav-sub-link" href="payout-file.html">Pay Order / Payout File</a>
          <a class="nav-sub-link" href="e-slip-agent.html">e-Slip Agent</a>
        </div>
      </div>
    </nav>"""

for filepath in glob.glob('pages/*.html'):
    basename = os.path.basename(filepath)
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Generate the customized nav for this file
    custom_nav = base_nav
    
    # 1. Active class
    if f'href="{basename}"' in custom_nav:
        # Check if it's a sub-link or nav-link
        custom_nav = custom_nav.replace(f'class="nav-link" href="{basename}"', f'class="nav-link active" href="{basename}"')
        custom_nav = custom_nav.replace(f'class="nav-sub-link" href="{basename}"', f'class="nav-sub-link active" href="{basename}"')
        
    # 2. Open group if active link is inside
    # Find all nav-groups
    groups = re.finditer(r'(<div class="nav-group collapsed">)(.*?</div>\s*</div>)', custom_nav, flags=re.DOTALL)
    for g in groups:
        group_full = g.group(0)
        group_inner = g.group(2)
        if f'href="{basename}"' in group_inner:
            # Expand this group
            new_group = group_full.replace('<div class="nav-group collapsed">', '<div class="nav-group">', 1)
            custom_nav = custom_nav.replace(group_full, new_group)

    # 3. Replace the existing <nav class="nav-list"> ... </nav> block
    new_content = re.sub(r'<nav class="nav-list">.*?</nav>', custom_nav, content, flags=re.DOTALL)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
