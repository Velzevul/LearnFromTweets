!function(){"use strict";function t(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),n&&(t.__proto__=n)}function n(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function e(t,n,e,o){for(var r=0,i=t.length,a=[],s=void 0;i>r&&(s=n.next(t[r]));)n=s,r++;if(r>=i)return[];for(;i-1>r;)s=new h(o),a.push(s),n.on(t[r],s),n=s,r++;return s=new h(e),a.push(s),n.on(t[i-1],s),a}function o(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),n&&(t.__proto__=n)}function r(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function i(t){return t instanceof d||t instanceof _}function a(t){return t}function s(t,n){return"url"===n?"_blank":null}function u(t){return t=t||{},{attributes:t.linkAttributes||null,defaultProtocol:t.defaultProtocol||"http",events:t.events||null,format:t.format||a,formatHref:t.formatHref||a,newLine:t.newLine||!1,nl2br:!!t.newLine||t.nl2br||!1,tagName:t.tagName||"a",target:t.target||s,linkClass:t.linkClass||"linkified"}}function l(t){for(var n=arguments.length,e=Array(n>1?n-1:0),o=1;n>o;o++)e[o-1]=arguments[o];return"function"==typeof t?t.apply(void 0,e):t}function c(t){if(t&&t.__esModule)return t;var n={};if(null!=t)for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n["default"]=t,n}var p={__esModule:!0},f=function(){function t(e){n(this,t),this.j=[],this.T=e||null}return t.prototype.on=function(t,n){if(t instanceof Array)for(var e=0;e<t.length;e++)this.j.push([t[e],n]);else this.j.push([t,n])},t.prototype.next=function(t){for(var n=0;n<this.j.length;n++){var e=this.j[n],o=e[1];if(this.test(t,e[0]))return o}return!1},t.prototype.accepts=function(){return!!this.T},t.prototype.test=function(t,n){return t===n},t.prototype.emit=function(){return this.T},t}(),h=function(e){function o(){n(this,o),null!=e&&e.apply(this,arguments)}return t(o,e),o.prototype.test=function(t,n){return t===n||n instanceof RegExp&&n.test(t)},o}(f),g=function(e){function o(){n(this,o),null!=e&&e.apply(this,arguments)}return t(o,e),o.prototype.test=function(t,n){return t instanceof n},o}(f);p.CharacterState=h,p.TokenState=g,p.stateify=e;var m={__esModule:!0},y=function(){function t(n){r(this,t),this.v=n}return t.prototype.toString=function(){return this.v+""},t}(),d=function(t){function n(){r(this,n),null!=t&&t.apply(this,arguments)}return o(n,t),n}(y),b=function(t){function n(){r(this,n),t.call(this,"@")}return o(n,t),n}(y),v=function(t){function n(){r(this,n),t.call(this,":")}return o(n,t),n}(y),k=function(t){function n(){r(this,n),t.call(this,".")}return o(n,t),n}(y),w=function(t){function n(){r(this,n),null!=t&&t.apply(this,arguments)}return o(n,t),n}(y),x=function(t){function n(){r(this,n),null!=t&&t.apply(this,arguments)}return o(n,t),n}(y),O=function(t){function n(){r(this,n),t.call(this,"\n")}return o(n,t),n}(y),L=function(t){function n(){r(this,n),null!=t&&t.apply(this,arguments)}return o(n,t),n}(y),S=function(t){function n(){r(this,n),t.call(this,"+")}return o(n,t),n}(y),T=function(t){function n(){r(this,n),t.call(this,"#")}return o(n,t),n}(y),j=function(t){function n(){r(this,n),null!=t&&t.apply(this,arguments)}return o(n,t),n}(y),z=function(t){function n(){r(this,n),t.call(this,"?")}return o(n,t),n}(y),N=function(t){function n(){r(this,n),t.call(this,"/")}return o(n,t),n}(y),A=function(t){function n(){r(this,n),null!=t&&t.apply(this,arguments)}return o(n,t),n}(y),_=function(t){function n(){r(this,n),null!=t&&t.apply(this,arguments)}return o(n,t),n}(y),C=function(t){function n(){r(this,n),null!=t&&t.apply(this,arguments)}return o(n,t),n}(y),U={Base:y,DOMAIN:d,AT:b,COLON:v,DOT:k,PUNCTUATION:w,LOCALHOST:x,NL:O,NUM:L,PLUS:S,POUND:T,QUERY:z,PROTOCOL:j,SLASH:N,SYM:A,TLD:_,WS:C},M=function(){function t(n){r(this,t),this.v=n,this.type="token",this.isLink=!1}return t.prototype.toString=function(){for(var t=[],n=0;n<this.v.length;n++)t.push(this.v[n].toString());return t.join("")},t.prototype.toHref=function(){return this.toString()},t.prototype.toObject=function(t){return{type:this.type,value:this.toString(),href:this.toHref(void 0===t?"http":t)}},t}(),P=function(t){function n(e){r(this,n),t.call(this,e),this.type="email",this.isLink=!0}return o(n,t),n.prototype.toHref=function(){return"mailto:"+this.toString()},n}(M),E=function(t){function n(e){r(this,n),t.call(this,e),this.type="text"}return o(n,t),n}(M),D=function(t){function n(e){r(this,n),t.call(this,e),this.type="nl"}return o(n,t),n}(M),H=function(t){function n(e){r(this,n),t.call(this,e),this.type="url",this.isLink=!0}return o(n,t),n.prototype.toHref=function(t){t=void 0===t?"http":t;for(var n=!1,e=!1,o=this.v,r=[],a=0;o[a]instanceof j;)n=!0,r.push(o[a].toString().toLowerCase()),a++;for(;o[a]instanceof N;)e=!0,r.push(o[a].toString()),a++;for(;i(o[a]);)r.push(o[a].toString().toLowerCase()),a++;for(;a<o.length;a++)r.push(o[a].toString());return r=r.join(""),n||e||(r=t+"://"+r),r},n.prototype.hasProtocol=function(){return this.v[0]instanceof j},n}(M),q={Base:M,EMAIL:P,NL:D,TEXT:E,URL:H};m.text=U,m.multi=q;var R={__esModule:!0},I=m,Y=p,Q=function(t){return new Y.TokenState(t)},B=I.text.DOMAIN,K=I.text.AT,W=I.text.COLON,X=I.text.DOT,F=I.text.PUNCTUATION,G=I.text.LOCALHOST,J=I.text.NL,V=I.text.NUM,Z=I.text.PLUS,$=I.text.POUND,tt=I.text.PROTOCOL,nt=I.text.QUERY,et=I.text.SLASH,ot=I.text.SYM,rt=I.text.TLD,it=I.multi.EMAIL,at=I.multi.NL,st=I.multi.TEXT,ut=I.multi.URL,lt=Q(),ct=Q(),pt=Q(),ft=Q(),ht=Q(),gt=Q(),mt=Q(ut),yt=Q(),dt=Q(ut),bt=Q(),vt=Q(),kt=Q(ut),wt=Q(),xt=Q(ut),Ot=Q(ut),Lt=Q(),St=Q(),Tt=Q(),jt=Q(it),zt=Q(),Nt=Q(it),At=Q(),_t=Q(),Ct=Q(),Ut=Q(at);lt.on(J,Ut),lt.on(tt,ct),lt.on(et,pt),ct.on(et,pt),pt.on(et,ft),lt.on(rt,ht),lt.on(B,ht),lt.on(G,mt),lt.on(V,ht),ft.on(rt,bt),ft.on(B,bt),ft.on(V,bt),ft.on(G,kt),ht.on(X,gt),bt.on(X,vt),St.on(X,Tt),gt.on(rt,mt),gt.on(B,ht),gt.on(V,ht),gt.on(G,ht),vt.on(rt,kt),vt.on(B,bt),vt.on(V,bt),vt.on(G,bt),Tt.on(rt,jt),Tt.on(B,St),Tt.on(V,St),Tt.on(G,St),mt.on(X,gt),kt.on(X,vt),jt.on(X,Tt),mt.on(W,yt),mt.on(et,Ot),yt.on(V,dt),dt.on(et,Ot),kt.on(W,wt),kt.on(et,Ot),wt.on(V,xt),xt.on(et,Ot),jt.on(W,zt),zt.on(V,Nt);var Mt=[B,K,G,V,Z,$,tt,et,rt,ot],Pt=[W,X,nt,F];Ot.on(Mt,Ot),Lt.on(Mt,Ot),Ot.on(Pt,Lt),Lt.on(Pt,Lt);var Et=[B,V,Z,$,nt,ot,rt];ht.on(Et,At),ht.on(K,_t),gt.on(Et,At),mt.on(Et,At),mt.on(K,_t),At.on(Et,At),At.on(K,_t),At.on(X,Ct),Ct.on(Et,At),_t.on(rt,St),_t.on(B,St),_t.on(G,jt);var Dt=function(t){for(var n=t.length,e=0,o=[],r=[];n>e;){for(var i=lt,a=null,s=null,u=0,l=null,c=-1;n>e&&!(a=i.next(t[e]));)r.push(t[e++]);for(;n>e&&(s=a||i.next(t[e]));)a=null,i=s,i.accepts()?(c=0,l=i):c>=0&&c++,e++,u++;if(0>c)for(u=e-u;e>u;u++)r.push(t[u]);else 0<r.length&&(o.push(new st(r)),r=[]),e-=c,u-=c,i=l.emit(),o.push(new i(t.slice(e-u,e)))}return 0<r.length&&o.push(new st(r)),o},Ht=I.multi,qt=lt;R.State=Y.TokenState,R.TOKENS=Ht,R.run=Dt,R.start=qt;var Rt={__esModule:!0},It=m,Yt=p,Qt="abogado ac academy accountants active actor ad adult ae aero af ag agency ai airforce al allfinanz alsace am an android ao aq aquarelle ar archi army arpa as asia associates at attorney au auction audio autos aw ax axa az ba band bar bargains bayern bb bd be beer berlin best bf bg bh bi bid bike bio biz bj black blackfriday bloomberg blue bm bmw bn bnpparibas bo boo boutique br brussels bs bt budapest build builders business buzz bv bw by bz bzh ca cab cal camera camp cancerresearch capetown capital caravan cards care career careers casa cash cat catering cc cd center ceo cern cf cg ch channel cheap christmas chrome church ci citic city ck cl claims cleaning click clinic clothing club cm cn co coach codes coffee college cologne com community company computer condos construction consulting contractors cooking cool coop country cr credit creditcard cricket crs cruises cu cuisinella cv cw cx cy cymru cz dad dance dating day de deals degree delivery democrat dental dentist desi diamonds diet digital direct directory discount dj dk dm dnp do domains durban dvag dz eat ec edu education ee eg email emerck energy engineer engineering enterprises equipment er es esq estate et eu eurovision eus events everbank exchange expert exposed fail farm fashion feedback fi finance financial firmdale fish fishing fitness fj fk flights florist flsmidth fly fm fo foo forsale foundation fr frl frogans fund furniture futbol ga gal gallery gb gbiz gd ge gent gf gg gh gi gift gifts gives gl glass gle global globo gm gmail gmo gmx gn google gop gov gp gq gr graphics gratis green gripe gs gt gu guide guitars guru gw gy hamburg haus healthcare help here hiphop hiv hk hm hn holdings holiday homes horse host hosting house how hr ht hu ibm id ie il im immo immobilien in industries info ing ink institute insure int international investments io iq ir irish is it je jetzt jm jo jobs joburg jp juegos kaufen ke kg kh ki kim kitchen kiwi km kn koeln kp kr krd kred kw ky kz la lacaixa land latrobe lawyer lb lc lds lease legal lgbt li life lighting limited limo link lk loans london lotto lr ls lt ltda lu luxe luxury lv ly ma madrid maison management mango market marketing mc md me media meet melbourne meme memorial menu mg mh miami mil mini mk ml mm mn mo mobi moda moe monash money mormon mortgage moscow motorcycles mov mp mq mr ms mt mu museum mv mw mx my mz na nagoya name navy nc ne net network neustar new nexus nf ng ngo nhk ni ninja nl no np nr nra nrw nu nyc nz okinawa om ong onl ooo org organic otsuka ovh pa paris partners parts party pe pf pg ph pharmacy photo photography photos physio pics pictures pink pizza pk pl place plumbing pm pn pohl poker porn post pr praxi press pro prod productions prof properties property ps pt pub pw py qa qpon quebec re realtor recipes red rehab reise reisen reit ren rentals repair report republican rest restaurant reviews rich rio rip ro rocks rodeo rs rsvp ru ruhr rw ryukyu sa saarland sarl sb sc sca scb schmidt schule science scot sd se services sexy sg sh shiksha shoes si singles sj sk sl sm sn so social software sohu solar solutions soy space spiegel sr st su supplies supply support surf surgery suzuki sv sx sy sydney systems sz taipei tatar tattoo tax tc td technology tel tf tg th tienda tips tirol tj tk tl tm tn to today tokyo tools top town toys tp tr trade training travel trust tt tui tv tw tz ua ug uk university uno uol us uy uz va vacations vc ve vegas ventures versicherung vet vg vi viajes villas vision vlaanderen vn vodka vote voting voto voyage vu wales wang watch webcam website wed wedding wf whoswho wien wiki williamhill wme work works world ws wtc wtf xxx xyz yachts yandex ye yoga yokohama youtube yt za zip zm zone zw".split(" "),Bt=/[0-9]/,Kt=/[a-z0-9]/,Wt=":",Xt=[],Ft=function(t){return new Yt.CharacterState(t)},Gt=It.text.DOMAIN,Jt=It.text.LOCALHOST,Vt=It.text.NUM,Zt=It.text.PROTOCOL,$t=It.text.TLD,tn=It.text.WS,nn=Ft(),en=Ft(Vt),on=Ft(Gt),rn=Ft(),an=Ft(tn);nn.on("@",Ft(It.text.AT)),nn.on(".",Ft(It.text.DOT)),nn.on("+",Ft(It.text.PLUS)),nn.on("#",Ft(It.text.POUND)),nn.on("?",Ft(It.text.QUERY)),nn.on("/",Ft(It.text.SLASH)),nn.on(Wt,Ft(It.text.COLON)),nn.on(/[,;!]/,Ft(It.text.PUNCTUATION)),nn.on(/\n/,Ft(It.text.NL)),nn.on(/\s/,an),an.on(/[^\S\n]/,an);for(var sn=0;sn<Qt.length;sn++){var un=Yt.stateify(Qt[sn],nn,$t,Gt);Xt.push.apply(Xt,un)}var ln=Yt.stateify("file",nn,Gt,Gt),cn=Yt.stateify("ftp",nn,Gt,Gt),pn=Yt.stateify("http",nn,Gt,Gt);Xt.push.apply(Xt,ln),Xt.push.apply(Xt,cn),Xt.push.apply(Xt,pn);var fn=ln.pop(),hn=cn.pop(),gn=pn.pop(),mn=Ft(Gt),yn=Ft(Zt);hn.on("s",mn),gn.on("s",mn),Xt.push(mn),fn.on(Wt,yn),hn.on(Wt,yn),gn.on(Wt,yn),mn.on(Wt,yn);var dn=Yt.stateify("localhost",nn,Jt,Gt);for(Xt.push.apply(Xt,dn),nn.on(Bt,en),en.on("-",rn),en.on(Bt,en),en.on(Kt,on),on.on("-",rn),on.on(Kt,on),sn=0;sn<Xt.length;sn++)Xt[sn].on("-",rn),Xt[sn].on(Kt,on);rn.on("-",rn),rn.on(Bt,on),rn.on(Kt,on),nn.on(/./,Ft(It.text.SYM));var bn=function(t){for(var n=t.toLowerCase(),e=t.length,o=0,r=[];e>o;){for(var i=nn,a=null,s=0,u=null,l=-1;e>o&&(a=i.next(n[o]));)i=a,i.accepts()?(l=0,u=i):l>=0&&l++,s++,o++;0>l||(o-=l,s-=l,i=u.emit(),r.push(new i(t.substr(o-s,s))))}return r},vn=nn;Rt.State=Yt.CharacterState,Rt.TOKENS=It.text,Rt.run=bn,Rt.start=vn;var kn={__esModule:!0};kn.normalize=u,kn.resolve=l;var wn={__esModule:!0},xn=kn,On=c(xn),Ln=Rt,Sn=c(Ln),Tn=R,jn=c(Tn);Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)});var zn=function(t){return jn.run(Sn.run(t))},Nn=function(t,n){for(var e=void 0===n?null:n,o=zn(t),r=[],i=0;i<o.length;i++)!o[i].isLink||e&&o[i].type!==e||r.push(o[i].toObject());return r},An=function(t,n){var e=void 0===n?null:n,o=zn(t);return 1===o.length&&o[0].isLink&&(!e||o[0].type===e)};wn.find=Nn,wn.options=On,wn.parser=jn,wn.scanner=Sn,wn.test=An,wn.tokenize=zn,window.linkify=wn}();
;(function (linkify) {
"use strict";
var tokenize = linkify.tokenize, options = linkify.options;
/**
	Convert strings of text into linkable HTML text
*/

'use strict';

function cleanText(text) {
	return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function cleanAttr(href) {
	return href.replace(/"/g, '&quot;');
}

function attributesToString(attributes) {

	if (!attributes) return '';
	var result = [];

	for (var attr in attributes) {
		var val = (attributes[attr] + '').replace(/"/g, '&quot;');
		result.push('' + attr + '="' + cleanAttr(val) + '"');
	}
	return result.join(' ');
}

function linkifyStr(str) {
	var opts = arguments[1] === undefined ? {} : arguments[1];

	opts = options.normalize(opts);

	var tokens = tokenize(str),
	    result = [];

	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i];
		if (token.isLink) {

			var href = token.toHref(opts.defaultProtocol),
			    formatted = options.resolve(opts.format, token.toString(), token.type),
			    formattedHref = options.resolve(opts.formatHref, href, token.type),
			    attributesHash = options.resolve(opts.attributes, href, token.type),
			    tagName = options.resolve(opts.tagName, href, token.type),
			    linkClass = options.resolve(opts.linkClass, href, token.type),
			    target = options.resolve(opts.target, href, token.type);

			var link = '<' + tagName + ' href="' + cleanAttr(formattedHref) + '" class="' + cleanAttr(linkClass) + '"';
			if (target) {
				link += ' target="' + cleanAttr(target) + '"';
			}

			if (attributesHash) {
				link += ' ' + attributesToString(attributesHash);
			}

			link += '>' + cleanText(formatted) + '</' + tagName + '>';
			result.push(link);
		} else if (token.type === 'nl' && opts.nl2br) {
			if (opts.newLine) {
				result.push(opts.newLine);
			} else {
				result.push('<br>\n');
			}
		} else {
			result.push(cleanText(token.toString()));
		}
	}

	return result.join('');
}

if (!String.prototype.linkify) {
	String.prototype.linkify = function (options) {
		return linkifyStr(this, options);
	};
}
window.linkifyStr = linkifyStr;
})(window.linkify);
// Closure
(function() {
    /**
     * Decimal adjustment of a number.
     *
     * @param {String}  type  The type of adjustment.
     * @param {Number}  value The number.
     * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
     * @returns {Number} The adjusted value.
     */
    function decimalAdjust(type, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Decimal round
    if (!Math.round10) {
        Math.round10 = function(value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    // Decimal floor
    if (!Math.floor10) {
        Math.floor10 = function(value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    // Decimal ceil
    if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }
})();
var NOW = moment();

function dateToPoint(date) {
  // 0    to 3*60        minutes
  // 3*60  to 6*60       minutes
  // 6*60  to 12*60      minutes
  // 12*60  to 24*60     minutes
  // 24*60 to 3*24*60    minutes
  // 3*24*60 to 7*24*60  minutes
  var diff = NOW.diff(date, 'minutes');

  if (diff <= 3*60) {
    return diff/60;
  } else if (diff <= 6*60) {
    return 3 + (diff - 3*60)/(3*60);
  } else if (diff <= 12*60) {
    return 4 + (diff - 6*60)/(6*60);
  } else if (diff <= 24*60) {
    return 5 + (diff - 12*60)/(12*60);
  } else if (diff <= 3*24*60) {
    return 6 + (diff - 24*60)/(24*60);
  } else if (diff <= 7*24*60) {
    return 8 + (diff - 3*24*60)/(4*24*60);
  } else {
    return 9;
  }
}

function pointToDate(point) {
  var date = moment(NOW);

  if (point <= 3) {
    date.subtract(point*60, 'minutes');
  } else if (point <= 4) {
    point = point - 3;
    date.subtract(3, 'hours')
      .subtract(point*3*60, 'minutes');
  } else if (point <= 5) {
    point = point - 4;
    date.subtract(6, 'hours')
      .subtract(point*6*60, 'minutes');
  } else if (point <= 6) {
    point = point - 5;
    date.subtract(12, 'hours')
      .subtract(point*12*60, 'minutes');
  } else if (point <= 8) {
    point = point - 6;
    date.subtract(1, 'days')
      .subtract(point*24*60, 'minutes');
  } else if (point <= 9) {
    point = point - 8;
    date.subtract(3, 'days')
      .subtract(point*3*24*60, 'minutes');
  } else {
    date.subtract(7, 'days');
  }

  return date;
}
(function(window) {
  'use strict';

  var app = angular.module('tweetsToSoftware',
    [
      'app-templates',
      'angularMoment',
      'ngRoute',
      'ngSanitize',
      'truncate'
    ])
    .config(['$routeProvider', function($routeProvider){
      $routeProvider
          // admin & journal pages for field study
          //.when('/add-tweet',{
          //  templateUrl: 'admin.html',
          //  controller: 'adminController'
          //})
          //.when('/journal',{
          //  templateUrl: 'journal.html',
          //  controller: 'journalController'
          //})
          .when('/', {
            templateUrl: 'app.html',
            controller: 'mainController'
          })
          .otherwise({
            redirectTo: '/'
          });
    }]);

  app.factory('switterServer', function() {
    if (typeof(DEVELOPMENT) === 'undefined') {
      return '//vdziubak.com:8000'; // production environment
    } else {
      return '//0.0.0.0:7000'; // development environment
    }
  });

  app.factory('rootPrefix', function() {
    if (typeof(DEVELOPMENT) === 'undefined') {
      return '/switter';
    } else {
      return '';
    }
  });

  // store participant for the field study

  app.factory('currentParticipant', function() {
  //  var participantId = localStorage.getItem('switter-participant');
  //
  //  if (!participantId) {
  //    while (!participantId) {
  //      participantId = prompt('Please, enter your participant number');
  //    }
  //
  //    localStorage.setItem('switter-participant', participantId);
  //  }
  //
  //  return participantId;
      return 0;
  });

  //app.run(function(currentParticipant, LoggerService) {
  //  console.log('participant nubmer ' + currentParticipant);
  //  LoggerService.log('Started the application (refresh)');
  //});

  window.app = app;
})(window);
angular.module('tweetsToSoftware')
  .factory('FilterService', function() {
    'use strict';

    return {
      activeTweetId: null,
      selectedCommand: null,
      selectedMenu: null,
      renderFrom: moment(NOW),
      renderUntil: moment(NOW).subtract(3, 'hours'),
      bannedAuthors: {},
      bannedCommands: {},
      promotedAuthors: {},
      promotedCommands: {}
    };
  });
angular.module('tweetsToSoftware')
  .factory('LockService', function(currentParticipant, switterServer, $http) {
    'use strict';

    return {
      checkIfLocked: function(tweetId) {
        return $http.get(switterServer + '/api/locks/' + tweetId);
      },
      lock: function(tweetId) {
        var lock = {
            id: tweetId,
            user_id: currentParticipant
          };

        return $http.post(switterServer + '/api/locks', lock);
      }
    }
  });
function Log(data) {
  this.message = data.msg;
  this.participant_id = data.participantId;
  this.created_at = moment().format();
}

angular.module('tweetsToSoftware')
  .factory('LoggerService', function(currentParticipant, switterServer,
                                     $http) {
    'use strict';

    return {
      log: function(msg) {
        // logging of interaction for the field study
        //var log = new Log({
        //  msg: msg,
        //  participantId: currentParticipant
        //});
        //
        //$http.post(switterServer + '/logger/logs', log);
      }
    }
  });
function Menu(name) {
  this.name = name;
  this.all = [];
  this.byId = {};
  this.terminalItems = [];

  this.isOpen = false;
}

Menu.prototype.randomItem = function() {
  var randomIndex = Math.floor(Math.random()*this.terminalItems.length);

  return this.terminalItems[randomIndex];
};

Menu.prototype.populate = function(items) {
  var self = this;

  items.forEach(function(item) {
    self.all.push(new MenuItem(item, []));
  });
  populateIdMap(this.all, this.byId);

  for (itemId in this.byId) {
    if (this.byId.hasOwnProperty(itemId) &&
        this.byId[itemId].children.length == 0) {
      this.terminalItems.push(this.byId[itemId]);
    }
  }

  function populateIdMap(all, target) {
    all.forEach(function(one) {
      if (!one.divider) {
        if (target[one.id]) {
          console.error('entry already exists:', target[one.id], one);
        } else {
          target[one.id] = one;
        }

        if (one.children) {
          populateIdMap(one.children, target);
        }
      }
    });
  }

  return this;
};

Menu.prototype.close = function() {
  this.all.forEach(function(item) {
    item.propagate(function(i) {
      i.isOpen = false;
      i.isHighlighted = false;
    });
  });

  this.isOpen = false;

  return this;
};

Menu.prototype.resetCounters = function() {
  this.all.forEach(function(item) {
    item.propagate(function(i) {
      i.tweetsCount = 0;
    });
  });

  return this;
};

function MenuItem(item, parents) {
  if (!item.divider) {
    var self = this;
    this.id = item.id;
    this.label = item.label;
    this.tweetsCount = 0;

    // TODO: add promoted and banned commands

    if (item.largeIcon) {
      this.largeIcon = item.largeIcon;
    }

    this.isOpen = false;
    this.isHighlighted = false;

    this.children = [];
    this.parents = parents;

    if (item.children) {
      var childParents = [];
      parents.forEach(function(p) {
        childParents.push(p);
      });
      childParents.push(this);

      item.children.forEach(function(child) {
        self.children.push(new MenuItem(child, childParents));
      });
    }
  } else {
    this.divider = true;
  }
}

MenuItem.prototype.propagate = function(callback) {
  callback(this);

  if (this.children) {
    this.children.forEach(function(child) {
      if (!child.divider) {
        child.propagate(callback);
      }
    });
  }
};

MenuItem.prototype.highlight = function() {
  this.isHighlighted = true;

  if (this.parents) {
    this.parents.forEach(function(p) {
      p.isHighlighted = true;
    });
  }

  return this;
};

MenuItem.prototype.dim = function() {
  this.isHighlighted = false;

  if (this.parents) {
    this.parents.forEach(function (p) {
      p.isHighlighted = false;
    });
  }

  return this;
};

MenuItem.prototype.open = function() {
  this.isOpen = true;

  if (this.parents) {
    this.parents.forEach(function (p) {
      p.isOpen = true;
    });
  }

  return this;
};

MenuItem.prototype.close = function() {
  this.isOpen = false;

  if (this.parents) {
    this.parents.forEach(function (p) {
      p.isOpen = false;
    });
  }

  return this;
};

MenuItem.prototype.increaseCounter = function() {
  this.tweetsCount++;

  if (this.parents) {
    this.parents.forEach(function (p) {
      p.tweetsCount++;
    });
  }

  return this;
};

angular.module('tweetsToSoftware')
  .factory('MenuService', function(rootPrefix, $timeout, $http, $q) {
    'use strict';

    var menu = new Menu('menu'),
        toolbar = new Menu('toolbar'),
        panelbar = new Menu('panelbar'),
        promise;

    console.time('Menu load');
    console.log(rootPrefix);
    promise = $q.all([
      $http.get(rootPrefix + '/data/menu.json'),
      $http.get(rootPrefix + '/data/tools.json'),
      $http.get(rootPrefix + '/data/panels.json')
    ])
      .then(function(response) {
        console.timeEnd('Menu load');
        console.time('Menu processing');

        menu.populate(response[0].data);
        toolbar.populate(response[1].data);
        panelbar.populate(response[2].data);

        console.timeEnd('Menu processing');
      });

    return {
      loaded: promise,
      menu: menu,
      toolbar: toolbar,
      panelbar: panelbar
    };
  });
function Tweets() {
  this.all = [];
  this.filtered = [];
}

Tweets.prototype.populate = function(tweets) {
  var self = this;

  tweets.forEach(function(t) {
    self.all.push(new Tweet(t));
  });
};

Tweets.prototype.filter = function(afterTime, beforeTime, menu, command) {
  this.filtered = this.all.filter(function(t) {
    var tweet = t.retweetedStatus || t,
        match = t.createdAt.isAfter(beforeTime) && t.createdAt.isBefore(afterTime);

    if (command) {
      match = match && (tweet[menu.name].indexOf(command) !== -1);
    }

    return match;
  });
};

Tweets.prototype.haveCommand = function(menu, command) {
  return this.all.filter(function(t) {
    if (command) {
      var tweet = t.retweetedStatus || t;

      return tweet[menu.name].indexOf(command) !== -1;
    } else {
      return true;
    }
  });
};

Tweets.prototype.mockDates = function() {
  function randomizeDate(minutesBack) {
    var distance = Math.floor(Math.random()*minutesBack);
    return moment().subtract(distance, 'minutes');
  }

  var randomDates = [];
  this.all.forEach(function(t,i) {
    if (i<3) {
      randomDates.push(randomizeDate(300));
    } else if (i<8) {
      randomDates.push(randomizeDate(1000));
    } else if (i<15) {
      randomDates.push(randomizeDate(6000));
    } else {
      randomDates.push(randomizeDate(10000));
    }
  });

  randomDates.sort(function(a,b) { return a < b ? 1 : -1; });

  this.all.forEach(function(t,i) {
    t.createdAt = randomDates[i];
  });

  this.filtered = this.all;
};

Tweets.prototype.populateCommands = function(menus) {
  this.all.forEach(function(tweet) {
    menus.forEach(function(menu) {
      tweet.populateCommands(menu);
    });
  });
};

function Tweet(tweet) {
  this.id = tweet.id;
  this.createdAt = moment(tweet.created_at);
  this.favoriteCount = tweet.favorite_count;
  this.text = linkifyStr(tweet.text);

  this.author = new Author(tweet.author);
  this.retweetedStatus = tweet.retweeted_status ?
                          new Tweet(tweet.retweeted_status) : null;
  this.retweetedBy = tweet.retweeted_by ?
                      tweet.retweeted_by.map(function(a) {
                        return new Author(a);
                      }) : null;

  this.previewImageUrl = tweet.preview_image_url;

  this.menuItemIds = {};
  this.menuItemIds['menu'] = tweet.menu_items ? tweet.menu_items.split(',') : [];
  this.menuItemIds['panelbar'] = tweet.panelbar_items ? tweet.panelbar_items.split(',') : [];
  this.menuItemIds['toolbar'] = tweet.toolbar_items ? tweet.toolbar_items.split(',') : [];
}

Tweet.prototype.populateCommands = function(menu) {
  // mock commands in production for demo purposes
  //if (typeof(DEVELOPMENT) === 'undefined') {
  //  var self = this;
  //
  //  this[menu.name] = [];
  //
  //  // we do not deal with retweets for simplicity...
  //  this.menuItemIds[menu.name].forEach(function(id) {
  //    self[menu.name].push(menu.byId[id]);
  //  });
  //} else {
    var randomMenuItems = [],
        n = Math.floor(Math.random()*5);

    while (randomMenuItems.length < n) {
      var randomItem = menu.randomItem();

      while (randomMenuItems.indexOf(randomItem) != -1) {
        randomItem = menu.randomItem();
      }

      randomMenuItems.push(randomItem);
    }

    if (this.retweetedStatus) {
      this.retweetedStatus[menu.name] = randomMenuItems;
    } else {
      this[menu.name] = randomMenuItems;
    }
  //}
};

function Author(author) {
  this.screenName = author.screen_name;
  this.name = author.name;
  this.profileImageUrl = author.profile_image_url;
}

angular.module('tweetsToSoftware')
  .factory('TweetService', function(switterServer, $http) {
    'use strict';

    var tweets = new Tweets(),
      promise;

    console.time('Tweets load');
    promise = $http.get(switterServer + '/api/tweets')
      .then(function(response) {
        console.timeEnd('Tweets load');
        console.time('Tweets population');

        tweets.populate(response.data);

        // uncomment when working with real data
        //if (typeof(DEVELOPMENT) !== 'undefined') {
          tweets.mockDates();
        //}

        console.timeEnd('Tweets population');
      });

    return {
      loaded: promise,
      tweets: tweets
    };
  });
angular.module('tweetsToSoftware')
  .controller('adminController', function(MenuService, switterServer, currentParticipant,
                                          LoggerService, LockService,
                                          $scope, $http) {
    'use strict';

    LoggerService.log('Enter admin page');

    $scope.menuItems = MenuService.menu;
    $scope.panelbarItems = MenuService.panelbar;
    $scope.toolbarItems = MenuService.toolbar;

    $scope.selectedMenuItems = [];
    $scope.selectedPanelbarItems = [];
    $scope.selectedToolbarItems = [];

    $scope.addMenuItem = function() {
      $scope.selectedMenuItems.push({});
    };
    $scope.addPanelbarItem = function() {
      $scope.selectedPanelbarItems.push({});
    };
    $scope.addToolbarItem = function() {
      $scope.selectedToolbarItems.push({});
    };

    $scope.removeMenuItem = function(item) {
      $scope.selectedMenuItems.splice($scope.selectedMenuItems.indexOf(item), 1);
    };
    $scope.removePanelbarItem = function(item) {
      $scope.selectedPanelbarItems.splice($scope.selectedPanelbarItems.indexOf(item), 1);
    };
    $scope.removeToolbarItem = function(item) {
      $scope.selectedToolbarItems.splice($scope.selectedToolbarItems.indexOf(item), 1);
    };

    $scope.check = function() {
      LockService.checkIfLocked($scope.tweetId)
        .then(function(r) {
          if (r.data.user_id === currentParticipant) {
            $scope.tweetStatus = 'OK. This tweet id has been reserved by you in the past';
          } else {
            $scope.tweetStatus = 'RESERVED. This tweet id has been reserved by ' + r.data.user_id;
          }
        }, function() {
          $scope.tweetStatus = 'FREE. This tweet id had not been processed yet, reserving under your name...';
          LockService.lock($scope.tweetId)
            .then(function() {
              $scope.tweetStatus = 'OK. This tweet id has been reserved by you';
            });
        });
    };

    $scope.submit = function() {
      $http.get(switterServer + '/twitter-api/tweets/' + $scope.tweetId)
        .then(function(r) {
          var tweetData = r.data;

          tweetData.preview_image_url = $scope.previewImageUrl;
          tweetData.menu_items = $scope.selectedMenuItems.map(function(item) {
            return item.id;
          }).join(',') || null;
          tweetData.panelbar_items = $scope.selectedPanelbarItems.map(function(item) {
            return item.id;
          }).join(',') || null;
          tweetData.toolbar_items = $scope.selectedToolbarItems.map(function(item) {
            return item.id;
          }).join(',') || null;

          $http.post(switterServer + '/api/tweets', {tweet: JSON.stringify(tweetData)})
            .then(function(r) {
              alert('Tweet was successfully added!');
              $scope.tweetId = null;
              $scope.previewImageUrl = null;

              $scope.selectedMenuItems = [];
              $scope.selectedToolbarItems = [];
              $scope.selectedPanelbarItems = [];
              $scope.tweetStatus = null;
            });
        });
    };

    /**
     * common for all menus
     */
    $scope.activateItem = function(menu, item) {
      if (item.children.length === 0) {
        menu.close();

        var target;

        if (menu.name === 'menu') {
          target = $scope.selectedMenuItems;
        } else if (menu.name === 'panelbar') {
          target = $scope.selectedPanelbarItems;
        } else if (menu.name === 'toolbar') {
          target = $scope.selectedToolbarItems;
        }

        target.push(angular.copy(item));
      }
    };

    $scope.itemHoverHandler = function(menu, item) {
      menu.close();
      item.highlight().open();
      menu.isOpen = true;
    };

    $scope.itemLeaveHandler = function(item) {
      if (item.children.length === 0) {
        item.isHighlighted = false;
      }
    };

    $scope.rootItemHoverHandler = function(menu, rootItem) {
      if (menu.isOpen) {
        menu.close();
        rootItem.open();
        menu.isOpen = true;
      }
      rootItem.highlight();
    };

    $scope.rootItemClickHandler = function(menu, rootItem) {
      rootItem.highlight();

      if (menu.isOpen) {
        menu.close();
      } else {
        menu.close();
        rootItem.open();
        menu.isOpen = true;
      }
    };

    $scope.rootItemLeaveHandler = function(menu, rootItem) {
      if (!menu.isOpen) {
        rootItem.isHighlighted = false;
      }
    };
  });
function Entry() {
  this.interestingTweetsFound = '';
  this.interestingTweetsDescription = '';
  this.newThingsLearnt = '';
  this.newThingsDescription = '';
  this.freeFormFeedback = '';

  this.errors = {};
}

Entry.prototype.isValid = function() {
  this.errors = {};

  if (this.interestingTweetsFound === '') {
    this.errors.interestingTweetsFound = 'have to choose one';
  }
  if (this.interestingTweetsDescription === '') {
    this.errors.interestingTweetsDescription = 'cannot be blank';
  }
  if (this.newThingsLearnt === '') {
    this.errors.newThingsLearnt = 'have to choose one';
  }
  if (this.newThingsDescription === '') {
    this.errors.newThingsDescription = 'cannot be blank';
  }

  console.log(this);

  return angular.equals(this.errors, {});
};

Entry.prototype.toJson = function() {
  return {
    interesting_tweets_found: this.interestingTweetsFound,
    interesting_tweets_description: this.interestingTweetsDescription,
    new_things_learnt: this.newThingsLearnt,
    new_things_description: this.newThingsDescription,
    free_form_feedback: this.freeFormFeedback
  }
};

angular.module('tweetsToSoftware')
  .controller('journalController', function(switterServer, currentParticipant, LoggerService,
                                            $scope, $http, $location) {
    'use strict';

    LoggerService.log('Enter journal page');

    $scope.entry = new Entry();
    $scope.participantId = currentParticipant;

    $scope.submit = function() {
      if ($scope.entry.isValid()) {
        var data = $scope.entry.toJson();

        data.participant_id = currentParticipant;
        data.created_at = moment().format();

        $http.post(switterServer + '/logger/journals', data)
          .then(function() {
            alert('thank you for you feedback!');
            LoggerService.log('Submitted journal entry');
            $location.path('/');
          });
      }
    }
  });
angular.module('tweetsToSoftware')
  .controller('mainController', function(TweetService, MenuService, FilterService, LoggerService,
                                         $scope, $q) {
    'use strict';

    LoggerService.log('Enter main app page');

    $scope.tweets = TweetService.tweets;
    $scope.menu = MenuService.menu;
    $scope.toolbar = MenuService.toolbar;
    $scope.panelbar = MenuService.panelbar;

    $scope.filters = FilterService;

    $q.all([
      TweetService.loaded,
      MenuService.loaded
    ])
      .then(function() {
        $scope.tweets.populateCommands([
          $scope.menu,
          $scope.toolbar,
          $scope.panelbar
        ]);

        filterHandler();
        $scope.$watchGroup([
            'filters.selectedCommand',
            'filters.renderFrom',
            'filters.renderUntil'
          ], filterHandler);
      });

    function filterHandler() {
      console.log('filter handler');

      var processedTweetIds = {};

      $scope.filters.activeTweetId = null;
      $scope.tweets.filter(
        $scope.filters.renderFrom,
        $scope.filters.renderUntil,
        $scope.filters.selectedMenu,
        $scope.filters.selectedCommand);

      $scope.menu.resetCounters();
      $scope.panelbar.resetCounters();
      $scope.toolbar.resetCounters();
      $scope.tweets.filtered.forEach(function(t) {
        var tweet = t.retweetedStatus || t;

        // avoid processing retweets multiple times
        if (!processedTweetIds[tweet.id]) {
          processedTweetIds[tweet.id] = true;

          ['menu', 'toolbar', 'panelbar'].forEach(function(menuName) {
            tweet[menuName].forEach(function(item) {
              item.increaseCounter();
            });
          });
        }
      });
    }

    /**
     * common for all menus
     */
    $scope.activateItem = function(menu, item) {
      if (item.children.length === 0) {
        menu.close();

        $scope.filters.selectedMenu = menu;
        $scope.filters.selectedCommand = item;
        LoggerService.log("Focused on command (" + menu.name + "): " + item.id);
      }
    };

    $scope.itemHoverHandler = function(menu, item) {
      menu.close();
      item.highlight().open();
      menu.isOpen = true;
      LoggerService.log("Hovered over command (" + menu.name + "): " + item.id);
    };

    $scope.itemLeaveHandler = function(item) {
      if (item.children.length === 0) {
        item.isHighlighted = false;
      }
    };

    $scope.rootItemHoverHandler = function(menu, rootItem) {
      if (menu.isOpen) {
        menu.close();
        rootItem.open();
        menu.isOpen = true;
      }
      rootItem.highlight();

      LoggerService.log("Hovered over command (" + menu.name + "): " + rootItem.id);
    };

    $scope.rootItemClickHandler = function(menu, rootItem) {
      rootItem.highlight();

      if (menu.isOpen) {
        menu.close();
      } else {
        menu.close();
        rootItem.open();
        menu.isOpen = true;
      }
    };

    $scope.rootItemLeaveHandler = function(menu, rootItem) {
      if (!menu.isOpen) {
        rootItem.isHighlighted = false;
      }
    };
  });
angular.module('tweetsToSoftware')
    .directive('activity', function($q, TweetService, MenuService, FilterService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'activity.html',
            scope: {},
            replace: true,
            controller: function($scope) {
                $scope.filters = FilterService.filters;

                $q.all([
                    TweetService.loaded,
                    MenuService.loaded
                ])
                    .then(function() {
                        registerTweets(TweetService.tweets.all);

                        $scope.$watchGroup([
                            'filters.time',
                            'filters.highlightUnfamiliar',
                            'filters.highlightRelevant'
                        ], function() {
                            registerTweets(TweetService.tweets.all);
                        });
                    });

                function registerTweets(tweets) {
                    console.time('Tweet registration');

                    MenuService.resetTweets();
                    angular.forEach(tweets, function(t) {
                        if (FilterService.matchTweet(t)) {
                            register(t);
                        }
                    });

                    console.timeEnd('Tweet registration');

                    function register(tweet) {
                        if (tweet.tweet.commands) {
                            angular.forEach(tweet.tweet.commands, function(c) {
                                MenuService.registerTweet(tweet, c, MenuService.menu);
                            });
                        }

                        if (tweet.tweet.tools) {
                            angular.forEach(tweet.tweet.tools, function(t) {
                                MenuService.registerTweet(tweet, t, MenuService.toolbar);
                            });
                        }

                        if (tweet.tweet.panels) {
                            angular.forEach(tweet.tweet.panels, function(p) {
                                MenuService.registerTweet(tweet, p, MenuService.panelbar);
                            });
                        }
                    }
                }

            }
        };
    });

angular.module('tweetsToSoftware')
  .directive('topMenu', function($document) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'menu.html',
      scope: {
        menu: '=',
        itemActivateCallback: '=',
        itemHoverCallback: '=',
        itemLeaveCallback: '=',
        rootItemClickCallback: '=',
        rootItemHoverCallback: '=',
        rootItemLeaveCallback: '='
      },
      link: function($scope) {
        $document.on('click', function(e) {
          var targetIsMenu =  $(e.target).parents('.js-top-menu').length ||
                              $(e.target).hasClass('js-top-menu');

          if ($scope.menu.isOpen && !targetIsMenu) {
            console.log('menu close');
            $scope.menu.close();
            $scope.$apply();
          }
        });
      }
    };
  });

angular.module('tweetsToSoftware')
  .directive('panelbar', function(rootPrefix, $document) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'panelbar.html',
      scope: {
        menu: '=',
        itemActivateCallback: '=',
        itemHoverCallback: '=',
        itemLeaveCallback: '=',
        rootItemClickCallback: '=',
        rootItemHoverCallback: '=',
        rootItemLeaveCallback: '='
      },
      controller: function($scope) {
        $scope.rootPrefix = rootPrefix;
      },
      link: function($scope) {
        $document.on('click', function(e) {
          var targetIsMenu =  $(e.target).parents('.js-panelbar').length ||
                              $(e.target).hasClass('js-panelbar');

          if ($scope.menu.isOpen && !targetIsMenu) {
            console.log('panelbar close');
            $scope.menu.close();
            $scope.$apply();
          }
        });
      }
    };
  });
