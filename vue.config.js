const configs = require('./src/config/configs')
const env = process.env.NODE_ENV

module.exports = {
  publicPath: env && env === 'production' ? '/static/' : '', // static file path
  productionSourceMap: true,
  chainWebpack: config => {
    config.optimization.splitChunks({
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          minChunks: 3,
          chunks: 'initial'
        },
        common: {}
      }
    })
    // config.optimization.delete('splitChunks')
  },
  pages: {
    index: {
      // page entry
      entry: 'src/homepage.js',
      // tempalte source
      template: 'public/index.html',
      // dist filename
      filename: 'index.html',
      // website title
      title: configs.title,
      // website description
      description: configs.description,
    },
    search: {
      // page entry
      entry: 'src/search.js',
      // tempalte source
      template: 'public/search.html',
      // dist filename
      filename: 'search.html',
      // website title
      title: configs.title,
      // website description
      description: configs.description,
    },
    category: {
      // page entry
      entry: 'src/category.js',
      // tempalte source
      template: 'public/category.html',
      // dist filename
      filename: 'category.html',
      // website title
      title: configs.title,
      // website description
      description: configs.description,
    },
    promotion: {
      // page entry
      entry: 'src/promotion.js',
      // tempalte source
      template: 'public/promotion.html',
      // dist filename
      filename: 'promotion.html',
      // website title
      title: configs.title,
      // website description
      description: configs.description,
    },
    promotion_page: {
      // page entry
      entry: 'src/promotion_page.js',
      // tempalte source
      template: 'public/promotion_page.html',
      // dist filename
      filename: 'promotion_page.html',
      // website title
      title: configs.title,
      // website description
      description: configs.description,
    },
    product: {
      // page entry
      entry: 'src/product.js',
      // tempalte source
      template: 'public/product.html',
      // dist filename
      filename: 'product.html',
      // website title
      title: configs.title,
      // website description
      description: configs.description,
    },
    coupon: {
      // page entry
      entry: 'src/coupon.js',
      // tempalte source
      template: 'public/coupon.html',
      // dist filename
      filename: 'coupon.html',
      // website title
      title: configs.title,
      // website description
      description: configs.description,
    },
    invoiceManagement: {
      // page entry
      entry: 'src/invoiceManagement.js',
      // tempalte source
      template: 'public/invoiceManagement.html',
      // dist filename
      filename: 'invoiceManagement.html',
      // website title
      title: configs.title,
      // website description
      description: configs.description,
    },
    shoppingIntro: {
      // page entry
      entry: 'src/shoppingIntro.js',
      // tempalte source
      template: 'public/membersInterests_shoppingIntro.html',
      // dist filename
      filename: 'membersInterests_shoppingIntro.html',
      // website title
      title: configs.title,
      // website description
      description: configs.description,
    },
    privacyIntro: {
      // page entry
      entry: 'src/privacyIntro.js',
      // tempalte source
      template: 'public/membersInterests_privacyIntro.html',
      // dist filename
      filename: 'membersInterests_privacyIntro.html',
      // website title
      title: configs.title,
      // website description
      description: configs.description,
    },
    seviceTermsIntro: {
      // page entry
      entry: 'src/seviceTermsIntro.js',
      // tempalte source
      template: 'public/membersInterests_seviceTermsIntro.html',
      // dist filename
      filename: 'membersInterests_seviceTermsIntro.html',
      // website title
      title: configs.title,
      // website description
      description: configs.description,
    },
    shoppingAggreementIntro: {
      // page entry
      entry: 'src/shoppingAggreementIntro.js',
      // tempalte source
      template: 'public/membersInterests_shoppingAggreementIntro.html',
      // dist filename
      filename: 'membersInterests_shoppingAggreementIntro.html',
      // website title
      title: configs.title,
      // website description
      description: configs.description,
    },
    commonProblem: {
      // page entry
      entry: 'src/commonProblem.js',
      // tempalte source
      template: 'public/customerService_commonProblem.html',
      // dist filename
      filename: 'customerService_commonProblem.html',
      // website title
      title: configs.title,
      // website description
      description: configs.description,
    },
    QARecord: {
      // page entry
      entry: 'src/QARecord.js',
      // tempalte source
      template: 'public/customerService_QARecord.html',
      // dist filename
      filename: 'customerService_QARecord.html',
      // website title
      title: configs.title,
      // website description
      description: configs.description,
    },
    QADetail: {
      // page entry
      entry: 'src/QADetail.js',
      // tempalte source
      template: 'public/customerService_QADetail.html',
      // dist filename
      filename: 'customerService_QADetail.html',
      // website title
      title: configs.title,
      // website description
      description: configs.description,
    },
    serviceLine: {
      // page entry
      entry: 'src/serviceLine.js',
      // tempalte source
      template: 'public/customerService_serviceLine.html',
      // dist filename
      filename: 'customerService_serviceLine.html',
      // website title
      title: configs.title,
      // website description
      description: configs.description,
    },
    creditCardManagement:{
       // page entry
       entry: 'src/creditCardManagement.js',
       // tempalte source
       template: 'public/checkout_creditCardManagenent.html',
       // dist filename
       filename: 'checkout_creditCardManagenent.html',
       // website title
       title: configs.title,
       // website description
       description: configs.description,
    },
    cvsManagement:{
      // page entry
      entry: 'src/cvsManagement.js',
      // tempalte source
      template: 'public/checkout_cvsManagenent.html',
      // dist filename
      filename: 'checkout_cvsManagenent.html',
      // website title
      title: configs.title,
      // website description
      description: configs.description,
    },
    store:{
       // page entry
       entry: 'src/testStore.js',
       // tempalte source
       template: 'public/store.html',
       // dist filename
       filename: 'store.html',
       // website title
       title: configs.title,
       // website description
       description: configs.description,
    }
  },
}
