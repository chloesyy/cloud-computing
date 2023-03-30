import json
import boto3
import joblib
from flask_cors import CORS
from flask import Flask, request, jsonify


app = Flask(__name__)
cors = CORS(app)

with open("config.json", "r") as f:
    config = json.load(f)

AWS_ACCESS_KEY_ID = config['s3']['access_key_id']
AWS_SECRET_ACCESS_KEY = config['s3']['secret_access_key']
AWS_TOKEN = config['s3']['token']

########################################### GET MODEL FOR PREDICTION ################################################
# Credentials should already by setup in ec2 instance
# If running locally, credentials can be found by starting AWS Learner's Lab and typing:
# cat ~/.aws/credentials in the console
s3_session = boto3.Session(
    aws_access_key_id = AWS_ACCESS_KEY_ID,
    aws_secret_access_key = AWS_SECRET_ACCESS_KEY,
    aws_session_token = AWS_TOKEN
)
s3 = s3_session.client('s3')

bucket_name = 'projecthealth'
file_name = 'model/xgb_breast_classifier.pkl'
location = 'tmp/xgb_breast_classifier.pkl'

s3.download_file(bucket_name, file_name, location)
# Fix model loading error
model = joblib.load(location)

########################################### REACT REQUESTS ##############################################

@app.route("/login", methods=['POST'])
def login():
    username = request.get_json()["username"]
    password = request.get_json()["password"]
    organisation = request.get_json()["organisation"]
    isLogin = request.get_json()["isLogin"]
    print(username, password)
    
    # TODO: use this portion for sql codes!
    # if (isLogin) {
    #     # TODO: handle login
    # } else {
    #     # TODO: handle register
    # }
    
    try:
        return jsonify(
            {
            "message": "Login Successful.",
            }
        ), 200
    except Exception as e:
        return jsonify({
            "message": "Login Failed."
        }), 500
        
@app.route("/form", methods=['POST'])
def form():
    values = request.get_json()
    try:
        return jsonify(
            {
            "message": "Login Successful.",
            }
        ), 200
    except Exception as e:
        return jsonify({
            "message": "Login Failed."
        }), 500
        
@app.route("/predict", methods=['POST'])
def predict():
    values = request.get_json()
    try:
        # TODO: do prediction and return result
        result = model.predict()
        return jsonify(
            {
            "message": "Prediction Successful.",
            "result": result
            }
        ), 200
    except Exception as e:
        return jsonify({
            "message": "Prediction Failed."
        }), 500

if __name__ == "__main__":
    app.run(debug=True)