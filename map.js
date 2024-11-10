// マップの表示と初期位置、ズームレベル、スクロール量を設定
var map = L.map('map', {center: [35.16548515834528, 136.90491540044457],
  zoom: 18, wheelPxPerZoomLevel: 80 ,zoomSnap: 0 });


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// trash アイコンの設定
var trashIcon = L.icon({
  iconUrl: 'trash.png', 
  iconSize: [25, 25],
  iconAnchor: [12.5, 12.5]
});

// 現在地のアイコン設定
var hereIcon = L.icon({
 iconUrl: 'locate.png',
 iconSize: [25, 25],
 iconAnchor: [12.5, 12.5] 
});
// ローソンのアイコン設定
var lawsonIcon = L.icon({
 iconUrl: 'lawson.png',
 iconSize: [25, 25],
 iconAnchor: [12.5, 12.5] 
});
// セブンイレブンのアイコン設定
var sevenIcon = L.icon({
 iconUrl: 'seven.png',
 iconSize: [25, 25],
 iconAnchor: [12.5, 12.5] 
});
// ファミマのアイコン設定
var famimaIcon = L.icon({
 iconUrl: 'famima.png',
 iconSize: [25, 25],
 iconAnchor: [12.5, 12.5] 
});

// 検索マーカーのアイコン設定
var searchIcon = L.icon({
 iconUrl: 'search.png',
 iconSize: [25, 25],
 iconAnchor: [12.5, 12.5]
})

// クラスターの設定
var markers = L.markerClusterGroup({disableClusteringAtZoom: 17});


// マーカーの追加
markers.addLayer(L.marker([35.16290012098015, 136.90693353732513], {icon: trashIcon})
  .bindPopup("<button id='routeButton' onclick='routeTo(35.16290012098015, 136.90693353732513)'>ここまで行く</button><b><br>パルコ</b>")
  .on('mouseover', function (e) {
    this.openPopup();
  })
);

markers.addLayer(L.marker([35.143836348162345, 136.90106010763705], {icon: trashIcon})
  .bindPopup("<button id='routeButton' onclick='routeTo(35.143836348162345, 136.90106010763705)'>ここまで行く</button><b><br>あすなる</b>")
  .on('mouseover', function (e) {
    this.openPopup();
  })
);
markers.addLayer(L.marker([35.1721467715954, 136.90822665247896], {icon: trashIcon})
  .bindPopup("<button id='routeButton' onclick='routeTo(35.1721467715954, 136.90822665247896)'>ここまで行く</button><b><br>久屋大通</b>")
  .on('mouseover', function (e) {
    this.openPopup();
  })
);
markers.addLayer(L.marker([35.14300969046676, 136.90115035693154], {icon: trashIcon})
  .bindPopup("<button id='routeButton' onclick='routeTo(35.14300969046676, 136.90115035693154)'>ここまで行く</button><b><br>名鉄金山</b>")
  .on('mouseover', function (e) {
    this.openPopup();
  })
);

 markers.addLayer(L.marker([35.165205976241914, 136.90444022901883], {icon: lawsonIcon})
 .bindPopup("<button id='routeButton' onclick= 'routeTo(35.165205976241914, 136.90444022901883)'>ここまで行く</button><b><br>可燃、不燃</b>") // 通常のクリック時のポップアップは残す
 .on('mouseover', function (e) {
     this.openPopup();
   })
 );

 markers.addLayer(L.marker([35.16571992542317, 136.9046068243526], {icon: sevenIcon})
 .bindPopup("<button id='routeButton' onclick='routeTo(35.16571992542317, 136.9046068243526)'>ここまで行く</button><b><br>可燃、不燃</b>")
 .on('mouseover', function (e) {
     this.openPopup();
   })
 );

 markers.addLayer(L.marker([35.16594580075359, 136.9050499955909], {icon: famimaIcon})
 .bindPopup("<button id='routeButton' onclick='routeTo(35.16594580075359, 136.9050499955909)'>ここまで行く</button><b><br>可燃、不燃</b>")
 .on('mouseover', function (e) {
     this.openPopup();
   })
 );

// 現在地マーカーはクラスターに含めない
   let currentLocationMarker = null;

map.addLayer(markers); // クラスターグループをマップに追加

