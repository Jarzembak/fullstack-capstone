API DOCUMENTATION 

------------------------------
API URL Format
------------------------------
For the locally hosted database, the base URL is "localhost:3000/api" followed by the resource you are trying to access.

The resoruces include :
/users
/products
/carts
(cartItems are accessed through the routes found in /carts)

------------------------------
Authentication
------------------------------
Some routes require a login or a user with admininstrator access.

Here is an example of a route requiring authentication (GET /api/users):

// GET user currently logged in
router.get('/', auth.protection, async (req, res, next) => {
    try {
        const result = await prisma.user.findUnique({
            where: {
                userId: Number(req.user.userId)
            },
        });
        res.send(result);
    }
    catch (error) {
        next(error)
    }
});

Auth functions are imported via "const auth = require('../auth')".
The method calls "auth.protection" and "auth.adminProtection" take a json web token.
The token is verified before storing the payload in "req.user", which will allow autheticated routes to reference the user.
The payload includes the Number userId ("req.user.userId") and Boolean isAdmin ("req.user.isAdmin").

Administrator privileges cannot be changed or granted through this API.

------------------------------
Endpoints - General
------------------------------
[Admin] GET /<resource>
- Returns the complete table for the requested resource.
- This may be used for any resource.
- Products do NOT require administrator authentication for this route.

[Admin] GET /<resource>/<resourceId>
- Returns the resource with the primary key (ID) in the request.
- This is not available for the cartItem table, which is instead accessed through the cart table.
- Products do NOT require administrator authentication for this route.

POST /<resource>
- Creates a new row for a given resource.
    * Carts and cartItems have special cases below.
- Accepts an object with all required fields (excluding primary key) in the request.
- Non-primary keys and IDs should be included in the data.
- Currently, cartItems are created and updated through /carts routes only.
- Admin authentication is required for Products.

PUT /<resource>/<resourceId>
- Updates the row for a given resource based on the primary key.
- Accepts an object with all required fields (excluding primary key) in the request.
- Admin authentication is required for Products.

------------------------------
Endpoints - User
------------------------------
GET /users/cart
- Returns a cart for the given user ID number with cartStatus 'current'.
- For each user, there should only be one cart with cartStatus set to 'current' at a time.

GET /users/cart/details
- Returns a cart for the given user ID number with cartStatus 'current'.
- Also returns the cartItems AND products/details associated with those cartItems.

GET /users/history
- Returns all carts for the given user ID number.
- Effectively, this looks up the user's order history.
- Also returns the cartItems associated with each cart.

GET /users/history/<cartId>
- Returns a single cart belonging to the logged in user, based on cartId.

POST /users/login
- The login route for all users.
- Returns a token for user authentication.

POST /users
- Creates/registers a new user.
- Hashes password with 5 salt_rounds.

PUT /users
- Edits data for the currently logged in user only.
- Hashes password with 5 salt_rounds.

------------------------------
Endpoints - Cart
------------------------------
[Admin] GET /carts/<cartId>/items
- Returns all cartItems associated with the cart ID number.

GET /carts/<userId>/history
- Returns all carts (with cartItems) belonging to the user.
- Essentially functions as the user's order history.

POST /carts
- Creates a new cart.
- Should be called AFTER checkout, with the previous cart's cartStatus changed from 'current'.
- Assigns 'current' cartStatus automatically.

PUT /carts/<cartId>
- Updates the data of a single cart ID.
- A cart's user never changes, so this is only used to update cartStatus.

---------------

POST /carts/item
- Creates a cartItem with the cartId, productId, and data included in the request.
- Should be called when the user add a new item (product) to their cart.
- The necessary keys (cartId and productId) go in the req.body.

PUT /carts/item
- Updates the cartItem with the cartId and productId included in req.body.

DELETE /carts/item
- Deletes the cartItem with the cartId and productId included in req.body.
- Responds with status 204 when successful.

DELETE /carts/item/<cartId>
- Deletes ALL cartItems with the matching cartId param.
- Used to clear a user's cart completely.
- Responds with status 204 when successful.
- Only works with cartStatus 'current' carts; completed orders should not be changed.

------------------------------
Endpoints - Product
------------------------------
GET /products
- Fetches all products in the product table.
- No authentication required; users that have not logged in (Guests) can use this route.

GET /products/<productID>
- Fetches a product row with the matching ID.
- No authentication required; users that have not logged in (Guests) can use this route.

GET /products/search
- This executes a search for products with name containing a string, with customizable criteria.
- The URL must be followed by a query:
  .../products/search?pagination=<Number>&goToPage=<Number>&nameContains=<String>&orderBy=<String>&orderDir=<String>
    
    pagination: Number // The number of results per page
    goToPage: Number // Page will be calculated as (pagination * (goToPage - 1))
    nameContains: String // String to search the product name for
    orderBy: String // The Product column you want to search by (exact key names ONLY)
    orderDir: String // Must be 'asc' or 'desc' ONLY

- No authentication required; users that have not logged in (Guests) can use this route. 

GET /products/search/category
- This returns a filtered list of products containing a category, with customizable criteria.
- The 'category' criterion must be an exact string match, making it suitable for navigation.
- The URL must be followed by a query:
  .../products/search?pagination=<Number>&goToPage=<Number>&nameContains=<String>&orderBy=<String>&orderDir=<String>
    
    pagination: Number // The number of results per page
    goToPage: Number // Page will be calculated as (pagination * (goToPage - 1))
    nameContains: String // String to search the product name for
    orderBy: String // The Product column you want to search by (exact key names ONLY)
    orderDir: String // Must be 'asc' or 'desc' ONLY

- No authentication required; users that have not logged in (Guests) can use this route. 

[Admin] DELETE /products/<productId>
- Deletes a product with the productId in the address.
- Responds with status 204 when successful.
