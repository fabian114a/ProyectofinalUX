from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import re
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from flask_cors import CORS
from datetime import timedelta

# --- Configuración base ---
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'cambiar-esto-por-una-secreta-muy-larga'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=8)

db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app, origins=["http://localhost:4200"])  # Ajusta el origen si tu Angular corre en otro puerto

# --- Modelo de usuario ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "email": self.email}

# --- Crear tablas al iniciar ---
with app.app_context():
    db.create_all()

# --- Rutas ---
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name', '').strip()
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not email or not password:
        return jsonify({"msg": "Email y contraseña son obligatorios"}), 400
    
    if not re.match(r"[^@]+@[^@]+\.[^@]+", email):  # Expresión regular básica para validar correos
        return jsonify({"msg": "El correo electrónico no es válido"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "El usuario ya existe"}), 409

    pw_hash = generate_password_hash(password)
    user = User(name=name, email=email, password_hash=pw_hash)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "Usuario creado", "user": user.to_dict()}), 201


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not email or not password:
        return jsonify({"msg": "Email y contraseña son obligatorios"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"msg": "Credenciales inválidas"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"access_token": access_token, "user": user.to_dict()}), 200


@app.route('/api/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    return jsonify({"user": user.to_dict()}), 200


# 🚧 Ruta solo para desarrollo: ver todos los usuarios registrados
@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users]), 200

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"msg": f"Usuario con ID {user_id} eliminado correctamente"}), 200


@app.route('/api/users/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    # Verificar que el usuario tiene permiso de actualizar su propio perfil
    current_user_id = get_jwt_identity()
    if current_user_id != user_id:
        return jsonify({"msg": "No autorizado para actualizar este usuario"}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if name:
        user.name = name
    if email:
        user.email = email
    if password:
        user.password_hash = generate_password_hash(password)

    db.session.commit()
    return jsonify({"msg": "Usuario actualizado", "user": user.to_dict()}), 200


# --- Ejecución ---
if __name__ == '__main__':
    app.run(debug=True, port=5000)
