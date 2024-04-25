/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tours",
      [
        {
          title: "Винодельня Жаков",
          description:
            "Виноградники «Жаков» расположены в селе Фрунзе Сакского района Крыма. Первые лозы — Саперави и столовые сорта — были высажены в 2003 году, когда Владимир Жаков переехал на полуостров из Беларуси.\n\nЭкспериментировать и создавать собственные вина Жаковы начали в 2010 году; с 2017 года винодельней руководит сын Владимира — Егор. В 2021 году компания получила лицензию КФХ на производство вин — на тот момент третью в Крыму. Тогда же были выпущены вина из первого собственного урожая.\n\nОсновная концепция винодельни — сохранение многолетних традиций, классический подход к работе с виноградом и эксперименты с новыми сортами и стилями вин.\n\n«Жаков» не стремятся к крупным релизам, всегда делая акцент на качестве и контроле каждой бутылки. Именно поэтому на этикетке указана фамилия — символ ответственности за высокое качество вин.",
          owner_id: 2,
          region: "Крым",
          price: "55000",
          location_x: 45.29315651494245,
          location_y: 34.27866452829834,
          status: "allowed",
          length_days: 3,
          path_img: "TourMain1713184293079.webp",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tour_dates",
      [
        {
          tour_id: 3,
          date: "2024-05-01",
          date_end: "2024-05-04",
          quantity_seats: 15,
        },
        {
          tour_id: 3,
          date: "2024-05-05",
          date_end: "2024-05-08",
          quantity_seats: 15,
        },
        {
          tour_id: 3,
          date: "2024-05-09",
          date_end: "2024-05-12",
          quantity_seats: 15,
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
