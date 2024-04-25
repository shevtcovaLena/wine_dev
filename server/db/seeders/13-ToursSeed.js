/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tours",
      [
        {
          title: "Винодельня Колесников",
          description:
            "Одно из немногих винодельческих хозяйств Ставропольского края, находящееся севернее Ставрополя. \nВинодельческое хозяйство: 8 ГА виноградников европейских сортов, винодельня построена в комплиментарном туристическом стиле собственная агротехника, \n\nбочковой парк, производственные мощности 20 000 бут., собственная сыроварня и ресторан.\n\nВ посадках середины 10-х следующие сорта: каберне совиньон, каберне фран, саперави будешурисебури, пино нуар, сира, шардоне, вионье, мускат оттонель, пино блан. ",
          owner_id: 3,
          region: "Ставрополье",
          price: "50000",
          location_x: 45.18036688182476,
          location_y: 42.2217066333507,
          status: "allowed",
          length_days: 3,
          path_img: "TourMain1713187342767.jfif",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tour_dates",
      [
        {
          tour_id: 12,
          date: "2024-04-01",
          date_end: "2024-04-04",
          quantity_seats: 10,
        },
        {
          tour_id: 12,
          date: "2024-04-17",
          date_end: "2024-04-20",
          quantity_seats: 10,
        },
        {
          tour_id: 12,
          date: "2024-05-08",
          date_end: "2024-05-11",
          quantity_seats: 10,
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
