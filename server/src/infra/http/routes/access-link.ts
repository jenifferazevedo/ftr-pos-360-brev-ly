import { accessLink } from '@/app/functions/access-link'
import { isRight, unwrapEither } from '@/infra/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const accessLinkRoute: FastifyPluginAsyncZod = async server => {
  server.patch(
    '/links/:shortLink',
    {
      schema: {
        summary: 'Access link by shortLink and update access quantity',
        tags: ['links'],
        params: z.object({
          shortLink: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            link: z.string(),
            shortLink: z.string(),
            accessQuantity: z.number(),
            createdAt: z.date(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortLink } = request.params as { shortLink: string }
      const result = await accessLink({ shortLink })

      if (isRight(result)) {
        return reply.status(200).send(unwrapEither(result))
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'NotFoundLink':
          return reply.status(404).send({ message: error.message })
      }
    }
  )
}
