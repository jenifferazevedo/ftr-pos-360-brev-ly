import { isLeft, isRight, unwrapEither } from '@/infra/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { describe, expect, it } from 'vitest'
import { accessLink } from './access-link'

describe('access link', () => {
  it('should access link and update the access quantity', async () => {
    const link1 = await makeLink()

    const sut = await accessLink({ shortLink: link1.shortLink })
    link1.accessQuantity += 1

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual(link1)
  })

  it('should not be able to access a non-existent link', async () => {
    const link1 = await makeLink()

    const sut = await accessLink({ shortLink: 'jjjj' })

    expect(isLeft(sut)).toBe(true)
  })
})
