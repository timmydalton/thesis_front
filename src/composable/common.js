import { get } from 'lodash'
import moment from "moment"

export const setCookie = (cname, cvalue, exdays = 365 * 100) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export const getCookieDecode = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export const formatNumber = value => {
  value = value ? value.toString() : '0';
  value = value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1.`)
  
  return value
}

export const removeCookie = (name) => {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export const escapeHTML = (unsafe = '') =>
  unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")

export const unescapeHTML = (safe = '') =>
  safe
    .replace(/\&lt\;/g, "<")
    .replace(/\&gt\;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')

export const convertVN = str => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/[^a-zA-Z0-9/, ]/g, '');
  return str;
};

export const traversal = (node, callback, parent) => {
  callback(node, parent)

  if (!Array.isArray(node.children)) return

  node.children.forEach(child => traversal(child, callback, node))
}

export function getStyle(element, key, value) {
  return get(element, ['style', key], value)
}
export function getConfig(element, key, value) {
  return get(element, ['config', key], value)
}

//Parse all mouse/touch event coordinates to x-y
export function eventParser(e) {
  if (e.nativeEvent) e = e.nativeEvent
    const changedTouches = e.changedTouches || []
    const touchPoints = e.targetTouches || []
    const detail = e.detail && e.detail.x ? e.detail : null
    return {
      id: detail
        ? detail.identifier
          ? detail.identifier
          : 'i'
        : !touchPoints[0]
        ? 'd'
        : touchPoints[0]
        ? touchPoints[0].identifier
        : 'e',
      idChanged: detail
        ? detail.identifier
          ? detail.identifier
          : 'i'
        : !changedTouches[0]
        ? 'd'
        : changedTouches[0]
        ? changedTouches[0].identifier
        : 'e',
      raw: e,
      x:
        detail && detail.x
          ? detail.x
          : touchPoints[0]
          ? touchPoints[0].screenX
          : detail
          ? detail.x
          : e.pageX,
      y:
        detail && detail.y
          ? detail.y
          : touchPoints[0]
          ? touchPoints[0].screenY
          : detail
          ? detail.y
          : e.pageY,
    }
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export const PROPERTY_NOW_SHOW = ['top', 'left', 'width', 'height']

//This is not used anymore
export const getCenterArea = () => {
  const dom = document.getElementById('design-area')

  return {
    top: dom.offsetHeight / 2,
    left: dom.offsetWidth / 2
  }
}

export const getAttrString = (variation) => {
  const fields = variation.fields || []

  return fields.map(f => f.value).join('/')
}

export const getOrderStatus = () => [
  {
    id: -1,
    text: "Tất cả",
  },
  {
    id: 0,
    text: "Đơn mới",
    bgColor: "#00a2ae",
  },
  {
    id: 1,
    text: "Đã xác nhận",
    bgColor: "#1890ff",
    icon: "CheckboxIcon"
  },
  {
    id: 2,
    text: "Đã gửi hàng",
    bgColor: "#f79009",
    icon: "TruckDeliveryIcon",
  },
  {
    id: 3,
    text: "Đã nhận",
    bgColor: "#3dbd7d",
    icon: "HeartHandshakeIcon",
  },
  {
    id: 6,
    text: "Đã hủy",
    bgColor: "#d73435",
    icon: "CircleXIcon",
  },
  {
    id: 7,
    text: "Xóa gần đây",
    bgColor: "#962223",
    icon: "TrashIcon",
  },
];

export const formatDateTime = (timezone, time, full, format, options = {}) => {
  if (timezone != 0) {
    timezone = timezone || 7
  }
  let timeAndZone = typeof time === "number" ? moment(time, "X") : moment.utc(time)
  timeAndZone = timezone ? timeAndZone.utcOffset(parseFloat(timezone)) : timeAndZone

  if (full) return moment(timeAndZone).format(format || "HH:mm DD/MM/YYYY")
  if (format) return moment(timeAndZone).format(format)
  if (options.hideText) {
    return moment(timeAndZone).calendar(null, {
      sameDay: `HH:mm [hôm nay]`,
      nextDay: `HH:mm [ngày mai]`,
      nextWeek: "HH:mm DD/MM",
      lastDay: `HH:mm [hôm qua]`,
      lastWeek: "HH:mm DD/MM",
      sameElse: `HH:mm DD/MM/YYYY`,
    })
  }
  return moment(timeAndZone).calendar(null, {
    sameDay: `HH:mm [hôm nay]`,
    nextDay: `HH:mm [ngày mai]`,
    nextWeek: "HH:mm DD/MM",
    lastDay: `HH:mm [hôm qua]`,
    lastWeek: "HH:mm DD/MM",
    sameElse: `HH:mm [ngày] DD/MM/YYYY`,
  })
}

export const sha256 = function sha256(ascii) {
  function rightRotate(value, amount) {
      return (value>>>amount) | (value<<(32 - amount));
  };
  
  var mathPow = Math.pow;
  var maxWord = mathPow(2, 32);
  var lengthProperty = 'length'
  var i, j; // Used as a counter across the whole file
  var result = ''

  var words = [];
  var asciiBitLength = ascii[lengthProperty]*8;
  
  //* caching results is optional - remove/add slash from front of this line to toggle
  // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
  // (we actually calculate the first 64, but extra values are just ignored)
  var hash = sha256.h = sha256.h || [];
  // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
  var k = sha256.k = sha256.k || [];
  var primeCounter = k[lengthProperty];
  /*/
  var hash = [], k = [];
  var primeCounter = 0;
  //*/

  var isComposite = {};
  for (var candidate = 2; primeCounter < 64; candidate++) {
      if (!isComposite[candidate]) {
          for (i = 0; i < 313; i += candidate) {
              isComposite[i] = candidate;
          }
          hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
          k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
      }
  }
  
  ascii += '\x80' // Append Ƈ' bit (plus zero padding)
  while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
  for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      if (j>>8) return; // ASCII check: only accept characters in range 0-255
      words[i>>2] |= j << ((3 - i)%4)*8;
  }
  words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
  words[words[lengthProperty]] = (asciiBitLength)
  
  // process each chunk
  for (j = 0; j < words[lengthProperty];) {
      var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
      var oldHash = hash;
      // This is now the undefinedworking hash", often labelled as variables a...g
      // (we have to truncate as well, otherwise extra entries at the end accumulate
      hash = hash.slice(0, 8);
      
      for (i = 0; i < 64; i++) {
          var i2 = i + j;
          // Expand the message into 64 words
          // Used below if 
          var w15 = w[i - 15], w2 = w[i - 2];

          // Iterate
          var a = hash[0], e = hash[4];
          var temp1 = hash[7]
              + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
              + ((e&hash[5])^((~e)&hash[6])) // ch
              + k[i]
              // Expand the message schedule if needed
              + (w[i] = (i < 16) ? w[i] : (
                      w[i - 16]
                      + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
                      + w[i - 7]
                      + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
                  )|0
              );
          // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
          var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
              + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
          
          hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
          hash[4] = (hash[4] + temp1)|0;
      }
      
      for (i = 0; i < 8; i++) {
          hash[i] = (hash[i] + oldHash[i])|0;
      }
  }
  
  for (i = 0; i < 8; i++) {
      for (j = 3; j + 1; j--) {
          var b = (hash[i]>>(j*8))&255;
          result += ((b < 16) ? 0 : '') + b.toString(16);
      }
  }
  return result;
};