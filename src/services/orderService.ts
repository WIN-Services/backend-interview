import { prisma } from "../database";
import ApiError from "../helper/classes/api-error";
import { Pagination } from "../middleware/paginate";
import { Sort } from "../middleware/sort";
import {
  CreateOrder,
  DeleteOrder,
  GetOrder,
  UpdateOrder,
} from "../validations";

function isWithin3Hours(orderDate: Date, dateToCheck: Date) {
  const threeHoursAgo = new Date(dateToCheck.getTime() - 3 * 60 * 60 * 1000);
  const threeHoursFromNow = new Date(
    dateToCheck.getTime() + 3 * 60 * 60 * 1000
  );
  console.log(orderDate >= threeHoursAgo && orderDate <= threeHoursFromNow);
  return orderDate >= threeHoursAgo && orderDate <= threeHoursFromNow;
}

export async function getAllOrders(paginate: Pagination, sort: Sort) {
  const { limit, offset, page, size } = paginate;
  const [totalOrders, orders] = await Promise.all([
    prisma.order.count({}),
    prisma.order.findMany({
      include: { OrderService: { select: { service: true } } },
      orderBy: sort,
      skip: offset,
      take: limit,
    }),
  ]);

  return { data: orders, metadata: { page, size, total: totalOrders } };
}

export async function getOrder({ params }: GetOrder) {
  const order = await prisma.order.findUnique({
    include: { OrderService: { select: { service: true } } },
    where: { id: params.order_id },
  });
  if (!order) throw new ApiError("Order not found");
  return { data: order };
}

export async function createOrder({ body }: CreateOrder) {
  const { services, totalfee, datetime } = body;

  const lastOrder = await prisma.order.findFirst({
    orderBy: [{ datetime: "desc" }],
  });

  if (lastOrder && !isWithin3Hours(lastOrder.datetime, new Date(datetime)))
    throw new ApiError(
      "Cannot create an order within 3 hours of a pre-existing order"
    );

  const order = await prisma.order.create({ data: { totalfee } });
  await prisma.orderService.createMany({
    data: services.map((service_id) => ({ order_id: order.id, service_id })),
  });
  return { data: order, message: "new order created" };
}

export async function updateOrder({ body, params }: UpdateOrder) {
  const order = await prisma.order.findUnique({
    where: { id: params.order_id },
  });

  if (!order) throw new ApiError("Order not found", 404);

  const lastOrder = await prisma.order.findFirst({
    orderBy: [{ datetime: "desc" }],
  });

  if (lastOrder && order && !isWithin3Hours(lastOrder.datetime, order.datetime))
    throw new ApiError(
      "Cannot update an order within 3 hours of a pre-existing order"
    );

  const updatedOrder = await prisma.order.update({
    data: body,
    where: { id: params.order_id },
  });
  return { data: updatedOrder, message: "order updated successfully" };
}

export async function deleteOrder({ params }: DeleteOrder) {
  const order = await prisma.order.findUnique({
    where: { id: params.order_id },
  });

  if (!order) throw new ApiError("Order not found", 404);

  await prisma.$transaction([
    prisma.orderService.deleteMany({
      where: { order_id: params.order_id },
    }),
    prisma.order.delete({
      where: { id: params.order_id },
    }),
  ]);
}
