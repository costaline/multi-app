import path from 'path';

module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_DB', 'strapi'),
      user: env('DATABASE_USER', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      // schema: env('DATABASE_SCHEMA', 'public'), // Not required
      // ssl: {
      //   rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For self-signed certificates
      // },
    },
    debug: false,
  },
});
