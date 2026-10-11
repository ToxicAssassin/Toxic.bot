const mineflayer = require('mineflayer');
const http = require('http');

// وب‌سرور برای زنده ماندن در Render
http.createServer((req, res) => {
  res.write("Toxic_Pro is Mining and Jumping 24/7!");
  res.end();
}).listen(process.env.PORT || 3000);

function startBot() {
  const bot = mineflayer.createBot({
    host: '5.9.41.143',
    port: 29449,
    username: 'Toxic_Pro',
    version: false
  });

  // ثبت‌نام و لاگین خودکار
  bot.on('login', () => {
    console.log('🔥 Toxic_Pro وارد سرور شد، ارسال دستورات لاگین...');
    setTimeout(() => {
      try { bot.chat('/register 123456 123456'); } catch (e) {}
    }, 1500);
    setTimeout(() => {
      try { bot.chat('/login 123456'); } catch (e) {}
    }, 2500);
  });

  bot.on('spawn', () => {
    console.log('✅ بات اسپاون شد و فعالیت‌ها فعال شدند.');

    // ۱. سیستم پرش و راه رفتن تصادفی (هر ۲۰ ثانیه)
    setInterval(() => {
      try {
        if (!bot || !bot.entity) return;

        // جهت نگاه تصادفی
        const randomYaw = Math.random() * Math.PI * 2;
        bot.look(randomYaw, 0);

        // راه رفتن به جلو و پریدن
        bot.setControlState('forward', true);
        bot.setControlState('jump', true);

        // متوقف شدن بعد از ۱.۵ ثانیه راه رفتن
        setTimeout(() => {
          bot.setControlState('forward', false);
          bot.setControlState('jump', false);
        }, 1500);
      } catch (err) {}
    }, 20000);

    // ۲. سیستم کندن بلاک‌های اطراف (مثل Stone و Dirt) هر ۱۵ ثانیه
    setInterval(() => {
      try {
        if (!bot || !bot.entity) return;

        // جستجو برای بلاک‌های معمولی
        const targetBlock = bot.findBlock({
          matching: (block) => {
            if (!block) return false;
            const name = block.name;
            return name === 'stone' || name === 'cobblestone' || name === 'dirt' || name === 'grass_block' || name === 'deepslate';
          },
          maxDistance: 4
        });

        if (targetBlock && bot.canDigBlock(targetBlock)) {
          // نگاه کردن به سمت بلاک و کندن آن
          bot.lookAt(targetBlock.position.offset(0.5, 0.5, 0.5)).then(() => {
            bot.dig(targetBlock).catch(() => {});
          }).catch(() => {});
        }
      } catch (err) {}
    }, 15000);
  });

  // زنده شدن مجدد بعد از مرگ
  bot.on('death', () => {
    console.log('💀 بات کشته شد، در حال زنده شدن مجدد...');
    setTimeout(() => {
      try { bot.respawn(); } catch (err) {}
    }, 1200);
  });

  // وصل شدن دوباره در صورت قطعی
  bot.on('end', () => {
    console.log('⚠️ ارتباط قطع شد. تلاش مجدد تا ۱۰ ثانیه دیگر...');
    setTimeout(startBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('خطا:', err.message);
  });
}

startBot();
