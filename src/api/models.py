from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(15), unique=True, nullable=False)
    name = db.Column(db.String(50), unique=False, nullable=False)
    lastname = db.Column(db.String(50), unique=False, nullable=False)
    age = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String, unique=False, nullable=False)
    salt = db.Column(db.String(150), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    profile = db.relationship("Profile")

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

    def get_profile(self):
        profile = Profile.query.filter_by(user_id=self.id).one_or_none()
        return profile.serialize()
    
    def create_profile(self):
        profile = Profile(user_id=self.id)
        db.session.add(profile)
        db.session.commit()

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), unique=False, nullable=False)
    image_url = db.Column(db.String(150), unique=False, nullable=False)
    # video = db.Column(db.String(150), unique=False, nullable=False)
    caption = db.Column(db.String(800), unique=False, nullable=False)
    ingredients = db.Column(db.String(800), unique=False, nullable=False)
    preparation = db.Column(db.String(800), unique=False, nullable=False)
    level = db.Column(db.String(30), unique=False, nullable=False)
    time = db.Column(db.String(30), unique=False, nullable=False)
    portions = db.Column(db.String(30), unique=False, nullable=False)
    
    cloudinary_id = db.Column(db.String(120), unique=False, nullable=False) 
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "caption": self.caption,
            "image_url": self.image_url,
            "cloudinary_id": self.cloudinary_id,
            "user_id": self.user_id,
            "username": User.query.get(self.user_id).username,
            "ingredients": self.ingredients,
            "preparation": self.preparation,
            "level": self.level,
            "time": self.time,
            "portions": self.portions,
        }

class Saved(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"), nullable=False)

    __table_args__ = (db.UniqueConstraint(
        "user_id",
        "post_id",
        name = "message_error",
    ),)

    def serialize(self):
        return {
            "id": self.id,
        }

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(100), unique=False, nullable=True)
    biography = db.Column(db.String(100), unique=False, nullable=True)
    image_url = db.Column(db.String(150), unique=False, nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    cloudinary_id = db.Column(db.String(220), unique=False, nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "location": self.location,
            "biography": self.biography,
            "user_id": self.user_id,
            "username": User.query.get(self.user_id).username,
            "name": User.query.get(self.user_id).name,
            "image_url": self.image_url,
            "cloudinary_id": self.cloudinary_id,
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





