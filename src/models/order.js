module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
  'order', 
  {
    date_time: { type: DataTypes.DATE, allowNull:false },
    total_fee: { type: DataTypes.INTEGER, allowNull:false }
  },
  {
    tableName: 'orders',
    timestamps: true,
    paranoid: false,
    underscored: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    indexes: [
      {
        fields: ['date_time'],
      },
    ],
  });

  order.associate = models => {
    order.belongsToMany(models.service, { through: 'order_services', foreignKey: 'order_id'});
  };

  return order;
};
