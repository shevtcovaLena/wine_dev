/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tours",
      [
        {
          title: "Инкерманский завод марочных вин",
          description:
            "Уникальная природа Севастополя, Инкерманская бухта, горы и равнины. Винные подвалы глубиной до 30 метров, традиции крымского виноделия.\n\r Инкерманский завод марочных вин был создан в 1961 году на базе подземных выработок строительного камня – мшанкового известняка, использовавшегося для послевоенного восстановления и строительства города Севастополя. \n\r Построен в Севастопольской зоне виноделия, расположенной на юго-западном побережье полуострова Крым. По средним климатическим и почвенным показателям она полностью повторяет знаменитый французский терруар - провинцию Бордо (Франция), известную старинными винодельческими традициями. \n\r Экскурсия по подземным винным галереям. Рассказ об истории Инкерманского завода марочных вин, технологии производства вин.Дегустация тихих вин INKERMAN (подаются 8 образцов тихих вин).",
          owner_id: 2,
          region: "Крым",
          price: 7500,
          location_x: "44.615381",
          location_y: "33.611351",
          status: "allowed",
          length_days: 3,
          path_img: "TourMain1713183604922.jpg",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tour_dates",
      [
        {
          tour_id: 2,
          date: "27-03-2024",
          date_end: "30-03-2024",
          quantity_seats: 20,
        },
        {
          tour_id: 2,
          date: "01-04-2024",
          date_end: "04-04-2024",
          quantity_seats: 20,
        },
        {
          tour_id: 2,
          date: "11-05-2024",
          date_end: "13-05-2024",
          quantity_seats: 20,
        },
        {
          tour_id: 2,
          date: "15-05-2024",
          date_end: "18-05-2024",
          quantity_seats: 18,
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
