import os
import re

filepath = 'pages/dashboard.html'
if os.path.exists(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Replace js with v=3
    content = re.sub(r'(\.\./js/dashboard\.js\?v=)[0-9]*', r'\g<1>3', content)
    
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Busted cache for {filepath}")
