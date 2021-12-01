module.exports = {
  apps : [{
    name: 'call-me',
    script: 'app.js',
    log_file: "./lib/log/pm2_log/combined.outerr.log",
    // out_file: "./lib/log/pm2_log/out.log",
    error_file: "./lib/log/pm2_log/err.log",
    //  The -i or instances option can be:

    // 0/max to spread the app across all CPUs
    // -1 to spread the app across all CPUs - 1
    // number to spread the app across number CPUs
    exec_mode: "cluster",
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    // args: 'one two',
    instances: 1,
    autorestart: true,
    watch: true,
    ignore_watch: ["node_modules", "lib", "logs", "resources", "upload"],
    // cron_restart: '1 8 * * *',
    // max_memory_restart: '500M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
