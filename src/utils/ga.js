const gaConsole = !window.dataLayer || /localhost/i.test(location.host) ? true : false

module.exports = {
  event: (category, action, label) => {
    const dataObj = {
      event: 'customEventTrigger',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
      eventValue: 1,
    }
    if (gaConsole) {
      console.log('ga debug', dataObj)
      return
    }
    window.dataLayer.push(dataObj)
  },
  pageview: (url) => {
    const dataObj = {
      event: 'customPageviewTrigger',
      path_url: url
    }
    if (gaConsole) {
      console.log('ga debug', dataObj)
      return
    }
    window.dataLayer.push(dataObj)
  },
  ec: {
    viewcontent: (items) => {
      /**
       * items format
       * {id:'',item_price:'',name:'',price:0,quantity:1,sku:''}
       */
      const dataObj = {
        event: 'ViewContent',
        product_type: 'product',
        ecommerce: {
          detail: {
            products: items
          },
        },
      }
      if (gaConsole) {
        console.log('ga debug', dataObj)
        return
      }
      window.dataLayer.push(dataObj)
    },
    addtocart: (items) => {
      /**
       * items format
       * {id:'',item_price:'',name:'',price:0,quantity:1,sku:''}
       */
      const dataObj = {
        event: 'addToCart',
        product_type: 'product',
        ecommerce: {
          add: {
            products: items,
            currencyCode: 'TWD',
          },
        },
      }
      if (gaConsole) {
        console.log('ga debug', dataObj)
        return
      }
      window.dataLayer.push(dataObj)
    },
  },
}
