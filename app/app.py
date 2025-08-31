import os
import mysql.connector
from flask import Flask, render_template, request, jsonify, redirect, url_for
from .evaluator import evaluate_expression

app = Flask(__name__)

# MySQL Database Configuration from Environment Variables
DB_HOST = os.getenv("MYSQL_HOST", "localhost")
DB_USER = os.getenv("MYSQL_USER", "root")
DB_PASSWORD = os.getenv("MYSQL_PASSWORD", "password")
DB_NAME = os.getenv("MYSQL_DB", "calculator_db")

# Ensure DB connection
def get_db_connection():
    return mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )

# Initialize DB and create table if not exists
def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS history (
            id INT AUTO_INCREMENT PRIMARY KEY,
            expression TEXT NOT NULL,
            result TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    cursor.close()
    conn.close()

init_db()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/calculate", methods=["POST"])
def calculate():
    data = request.get_json()
    expression = data.get("expression", "")
    try:
        result = evaluate_expression(expression)

        # Save to DB
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO history (expression, result) VALUES (%s, %s)", (expression, str(result)))
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"result": result})
    except Exception:
        return jsonify({"error": "Invalid Expression"}), 400

@app.route("/history")
def view_history():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM history ORDER BY created_at DESC LIMIT 50")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return render_template("history.html", history=rows)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
