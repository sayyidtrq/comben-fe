import re

file_path = 'pages/agent-status-license.html'
with open(file_path, 'r') as f:
    content = f.read()

table_start = content.find('<table class="data-table"')
if table_start != -1:
    # Check if colgroup already exists
    if '<colgroup>' not in content:
        colgroup = """
              <colgroup>
                <col style="width: 4%;">
                <col style="width: 10%;">
                <col style="width: 12%;">
                <col style="width: 8%;">
                <col style="width: 10%;">
                <col style="width: 8%;">
                <col style="width: 9%;">
                <col style="width: 9%;">
                <col style="width: 12%;">
                <col style="width: 14%;">
                <col style="width: 4%;">
              </colgroup>
"""
        content = content.replace('<thead>', colgroup + '              <thead>', 1)

# Ensure table has table-layout: fixed
content = content.replace('table-layout: auto;', '')
content = re.sub(r'<table class="data-table" style="([^"]*)"', lambda m: '<table class="data-table" style="' + m.group(1).replace('table-layout: fixed;', '') + ' table-layout: fixed;"', content)

with open(file_path, 'w') as f:
    f.write(content)
print("Added colgroup and table-layout: fixed")
