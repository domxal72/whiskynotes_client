import {z} from 'zod'
import {safeNumberOrNullInput} from '../utils/zod'

export type TProduct = {
  id: number
  name: string
  description?: string
  ABV?: number
  vol?: number
  distillery_id?: number
  distillery_name?: string
  is_peated?: boolean
  image_url?: string
  price?: number
  stated_age?: number | 'NAS'
  status: TProductStatus
  rating: number
}

export type TProductStatus = 'in collection' | 'tasted' | 'wish' | 'none'

// Zod validation example
export const productSchema = z.object({
  name: z.string().min(1, {message: 'zadejte nazev'}),
  description: z.string().nullable().default(null),
  ABV: safeNumberOrNullInput(),
  distilleryId: safeNumberOrNullInput(),
  distilleryName: z.string().optional(),
  vol: safeNumberOrNullInput(),
  isPeated: z.boolean().optional(),
  imgFile: z.union([z.string(), z.null()]).optional(),
  price: safeNumberOrNullInput(),
  age: safeNumberOrNullInput(),
  status: z.union([z.literal('in collection'), z.literal('tasted'), z.literal('wish'), z.literal('none')]),
  rating: safeNumberOrNullInput(),
})
