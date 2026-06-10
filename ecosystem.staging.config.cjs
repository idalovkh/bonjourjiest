/** PM2 config for Bonjour staging API. Run: pm2 start ecosystem.staging.config.cjs */
module.exports = {
  apps: [
    {
      name: "bonjour-api-staging",
      script: "npx",
      args: ["tsx", "scripts/serve-api.ts"],
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        API_PORT: "3003",
      },
      autorestart: true,
      max_restarts: 10,
    },
  ],
};
