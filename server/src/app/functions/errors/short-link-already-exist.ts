export class ShortLinkAlreadyExists extends Error {
  constructor() {
    super('The used shortLink already exists. Please choose a different one.')
  }
}
