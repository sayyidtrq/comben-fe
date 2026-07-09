import os
import glob
import re

def fix_all_links():
    directory = 'pages'
    files = glob.glob(f'{directory}/*.html')
    
    mapping = {
        'Dashboard Agent Lifecycle': 'dashboard-agent-lifecycle.html',
        'Dashboard Commission': 'dashboard.html',
        'Agent Master List': 'agent-master-list.html',
        'Agent Hierarchy Tree': 'agent-hierarchy.html',
        'Agent Status &amp; License': 'agent-status-license.html', 
        'Agent Status & License': 'agent-status-license.html',
        'Master Data': 'modules.html',
        'Import Data': 'data-integration.html',
        'Data Mapping': 'data-mapping.html',
        'Integration Logs': 'integration-logs.html',
        'Data Quality': 'data-quality.html',
        'Data Preparation': 'data-preparation.html',
        'Formula List': 'formula-list.html',
        'Rule Builder': 'rule-builder.html',
        'Commission Calculation': 'commission-calculation.html',
        'Adjustment Management': 'adjustment-management.html',
        'Commission Approval': 'commission-approval.html',
        'Pay Order / Payout File': 'payout-file.html',
        'e-Slip Agent': 'e-slip-agent.html'
    }

    for filepath in files:
        with open(filepath, 'r') as f:
            content = f.read()
            
        def replace_sub_link(match):
            prefix = match.group(1)
            href = match.group(2)
            suffix = match.group(3)
            text = match.group(4)
            
            if text in mapping:
                return f'{prefix} href="{mapping[text]}"{suffix}{text}'
            else:
                return f'{prefix} href="#"{suffix}{text}'
                
        content = re.sub(r'(<a class="nav-sub-link[^>]*?)\s*href="([^"]*)"([^>]*>)([^<]+)', replace_sub_link, content)
        
        def replace_nav_link(match):
            prefix = match.group(1)
            href = match.group(2)
            svg = match.group(3)
            text = match.group(4)
            
            if text in mapping:
                return f'{prefix} href="{mapping[text]}">{svg}<span class="nav-text">{text}</span>'
            else:
                return match.group(0)
                
        content = re.sub(r'(<a class="nav-link[^>]*?)\s*href="([^"]*)">([^<]*<svg.*?</svg>)<span class="nav-text">([^<]+)</span>', replace_nav_link, content, flags=re.DOTALL)

        with open(filepath, 'w') as f:
            f.write(content)

if __name__ == "__main__":
    fix_all_links()
