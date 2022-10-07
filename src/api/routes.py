"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import base64
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, Saved, Profile
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
                new_user.create_profile()
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

@api.route('/newpost', methods=['POST'])
@jwt_required()
def upload_image(user_id = None):
    method_allowed(request, "POST")
    # print(request.files)
    image_file = request.files['image']
    name = request.form.get('name')
    caption = request.form.get('caption')
    ingredients = request.form.get('ingredients')
    preparation = request.form.get('preparation')
    level = request.form.get('level')
    time = request.form.get('time')
    portions = request.form.get('portions')

    if image_file.content_type not in VALID_FORMATS:
        return jsonify({"error": "File must be png, jpg, or jpeg"}), 400

    if image_file is None or name is None or caption is None or ingredients is None or preparation is None or level is None or time is None or portions is None:
        return jsonify({"error": "All fields are required"}), 400

    try: 
        user_id = get_jwt_identity()
        cloudinary_upload = uploader.upload(image_file)
        print(cloudinary_upload)
        new_post = Post(name=name, caption=caption, image_url=cloudinary_upload["url"], cloudinary_id=cloudinary_upload["public_id"], user_id=user_id, ingredients=ingredients, preparation=preparation, level=level, time=time, portions=portions)
        db.session.add(new_post)
        db.session.commit()
        return jsonify({"message":"Post succesfully upload"})
    
    except Exception as error:
        db.session.rollback()
        return jsonify({"error":error.args}), 500
    return jsonify([]), 200

@api.route('/feed', methods=['GET'])
@jwt_required()
def get_followed_users_posts():
    posts = Post.query.all()
    if posts is None:
        return jsonify({"error": "No posts"}), 400
    print(posts)
    return  jsonify(list(map(lambda post: post.serialize(), posts))), 200 

@api.route('/main/profile', methods=['GET'])
@jwt_required()
def get_all_profiles():
    profiles = Profile.query.filter_by(user_id=get_jwt_identity()).one_or_none()
    if profiles is None:
        return jsonify({"error": "No profiles"}), 400
    return  jsonify(profiles.serialize()), 200 

@api.route('/main/profile/<int:user_id>', methods=['POST'])
@jwt_required()
def upload_profiles(user_id = None):
    method_allowed(request, "POST")

    location = request.form.get('location')
    biography = request.form.get('biography')
    image_file = request.files['image']

    if user_id is None:
        return jsonify({"error": "the user id is required"}), 400

    if location is None or biography is None:
        return jsonify({"error": "All fields are required(Name, file)"}), 400

    try:
        user_id = get_jwt_identity()
        print(user_id)
        cloudinary_upload = uploader.upload(image_file)
        new_profile = Profile(user_id=user_id, location=location, biography=biography, image_url=cloudinary_upload["url"], cloudinary_id=cloudinary_upload["public_id"],)
        db.session.add(new_profile)
        db.session.commit()
        return jsonify({"message":"Profile succesfully upload"})
    except Exception as error:
        db.session.rollback()
        return jsonify({"error":error.args}), 500
    return jsonify([]), 200

@api.route('/main', methods=['GET'])
@jwt_required()
def get_users_posts():
    posts = Post.query.filter_by(user_id=get_jwt_identity()).all()
    if posts is None:
        return jsonify({"error": "No posts"}), 400
    print(posts)
    return  jsonify(list(map(lambda post: post.serialize(), posts))), 200 

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

@api.route('/search/users', methods=['POST'])
def search_users():

    search = request.json.get('search')
    users = User.query.all()
    # print(profiles)

    results = []

    for user in users:
        if search in user.username:
            results.append(user)

    # print(results)

    if users is None:
        return jsonify({"error": "Profile not found"}), 404

    if search is None:
        return jsonify({"error": "You must fill this field"}), 400

    # return jsonify(list(map(lambda item: item.serialize(), results))), 200
    return jsonify(list(map(lambda item: item.get_profile(), results))), 200

@api.route('/search/posts', methods=['POST'])
def serch_posts():

    search = request.json.get('search')
    posts = Post.query.all()

    results = []

    for post in posts:
        if search in post.name:
            results.append(post)

    if post is None:
        return jsonify({"error": "Post not found"}), 404

    if search is None:
        return jsonify({"error": "You must fill this field"}), 400

    return jsonify(list(map(lambda item: item.serialize(), results))), 200

@api.route('/profile', methods=['PUT'])
@jwt_required()
def set_profile():

    image_file = request.files['image']
    location = request.form.get('location')
    biography = request.form.get('biography')

    profile = Profile.query.filter_by(user_id=get_jwt_identity()).one_or_none()

    if profile is None:
        return jsonify({"error":"perfil no existente"})

    if image_file is not None:
        cloudinary_upload = uploader.upload(image_file)
        profile.image_url = cloudinary_upload["url"]
        profile.cloudinary_id = cloudinary_upload["public_id"]
    
    if location is not None:
        profile.location = location

    if biography is not None:
        profile.biography = biography

    try:
        db.session.commit()
        return jsonify({}), 200
    
    except Exception as Error:
        db.session.rollback()
        return jsonify({"error":Error.args}), 500
    