import { createLink } from '@/app/functions/create-link'
import { isRight, unwrapEither } from '@/infra/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/links',
    {
      schema: {
        summary: 'Create a short link',
        tags: ['links'],
        consumes: ['json'],
        body: z.object({
          link: z.string(),
          shortLink: z.string(),
        }),
        response: {
          201: z.null().describe('Link created successfully.'),
          400: z
            .object({ message: z.string() })
            .describe('Invalid shortLink format.'),
          409: z
            .object({ message: z.string() })
            .describe('ShortLink already exists.'),
        },
      },
    },
    async (request, reply) => {
      const body = await request.body

      if (!body) {
        return reply.status(400).send({ message: 'Link information required' })
      }

      const result = await createLink({
        link: body.link,
        shortLink: body.shortLink,
      })

      if (isRight(result)) {
        return reply.status(201).send()
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'InvalidShortLinkFormat':
          return reply.status(400).send({ message: error.message })
        case 'ShortLinkAlreadyExists':
          return reply.status(409).send({ message: error.message })
      }
    }
  )
}
