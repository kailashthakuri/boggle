export interface Action<S extends string, T> {
  type: S;
  payload: T;
}

// export class AppActionFactory<S extends string, T> {
//   constructor(public readonly type: S) {}
//   public createNew(payload: T): Action<S, T> {
//     return { type: this.type, payload: payload };
//   }
// }
