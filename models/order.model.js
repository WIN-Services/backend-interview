module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define(
    "orders",
    {
      totalfee: {
        type: Sequelize.STRING,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      service_id: {
        type: Sequelize.BIGINT,
        references: {
          model: "services",
          key: "id",
        },
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    },
    {
      underscored: true,
      defaultScope: {
        where: {
          is_deleted: false,
        },
        attributes: {
          exclude: [
            "is_deleted",
            "deleted_by",
            "deleted_at",
            "created_at",
            "updated_at",
          ],
        },
      },
    }
  );

  return Order;
};
