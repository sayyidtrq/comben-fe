import os
import glob

def update_links():
    directory = 'pages'
    files = glob.glob(f'{directory}/*.html')
    
    for filepath in files:
        if filepath == 'pages/agent-hierarchy.html':
            continue
            
        with open(filepath, 'r') as f:
            content = f.read()
            
        # Replace the href="#" for Agent Hierarchy Tree with the correct link
        updated_content = content.replace(
            '<a class="nav-sub-link" href="#">Agent Hierarchy Tree</a>', 
            '<a class="nav-sub-link" href="agent-hierarchy.html">Agent Hierarchy Tree</a>'
        )
        
        # Also just in case someone has active class on it? Unlikely but let's check
        updated_content = updated_content.replace(
            '<a class="nav-sub-link active" href="#">Agent Hierarchy Tree</a>', 
            '<a class="nav-sub-link active" href="agent-hierarchy.html">Agent Hierarchy Tree</a>'
        )
        
        with open(filepath, 'w') as f:
            f.write(updated_content)

if __name__ == "__main__":
    update_links()
