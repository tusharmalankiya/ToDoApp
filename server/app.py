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
        userId = db.execute("INSERT INTO users(email, username, password) VALUES(?,?,?)", data['email'], data['username'], hashed_password)
        user = db.execute("SELECT * FROM users WHERE users.id = ?", userId)
        del user[0]['password']
        return jsonify({"status": True, "user":user[0]})
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

# add and get categories
@app.route("/categories", methods=["GET", "POST", "PATCH"])
def categories():
    # get all categories
    if request.method == "GET":
        userId = request.args.get("userId")
        try:
            categories = db.execute("SELECT * FROM categories WHERE userId = ?", userId)
            return jsonify({"status":True, "categories":categories, "message":"categories fetched"})
        except Exception as err:
            print(err)
            return jsonify({"status":False, "message":"server error"})

    # add category if not exists
    if request.method == "POST":
        data = request.get_json()
        # print(data)
        try:
            isCategory = db.execute("SELECT * FROM categories WHERE title = ? AND userId = ?", data['title'], data['userId'])
            if len(isCategory) > 0:
                return jsonify({"status":False, "message":"Category already exists"})
            categoryId = db.execute("INSERT INTO categories(userId, title) VALUES(?,?)", data['userId'], data['title'])
            print('this category', categoryId)
            return jsonify({"status":True, "message":"Category created", "categoryId": categoryId})
        except Exception as err:
            print(err)
            return jsonify({"status":False, "message":"server error"})

    # update category
    if request.method == "PATCH":
        data = request.get_json()
        print("patch data",data)
        try:
            isCategory = db.execute("SELECT * FROM categories WHERE title = ? AND userId = ?", data['title'], data['userId'])
            if len(isCategory) > 0:
                return jsonify({"status":False, "message":"Category already exists"})
            db.execute("UPDATE categories SET title = ? WHERE id = ?", data['title'], data['categoryId'])
            return jsonify({"status":True, "message":"Category updated"})
        except Exception as err:
            print(err)
            return jsonify({"status":False, "message":"server error"})

# delete category
@app.route("/categories/<int:categoryId>", methods=["DELETE"])
def delete_category(categoryId):
    print(categoryId)
    try:
        db.execute("DELETE FROM tasks WHERE categoryId = ?", categoryId)
        db.execute("DELETE FROM categories WHERE categories.id = ?", categoryId)
        return jsonify({"status":True, "message":"Category deleted"})
    except Exception as err:
        print(err)
        return jsonify({"status":False, "message":"server error"})

@app.route("/tasks", methods=["GET", "POST", "PATCH"])
def tasks():
    if request.method == "GET":
        try:
            tasks = db.execute("SELECT * FROM tasks WHERE userId = ? AND categoryId = ?", request.args.get('userId'), request.args.get('categoryId'))
            return jsonify({"status":True, "tasks":tasks, "message":"Tasks fetched"})
        except Exception as err:
            print(err)
            return jsonify({"status":False, "message":"server error"})
        
    if request.method == "POST":
        data = request.get_json()
        print(data)
        try:
            isTask = db.execute("SELECT * FROM tasks WHERE name = ? AND categoryId = ? AND userId = ?", data['name'], data['categoryId'], data['userId'])
            if len(isTask) > 0:
                return jsonify({"status": False, "message":"Task already exists"})
            taskId = db.execute("INSERT INTO tasks(categoryId, userId, name) VALUES(?,?,?)", data['categoryId'], data['userId'], data['name'])
            return jsonify({"status":True, "taskId":taskId, "message":"Task created"})
        except Exception as err:
            print(err)
            return jsonify({"status":False, "message":"server error"})
        
    if request.method == "PATCH":
        data = request.get_json()
        print(data)
        if data['action'] == "NAME_CHANGE":        
            try:
                isTask = db.execute("SELECT * FROM tasks WHERE name = ? AND categoryId = ? AND userId = ?", data['name'], data['categoryId'], data['userId'])
                if len(isTask) > 0:
                    return jsonify({"status": False, "message":"Task already exists"})
                taskId = db.execute("UPDATE tasks SET name = ? WHERE tasks.id = ?", data['name'], data['taskId'])
                return jsonify({"status":True, "message":"Task updated"})
            except Exception as err:
                print(err)
                return jsonify({"status":False, "message":"server error"})

        if data['action'] == "STATUS_CHANGE":
            try:
                taskId = db.execute("UPDATE tasks SET completed = ? WHERE tasks.id = ?", data['completed'], data['taskId'])
                return jsonify({"status":True, "message":"Task updated"})
            except Exception as err:
                print(err)
                return jsonify({"status":False, "message":"server error"})

# delete task
@app.route("/tasks/<int:taskId>", methods=["DELETE"])
def delete_task(taskId):
    try:
        db.execute("DELETE FROM tasks WHERE tasks.id = ?", taskId)
        return jsonify({"status":True, "message":"Task deleted"})
    except Exception as err:
        print(err)
        return jsonify({"status":False, "message":"server error"})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)