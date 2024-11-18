const Url = {
  // public method for url encoding
  encode: function(string) {
    return escape(this._utf8_encode(string));
  },
  // public method for url decoding
  decode: function(string) {
    return this._utf8_decode(unescape(string));
  },
  // private method for UTF-8 encoding
  _utf8_encode: function(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  },
  // private method for UTF-8 decoding
  _utf8_decode: function(utftext) {
    var string = "";
    var i = 0,
      c2,
      c3;
    var c = (c2 = 0);
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(
          ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
        );
        i += 3;
      }
    }
    return string;
  },
};

const getVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^"#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

const getYoutubeIframe = (vid) => {
  const docWidth = document.body.clientWidth;
  const videoHeight = Math.floor(docWidth / 1.77);
  return `<iframe width="100%" height="${videoHeight}" src="https://www.youtube.com/embed/${vid}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
};

// 商品連結
const productionProductPage = "https://m.shopping.friday.tw/mobileweb/product";

module.exports = {
  version() {
    const versionDate = new Date();
    return (
      versionDate.getMonth() +
      "" +
      versionDate.getDate() +
      "" +
      versionDate.getHours() +
      "" +
      versionDate.getMinutes()
    );
  },
  getYoutubeId(url) {
    return getVideoId(url);
  },
  isMobile() {
    return /mobi(le)?/i.test(navigator.userAgent);
  },
  stopBack() {
    window.onhashchange = function() {
      window.history.forward();
    };
    if (!document.referrer) {
      window.history.pushState(
        null,
        document.title,
        location.href + "#superapp"
      );
      setTimeout(function() {
        document.body.click();
      }, 500);
    }
  },
  checkMweb(path) {
    const pathname = path ? path : "";
    const userAgent = navigator.userAgent;
    if (
      !/(android|iphone)/i.test(userAgent) &&
      !/localhost/i.test(location.origin)
    ) {
      const msub = location.origin.match(/ec2-m(sit2|sit|uat2|uat|stage)/i);
      let dsub = "";
      if (msub && msub[1]) {
        dsub = "ec2-" + msub[1] + ".";
      }
      window.location.href = `https://${dsub}shopping.friday.tw${pathname}${location.search}`;
    }
  },
  openExternalFromLine() {
    let href = window.location.href;

    const u = navigator.userAgent;
    const isLineApp = u.indexOf("Line") > -1; // Line 內建瀏覽器
    // const ua = navigator.userAgent.toLowerCase()
    // const isFbApp = u.indexOf('FBAV') > -1 // FB App 內建瀏覽器
    // const isWeixinApp = ua.match(/MicroMessenger/i) == 'micromessenger' // 微信內建瀏覽器

    if (isLineApp) {
      if (href.indexOf("openExternalBrowser") < 0) {
        // http 網址才處理
        if (href.indexOf("http") != 0 || href.indexOf("//") < 0) {
          return;
        }
        // 網址沒有參數 ? 時, 直接加參數
        if (href.indexOf("?") < 0) {
          href += "?openExternalBrowser=1";
        } else {
          // 網址有參數 ? 時, 用 & 加參數
          href += "&openExternalBrowser=1";
        }

        window.location.href = href;
      }
    }
  },
  isLighthouse: (() => {
    return /lighthouse/i.test(navigator.userAgent) ? true : false;
  })(),
  priceFormat(x) {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : null;
    // 每三個數字的位置中間加入 ,
  },
  getProductPageLink(o, exUrl) {
    return (
      productionProductPage +
      `?sid=${o.sid}&cid=${o.cid}&pid=${o.pid}&mid=${o.mid}${exUrl}`
    );
  },
  urlSearchToObj() {
    const pairs = window.location.search.substring(1).split("&");
    let obj = {};
    let pair, i;
    for (i in pairs) {
      if (pairs[i] === "") continue;

      pair = pairs[i].split("=");
      obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    return obj;
  },
  replaceLineBreak(str) {
    let content = str;
    return content.replace(/\\r\\n/g, "");
  },
  replaceTplImagePath(str) {
    let content = str;
    if (content) {
      content = content.replace(
        /"http:\/\/img.gohappy\.com\.tw\/tpl/gi,
        '"https://img.shopping.friday.tw/tpl'
      );
      content = content.replace(
        /("\/tpl)/gi,
        '"https://img.shopping.friday.tw/tpl'
      );
    }
    return content;
  },
  replaceWidthAndHeight(str) {
    let content = str;
    if (content) {
      content = content.replace(/height:\s?\d+px;?/gi, "");
      content = content.replace(/(width):\s?\d+px;?/gi, "width:100%;");
      content = content.replace(/(height="(\d+)")/gi, "");
      content = content.replace(/(width="(\d+)")/gi, 'width="100%"');
    }
    return content;
  },
  figureToIframe(content) {
    const figureAry = content.match(/<figure(.*?)>(.*?)<\/figure>/gi);
    if (!figureAry || figureAry.length === 0) return content;

    figureAry.forEach((str) => {
      const vId = getVideoId(str);
      if (vId) {
        content = content.replace(str, getYoutubeIframe(vId));
        // content += getYoutubeIframe(vId);
      }
    });

    return content;
  },
  // 金額顯示 依幣金或是純現金
  displayProductPrice(info) {
    let price = 0;
    price = info.price;

    // 幣金顯示處理
    if (info.rewardPointInfo) {
      // 純幣
      if (info.rewardPointInfo.lifeExchangePoint) {
        price = 0;
      }
      // 幣+金
      if (
        info.rewardPointInfo.lifePartialPoint &&
        info.rewardPointInfo.lifePartialPrice
      ) {
        price = info.rewardPointInfo.lifePartialPrice;
      }
    }

    if (info.lifeProduct) {
      price = info.lifePartialPrice;
    }
    return parseInt(price);
  },
  getCookie(name) {
    var mycookie = document.cookie.split("; ");
    for (var i = 0; i < mycookie.length; i++) {
      var cookie1 = mycookie[i].split("=");
      if (cookie1[0] === name) {
        return Url.decode(cookie1[1]);
      }
    }
    return null;
  },
  setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },

  //將api時間格式轉為date格式
  apiTimeFormat(apiDate){  
      let dateArr = apiDate.split(' ')
      let datePieces = dateArr[0].split('/')
      let timePieces = dateArr[1].split(':')
      let formatDate = new Date(datePieces[0] , datePieces[1]-1 , timePieces[2] , timePieces[0] , timePieces[1] , timePieces[2])
      return this.isValidDate(formatDate) ? formatDate : apiDate
  },
  isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }
};
