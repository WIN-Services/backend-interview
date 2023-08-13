module.exports = (sequelize, DataTypes) => {
    const order_service = sequelize.define(
    'order_service', 
    {
        order_id : { type: DataTypes.INTEGER, allowNull: false },
        service_id : { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      tableName: 'order_services',
      timestamps: true,
      paranoid: false,
      underscored: true,
      freezeTableName: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      indexes: [
        {
          fields: ['order_id'],
        },
        {
          fields: ['service_id'],
        },
        
      ],
    });
  
    order_service.associate = models => {
      order_service.belongsTo(models.order, { foreignKey: 'order_id' });
      order_service.belongsTo(models.service, { foreignKey: 'service_id' });
    };
  
    return order_service;
  };
  