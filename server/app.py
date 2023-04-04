import json
import boto3
import pickle
from flask_cors import CORS
from database.RDSdatabase import RDSdatabase
from flask import Flask, request, jsonify
import numpy as np

app = Flask(__name__)
cors = CORS(app)

with open("config.json", "r") as f:
    config = json.load(f)

########################################### CONNECT TO RDS ################################################
rdsDB = RDSdatabase(config['rds']['username'],
                    config['rds']['password'],
                    config['rds']['host'],
                    config['rds']['dbname'],
                    config['rds']['port'])

try:
    rdsDB.initialConfig()
    # rdsDB.createNewOrganisation('NUH')
    # rdsDB.createNewOrganisation('SGH')
    # rdsDB.createNewOrganisation('SingHealth')
    print('RDS(es) set up successfully.')
except: 
    print('RDS has already been set up.')

# query = 'SELECT * FROM userDetails'
# a = rdsDB.masterCursor.execute(query)
# print(a)
########################################### GET MODEL FOR PREDICTION ################################################

s3_session = boto3.Session(
    aws_access_key_id = config['aws_credentials']['access_key_id'],
    aws_secret_access_key = config['aws_credentials']['secret_access_key'],
    aws_session_token = config['aws_credentials']['token']
)
s3 = s3_session.client('s3', region_name="us-east-1")

bucket_name = config['s3']['bucket_name']
file_name = config['s3']['file_path']
location = 'tmp/xgb_breast_classifier.pkl'

s3.download_file(bucket_name, file_name, location)
model = pickle.load(open(location, "rb"))

########################################### REACT REQUESTS ##############################################
USERNAME = None
PASSWORD = None
ORGANISATION = None

# NOTE: This route is needed for the default EB health check route
@app.route('/')  
def home():
    return "ok"


@app.route("/api/login", methods=['POST'])
def login():
    global USERNAME, PASSWORD
    USERNAME = request.get_json()["username"]
    PASSWORD = request.get_json()["password"]
    ORGANISATION = request.get_json()["organisation"] 
    isLogin = request.get_json()["isLogin"]
    print('USERINFO', USERNAME, PASSWORD, ORGANISATION)
    
    if isLogin:
        try:
            rdsDB.userSignIn(USERNAME, PASSWORD)
            print('Login successful.')
        except:
            print(f'Failed to authenticate user {USERNAME}.')
    else:
        rdsDB.createNewUser(USERNAME, PASSWORD, ORGANISATION)
        print('New user created.')

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
    
        
@app.route("/api/form", methods=['POST'])
def form():
    print(USERNAME, PASSWORD)
    values = request.get_json()

    rdsDB.addPatientData(USERNAME, 
                         PASSWORD, 
                         values['patientID'], 
                         values['patientFirstName'],
                         values['patientLastName'],
                         values['dob'],
                         values['dos'], 
                         values['areaCode'], 
                         values['phoneNumber'], 
                         values['remarks'],
                         values['concavityMean'],
                         values['concavitySE'],
                         values['concavityWorst'],
                         values['areaMean'],
                         values['areaSE'],
                         values['areaWorst'],
                         values['symmetryMean'],
                         values['textureMean'],
                         values['prediction'],
                         values['diagnosis'],
                         values['doc']
                        )
    
    # def addPatientData(self, userName, userPassword, patientID, firstName, lastName, DOB, date_of_service, area_code, phoneNum, 
    #                    remarks, concavity_mean, concavity_SE, concavity_worst, area_mean, area_SE, area_worst, symmetry_mean,
    #                    texture_mean, prediction, diagnosis=None, date_of_closure=None):
    
    # TODO: use this to update the RDS database!
    # variable names can be found on Form.js 
    try:
        return jsonify(
            {
            "message": "Data Submitted.",
            }
        ), 200
    except Exception as e:
        return jsonify({
            "message": "Data Failed to Submit."
        }), 500
    
    #insert data 
        
@app.route("/api/predict", methods=['POST'])
def predict():
    values = request.get_json()
    data = [[float(values['concavityMean']), 
            float(values['areaSE']), 
            float(values['areaWorst']), 
            float(values['concavityWorst']), 
            float(values['concavitySE']),
            float(values['textureMean']),
            float(values['areaMean']),
            float(values['symmetryMean'])]]
    data = np.array(data).reshape((1, 8))
    result = model.predict_proba(data)
    try:
        result = model.predict_proba(data)
        print("result:", np.round(float(result[:, 1][0]), 2))
        return jsonify(
            {
            "message": "Prediction Successful.",
            "prediction": np.round(float(result[:, 1][0]), 2)
            }
        ), 200
    except Exception as e:
        return jsonify({
            "message": "Prediction Failed."
        }), 500

if __name__ == "__main__":
    app.run(debug=True)