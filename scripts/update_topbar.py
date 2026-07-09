import glob
import re

desired_topbar_actions = """      <div class="topbar-actions">
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
      </div>"""

for filepath in glob.glob('pages/*.html'):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = re.sub(r'<div class="topbar-actions">.*?</header>', desired_topbar_actions + '\n    </header>', content, flags=re.DOTALL)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
