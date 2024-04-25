/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tours",
      [
        {
          title: "Винодельня Иронсан",
          description:
            "Южная Осетия — маленькая республика с большой историей. История ее столицы насчитывает уже без малого тысячу лет: Цхинвал находился на торговом пути, связывавшем Кавказ и Турцию. Со временем он стал многонациональным торговым городом. Сейчас здесь живет чуть больше 30 тысяч человек, весь город несложно обойти пешком — и местные всегда с удовольствием покажут свой город и расскажут об историческом и культурном наследии региона.\n\nПредки нынешних осетин, аланы, любили и ценили вино, сами выращивали лозы и приготовляли напитки. В отличие от древних греков они пили вино, не разбавляя. Сегодня старые традиции переняла винодельня «Иронсан». Виноградники находятся на Присском склоне — этот терруар придает винам и коньякам особый колорит. В планах у компании — расширение ассортимента в пользу десертных вин.",
          owner_id: 2,
          region: "Кавказ",
          price: "9500",
          location_x: 42.23036955324545,
          location_y: 43.982042654408524,
          status: "allowed",
          length_days: 3,
          path_img: "TourMain1713186762421.png",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tour_dates",
      [
        {
          tour_id: 11,
          date: "2024-04-01",
          date_end: "2024-04-04",
          quantity_seats: 18,
        },
        {
          tour_id: 11,
          date: "2024-04-05",
          date_end: "2024-04-08",
          quantity_seats: 18,
        },
        {
          tour_id: 11,
          date: "2024-04-12",
          date_end: "2024-04-15",
          quantity_seats: 18,
        },
        {
          tour_id: 11,
          date: "2024-04-14",
          date_end: "2024-04-17",
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
