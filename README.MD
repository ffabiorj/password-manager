# Password Manager

Development tools:

- Django
- Django rest Framework
- Docker



## How to use on CodeSpace
#### Obs: Please note the password reset function does not work on CodeSpace, only in local machine with Docker.

1. Create an enviroment with Python.
2. Activate the enviroment.
3. Install the dependencies.
4. Execute the env_gen.
5. Run the migration.
6. Run the project.
7. Enter in the folder named frontend (in another terminal).
8. Install the dependencies.
9. Run the server.
10. Acess the link from the terminal or type the link.

```
python3 -m venv .venv
sourch .venv/bin/activate
pip install -r requirements.txt
python contrib/env_gen.py
python manage.py migrate
python manage.py runserver
cd frontend
npm install
npm run dev
http://localhost:5173/
```

## How to run locally:

1. Clone the repository.
2. Enter in the folder.
3. Create an enviroment with Python 3.12.
4. Activate the enviroment.
5. Install the dependencies.
6. Execute the env_gen.
7. Run the migration.
8. Create a container docker (need to reset the password).
9. Run the project.
10. Enter in the folder named frontend (in another terminal).
11. Install the dependencies.
12. Run the server.
13. Acess the link from the terminal or type the link.
14. Acess the link to see the email

```
git clone git@github.com:ffabiorj/password-manager.git
cd caffeex
python3 -m venv .venv
sourch .venv/bin/activate
pip install -r requirements.txt
python env_gen.py
python manage.py migrate
docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
python manage.py runserver
cd frontend
npm install
npm run dev
http://localhost:5173/
http://localhost:8025/

```

### Endpoint to access api's docs:

http://localhost:8000/redoc/

### Endpoint to create a login:

Method post localhost:8000/api/v1/register/

Body

```
{
    "username": "teste",
    "email": "teste@teste.com",
    "password": "teste"
}
```

### Endpoint to generate a login token:

Method post localhost:8000/api/v1/api/token

Body

```
{
    "username": "teste",
    "password": "teste"
}
```

### Endpoint to create a password entry:

Method post localhost:8000/api/v1/passwords/

Body

```
{
    "name": "test8",
    "icon": "https://example.com/new-icon.png",
    "notes": "Updated notes",
    "url": "https://new-example.com",
    "username": "newuser",
    "password": "newpassword",
    "user": 1
}
```

qTo access these endpoints you need to send a token authorization "Bearer token".

### Endpoint to get all passwords:

Obs: In this method you can use the query string to search for an password entry e.g passwords/?search=<name>.
This method has pagination. Each page has five entries: to see other entries use passwords/?page=2
Method get localhost:8000/api/v1/passwords/

Response:

```
[
    {
        "id": 6,
        "name": "test8",
        "icon": "https://example.com/new-icon.png",
        "notes": "Updated notes",
        "url": "https://new-example.com",
        "username": "newuser",
        "password": "newpassword",
        "user": 1
    }
]

```

### Endpoint to get a detail about a password:

Method get localhost:8000/api/v1/password/\<int\>

Response

```
{
    "id": 6,
    "name": "test8",
    "icon": "https://example.com/new-icon.png",
    "notes": "Updated notes",
    "url": "https://new-example.com",
    "username": "newuser",
    "password": "newpassword",
    "user": 1
}
```

### Endpoint to update a password:

Method put localhost:8000/api/v1/password/\<int\>

Body

```
{
    "name": "test8",
    "icon": "https://example.com/new-icon.png",
    "notes": "Updated notes",
    "url": "https://new-example.com",
    "username": "newuser",
    "password": "newpassword",>
}
```

### Endpoint to delete a password:

Method delete localhost:8000/api/v1/password/\<int\>

## How to execute tests:

#### To see all the behaviors of this api, look at the test file in app passwords folder.

1. To test the api, use:

```
python manage.py test
```
