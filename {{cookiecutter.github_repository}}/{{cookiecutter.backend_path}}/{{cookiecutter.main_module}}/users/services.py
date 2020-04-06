# Third Party Stuff
from django.contrib.auth import authenticate, get_user_model

# {{ cookiecutter.project_name }} Stuff
from {{cookiecutter.main_module}}.base import exceptions as exc


def get_and_authenticate_user(username, password):
    user = authenticate(username=username, password=password)
    if user is None:
        raise exc.WrongArguments("Invalid username/password. Please try again!")

    return user


def create_user_account(username, email, password, first_name="", last_name=""):
    user = get_user_model().objects.create_user(
        username=username, email=email, password=password, first_name=first_name, last_name=last_name
    )
    return user


def get_user_by_email(email: str):
    return get_user_model().objects.filter(email__iexact=email).first()


def get_user_by_username(username: str):
    return get_user_model().objects.filter(username__iexact=username).first()
