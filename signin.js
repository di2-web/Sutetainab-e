// signin.js
document.getElementById('signinForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Cookieからユーザー情報を取得
    const cookies = document.cookie.split('; ');
    let storedUsername = '';
    let storedPassword = '';
    cookies.forEach(cookie => {
        const parts = cookie.split('=');
        if (parts[0] === 'username') storedUsername = parts[1];
        if (parts[0] === 'password') storedPassword = parts[1];
    });

    // 入力値と保存された値を比較
    if (username === storedUsername && password === storedPassword) {
        alert('サインインしました！');
        window.location.href = 'mypage.html'; // マイページへリダイレクト
    } else {
        alert('ユーザー名またはパスワードが違います。');
    }
});