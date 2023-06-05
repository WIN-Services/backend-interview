module.exports = (sequelize, Sequelize) => {
  const Service = sequelize.define(
    "services",
    {
      name: {
        type: Sequelize.STRING,
      },
    },
    {
      underscored: true,
      defaultScope: {
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      },
    }
  );
  return Service;
};