angular.module('tweetsToSoftware')
  .directive('timeline', function(rootPrefix, TweetService, FilterService,
                                  LoggerService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'timeline.html',
      replace: true,
      scope: {
        tweets: '='
      },
      link: function($scope) {
        $scope.filters = FilterService;

        function plotPoints() {
          console.log('plotting points');

          var matchingTweets = $scope.tweets.haveCommand($scope.filters.selectedMenu, $scope.filters.selectedCommand),
              points = matchingTweets.map(function(t) {
                return dateToPoint(t.createdAt);
              });

          svg.selectAll('.data-point')
            .remove();

          svg.selectAll('.data-point')
            .data(points)
            .enter().append('circle')
            .attr('class', 'data-point')
            .attr('r', 3)
            .attr('opacity', 0.5)
            .attr('transform', function(d) { return 'translate(10,' + y(d) + ')'; });
        }

        TweetService.loaded
          .then(function() {
            plotPoints();
            makeBrush();

            $scope.$watch('filters.selectedCommand', function() {
              plotPoints();
              makeBrush();
            });

            $scope.$watchGroup([
              'filters.renderFrom',
              'filters.renderUntil'
            ], function() {
              LoggerService.log('Filtered timeline from ' + $scope.filters.renderFrom.format() + ' to ' + $scope.filters.renderUntil.format());
            });
          });

        var margin = {
            top: 20,
            bottom: 20,
            left: 30,
            right: 10
          },
          width = 150 - margin.left - margin.right,
          height = $('#js-timeline').height() - margin.top - margin.bottom,
          ticks = [
            'Now',
            '1 hour',
            '2 hours',
            '3 hours',
            '6 hours',
            '12 hours',
            '1 day',
            '2 days',
            '3 days',
            '1 week'
          ],
          gBrush;

        var y = d3.scale.linear()
          .range([0, height])
          .domain([0, 9])
          .clamp(true);

        var brush = d3.svg.brush()
          .y(y)
          .extent([dateToPoint($scope.filters.renderFrom), dateToPoint($scope.filters.renderUntil)])
          .on('brush', brushmove);

        var svg = d3.select('#js-timeline').append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

        var axis = d3.svg.axis()
          .scale(y)
          .orient('right')
          .ticks(9)
          .tickFormat(function(v) {
            return ticks[v];
          })
          .tickSize(0)
          .tickPadding(12);

        svg.append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(10,0)')
          .call(axis);

        function makeBrush() {
          svg.selectAll('.brush')
            .remove();

          gBrush = svg.append('g')
            .attr('class', 'brush')
            .call(brush);

          gBrush.selectAll('.resize').append('svg:image')
            .attr('xlink:href', rootPrefix + '/images/handle.svg')
            .attr('height', 16)
            .attr('width', 24)
            .attr('y', -8)
            .attr('x', -24)
            .attr('class', 'handle');

          gBrush.selectAll('rect')
            .attr('width', 20);

          gBrush.select(".background")
            .on("mousedown.brush", function() {
              d3.event.stopPropagation();
            });

          gBrush.call(brush.event);
        }

        function brushmove() {
          var extent = brush.extent();

          $scope.filters.renderFrom  = pointToDate(extent[0]);
          $scope.filters.renderUntil = pointToDate(extent[1]);
        }
      }
    }
  });
