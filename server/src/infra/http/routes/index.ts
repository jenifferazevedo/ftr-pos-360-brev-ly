import { FastifyInstance } from 'fastify';
import { healthCheck } from './health-check';
import { getLinksRoute } from './get-links';
import { createLinkRoute } from './create-link';
import { accessLinkRoute } from './access-link';
import { deleteLinkRoute } from './delete-link';
import { exportLinksCSVRoute } from './export-links-csv';

export default async function apiRoutes(server: FastifyInstance) {
    server.register(healthCheck);
    server.register(getLinksRoute);
    server.register(createLinkRoute);
    server.register(accessLinkRoute);
    server.register(deleteLinkRoute);
    server.register(exportLinksCSVRoute);
}
