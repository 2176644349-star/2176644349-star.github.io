document.addEventListener('DOMContentLoaded', function() {
    const greeting = document.getElementById('greeting');
    const birthdayMessage = document.getElementById('birthday-message');
    const playMusicBtn = document.getElementById('play-music');
    const birthdaySong = document.getElementById('birthday-song');
    const messageContainer = document.getElementById('message-container');
    const signatureElement = document.querySelector('.signature');
    
    // Get username from localStorage
    const username = localStorage.getItem('birthdayUser') || '朋友';
    
    // Set personalized greeting
    greeting.textContent = `${username}，生日快乐！`;
    birthdayMessage.textContent = `亲爱的${username}，祝你生日快乐，年年有今日，岁岁有今朝！！！`;
    
    // 设置署名
    if (signatureElement) {
        signatureElement.textContent = `——永远祝福你的朋友`;
    }
    
    // 初始隐藏祝福文本
    messageContainer.style.display = 'none';
    
    // 自动播放音乐
    // 注意：许多现代浏览器禁止自动播放音频，除非用户之前与页面有交互
    // 我们尝试自动播放，如果失败，按钮仍然可用
    try {
        const playPromise = birthdaySong.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // 自动播放成功
                playMusicBtn.textContent = '暂停生日快乐歌';
            }).catch(error => {
                // 自动播放被阻止
                console.log("自动播放被阻止，用户需要点击播放按钮:", error);
            });
        }
    } catch (e) {
        console.log("播放音乐时出错:", e);
    }
    
    // 音乐按钮点击事件
    playMusicBtn.addEventListener('click', function() {
        if (birthdaySong.paused) {
            birthdaySong.play();
            playMusicBtn.textContent = '暂停生日快乐歌';
        } else {
            birthdaySong.pause();
            playMusicBtn.textContent = '奏响生日快乐歌';
        }
        
        // 显示祝福文本，添加淡入效果
        if (messageContainer.style.display === 'none') {
            messageContainer.style.display = 'block';
            messageContainer.style.opacity = '0';
            
            // 使用动画淡入显示
            let opacity = 0;
            const fadeIn = setInterval(() => {
                opacity += 0.1;
                messageContainer.style.opacity = opacity;
                if (opacity >= 1) {
                    clearInterval(fadeIn);
                }
            }, 100);
        }
    });
    
    // Create confetti
    createConfetti();
    
    // If user didn't go through login page, redirect to login
    if (!localStorage.getItem('birthdayUser')) {
        window.location.href = '../index.html';
    }
});

// 生成雪花的函数
function createSnowflakes(count) {
  const container = document.querySelector('.confetti-container');
  // 清空旧的纸屑
  container.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    // 随机位置、大小、动画时长
    const size = Math.random() * 10 + 5; // 雪花大小 5-15px
    const left = Math.random() * 100; // 水平位置 0-100%
    const delay = Math.random() * 5; // 动画延迟 0-5s
    const duration = Math.random() * 10 + 5; // 飘落时长 5-15s

    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${left}%`;
    snowflake.style.animationDelay = `${delay}s`;
    snowflake.style.animationDuration = `${duration}s`;

    container.appendChild(snowflake);
  }
}

// 页面加载时生成50片雪花
window.addEventListener('load', () => {
  createSnowflakes(50);
});

// 点击播放音乐按钮也触发雪花
document.getElementById('play-music').addEventListener('click', () => {
  createSnowflakes(50);
});

document.head.appendChild(style); 
