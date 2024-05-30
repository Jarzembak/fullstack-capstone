// To fully drop and reseed tables, run this command: npx prisma migrate reset
const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

// Seed data for 50 users and 1 administrator
async function userSeed() {
  try {
    const adminPassword = await bcrypt.hash("admin", 5);
    await prisma.user.create({
      data: {
        isAdmin: true,
        username: "admin",
        password: adminPassword,
        email: "admin"
      }
    })
    for(i=0; i < 50; i++){
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
  } catch(error) {
    console.log(error);
    throw error;
  };
  console.log(await prisma.user.findFirst({
    orderBy: {
      userId: 'desc',
    }
  }));
};

// Seed data for 50 products
async function productSeed() {
  for(i=0; i < 50; i++){
    try {
      await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          imageUrl: faker.image.urlLoremFlickr(),
          description: faker.commerce.productDescription(),
          category: faker.commerce.productAdjective(),
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

// Seed 2 carts per user, 1 'current' and 1 'complete'
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
          cartStatus: "complete"
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
// NOTE: Runs slowly. Do not use with large seeds.
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
          quantity: Number(Math.floor(Math.random() * 15))
        }
      });
    }
    catch(error) {
      console.log(error);
      throw error;
    }
  };
};

// Runs all seed functions
async function seedAllTables() {
  await userSeed();
  await productSeed();
  await cartSeed();
  await cartItemSeed();
  await cartItemSeed();
  await cartItemSeed();
};

seedAllTables();

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