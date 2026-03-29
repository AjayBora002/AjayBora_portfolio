import os
from pypdf import PdfReader

assets_dir = r"d:\Desktop\portfolio\assets"
hackathon_files = ["KDSH_2026_Ajay_Bora.pdf", "haxplore_iitbhu.pdf", "serve_smart_hackathon.pdf"]

for filename in hackathon_files:
    pdf_path = os.path.join(assets_dir, filename)
    output_path = os.path.join(r"d:\Desktop\portfolio", f"{os.path.splitext(filename)[0]}_text.txt")
    
    try:
        if os.path.exists(pdf_path):
            reader = PdfReader(pdf_path)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
                
            with open(output_path, "w", encoding="utf-8") as f:
                f.write(text)
            print(f"Successfully extracted PDF text to {output_path}")
        else:
            print(f"Error: PDF file not found at {pdf_path}")
    except Exception as e:
        print(f"Error extracting {filename}: {e}")
