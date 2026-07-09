import os
import re

filepath = 'pages/dashboard.html'
if os.path.exists(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Replace js with v=2
    content = re.sub(r'(\.\./js/dashboard\.js)([^"]*)', r'\1?v=2', content)
    
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Busted cache for {filepath}")
