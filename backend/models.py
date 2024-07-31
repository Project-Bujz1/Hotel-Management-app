# models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_number = db.Column(db.String(10), unique=True, nullable=False)
    type = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(50), nullable=False)
    rent = db.Column(db.Float, nullable=False)
    sharing = db.Column(db.String(50), nullable=False)
    tenants = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(255), nullable=True)

    def __repr__(self):
        return f'<Room {self.room_number}>'
    def to_dict(self):
        return {
            'id': self.id,
            'roomNumber': self.room_number,
            'type': self.type,
            'status': self.status,
            'rent': self.rent,
            'sharing': self.sharing,
            'tenants': self.tenants,
            'imageUrl': self.image_url
        }