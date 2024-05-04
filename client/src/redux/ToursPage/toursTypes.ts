interface ITour {
    id: number,
    title: string,
    description: string,
    owner_id: number,
    region: string,
    price: number,
    location_x: string,
    location_y: string,
    status: "new" | "allowed" | "canceled",
    length_days: number,
    path_img: string
  }

export const initialTour: ITour = {
  id: 0,
  title: '',
  description: '',
  owner_id: 0,
  region: '',
  price: 0,
  location_x: '',
  location_y: '',
  status: 'new',
  length_days: 0,
  path_img: '',
}
  
  type ToursType = Array<ITour>;
  
  export type { ITour, ToursType }