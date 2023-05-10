import os 
from flask import jsonify, make_response, request, session, g, current_app, redirect, abort
from flask_restful import Resource
import json
from sqlalchemy.exc import IntegrityError
from config import app,db,api
from models import User, Comment, Score
from flask_cors import CORS
CORS(app)

class Home(Resource):
    def get(self):
        syntax_dict = '''
            <h1>"message": "Welcome to the Syntax Slingers RESTful API"</h1>
        '''
        response = make_response(syntax_dict, 200)
        return response
api.add_resource(Home, '/', endpoint='home')



# routes for users Get, Get by ID and Posting a new user


class Users(Resource):
    def get(self):
        all_users = User.query.all()
        dict_users = []
        for user in all_users:
            dict_users.append(user.to_dict())
        return make_response(dict_users, 200)
    def post(self):
        try:
            input = request.get_json()
            new_user = User(
                email=input['email'], password_hash=input['password'], profile_picture = input['profile_picture'], username = input['username'])
            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(), 201)
        except Exception as e:
            return make_response({
                "errors": [e.__str__()]
            }, 400)


api.add_resource(Users, '/users')


class UsersById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            return make_response(user.to_dict(), 200)
        else:
            return make_response({"error": "Not a valid user"})
    def patch(self, id):
        user = User.query.filter(User.id == id).first()
        if user:
            data=request.get_json() 
            try:                                        
                for attr in data:
                    setattr(user, attr, data[attr]) 
                db.session.add(user) 
                db.session.commit() 
            except Exception as e:
                return make_response({"errors": [e.__str__()]}, 422)
            user_dict = user.to_dict()
            response = make_response(jsonify(user_dict), 201)
            return response 
        return make_response(jsonify({"error": "User Record not found"}), 404)

    def delete(self, id):
        user = User.query.filter(User.id == id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            user_dict = {"message": "User Record successfully deleted"}
            return make_response(user_dict, 200)
        return make_response(jsonify({"error": "User Record not found"}), 404)
    


api.add_resource(UsersById, '/users/<int:id>')

#  get comments and post comments


class AllComments(Resource):
    def get(self):
        all_comments = Comment.query.all()
        dict_comments = []
        for comment in all_comments:
            dict_comments.append(comment.to_dict())
        return make_response(dict_comments, 200)
    def post(self):
        try:
            input = request.get_json()
            new_comment = Comment(
                content=input['content'], user_id=input['user_id'], votes = 0)
            db.session.add(new_comment)
            db.session.commit()
            return make_response(new_comment.to_dict(), 201)
        except Exception as e:
            return make_response({
                "errors": [e.__str__()]
            }, 400)


api.add_resource(AllComments, '/comments')


class CommentById(Resource):
    def get (self, id):
        comment = Comment.query.filter(Comment.id == id).first()
        if comment:
            return make_response(comment.to_dict(), 200)
        else:
            return make_response({"error": "Not a valid user"})
        
    def patch(self, id):
        comment = Comment.query.filter(Comment.id == id).first()
        if comment:
            data=request.get_json() 
            try:                                        
                for attr in data:
                    setattr(comment, attr, data[attr]) 
                db.session.add(comment) 
                db.session.commit() 
            except Exception as e:
                return make_response({"errors": [e.__str__()]}, 422)
            comment_dict = comment.to_dict()
            response = make_response(jsonify(comment_dict), 201)
            return response 
        return make_response(jsonify({"error": "User Record not found"}), 404)
    def delete(self, id):
        comment = Comment.query.filter(Comment.id == id).first()
        if comment:
            db.session.delete(comment)
            db.session.commit()
            comment_dict = {"message": "comment Record successfully deleted"}
            return make_response(comment_dict, 200)
        return make_response(jsonify({"error": "User Record not found"}), 404)
    
api.add_resource(CommentById, '/comments/<int:id>')
    # Score methods

class Scores(Resource):
    def get(self):
        all_scores = Score.query.all()
        dict_scores = []
        for user in all_scores:
            dict_scores.append(user.to_dict())
        return make_response(dict_scores, 200)
    def post(self):
        try:
            input = request.get_json()
            new_score = Score(
                user_id=input['user_id'], score = input['score'])
            db.session.add(new_score)
            db.session.commit()
            return make_response(new_score.to_dict(), 201)
        except Exception as e:
            return make_response({
                "errors": [e.__str__()]
            }, 400)
            
api.add_resource(Scores, '/scores')


class ScoreById(Resource):
    def get (self, id):
        score = Score.query.filter(Score.id == id).first()
        if score:
            return make_response(score.to_dict(), 200)
        else:
            return make_response({"error": "Not a valid user"})
        
    def patch(self, id):
        score = Score.query.filter(Score.id == id).first()
        if score:
            data=request.get_json() 
            try:                                        
                for attr in data:
                    setattr(score, attr, data[attr]) 
                db.session.add(score) 
                db.session.commit() 
            except Exception as e:
                return make_response({"errors": [e.__str__()]}, 422)
            score_dict = score.to_dict()
            response = make_response(jsonify(score_dict), 201)
            return response 
        return make_response(jsonify({"error": "User Record not found"}), 404)
    def delete(self, id):
        score = Score.query.filter(Score.id == id).first()
        if score:
            db.session.delete(score)
            db.session.commit()
            comment_dict = {"message": "comment Record successfully deleted"}
            return make_response(comment_dict, 200)
        return make_response(jsonify({"error": "User Record not found"}), 404)
    
api.add_resource(ScoreById, '/scores/<int:id>')


# auth time bapy

class Login(Resource):
    def post(self):
        try:
            jsoned_request = request.get_json()
            user = User.query.filter(User.username == jsoned_request["username"]).first()
            if user.authenticate(jsoned_request["password"]):
                session['user_id'] = user.id
                res = make_response(jsonify(user.to_dict()),200)
                print("nice")
                return res
        except Exception as e:
            return make_response({
                "errors": [e.__str__()]
            }, 400)

        
api.add_resource(Login, '/login')

class check_login(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == session["user_id"]).first()
            res = make_response(jsonify(user.to_dict()),200)
            return res
api.add_resource(check_login, '/checklogin')

class check_logged_in(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            if user_id != None:
                return make_response({"logged_in": True},200)
        return make_response({"logged_in": False},200)
    
api.add_resource(check_logged_in, '/check')

class logout(Resource):
    def delete(self):
        session['user_id'] = None
        res = make_response(jsonify({ "login" : "Logged out"}),200)
        return res
api.add_resource(logout, '/logout')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
