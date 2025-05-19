import os
import pdfplumber
import pytesseract
from PIL import Image
import cv2
import spacy
from jinja2 import Environment, FileSystemLoader

# Load spaCy model for text processing
try:
    nlp = spacy.load("en_core_web_sm")
except:
    # If model not found, download it
    spacy.cli.download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

def extract_text_from_pdf(pdf_path):
    """Extract text from PDF using pdfplumber."""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            text = ""
            for page in pdf.pages:
                text += page.extract_text() or ""
            return text
    except Exception as e:
        raise Exception(f"Error extracting text from PDF: {str(e)}")

def extract_text_from_image(image_path):
    """Extract text from image using pytesseract OCR."""
    try:
        # Read image using OpenCV
        img = cv2.imread(image_path)
        
        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Apply thresholding to preprocess the image
        gray = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
        
        # Save the preprocessed image temporarily
        temp_path = "temp_processed.png"
        cv2.imwrite(temp_path, gray)
        
        # Extract text using pytesseract
        text = pytesseract.image_to_string(Image.open(temp_path))
        
        # Clean up temporary file
        os.remove(temp_path)
        
        return text
    except Exception as e:
        raise Exception(f"Error extracting text from image: {str(e)}")

def parse_resume_text(text):
    """Parse extracted text to identify resume sections."""
    # Process text with spaCy
    doc = nlp(text)
    
    # Placeholder parsing logic - replace with actual parsing
    lines = text.split('\n')
    
    # Extract basic information
    name = lines[0] if lines else "John Doe"
    email = next((line for line in lines if '@' in line), "email@example.com")
    phone = next((line for line in lines if any(c.isdigit() for c in line)), "123-456-7890")
    
    # Extract summary (first paragraph)
    summary = next((line for line in lines if len(line) > 50), "Professional summary goes here...")
    
    # Extract experience (placeholder)
    experience = [
        {
            "title": "Software Engineer",
            "company": "Tech Corp",
            "duration": "2020 - Present",
            "description": "Led development of key features..."
        }
    ]
    
    # Extract education (placeholder)
    education = [
        {
            "degree": "Bachelor of Science",
            "field": "Computer Science",
            "school": "University of Technology",
            "year": "2020"
        }
    ]
    
    return {
        "name": name,
        "email": email,
        "phone": phone,
        "summary": summary,
        "experience": experience,
        "education": education
    }

def generate_website(resume_path, headshot_path=None, name="default", resume_type="pdf"):
    """
    Generate a personal website from the resume and optional headshot.
    Supports both PDF and image resumes.
    """
    try:
        # Extract text based on resume type
        if resume_type == 'pdf':
            text = extract_text_from_pdf(resume_path)
        else:  # image
            text = extract_text_from_image(resume_path)
        
        # Parse the extracted text
        resume_info = parse_resume_text(text)
        
        # Add headshot path if provided
        if headshot_path:
            resume_info['headshot'] = os.path.relpath(headshot_path, 'static')
        
        # Set up Jinja2 environment
        env = Environment(loader=FileSystemLoader('backend/templates'))
        template = env.get_template('template.html')
        
        # Render template
        html_content = template.render(**resume_info)
        
        # Save the generated website
        output_path = os.path.join('static', 'sites', f"{name}.html")
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        return output_path
        
    except Exception as e:
        raise Exception(f"Error generating website: {str(e)}") 