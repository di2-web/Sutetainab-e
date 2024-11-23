const text = "　　SUTETAINAB!E　　　Find Your Closest Trash Can";
const textElement = document.getElementById('typeText');
const logoElement = document.getElementById('logoImage');
const logoContainer = document.getElementById('logoContainer');
const home2Content = document.getElementById('home2Content'); // home2Content要素を取得
let index = 0;

function typeWriter() {
    if (index < text.length) {
        textElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 15);
    } else {
        setTimeout(() => {
            // ロゴとテキストを縮小
            logoContainer.style.transform = 'scale(0.7)';
            logoContainer.style.transition = 'transform 0.5s ease';
            textElement.style.transition = 'transform 0.5s ease';


            // home2Contentを表示 (フェードイン)
            home2Content.style.display = 'block';
            home2Content.style.opacity = 0; // 最初は非表示
            home2Content.style.transition = 'opacity 0.5s ease'; // フェードインのトランジション
            setTimeout(() => {
                home2Content.style.opacity = 1; // 0.5秒後に表示
            }, 100);

        }, 250);
    }
}

// ダークモードのトグル状態をローカルストレージに保存/読み込みする関数
function syncDarkMode() {
    const htmlElement = document.documentElement;
    const darkModeToggle = document.getElementById('darkModeToggle');

    // ローカルストレージからダークモード状態を読み込み
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (isDarkMode) {
        htmlElement.setAttribute('theme', 'dark-mode');
        darkModeToggle.style.backgroundImage = "url('sun.png')";
    } else {
        htmlElement.removeAttribute('theme');
        darkModeToggle.style.backgroundImage = "url('moon.png')";
    }
}

// ページ読み込み時にダークモードを同期
window.addEventListener('load', syncDarkMode);

// ダークモードトグルボタンのクリックイベントリスナー
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    const htmlElement = document.documentElement;
    const isDarkMode = htmlElement.hasAttribute('theme');

    // ダークモード状態をローカルストレージに保存
    localStorage.setItem('darkMode', !isDarkMode);

    // ダークモードを同期
    syncDarkMode();
});

setTimeout(typeWriter, 700);