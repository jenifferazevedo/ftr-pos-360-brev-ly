import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { InvalidShortLinkFormat } from './errors/invalid-file-format'
import { ShortLinkAlreadyExists } from './errors/short-link-already-exist'

const createLinkInput = z.object({
  link: z.string(),
  shortLink: z.string(),
})

type CreateLinkInput = z.input<typeof createLinkInput>

const shortLinkRegex = /^[a-z0-9-]+$/
export async function createLink(
  input: CreateLinkInput
): Promise<
  Either<InvalidShortLinkFormat | ShortLinkAlreadyExists, { shortLink: string }>
> {
  const { link, shortLink } = createLinkInput.parse(input)

  if (!shortLinkRegex.test(shortLink)) {
    return makeLeft(new InvalidShortLinkFormat())
  }

  const existingLink = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.shortLink, shortLink))
    .limit(1)

  if (existingLink.length > 0) {
    return makeLeft(new ShortLinkAlreadyExists())
  }

  await db.insert(schema.links).values({
    link,
    shortLink,
    accessQuantity: 0,
  })

  return makeRight({ shortLink })
}
