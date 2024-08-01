# from flask import Flask, jsonify, request, abort
# from models import db, Room
# from config import Config
# from flask_migrate import Migrate

# app = Flask(__name__)
# app.config.from_object(Config)

# db.init_app(app)
# migrate = Migrate(app, db)

# @app.route('/rooms', methods=['GET'])
# def get_rooms():
#     rooms = Room.query.all()
#     return jsonify([room.to_dict() for room in rooms])

# @app.route('/rooms', methods=['POST'])
# def add_room():
#     data = request.get_json()
#     if not data or not all(k in data for k in ('room_number', 'type', 'status', 'rent', 'sharing', 'tenants')):
#         abort(400)
#     room = Room(**data)
#     db.session.add(room)
#     db.session.commit()
#     return jsonify(room.to_dict()), 201

# @app.route('/rooms/<int:room_id>', methods=['PUT'])
# def update_room(room_id):
#     room = Room.query.get_or_404(room_id)
#     data = request.get_json()
#     for key, value in data.items():
#         setattr(room, key, value)
#     db.session.commit()
#     return jsonify(room.to_dict())

# @app.route('/rooms/<int:room_id>', methods=['DELETE'])
# def delete_room(room_id):
#     room = Room.query.get_or_404(room_id)
#     db.session.delete(room)
#     db.session.commit()
#     return '', 204

# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

# Setup Flask-JWT-Extended
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Change this to a random key
jwt = JWTManager(app)

# In-memory user store (replace with a real database in production)
users = {
    "test@gmail.com": {"password": "test1234"}
}

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if email in users and users[email]['password'] == password:
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify(message='Invalid credentials'), 401

@app.route('/signup', methods=['POST'])
def signup():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if email in users:
        return jsonify(message='User already exists'), 400

    users[email] = {'password': password}
    return jsonify(message='User created'), 201

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

if __name__ == '__main__':
    app.run(debug=True)
