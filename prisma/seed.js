const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const services = [
    {
      "name": "Inspection"
    },
    {
      "name": "Testing"
    },
    {
      "name": "Analysis"
    }
  ]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of services) {
    const user = await prisma.services.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
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