angular.module('tweetsToSoftware')
  .directive('toolbar', function(rootPrefix, $document) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'toolbar.html',
      scope: {
        menu: '=',
        itemActivateCallback: '=',
        itemHoverCallback: '=',
        itemLeaveCallback: '=',
        rootItemClickCallback: '=',
        rootItemHoverCallback: '=',
        rootItemLeaveCallback: '='
      },
      controller: function($scope) {
        $scope.rootPrefix = rootPrefix;
      },
      link: function($scope) {
        $document.on('click', function(e) {
          var targetIsMenu =  $(e.target).parents('.js-toolbar').length ||
                              $(e.target).hasClass('js-toolbar');

          if ($scope.menu.isOpen && !targetIsMenu) {
            console.log('toolbar close');
            $scope.menu.close();
            $scope.$apply();
          }
        });
      }
    };
  });

angular.module('tweetsToSoftware')
  .directive('tweet', function(FilterService, LoggerService, $sce, $timeout) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'tweet.html',
      replace: true,
      scope: {
        data: '=',
        commandHoverCallback: '=',
        commandLeaveCallback: '=',
        commandClickCallback: '='
      },
      controller: function($scope) {
        $scope.tweet = $scope.data.retweetedStatus || $scope.data;
        $scope.filters = FilterService;

        $scope.commandHover = function(menuName, commandId) {
          if ($scope.filters.activeTweetId === $scope.data.id) {
            $scope.commandHoverCallback(menuName, commandId);
            LoggerService.log("Hovered over command (tweet " + $scope.data.id + " - " + menuName + "): " + commandId);
          }
        };

        $scope.commandHoverEnd = function(menuName, commandId) {
          if ($scope.filters.activeTweetId === $scope.data.id) {
            $scope.commandLeaveCallback(menuName, commandId);
          }
        };

        $scope.commandClick = function(menuName, commandId, event) {
          if ($scope.filters.activeTweetId === $scope.data.id) {
            $scope.commandClickCallback(menuName, commandId, event);
            LoggerService.log("Clicked on command (tweet " + $scope.data.id + " - " + menuName + "): " + commandId);
          }
        };
      },
      link: function($scope, elem, attr) {
        $timeout(function() {
          elem.find('a').on('click', function(event) {
            event.stopPropagation();
            LoggerService.log("Clicked on link (tweet " + $scope.data.id + "): " + event.target.href);
          });
        });
      }
    }
  });
