from sqlalchemy.orm import validates, backref, relationship
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import bcrypt,db

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True,nullable = False)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    profile_picture = db.Column(db.String)

    # comments
    comments = db.relationship( 'Comment', backref = 'user' )
    # highscores
    scores = db.relationship( 'Score', backref = 'user' )
    serialize_rules = ('comments.user', 'scores.user')
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    def authenticate(self,password):
        return bcrypt.check_password_hash(self._password_hash,password.encode('utf-8'))

class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey('users.id'))
    votes = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    serialize_rules = ('-user.comments',"-user.scores")

class Score(db.Model, SerializerMixin):
    __tablename__ = 'scores'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    score = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    serialize_rules = ("-user.scores", '-user.comments')

