/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const ratings = [];
    
    // Функция для получения случайного рейтинга между минимальным и максимальным значением
    const randomRating = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    // Два пользователя: user_id 1 и 4
    const userIds = [1, 4];
    
    // Всего 15 tour_id
    for (let tourId = 1; tourId <= 14; tourId++) {
      userIds.forEach(userId => {
        ratings.push({
          user_id: userId,
          tour_id: tourId,
          rate: randomRating(4, 5),
        });
      });
    }

    await queryInterface.bulkInsert('Ratings', ratings, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Ratings", null, {});
  },
};
