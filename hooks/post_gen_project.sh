#!/bin/bash
red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`

# Ensure newline at EOF
find . ! -path "*/venv/*" -type f -name "*.py" -exec bash -c "tail -n1 {} | read -r _ || echo >> {}" \;

echo "${green}[Finished]${reset}"

echo "==> Setup project dependencies? It will:"
echo "  - Create virtualenv at './{{ cookiecutter.github_repository }}/{{ cookiecutter.backend_path }}/venv/'."
echo "  - Stop all docker containers with '5432' port expose."
echo "  - Up postgres docker image with a database '{{ cookiecutter.postgres_database_name }}'."
echo "  - Install development requirements inside virtualenv."
echo "  - Run './manage.py migrate'."
echo "  - Initialize git."
echo "  - Create git tag {{ cookiecutter.version }}."
echo "  - Create a super user"
echo -n "Would you like to perform these steps? (y/[n]) "
echo ""

# Inside CI, always assume the answer is yes! :)
if [ $CI ]; then
    yn="yes"
else
    read  yn
fi

if echo "$yn" | grep -iq "^y"; then
    echo "==> Checking system dependencies. You may need to enter your sudo password."

    echo "==> Install pip, if not present."
    if ! hash pip 2>/dev/null; then
        echo "pip not found.... installing it..."
        sudo easy_install pip
    fi

    echo "==> Install fabric, if not present."
    if ! hash fab 2>/dev/null; then
        echo "fab command not found... installing it..."
        sudo pip install fabric3==1.14.post1
    fi

    echo "==> Initialize git repo and create first commit and tag it with v{{ cookiecutter.version }}"
    git init
    git add .
    git commit -am "chore(setup): Create base Django & ReactJS project."
    git tag v{{ cookiecutter.version }}

    echo "${green}==> Setup the database on postgres with docker-compose for local development${reset}"
    docker stop $(docker ps -a -q -f expose=5432)
    docker-compose up -d

    echo "${green}==> Setup the project dependencies for local development${reset}"
    cd {{ cookiecutter.backend_path }}
    cp .env.sample .env
    fab init

    OUT=$?
    if [ $OUT -eq 0 ]; then
        echo "${green}============================================"
        echo "All set! Run these commands to get started for the backend:"
        echo ""
        echo "cd {{ cookiecutter.github_repository }}/{{ cookiecutter.backend_path }}/"
        echo "fab test"
        echo "fab serve"
        echo ""
        echo "============================================"
        echo "All set! Run these commands to get started for the frontend:"
        echo ""
        echo "cd {{ cookiecutter.github_repository }}/{{ cookiecutter.frontend_path }}/"
        echo "npm install"
        echo "nom start"
        echo ""
        echo "============================================"
        echo "${green} ============> HAPPY CODING <============ ${reset}"
    else
        echo "${red}============================================"
        echo "          Oops! Something went wrong!!      "
        echo "============================================${reset}"
        echo ""
        echo -n "HINT: Make sure you have installed all OS dependencies. "
        echo "Check the logs above, they might give you some clues."
    fi
else
    echo "==> Skipping project setup..."
    echo "==> You can now 'cd {{ cookiecutter.github_repository }}/' and explore the project. "
    echo "    Read 'README.md' inside it for further setup instructions!"
    echo ""
    echo "${green} ==============> HAPPY CODING <============== ${reset}"
fi
