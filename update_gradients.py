import os
import re

html_files = [
    'index.html', 'about.html', 'services.html', 'skills.html',
    'projects.html', 'project-details.html', 'contact.html',
    'resume.html', '404.html'
]

# Replace old gradient with new multi-color gradient in inline styles
old_grad = 'linear-gradient(135deg, var(--clr-primary) 0%, var(--clr-primary-dark) 100%)'
new_grad = 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #f97316 100%)'

for filename in html_files:
    if not os.path.exists(filename):
        print(f"SKIP: {filename}")
        continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    content = content.replace(old_grad, new_grad)
    
    if content != original:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"OK: Updated {filename}")
    else:
        print(f"NO CHANGE: {filename}")

print("All done!")