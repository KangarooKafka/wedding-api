import { RouterContext } from 'koa-router'
import pinoLogger from '../../logger/logger'

// Logger
const logger = pinoLogger();

/**
 * Controller for admin endpoints and logic
 */
class AdminController {
    /**
     * Confirms if the server is running
     * @param ctx The router context
     * @param next The next client request.
     * @returns {Promise<void>}
     */
    async healthCheck(ctx, next) {
        try {
            // Set response
            ctx.body = { serverResp: 'running' };
            ctx.status = 200;

            // Log response
            logger.info(`Body: Server running\nStatus: ${ctx.status}`);

            await next();
        } catch (e) {
            // Set response
            ctx.body = {message : e.message};
            ctx.status = 500;

            // Log response
            logger.info(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }
}

export default new AdminController();