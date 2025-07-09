import { accessLink } from '@/app/functions/access-link'
import { deleteLink } from '@/app/functions/delete-link'
import { isRight, unwrapEither } from '@/infra/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/links/:shortLink',
    {
      schema: {
        summary: 'Access link by shortLink and update access quantity',
        tags: ['links'],
        params: z.object({
          shortLink: z.string(),
        }),
        response: {
          204: z.null().describe('Link deleted successfully.'),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { shortLink } = request.params as { shortLink: string }
      const result = await deleteLink({ shortLink })

      if (isRight(result)) {
        return reply.status(204).send()
      }

      const error = unwrapEither(result)

      switch (error.constructor.name) {
        case 'NotFoundLink':
          return reply.status(404).send({ message: error.message })
      }
    }
  )
}
