interface ITour {
    id: number,
    title: string,
    description: string,
    owner_id: number,
    region: string,
    price: number,
    location_x: string,
    location_y: string,
    status: string,
    length_days: number,
    path_img: string
  }
  
  type ToursType = Array<ITour>;
  
  export type { ITour, ToursType }