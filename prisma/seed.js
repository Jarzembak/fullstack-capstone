// To fully drop and reseed tables, run: npx prisma migrate reset
const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

// Seed data for 20 users
async function userSeed() {
  for(i=0; i < 20; i++){
      await prisma.user.create({
        data: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          username: faker.internet.userName(), 
          password: faker.internet.password(),
          email: faker.internet.email(),
          streetAddress: faker.location.streetAddress(),
          billingAddress: faker.location.streetAddress(), // != user.streetAddress
          phone: faker.phone.number()
        }
      });
  };
};

// Seed data for 20 products
async function productSeed() {
  for(i=0; i < 20; i++){
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        imageUrl: faker.image.urlLoremFlickr(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price()
      }
    });
  };
};

// NOTE: pending due to dependencies
async function cartSeed() {
  for(i=0; i < 20; i++){
    await prisma.cartItem.create({
      data: {
        // todo
      }
    });
  };
};

// NOTE: pending due to dependencies
async function cartItemSeed() {
  for(i=0; i < 20; i++){
    await prisma.cartItem.create({
      data: {
        // todo
      }
    });
  };
};

// WARNING: Will initialize all data!
// Currently only seeds the user and product tables, not the dependent tables cart and cartItem.
async function initAllTables() {
  try {
    // users
    await prisma.user.deleteMany();
    userSeed();
    console.log(await prisma.user.findMany());
    // products
    await prisma.product.deleteMany();
    productSeed();
    console.log(await prisma.product.findMany());
    // cart (todo)
    // cartItem (todo)
  }
  catch (error) {
    console.error(error);
    throw error;
  };
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