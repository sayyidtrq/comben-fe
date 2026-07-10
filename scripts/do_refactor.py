import os
import re

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES_DIR = os.path.join(BASE_DIR, 'pages')
COMP_DIR = os.path.join(BASE_DIR, 'components')
JS_DIR = os.path.join(BASE_DIR, 'js')

os.makedirs(COMP_DIR, exist_ok=True)

# 1. Extract sidebar from modules.html
modules_html_path = os.path.join(PAGES_DIR, 'modules.html')
with open(modules_html_path, 'r', encoding='utf-8') as f:
    modules_content = f.read()

sidebar_match = re.search(r'(<aside class="sidebar".*?</aside>)', modules_content, re.DOTALL)
sidebar_html = sidebar_match.group(1) if sidebar_match else ""

# Remove 'active' classes from the sidebar HTML since JS will add it
sidebar_html = re.sub(r' class="nav-link active"', ' class="nav-link"', sidebar_html)
sidebar_html = re.sub(r' class="nav-sub-link active"', ' class="nav-sub-link"', sidebar_html)
# Remove 'nav-group-active' from any group and ensure all are 'collapsed'
sidebar_html = re.sub(r' class="nav-group\s+nav-group-active"', ' class="nav-group collapsed"', sidebar_html)
sidebar_html = re.sub(r' class="nav-group\s+nav-group-active\s+collapsed"', ' class="nav-group collapsed"', sidebar_html)

with open(os.path.join(COMP_DIR, 'sidebar.html'), 'w', encoding='utf-8') as f:
    f.write(sidebar_html)

# 2. Extract topbar (without left-content specifics)
topbar_html = """
    <div class="topbar-left">
      <button class="icon-button" type="button" data-sidebar-toggle aria-label="Tutup atau buka sidebar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      <div id="topbar-dynamic-left"></div>
    </div>
    <div class="topbar-actions">
      <div class="search-box">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        <input type="text" placeholder="Search anything...">
        <span class="search-shortcut">⌘ K</span>
      </div>
      <button class="icon-button" type="button" aria-label="Notifikasi">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        <span class="badge" style="background-color: #F59E0B; color: white;">8</span>
      </button>
      <button class="icon-button" type="button" aria-label="Bantuan">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.7 1.1-1.8 1.4-2.4 2.3-.3.4-.5.9-.5 1.7"/><path d="M12 17h.01"/></svg>
      </button>
      <div class="profile">
        <span class="avatar" style="background-color: #12B9C3; color: white; background-image: none;">AD</span>
        <span class="profile-copy">
          <span class="profile-name">Admin User</span>
          <span class="profile-role">Administrator</span>
        </span>
        <button class="icon-button" type="button" aria-label="Menu profil">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m6 9 6 6 6-6"/></svg>
        </button>
      </div>
    </div>
"""

with open(os.path.join(COMP_DIR, 'topbar.html'), 'w', encoding='utf-8') as f:
    f.write(topbar_html.strip())

# 3. Create layout-loader.js
layout_loader_content = """
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [sidebarRes, topbarRes] = await Promise.all([
      fetch("../components/sidebar.html"),
      fetch("../components/topbar.html")
    ]);
    
    if (sidebarRes.ok) {
      const sidebarHtml = await sidebarRes.text();
      const sidebarEl = document.querySelector(".sidebar");
      if (sidebarEl) sidebarEl.outerHTML = sidebarHtml;
    }
    
    if (topbarRes.ok) {
      const topbarHtml = await topbarRes.text();
      const topbarEl = document.querySelector(".topbar");
      if (topbarEl) {
        topbarEl.innerHTML = topbarHtml;
        
        // Inject page-label or breadcrumb
        const dynamicLeft = document.getElementById("topbar-dynamic-left");
        if (dynamicLeft) {
          const pageLabelMeta = document.querySelector('meta[name="page-label"]');
          const breadcrumbMeta = document.querySelector('meta[name="breadcrumb"]');
          
          if (breadcrumbMeta) {
            const parts = breadcrumbMeta.content.split(" > ");
            const breadcrumbHtml = `<div class="breadcrumb" aria-label="Breadcrumb">` + 
              parts.map((part, i) => i === parts.length - 1 ? `<span>${part}</span>` : `<span>${part}</span><span>&rsaquo;</span>`).join("") +
              `</div>`;
            dynamicLeft.outerHTML = breadcrumbHtml;
          } else if (pageLabelMeta) {
            dynamicLeft.outerHTML = `<div class="page-label">${pageLabelMeta.content}</div>`;
          } else {
            dynamicLeft.remove();
          }
        }
      }
    }
    
    // Initialize layout scripts in main.js
    if (typeof window.initCombenLayout === "function") {
      window.initCombenLayout();
    }
  } catch (error) {
    console.error("Failed to load layout components:", error);
  }
});
"""

with open(os.path.join(JS_DIR, 'layout-loader.js'), 'w', encoding='utf-8') as f:
    f.write(layout_loader_content.strip())
    
print("Components and layout-loader.js created.")
