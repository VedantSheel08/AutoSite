# AutoSite

AutoSite is an AI-powered resume-to-website generator that automatically creates professional personal websites from uploaded resumes. It supports both PDF resumes and images of physical resumes, using advanced text extraction and OCR technology to parse the content and generate a beautifully styled personal website.

## Features

- 📄 Upload PDF resumes or take photos of physical resumes
- 🎯 Automatic text extraction using PDF parsing and OCR
- 🎨 Beautiful, responsive website template
- 📱 Mobile-friendly design
- 🔄 Real-time website generation
- 🖼️ Optional headshot integration

## Prerequisites

- Python 3.8 or higher
- Tesseract OCR (for image processing)
- Virtual environment (recommended)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/AutoSite.git
cd AutoSite
```

2. Create and activate a virtual environment:
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Linux/Mac
python -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Install Tesseract OCR:
- Windows: Download and install from https://github.com/UB-Mannheim/tesseract/wiki
- Linux: `sudo apt-get install tesseract-ocr`
- Mac: `brew install tesseract`

5. Download spaCy model:
```bash
python -m spacy download en_core_web_sm
```

## Running the Application

1. Start the Flask server:
```bash
python backend/app.py
```

2. The application will be available at `http://localhost:5000`

## API Usage

Send a POST request to `/upload` with:
- `resume`: PDF or image file
- `headshot`: Optional image file
- `name`: Optional string

Example using curl:
```bash
curl -X POST -F "resume=@path/to/resume.pdf" -F "headshot=@path/to/headshot.jpg" -F "name=John Doe" http://localhost:5000/upload
```

## Project Structure

```
AutoSite/
├── backend/
│   ├── app.py              # Flask application
│   ├── generator.py        # Text extraction and website generation
│   └── templates/
│       └── template.html   # Website template
├── static/
│   ├── uploads/           # Uploaded files
│   └── sites/            # Generated websites
├── requirements.txt       # Python dependencies
└── README.md             # Project documentation
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.