// 現在地の座標を保持するグローバル変数
let currentLocation = null;

// 現在地の取得
function getCurrentLocation() {
 if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(function(position) {
     var lat = position.coords.latitude;
     var lng = position.coords.longitude;

     currentLocation = L.latLng(lat, lng); // 現在地の座標をグローバル変数に格納
   //  現在地を中心に表示させる
     map.setView([lat, lng], 18);

     if (currentLocationMarker) {
       map.removeLayer(currentLocationMarker);
     }
     
     currentLocationMarker = L.marker([lat, lng], {icon: hereIcon,}).bindPopup("現在地").addTo(map);
   }, function(error) {
     handleError(error);
   });
 } else {
   alert("位置情報が取得できません。");
 }
}

// マップの `zoomend` イベントでマーカーの表示/非表示を切り替える
map.on('zoomend', function() {
 if (map.getZoom() <= 17 && currentLocationMarker) {
   currentLocationMarker.setOpacity(0); // 透明にして非表示にする
 } else if (currentLocationMarker) {
   currentLocationMarker.setOpacity(1); // 元に戻す
 }
});



// エラーの処理
function handleError(error) {
 switch(error.code) {
   case error.PERMISSION_DENIED:
     alert("位置情報の利用が許可されていません。");
     break;
   case error.POSITION_UNAVAILABLE:
     alert("位置情報が取得できませんでした。");
     break;
   case error.TIMEOUT:
     alert("位置情報の取得にタイムアウトしました。");
     break;
   default:
     alert("位置情報の取得でエラーが発生しました。");
     break;
 }
}

// 現在地表示ボタンを追加
L.easyButton('<i class="fa fa-map-marker"></i>', function(btn, map){
   getCurrentLocation();
}).addTo(map);

// 検索結果のマーカーを格納する変数 (グローバルスコープに定義)
let searchMarker = null;


// 検索ボタンのクリックイベントハンドラ（既存のコード）
document.getElementById("searchButton").addEventListener("click", searchLocation);

// 検索ボックスのキーダウンイベントハンドラ（追加）
document.getElementById("searchBox").addEventListener("keydown", function(event) {
 if (event.key === "Enter") {
   searchLocation();
 }
});

// 検索を実行する関数（共通化のため新規作成）
function searchLocation() {
 const searchTerm = document.getElementById("searchBox").value;
 if (!searchTerm) { 
   alert("検索語を入力してください。");
   return;
 }

 fetch(`https://nominatim.openstreetmap.org/search?q=${searchTerm}&format=json&limit=1`)
   .then(response => response.json())
   .then(data => {
     if (data.length > 0) {
       const lat = parseFloat(data[0].lat);
       const lng = parseFloat(data[0].lon);

       map.setView([lat, lng], 18);

       if (searchMarker) {
         map.removeLayer(searchMarker);
       }

       searchMarker = L.marker([lat, lng], {icon: searchIcon,}).addTo(map).bindPopup(data[0].display_name); 

     } else {
       alert("該当する場所が見つかりませんでした。");
     }
   })
   .catch(error => {
     console.error("Geocoding エラー:", error);
     alert("検索中にエラーが発生しました。");
   });
}

// routingControl変数をグローバルスコープで定義
let routingControl = null;

// ルート検索ボタンのクリックイベントハンドラ
function routeTo(targetLat, targetLng) {
 if (!currentLocation) {
   alert("現在地が取得できていません。");
   return;
 }

 // 既存のルートを削除
 if (routingControl) {
   map.removeControl(routingControl);
 }

 // 経路オブジェクトを生成 (必要に応じてオプションを追加)
 routingControl = L.Routing.control({ // routingControlにインスタンスを代入

   waypoints: [
     currentLocation,
     L.latLng(targetLat, targetLng)
   ],

    createMarker: function(i, wp, nWps) { // カスタムマーカー非表示
    return null;
    }
 }).addTo(map).on('routesfound', function(e) { // 経路探索完了後にポップアップを閉じる
     //クリックされたマーカーを取得しポップアップを閉じる
      markers.eachLayer(function(layer) {
         if (layer.getLatLng().lat == targetLat && layer.getLatLng().lng == targetLng)
            layer.closePopup()
       });
   });
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



getCurrentLocation();