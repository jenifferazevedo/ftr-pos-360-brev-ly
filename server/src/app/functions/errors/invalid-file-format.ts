export class InvalidShortLinkFormat extends Error {
  constructor() {
    super(
      'Invalid shortLink. It must be all lowercase letters, numbers, or hyphens, with no spaces or special characters.'
    )
  }
}
