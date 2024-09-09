from flask import Flask, jsonify, request
from flask_cors import CORS
from cs50 import SQL
from werkzeug.security import check_password_hash, generate_password_hash

db = SQL("sqlite:///todo.db")

with open("schema.sql", "r") as file:
    sql_commands = file.read().split(';')
for command in sql_commands:
    if command.strip():
        db.execute(command)

app = Flask(__name__)
CORS(app)



@app.route("/", methods=["GET"])
def index():
    return jsonify({'message':'This is index'})

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if data['password'] != data['confirmPassword']:
        return jsonify({"status": False, message: "passwords doesn't match"})
    try:
        hashed_password = generate_password_hash(data['password'])
        db.execute("INSERT INTO users(email, username, password) VALUES(?,?,?)", data['email'], data['username'], hashed_password)
        return jsonify({"status": True})
    except Exception as err:
        if 'UNIQUE constraint failed' in str(err):
            if 'users.email' in str(err):
                return jsonify({"status": False, "message":"Email already exists"})
            if 'users.username' in str(err):
                return jsonify({"status": False, "message":"Username already exists"})
        print(err)
        return jsonify({"status":False, "message":"server error"})


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    try:
        user = db.execute("SELECT * FROM users WHERE username = ?", data['username'])
        if len(user) == 0:
            return jsonify({"status": False, "message": "Invalid username"})
        if not check_password_hash(user[0]['password'], data['password']):
            return jsonify({"status": False, "message":"Invalid password"})
        print(user[0])
        del user[0]['password']
        return jsonify({"status":True, "user": user[0]})
    except Exception as err:
        return jsonify({"message":"server error"})

@app.route("/get-users", methods=["GET"])
def get_users():
    users = db.execute("SELECT * FROM users")
    return jsonify(users)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)