/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tours",
      [
        {
          title: "Пивоварня «Якорь»",
          description: `Мировая тенденция такова: пиво гораздо меньше привязано к месту изготовления, чем вино: чаще всего изготовители работают с импортным хмелем и/или солодом. Создать в этих условиях пиво локальное, по-настоящему отражающее характер его родины — задача непростая. Но команде Ильи Защука это удается.`,
          owner_id: 2,
          region: "Крым",
          price: "15000",
          location_x: 45.9,
          location_y: 33.9,
          status: "new",
          length_days: 2,
          path_img: "a.webp",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tour_dates",
      [
        {
          tour_id: 14,
          date: "2024-04-15",
          date_end: "2024-04-17",
          quantity_seats: 12,
        },
        {
          tour_id: 14,
          date: "2024-04-22",
          date_end: "2024-04-24",
          quantity_seats: 12,
        },
        {
          tour_id: 14,
          date: "2024-04-29",
          date_end: "2024-05-01",
          quantity_seats: 12,
        },
        {
          tour_id: 14,
          date: "2024-05-06",
          date_end: "2024-05-08",
          quantity_seats: 12,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tour_dates", null, {});
    await queryInterface.bulkDelete("Tours", null, {});
  },
};
