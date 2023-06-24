import { PrismaClient } from '@prisma/client'

process.env.TZ = 'Europe/London'

const prisma = new PrismaClient()

async function main() {
  const birminghamLocation = await prisma.location.create({
    data: { name: 'Birmingham', address: 'Coach pick up /drop off area, Station Link Road, B40 1PA' },
  });
  const londonLocation = await prisma.location.create({
    data: { name: 'London', address: 'Kings Cross Station' },
  });
  const pontinsLocation = await prisma.location.create({
    data: { name: 'Pontins Camber Sands Holiday Park', address: 'New Lydd Rd, Camber, Rye, TN31 7RL' }
  });

  /**
   * Times on 13th July
   * 10:45 am, Birmingham
   * 1:00pm, London
   * 2:00pm, London
   * 3:00pm, London
   * 7:30pm, London
   * 
   * Return on 17th July - 11am
   */

  const returnTime = new Date(2023, 6, 17, 11);
  // Birmingham Departures
  await prisma.travel.create({
    data: { fromId: birminghamLocation.id, departTime: new Date(2023, 6, 13, 10, 45), toId: pontinsLocation.id, returnTime }
  });
  // London Departures
  await prisma.travel.createMany({
    data: [
      { fromId: londonLocation.id, departTime: new Date(2023, 6, 13, 13), toId: pontinsLocation.id, returnTime },
      { fromId: londonLocation.id, departTime: new Date(2023, 6, 13, 14), toId: pontinsLocation.id, returnTime },
      { fromId: londonLocation.id, departTime: new Date(2023, 6, 13, 15), toId: pontinsLocation.id, returnTime },
      { fromId: londonLocation.id, departTime: new Date(2023, 6, 13, 19, 30), toId: pontinsLocation.id, returnTime }
    ]
  });
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
