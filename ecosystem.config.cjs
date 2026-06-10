/** PM2 config for Bonjour API. Run: pm2 start ecosystem.config.cjs */
module.exports = {
  apps: [
    {
      name: "bonjour-api",
      script: "npx",
      args: ["tsx", "scripts/serve-api.ts"],
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        API_PORT: "3002",
      },
      autorestart: true,
      max_restarts: 10,
    },
  ],
};
