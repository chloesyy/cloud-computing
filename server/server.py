from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)

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

# NOT NEEDED ANYMORE
# @app.route("/register", methods=['POST'])
# def register():
#     username = request.get_json()["username"]
#     password = request.get_json()["password"]
#     print(username, password)
#     try:
#         return jsonify(
#             {
#             "message": "Registration Successful.",
#             }
#         ), 200
#     except Exception as e:
#         return jsonify({
#             "message": "Create user failed."
#         }), 500

if __name__ == "__main__":
    app.run(debug=True)