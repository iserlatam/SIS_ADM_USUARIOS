module.exports = {
  apps: [
    {
      name: 'PCC',
      script: 'npm babel-node index.js',
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
      exec_mode: 'fork',
      instances: 'max',
      autorestart: true,
      max_restarts: 10,
      error_file: 'logs/pm2-error.log',
      out_file: 'logs/pm2-out.log',
      log_file: 'logs/pm2-combined.log',
      time: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
