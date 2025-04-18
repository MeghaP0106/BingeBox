from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


# MySQL Database Configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "01062005",
    "database": "bingebox"
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

@app.route('/')
def home():
    return jsonify({'message': 'Backend is running!'})

# Example Route: Fetch all content
@app.route('/content', methods=['GET'])
def get_content():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM Content")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
