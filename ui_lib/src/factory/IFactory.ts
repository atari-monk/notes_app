export default interface IFactory<T> {
  getNewInstance(): T
}
