import { randomUUID } from 'node:crypto'
import { isRight, unwrapEither } from '@/infra/shared/either'
import { makeLink } from '@/test/factories/make-link'
import { describe, expect, it } from 'vitest'
import { getLinks } from './get-links'

describe('get links', () => {
  it('should be able to get the links', async () => {
    const testRunId = randomUUID()
    const link1 = await makeLink({ shortLink: `test-${testRunId}-1` })
    const link2 = await makeLink({ shortLink: `test-${testRunId}-2` })
    const link3 = await makeLink({ shortLink: `test-${testRunId}-3` })

    const sut = await getLinks()
    const links = unwrapEither(sut).links
    const testLinks = links.filter(link =>
      link.shortLink.startsWith(`test-${testRunId}-`)
    )

    expect(isRight(sut)).toBe(true)
    expect(testLinks).toHaveLength(3)
    expect(links).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ shortLink: link1.shortLink }),
        expect.objectContaining({ shortLink: link2.shortLink }),
        expect.objectContaining({ shortLink: link3.shortLink }),
      ])
    )
  })
})
