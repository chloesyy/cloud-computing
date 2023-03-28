from flask import Flask, request, jsonify
from flask_cors import CORS
from database.RDSdatabase import RDSdatabase

app = Flask(__name__)
cors = CORS(app)

#not sure where to put this. Initial database configuration
masterUserName = "masteruser"
masterPassword = "hishmaster123"
host = "hish-db-01.cfwyts8tlkjs.us-east-1.rds.amazonaws.com"
dbName = "postgres"
postgresPort = 5432
rdsDB = RDSdatabase(masterUserName,masterPassword,host,dbName,postgresPort)
#initial config
rdsDB.initialConfig()

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
    if not isLogin: 
        #register user
        rdsDB.createNewUser(username, password, organisation)
    #user sign in 
    userEngine, userCursor = rdsDB.userSignIn(username, password)
    
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
    name = request.get_json()["patientName"]
    age = request.get_json()["age"]
    print(name, age)
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

if __name__ == "__main__":
    app.run(debug=True)