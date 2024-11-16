// mypage.js
// Cookieからユーザー名とポイントを取得
const cookies = document.cookie.split('; ');
let username = '';
let points = 0;

cookies.forEach(cookie => {
    const parts = cookie.split('=');
    if (parts[0] === 'username') username = parts[1];
    if (parts[0] === 'points') points = parseInt(parts[1]) || 0;
});

document.getElementById('usernameDisplay').textContent = username;
document.getElementById('pointsDisplay').textContent = points;

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const file = document.getElementById('imageUpload').files[0];
    if (!file) {
        alert("画像を選択してください。");
        return;
    }

    // 画像アップロード処理 (ダミー)
    console.log('アップロード処理開始:', file.name);
    setTimeout(() => {
        console.log("アップロード完了！");
        points += 10; // ポイントを加算
        document.getElementById('pointsDisplay').textContent = points;

        // Cookieにポイントを保存 (有効期限、path, セキュリティ対策などは必要に応じて実装)
        document.cookie = `points=${points};`;

        alert("画像のアップロードが完了し、10ポイント獲得しました！");
    }, 1000);
});