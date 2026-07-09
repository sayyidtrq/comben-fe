import re
import os

def scaffold_page():
    with open('pages/agent-profile.html', 'r') as f:
        content = f.read()

    # Extract up to the end of topbar
    head_match = re.search(r'(.*?<div class="topbar-actions">.*?</header>)', content, re.DOTALL)
    if not head_match:
        print("Could not find header")
        return
    
    header_content = head_match.group(1)
    
    # Replace the title and add our CSS and JS
    header_content = header_content.replace('<title>Agent Profile Detail - COMBEN</title>', '<title>Agent Hierarchy Tree - COMBEN</title>')
    header_content = header_content.replace('<link rel="stylesheet" href="../css/agent-profile.css">', '<link rel="stylesheet" href="../css/agent-hierarchy.css">')
    
    # Check if active class is in sidebar and update it
    header_content = header_content.replace('class="nav-sub-link active" href="agent-master-list.html"', 'class="nav-sub-link" href="agent-master-list.html"')
    header_content = header_content.replace('class="nav-sub-link" href="agent-profile.html"', 'class="nav-sub-link" href="agent-profile.html"')
    header_content = header_content.replace('class="nav-sub-link" href="#"', 'class="nav-sub-link active" href="agent-hierarchy.html"')
    
    main_content = """
    <main class="main-content">
      <div class="page-header" style="margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end;">
        <div>
          <h1 class="page-title" style="font-size: 24px; font-weight: 700; color: #111827; margin: 0 0 8px 0;">Agent Hierarchy Tree</h1>
          <p class="page-desc" style="font-size: 14px; color: #6B7280; margin: 0;">Struktur organisasi dan hubungan pelaporan agen</p>
        </div>
      </div>
      
      <!-- Content goes here -->
      
    </main>
  </div>
  
  <script src="../js/main.js"></script>
  <script src="../js/agent-hierarchy.js"></script>
</body>
</html>
"""
    
    # Write the new html
    with open('pages/agent-hierarchy.html', 'w') as f:
        f.write(header_content + main_content)
        
    # Create empty css and js
    with open('css/agent-hierarchy.css', 'w') as f:
        f.write("/* Agent Hierarchy CSS */\n")
    with open('js/agent-hierarchy.js', 'w') as f:
        f.write("// Agent Hierarchy JS\n")

if __name__ == "__main__":
    scaffold_page()
