from app import app
from models import User, Comment, Score
from config import db, app
from faker import Faker

fake = Faker()
def generate_users():
    User.query.delete()
    users = []
    for i in range(5):
        new_user = User(
            username = fake.name(),
            email = fake.email(),
            profile_picture = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKXE_cEDgA8BL_fzAbEBVMI1qfUJCu31bvYl7fCkKZbQ&s',
            password_hash = 'test'

        )
        users.append(new_user)
    new_user = User(
            username = "test",
            email = "test@test.com",
            profile_picture = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKXE_cEDgA8BL_fzAbEBVMI1qfUJCu31bvYl7fCkKZbQ&s',
            password_hash = 'test'
        )
    users.append(new_user)
    db.session.add_all(users)
    db.session.commit()
    print("the lads have landed ")

def generate_comments():
    Comment.query.delete()
    comment = Comment(
        content = "juicy drop pop",
        user_id = 6,
        votes = 0
    )
    db.session.add(comment)
    db.session.commit()
    print("the comment has landed ")

with app.app_context():

    generate_users()
    generate_comments()

    
    
    Score.query.delete()

    