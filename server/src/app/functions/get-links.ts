import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/infra/shared/either'
import { count, desc } from 'drizzle-orm'

type GetLinksOutput = {
  links: {
    id: string
    link: string
    shortLink: string
    accessQuantity: number
    createdAt: Date
  }[]
  total: number
}

export async function getLinks(): Promise<Either<never, GetLinksOutput>> {
  const [links, [{ total }]] = await Promise.all([
    db
      .select({
        id: schema.links.id,
        link: schema.links.link,
        shortLink: schema.links.shortLink,
        accessQuantity: schema.links.accessQuantity,
        createdAt: schema.links.createdAt,
      })
      .from(schema.links)
      .orderBy(fields => desc(fields.id)),
    db.select({ total: count(schema.links.id) }).from(schema.links),
  ])

  return makeRight({ links, total })
}
