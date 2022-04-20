export type SetItem<S> = S extends Set<infer I> ? I : never
