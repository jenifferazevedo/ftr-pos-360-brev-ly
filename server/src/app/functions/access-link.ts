import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { ilike, sql } from 'drizzle-orm'
import { z } from 'zod'
import { NotFoundLink } from './errors/not-found-link'

const accessLinkInput = z.object({
  shortLink: z.string(),
})

type AccessLinkInput = z.input<typeof accessLinkInput>

type AccessLinkOutput = {
  id: string
  link: string
  shortLink: string
  accessQuantity: number
  createdAt: Date
}

export async function accessLink(
  input: AccessLinkInput
): Promise<Either<NotFoundLink, AccessLinkOutput>> {
  const { shortLink } = accessLinkInput.parse(input)

  const [link] = await db
    .update(schema.links)
    .set({ accessQuantity: sql`${schema.links.accessQuantity} + 1` })
    .where(ilike(schema.links.shortLink, `%${shortLink}%`))
    .returning({
      id: schema.links.id,
      link: schema.links.link,
      shortLink: schema.links.shortLink,
      accessQuantity: schema.links.accessQuantity,
      createdAt: schema.links.createdAt,
    })

  if (!link) {
    return makeLeft(new NotFoundLink())
  }

  return makeRight(link)
}
