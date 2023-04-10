# Win Backend Assesment

## Run Locally

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## API Reference

#### Get all Orders

```http
  GET /api/orders
```

#### Get Order By Id

```http
  GET /api/orders/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of order to fetch |

#### Create Order

```http
  POST /api/orders/create
```

| Body (urlencoded) | Type     | Description                      |
| :---------------- | :------- | :------------------------------- |
| `totalFee`        | `Number` | **Required**. totalFee to create |

#### Delete Order

```http
  DELETE /api/orders/delete/${id}
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. Id of order to delete |

#### Add Service To Order

```http
  PUT /api/orders/add-service/orderId/${id}/serviceId/${id}
```

| Parameter   | Type     | Description                          |
| :---------- | :------- | :----------------------------------- |
| `orderId`   | `string` | **Required**. Id of order to fetch   |
| `serviceId` | `string` | **Required**. Id of service to fetch |

#### Get all Services

```http
  GET /api/services
```

#### Get Service By Id

```http
  GET /api/services/${id}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `id`      | `string` | **Required**. Id of service to fetch |

#### Create Service

```http
  POST /api/services/create
```

| Body (urlencoded) | Type     | Description                  |
| :---------------- | :------- | :--------------------------- |
| `name`            | `String` | **Required**. name to create |

#### Delete Service

```http
  DELETE /api/services/delete/${id}
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `string` | **Required**. Id of order to delete |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- note : any mongo url will with the same name

`MONGO_DEV_URL`

`MONGO_PROD_URL`

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Features

- CRUD operations on orders
- CRUD operations on services

## Support

For support, email hisham.professionals@gmail.com .

## Room of enhancement

on destrying service or order ., remove ids of indivisual from both documents key of array.

## Screenshots

![App Screenshot](./screenshots/postman.jpg)
