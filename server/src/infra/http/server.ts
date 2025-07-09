import { env } from '@/env'
import { transformSwaggerSchema } from '@/infra/http/transform-swagger-schema'
import { fastifyCors } from '@fastify/cors'
import { fastifyMultipart } from '@fastify/multipart'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { getLinksRoute } from './routes/get-links'
import { healthCheck } from './routes/health-check'
import { createLinkRoute } from './routes/create-link'
import { accessLinkRoute } from './routes/access-link'
import { deleteLinkRoute } from './routes/delete-link'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    })
  }
  console.error(error)
  return reply.status(500).send({ message: 'Internal server error.' })
})

server.register(fastifyCors, { origin: '*' })

server.register(fastifyMultipart)
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brev.ly API',
      version: '1.0.0',
    },
  },
  transform: transformSwaggerSchema,
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.register(healthCheck)
server.register(getLinksRoute)
server.register(createLinkRoute)
server.register(accessLinkRoute)
server.register(deleteLinkRoute)

server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP Server running!')
})
