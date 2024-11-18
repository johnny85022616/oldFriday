/**
 * 頁面組合schema結構化資訊
 */
const webSiteTitle = "遠傳friDay購物";
const webSiteDesc = '遠傳friDay購物提供遠東百貨、SOGO百貨、愛買量販、品牌outlet及3C、居家、流行等，享折價券現領現折。'
const websiteData = {
  "@context": "http://schema.org",
  "@type": "WebSite",
  url: "https://m.shopping.friday.tw/mobileweb",
  name: "遠傳friDay購物",
  potentialAction: {
    "@type": "SearchAction",
    target: "/search?keyword={search_term_string}",
    "query-input": "required name=search_term_string",
  },
  logo: "https://shopping.friday.tw/static/images/header_logo.png",
  sameAs: [
    "https://www.facebook.com/fridayshopping/",
    "https://www.youtube.com/channel/UC3AkhVCWPmlkjMoOVygAhQw",
    "https://play.google.com/store/apps/details?id=com.gohappy.mobileapp",
    "https://apps.apple.com/tw/app/id785988886",
  ],
};

const appendJsonLD = (data) => {
  const script = document.createElement("script");
  script.id = "json-ld";
  script.type = "application/ld+json";
  script.innerHTML = JSON.stringify(data);
  document.body.prepend(script);
};

const appendTitle = (titleStr) => {
  document.title = titleStr + " - " + webSiteTitle;
  const meta = document.createElement("meta");
  meta.setAttribute("property", "og:title");
  meta.content = titleStr;
  document.getElementsByTagName("head")[0].appendChild(meta);
};

const appendCanonical = (url) => {
  const link = document.createElement("link");
  link.rel = "canonical";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
};

const appendDescription = (context) => {
  const metaDom = document.querySelector('meta[name="description"]');
  if (metaDom) {
    metaDom.setAttribute("content", context);
  } else {
    const link = document.createElement("meta");
    link.name = "description";
    link.content = context;
    document.getElementsByTagName("head")[0].appendChild(link);
  }
  const meta = document.createElement("meta");
  meta.setAttribute("property", "og:description");
  meta.content = context;
  document.getElementsByTagName("head")[0].appendChild(meta);
};

module.exports = {
  homepage: () => {
    appendJsonLD(websiteData);
    appendDescription(webSiteDesc)
  },
  product: (productObj) => {
    const description = productObj.intro.replace(
      /(<([^>]+)>)|([(\\|r|n)]+)/gi,
      ""
    );
    const jsonld = {
      "@context": "http://schema.org",
      "@type": "Product",
      name: productObj.name,
      description: description,
      url: `https://m.shopping.friday.tw/mobileweb/product?sid=${productObj.sid}&cid=${productObj.cid}&pid=${productObj.pid}`,
      productID: productObj.pid,
      sku: productObj.pid,
      image: productObj.sample_images[0],
      brand: {
        "@type": "Brand",
        "name": ""
      },
      offers: {
        "@type": "Offer",
        price: productObj.real_price + ".00",
        priceCurrency: "TWD",
        itemCondition: "NewCondition",
        priceValidUntil: "2025-12-31",
        availability: "http://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        bestRating: 5,
        worstRating: 0,
        ratingCount: Math.floor(Math.random() * 999) + 111,
        ratingValue: "5.00",
      },
    };
    appendJsonLD(websiteData);
    appendJsonLD(jsonld);
    appendTitle(productObj.name);
    appendDescription(description);
  },
  breadcrumb: (data) => {
    const jsonObj = {
      "@context": "http://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: data.map((v, i) => {
        return {
          "@type": "ListItem",
          position: i+1,
          item: {
            "@id": v.url,
            name: v.name,
          },
        };
      }),
    };
    appendJsonLD(jsonObj);
  },
  search: (extendData, keyword) => {
    appendJsonLD(websiteData);
    if (Array.isArray(extendData)) {
      extendData.forEach((value) => {
        appendJsonLD(value);
      });
    }
    appendCanonical(
      "https://m.shopping.friday.tw/mobileweb/search?keyword=" + keyword
    );
    appendTitle(`你在找【${keyword}】嗎?`)

    appendDescription(
      `找"${keyword}"來遠傳friDay購物就對了！推薦您評價最高的"${keyword}"，教你如何用最優惠的價格買到"${keyword}"。`
    );
  },
  category: (level, lv1Name, lv2Name) => {
    const firstName = lv1Name ? lv1Name.replace(/-/gi, "") : "";
    const secondName = lv2Name ? lv2Name.replace(/([-|]+)/gi, "") : "";
    let desc = "";

    appendTitle(firstName)

    switch (level) {
      case 1:
        desc = `${firstName}，包含：${secondName}等。2022最新推薦的熱銷品牌，及更多好評低價新品都在遠傳friDay購物。`;
        break;
      case 2:
        desc = `${firstName}，包含：${secondName}等。2022最新推薦的熱銷品牌，及更多好評低價新品都在遠傳friDay購物。`;
        break;
      case 3:
        desc = `推薦2022評價高的${firstName}，想找更多${secondName}都在遠傳friDay購物。`;
        break;
    }

    appendDescription(desc);
  },
};
