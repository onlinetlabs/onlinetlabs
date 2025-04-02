type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${CamelToSnakeCase<U>}`
  : S;

type CustomResponse<T> = {
  [K in keyof T as CamelToSnakeCase<string & K>]: T[K];
};