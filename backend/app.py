from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# 📁 Archivo donde guardaremos los usuarios
DB_FILE = 'usuarios.json'

# Función para cargar usuarios desde el archivo
def cargar_usuarios():
    if os.path.exists(DB_FILE):
        with open(DB_FILE, 'r') as f:
            return json.load(f)
    return [{'email': 'admin@gmail.com', 'password': '1234'}]

# Función para guardar usuarios
def guardar_usuarios():
    with open(DB_FILE, 'w') as f:
        json.dump(usuarios, f, indent=4)

# Cargamos los usuarios al iniciar el servidor
usuarios = cargar_usuarios()


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    for usuario in usuarios:
        if usuario['email'] == email and usuario['password'] == password:
            return jsonify({'success': True, 'message': 'Inicio de sesión exitoso', 'email': email})

    return jsonify({'success': False, 'message': 'Credenciales incorrectas'}), 401


@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    for usuario in usuarios:
        if usuario['email'] == email:
            return jsonify({'success': False, 'message': 'El usuario ya existe'}), 400

    # Guardar nuevo usuario
    usuarios.append({'email': email, 'password': password})
    guardar_usuarios()  # 💾 Persistir en archivo JSON

    return jsonify({'success': True, 'message': 'Registro exitoso'})


if __name__ == '__main__':
    app.run(debug=True)
