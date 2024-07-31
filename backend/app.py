from flask import Flask, jsonify, request, abort
from models import db, Room
from config import Config
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)

@app.route('/rooms', methods=['GET'])
def get_rooms():
    rooms = Room.query.all()
    return jsonify([room.to_dict() for room in rooms])

@app.route('/rooms', methods=['POST'])
def add_room():
    data = request.get_json()
    if not data or not all(k in data for k in ('room_number', 'type', 'status', 'rent', 'sharing', 'tenants')):
        abort(400)
    room = Room(**data)
    db.session.add(room)
    db.session.commit()
    return jsonify(room.to_dict()), 201

@app.route('/rooms/<int:room_id>', methods=['PUT'])
def update_room(room_id):
    room = Room.query.get_or_404(room_id)
    data = request.get_json()
    for key, value in data.items():
        setattr(room, key, value)
    db.session.commit()
    return jsonify(room.to_dict())

@app.route('/rooms/<int:room_id>', methods=['DELETE'])
def delete_room(room_id):
    room = Room.query.get_or_404(room_id)
    db.session.delete(room)
    db.session.commit()
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
