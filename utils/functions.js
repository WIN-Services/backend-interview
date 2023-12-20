const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const hasExistingOrderWithin3Hours = async () => {
    const threeHoursAgo = new Date();
    threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);
    const existingOrder = await prisma.orders.findFirst({
      where: {
        datetime: {
          gte: threeHoursAgo,
          lte: new Date(),
        },
      },
    });
  
    return existingOrder;
  };


module.exports = {hasExistingOrderWithin3Hours}