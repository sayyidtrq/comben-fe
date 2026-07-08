import os
import re

files = [
    'pages/payout-file.html',
    'pages/commission-calculation.html',
    'pages/rule-builder.html',
    'pages/commission-approval.html',
    'pages/data-preparation.html',
    'pages/dashboard.html'
]

pattern = r'(<link\s+rel="stylesheet"\s+href="\.\./css/layout\.css)([^"]*)(")'

for filepath in files:
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Replace href="../css/layout.css" or href="../css/layout.css?v=..." 
        # with href="../css/layout.css?v=3"
        new_content = re.sub(pattern, r'\1?v=3\3', content)
        
        if new_content != content:
            with open(filepath, 'w') as f:
                f.write(new_content)
            print(f"Busted cache for {filepath}")
        else:
            print(f"No match or already busted for {filepath}")
