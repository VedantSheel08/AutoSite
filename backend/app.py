import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from generator import generate_website

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure upload folders
UPLOAD_FOLDER = os.path.join('static', 'uploads')
SITES_FOLDER = os.path.join('static', 'sites')
ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SITES_FOLDER'] = SITES_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create necessary directories
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(SITES_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def get_file_type(filename):
    ext = filename.rsplit('.', 1)[1].lower()
    return 'pdf' if ext == 'pdf' else 'image'

@app.route('/upload', methods=['POST'])
def upload_files():
    if 'resume' not in request.files:
        return jsonify({'error': 'No resume file provided'}), 400
    
    resume = request.files['resume']
    headshot = request.files.get('headshot')
    name = request.form.get('name', 'default')
    
    if resume.filename == '':
        return jsonify({'error': 'No selected resume file'}), 400
    
    if not allowed_file(resume.filename):
        return jsonify({'error': 'Invalid resume file type'}), 400
    
    if headshot and not allowed_file(headshot.filename):
        return jsonify({'error': 'Invalid headshot file type'}), 400
    
    try:
        # Save resume file
        resume_filename = secure_filename(resume.filename)
        resume_path = os.path.join(app.config['UPLOAD_FOLDER'], resume_filename)
        resume.save(resume_path)
        
        # Save headshot if provided
        headshot_path = None
        if headshot:
            headshot_filename = secure_filename(headshot.filename)
            headshot_path = os.path.join(app.config['UPLOAD_FOLDER'], headshot_filename)
            headshot.save(headshot_path)
        
        # Determine resume type (PDF or image)
        resume_type = get_file_type(resume_filename)
        
        # Generate website
        site_path = generate_website(resume_path, headshot_path, name, resume_type)
        
        return jsonify({
            'success': True,
            'message': 'Website generated successfully',
            'site_path': site_path
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 