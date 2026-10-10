const mineflayer = require('mineflayer');
const http = require('http');

// وب‌سرور برای زنده ماندن روی Render
http.createServer((req, res) => {
  res.write("Toxic_Bot is Online 24/7!");
  res.end();
}).listen(process.env.PORT || 3000);

function startBot() {
  const bot = mineflayer.createBot({
    host: '5.9.41.143',
    port: 29449,
    username: 'Toxic_Bot',
    version: false
  });

  bot.on('login', () => {
    console.log('🔥 Toxic_Bot وارد سرور شد، ارسال دستورات لاگین...');
    
    // ارسال دستور رجیستر و لاگین خودکار
    setTimeout(() => {
      try {
        bot.chat('/register 123456 123456');
      } catch (e) {}
    }, 1500);

    setTimeout(() => {
      try {
        bot.chat('/login 123456');
        console.log('🔑 دستورات لاگین ارسال شد!');
      } catch (e) {}
    }, 2500);
  });

  bot.on('spawn', () => {
    // پرش نرم هر ۶۰ ثانیه برای جلوگیری از کیک AFK
    setInterval(() => {
      try {
        if (bot && bot.entity) {
          bot.setControlState('jump', true);
          setTimeout(() => bot.setControlState('jump', false), 400);
        }
      } catch (e) {}
    }, 60000);
  });

  // اتو ریسپاون خودکار در صورت کشته شدن
  bot.on('death', () => {
    console.log('⚠️ بات کشته شد! ۱ ثانیه دیگر ریسپاون می‌شود...');
    setTimeout(() => {
      try {
        bot.respawn();
        console.log('✅ Toxic_Bot فوراً ریسپاون شد!');
      } catch (err) {
        console.log('خطا در ریسپاون: ', err.message);
      }
    }, 1000);
  });

  // اتصال مجدد در صورت ری‌استارت سرور
  bot.on('end', () => {
    console.log('اتصال قطع شد، ۱۰ ثانیه دیگر تلاش مجدد...');
    setTimeout(startBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('خطا: ', err.message);
  });
}

startBot();
