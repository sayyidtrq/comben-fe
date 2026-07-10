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