import { faker } from '@faker-js/faker';
import { PreferenceDietaryRequirements, PreferenceTypeOfRoom, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: {
      email: "admin@test.gg",
    },
    update: {},
    create: {
      email: "admin@test.gg",
      name: "Admin User",
      admin: true
    }
  });

  const users = await Promise.all(Array.from({ length: 1000 }).map(async () => {
    const emailVerified = faker.helpers.maybe(() => faker.date.between('2023-02-01T00:00:00.000Z', new Date()), { probability: 0.7 });

    const preferences = emailVerified ? 
      {
        typeOfRoom: faker.helpers.arrayElement([
          PreferenceTypeOfRoom.QUIET,
          PreferenceTypeOfRoom.PARTY
        ]),
        dietary: faker.helpers.arrayElement([
          PreferenceDietaryRequirements.NONE,
          PreferenceDietaryRequirements.VEGAN,
          PreferenceDietaryRequirements. VEGETARIAN,
        ]),
        comments: faker.lorem.paragraph(),
      }
    : null;
    const name = `${faker.word.noun()} ${faker.animal.type()}`;
    const userFields = {
      name,
      email: faker.internet.email(name.replace(" ", ""), faker.datatype.number(999).toString(), "fete.example.gg"),
      emailVerified,
      sentInviteEmailAt: faker.date.between('2023-02-01T00:00:00.000Z', new Date()),
      image: faker.helpers.maybe(() => faker.image.animals(250,  250, true), { probability: 0.8 }),
    }

    const data = {
      ...userFields,
      ...(preferences && {
        preferences: {
          create: preferences
        }
      })
    }

    return prisma.user.create({
      data
    });
  }));

  // Seed some groups
  const groups = await Promise.all(Array.from({ length: 50 }).map(async (_, index) => {
    const startingIndex = index * 10;

    return prisma.group.create({
      data: {
        name: faker.company.name().substring(0,30),
        code: faker.random.alpha(7),
        members: {
          createMany: {
            data: users
            .slice(startingIndex, startingIndex + 10)
            .map((user, userIndex) => (
              {
                userId: user.id,
                owner: userIndex === 0,
                approved: faker.datatype.number(10) < 8,
              }
            )),
          }
        }
      }
    })
  }))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
