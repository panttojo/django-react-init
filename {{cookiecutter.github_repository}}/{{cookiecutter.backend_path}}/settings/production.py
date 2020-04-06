"""Production Configurations

Adds sensible default for running app in production.
- Disable DEBUG
- Make SECRET_KEY mandatory
- Disable browsable API
"""

# Standard Library
from email.utils import getaddresses


from .common import *  # noqa F405
from .common import (
    DATABASES,
    {% if cookiecutter.add_django_auth_wall.lower() == 'y' %}MIDDLEWARE,{%- endif %}
    REST_FRAMEWORK,
    TEMPLATES,
    env,
)

# SITE CONFIGURATION
# Ensure these are set in the `.env` file manually.
SITE_SCHEME = env("SITE_SCHEME")
SITE_DOMAIN = env("SITE_DOMAIN")

# Hosts/domain names that are valid for this site.
# "*" matches anything, ".example.com" matches example.com and all subdomains
# See https://docs.djangoproject.com/en/1.11/ref/settings/#allowed-hosts
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=[SITE_DOMAIN])

# MANAGER CONFIGURATION
# ------------------------------------------------------------------------------
# People who get code error notifications.
# In the format "Full Name <email@example.com>, Full Name <anotheremail@example.com>"
ADMINS = getaddresses([env("DJANGO_ADMINS")])

# Not-necessarily-technical managers of the site. They get broken link
# notifications and other various emails.
MANAGERS = ADMINS
{%- if cookiecutter.add_django_cors_headers.lower() == "y" %}

# CORS
# ------------------------------------------------------------------------------
CORS_ORIGIN_WHITELIST = env.list("CORS_ORIGIN_WHITELIST")
{%- endif %}

{% if cookiecutter.add_django_auth_wall.lower() == "y" %}
# Basic Auth Protection
# ------------------------------------------------------------------------------
# see: https://github.com/theskumar/django-auth-wall#django-auth-wall
MIDDLEWARE = ["django_auth_wall.middleware.BasicAuthMiddleware"] + MIDDLEWARE
{%- endif %}

# If your Django app is behind a proxy that sets a header to specify secure
# connections, AND that proxy ensures that user-submitted headers with the
# same name are ignored (so that people can't spoof it), set this value to
# a tuple of (header_name, header_value). For any requests that come in with
# that header/value, request.is_secure() will return True.
# WARNING! Only set this if you fully understand what you"re doing. Otherwise,
# you may be opening yourself up to a security risk.
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

#  SECURITY
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
# Raises ImproperlyConfigured exception if DJANGO_SECRET_KEY not in os.environ
SECRET_KEY = env("DJANGO_SECRET_KEY")

if SITE_SCHEME == "https":
    # set this to 60 seconds and then to 518400 when you can prove it works
    SECURE_HSTS_SECONDS = env.int("DJANGO_SECURE_HSTS_SECONDS", default=60)
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_SSL_REDIRECT = False
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True

# STORAGE CONFIGURATION
# ------------------------------------------------------------------------------
ENABLE_MEDIA_UPLOAD_TO_GCS = env.bool("ENABLE_MEDIA_UPLOAD_TO_GCS", default=False)
if ENABLE_MEDIA_UPLOAD_TO_GCS:
    # Uploaded Media Files
    # ------------------------
    # INSTALLED_APPS += ("storages",)
    DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
    STATICFILES_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
    GS_BUCKET_NAME = env("GS_BUCKET_NAME")
    GS_DEFAULT_ACL = env("GS_DEFAULT_ACL")


# EMAIL
# ------------------------------------------------------------------------------
# DEFAULT_FROM_EMAIL in settings/common.py
EMAIL_HOST = env("EMAIL_HOST")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")
EMAIL_HOST_USER = env("EMAIL_HOST_USER")
EMAIL_PORT = env.int("EMAIL_PORT", default=587)

# DATABASE CONFIGURATION
# ------------------------------------------------------------------------------
# Raises ImproperlyConfigured exception if DATABASE_URL not in os.environ
DATABASES["default"].update(env.db("DATABASE_URL"))  # Don't override all db settings
{% if cookiecutter.postgis == "y" %}DATABASES["default"]["ENGINE"] = "django.contrib.gis.db.backends.postgis"{% endif %}

# CACHING
# ------------------------------------------------------------------------------
# Note: Specify different redis database name, if same redis instance is used.
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": env("REDIS_URL", default="redis://localhost:6379/0"),
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "PARSER_CLASS": "redis.connection.HiredisParser",
            "CONNECTION_POOL_CLASS": "redis.BlockingConnectionPool",
            "CONNECTION_POOL_CLASS_KWARGS": {
                "max_connections": env.int("REDIS_MAX_CONNECTIONS", default=10),
                "timeout": 20,
            },
        },
    }
}

# https://docs.djangoproject.com/en/1.10/topics/http/sessions/#using-cached-sessions
SESSION_ENGINE = "django.contrib.sessions.backends.cached_db"
SESSION_CACHE_ALIAS = "default"

# TEMPLATE CONFIGURATION
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/templates/api/#django.template.loaders.cached.Loader
TEMPLATES[0]["OPTIONS"]["loaders"] = [
    ("django.template.loaders.cached.Loader", TEMPLATES[0]["OPTIONS"]["loaders"])
]

if not API_DEBUG:  # noqa: F405
    # blocking browsable api for rest framework and allowing just json renderer
    if (
        "rest_framework.renderers.BrowsableAPIRenderer"
        in REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"]
    ):
        REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"].remove(
            "rest_framework.renderers.BrowsableAPIRenderer"
        )
