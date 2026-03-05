import re
import os

pages = ['home', 'about', 'photography', 'videography', 'visuals', 'clientwork', 'contact', 'price']
base_dir = '/Users/linus/Documents/00 Linus/LinusLuschtinez.github.ioNEW'

# Read base index.html
with open(os.path.join(base_dir, 'index.html'), 'r') as f:
    index_html = f.read()

# Make sure we're inserting into the content-area
compiled_html = ''
for page in pages:
    file_path = os.path.join(base_dir, f'{page}.html')
    if not os.path.exists(file_path):
        continue
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Extract body content minus scripts
    body_match = re.search(r'<body[^>]*>(.*?)</body>', content, re.DOTALL | re.IGNORECASE)
    if body_match:
        body_content = body_match.group(1)
        # Remove scripts from the body
        body_content = re.sub(r'<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>', '', body_content, flags=re.IGNORECASE)
        # Wrap in page container
        # Home logic: make home visible by default
        display_style = 'block' if page == 'home' else 'none'
        compiled_html += f'\n<div id="page-{page}" class="spa-page" style="display:{display_style};" data-title="{page.capitalize()}">\n{body_content}\n</div>\n'

# Manual string replacement to avoid regex issues
parts = index_html.split('<main id="content-area">')
if len(parts) >= 2:
    # Everything before <main>
    part1 = parts[0] + '<main id="content-area">\n'
    part2 = parts[1]
    
    end_main_parts = part2.split('</main>')
    if len(end_main_parts) >= 2:
        # Rejoin everything after the first </main>
        remaining = end_main_parts[1:]
        final_part2 = '\n</main>' + '</main>'.join(remaining)
        index_html = part1 + compiled_html + final_part2

# Write out the new index.html
with open(os.path.join(base_dir, 'index.html'), 'w') as f:
    f.write(index_html)

print("SPA compilation complete.")
