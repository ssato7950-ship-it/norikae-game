(function(){
  /* ===== 駅データ（首都圏／レベル1〜50） ===== */
  /* 駅名・路線名は実在のものですが、時刻・混み具合・駅の中の配置はゲーム用に作った例です。 */
  var STATIONS = [
    {id:'shin-yokohama',    level:1,  from:'新横浜',   to:'横浜',           fromLine:{name:'横浜線',color:'#7FC342'},          toLine:{name:'東海道線',color:'#F68B1E'},          stops:['新横浜','菊名','大口','東神奈川','横浜'], rideMinutes:12},
    {id:'ueno-akihabara',   level:3,  from:'上野',     to:'秋葉原',         fromLine:{name:'京浜東北線',color:'#00B2E5'},      toLine:{name:'山手線',color:'#8FD400'},            stops:['上野','御徒町','秋葉原'], rideMinutes:5},
    {id:'kamata-kawasaki',  level:5,  from:'蒲田',     to:'川崎',           fromLine:{name:'京浜東北線',color:'#00B2E5'},      toLine:{name:'東海道線',color:'#F68B1E'},          stops:['蒲田','川崎'], rideMinutes:6},
    {id:'meguro-ebisu',     level:7,  from:'目黒',     to:'恵比寿',         fromLine:{name:'東急目黒線',color:'#0089CF'},      toLine:{name:'山手線',color:'#8FD400'},            stops:['目黒','恵比寿'], rideMinutes:4},
    {id:'sugamo-komagome',  level:9,  from:'巣鴨',     to:'駒込',           fromLine:{name:'山手線',color:'#8FD400'},          toLine:{name:'南北線',color:'#00AC9A'},            stops:['巣鴨','駒込'], rideMinutes:3},
    {id:'gotanda-osaki',    level:11, from:'五反田',   to:'大崎',           fromLine:{name:'東急池上線',color:'#EE7B1A'},      toLine:{name:'埼京線',color:'#00AC9B'},            stops:['五反田','大崎'], rideMinutes:5},
    {id:'kitasenju-ayase',  level:13, from:'北千住',   to:'綾瀬',           fromLine:{name:'東京メトロ千代田線',color:'#00BB85'}, toLine:{name:'常磐線',color:'#00B48D'},          stops:['北千住','綾瀬'], rideMinutes:6},
    {id:'takada-shinokubo', level:15, from:'高田馬場', to:'新大久保',       fromLine:{name:'西武新宿線',color:'#0089D3'},      toLine:{name:'山手線',color:'#8FD400'},            stops:['高田馬場','新大久保'], rideMinutes:3},
    {id:'tamachi-mita',     level:17, from:'田町',     to:'三田',           fromLine:{name:'山手線',color:'#8FD400'},          toLine:{name:'都営三田線',color:'#0066CC'},        stops:['田町','三田'], rideMinutes:3},
    {id:'ooimachi-omori',   level:19, from:'大井町',   to:'大森',           fromLine:{name:'東急大井町線',color:'#EE7B1A'},    toLine:{name:'京浜東北線',color:'#00B2E5'},        stops:['大井町','大森'], rideMinutes:4},
    {id:'nakameguro-ebisu', level:21, from:'中目黒',   to:'恵比寿',         fromLine:{name:'東急東横線',color:'#DE0F22'},      toLine:{name:'日比谷線',color:'#9CAEB7'},          stops:['中目黒','恵比寿'], rideMinutes:4},
    {id:'kinshicho-ryogoku',level:23, from:'錦糸町',   to:'両国',           fromLine:{name:'総武線',color:'#FFD400'},          toLine:{name:'都営大江戸線',color:'#B6007A'},      stops:['錦糸町','両国'], rideMinutes:3},
    {id:'mizonokuchi-niko', level:25, from:'溝の口',   to:'二子玉川',       fromLine:{name:'東急田園都市線',color:'#199BD7'},  toLine:{name:'東急大井町線',color:'#EE7B1A'},      stops:['溝の口','二子玉川'], rideMinutes:4},
    {id:'kawasaki-keikyu',  level:27, from:'川崎',     to:'京急川崎',       fromLine:{name:'京浜東北線',color:'#00B2E5'},      toLine:{name:'京急線',color:'#00639B'},            stops:['川崎','京急川崎'], rideMinutes:2},
    {id:'akabane-oji',      level:29, from:'赤羽',     to:'王子',           fromLine:{name:'埼京線',color:'#00AC9B'},          toLine:{name:'南北線',color:'#00AC9A'},            stops:['赤羽','王子'], rideMinutes:5},
    {id:'shibuya-omotesando',level:31,from:'渋谷',     to:'表参道',         fromLine:{name:'山手線',color:'#8FD400'},          toLine:{name:'東京メトロ銀座線',color:'#FF9500'},  stops:['渋谷','表参道'], rideMinutes:3},
    {id:'ikebukuro-mejiro', level:33, from:'池袋',     to:'目白',           fromLine:{name:'東武東上線',color:'#006CB7'},      toLine:{name:'山手線',color:'#8FD400'},            stops:['池袋','目白'], rideMinutes:3},
    {id:'shinagawa-takanadai',level:35,from:'品川',    to:'高輪台',         fromLine:{name:'京急線',color:'#00639B'},          toLine:{name:'都営浅草線',color:'#EE82A9'},        stops:['品川','高輪台'], rideMinutes:4},
    {id:'iidabashi-ichigaya',level:37,from:'飯田橋',   to:'市ヶ谷',         fromLine:{name:'東京メトロ東西線',color:'#009BBF'}, toLine:{name:'都営新宿線',color:'#6CBB5A'},        stops:['飯田橋','市ヶ谷'], rideMinutes:3},
    {id:'roppongi-azabu',   level:39, from:'六本木',   to:'麻布十番',       fromLine:{name:'東京メトロ日比谷線',color:'#9CAEB7'},toLine:{name:'都営大江戸線',color:'#B6007A'},     stops:['六本木','麻布十番'], rideMinutes:3},
    {id:'ginza-higashi',    level:41, from:'銀座',     to:'東銀座',         fromLine:{name:'東京メトロ丸の内線',color:'#F62E36'},toLine:{name:'都営浅草線',color:'#EE82A9'},       stops:['銀座','東銀座'], rideMinutes:2},
    {id:'otemachi-tokyo',   level:43, from:'大手町',   to:'東京',           fromLine:{name:'東京メトロ東西線',color:'#009BBF'}, toLine:{name:'中央線',color:'#F15A22'},            stops:['大手町','東京'], rideMinutes:3},
    {id:'shinjuku-sanchome',level:45, from:'新宿',     to:'新宿三丁目',     fromLine:{name:'小田急線',color:'#0E5EAB'},        toLine:{name:'東京メトロ丸の内線',color:'#F62E36'},stops:['新宿','新宿三丁目'], rideMinutes:3},
    {id:'shibuya-fukutoshin',level:47,from:'渋谷',     to:'渋谷（地下5階）',fromLine:{name:'東急東横線',color:'#DE0F22'},      toLine:{name:'東京メトロ副都心線',color:'#9C5E31'},stops:['渋谷','渋谷（地下5階）'], rideMinutes:2},
    {id:'tokyo-keiyo',      level:49, from:'東京（京葉線）',to:'大手町',     fromLine:{name:'京葉線',color:'#C7A2D1'},          toLine:{name:'東京メトロ丸の内線',color:'#F62E36'},stops:['東京（京葉線）','大手町'], rideMinutes:5},
    {id:'shinjuku-toei',    level:50, from:'新宿',     to:'都庁前',         fromLine:{name:'中央線',color:'#F15A22'},          toLine:{name:'都営大江戸線',color:'#B6007A'},      stops:['新宿','都庁前'], rideMinutes:4}
  ];
  var TIERS = [
    {max:10, label:'レベル1〜10　やさしい'},
    {max:20, label:'レベル11〜20　ふつう'},
    {max:30, label:'レベル21〜30　標準'},
    {max:40, label:'レベル31〜40　むずかしい'},
    {max:50, label:'レベル41〜50　激ムズ'}
  ];

  /* ===== 難易度をレベルから決める ===== */
  function diffFor(level){
    var t = (level-1)/49;
    return {
      margin: Math.round(320 - t*230),
      mapVisible: level <= 30,
      crowdWeights: [Math.max(0.06, 0.34-t*0.30), 0.42, Math.max(0.10, 0.24+t*0.34)],
      delayMult: 1 + t*1.3,
      npcMult: 1 + t*0.9
    };
  }
  function pickWeighted(w){
    var total = w.reduce(function(a,b){ return a+b; },0), r = Math.random()*total;
    for(var i=0;i<w.length;i++){ r -= w[i]; if(r<=0) return i; }
    return w.length-1;
  }
  function inkFor(hex){
    var h = hex.replace('#','');
    var r = parseInt(h.substr(0,2),16), g = parseInt(h.substr(2,2),16), b = parseInt(h.substr(4,2),16);
    var lum = 0.299*r + 0.587*g + 0.114*b;
    return lum > 150 ? '#15300A' : '#FFFFFF';
  }

  var CROWDS = [
    {label:'空いている', alight:14, interval:1.0,  wait:[0,1]},
    {label:'普通',       alight:28, interval:0.55, wait:[1,2]},
    {label:'混雑',       alight:48, interval:0.3,  wait:[2,4]}
  ];
  var START = 10*3600 + 2*60, DOOR = 15;
  var SCALE = 10;          // 乗り換え中：現実1秒 = ゲーム10秒
  var W = 360, H = 452, R = 6, SPEED = 60;
  var SLOTS = [60,135,210,285];
  var EVENTS = [
    {w:6,d:0,msg:'予定どおり走っています。'},
    {w:2,d:15,msg:'乗り降りに時間がかかっています。'},
    {w:1.5,d:30,msg:'信号待ちで止まっています。'},
    {w:0.5,d:45,msg:'前の電車が遅れています。'}
  ];
  var T_PLAT = {x:10,y:34,w:340,h:62}, CONC = {x:34,y:160,w:292,h:130}, Y_PLAT = {x:10,y:354,w:340,h:62};
  var PILLARS = [{x:100,y:218,w:10,h:10},{x:175,y:218,w:10,h:10},{x:250,y:218,w:10,h:10}];
  var CAR_W = 42.5;

  var S = null, C = {}, WALK = [], currentMode = 'normal';
  var $ = function(id){ return document.getElementById(id); };
  var rnd = function(a,b){ return a + Math.random()*(b-a); };

  function pad(n){ return (n<10?'0':'')+n; }
  function clock(t){ t=Math.floor(t); return pad(Math.floor(t/3600)%24)+':'+pad(Math.floor(t/60)%60)+':'+pad(t%60); }
  function mmss(sec){ sec=Math.max(0,Math.floor(sec)); return Math.floor(sec/60)+':'+pad(sec%60); }
  function shuffle(a){ for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }

  function show(id){
    ['scMode','scStation','scCar','scRide','scTransfer','scResult'].forEach(function(s){ $(s).classList.toggle('hidden', s!==id); });
    window.scrollTo(0,0);
  }

  function renderBoard(){
    if(!S){ $('bDepart').textContent='--:--:--'; $('bNow').textContent='--:--:--'; $('bLeftLabel').textContent='発車まで'; $('bLeft').textContent='-:--'; $('board').classList.remove('alert'); return; }
    $('bNow').textContent = clock(S.time);
    if(S.mode === 'trial' && S.elapsed != null){
      $('bDepart').textContent = '——:——:——';
      $('bLeftLabel').textContent = '経過タイム';
      $('bLeft').textContent = mmss(S.elapsed);
      $('board').classList.remove('alert');
      return;
    }
    var left = S.depart - S.time;
    $('bDepart').textContent = clock(S.depart);
    $('bLeftLabel').textContent = '発車まで';
    $('bLeft').textContent = left > 0 ? mmss(left) : '発車';
    $('board').classList.toggle('alert', left <= 30);
  }
  function setBoardTag(line){
    var t = $('bTag');
    t.textContent = line.name;
    t.style.background = line.color;
    t.style.color = inkFor(line.color);
  }

  /* ===== 成績 ===== */
  var STAT_KEY = 'norikae-stats-v3', TRIAL_KEY = 'norikae-trial-v1';
  function loadJSON(key){ try{ return JSON.parse(localStorage.getItem(key)) || {}; }catch(e){ return {}; } }
  function saveJSON(key, v){ try{ localStorage.setItem(key, JSON.stringify(v)); }catch(e){} }
  function renderStats(){
    var st = loadJSON(STAT_KEY), tr = loadJSON(TRIAL_KEY);
    var plays = 0, wins = 0; Object.keys(st).forEach(function(k){ plays += st[k].play; wins += st[k].win; });
    var records = Object.keys(tr).length;
    var parts = [];
    if(plays) parts.push('通常モード　'+wins+'勝'+(plays-wins)+'敗（'+plays+'回プレイ）');
    if(records) parts.push('タイムトライアルの記録がある駅　'+records+'駅');
    $('stats').textContent = parts.join('　');
  }

  /* ===== 色 ===== */
  function readColors(){
    var cs = getComputedStyle(document.documentElement);
    ['map-wall','map-floor','map-floor2','map-gate','map-outside','map-stairs','map-stairs-line','map-esc',
     'map-arrow','map-pillar','person','me','me-ring','map-label','door']
      .forEach(function(n){ C[n] = cs.getPropertyValue('--'+n).trim(); });
  }
  try{ window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(){ readColors(); redrawStatic(); }); }catch(e){}

  /* ===== 駅の配置 ===== */
  function makeLayout(){
    function level(name, top, bottom){
      var xs = shuffle(SLOTS.slice()).slice(0,3);
      var types = shuffle([{type:'stairs'},{type:'esc',dir:'toward'},{type:'esc',dir:'away'}]);
      return xs.map(function(x,i){ return {x:x, type:types[i].type, dir:types[i].dir, level:name, top:top, bottom:bottom}; });
    }
    var lower = level('lower', 290, 354), upper = level('upper', 96, 160);
    return {lower:lower, upper:upper, all:lower.concat(upper)};
  }
  function buildWalk(){
    WALK = [T_PLAT, CONC, Y_PLAT];
    S.layout.all.forEach(function(c){
      if(c.type === 'stairs') WALK.push({x:c.x-15, y:c.top-14, w:30, h:(c.bottom-c.top)+28});
    });
  }
  function canStand(x,y){
    for(var i=0;i<PILLARS.length;i++){ var b=PILLARS[i];
      if(x>b.x-R && x<b.x+b.w+R && y>b.y-R && y<b.y+b.h+R) return false; }
    for(var j=0;j<WALK.length;j++){ var w=WALK[j];
      if(x>=w.x+R && x<=w.x+w.w-R && y>=w.y+R && y<=w.y+w.h-R) return true; }
    return false;
  }
  function connName(c){
    if(c.type==='stairs') return '階段';
    var up = (c.level==='lower') === (c.dir==='toward');
    return up ? '上りエスカレーター' : '下りエスカレーター';
  }
  function goodConns(list){ return list.filter(function(c){ return c.type==='stairs' || c.dir==='toward'; }); }
  function awayConns(list){ return list.filter(function(c){ return c.type==='stairs' || c.dir==='away'; }); }
  function nearest(list, x){ return list.slice().sort(function(a,b){ return Math.abs(a.x-x)-Math.abs(b.x-x); })[0]; }
  function tDoorX(i){ return 10 + i*34 + 17; }
  function yDoorX(i){ return 10 + i*CAR_W + CAR_W/2; }

  /* ===== 人（NPC） ===== */
  function addNPC(pts, opt){
    opt = opt || {};
    S.npcs.push({x:pts[0].x, y:pts[0].y, pts:pts, i:1, sp:opt.sp || rnd(34,52), wait:opt.wait||0, stay:!!opt.stay});
  }
  function spawnWaiting(){
    for(var i=0;i<10;i++){
      var n = Math.round(rnd(S.crowd.wait[0], S.crowd.wait[1]));
      for(var k=0;k<n;k++){
        var p = {x:tDoorX(i)+rnd(-8,8), y:rnd(46,62)};
        addNPC([p], {stay:true});
      }
    }
  }
  function spawnAlighting(){
    var good = goodConns(S.layout.lower), goodUp = goodConns(S.layout.upper);
    var count = Math.round(S.crowd.alight * S.diff.npcMult);
    for(var k=0;k<count;k++){
      var car = Math.floor(Math.random()*8);
      var dx = yDoorX(car) + rnd(-8,8);
      var c = nearest(good, dx), jx = c.x + rnd(-7,7);
      var pts = [{x:dx,y:410},{x:dx,y:rnd(378,395)},{x:jx,y:366},{x:jx,y:290},{x:jx,y:274}];
      if(Math.random() < 0.3){
        var u = nearest(goodUp, jx), ux = u.x + rnd(-7,7);
        pts.push({x:ux,y:176},{x:ux,y:96},{x:ux+rnd(-25,25), y:rnd(50,72)});
        addNPC(pts, {wait:rnd(0,1.6), stay:true});
      }else{
        var gy = rnd(176,272), left = Math.random() < 0.5;
        pts.push({x:left?40:320, y:gy},{x:left?16:344, y:gy});
        addNPC(pts, {wait:rnd(0,1.6)});
      }
    }
  }
  function spawnFlow(){
    var r = Math.random(), gy = rnd(172,278), left = Math.random()<0.5;
    var gx = left?16:344, gin = left?40:320;
    if(r < 0.5){
      var gy2 = rnd(172,278);
      addNPC([{x:gx,y:gy},{x:gin,y:gy},{x:left?320:40,y:gy2},{x:left?344:16,y:gy2}]);
    }else if(r < 0.75){
      var c = nearest(awayConns(S.layout.lower), rnd(40,320)), cx = c.x + rnd(-7,7);
      addNPC([{x:gx,y:gy},{x:gin,y:gy},{x:cx,y:274},{x:cx,y:366},{x:cx+rnd(-20,20),y:rnd(372,395)}]);
    }else{
      var u = nearest(awayConns(S.layout.upper), rnd(40,320)), ux = u.x + rnd(-7,7);
      addNPC([{x:ux+rnd(-20,20),y:rnd(48,80)},{x:ux,y:86},{x:ux,y:176},{x:gin,y:gy},{x:gx,y:gy}]);
    }
  }
  function updNPC(dt){
    for(var i=S.npcs.length-1;i>=0;i--){
      var n = S.npcs[i];
      if(n.wait > 0){ n.wait -= dt; continue; }
      if(n.i >= n.pts.length){ if(!n.stay) S.npcs.splice(i,1); continue; }
      var p = n.pts[n.i], dx = p.x-n.x, dy = p.y-n.y, d = Math.hypot(dx,dy), step = n.sp*dt;
      if(d <= step){ n.x=p.x; n.y=p.y; n.i++; } else { n.x += dx/d*step; n.y += dy/d*step; }
    }
  }

  /* ===== 描画 ===== */
  function fitCanvas(cv){
    var dpr = window.devicePixelRatio || 1, w = cv.clientWidth || 360, h = w*H/W;
    cv.style.height = h+'px';
    cv.width = Math.round(w*dpr); cv.height = Math.round(h*dpr);
    var ctx = cv.getContext('2d');
    ctx.setTransform(cv.width/W, 0, 0, cv.height/H, 0, 0);
    return ctx;
  }
  function text(ctx, s, x, y, color, size, align, bold){
    ctx.fillStyle = color; ctx.textAlign = align || 'left'; ctx.textBaseline = 'middle';
    ctx.font = (bold?'700 ':'')+(size||10)+'px "BIZ UDPGothic", "Hiragino Sans", sans-serif';
    ctx.fillText(s, x, y);
  }
  function drawMap(ctx, live){
    var L = S.layout, fromLine = S.station.fromLine, toLine = S.station.toLine;
    ctx.fillStyle = C['map-wall']; ctx.fillRect(0,0,W,H);

    // 乗り換え先の電車（上）
    for(var i=0;i<10;i++){
      var x = 10+i*34;
      ctx.fillStyle = toLine.color; ctx.fillRect(x+1, 10, 32, 22);
      ctx.fillStyle = C.door; ctx.fillRect(x+12, 28, 10, 6);
    }
    text(ctx, toLine.name, 16, 20, inkFor(toLine.color), 11, 'left', true);

    // 床
    ctx.fillStyle = C['map-floor'];  ctx.fillRect(T_PLAT.x, T_PLAT.y, T_PLAT.w, T_PLAT.h);
    ctx.fillStyle = C['map-outside']; ctx.fillRect(10, 160, 340, 130);
    ctx.fillStyle = C['map-floor2']; ctx.fillRect(CONC.x, CONC.y, CONC.w, CONC.h);
    ctx.fillStyle = C['map-floor'];  ctx.fillRect(Y_PLAT.x, Y_PLAT.y, Y_PLAT.w, Y_PLAT.h);

    // 改札
    [34, 326].forEach(function(gx){
      for(var gy=170; gy<284; gy+=14){ ctx.fillStyle = C['map-gate']; ctx.fillRect(gx-2, gy, 4, 9); }
    });
    ctx.save(); ctx.translate(22, 225); ctx.rotate(-Math.PI/2); text(ctx, '出口改札', 0, 0, C['map-label'], 10, 'center', true); ctx.restore();
    ctx.save(); ctx.translate(338, 225); ctx.rotate(Math.PI/2);  text(ctx, '出口改札', 0, 0, C['map-label'], 10, 'center', true); ctx.restore();

    // 階段・エスカレーター
    L.all.forEach(function(c){
      var x = c.x-15, y = c.top, h = c.bottom-c.top;
      if(c.type === 'stairs'){
        ctx.fillStyle = C['map-stairs']; ctx.fillRect(x, y, 30, h);
        ctx.fillStyle = C['map-stairs-line'];
        for(var yy=y+2; yy<y+h; yy+=5) ctx.fillRect(x, yy, 30, 1.2);
      }else{
        ctx.fillStyle = C['map-esc']; ctx.fillRect(x, y, 30, h);
        ctx.strokeStyle = C['map-arrow']; ctx.lineWidth = 2; ctx.globalAlpha = c.dir==='toward' ? 1 : 0.55;
        for(var ay=y+12; ay<y+h-6; ay+=13){
          ctx.beginPath();
          if(c.dir==='toward'){ ctx.moveTo(c.x-6,ay+3); ctx.lineTo(c.x,ay-3); ctx.lineTo(c.x+6,ay+3); }
          else { ctx.moveTo(c.x-6,ay-3); ctx.lineTo(c.x,ay+3); ctx.lineTo(c.x+6,ay-3); }
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
    });

    // 柱
    ctx.fillStyle = C['map-pillar'];
    PILLARS.forEach(function(b){ ctx.fillRect(b.x, b.y, b.w, b.h); });

    // 案内の文字
    text(ctx, toLine.name+'ホーム', 16, 88, C['map-label'], 10, 'left', true);
    text(ctx, '連絡通路', 180, 180, C['map-label'], 10, 'center', true);
    text(ctx, fromLine.name+'ホーム', 16, 364, C['map-label'], 10, 'left', true);

    // 乗ってきた電車（下）
    for(var k=0;k<8;k++){
      var cx = 10+k*CAR_W;
      ctx.fillStyle = fromLine.color; ctx.fillRect(cx+1, 418, CAR_W-2, 24);
      ctx.fillStyle = C.door; ctx.fillRect(cx+CAR_W/2-5, 416, 10, 5);
      text(ctx, (k+1)+'号車', cx+CAR_W/2, 432, inkFor(fromLine.color), 10, 'center', true);
    }
    text(ctx, fromLine.name, 180, 448, C['map-label'], 9, 'center');

    // 人
    ctx.fillStyle = C.person;
    S.npcs.forEach(function(n){ ctx.beginPath(); ctx.arc(n.x, n.y, 4, 0, Math.PI*2); ctx.fill(); });

    if(live){
      var P = S.p;
      if(P.target && P.mode==='walk'){
        ctx.strokeStyle = C.me; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(P.target.x, P.target.y, 7, 0, Math.PI*2); ctx.stroke();
      }
      ctx.fillStyle = C['me-ring']; ctx.beginPath(); ctx.arc(P.x, P.y, 8, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = C.me; ctx.beginPath(); ctx.arc(P.x, P.y, 6, 0, Math.PI*2); ctx.fill();
      if(S.elapsed < 3){ text(ctx, 'あなた', P.x, P.y-15, C.me, 11, 'center', true); }
    }
  }
  var previewCtx = null, mapCtx = null;
  function redrawStatic(){
    if(!S) return;
    if(!$('scCar').classList.contains('hidden') && S.diff.mapVisible){ previewCtx = fitCanvas($('preview')); drawMap(previewCtx, false); }
    if(!$('scTransfer').classList.contains('hidden')){ mapCtx = fitCanvas($('map')); drawMap(mapCtx, true); }
  }
  window.addEventListener('resize', redrawStatic);

  /* ===== モード選択・駅選択 ===== */
  Array.prototype.forEach.call(document.querySelectorAll('[data-mode]'), function(b){
    b.addEventListener('click', function(){ currentMode = b.getAttribute('data-mode'); showStationList(); });
  });
  $('btnModeBack').addEventListener('click', function(){ show('scMode'); renderStats(); });

  function showStationList(){
    var st = loadJSON(STAT_KEY), tr = loadJSON(TRIAL_KEY);
    $('stationTitle').textContent = currentMode === 'trial' ? '駅を選んでください（タイムトライアル）' : '駅を選んでください（通常モード）';
    var html = '';
    TIERS.forEach(function(tier, ti){
      var min = ti===0 ? 1 : TIERS[ti-1].max+1;
      var list = STATIONS.filter(function(s){ return s.level>=min && s.level<=tier.max; });
      if(!list.length) return;
      html += '<h3 class="tier-heading">'+tier.label+'</h3>';
      list.forEach(function(s){
        var sub = '';
        if(currentMode === 'trial'){
          sub = tr[s.id] != null ? '自己ベスト '+tr[s.id].toFixed(1)+'秒' : 'まだ記録なし';
        }else{
          var r = st[s.id];
          sub = (r && r.play) ? r.win+'勝'+(r.play-r.win)+'敗' : 'まだプレイなし';
        }
        html += '<button class="station-btn" data-station="'+s.id+'">'
          + '<span class="level-badge">Lv.'+s.level+'</span>'
          + '<span class="station-name">'+s.from+' → '+s.to+'</span>'
          + '<span class="line-tags">'
          +   '<span class="tag" style="background:'+s.fromLine.color+';color:'+inkFor(s.fromLine.color)+'">'+s.fromLine.name+'</span>'
          +   '<span class="tag" style="background:'+s.toLine.color+';color:'+inkFor(s.toLine.color)+'">'+s.toLine.name+'</span>'
          + '</span>'
          + '<span class="station-sub">'+sub+'</span>'
          + '</button>';
      });
    });
    $('stationList').innerHTML = html;
    Array.prototype.forEach.call(document.querySelectorAll('[data-station]'), function(b){
      b.addEventListener('click', function(){ startGame(b.getAttribute('data-station')); });
    });
    show('scStation');
  }

  (function(){
    var html = '';
    for(var i=0;i<8;i++) html += '<button class="car" data-car="'+i+'">'+(i+1)+'号車</button>';
    $('cars').innerHTML = html;
    Array.prototype.forEach.call(document.querySelectorAll('[data-car]'), function(b){
      b.addEventListener('click', function(){ S.car = +b.getAttribute('data-car'); startRide(); });
    });
  })();
  function paintCars(){
    var fromLine = S.station.fromLine;
    Array.prototype.forEach.call(document.querySelectorAll('#cars .car'), function(b){
      b.style.background = fromLine.color; b.style.color = inkFor(fromLine.color);
    });
  }

  function startGame(stationId){
    readColors();
    var station = STATIONS.filter(function(s){ return s.id === stationId; })[0];
    var D = diffFor(station.level);
    var crowd = CROWDS[pickWeighted(D.crowdWeights)];
    S = {
      mode:currentMode, station:station, diff:D, crowd:crowd,
      time:START, depart: currentMode==='trial' ? START + station.rideMinutes*60 + 999999 : START + station.rideMinutes*60 + D.margin,
      delay:0, car:0, elapsed:null,
      layout:makeLayout(), npcs:[], usedLower:null, usedUpper:null, escWait:0, done:false
    };
    buildWalk();
    spawnWaiting();
    setBoardTag(station.toLine);
    renderBoard();
    $('crowdInfo').textContent = '今日の混み具合：'+S.crowd.label;
    $('carTitle').textContent = station.fromLine.name+'の何号車に乗りますか？';
    show('scCar');
    paintCars();
    $('previewBox').classList.toggle('hidden', !D.mapVisible);
    $('noMap').classList.toggle('hidden', D.mapVisible);
    if(D.mapVisible){ previewCtx = fitCanvas($('preview')); drawMap(previewCtx, false); }
  }

  /* ===== 乗車中 ===== */
  function pickEvent(){
    var total = EVENTS.reduce(function(a,e){ return a+e.w; },0), r = Math.random()*total;
    for(var i=0;i<EVENTS.length;i++){
      r -= EVENTS[i].w;
      if(r<=0){
        var d = Math.round(EVENTS[i].d * S.diff.delayMult / 5) * 5;
        return {d:d, msg: d>0 ? EVENTS[i].msg+'（'+d+'秒遅れ）' : EVENTS[i].msg};
      }
    }
    return {d:0, msg:EVENTS[0].msg};
  }
  function drawStations(now){
    var stops = S.station.stops, color = S.station.fromLine.color;
    var html = '<div class="stations-bar" style="background:'+color+'"></div>';
    html += stops.map(function(n,i){
      var c = i===now ? 'now' : (i<now ? 'passed' : '');
      var style = i<=now ? 'border-color:'+color+';'+(i<now?'background:'+color:'') : '';
      return '<div class="st '+c+'"><i style="'+style+'"></i>'+n+'</div>';
    }).join('');
    $('stations').innerHTML = html;
  }
  function addLog(t){ var li=document.createElement('li'); li.textContent=t; $('rideLog').appendChild(li); }
  var rideTimer = null;
  function startRide(){
    show('scRide');
    var station = S.station, n = station.stops.length - 1, RIDE = station.rideMinutes*60;
    $('rideTitle').textContent = station.fromLine.name+'に乗っています';
    $('rideLog').innerHTML = '';
    $('btnGetOff').classList.add('hidden');
    drawStations(0);
    addLog(clock(S.time)+'　'+station.from+'を発車しました。'+(S.car+1)+'号車に乗っています。');
    var i = 0;
    function step(){
      i++;
      var ev = pickEvent();
      S.delay += ev.d;
      S.time = START + RIDE*(i/n) + S.delay;
      drawStations(i); renderBoard();
      if(i < n){ addLog(clock(S.time)+'　'+station.stops[i]+'。'+ev.msg); rideTimer = setTimeout(step, 1200); }
      else{
        addLog(clock(S.time)+'　'+station.to+'に着きました。'+(S.delay ? '合計'+S.delay+'秒遅れです。' : '遅れはありません。'));
        $('btnGetOff').classList.remove('hidden'); $('btnGetOff').focus();
      }
    }
    clearTimeout(rideTimer);
    rideTimer = setTimeout(step, 1200);
  }
  $('btnGetOff').addEventListener('click', startTransfer);

  /* ===== 乗り換え中 ===== */
  var raf = null, last = 0, keys = {};
  function setMsg(t, warn){ var m=$('tMsg'); m.textContent=t; m.classList.toggle('warn', !!warn); }
  function warn(t){
    if(S.elapsed - (S.lastWarn||-9) < 1.5 && S.lastWarnText === t) return;
    S.lastWarn = S.elapsed; S.lastWarnText = t; S.warnUntil = S.elapsed + 2.2;
    setMsg(t, true);
  }

  function startTransfer(){
    S.time += DOOR;
    S.elapsed = 0; S.spawnT = 0; S.zone = null; S.warnUntil = 0;
    S.zoneMsg = {
      yplat: S.station.fromLine.name+'のホーム。上の階段かエスカレーターへ向かいましょう。',
      lower: '連絡通路へ上っています。',
      conc:  '連絡通路。'+S.station.toLine.name+'のホームへ行く階段かエスカレーターを探しましょう。',
      upper: S.station.toLine.name+'のホームへ下りています。',
      tplat: S.station.toLine.name+'のホーム。電車の白いドアの前まで行けば乗れます。'
    };
    // 通路の人を先に動かしておく
    for(var t=0; t<25; t+=0.1){ S.spawnT -= 0.1; if(S.spawnT<=0){ spawnFlow(); S.spawnT = S.crowd.interval*rnd(0.6,1.4); } updNPC(0.1); }
    spawnAlighting();
    S.p = {x:yDoorX(S.car), y:404, mode:'walk', target:null};
    show('scTransfer');
    mapCtx = fitCanvas($('map'));
    setMsg('行きたい場所を指でタッチすると、そこへ歩きます。上の階段かエスカレーターを目指しましょう。');
    renderBoard();
    last = performance.now();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(loop);
  }

  function toWorld(e){
    var r = $('map').getBoundingClientRect();
    return {x:(e.clientX-r.left)/r.width*W, y:(e.clientY-r.top)/r.height*H};
  }
  var dragging = false;
  function setTarget(e){
    if(!S || S.done || !S.p) return;
    var w = toWorld(e);
    S.p.target = w;
    if(w.y > 160 && w.y < 290 && (w.x < 34 || w.x > 326)){
      warn('そこは出口の改札です。駅の外に出ると乗り換えできません。');
    }
  }
  $('map').addEventListener('pointerdown', function(e){ e.preventDefault(); dragging = true; try{ $('map').setPointerCapture(e.pointerId); }catch(_){} setTarget(e); });
  $('map').addEventListener('pointermove', function(e){ if(dragging){ e.preventDefault(); setTarget(e); } });
  ['pointerup','pointercancel'].forEach(function(t){ $('map').addEventListener(t, function(){ dragging = false; }); });
  document.addEventListener('keydown', function(e){
    if($('scTransfer').classList.contains('hidden')) return;
    if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].indexOf(e.key) >= 0){ keys[e.key] = true; e.preventDefault(); }
  });
  document.addEventListener('keyup', function(e){ keys[e.key] = false; });

  function zoneOf(y){ return y < 96 ? 'tplat' : y < 160 ? 'upper' : y <= 290 ? 'conc' : y < 354 ? 'lower' : 'yplat'; }

  function updPlayer(dt){
    var P = S.p;

    if(P.mode === 'queue'){
      P.qt -= dt;
      if(P.qt <= 0){ P.mode = 'esc'; setMsg('エスカレーターに乗りました。'); }
      else setMsg('エスカレーターの列に並んでいます…');
      return;
    }
    if(P.mode === 'esc'){
      P.y -= 55*dt;
      var landY = P.esc.top - 10;
      if(P.y <= landY){ P.y = landY; P.mode = 'walk'; P.target = null; }
      return;
    }

    // キーボード
    var kx = (keys.ArrowRight?1:0) - (keys.ArrowLeft?1:0), ky = (keys.ArrowDown?1:0) - (keys.ArrowUp?1:0);
    if(kx || ky) P.target = {x:P.x + kx*30, y:P.y + ky*30};
    if(!P.target) return;

    var dx = P.target.x - P.x, dy = P.target.y - P.y, d = Math.hypot(dx,dy);
    if(d < 2){ P.target = null; return; }

    // エスカレーターの乗り口
    var esc = S.layout.all;
    for(var i=0;i<esc.length;i++){
      var c = esc[i];
      if(c.type !== 'esc') continue;
      if(Math.abs(P.x-c.x) < 15 && P.y >= c.bottom && P.y <= c.bottom+10 && -dy > Math.abs(dx)){
        if(c.dir === 'toward'){
          var cnt = S.npcs.filter(function(n){ return Math.hypot(n.x-c.x, n.y-(c.bottom+8)) < 26; }).length;
          P.qt = 0.4 + cnt*0.35 + rnd(0,0.8);
          S.escWait += P.qt*SCALE;
          P.mode = 'queue'; P.esc = c; P.x = c.x; P.target = null;
          if(c.level==='lower') S.usedLower = S.usedLower || connName(c); else S.usedUpper = S.usedUpper || connName(c);
          return;
        }else{
          warn('この'+connName(c)+'は反対向きです。ほかの階段かエスカレーターを使いましょう。');
        }
      }
    }

    // 速さ
    var factor = 1, inStairs = null;
    S.layout.all.forEach(function(c){
      if(c.type==='stairs' && Math.abs(P.x-c.x) < 15 && P.y > c.top && P.y < c.bottom) inStairs = c;
    });
    if(inStairs){
      factor = inStairs.level==='lower' ? 0.55 : 0.7;
      if(inStairs.level==='lower') S.usedLower = S.usedLower || '階段'; else S.usedUpper = S.usedUpper || '階段';
    }
    var near = 0;
    S.npcs.forEach(function(n){
      var ex = n.x-P.x, ey = n.y-P.y, nd = Math.hypot(ex,ey);
      if(nd < 11){
        near++;
        if(nd > 0.01){ var push = (11-nd)*(n.stay?0.15:0.4); n.x += ex/nd*push; n.y += ey/nd*push; }
      }
    });
    var crowdF = Math.max(0.3, 1 - 0.22*near);
    if(crowdF < 0.6) warn('人が多くて進みにくい！');

    var step = Math.min(d, SPEED*factor*crowdF*dt);
    var nx = P.x + dx/d*step, ny = P.y + dy/d*step;
    if(canStand(nx,ny)){ P.x = nx; P.y = ny; }
    else if(canStand(nx,P.y)){ P.x = nx; }
    else if(canStand(P.x,ny)){ P.y = ny; }

    // 乗れたか
    if(P.y < 48){
      for(var k=0;k<10;k++){
        if(Math.abs(P.x - tDoorX(k)) < 10){ finish(true); return; }
      }
    }
  }

  function loop(now){
    var dt = Math.min(0.05, (now-last)/1000); last = now;
    if(!S || S.done) return;
    S.elapsed += dt;
    S.time += dt*SCALE;
    S.spawnT -= dt;
    if(S.spawnT <= 0){ spawnFlow(); S.spawnT = S.crowd.interval*rnd(0.6,1.4); }
    updNPC(dt);
    updPlayer(dt);
    if(S.done) return;

    var z = zoneOf(S.p.y);
    if(z !== S.zone){ S.zone = z; if(S.elapsed > 0.5 && S.elapsed >= S.warnUntil) setMsg(S.zoneMsg[z]); }
    else if(S.warnUntil && S.elapsed >= S.warnUntil && S.p.mode==='walk'){ S.warnUntil = 0; setMsg(S.zoneMsg[z]); }

    drawMap(mapCtx, true);
    renderBoard();
    if(S.mode !== 'trial' && S.time >= S.depart){ finish(false); return; }
    raf = requestAnimationFrame(loop);
  }

  /* ===== 結果 ===== */
  function finish(ok){
    if(S.done) return;
    S.done = true;
    cancelAnimationFrame(raf);
    var station = S.station;
    var title = $('rTitle');
    var rows = [
      ['駅', station.from+' → '+station.to+'（Lv.'+station.level+'）'],
      ['混み具合', S.crowd.label],
      [station.fromLine.name+'の遅れ', S.delay ? S.delay+'秒' : 'なし'],
      ['乗った車両', (S.car+1)+'号車'],
      ['上りに使ったもの', S.usedLower || '—'],
      ['下りに使ったもの', S.usedUpper || '—'],
      ['エスカレーター待ち', S.escWait ? '約'+Math.round(S.escWait)+'秒' : 'なし']
    ];

    if(S.mode === 'trial'){
      var elapsed = S.elapsed;
      var tr = loadJSON(TRIAL_KEY);
      var best = tr[station.id];
      var isRecord = (best == null || elapsed < best);
      if(isRecord){ tr[station.id] = elapsed; saveJSON(TRIAL_KEY, tr); }
      renderBoard();
      title.className = 'result-title ok';
      title.textContent = 'ゴール！';
      $('rText').textContent = isRecord
        ? 'タイム '+elapsed.toFixed(1)+'秒。自己ベストを更新しました！'
        : 'タイム '+elapsed.toFixed(1)+'秒。自己ベストは'+best.toFixed(1)+'秒です。';
      rows.unshift(['タイム', elapsed.toFixed(1)+'秒'], ['自己ベスト', (isRecord?elapsed:best).toFixed(1)+'秒']);
    }else{
      if(!ok) S.time = Math.max(S.time, S.depart);
      renderBoard();
      var margin = Math.floor(S.depart - S.time);
      var st = loadJSON(STAT_KEY), r = st[station.id] || {play:0, win:0, best:null};
      r.play++;
      if(ok){ r.win++; if(r.best == null || margin > r.best) r.best = margin; }
      st[station.id] = r; saveJSON(STAT_KEY, st);

      if(ok){
        title.className = 'result-title ok';
        title.textContent = '乗り換え成功！';
        $('rText').textContent = margin >= 60 ? '発車の'+margin+'秒前に乗れました。余裕がありました。'
          : margin >= 20 ? '発車の'+margin+'秒前に乗れました。'
          : '発車の'+margin+'秒前。本当にギリギリでした！';
      }else{
        title.className = 'result-title ng';
        title.textContent = '間に合いませんでした';
        var z = zoneOf(S.p.y);
        $('rText').textContent = (z==='tplat' || z==='upper')
          ? station.toLine.name+'のホームまで来ましたが、ドアが閉まりました。'
          : z === 'conc' ? '連絡通路にいる間に、'+station.toLine.name+'が発車しました。'
          : station.fromLine.name+'のホームにいる間に、'+station.toLine.name+'が発車しました。';
      }
    }
    $('rDetail').innerHTML = rows.map(function(x){ return '<dt>'+x[0]+'</dt><dd>'+x[1]+'</dd>'; }).join('');
    setTimeout(function(){ show('scResult'); $('btnRetry').focus(); }, (S.mode==='trial'||ok) ? 500 : 900);
  }

  $('btnRetry').addEventListener('click', function(){ startGame(S.station.id); });
  $('btnTop').addEventListener('click', function(){ S = null; renderBoard(); renderStats(); show('scMode'); });

  renderBoard();
  renderStats();
})();
