/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tours",
      [
        {
          title: "Винодельня Nesterov Winery",
          description:
            "«Виннотеррия» — название, выросшее из расположения туристического комплекса, дословно обозначающее «земля вина». Основателем стал потомственный авиатор Валерий Нестеров — дальние пути однажды привели его в Грузию, где он проникся идеей о создании собственной винодельни. С романтической точки зрения, именно страсть к путешествиям сыграла главную роль при выборе места для будущего винного оазиса: он находится на пересечении кубанских винных дорог.\n\nNesterov Winery располагает собственными виноградниками, где выращивает, помимо традиционного немецкого Рислинга и грузинского Саперави, непривычные для России сорта — например, Виорику и Солярис. Здесь же можно найти и автохтонные сорта: Рубин Голодриги и Красностоп Золотовский. После аккуратного сбора виноград отправляется на производство, проходит обработку, затем его выдерживают в бочках — и после этого вино попадает на стол. А продегустировать его можно прямо здесь же, в «Виннотеррии».",
          owner_id: 2,
          region: "Краснодарский край",
          price: "30000",
          location_x: 45.122336817189826,
          location_y: 38.64318746290485,
          status: "allowed",
          length_days: 3,
          path_img: "TourMain1713185701578.webp",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Tour_dates",
      [
        {
          tour_id: 8,
          date: "2024-04-18",
          date_end: "2024-04-21",
          quantity_seats: 20,
        },
        {
          tour_id: 8,
          date: "2024-04-26",
          date_end: "2024-04-29",
          quantity_seats: 20,
        },
        {
          tour_id: 8,
          date: "2024-05-10",
          date_end: "2024-05-13",
          quantity_seats: 20,
        },
        {
          tour_id: 8,
          date: "2024-05-17",
          date_end: "2024-05-20",
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
