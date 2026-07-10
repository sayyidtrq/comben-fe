import os
import re

target_style = 'font-size: 37px; font-weight: 700; color: #092852; margin: 0 0 8px 0; letter-spacing: 0; line-height: 1.15;'
target_style_no_margin = 'font-size: 37px; font-weight: 700; color: #092852; letter-spacing: 0; line-height: 1.15;'

files_to_fix = [
    'pages/agent-hierarchy.html',
    'pages/agent-master-list.html',
    'pages/agent-status-license.html',
    'pages/agent-profile.html',
    'pages/dashboard-agent-lifecycle.html'
]

def fix_titles():
    for filepath in files_to_fix:
        with open(filepath, 'r') as f:
            content = f.read()

        if filepath == 'pages/agent-profile.html':
            # <h1 id="agent-profile-title" class="page-title" style="margin-bottom: 4px;">Agent Profile Detail</h1>
            content = re.sub(
                r'<h1 id="agent-profile-title" class="page-title"[^>]*>Agent Profile Detail</h1>',
                f'<h1 id="agent-profile-title" class="page-title" style="{target_style}">Agent Profile Detail</h1>',
                content
            )
        elif filepath == 'pages/dashboard-agent-lifecycle.html':
            # <h1 class="content-title" id="dashboard-title">Dashboard Agent Lifecycle</h1>
            content = re.sub(
                r'<h1 class="content-title" id="dashboard-title">Dashboard Agent Lifecycle</h1>',
                f'<h1 class="content-title" id="dashboard-title" style="{target_style_no_margin}">Dashboard Agent Lifecycle</h1>',
                content
            )
        else:
            # <h1 class="page-title" style="...">...</h1>
            # Replace the style attribute of any h1.page-title
            content = re.sub(
                r'(<h1 class="page-title" style=")[^"]*(">)',
                f'\\1{target_style}\\2',
                content
            )
            
        with open(filepath, 'w') as f:
            f.write(content)

if __name__ == "__main__":
    fix_titles()
