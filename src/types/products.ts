export interface IProducts {
  id: number
  name: string
  description?: string
  vol?: number
  distillery_id?: number
  distillery_name?: string
  is_peated?: boolean
  image_url?: string
  price?: string
  stated_age: number | 'NAS'
}
