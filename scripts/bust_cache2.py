import os
import re

files = [
    'pages/data-preparation.html',
    'pages/dashboard.html'
]

for filepath in files:
    if os.path.exists(filepath):
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Replace href="../css/dashboard.css" with v=2
        content = re.sub(r'(\.\./css/dashboard\.css)([^"]*)', r'\1?v=2', content)
        # Replace href="../css/data-preparation.css" with v=2
        content = re.sub(r'(\.\./css/data-preparation\.css)([^"]*)', r'\1?v=2', content)
        
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Busted cache for {filepath}")
