import os
import re

files = [
    'pages/commission-approval.html',
    'pages/payout-file.html'
]

for filepath in files:
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Replace css with v=2
        content = re.sub(r'(\.\./css/commission-approval\.css)([^"]*)', r'\1?v=2', content)
        content = re.sub(r'(\.\./css/payout-file\.css)([^"]*)', r'\1?v=2', content)
        
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Busted cache for {filepath}")
