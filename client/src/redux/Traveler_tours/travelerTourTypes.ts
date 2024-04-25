interface ITravelerTour{
    id: number,
    user_id: number,
    tour_date_id:number,
    // title:string,
    date: Date,
    date_end:Date,
}

type TravelerToursType = Array<ITravelerTour>

export type { ITravelerTour, TravelerToursType}