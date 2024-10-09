export interface IProduct {
  id: number
  name: string
  description?: string
  ABV?: number
  vol?: number
  distillery_id?: number
  distillery_name?: string
  is_peated?: boolean
  image_url?: string
  price?: string
  age?: number | 'NAS'
  status: TProductStatus
  rating: number
}

export type TProductStatus = 'collection' | 'tasted' | 'wish' | 'none'
