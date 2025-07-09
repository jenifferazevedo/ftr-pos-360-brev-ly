import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const links = pgTable('links', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  link: text('link').notNull(),
  shortLink: text('short_link').notNull().unique(),
  accessQuantity: integer('access_quantity').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
