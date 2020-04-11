'use strict';
module.exports = (sequelize, DataTypes) => {
  const Seats = sequelize.define('Seats', {
    isReserved: DataTypes.BOOLEAN
  }, {});
  Seats.associate = function(models) {
    // associations can be defined here
  };
  return Seats;
};