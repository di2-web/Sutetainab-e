const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    if (!username) {
        alert("ユーザー名を入力してください。");
        return;
    }

    // データベースを開く (共通関数 - 後述)
    openDatabase().then(db => {
        getUser(db, username).then(user => {
            if (user) {
                // 既にユーザーが存在する場合はログイン
                sessionStorage.setItem('username', username); // セッションストレージに保存
                window.location.href = 'mypage.html';
            } else {
                // ユーザーが存在しない場合は新規作成してログイン
                createUser(db, username).then(() => {
                    sessionStorage.setItem('username', username);
                    window.location.href = 'mypage.html';
                });
            }
        });
    });
});


// IndexedDB 関連の共通関数 (別ファイルに分割しても良い)
function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('userDatabase', 1);
        request.onerror = reject;
        request.onsuccess = event => resolve(event.target.result);
        request.onupgradeneeded = event => {
            const db = event.target.result;
            const objectStore = db.createObjectStore('users', { keyPath: 'username' });
            objectStore.createIndex('points', 'points', { unique: false });
        };
    });
}

function createUser(db, username) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['users'], 'readwrite');
        const store = transaction.objectStore('users');
        const user = { username: username, points: 0 };
        const request = store.add(user);
        request.onsuccess = resolve;
        request.onerror = reject;
    });
}

function getUser(db, username) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['users'], 'readonly');
        const store = transaction.objectStore('users');
        const request = store.get(username);
        request.onsuccess = event => resolve(event.target.result);
        request.onerror = reject;
    });
}

// ... (他のIndexedDB関数 - mypage.js で使用)