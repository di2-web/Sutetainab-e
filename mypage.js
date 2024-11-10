const firebaseConfig = {
    apiKey: "AIzaSyD3IlNR5d97zzGmxHDaTGFp6110X-14xuk",
    authDomain: "sutetainab-e.firebaseapp.com",
    projectId: "sutetainab-e",
    storageBucket: "sutetainab-e.firebasestorage.app",
    messagingSenderId: "618471725173",
    appId: "1:618471725173:web:8c60289d5d51a7dce6c03c",
    measurementId: "G-TMHJLQ3QDL"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

// ログイン状態の監視
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        // ユーザーがログインしている場合
        console.log("User logged in:", user.uid);
        setupPhotoUpload(user); // 写真アップロードのセットアップ
    } else {
        // ユーザーがログアウトしている場合
        console.log("User logged out");
        // ログイン画面にリダイレクトなど
        // location.href = "login.html"; // 例: ログインページへのリダイレクト
    }
});

function setupPhotoUpload(user) {
    const uploadButton = document.getElementById("photoUploadButton");  // 写真アップロードボタンのIDを適切なものに変更
    const pointDisplay = document.getElementById("pointDisplay"); // ポイント表示要素のIDを適切なものに変更

    let currentPoints = 0; // 現在のポイント (初期値は0)

    // データベースから現在のポイントを読み込む (Firebase Realtime Databaseを使用)
    const userPointsRef = firebase.database().ref(`users/${user.uid}/points`);
    userPointsRef.once("value").then(snapshot => {
        currentPoints = snapshot.val() || 0; // データがない場合は0
        updatePointDisplay(); // ポイント表示を更新
    });


    uploadButton.addEventListener("click", () => {
        // 写真を選択するためのinput要素を作成 (非表示)
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*"; // 画像ファイルのみ受け付ける
        input.style.display = "none"; // 非表示にする

        // input要素でchangeイベントが発生したら、ファイルを読み込んでポイントを加算
        input.addEventListener("change", () => {
            const file = input.files[0];
            if (file) {
                // 写真のバリデーション (サイズ、形式など) は必要に応じて追加

                // ポイントを加算
                currentPoints++;
                userPointsRef.set(currentPoints); // データベースに保存
                updatePointDisplay();


                // 完了メッセージを表示 (必要に応じて)
                alert("写真がアップロードされ、1ポイント加算されました。");
            }
        });

        // input要素をクリックしてファイル選択ダイアログを開く
        input.click();

        // input要素を削除 (必要に応じて)
        input.remove();
    });


    function updatePointDisplay() {
        pointDisplay.textContent = `現在のポイント: ${currentPoints}`;
    }
}