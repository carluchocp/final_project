"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import base64
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

VALID_FORMATS = ["image/png", "image/jpg", "image/jpeg"]

def method_allowed(request, method):
    if request.method != method:
        return jsonify({"error":"Method not allowed"}), 405

def get_password(password, salt):
    return generate_password_hash(f"{password}{salt}")

def check_password(hash_password, password, salt):
    return check_password_hash(hash_password, f"{password}{salt}")


@api.route("/signup", methods=['POST'])
def signup_user():
    if request.method == 'POST':
        body = request.json

        username = body.get("username")
        name = body.get("name")
        lastname = body.get("lastname")
        age = body.get("age")
        email = body.get("email")
        password = body.get("password")

        if username is None:
            return jsonify({"message":"Error, you have to put what is being asked for"}), 400
        elif name is None:
            return jsonify({"message":"Error, you have to put what is being asked for"}), 400
        elif lastname is None:
            return jsonify({"message":"Error, you have to put what is being asked for"}), 400
        elif age is None:
            return jsonify({"message":"Error, you have to put what is being asked for"}), 400
        elif email is None:
            return jsonify({"message":"Error, you have to put what is being asked for"}), 400
        elif password is None:
            return jsonify({"message":"Error, you have to put what is being asked for"}), 400
        else:
            salt = b64encode(os.urandom(32)).decode('utf-8')
            encrypted_password = get_password(password=password, salt=salt)

            new_user = User(username=username, name=name, lastname=lastname, age=age, email=email, password=encrypted_password, is_active=True, salt=salt)
            db.session.add(new_user)

            try:
                db.session.commit()
                return jsonify(new_user.serialize()), 201
            except Exception as error:
                db.session.rollback()
                return jsonify({"message": f"Error {error.args}"}), 500
            return jsonify({"message":"internal server error"}), 500

@api.route("/login", methods=['POST'])
def login_user():
    if request.method == 'POST':
        body = request.json

        email = body.get("email")
        password = body.get("password")

        if email is None:
            return jsonify({"message":"Error, bad request"}), 400
        elif password is None:
            return jsonify({"message":"Error, bad request"}), 400
        else:
            login_user = User.query.filter_by(email=email).first()
            if login_user is not None:
                is_valid = check_password(login_user.password, password, login_user.salt)
                print(is_valid)
                if is_valid:
                    token = create_access_token(identity=login_user.id)
                    return jsonify({
                    "token": token,
                    }), 200
                else:
                    return jsonify("bad credentials"), 400
            else:
                return jsonify("bad credentials"), 400
            
    return jsonify({"message":"bad credentials"})

@api.route('/feed', methods=['POST'])
def upload_image():
    method_allowed(request, "POST")

    image_file = request.files['file']
    name = request.form.get('name')
    caption = request.form.get('caption')

    if image_file.content_type not in  VALID_FORMATS:
        return jsonify({"error": "File must be png, jpg, or jpeg"}), 400

    if image_file is None or name or caption is None:
        return jsonify({"error": "All fields are required(Name, file)"}), 400

    try: 
        cloudinary_upload = uploader.upload(image_file)
        new_post = Post(name=name, caption=caption, image_url=cloudinary_upload["url"], cloudinary_id=cloudinary_upload["public_id"])
        db.session.add(new_post)
        db.session.commit()
        return jsonify({"message":"Post succesfully upload"})
    
    except Exception as error:
        db.session.rollback()
        return jsonify({"error":"error"}), 500

@api.route('/feed', methods=['GET'])
def get_all_posts():
    method_allowed(request, "GET")

    try:
        posts = Post.query.all()
        if posts is None:
            return jsonify({"error": "No posts"})
            
        return jsonify(list(map(lambda item: item.serialize(), posts))) , 200

    except Exception as error:
        return jsonify({"error": error}), 500 

@api.route('/feed/<int:id>', methods=['DELETE'])
def delete_post_by_id(id = None):
    method_allowed(request, "DELETE")
    
    if id is None:
        return jsonify({"error": "the post id is required"}), 400
    
    post = Post.query.get(id)
    if post is None:
        return jsonify({"error": "Post not found"}), 404

    try:
        cloudinary_delete_response = uploader.destroy(post.cloudinary_id)

        if cloudinary_delete_response["result"] != "ok":
            return jsonify({"error": "cloudinary deletion error"}) 
        
        db.session.delete(post)
        db.session.commit()

        return jsonify({"Msg": "Post deleted successfully"})

    except Exception as error:
        return jsonify({"error": error}), 500 