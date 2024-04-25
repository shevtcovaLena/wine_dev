/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tours",
      [
        {
          title: "Винодельня Массандра",
          description: `«Массандра» — один из главных винодельческих символов Крыма, крупнейшее винное хозяйство полуострова с богатейшей историей, начатой ещё в XIX веке светлейшими князьями Воронцовыми. Здесь создают столовые, десертные и крепленые вина, которые неизменно производят фурор на всевозможных конкурсах — в том числе, международных.

            Первые поселения на месте нынешней Массандры появились еще в античности. Здесь находилась, в частности, греческая церковь, которую расположили рядом с источником Святого Иоанна. В конце XVIII века, после выхода христиан из Крыма, храм был разрушен, но место по-прежнему оставалось сакральным.
            
            После того, как в 1873 году Крым стал частью Российской империи, земли на южном берегу полуострова начали раздавать знати. Спустя некоторое время в Массандре стали развивать виноделие: этим вопросом занимались отец и сын Воронцовы, и уже тогда вина с увенчанными российским гербом этикетками стали знаком качества. Князь Голицын, в 1892 году ставший главным виноделом Удельных имений Крыма и Кавказа, заложил в Массандре подвал для выдержки десертных, крепких и столовых вин. Это грандиозное погребное хозяйство — семь тоннелей длиной по 150 метров каждый, уходящие на 50-метровую глубину — стало одним из лучших в мире. Кроме того, под землей Голицын расположил и девять галерей, в которых одновременно могло уместиться до миллиона бутылок. Через несколько лет подвалы не просто открыли для посещения: для гостей начали проводить дегустации. При Советском Союзе поблизости, в Алупке, построили несколько дегустационных залов — попробовать вина «Массандры» здесь можно и сейчас.
            
            Современная «Массандра» — крупнейшее винное хозяйство Крыма, выпускающее столовые, десертные и крепленые вина. Свои коллекции виноделы не единожды представляли на международных конкурсах, где неизменно производили фурор.`,
          owner_id: 2,
          region: "Крым",
          price: "15000",
          location_x: 45.9,
          location_y: 33.9,
          status: "new",
          length_days: 2,
          path_img: "massandra.jpg",
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