angular.module('tweetsToSoftware')
  .directive('tweetList', function(FilterService, MenuService, LoggerService,
                                   $document, $timeout) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'tweetList.html',
      scope: {
        tweets: '='
      },
      controller: function($scope) {
        var highlightTimeout,
            highlightDelay = 50;

        $scope.filters = FilterService;

        $scope.activateTweet = function(tweet) {

          if($scope.filters.activeTweetId != tweet.id){
            LoggerService.log("Clicked on tweet " + tweet.id);
          }

          $scope.filters.activeTweetId = tweet.id;
        };

        $scope.resetCommandFilter = function() {
          $scope.filters.selectedCommand = null;
          $scope.filters.selectedMenu = null;

          LoggerService.log("Clear command filters");
        };

        $scope.highlightCommand = function(menuName, commandId) {
          clearTimeout(highlightTimeout);
          highlightTimeout = $timeout(function() {
            var menu = MenuService[menuName],
                item = menu.byId[commandId];

            MenuService.menu.close();
            MenuService.panelbar.close();
            MenuService.toolbar.close();

            item.highlight();
          }, highlightDelay).$$timeoutId;
        };

        $scope.dimCommand = function(menuName, commandId) {
          clearTimeout(highlightTimeout);

          var menu = MenuService[menuName],
              item = menu.byId[commandId];

          if (!item.isOpen) {
            item.dim();
          }
        };

        $scope.revealCommandLocation = function(menuName, commandId, event) {
          clearTimeout(highlightTimeout);
          event.stopPropagation();

          var menu = MenuService[menuName],
              item = menu.byId[commandId];

          item.open();
          menu.isOpen = true;
        };
      },
      link: function($scope) {
        $document.on('click', function(e) {
          var isTweet = $(e.target).parents('.js-tweet').length ||
                        $(e.target).hasClass('js-tweet'),
              isMenu  = $(e.target).parents('.js-menu').length ||
                        $(e.target).hasClass('js-menu');

          if (!isTweet && !isMenu) {
            $scope.filters.activeTweetId = null;
            $scope.$apply();
          }
        });
      }
    };
  });