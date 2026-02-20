/** PM2 config for API (lead form). Run: pm2 start ecosystem.config.cjs */
module.exports = {
  apps: [
    {
      name: "deshar-api",
      script: "npx",
      args: ["tsx", "scripts/serve-api.ts"],
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        API_PORT: "3001",
      },
      autorestart: true,
      max_restarts: 10,
    },
  ],
};
