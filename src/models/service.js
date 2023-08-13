module.exports = (sequelize, DataTypes) => {
  const service = sequelize.define(
  'service', 
  {
    name: { type: DataTypes.INTEGER, unique: true, allowNull: false }
  },
  {
    tableName: 'services',
    timestamps: true,
    paranoid: false,
    underscored: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  
  service.associate = models => {
    service.belongsToMany(models.order, { through: 'order_services', foreignKey: 'service_id' });
  };

  return service;
};
