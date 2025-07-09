import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/infra/shared/either'
import { ilike } from 'drizzle-orm'
import { z } from 'zod'
import { NotFoundLink } from './errors/not-found-link'

const deleteLinkInput = z.object({
  shortLink: z.string(),
})

type DeleteLinkInput = z.input<typeof deleteLinkInput>

export async function deleteLink(
  input: DeleteLinkInput
): Promise<Either<NotFoundLink, boolean>> {
  const { shortLink } = deleteLinkInput.parse(input)

  const [deletedLink] = await db
    .delete(schema.links)
    .where(ilike(schema.links.shortLink, `%${shortLink}%`))
    .returning()

  if (!deletedLink) {
    return makeLeft(new NotFoundLink())
  }

  return makeRight(true)
}
