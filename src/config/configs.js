/**
 * friDay Mweb Configurations
 */

module.exports = {
  title: '遠傳friDay購物',
  description: '',
  baseUrlPath: () => {
    let schema = "https://";
    let subdomain = "";
    let domain = ".shopping.friday.tw";
    let sub = location.host.match(/([\w-]+)/i);
    if (
      !!sub &&
      !!sub[1] &&
      sub[1] !== "localhost" &&
      sub[1] !== "event" &&
      !/^10/i.test(sub[1])
    ) {
      // for sit, sit2, uat, stage, production. without local and ips.
      subdomain = sub[1];
    } else {
      // for localhost
      schema = 'https://'
      subdomain = 'ec2-msit2'
      domain = '.shopping.friday.tw'
    }

    return schema + subdomain + domain;
  },
  desktopDomain: () => {
    let schema = "https://";
    let subdomain = "";
    let domain = "shopping.friday.tw";
    let sub = location.host.match(/ec2-m(\w+)/i);
    if (!!sub && !!sub[1]) {
      // for sit, sit2, uat, stage
      subdomain = "ec2-" + sub[1] + ".";
    }
    if (location.host === "localhost:8080") {
      subdomain = "ec2-uat.";
    }

    return schema + subdomain + domain;
  },
  cmsImgUrlPath: () => {
    let schema = "https://";
    let subdomain = "img";
    let domain = ".shopping.friday.tw";
    let folder = "/cmsimg";
    let sub = location.host.match(/ec2-([\w-]+)/i);
    if (!!sub && !!sub[1]) {
      // for sit, sit2, uat, stage
      subdomain = "cmsimg-" + sub[1].replace(/^m/, "");
      folder = "";
    } else if (location.host === "localhost:8080") {
      // for localhost
      schema = 'https://'
      subdomain = 'img'
      domain = '.shopping.friday.tw'
      folder = ''
    }

    return schema + subdomain + domain + folder;
  },
  shortCutPath: () => {
    let schema = "https://";
    let subdomain = "";
    let domain = ".shopping.friday.tw";
    let apiRoot = "/mobileapi/";
    let sub = location.host.match(/([\w-]+)/i);
    if (
      !!sub &&
      !!sub[1] &&
      sub[1] !== "localhost" &&
      sub[1] !== "event" &&
      !/^10/i.test(sub[1])
    ) {
      // for sit, sit2, uat, stage, production. without local and ips.
      subdomain = sub[1];
    } else if (sub[1] === "localhost") {
      // for localhost
      subdomain = "m";
      // subdomain = 'ec2-msit2'
    } else {
      schema = "https://";
      subdomain = "m";
      domain = ".shopping.friday.tw";
    }

    return schema + subdomain + domain + apiRoot;
  },
  apiPath: (cusApiRoot) => {
    let schema = "https://";
    let subdomain = "";
    let domain = ".shopping.friday.tw";
    let apiRoot = "/mobileapi/";
    let sub = location.host.match(/([\w-]+)/i);
    if (
      !!sub &&
      !!sub[1] &&
      sub[1] !== "localhost" &&
      sub[1] !== "event" &&
      !/^10/i.test(sub[1])
    ) {
      // for sit, sit2, uat, stage, production. without local and ips.
      subdomain = sub[1];
    } else {
      // for localhost
      schema = "https://";
      subdomain = "m";
      // subdomain = 'ec2-msit2'
      domain = ".shopping.friday.tw";
    }

    if (cusApiRoot) {
      apiRoot = cusApiRoot;
    }

    return schema + subdomain + domain + apiRoot;
  },
  imgDomain: "https://img.shopping.friday.tw/",
  mserviceApiPath: () => {
    let schema = "https://";
    let subdomain = "mservice-event";
    let domain = ".shopping.friday.tw";
    let apiRoot = "/api/";
    let sub = location.host.match(/([\w-]+)/i);
    if (!!sub && !!sub[1] && !/^(m|ec2-mstage)/i.test(sub[1])) {
      // for sit, sit2, uat, stage, production. without local and ips.
      subdomain = "mservice-event-uat";
    }

    // for debug
    if (!!sub && !!sub[1] && /(event|localhost)/i.test(sub[1])) {
      subdomain = "mservice-event";
    }

    return schema + subdomain + domain + apiRoot;
  },
  loginDomain: () => {
    const loc = location.host.match(/([\w-]+)/i);
    if (loc[1] === "localhost") {
      return "//m.shopping.friday.tw/";
    }
    return location.href;
  },
  loginUrl: () => {
    return `//${
      window.location.host
    }/mobileweb/login?requestURL=${encodeURIComponent(location.href)}`;
  },
  loggoutUrl: () => {
    const dev = /ec2-m(sit2|sit|uat)/i.test(location.origin) ? true : false;
    const sso = dev
      ? "https://login2-test.fetnet.net/logout/logout?url="
      : "https://login2.fetnet.net/logout/logout?url=";
    const url = dev
      ? `https://member-test.friday.tw/fri/sso/logout?post_logout_redirect_uri=${location.origin}/mobileweb/logout`
      : `https://member.friday.tw/fri/sso/logout?post_logout_redirect_uri=${location.origin}/mobileweb/logout`;
    return `${sso}${encodeURIComponent(url)}`;
  },
  searchAPI: () => {
    const uat = /ec2-(sit|sit2|uat)/i.test(location.origin) ? "-uat" : "";
    return `https://mservice-event${uat}.shopping.friday.tw/`;
  },
  appConfigs: {
    apn: () =>
      /ec2-muat/i.test(location.host)
        ? "com.gohappy.mobileapp.uat"
        : "com.gohappy.mobileapp",
    isi: "785988886",
    ibi: "tw.com.gohappy.www",
    efr: "1",
    utmcode: "utm_source=friDay&utm_medium=mweb-bar",
    firebaseLink: () =>
      /ec2-muat/i.test(location.host)
        ? "https://fridayshoppingbeta.page.link/"
        : "https://fri.page.link/",
  },
  homepageCoverAdExpire: 259200,
  productionDomain: "https://m.shopping.friday.tw",
  productionProductPage: "https://m.shopping.friday.tw/mobileweb/product",
  livesyncApiPath: "https://mservice-event.shopping.friday.tw/api/livesync",
  homepageProjectFolder: "https://event.shopping.friday.tw/event/homepage/",
  homepageSuperbrandJson: (fileName = "homepage") => {
    const versionDate = new Date();
    const version =
      versionDate.getMonth() +
      "" +
      versionDate.getDate() +
      "" +
      versionDate.getHours() +
      "" +
      versionDate.getMinutes();
    let isBeta = "";
    if (/^(ec2-)/i.test(location.host)) {
      isBeta = "_beta";
    }
    return (
      "https://event.shopping.friday.tw/event/homepage/" +
      fileName +
      isBeta +
      ".json?" +
      version
    );
  },
};
