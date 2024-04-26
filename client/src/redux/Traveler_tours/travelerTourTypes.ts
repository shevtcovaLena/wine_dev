interface ITravelerTour{
    id: number,
    user_id?: number,
    tourDateStart: string,
    tourDateEnd: string,
    tourId: number,
    tourTitle: string,
    tourImg: string,
    tourDateId: number,
    userName: string,
}

type TravelerToursType = Array<ITravelerTour>

export type { ITravelerTour, TravelerToursType}
