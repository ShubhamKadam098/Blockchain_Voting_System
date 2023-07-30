from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
import os
import uuid

app = Flask(__name__)
api = Api(app)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Define the directory where uploaded images will be saved
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

class Verify(Resource):
    def post(self):
        try:
            # Check if the request contains a file part
            if 'FPrintImg' not in request.files or 'aadharNumber' not in request.values:
                return {"Error": "No file or Number found in the request."}, 400

            file = request.files['FPrintImg']
            aadharNumber = request.values['aadharNumber']

            if aadharNumber.legth!= 12:
                return {"Error: Invalid Aadhar Number"}

            # Check if the file is present and has a .bmp extension
            if file and aadharNumber and allowed_file(file.filename):
                filename = str(uuid.uuid4()) + '.bmp'
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                file.save(filepath)
                return isMatch()

            return {"Error": "Invalid file or file format not allowed. Only .bmp files are accepted."}, 400

        except Exception as e:
            return {"Error": str(e)}, 500

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() == 'bmp'

api.add_resource(Verify, '/verify')

def isMatch():
    try:
        import os
        import cv2

        sampleName= os.listdir('uploads')[0]
        print('sample Name: '+sampleName)
        sample = cv2.imread(f'uploads/{sampleName}')
        # sample = cv2.resize(sample, (96,108))

        best_score=0
        filename= None
        image= None

        kp1,kp2, mp = None, None, None

        counter= 0
        for file in [file for file in os.listdir("FPrintDB/")]:
            print(counter)
            counter+=1;
            fingerprint_image = cv2.imread("FPrintDB/"+ file)
            # fingerprint_image = cv2.resize(fingerprint_image, (96, 108))
            sift = cv2.SIFT_create()

            keypoints_1, descriptors_1= sift.detectAndCompute(sample,None)
            keypoints_2, descriptors_2= sift.detectAndCompute(fingerprint_image,None)

            matches = cv2.FlannBasedMatcher({'algorithm':1,'trees':10},{}).knnMatch(descriptors_1,descriptors_2, k=2)

            match_points= []

            for p, q in matches:
                if p.distance <0.1 + q.distance:
                    match_points.append(p)

            keypoints=0
            if len(keypoints_1)<len(keypoints_2):
                keypoints = len(keypoints_1)
            else:
                keypoints = len(keypoints_2)

            if len(match_points) / keypoints * 100 > best_score:
                best_score = len(match_points) / keypoints * 100
                filename= file
                image = fingerprint_image
                kp1,kp2,mp = keypoints_1,keypoints_2,match_points


        # print("best Match: "+ filename)
        # print("Score: "+ str(best_score))

        dir = 'uploads'
        for f in os.listdir(dir):
            os.remove(os.path.join(dir, f))

        cv2.waitKey(0)
        cv2.destroyAllWindows()

        return {
            'Best Match' : filename,
            'Score': best_score
        },201
    except Exception as e:
        return {
            'Error': str(e)
        },500


if __name__ == '__main__':
    app.run(debug=True,port=5000)
