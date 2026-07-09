import re

def modify_agent_master_list():
    filepath = '/Users/cellonada/Documents/Intern-Ciptadra/comben-fe/pages/agent-master-list.html'
    
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Update filter grid layout
    # Change minmax(200px, 1.5fr) repeat(4, 1fr) auto auto
    # To repeat(5, 1fr) auto auto so the search bar is the same size as dropdowns, or slightly larger like 1.2fr repeat(4, 1fr) auto auto
    content = content.replace(
        'grid-template-columns: minmax(200px, 1.5fr) repeat(4, 1fr) auto auto;',
        'grid-template-columns: 1.2fr repeat(4, 1fr) auto auto;'
    )
    
    # 2. Update Reset Filter button
    content = content.replace(
        '<button class="btn btn-text" style="background: transparent; border: none; cursor: pointer; color: #4B5563; font-weight: 600; padding: 0 16px; height: 40px; display: inline-flex; align-items: center; font-size: 13px;">',
        '<button class="btn btn-outline" style="background: white; border: 1px solid #D1D5DB; cursor: pointer; color: #374151; font-weight: 600; padding: 0 16px; height: 40px; border-radius: 6px; display: inline-flex; align-items: center; font-size: 13px; white-space: nowrap;">'
    )
    
    # 3. Update Sembunyikan Filter button
    content = content.replace(
        '<button class="btn btn-outline" style="background: white; border: 1px solid #D1D5DB; cursor: pointer; color: #374151; font-weight: 500; padding: 0 16px; height: 40px; border-radius: 6px; display: inline-flex; align-items: center; font-size: 13px;">',
        '<button class="btn btn-outline-primary" style="background: white; border: 1px solid #12B9C3; cursor: pointer; color: #12B9C3; font-weight: 600; padding: 0 16px; height: 40px; border-radius: 6px; display: inline-flex; align-items: center; font-size: 13px; white-space: nowrap;">'
    )
    # Also update the SVG color inside the Sembunyikan Filter button? `stroke="currentColor"` will inherit the #12B9C3 so that's fine.

    # 4. Make Metric cards larger
    # Padding: 16px -> 20px 24px
    # min-height: 80px -> 100px
    # gap: 12px -> 16px
    content = content.replace(
        'style="padding: 16px; min-height: 80px; display: grid; gap: 12px; grid-template-columns: 48px 1fr;',
        'style="padding: 20px 24px; min-height: 100px; display: grid; gap: 16px; grid-template-columns: 48px 1fr; align-items: center;'
    )
    # 4a. Update font size for stat values: 20px -> 28px
    content = content.replace(
        'style="font-size: 20px; font-weight: 700; color: #111827;"',
        'style="font-size: 28px; font-weight: 800; color: #111827;"'
    )
    content = content.replace(
        'style="font-size: 20px; font-weight: 700; color: #7E22CE;"',
        'style="font-size: 28px; font-weight: 800; color: #7E22CE;"'
    )

    with open(filepath, 'w') as f:
        f.write(content)

if __name__ == "__main__":
    modify_agent_master_list()
