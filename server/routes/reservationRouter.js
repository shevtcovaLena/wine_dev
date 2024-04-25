const router = require("express").Router();
const { Reservation_tour } = require("../db/models");

// router.get("/", async (req, res) => {
// //   console.log('Зашли в ручку');
//   try {
//     const allDateByTour = await Tour_date.findAll({ raw: true });
//     res.json(allDateByTour);
//   } catch (error) {
//     console.log(error);
//     res.json({ err: error });
//   }
// });

// router.get("/:id", async (req, res) => {
//   console.log("Зашли в ручку");
//   const { id } = req.params;
//   try {
//     const oneDate = await Tour_date.findOne({ where: { id } });
//     res.json(oneDate);
//   } catch (error) {
//     console.log(error);
//     res.json({ err: error });
//   }
// });

// Создание новой брони

// получаем число броней на конкретную дату
router.get("/date/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allReservsByDate = await Reservation_tour.findAll({
      where: { tour_date_id: id },
    });
    res.json(allReservsByDate.length);
  } catch (error) {
    console.log(error);
    res.json({ err: error });
  }
});

router.post("/", async (req, res) => {
  console.log('зашли в ручку')
  console.log('Мой рек Бади', req.body)
  const {
    id, date, date_end, number,
  } = req.body;
  try {
    const data = [];
    for (let i = 0; i < number; i++) { 
      data.push(
        {
          user_id: req.session.user.id,
          tour_date_id: id,
          date,
          date_end,
        }
      )
    }
    await Reservation_tour.bulkCreate(data);
    res.sendStatus(200);
  } catch (error) {
    console.log("ОШИБКА", error);
  }
});

module.exports = router;
