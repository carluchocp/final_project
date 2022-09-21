 from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), unique=False, nullable=False)
    name = db.Column(db.String(50), unique=False, nullable=False)
    lastname = db.Column(db.String(50), unique=False, nullable=False)
    age = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String, unique=False, nullable=False)
    salt = db.Column(db.String(150), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.name,
            "username": self.username,
            "email": self.email,
            "is_active": self.is_active,
        }

class Post(db.model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=False, nullable=False)
    image_url = db.Column(db.String(150), unique=False, nullable=False)
    # video = db.Column(db.String(150), unique=False, nullable=False)
    caption = db.Column(db.String(300), unique=True, nullable=False)
    
    cloudinary_id = db.Column(db.String(120), unique=False, nullable=False) 
    user_id = db.column(db.Integer, db.ForeingKey("user.id"), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "caption": self.caption,
            "img_url": self.img_url,
            "cloudinary_id": self.cloudinary_id
        }

# class Like(db.model):
#     id = db.Column(db.Integer, primary_key=True)
    
#     user_id = db.column(db.Integer, db.ForeingKey("user.id"), nullable=False)
#     post_id = db.column(db.Integer, db.ForeingKey("post.id"), nullable=False)

#     # __table_args__ = (db.UniqueConstraint(
#     #     "post_id",
#     #     user_id = "message_error"
#     # ),)

#     def serialize(self):
#         return {
#             "id": self.id,
#         }

# class Comment(db.model):
#     id = db.Column(db.Integer, primary_key=True)
#     comment = db.Column(db.String(150), unique=False, nullable=False)
    
#     user_id = db.column(db.Integer, db.ForeingKey("user.id"), nullable=False)
#     post_id = db.column(db.Integer, db.ForeingKey("post.id"), nullable=False)

#     # __table_args__ = (db.UniqueConstraint(
#     #     "user_id",
#     #     name = "message_error"
#     # ),)

#     def serialize(self):
#         return {
#             "id": self.id,
#             "comment": self.comment,
#         }




# class Saved(db.model):
#     id = db.Column(db.Integer, primary_key=True)

#     user_id = db.column(db.Integer, db.ForeingKey("user.id"), nullable=False)
#     post_id = db.column(db.Integer, db.ForeingKey("post.id"), nullable=False)

#     __table_args__ = (db.UniqueConstraint(
#         "user_id",
#         "post_id",
#         name = "message_error",
#     ),)

#     def serialize(self):
#         return {
#             "id": self.id,
#         }
