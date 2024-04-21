export default interface IGenerateComponent<TIn, TOut> {
  generate(data: TIn): TOut
}
