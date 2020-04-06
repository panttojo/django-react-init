Django & React init
============

Project template for Django based projects, optimized for making REST API and consumed it with ReactJS

## Features

### Backend
- Django 2.2.x
- Python 3.7.x
- [Django Rest Framework][drf] 3.11.x.
- [12-Factor][12factor] based settings management via [django-environ], reads settings from `.env` if present.
- Supports PostreSQL 12.0 (support of postgis-2.5 is available).
- Uses `django_sites` instead of `django.contrib.sites`
- Uses [pytest] as test runner.
- Custom `User` app, for easier extensibility.
- Custom `Auth` app with JWT based Token Backend system with `login`, `logout` and `current_user_profile` modification
views for easier extensibility.
- Media storage using Google Cloud Storage (optional)
- robots.txt and humans.txt configured

### Frontend
- Coming soon

## Getting Started

Install cookiecutter with `brew install cookiecutter` or `pip install cookiecutter`.

```
cookiecutter gh:panttojo/django-react-init
```

It will ask you couple of questions required to generate the project. It will generate a folder containing all the files
in your current working directory.

If you opt to setup the project automatically, it will also:
- initialize a git repo and bump initial tag and version.
- create a virtualenv in the folder `venv` inside the backend project.
- create a postgres database with docker-compose.yml on `5432` port
- install all the python dependencies inside it.
- run the initial migration against it.
- lauch for create the first super user

then only thing you'll need to do is:

1. `cd` into the new `github_repository/backend_path` folder just created.
2. Activate virtualenv `. venv/bin/activate`.
3. Run `fab serve` or `python manage.py runserver`

Don't forget to carefully look at the generated README.


## Release Policy

`django-react-init` is a rolling release project. Commit and fixes are added to `develop` branch on regular basis and
`master` always have latest stable django and associated libraries. You are advised to follow-up with changelogs.
