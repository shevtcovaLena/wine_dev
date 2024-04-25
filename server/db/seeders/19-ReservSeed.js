/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Reservation_tours",
      [
        {
          user_id: 4,
          tour_date_id: 15,
          date: "2024-04-01",
          date_end: "2024-04-03",
        },
        {
          user_id: 4,
          tour_date_id: 36,
          date: "2024-03-01",
          date_end: "2024-03-03",
        },
        {
          user_id: 4,
          tour_date_id: 9,
          date: "2024-05-01",
          date_end: "2024-05-03",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reservation_tours", null, {});
  },
};
