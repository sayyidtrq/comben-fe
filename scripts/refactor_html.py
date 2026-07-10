import os
import re
import glob

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES_DIR = os.path.join(BASE_DIR, 'pages')

html_files = glob.glob(os.path.join(PAGES_DIR, '*.html'))

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    
    # 1. Extract breadcrumb or page-label from topbar
    topbar_match = re.search(r'<header class="topbar">(.*?)</header>', content, re.DOTALL)
    if not topbar_match:
        print(f"Skipping {filepath} - no topbar found")
        return False
        
    topbar_html = topbar_match.group(1)
    
    meta_tag = ""
    breadcrumb_match = re.search(r'<div class="breadcrumb"[^>]*>(.*?)</div>', topbar_html, re.DOTALL)
    if breadcrumb_match:
        bc_html = breadcrumb_match.group(1)
        # Extract text from spans or a tags
        parts = re.findall(r'<span[^>]*>(.*?)</span>|<a[^>]*>(.*?)</a>', bc_html)
        # Flatten and clean
        clean_parts = []
        for p1, p2 in parts:
            text = (p1 or p2).strip()
            if text and text != '&rsaquo;' and text != '›':
                clean_parts.append(text)
        
        meta_content = " > ".join(clean_parts)
        meta_tag = f'\n  <meta name="breadcrumb" content="{meta_content}">'
    else:
        page_label_match = re.search(r'<div class="page-label"[^>]*>(.*?)</div>', topbar_html, re.DOTALL)
        if page_label_match:
            meta_tag = f'\n  <meta name="page-label" content="{page_label_match.group(1).strip()}">'

    # 2. Insert meta tag in head
    if meta_tag:
        if '<meta name="breadcrumb"' not in content and '<meta name="page-label"' not in content:
            content = re.sub(r'(</title>)', r'\1' + meta_tag, content)

    # 3. Replace sidebar with empty tag
    content = re.sub(r'<aside class="sidebar".*?</aside>', '<aside class="sidebar"></aside>', content, flags=re.DOTALL)
    
    # 4. Replace topbar with empty tag
    content = re.sub(r'<header class="topbar".*?</header>', '<header class="topbar"></header>', content, flags=re.DOTALL)
    
    # 5. Insert layout-loader.js
    if 'layout-loader.js' not in content:
        content = re.sub(r'<script src="\.\./js/main\.js', r'<script src="../js/layout-loader.js"></script>\n  <script src="../js/main.js', content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

updated_count = 0
for f in html_files:
    if process_file(f):
        updated_count += 1
        print(f"Updated {os.path.basename(f)}")

print(f"Total updated: {updated_count}")
