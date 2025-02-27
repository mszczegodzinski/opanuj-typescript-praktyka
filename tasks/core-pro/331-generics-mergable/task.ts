// Zaimplementuj typ MergeableObject z wykorzystaniem typów wbudowanych - Exclude i NonNullable.
type Primitive = string | number | boolean | symbol | null | undefined;
type NonObject = Primitive | Function | any[];

type MergeableObject<T> = T extends NonObject
  ? never
  : { [K in keyof T]: NonNullable<Exclude<T[K], undefined>> };

export function mergeObjects<T, U>(obj1: MergeableObject<T>, obj2: MergeableObject<U>): T & U {
  const merged = { ...obj1, ...obj2 };
  console.log(merged);
  return merged;
}
