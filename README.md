# Wonderboard

This site uses Vue/Vuetify on the client-side, Flask and a PostgreSQL database on the backend, 
and is hosted on Heroku.

For everything to work, you will need a PostgreSQL database. The DATABASE_URL 
environment variable should be placed in the `.flaskenv` file. The project includes the 
PostgreSQL Data Definition Queries (ddq) needed to correctly setup the database tables and
populate sample data.

## Installation

Setup and run Flask server:

```
$ python -m venv venv
$ . venv/bin/activate
$ pip install -r requirements.txt
$ python run.py
```

Setup and run client:

```
$ npm install
$ npm run serve
```

Setup on Heroku:

```
$ heroku apps:create
$ heroku git:remote --app <app-name>
$ heroku buildpacks:add --index 1 heroku/nodejs
$ heroku buildpacks:add --index 2 heroku/python
$ git push heroku
```
