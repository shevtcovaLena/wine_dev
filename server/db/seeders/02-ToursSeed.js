/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tours",
      [
        {
          title: "ESSE",
          description:
            'В 2009 году мы пригласили специалистов из Франции для определения состава почв и рекомендаций по посадке. Виноградники ESSE и KACHA VALLEY расположены на высоте около 300 м над уровнем моря. Почвы делювиально-карбонатные. Плотность посадки – 4000 лоз/га. Практикуется ограничение урожайности 6-7 т/га для белых сортов, 4-5 т/га – для красных. Только ручной сбор в пластиковые ящики по 10-12 кг.Вы прогуляетесь по живописным виноградникам с бренд-амбассадором.  Мы используем итальянское оборудование для переработки винограда «Della Toffola». Ферментация вина в емкостях из нержавеющей стали с контролем температур. Оборудование переработки винограда «Pellenс» и розлива вина "Fimer". Для выдержки используется французский дуб, производитель «Radoux» и «Seguin Moreau».Система «Giropallete» с автоматическим ремюажем используется для производства игристых вин классическим способом. Тур составляет 2 дня. На ужине-дегустации мы расскажем о нашей истории и терруаре, послушаем легкую музыку. А на закате свечи и разговоры у костра.',
          owner_id: 2,
          region: "Крым",
          price: 10000,
          location_x: "44.754480",
          location_y: "33.764577",
          status: "allowed",
          length_days: 2,
          path_img: "TourMain1713183468240.jpg",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tour_dates",
      [
        {
          tour_id: 1,
          date: "11-05-2024",
          date_end: "13-05-2024",
          quantity_seats: 20,
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
