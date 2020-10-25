/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const auction = sequelize.define(
    "auction",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id",
      },
      auctionId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "auction_id",
      },
      bidderId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "bidder_id",
      },
      bidAmmount: {
        type: DataTypes.FLOAT(11),
        allowNull: false,
        defaultValue: 0,
        field: "bid_ammount",
      },
      responseTime: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 0,
        field: "response_time",
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
      tableName: "auction",
      timestamps: true,
    }
  );

  return auction;
};
