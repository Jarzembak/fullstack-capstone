// To fully drop and reseed tables, run: npx prisma migrate reset
const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

// Seed data for 20 users
async function userSeed() {
  for(i=0; i < 20; i++){
    try {
      await prisma.user.create({
        data: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          username: faker.internet.userName(), 
          password: faker.internet.password(),
          email: faker.internet.email(),
          streetAddress: faker.location.streetAddress(),
          city: faker.location.city(),
          zipcode: faker.location.zipCode(),
          billingAddress: faker.location.streetAddress(), // != user.streetAddress
          billingCity: faker.location.city(),
          billingZipcode: faker.location.zipCode(),
          phone: faker.phone.number()
        }
      });
    }
    catch(error) {
      console.log(error);
      throw error;
    };
    console.log(await prisma.user.findFirst({
      orderBy: {
        userId: 'desc',
      }
    }));
  };
};

// Seed data for 20 products
async function productSeed() {
  for(i=0; i < 20; i++){
    try {
      await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          imageUrl: faker.image.urlLoremFlickr(),
          description: faker.commerce.productDescription(),
          price: faker.commerce.price()
        }
      });
    }
    catch(error) {
      console.log(error);
      throw error;
    };
    console.log(await prisma.product.findFirst({
      orderBy: {
        productId: 'desc',
      }
    }));
  };
};

// Seed 2 carts per user, 1 'current' and 1 'order complete'
async function cartSeed() {
  const users = await prisma.user.findMany();
  for (i=0; i < users.length; i++) {
    try{
      await prisma.cart.create({
        data: {
          userId: users[i].userId,
          cartStatus: "current"
        }
      });
      await prisma.cart.create({
        data: {
          userId: users[i].userId,
          cartStatus: "order complete"
        }
      });
    }
    catch(error) {
      console.log(error);
      throw error;
    }
  };
};

// Seeds 1 item per cart
async function cartItemSeed() {
  const products = await prisma.product.findMany();
  const carts = await prisma.cart.findMany();
  for (i=0; i < carts.length; i++) {
    try{
      let randomInt = Math.floor(Math.random() * products.length); // random product
      await prisma.cartItem.create({
        data: {
          cartId: carts[i].cartId,
          productId: products[randomInt].productId,
          price: products[randomInt].price,
          quantity: Math.floor(Math.random() * 15)
        }
      });
    }
    catch(error) {
      console.log(error);
      throw error;
    }
  };
};

// WARNING: Will initialize all data!
// NOTE: Runs slowly. Do not use with large seeds.
async function initAllTables() {
  await userSeed();
  await productSeed();
  await cartSeed();
  await cartItemSeed();
};

initAllTables();

try {
    async () => { await prisma.$disconnect(); }
}
catch {
    async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
};