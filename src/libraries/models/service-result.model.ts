export default interface ServiceResultModel<T> {
  data: T | null;
  error: Error | null;
}
