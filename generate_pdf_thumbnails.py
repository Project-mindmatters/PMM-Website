import os
from pdf2image import convert_from_path

PDF_DIR = 'public/blog_pdfs'
THUMB_SIZE = (400, 565)  # width, height

for filename in os.listdir(PDF_DIR):
    if filename.lower().endswith('.pdf'):
        pdf_path = os.path.join(PDF_DIR, filename)
        base_name = os.path.splitext(filename)[0]
        thumb_path = os.path.join(PDF_DIR, f'{base_name}.png')
        if os.path.exists(thumb_path):
            continue  # Skip if thumbnail already exists
        try:
            pages = convert_from_path(pdf_path, first_page=1, last_page=1, size=THUMB_SIZE)
            if pages:
                page = pages[0]
                page.thumbnail(THUMB_SIZE)
                page.save(thumb_path, 'PNG')
                print(f'Generated thumbnail for {filename}')
        except Exception as e:
            print(f'Error processing {filename}: {e}') 