import os
import cv2
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from firebase_admin import credentials, storage, initialize_app
from skimage.feature import match_descriptors
import concurrent.futures
import uuid
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
api = Api(app)
CORS(app)

FBASE_STORAGE_BUCKET = os.getenv('FBASE_STORAGE_BUCKET')

# Firebase initialization
try:
    cred = credentials.Certificate({
    "type": os.getenv('FBASE_TYPE'),
    "project_id": os.getenv('FBASE_PROJECT_ID'),
    "private_key_id": os.getenv('FBASE_PRIVATE_KEY_ID'),
    "private_key": os.getenv('FBASE_PRIVATE_KEY'),
    "client_email": os.getenv('FBASE_CLIENT_EMAIL'),
    "client_id": os.getenv('FBASE_CLIENT_ID'),
    "auth_uri": os.getenv('FBASE_AUTH_URI'),
    "token_uri": os.getenv('FBASE_TOKEN_URI'),
    "auth_provider_x509_cert_url": os.getenv('FBASE_AUTH_PROVIDER_X509_CERT_URL'),
    "client_x509_cert_url": os.getenv('FBASE_CLIENT_X509_CERT_URL'),
    "universe_domain": os.getenv('FBASE_UNIVERSE_DOMAIN')
})
    initialize_app(cred, {'storageBucket': FBASE_STORAGE_BUCKET})
    bucket = storage.bucket()
except Exception as e:
    print(f"Database initialization error: {e}")
    raise e

# Directory paths
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
FPRINT_DB_FOLDER = 'Auth API/FPrintDB'

# Helper function to delete files in specified folders
def delete_files_in_folders(*folder_names):
    for folder_name in folder_names:
        folder_path = os.path.join(os.getcwd(), folder_name)
        try:
            if os.path.exists(folder_path) and os.path.isdir(folder_path):
                with os.scandir(folder_path) as entries:
                    for entry in entries:
                        try:
                            if entry.is_file():
                                os.remove(entry.path)
                        except Exception as e:
                            print(f"Error deleting {entry.path}: {e}")
            else:
                print(f"Directory '{folder_name}' does not exist or is not a folder.")
        except Exception as e:
            print(f"Error accessing folder '{folder_name}': {e}")

# Resource for Health
class Health(Resource):
    def get(self):
        return {"status": "Server is running."}, 200

# Resource for verification
class Verify(Resource):
    def post(self):
        try:
            if 'FPrintImg' not in request.files or 'aadharNumber' not in request.values:
                return {"Error": "No file or Number found in the request."}, 400

            file = request.files['FPrintImg']
            aadharNumber = request.values['aadharNumber']

            if len(aadharNumber) != 12:
                return {"Error": "Invalid Aadhar Number."}, 400

            if file and '.' in file.filename and file.filename.rsplit('.', 1)[1].lower() == 'bmp':
                filename = str(uuid.uuid4()) + '.bmp'
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                file.save(filepath)
                return self.verify_fingerprint(aadharNumber)

            return {"Error": "Invalid file or file format not allowed. Only .bmp files are accepted."}, 400

        except Exception as e:
            return {"Error": str(e)}, 500

    def verify_fingerprint(self, aadharNumber):
        try:
            # Image processing and matching logic
            sample_name = os.listdir(UPLOAD_FOLDER)[0]
            sample_path = os.path.join(UPLOAD_FOLDER, sample_name)
            sample = cv2.imread(sample_path)

            # Download images from Firebase Storage
            with concurrent.futures.ThreadPoolExecutor() as executor:
                futures = []
                for num in range(0, 10):
                    blob_path = f"VoterBiometrics/{aadharNumber}/{num}"
                    filename = f"{FPRINT_DB_FOLDER}/{num}.BMP"
                    if not os.path.exists(os.path.dirname(filename)):
                        os.makedirs(os.path.dirname(filename))
                    futures.append(executor.submit(self.download_image, blob_path, filename))
                concurrent.futures.wait(futures)

            # Image matching logic
            orb = cv2.ORB_create()
            input_kp, input_desc = orb.detectAndCompute(sample, None)

            database = []
            for img_name in os.listdir(FPRINT_DB_FOLDER):
                img_path = os.path.join(FPRINT_DB_FOLDER, img_name)
                db_img = cv2.imread(img_path)
                kp, desc = orb.detectAndCompute(db_img, None)
                database.append((img_name, desc))

            match_scores = []
            for (db_img, db_desc) in database:
                matches = match_descriptors(input_desc, db_desc)
                match_percent = len(matches) / len(input_desc) * 100
                match_scores.append((db_img, match_percent))

            best_match = max(match_scores, key=lambda x: x[1])
            filename = best_match[0] 
            best_score = best_match[1]
            isValid = best_score >= 80

            return {
                'Best Match': filename, 
                'Score': best_score,
                'isValid': isValid
            }, 201

        finally:
            delete_files_in_folders(UPLOAD_FOLDER, FPRINT_DB_FOLDER)

    def download_image(self, blob_path, filename):
        try:
            blob = bucket.blob(blob_path)
            if blob.exists():
                blob.download_to_filename(filename)
            else:
                print(f'Blob {blob_path} does not exist.')
        except Exception as e:
            print(f'Error downloading {filename}: {e}')

# Add resource to API endpoint
api.add_resource(Verify, '/verify')
api.add_resource(Health, '/health')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
