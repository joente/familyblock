(this.webpackJsonpfamilyblock=this.webpackJsonpfamilyblock||[]).push([[0],{10:function(e,n,i){e.exports=i(21)},11:function(e,n,i){},21:function(e,n,i){"use strict";i.r(n);i(11),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var t=i(0),o=i(1),r=function(e){var n=e.tile,i=e.toCell,t=e.unit,o={target:0,speed:-1},r=function(){o.target=i.getYpos(),o.speed=-5*t.size,n.width=10*t.size,n.height=10*t.size};r();return{animate:function(){return n.container.position.y+=o.speed,n.container.position.y<=o.target&&(i.setTile(n),!0)},normalize:r}},l=function(e){var n=e.tile,i=e.withCell,t=e.direction,o=e.unit,r={target:0,speed:0},l=function(){switch(t){case"up":r.target=i.getYpos();break;case"right":case"left":r.target=i.getXpos();break;default:console.log("unknown direction: ",t)}r.speed=1*o.size,n.width=10*o.size,n.height=10*o.size};l();return{animate:function(){var e=!1;switch(t){case"up":n.container.position.y+=r.speed,e=n.container.position.y>=r.target;break;case"right":n.container.position.x+=r.speed,e=n.container.position.x>=r.target;break;case"left":n.container.position.x-=r.speed,e=n.container.position.x<=r.target;break;default:console.log("unknown direction: ",t)}return!!e&&(n.remove(),i.nextTile(),!0)},normalize:l}},a=function(e){var n=e.stage,i=e.pos,o=e.unit,a=e.col,s=e.row,u=e.cellTexture,c=new t.d(u),f={x:0,y:0,size:0},d=null,h=null;return n.addChild(c),{col:a,row:s,resize:function(){f.x=i.x+10*o.size*a,f.y=i.y+10*o.size*s,f.size=10*o.size,c.visible&&(c.position.x=f.x,c.position.y=f.y,c.width=c.height=f.size),null!==d&&(d.container.position.x=f.x,d.container.position.y=f.y,d.normalize()),null!==h&&h.normalize()},isEmpty:function(){return null===d},hide:function(){return c.visible=!1},setTile:function(e){d&&d.remove(),(d=e).container.position.x=f.x,d.container.position.y=f.y},animate:function(){return h&&!0===h.animate()&&(h=null),null===h},getValue:function(){return null===d?0:d.value},getIndex:function(){return null===d?null:d.index},getXpos:function(){return i.x+10*o.size*a},getYpos:function(){return i.y+10*o.size*s},getTile:function(){return d},moveTileUp:function(e){h=r({toCell:e,tile:d,unit:o}),d=null},mergeTile:function(e,n){h=l({withCell:e,direction:n,tile:d,unit:o}),d=null},nextTile:function(){if(null!==d){var e=d.nextTile();d.container.parent.addChild(e.container),d.remove(),(d=e).container.position.x=f.x,d.container.position.y=f.y}else console.log("tile is null when calling `nextTile()`")}}},s=function(e){var n=e.offset,i=e.ok,t=e.nok,o=e.unit,r=i,l=null,a=function(){if(null===l)return i.visible=!1,void(t.visible=!1);r.visible=!0,r.position.x=n.x+4*o.size+10*l*o.size,r.position.y=n.y+9*o.size,r.width=12*o.size,r.height=72*o.size};return{normalize:a,update:function(e,n){l=e,r&&(r.visible=!1),r=n,a()}}},u=function(e){var n=e.offset,i=e.stage,r=e.unit,l=e.score,u=e.tiles,c={x:0,y:0,w:50,h:70},f=[],d=t.g.from("assets/cell.png"),h=t.g.from("assets/ok.png"),p=t.g.from("assets/nok.png"),g=new t.d(h),v=new t.d(p),z=s({offset:n,ok:g,nok:v,unit:r}),y=!1,w=11;i.addChild(g),i.addChild(v);var x=function(){c.x=n.x+5*r.size,c.y=n.y+10*r.size,c.w=50*r.size,c.h=70*r.size};x();for(var m=0;m<8;m++){f.push([]);for(var T=0;T<5;T++)f[m].push(a({stage:i,pos:c,unit:r,col:T,row:m,cellTexture:d}))}var k=f[7];k.forEach((function(e){return e.hide()}));var b=function(e){return e.x>=c.x&&e.x<c.x+c.w&&e.y>=c.y&&e.y<c.y+c.h?Math.floor((e.x-c.x)/(10*r.size)):null},C=function(e,n){if(null===e)return g;var i,t,r=Object(o.a)(f);try{for(r.s();!(t=r.n()).done;){var l=t.value;if(l===k)break;if(void 0===(i=l[e]))return console.log("undefined cell for col and row: ",e,l),v;if(i.isEmpty())return g}}catch(a){r.e(a)}finally{r.f()}return i.getIndex()===n.index?g:v},M=function(e,n){if(null!==n){var i=b(e);z.update(i,C(i,n))}},P=[],E=[],K=function(e){return E.includes(e)?null:E.push(e)},S=function(){P.length=0,l.update(f.reduce((function(e,n){return n.reduce((function(e,n){return e+n.getValue()}),e)}),0));for(var e=Array(5).fill(0),n=0;n<f.length;n++)for(var i=f[n],t=0;t<i.length;++t){var r=i[t];if(r.isEmpty())e[t]+=1;else{var a=e[t];a>0&&(K(t),r.moveTileUp(f[n-a][t]),P.push(r))}}if(!P.length){console.log("-------"),console.log(E.join(" - "));for(var s=0;s<7;s++){var c,d=Object(o.a)(E);try{var h=function(){var e=c.value,n=f[s][e];if(n.isEmpty())return"continue";[{direction:"right",ce:e>0?f[s][e-1]:null},{direction:"left",ce:e<4?f[s][e+1]:null},{direction:"up",ce:f[s+1][e]}].forEach((function(e){var i=e.direction,t=e.ce;null===t||t.isEmpty()||t.getIndex()!==n.getIndex()||("up"===i?(n.mergeTile(t,i),P.push(n)):(t.mergeTile(n,i),P.push(t)))}))};for(d.s();!(c=d.n()).done;)h()}catch(p){d.e(p)}finally{d.f()}}P.length||(console.log("+++++++"),E.splice(0,E.length),f.reduce((function(e,n){return n.reduce((function(e,n){var i=n.getIndex();return null===i||i<e?e:i}),e)}),0)>=w&&(w+=2,u.nextTarget()),u.newTile(f.reduce((function(e,n){return n.reduce((function(e,n){var i=n.getIndex();return null===i||i>e?e:i}),e)}),999)))}};return{resize:function(){x(),z.normalize(),f.forEach((function(e){return e.forEach((function(e){return e.resize()}))}))},select:M,move:M,final:function(e,n,i){var t=b(e);z.update(null),null!==t&&n&&C(t,n)===g&&i(t)},addTile:function(e,n){k[n].setTile(e),K(n),S()},animate:function(){y=!1;var e,n=Object(o.a)(P);try{for(n.s();!(e=n.n()).done;){!1===e.value.animate()&&(y=!0)}}catch(i){n.e(i)}finally{n.f()}!y&&P.length>0&&S()}}},c=function e(n){var i=n.index,o=n.allTiles,r=n.str,l=n.color,a=n.unit,s=2<<i,u=new t.b,c=new t.c,f=new t.f({fontFamily:"Arial",fontSize:32,fontWeight:"bold",fill:"#ffffff",align:"center",stroke:"#ffffff",strokeThickness:1,lineJoin:"round"}),d=new t.e(r,f),h=function(e){var n=!0===e?7*a.size:10*a.size;c.clear(),c.lineStyle(0,l,1),c.beginFill(l,1),c.drawRoundedRect(1,1,n-2,n-2,.5*a.size),c.endFill(),d.style.fontSize=!0===e?2.6*a.size:3.6*a.size,d.position.x=.5*n-d.width/2,d.position.y=.27*n};return u.addChild(c),u.addChild(d),h(),{index:i,value:s,container:u,normalize:h,dupTile:function(){return e({index:i,allTiles:o,str:r,color:l,unit:a})},nextTile:function(){return o[i+1].dupTile()},remove:function(){return u.parent?u.parent.removeChild(u):null}}},f=function(e){for(var n=e.offset,i=e.stage,r=e.unit,l=[],a=["2","4","8","16","32","64","128","256","512","1K","2K","4K","8K","16K","32K","64K","128K","256K","512K","1M","2M","4M","8M","16M","32M","64M","128M","256M","512M","1T","2T","4T","8T","16T","32T","64T","128T","256T","512T","1P","2P","4P","8P","16P","32P","64P","128P","256P","512P"],s=t.g.from("assets/raster.png"),u=new t.d(s),f=new t.d(s),d=0,h=function(e){return(Math.floor(80*Math.random())+(1&e?32:112)<<16)+(Math.floor(80*Math.random())+(2&e?32:112)<<8)+(Math.floor(80*Math.random())+(4&e?32:112)<<0)},p=0;p<a.length;++p){var g=h(p),v=a[p];l.push(c({index:p,allTiles:l,str:v,color:g,unit:r}))}var z=null,y=null,w=function(){z&&(z.container.position.x=n.x+25*r.size,z.container.position.y=n.y+85*r.size,z.normalize()),y.container.position.x=n.x+36.5*r.size,y.container.position.y=n.y+86.5*r.size,y.normalize(!0)};return i.addChild(u),i.addChild(f),{tileByIndex:function(e){var n=l[e].dupTile();return i.addChild(n.container),n},renderTiles:function(){var e,n=0,t=Object(o.a)(l);try{for(t.s();!(e=t.n()).done;){var r=e.value;i.addChild(r.container),r.container.position.x=100*Math.floor(n/8),r.container.position.y=100*Math.floor(n%8),n++}}catch(a){t.e(a)}finally{t.f()}},newTile:function(e){z=y,y=function(e){var n;(e=z&&z.index<e?z.index:e)<d?n=d-e:(n=0,e=d);var i=Math.floor(Math.random()*(6+n))+e;return l[i].dupTile()}(e),i.addChild(y.container),w()},getCurrentTile:function(){return z},stealCurrentTile:function(){var e=z;return z=null,e},resize:function(){u.position.x=n.x+24*r.size,u.position.y=n.y+84*r.size,u.width=12*r.size,u.height=12*r.size,f.position.x=n.x+36*r.size,f.position.y=n.y+86*r.size,f.width=8*r.size,f.height=8*r.size,w()},nextTarget:function(){return d++}}},d=function(e){var n=e.offset,i=e.stage,o=e.unit,r=new t.f({fontFamily:"Arial",fontSize:32,fontStyle:"italic",fontWeight:"bold",fill:"#eeeeee",align:"center",stroke:"#ffffff",strokeThickness:2,lineJoin:"round"}),l=new t.e((0).toLocaleString(),r),a=function(){l.x=n.x+30*o.size-l.width/2,l.y=n.y+1*o.size};return i.addChild(l),{resize:a,update:function(e){var n=e.toLocaleString();l.text=n,a()}}},h=function(e){var n=e.container,i={size:10},o={x:0,y:0},r=new t.a({width:window.innerWidth,height:window.innerHeight});n.appendChild(r.view),r.renderer.view.style.position="absolute",r.renderer.view.style.display="block",r.renderer.view.style.backgroundColor="#823456",r.renderer.autoResize=!0;var l=new t.b;l.interactive=!0;var a=function(e){var n=c.stealCurrentTile();n&&(p.addTile(n,e),p.animate())};l.on("pointerdown",(function(e){var n=e.data.getLocalPosition(l);p.select(n,c.getCurrentTile())})).on("pointermove",(function(e){var n=e.data.getLocalPosition(l);p.move(n,c.getCurrentTile())})).on("pointerup",(function(e){var n=e.data.getLocalPosition(l);p.final(n,c.getCurrentTile(),a)}));var s=function(){var e=window.innerWidth,n=window.innerHeight;e<.6*n?(i.size=e/60,o.x=0,o.y=(n-100*i.size)/2):(i.size=n/100,o.x=(e-60*i.size)/2,o.y=0)},c=f({offset:o,stage:l,unit:i}),h=d({offset:o,stage:l,unit:i}),p=u({unit:i,offset:o,stage:l,score:h,tiles:c}),g=new t.f({fontFamily:"Arial",fontSize:16,fontStyle:"normal",fontWeight:"normal",fill:"#999999",align:"center",stroke:"#999999",strokeThickness:2,lineJoin:"round"}),v=new t.e("v1.0.4",g);v.position.x=10,v.position.y=10,l.addChild(v),c.newTile(0),c.newTile(0);return s(),p.resize(),c.resize(),h.resize(),{resize:function(){s(),h.resize(),p.resize(),c.resize(),r.renderer.resize(window.innerWidth,window.innerHeight)},animate:function e(){requestAnimationFrame(e),p.animate(),r.renderer.render(l)}}}({container:document.body});"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)})),window.addEventListener("resize",h.resize),h.animate()}},[[10,1,2]]]);
//# sourceMappingURL=main.0c5c6e62.chunk.js.map