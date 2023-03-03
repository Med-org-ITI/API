# Medical-Project API

# Med

This API provides the ENDPOINTS and authentication for the angular medical project

### Dependencies

```
- Node v18.12.1 (LTS) or more recent. While older versions can work it is advisable to keep node to latest LTS version

- npm 9.1.2 (LTS) or more recent, Yarn can work but was not tested for this project

```

### Scripts

-> start:dev, to run server in development mode
-> start:prod, to run server in production mode

### Endpoints

THE SERVER IS USING PORT--> 8000

<!-- USERS ENDPOINTS -->

GET--> '/users/:userId/items' , getting user items

PUT -> '/users/changePassword/:id' , editing user password
PUT -> '/users/changeMyPassword' , validate user change password request
PUT -> '/users/updateMe' ,update single user info

DELETE -> '/users/deleteMe' , ability for user to delete account

GET -> '/users/getMe' , get current logged

GET -> '/users/ , get all users
GET -> '/users/:id , get one user using the id

<!-- ITEMS ENDPOINTS -->

GET--> '/items' , to get all products , with ability to pass some queries for search - filter - keywords

POST --> '/items' , creating product route

GET--> '/items/:id' , to get a product by its id , example '/products/1'

PUT--> '/items/:id' , to update a product by its id , example '/products/1'

DELETE--> '/items/:id' , to delete a product by its id , example '/products/1'

<!-- Orders ENDPOINTS -->

GET-> '/orders/ , to get all orders (admin only)

GET-> '/orders/:id', to get a specific order by id (admin only)

GET-> '/orders/users/:id', getting all user orders by user id

GET-> '/orders/users/:id/completedOrders', to get all user completed orders

GET-> '/orders'/user/create', to create an order

### Installation

```
-- npm install
-- npm run start:dev
```

## Built With

- [Angular](https://angular.io/) - Single Page Application Framework
- [Node](https://nodejs.org) - Javascript Runtime
- [Express](https://expressjs.com/) - Javascript API Framework
