import {z} from 'zod';

export const emptyStringToNullByDefault = () => z.preprocess(
  (val) => val === '' ? null : val,
  z.string().nullable()
).default(null)

export const safeNumberOrNullInput = () => z.preprocess(
  val => val === '' ? null : Number(val),
  z.coerce.number().or(z.string()).nullable()
).default(null)

export const stringOrNullByDefault = () => z.string().nullable().default(null)
