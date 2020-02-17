const CatboxMemory = require('@hapi/catbox-memory');
/**
 * Hapi server config
 */
export const serverConfig = {
  port: 3333,
  cache: [
    {
      name: 'my_cache',
      provider: {
        constructor: CatboxMemory
      }
    }
  ],
  host: 'localhost',
  routes: {
    cors: true
  }
};
