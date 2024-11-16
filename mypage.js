// Firebaseのライブラリをインポート
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebaseの設定オブジェクト
const firebaseConfig = {
  apiKey: "AIzaSyD3IlNR5d97zzGmxHDaTGFp6110X-14xuk",
  authDomain: "sutetainab-e.firebaseapp.com",
  projectId: "sutetainab-e",
  storageBucket: "sutetainab-e.firebasestorage.app",
  messagingSenderId: "618471725173",
  appId: "1:618471725173:web:8c60289d5d51a7dce6c03c",
  measurementId: "G-TMHJLQ3QDL"
};

// Firebaseアプリの初期化
const app = initializeApp(firebaseConfig);
// Firestoreデータベースのインスタンスを取得
const db = getFirestore(app);

const username = localStorage.getItem('username'); // ログインページから保存されたユーザー名を取得

if (username) {
    document.getElementById('username').textContent = username;
} else {
    // ログインしていない場合はログインページにリダイレクト
    window.location.href = 'signin.html';    
}








// const username = localStorage.getItem('username'); // ログインページから保存されたユーザー名を取得
    // const pointsElement = document.getElementById('points');
    // let points = parseInt(localStorage.getItem('points') || 0); // ローカルストレージからポイントを読み込み

    // if (username) {
    //     document.getElementById('username').textContent = username;
    //     pointsElement.textContent = points; // 初期表示
    // } else {
    //     // ログインしていない場合はログインページにリダイレクト
    //     window.location.href = 'login.html'; 
    // }

    // const imageInput = document.getElementById('imageInput');
    // const preview = document.getElementById('preview');
    // const uploadForm = document.getElementById('uploadForm');


    // imageInput.addEventListener('change', () => {
    //     const file = imageInput.files[0];
    //     if (file) {
    //         const reader = new FileReader();

    //         reader.onload = function(e) {
    //             preview.src = e.target.result;
    //             preview.style.display = 'block';
    //         }

    //         reader.readAsDataURL(file);
    //     } else {
    //         preview.src = '#';
    //         preview.style.display = 'none';
    //     }
    // });

    // uploadForm.addEventListener('submit', (e) => {
    //     e.preventDefault();

    //     if (imageInput.files.length > 0) {
    //         points++;
    //         pointsElement.textContent = points;  // ポイント表示を更新
    //         localStorage.setItem('points', points); // ポイントをローカルストレージに保存
    //         alert('ポイントが加算されました！');

    //         // プレビューと入力欄をリセット
    //         preview.src = '#';
    //         preview.style.display = 'none';
    //         imageInput.value = ''; // inputをクリア
    //     } else {
    //         alert('画像を選択してください。');
    //     }
    // });

    // const logoutButton = document.getElementById('logoutButton');

    //     logoutButton.addEventListener('click', () => {
    //         localStorage.removeItem('username'); // ローカルストレージからusernameを削除
    //         localStorage.removeItem('points'); // pointsも削除
    //         window.location.href = 'login.html'; // login.htmlにリダイレクト
    //     });
