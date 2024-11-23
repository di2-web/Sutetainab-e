// Firebaseのライブラリをインポート
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebaseの設定
const firebaseConfig = {
  apiKey: "AIzaSyD3IlNR5d97zzGmxHDaTGFp6110X-14xuk",
  authDomain: "sutetainab-e.firebaseapp.com",
  projectId: "sutetainab-e",
  storageBucket: "sutetainab-e.firebasestorage.app",
  messagingSenderId: "618471725173",
  appId: "1:618471725173:web:8c60289d5d51a7dce6c03c",
};

// Firebaseアプリの初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function userLoading() {

    if (localStorage.getItem('username') === null) {
      alert("ログインしてください");
      window.location.href = 'signin.html';

    } else {
    
        try {
            const username = localStorage.getItem('username');
            const q = query(collection(db, "users"), where("username", "==", username));
            const querySnapshot = await getDocs(q);   
            
            if(querySnapshot.empty){
                alert("ユーザーが存在しません");
            }else{
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const Fusername = data.username;
                    const Fpoints = data.points;

                    document.getElementById("username").textContent = "ユーザー名:" + Fusername;
                    document.getElementById("points").textContent = "現在のポイント:" + Fpoints + "pt";
                });
            }
        } 
        catch (error) {
            console.error("クエリエラー:", error);
        }
    }
}

// Firebaseのポイントを更新する関数
async function addPoints() {
    try {
        const username = localStorage.getItem('username');
        const q = query(collection(db, "users"), where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            alert("ユーザーが存在しません");
            return;
        }

        querySnapshot.forEach(async (docSnapshot) => {
            const userRef = doc(db, "users", docSnapshot.id); // ドキュメントIDを取得
            const currentPoints = docSnapshot.data().points; // 現在のポイントを取得
            await updateDoc(userRef, { points: currentPoints + 10 }); // ポイントを10加算して更新
        });

        userLoading();
    } catch (error) {
        console.error("更新エラー:", error);
    }
}

function logout() {
    localStorage.removeItem('username');
    window.location.href = 'map.html';
}

document.getElementById("logoutButton").addEventListener("click", logout);

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

// 度分秒を十進数に変換する関数
function convertDMSToDD(dms, ref) {
    const degrees = dms[0].numerator / dms[0].denominator;
    const minutes = dms[1].numerator / dms[1].denominator / 60;
    const seconds = dms[2].numerator / dms[2].denominator / 3600;
    const dd = degrees + minutes + seconds;

    // 南緯または西経の場合は負の値にする
    return ref === 'S' || ref === 'W' ? dd * -1 : dd;
}

const dropZone = document.getElementById('dropZone');
const fileSelectLink = document.getElementById('fileSelectLink');
const fileInput = document.getElementById('photoUpload');

// ドラッグ＆ドロップのイベントリスナーを追加
dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropZone.classList.add('dragover'); // CSSクラスを追加して見た目を変える
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover'); // CSSクラスを削除
});

dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropZone.classList.remove('dragover');

    const file = event.dataTransfer.files[0]; // ドロップされたファイルを取得
    if (!file) {
        alert('ファイルが選択されていません');
        return;
    }

    processFile(file); // ファイルを処理する関数を呼び出し
});

// 「ファイルを選択」リンクのクリックでファイル選択ダイアログを開く
fileSelectLink.addEventListener('click', (event) => {
    event.preventDefault(); // デフォルトのリンク動作を無効化
    fileInput.click(); // ファイル選択ダイアログを表示
});

// ファイル選択ダイアログでファイルを選択したときの処理
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]; // 選択されたファイルを取得
    if (!file) {
        alert('ファイルが選択されていません');
        return;
    }

    processFile(file); // ファイルを処理する関数を呼び出し
});

// ファイルを処理する関数
function processFile(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        // ファイル処理ロジック（既存のEXIF読み取りなど）
        EXIF.getData(file, function () {
            const lat = EXIF.getTag(this, 'GPSLatitude');
            const lng = EXIF.getTag(this, 'GPSLongitude');
            const latRef = EXIF.getTag(this, 'GPSLatitudeRef');
            const lngRef = EXIF.getTag(this, 'GPSLongitudeRef');

            if (lat && lng && latRef && lngRef) {
                const latitude = convertDMSToDD(lat, latRef);
                const longitude = convertDMSToDD(lng, lngRef);

                const targetLat = localStorage.getItem('targetLat');
                const targetLng = localStorage.getItem('targetLng');

                if (targetLat != null && targetLng != null) {
                    const formattedLat = latitude.toFixed(5);
                    const formattedLng = longitude.toFixed(5);
                    const formattedTargetLat = parseFloat(targetLat).toFixed(5);
                    const formattedTargetLng = parseFloat(targetLng).toFixed(5);

                    if (formattedLat === formattedTargetLat && formattedLng === formattedTargetLng) {
                        alert("撮影場所と指定されたごみ捨て場所が一致しました");
                    } else {
                        alert("あなたが選択したごみを捨てる場所と、写真を撮った場所が違います");
                    }
                } else {
                    alert("マップに戻り、ごみを捨てる場所を選択してください");
                    window.location.href = 'map.html';
                }
            } else {
                alert("写真が撮られた場所を取得できませんでした");
            }
        });
    };

    reader.readAsDataURL(file);
}


  userLoading();