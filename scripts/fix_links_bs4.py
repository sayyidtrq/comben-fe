import glob
import re
from bs4 import BeautifulSoup

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
        
    match = re.search(r'(<nav class="nav-list">.*?</nav>)', html, flags=re.DOTALL)
    if not match:
        continue
        
    nav_html = match.group(1)
    soup = BeautifulSoup(nav_html, "html.parser")
    
    for a in soup.find_all("a"):
        text = a.get_text(strip=True).replace('⌃', '').strip()
        if text in mapping:
            a["href"] = mapping[text]
        else:
            a["href"] = "#"
            
    # bs4 might convert <nav class="nav-list"> to <nav class="nav-list"></nav>
    # To be safe, just use str(soup)
    new_nav_html = str(soup)
    
    # We replace the exact match with new_nav_html
    new_html = html.replace(nav_html, new_nav_html)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_html)
    print(f"Fixed {filepath}")
