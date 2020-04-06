{{ cookiecutter.project_name }}
==============================

__Version:__ {{ cookiecutter.version }}

{{ cookiecutter.project_description }}

## Getting up and running

Minimum requirements: **pip, fabric, python3.7, docker & docker-compose for: redis & [PostgreSQL 11][install-postgres]{% if cookiecutter.postgis == 'y' %} with postgis-2.4{% endif %}**, setup is tested on Linux only.

```
brew install postgres python3
[sudo] pip install fabric
```

In your terminal, type or copy-paste the following:

    git clone git@github.com:{{ cookiecutter.github_username }}/{{ cookiecutter.github_repository }}.git; cd {{ cookiecutter.github_repository }}/{{ cookiecutter.backend_path }}/; fab init

Go grab a cup of coffee, we bake your hot development machine.

Useful commands:

- `fab serve` - start [django server](http://localhost:8000/)
- `fab test` - run the test locally with ipdb
- `fab makemigrations`
- `fab migrate`

**NOTE:** Checkout `fabfile.py` for all the options available and what/how they do it.
