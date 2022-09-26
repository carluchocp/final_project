"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import base64
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, Saved
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64encode
import cloudinary.uploader as uploader

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

@api.route('/private', methods=['GET'])
def get_all_posts():
    posts = Post.query.all()
    if posts is None:
        return jsonify({"error": "No posts"}), 400
    print(posts)
    return  jsonify(list(map(lambda post: post.serialize(), posts))), 200

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

@api.route('/main', methods=['POST'])
@jwt_required()
def upload_image(user_id = None):
    method_allowed(request, "POST")
    # print(request.files)
    image_file = request.files['image']
    name = request.form.get('name')
    caption = request.form.get('caption')
    # user_id = request.form.get('user_id')


    if image_file.content_type not in VALID_FORMATS:
        return jsonify({"error": "File must be png, jpg, or jpeg"}), 400

    if image_file is None or name is None or caption is None:
        return jsonify({"error": "All fields are required(Name, file)"}), 400

    # if user_id is None:
    #     return jsonify({"error":"User not found"}), 400


    try: 
        user_id = get_jwt_identity()
        cloudinary_upload = uploader.upload(image_file)
        print(cloudinary_upload)
        new_post = Post(name=name, caption=caption, image_url=cloudinary_upload["url"], cloudinary_id=cloudinary_upload["public_id"], user_id=user_id)
        db.session.add(new_post)
        db.session.commit()
        return jsonify({"message":"Post succesfully upload"})
    
    except Exception as error:
        db.session.rollback()
        return jsonify({"error":error.args}), 500
    return jsonify([]), 200

@api.route('/feed', methods=['GET'])
@jwt_required()
def get_users_posts():
    posts = Post.query.filter_by(user_id=get_jwt_identity()).all()
    if posts is None:
        return jsonify({"error": "No posts"}), 400
    print(posts)
    return  jsonify(list(map(lambda post: post.serialize(), posts))), 200 
    # return jsonify([]), 200

@api.route('/main/<int:post_id>', methods=['DELETE'])
@jwt_required()
def delete_post_by_id(post_id = None):
    method_allowed(request, "DELETE")
    
    if post_id is None:
        return jsonify({"error": "the post id is required"}), 400
    
    post = Post.query.get(post_id)
    print(post.user_id)
    if post is None:
        return jsonify({"error": "Post not found"}), 404

    if post.user_id == get_jwt_identity():
        
        try:
            cloudinary_delete_response = uploader.destroy(post.cloudinary_id)

            if cloudinary_delete_response["result"] != "ok":
                return jsonify({"error": "cloudinary deletion error"}) 
            
            db.session.delete(post)
            db.session.commit()

            return jsonify({"message": "Post deleted successfully"}), 204

        except Exception as error:
            return jsonify({"error": error}), 500 
    else:
        return jsonify({"error":"Not authorize"}), 401

@api.route('/main/saved/<int:post_id>', methods=['GET'])
@jwt_required()
def saved_post(post_id = None):
    # saved = Post.query.filter_by(user_id=get_jwt_identity()).first()
    saved = Post.query.get(post_id)
    print(type(post_id))
    if saved is None:
        return jsonify({"error": "Post not found"}), 404
    
    try:
        user_id = get_jwt_identity()
        print(user_id)
        new_saved = Saved(user_id=user_id, post_id=post_id)
        print(new_saved)
        db.session.add(new_saved)
        db.session.commit()
        return jsonify(new_saved.serialize()), 200
    except Exception as error:
        db.session.rollback()
        return jsonify({"error":f'${error.args}'}), 400

    return jsonify([]), 200