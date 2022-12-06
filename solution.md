# Solution

## Description

- Language: Python
- Framework: Django
- Database: SQLite (for simplicity)
  - I would use PostgreSQL in production
- How it works:
  - The API is built using Django Rest Framework (DRF) and Django ORM.
  - Each request is handled by a view that queries the database and returns the results in JSON format.
  - With DRF, the views are automatically generated from the models,
  - Serializers are used to control the output/input format and to validate incoming data as well if required.

## Trade-offs

- I decided to use SQLite for simplicity, but I would use PostgreSQL in production.
- I decided to use Django Rest Framework (DRF), but if this is a small project, I would probably use Flask or ExpressJs instead.

## Assumptions

- I assumed that the `services` field in the `Order` model is a list of `Service` objects, not a list of `Service` IDs. So that the `services` field in the `Order` model is a `ManyToManyField` instead of a `ForeignKey`. i.e. an order can have multiple services.
- I assumed that the `datetime` field in the `Order` model is a string in ISO 8601 format, not a `DateTimeField`. So that the `datetime` field in the `Order` model is a `CharField` instead of a `DateTimeField`. i.e. the datetime is stored as a string instead of a datetime object.
- I assumed that a order cannot be created without adding any services to it. Thus, the `services` field in the `Order` model is required.
- The pre-existing order constraint is checked when creating/updating an order. It is not checked when deleting an order. And also this constraint only applies on first update of the order.

## What I would change if I built this for production

- Use a more robust database (PostgreSQL)
- Use a authentication system (JWT)
- Use a more robust logging system (Sentry)
- Use a docker container to run & deploy the application
- Use a CI/CD system (Github Actions)
- Use a more robust API documentation system (Swagger)
- Use a more robust API filtering system (Django Filters)

## How to run

- Install Python 3.8 or above
- Install virtualenv
- Create a virtual environment
- Activate the virtual environment
- Install the dependencies

```bash
pip install -r requirements.txt
```

- Create migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

- Run the server

```bash
python manage.py runserver
```

The api will be live on <http://127.0.0.1:8000>

- Test the API

```bash
pytest
```

## What parts of the spec were completed

- [x] Your service should implement several endpoints that accept POST, GET, PUT and DELETE requests. Also 1 endpoint that accepts GET all orders.
- [x] Your service should handle edge cases appropriately and return appropriate HTTP status codes.
- [x] Your service should return an error on creation/updating an order within 3 hrs of a pre-existing order.
- [x] Your service should return JSON results.
- [x] Your service should have at least one test.

## How much time did you spend on the project

- 3 to 3.5 hours

## What would you do differently if you were to spend additional time on the project

- Add authentication system
- Add more robust error handling
- Add more documentation
- Add more validation
- Add more filtering
- Add more tests
