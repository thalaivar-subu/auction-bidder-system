/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const bidder = sequelize.define(
    "bidder",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      bidderId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "bidder_id",
      },
      bidderUrl: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "bidder_url",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        field: "updated_at",
      },
    },
    {
      tableName: "bidder",
      timestamps: true,
    }
  );

  return bidder;
};
