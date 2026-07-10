document.addEventListener("DOMContentLoaded", async () => {
  try {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    // Helper to apply navigation state to a DOM element directly
    function applyNavState(sidebarDoc) {
      sidebarDoc.querySelectorAll(".nav-link.active, .nav-sub-link.active").forEach((item) => {
        item.classList.remove("active");
      });
      sidebarDoc.querySelectorAll(".nav-group").forEach((group) => {
        group.classList.remove("nav-group-active");
      });

      // Restore expanded states from sessionStorage
      try {
        const expandedGroups = JSON.parse(sessionStorage.getItem('comben-expanded-groups') || '[]');
        sidebarDoc.querySelectorAll('.nav-group').forEach((group) => {
          const groupTitle = group.querySelector('.nav-group-head .nav-text')?.textContent.trim();
          if (expandedGroups.includes(groupTitle)) {
             group.classList.remove('collapsed');
          }
        });
      } catch (e) {}

      sidebarDoc.querySelectorAll(".nav-link[href], .nav-sub-link[href]").forEach((item) => {
        const hrefPage = item.getAttribute("href")?.split("/").pop();
        if (hrefPage !== currentPage) return;

        item.classList.add("active");
        const group = item.closest(".nav-group");
        if (group) {
          group.classList.add("nav-group-active");
          group.classList.remove("collapsed");
        }
      });
    }

    // Try loading from cache immediately for instant render (no flash)
    const cachedSidebar = localStorage.getItem("comben-cache-sidebar");
    const cachedTopbar = localStorage.getItem("comben-cache-topbar");
    const sidebarEl = document.querySelector(".sidebar");
    const topbarEl = document.querySelector(".topbar");

    if (cachedSidebar && sidebarEl) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(cachedSidebar, 'text/html');
      applyNavState(doc);
      const newSidebar = doc.querySelector(".sidebar");
      if (newSidebar) sidebarEl.innerHTML = newSidebar.innerHTML;
    }

    if (cachedTopbar && topbarEl) {
      topbarEl.innerHTML = cachedTopbar;
      updateTopbarDynamicLeft();
    }

    // Fetch fresh components in background
    const [sidebarRes, topbarRes] = await Promise.all([
      fetch("../components/sidebar.html"),
      fetch("../components/topbar.html")
    ]);
    
    if (sidebarRes.ok) {
      const sidebarHtml = await sidebarRes.text();
      localStorage.setItem("comben-cache-sidebar", sidebarHtml);
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(sidebarHtml, 'text/html');
      applyNavState(doc);
      
      const targetSidebar = document.querySelector(".sidebar");
      const newSidebar = doc.querySelector(".sidebar");
      if (targetSidebar && newSidebar && targetSidebar.innerHTML !== newSidebar.innerHTML) {
         targetSidebar.innerHTML = newSidebar.innerHTML;
      }
    }
    
    if (topbarRes.ok) {
      const topbarHtml = await topbarRes.text();
      localStorage.setItem("comben-cache-topbar", topbarHtml);
      
      const targetTopbar = document.querySelector(".sidebar");
      // Only inject if topbar wasn't cached or is different (simplified diff)
      if (topbarEl && topbarHtml !== cachedTopbar) {
        topbarEl.innerHTML = topbarHtml;
        updateTopbarDynamicLeft();
      }
    }
    
    // Initialize layout scripts in main.js
    if (typeof window.initCombenLayout === "function") {
      window.initCombenLayout();
    }
    
    function updateTopbarDynamicLeft() {
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
  } catch (error) {
    console.error("Failed to load layout components:", error);
  }
});