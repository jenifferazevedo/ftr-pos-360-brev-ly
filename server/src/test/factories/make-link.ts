import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { fakerPT_BR as faker } from '@faker-js/faker'
import type { InferInsertModel } from 'drizzle-orm'

export async function makeLink(
  overrides?: Partial<InferInsertModel<typeof schema.links>>
) {
  const link = faker.internet.url()
  const shortLink = faker.system
    .fileName()
    .replace(/[^a-zA-Z0-9]/g, '')
    .toLocaleLowerCase()
  const result = await db
    .insert(schema.links)
    .values({
      link,
      shortLink,
      accessQuantity: 0,
      ...overrides,
    })
    .returning()

  return result[0]
}
