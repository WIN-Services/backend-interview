import { prisma } from "..";
import { orderData, orderServiceData } from "./orders";
import { serviceData } from "./services";

async function main() {
  const services = await prisma.service.createMany({ data: serviceData });
  const orders = await prisma.order.createMany({ data: orderData });
  const orderServices = await prisma.orderService.createMany({
    data: orderServiceData,
  });
  console.log({ services, orders, orderServices });
  console.log("Data seeded");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
