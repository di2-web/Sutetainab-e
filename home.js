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
        setTimeout(typeWriter, 50);
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

typeWriter();