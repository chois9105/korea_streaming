module.exports = {
  apps: [
    {
      name: "korea",
      cwd: "/home/tuser/logs/pm2/test_old",
      script: "npm",
      args: "run serve",
      instances: 1,
      exec_mode: "cluster",
      autorestart: true,
      max_memory_restart: "1G",
    },
  ],
};