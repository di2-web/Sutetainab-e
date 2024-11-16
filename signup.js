// signup.js
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 簡単なバリデーション (必要に応じて強化)
    if (!username || !password) {
        alert('ユーザー名とパスワードを入力してください。');
        return;
    }

    // Cookieにユーザー情報を保存 (有効期限、セキュリティ対策などは必要に応じて実装)
    document.cookie = `username=${username};`;
    document.cookie = `password=${password};`;

    alert('サインアップが完了しました！');
    window.location.href = 'signin.html'; // サインインページへリダイレクト
});