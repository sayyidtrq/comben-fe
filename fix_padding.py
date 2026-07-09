import re

file_path = 'pages/agent-status-license.html'
with open(file_path, 'r') as f:
    content = f.read()

# Replace padding in th and td inside the data-table only
# We can just replace all "padding: 12px 16px;" in the file, because it's only used in the table
content = content.replace('padding: 12px 16px;', 'padding: 10px 8px;')

with open(file_path, 'w') as f:
    f.write(content)
print("Padding reduced!")
