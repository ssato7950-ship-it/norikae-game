/* アクセス計測（Umami Cloud）
   WEBSITE_ID が空のあいだは、通信も読み込みも一切行わない。
   計測をやめたいときは、index.html からこのファイルの読み込みを外すだけでよい。 */
(function(){
  var WEBSITE_ID = '6dfa63f0-515f-4709-881a-47f2fc34a260';   // Umami Cloud のウェブサイトID（公開前提の識別子。秘密情報ではない）
  var SRC = 'https://cloud.umami.is/script.js';

  if(!WEBSITE_ID) return;

  var s = document.createElement('script');
  s.async = true;
  s.src = SRC;
  s.setAttribute('data-website-id', WEBSITE_ID);
  document.head.appendChild(s);

  document.addEventListener('nk-ev', function(e){
    try{
      // 自分のテストプレイを除外する。Umami標準の umami.disabled はページビューしか止めず、
      // track() で送るイベントは素通りしてしまうため、ここで自前で見る
      if(localStorage.getItem('umami.disabled')) return;

      var d = e.detail || {};
      if(!d.name) return;
      var props = {};
      for(var k in d.props) props[k] = d.props[k];
      props.host = location.hostname;   // 配信元（GitHub Pages / 外部サイト）の判別用
      if(window.umami && window.umami.track) window.umami.track(d.name, props);
    }catch(_){}
  });
})();
