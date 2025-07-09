import { randomUUID } from 'node:crypto'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isLeft, isRight } from '@/infra/shared/either'
import { eq } from 'drizzle-orm'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { createLink } from './create-link'

// Create a const that will be global to this test and change all the time that this test run
let testLink: string

describe('create link', () => {
  beforeAll(() => {
    vi.mock('@/infra/storage/upload-link-to-storage', () => {
      return {
        uploadLinkToStorage: vi.fn().mockImplementation(() => {
          return {
            key: `${randomUUID()}-test-link`,
          }
        }),
      }
    })
  })

  it('should be able to create a link', async () => {
    const shortLink = `${randomUUID()}-create-test-link`
    const link = 'https://example.com/image.jpg'

    const sut = await createLink({
      link,
      shortLink,
    })

    expect(isRight(sut)).toBe(true)

    const result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortLink, shortLink))

    expect(result).toHaveLength(1)
  })

  it('should not be able create an link with invalid shortLink', async () => {
    const shortLink = 'HAU123jjkas'
    const link = 'https://example.com/image.jpg'

    const sut = await createLink({
      link,
      shortLink,
    })

    expect(isLeft(sut)).toBe(true)
  })

  it('should not be able create an link with an already existent shortLink', async () => {
    const shortLink = `${randomUUID()}-create-test-2-link`
    const link = 'https://example.com/image.jpg'

    await createLink({
      link,
      shortLink,
    })

    const repeatedlink = await createLink({
      link,
      shortLink,
    })

    expect(isLeft(repeatedlink)).toBe(true)
  })
})
