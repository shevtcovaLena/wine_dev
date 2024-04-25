const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "admin@wine.com",
          full_name: "Администратор",
          role: "admin",
          avatar: "lena.jpg",
          telephone: "",
          password: await bcrypt.hash("Qawsed123", 10),
        },
        {
          email: "organizer@wine.com",
          full_name: "Elbrus",
          role: "organizer",
          avatar: "",
          telephone: "79997778855",
          password: await bcrypt.hash("Qawsed123", 10),
        },
        {
          email: "organizer2@wine.com",
          full_name: "Рога и Копыта",
          role: "organizer",
          avatar: "vitalya.jpg",
          telephone: "79997778855",
          password: await bcrypt.hash("Qawsed123", 10),
        },
        {
          email: "traveler@wine.com",
          full_name: "Ольга Землянская",
          role: "traveler",
          avatar: "Olga.jpg",
          telephone: "79997778855",
          password: await bcrypt.hash("Qawsed123", 10),
        },
        {
          email: "traveler_2@wine.com",
          full_name: "",
          role: "traveler",
          avatar: "",
          telephone: "79997778855",
          password: await bcrypt.hash("Qawsed123", 10),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
