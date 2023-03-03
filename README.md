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
#### USER ENDPOINTS

1. GET--> '/users/:userId/items' , getting user items

2. PUT -> '/users/changePassword/:id' , editing user password
3. PUT -> '/users/changeMyPassword' , validate user change password request
4. PUT -> '/users/updateMe' ,update single user info

5. DELETE -> '/users/deleteMe' , ability for user to delete account

6. GET -> '/users/getMe' , get current logged

7. GET -> '/users/ , get all users
8. GET -> '/users/:id , get one user using the id

<!-- ITEMS ENDPOINTS -->
#### ITEMS ENDPOINTS
1. GET--> '/items' , to get all products , with ability to pass some queries for search - filter - keywords

2. POST --> '/items' , creating product route

3. GET--> '/items/:id' , to get a product by its id , example '/products/1'

4. PUT--> '/items/:id' , to update a product by its id , example '/products/1'

5. DELETE--> '/items/:id' , to delete a product by its id , example '/products/1'

<!-- Orders ENDPOINTS -->
#### ORDERS ENDPOINTS

1. GET-> '/orders/ , to get all orders (admin only)

2. GET-> '/orders/:id', to get a specific order by id (admin only)

3. GET-> '/orders/users/:id', getting all user orders by user id

4. GET-> '/orders/users/:id/completedOrders', to get all user completed orders

5. GET-> '/orders'/user/create', to create an order

### Installation

```
-- npm install
-- npm run start:dev
```

## Built With

- [Angular](https://angular.io/) - Single Page Application Framework
- [Node](https://nodejs.org) - Javascript Runtime
- [Express](https://expressjs.com/) - Javascript API Framework
