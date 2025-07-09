import { isLeft, isRight, unwrapEither } from '@/infra/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { describe, expect, it } from 'vitest'
import { accessLink } from './access-link'
import { deleteLink } from './delete-link'

describe('delete link', () => {
  it('should be delete link', async () => {
    const link1 = await makeLink()
    const link2 = await makeLink()
    const link3 = await makeLink()

    const sut = await deleteLink({ shortLink: link1.shortLink })

    expect(isRight(sut)).toBe(true)
  })

  it('should not be able to delete a non-existent link', async () => {
    const link1 = await makeLink()

    const sut = await deleteLink({ shortLink: 'jjjj' })

    expect(isLeft(sut)).toBe(true)
  })
})
