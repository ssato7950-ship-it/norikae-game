/* アクセス計測（Umami Cloud）
   WEBSITE_ID が空のあいだは、通信も読み込みも一切行わない。
   計測をやめたいときは、index.html からこのファイルの読み込みを外すだけでよい。 */
(function(){
  var WEBSITE_ID = '';   // ← Umami Cloud で発行されたウェブサイトIDを貼る
  var SRC = 'https://cloud.umami.is/script.js';

  if(!WEBSITE_ID) return;

  var s = document.createElement('script');
  s.async = true;
  s.src = SRC;
  s.setAttribute('data-website-id', WEBSITE_ID);
  document.head.appendChild(s);

  document.addEventListener('nk-ev', function(e){
    try{
      var d = e.detail || {};
      if(!d.name) return;
      var props = {};
      for(var k in d.props) props[k] = d.props[k];
      props.host = location.hostname;   // 配信元（GitHub Pages / 外部サイト）の判別用
      if(window.umami && window.umami.track) window.umami.track(d.name, props);
    }catch(_){}
  });
})();
