export class NotFoundLink extends Error {
  constructor() {
    super('This link does not exist.')
  }
}
