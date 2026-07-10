import glob
import re

mapping = {
    "Dashboard Agent Lifecycle": "dashboard-agent-lifecycle.html",
    "Dashboard Commission": "dashboard.html",
    "Agent Master List": "agent-master-list.html",
    "Master Data": "modules.html",
    "Import Data": "data-integration.html",
    "Data Mapping": "data-mapping.html",
    "Integration Logs": "integration-logs.html",
    "Data Quality": "data-quality.html",
    "Data Preparation": "data-preparation.html",
    "Formula List": "formula-list.html",
    "Rule Builder": "rule-builder.html",
    "Commission Calculation": "commission-calculation.html",
    "Adjustment Management": "adjustment-management.html",
    "Commission Approval": "commission-approval.html",
    "Pay Order / Payout File": "payout-file.html",
    "e-Slip Agent": "e-slip-agent.html",
}

for filepath in glob.glob("pages/*.html"):
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()

    original_html = html
    
    for text, href in mapping.items():
        # Replace href in sub-links
        pattern_sub = r'(<a[^>]*class="[^"]*nav-sub-link[^"]*"[^>]*href=")([^"]*)("[^>]*>\s*' + re.escape(text) + r'\s*</a>)'
        html = re.sub(pattern_sub, r'\g<1>' + href + r'\3', html)
        
        # Replace href in main links
        pattern_main = r'(<a[^>]*class="[^"]*nav-link[^"]*"[^>]*href=")([^"]*)("[^>]*>.*?<span class="nav-text">\s*' + re.escape(text) + r'\s*</span>.*?</a>)'
        html = re.sub(pattern_main, r'\g<1>' + href + r'\3', html, flags=re.DOTALL)
        
    if html != original_html:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"Updated {filepath}")
