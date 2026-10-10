const mineflayer = require('mineflayer');
const http = require('http');

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
    console.log('🔥 Toxic_Bot با موفقیت وارد سرور شد و آنلاین است!');
  });

  bot.on('spawn', () => {
    setInterval(() => {
      try {
        if (bot && bot.entity) {
          bot.setControlState('jump', true);
          setTimeout(() => bot.setControlState('jump', false), 400);
        }
      } catch (e) {}
    }, 60000);
  });

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

  bot.on('end', () => {
    console.log('اتصال قطع شد، ۱۰ ثانیه دیگر تلاش مجدد...');
    setTimeout(startBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('خطا: ', err.message);
  });
}

startBot();
