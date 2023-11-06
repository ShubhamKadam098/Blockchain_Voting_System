from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
import os
import uuid
import cv2
from skimage.feature import match_descriptors

app = Flask(__name__)
api = Api(app)
CORS(app)

cred = credentials.Certificate("Auth API/config/firebase.json")
default_app = firebase_admin.initialize_app(cred, {
    'storageBucket': 'votingauth-f7b31.appspot.com'
})

bucket = storage.bucket()

# Define the directory where uploaded images will be saved
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

class Verify(Resource):
    def post(self):
        try:
            if 'FPrintImg' not in request.files or 'aadharNumber' not in request.values:
                return {"Error": "No file or Number found in the request."}, 400

            file = request.files['FPrintImg']
            aadharNumber = request.values['aadharNumber']

            if file and aadharNumber and allowed_file(file.filename):
                filename = str(uuid.uuid4()) + '.bmp'
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                file.save(filepath)
                return is_match()

            return {"Error": "Invalid file or file format not allowed. Only .bmp files are accepted."}, 400

        except Exception as e:
            return {"Error": str(e)}, 500

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() == 'bmp'

def download_image(blob_path, filename):
    blob = bucket.blob(blob_path)
    if blob.exists():
        try:
            blob.download_to_filename(filename)
            print(f'Image downloaded to {filename} using path {blob_path}')
        except Exception as e:
            print(f'Error downloading {filename}: {e}')
    else:
        print(f'Blob {blob_path} does not exist.')

def download_voter_images(idNumber):
    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = []
        for num in range(0, 10):
            blob_path = f"VoterBiometrics/{idNumber}/{num}"
            filename = f"FPrintDB/{num}.BMP"

            if not os.path.exists(os.path.dirname(filename)):
                os.makedirs(os.path.dirname(filename))

            futures.append(executor.submit(download_image, blob_path, filename))

        concurrent.futures.wait(futures)

api.add_resource(Verify, '/verify')

def is_match():
    try:
        sampleName = os.listdir(UPLOAD_FOLDER)[0]
        print('Sample Name: ' + sampleName)
        sample = cv2.imread(os.path.join(UPLOAD_FOLDER, sampleName))

        orb = cv2.ORB_create() 
        input_kp, input_desc = orb.detectAndCompute(sample, None)

        db_path = os.path.join(os.path.dirname(__file__), 'FPrintDB')
        database = []
        for img in os.listdir(db_path):
            db_img = cv2.imread(os.path.join(db_path, img))
            kp, desc = orb.detectAndCompute(db_img, None)
            database.append((img, desc))

        match_scores = []
        for (db_img, db_desc) in database:
            matches = match_descriptors(input_desc, db_desc)
            match_percent = len(matches) / len(input_desc) * 100
            match_scores.append((db_img, match_percent))

        best_match = max(match_scores, key=lambda x: x[1])
        filename = best_match[0] 
        best_score = best_match[1]
        isValid = False
        if(best_score >= 80):
            isValid = True

        return {
            'Best Match': filename, 
            'Score': best_score,
            'isValid': isValid
        }, 201

    except Exception as e:
        return {
            'Error': str(e)
        }, 500

    finally:
        for f in os.listdir(UPLOAD_FOLDER):
            os.remove(os.path.join(UPLOAD_FOLDER, f))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
