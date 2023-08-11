import { PrismaClient } from "@prisma/client";

export async function seed() {
  const prisma = new PrismaClient();
  try {
    const serviceData = [
      { id: 123, name: "Inspection" },
      { id: 789, name: "Testing" },
      { id: 456, name: "Analysis" },
    ];

    for (const service of serviceData) {
      await prisma.service.create({
        data: {
          id: service.id,
          name: service.name,
        },
      });
    }
    const orderData = [
      {
        id: 223,
        datetime: "2022-11-01T11:11:11.111Z",
        totalfee: 100,
        services: [
          {
            id: 123,
          },
        ],
      },
      {
        id: 224,
        datetime: "2022-11-01T11:11:11.111Z",
        totalfee: 100,
        services: [
          {
            id: 789,
          },
        ],
      },
      {
        id: 225,
        datetime: "2022-11-01T11:11:11.111Z",
        totalfee: 100,
        services: [
          {
            id: 456,
          },
        ],
      },
    ];

    for (let order of orderData) {
      await prisma.orders.create({
        data: {
          id: order.id,
          totalfee: order.totalfee,
          services: {
            connect: [{ id: order.services[0].id }],
          },
        },
      });
    }

    console.log("Seeding completed.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
