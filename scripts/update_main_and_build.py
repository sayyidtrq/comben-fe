import os
import re

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAIN_JS_PATH = os.path.join(BASE_DIR, 'js', 'main.js')
BUILD_JS_PATH = os.path.join(BASE_DIR, 'scripts', 'build-static.js')

# Update build-static.js
with open(BUILD_JS_PATH, 'r', encoding='utf-8') as f:
    build_content = f.read()
    
build_content = re.sub(
    r'const publicEntries = \[([^\]]+)\];',
    r'const publicEntries = [\1, "components"];',
    build_content
)
# Ensure no duplicates if run multiple times
build_content = build_content.replace(', "components", "components"', ', "components"')

with open(BUILD_JS_PATH, 'w', encoding='utf-8') as f:
    f.write(build_content)

# Update main.js
with open(MAIN_JS_PATH, 'r', encoding='utf-8') as f:
    main_content = f.read()

# We need to find all the code from start until "const moduleGrid =" and wrap it in initCombenLayout,
# EXCEPT we should leave the variables `const root`, etc. at the top, or we can just redefine them inside.
# Actually, since sidebar is loaded dynamically, `document.querySelector(".sidebar")` must be called INSIDE initCombenLayout.

# Let's completely rewrite the top part of main.js
top_part_regex = r'^(const root = document\.documentElement;.*?)(const moduleGrid = document\.querySelector\("\[data-module-grid\]"\);)'
match = re.search(top_part_regex, main_content, re.DOTALL)

if match:
    old_top_part = match.group(1)
    rest_of_file = match.group(2) + main_content[match.end(2):]
    
    new_top_part = """const root = document.documentElement;
let sidebarToggle = null;
let sidebar = null;

window.initCombenLayout = function() {
  sidebarToggle = document.querySelector("[data-sidebar-toggle]");
  sidebar = document.querySelector(".sidebar");

  function pruneDeprecatedNavItems() {
    document.querySelectorAll(".nav-sub-link").forEach((item) => {
      const label = item.textContent.trim();
      const href = item.getAttribute("href") || "";
      if (label === "Interview Mendatang" || label === "Candidate Detail" || href.includes("recruitment-interviews.html") || href.includes("candidate-detail.html")) {
        item.remove();
      }
    });
  }

  pruneDeprecatedNavItems();

  function setSidebarState() {
    const collapsed = localStorage.getItem("comben-sidebar") === "collapsed";
    root.classList.toggle("sidebar-collapsed", collapsed);
  }

  setSidebarState();

  function syncNavigationState() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-link.active, .nav-sub-link.active").forEach((item) => {
      item.classList.remove("active");
    });

    document.querySelectorAll(".nav-group").forEach((group) => {
      group.classList.remove("nav-group-active");
    });

    document.querySelectorAll(".nav-link[href], .nav-sub-link[href]").forEach((item) => {
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

  syncNavigationState();

  sidebarToggle?.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 980px)").matches) {
      root.classList.toggle("sidebar-open");
      return;
    }

    const nextCollapsed = !root.classList.contains("sidebar-collapsed");
    root.classList.toggle("sidebar-collapsed", nextCollapsed);
    localStorage.setItem("comben-sidebar", nextCollapsed ? "collapsed" : "expanded");
  });

  document.addEventListener("click", (event) => {
    if (!window.matchMedia("(max-width: 980px)").matches) return;
    if (!root.classList.contains("sidebar-open")) return;
    if (sidebar?.contains(event.target) || sidebarToggle?.contains(event.target)) return;
    root.classList.remove("sidebar-open");
  });

  document.querySelectorAll(".nav-group-head").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      button.closest(".nav-group")?.classList.toggle("collapsed");
    });
  });
};

// Fallback in case layout is already there (e.g. without layout loader)
if (document.querySelector(".sidebar") && document.querySelector(".sidebar").innerHTML.trim() !== "") {
  window.initCombenLayout();
}

"""
    with open(MAIN_JS_PATH, 'w', encoding='utf-8') as f:
        f.write(new_top_part + rest_of_file)
    print("Updated main.js and build-static.js")
else:
    print("Regex match failed in main.js")

