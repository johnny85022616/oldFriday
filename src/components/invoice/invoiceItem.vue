<template>
<div class="invoice-content">
  <div
    class="invioce-item "
    v-for="(item, i) of invoiceItems"
    :key="i">
    <div
      class="d-flex"
      v-if="item.typeNum != 5">

      <i :class="['icon-radio',{'active': isDefault == i }]" v-if="item.typeName != '電子發票設定及歸戶' " @click="selInvoice(i)"></i>
      <div class="invoice-box">
        <div class="invoice-type">
          <h3
            :type="item"
            :index="i">{{item.typeName}} </h3>
          <font
            class="color-red-txt"
            v-if="isDefault == i">[預設]</font>
        </div>
        <div
          class="invoice-info"
          v-if="i != invoiceItems.length -1">
          <p
            class="color-grey-txt"
            v-html="item.typeInfo"></p>
        </div>
      </div>
    </div>
    <span class="btn-wrapper" :type="item.typeName" :itemIndex="i" @click.stop="fullscreendialogShow(item.typeName,item.typeNum,i)"><i class="angle-right"></i></span>

  </div>

  <div v-if="showDialog && fullscreendialogOn != '電子發票設定及歸戶' ">
    <fullscreendialog
      :isFullscreen="true"
      :closeDialog="closeDialog"
      :useClose="false"
      v-on:closeDialog="closeDialog">

      <template v-slot:header>
        <span v-if="fullscreendialogOn == '個人雲端發票'">個人雲端發票</span>
        <span v-else-if="fullscreendialogOn == '公司用(線上列印)'">公司用(線上列印)</span>
        <span v-else-if="fullscreendialogOn == '雲端發票捐贈'">雲端發票捐贈</span>
        <span v-else-if="fullscreendialogOn == '個人紙本發票'">個人紙本發票</span>
        <span v-else>公司用(郵寄)</span>
      </template>
      <template v-slot:body>
        <div
          v-if="fullscreendialogOn == '個人雲端發票'"
          class="member-cloud-invoice-box">
          <div class="control-box">
            <div
              class="switch-box"
              v-if="memberInvoiceObj.switch">
              設為預設
              <i :class="['icon-switch',{'active': switchIsOn }]" @click="switchIsOn = !switchIsOn"></i>
            </div>
            <div class="form-area">
              <div
                class="radio-box"
                @click="toSelmemberInvoice('會員載具')">
                <i :class="['icon-radio',{'active': memberInvoiceObj.memberInvoiceSel == '會員載具'}]"></i>
                <label>會員載具</label>
                <p class="color-grey-txt mt20">提醒您，中獎發票遠傳friDay購物將主動寄送至您會員資料填寫之地址。</p>
              </div>
              <div
                class="input_wrapper radio-box mt20"
                @click="toSelmemberInvoice('手機條碼載具')">
                <i :class="['icon-radio',{'active': memberInvoiceObj.memberInvoiceSel == '手機條碼載具'}]"></i>
                <label>手機條碼載具</label>
                <input type="text" placeholder="請輸入手機條碼" v-model="memberInvoiceObj.vehicle" maxlength="8" @keyup="upperCase">
                <span class="error-msg">手機條碼載具碼有誤，請重新輸入。</span>
              </div>
              <p class="color-grey-txt mt20">按下確認即表示同意將本次發票紀錄於「發票管理｣中，節省下次結帳時間。</p>
            </div>

          </div>
        </div>
        <div
          v-else-if="fullscreendialogOn == '公司用(線上列印)'"
          class="company-invoice-box">
          <div class="control-box">
            <div
              class="switch-box"
              v-if=" isDefaultType != 7">
              設為預設
              <i :class="['icon-switch',{'active': switchIsOn }]" @click="switchIsOn = !switchIsOn"></i>
            </div>
            <div class="form-area">
              <div class="input_wrapper">
                <label>統一編號</label>
                <input type="text" inputmode="numeric" placeholder="請輸入統一編號" v-model="companyPrintObj.vat" maxlength="8">
                <span class="error-msg">輸入格式錯誤，請重新輸入。</span>
              </div>
              <div class="input_wrapper">
                <label>公司名稱</label>
                <input type="text" placeholder="請輸入公司名稱" v-model="companyPrintObj.name">
                <span class="error-msg">必填欄位。</span>
              </div>
              <p class="color-grey-txt mt20">按下確認即表示同意將本次發票紀錄於「發票管理｣中，節省下次結帳時間。</p>
            </div>
          </div>

        </div>
        <div
          v-else-if="fullscreendialogOn == '雲端發票捐贈'"
          class="invoice-donate-box">
          <div class="control-box">
            <div
              class="switch-box"
              v-if=" isDefaultType != 1">
              設為預設
              <i :class="['icon-switch',{'active': switchIsOn }]" @click="switchIsOn = !switchIsOn"></i>
            </div>
            <div class="form-area">
              <div
                class="radio-box"
                v-for="(item,i) in foundations.foundations"
                :key="i"
                @click="donateFn(i)">
                <i :class="['icon-radio',{'active': foundations.donateTo == i}]"></i>
                <label>{{item.name}}</label>
              </div>
              <span class="error-msg">請選擇捐贈單位。</span>
              <p class="color-grey-txt mt20">按下確認即表示同意將本次發票紀錄於「發票管理｣中，節省下次結帳時間。</p>
            </div>
          </div>
        </div>
        <div
          v-else-if="fullscreendialogOn == '個人紙本發票'"
          class="member-paper-invoice-box">
          <div class="control-box">
            <div
              class="switch-box"
              v-if=" isDefaultType != 2">
              設為預設
              <i :class="['icon-switch',{'active': switchIsOn }]" @click="switchIsOn = !switchIsOn"></i>
            </div>
            <div class="form-area">
              <div class="input_wrapper ">
                <input type="checkbox" id="memberDataCheckbox" :checked="memberPaperObj.isChecked">
                <label for="memberDataCheckbox" class="checkboxLabel" @click="getMemberData()">同會員資料</label>
              </div>
              <div class="input_wrapper name_wrapper">
                <label>姓名</label>
                <input type="text" class="nameCHK" placeholder="請輸入收件人姓名" v-model="memberPaperObj.recipient">
                <span class="error-msg">必填欄位。</span>
              </div>
              <div class="input_wrapper address-area">
                <label>地址</label>
                <div class="d-flex">
                  <select class="city addressNeedToCHK" @change="chooseRegion($event)" v-model="memberPaperObj.city">
                    <option
                      disabled
                      selected>請選擇</option>
                    <option
                      v-for="(item, i) of memberPaperObj.cityAll"
                      :key="i"
                      :value="item.cityId">{{item.cityName}}</option>
                  </select>
                  <select class="region addressNeedToCHK" v-model="memberPaperObj.region">
                    <option
                      disabled
                      selected>請選擇</option>
                    <option
                      v-for="(item, i) of memberPaperObj.regionAll"
                      :key="i"
                      :value="item.regionId">{{item.regionName}}</option>
                  </select>
                </div>
                <input class="roadCHK" type="text" placeholder="請輸入地址" v-model="memberPaperObj.detail"> <label class="error_msg" id="consigneeCity_error" for="consigneeCity"></label> <label class="error_msg" id="consigneeRegion_error" for="consigneeRegion"></label> <label class="error_msg" id="consigneeRoad_error" for="consigneeRoad"></label>
                <span class="error-msg"></span>
              </div>
              <p class="color-grey-txt mt20">按下確認即表示同意將本次發票紀錄於「發票管理｣中，節省下次結帳時間。</p>
            </div>
          </div>
        </div>
        <div
          v-else-if="fullscreendialogOn == '公司用(郵寄)' "
          class="company-invoice-mail-box">
          <div class="control-box">
            <div
              class="switch-box"
              v-if=" isDefaultType != 3">
              設為預設
              <i :class="['icon-switch',{'active': switchIsOn }]" @click="switchIsOn = !switchIsOn"></i>
            </div>
            <div class="form-area">
              <div class="input_wrapper">
                <label>統一編號</label>
                <input class="needtoCHK" type="text" inputmode="numeric" placeholder="請輸入統一編號" v-model="companyMailObj.vat" maxlength="8">
                <span class="error-msg">輸入格式錯誤，請重新輸入。</span>
              </div>
              <div class="input_wrapper">
                <label>公司名稱</label>
                <input class="needtoCHK" type="text" placeholder="請輸入公司名稱" v-model="companyMailObj.name">
                <span class="error-msg">必填欄位。</span>
              </div>
              <hr>
              <div class="input_wrapper">
                <input type="checkbox" id="memberDataCheckbox2" :checked="companyMailObj.isChecked">
                <!-- <label for="memberDataCheckbox2" class="checkboxLabel" @click="isCheck">同會員資料</label> -->
                <label for="memberDataCheckbox2" class="checkboxLabel" @click="getMemberData()">同會員資料</label>
              </div>
              <div class="input_wrapper name_wrapper">
                <label>姓名</label>
                <input class="nameCHK" type="text" placeholder="請輸入收件人姓名" v-model="companyMailObj.recipient">
                <span class="error-msg"></span>
              </div>
              <div class="input_wrapper address-area">
                <label>地址</label>
                <div class="d-flex">
                  <select class="city addressNeedToCHK" @change="chooseRegion($event)" v-model="companyMailObj.city">
                    <option
                      disabled
                      selected>請選擇</option>
                    <option
                      v-for="(item, i) of companyMailObj.cityAll"
                      :key="i"
                      :value="item.cityId">{{item.cityName}}</option>
                  </select>
                  <select class="region addressNeedToCHK" v-model="companyMailObj.region">
                    <option
                      disabled
                      selected>請選擇</option>
                    <option
                      v-for="(item, i) of companyMailObj.regionAll"
                      :key="i"
                      :value="item.regionId">{{item.regionName}}</option>
                  </select>
                </div>
                <input type="text" class="roadCHK" placeholder="請輸入地址" v-model="companyMailObj.detail"> <label class="error_msg" id="consigneeCity_error" for="consigneeCity"></label> <label class="error_msg" id="consigneeRegion_error" for="consigneeRegion"></label> <label class="error_msg" id="consigneeRoad_error" for="consigneeRoad"></label>
                <span class="error-msg">必填欄位。</span>
              </div>
              <p class="color-grey-txt mt20">按下確認即表示同意將本次發票紀錄於「發票管理｣中，節省下次結帳時間。</p>
            </div>
          </div>
        </div>
        <div class="submit-area">
          <button :class="['reset-btn', {'disabled': memberInvoiceObj.memberInvoiceSel=='會員載具' && fullscreendialogOn == '個人雲端發票'|| invoiceItems[fullscreendialogIndex].typeInfo==='尚未設定'}]" @click="popupBox('reset',fullscreendialogOn)" :disabled="(memberInvoiceObj.memberInvoiceSel=='會員載具' && fullscreendialogOn == '個人雲端發票')  || invoiceItems[fullscreendialogIndex].typeInfo==='尚未設定'">重置</button>
          <button class="submit-btn" @click="sendInvoiceSetting(fullscreendialogOn)">確認</button>
        </div>
      </template>
    </fullscreendialog>
  </div>
</div>
</template>

<script>
import fullscreendialog from "../common/fullscreenDialog.vue"; // 全畫面蓋版提示框
export default {
  name: 'inviocelist',
  components: {
    fullscreendialog
  },
  data() {
    return {
      invoiceItems: [{
          typeName: '個人雲端發票',
          typeInfo: null,
          vehicle: null,
          typeNum: 4
        },
        {
          typeName: '雲端發票捐贈',
          typeInfo: '尚未設定',
          typeNum: 1
        },
        {
          typeName: '公司用(線上列印)',
          typeInfo: '尚未設定',
          typeNum: 7
        },
        {
          typeName: '公司用(郵寄)',
          typeInfo: '尚未設定',
          typeNum: 3
        },
        {
          typeName: '個人雲端發票',
          typeInfo: '手機條碼載具 尚未設定',
          typeNum: 5
        },
        {
          typeName: '個人紙本發票',
          typeInfo: '尚未設定',
          typeNum: 2
        },
        {
          typeName: '電子發票設定及歸戶',
          typeInfo: '',
          typeNum: ''
        }
      ],
      switchIsOn: true,
      isMemberData: false,
      memberInfo: {}, //會員資料
      invoiceData: {},
      showDialog: false,
      isDefault: 0,
      isDefaultType: 4, //會員載具
      // isChecked: '',
      fullscreendialogOn: null,
      fullscreendialogIndex: null,
      memberInvoiceObj: {
        items: ['會員載具', '手機條碼載具'],
        memberInvoiceSel: null,
        vehicle: null,
        switch: true,
      },
      companyPrintObj: {
        name: null,
        vat: null
      },
      foundations: {
        foundations: [{
          name: '伊甸基金會',
          id: '25885'
        }, {
          name: '財團法人肝病防治學術基金會',
          id: '583'
        }, {
          name: '心路基金會',
          id: '876'
        }],
        donateTo: -1,
      },
      memberPaperObj: {
        city: '請選擇',
        region: '請選擇',
        detail: null,
        recipient: null,
        isMemberData: false,
        isChecked: '',
        addressObj: {},
        cityAll: [],
        regionAll: []
      },
      companyMailObj: {
        name: null,
        vat: null,
        city: '請選擇',
        region: '請選擇',
        detail: null,
        recipient: null,
        isMemberData: false,
        isChecked: '',
        addressObj: {},
        cityAll: [],
        regionAll: []
      },
    }
  },
  props: {
    windowY: {
      type: Number,
      default: 0
    },
    isDownloadAppOpened: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.getData()
    const ticket = this.$cookies.get('FEEC-B2C-TICKET')
    if (ticket) {
      this.axios
        .get(
          `api/member/detail`, {
            headers: {
              'authorization': 'Bearer' + ticket
            }
          }).then(res => {
          const data = res.data
          if (data.status == 1) {
            this.memberInfo = data.data[0]
          }
        })
    }
  },
  computed: {},
  watch: {
    'memberInvoiceObj.memberInvoiceSel': {
      deep: true,
      handler() {
        if (this.memberInvoiceObj.memberInvoiceSel == '會員載具' && this.isDefaultType == 4) {
          this.memberInvoiceObj.switch = false
        } else if (this.memberInvoiceObj.memberInvoiceSel == '手機條碼載具' && this.isDefaultType == 5) {
          this.memberInvoiceObj.switch = false
        } else {
          this.memberInvoiceObj.switch = true
        }
      }
    },
    'memberPaperObj.city': {
      deep: true,
      handler() {
        const region = this.memberPaperObj.regionAll.filter(region => region.regionId == this.memberPaperObj.region)
        if (region.length == 0) {
          this.memberPaperObj.region = '請選擇'
        }
        if (this.memberPaperObj.city && this.memberPaperObj.city != this.memberInfo.address.city) {

          if (document.querySelector('#memberDataCheckbox')) {
            document.querySelector('#memberDataCheckbox').checked = false;
          }
          this.memberPaperObj.isMemberData = false
          this.memberPaperObj.isChecked = ''
        }
      }
    },
    'memberPaperObj.region': {
      deep: true,
      handler() {
        if (this.memberPaperObj.region && this.memberPaperObj.region != this.memberInfo.address.county) {
          if (document.querySelector('#memberDataCheckbox')) {
            document.querySelector('#memberDataCheckbox').checked = false;
          }
          this.memberPaperObj.isMemberData = false
          this.memberPaperObj.isChecked = ''
        }
      }
    },
    'memberPaperObj.recipient': {
      deep: true,
      handler() {
        if (this.memberPaperObj.recipient && this.memberPaperObj.recipient != this.memberInfo.name) {
          if (document.querySelector('#memberDataCheckbox')) {
            document.querySelector('#memberDataCheckbox').checked = false;
          }
          this.memberPaperObj.isMemberData = false
          this.memberPaperObj.isChecked = ''
        }
      }
    },
    'memberPaperObj.detail': {
      deep: true,
      handler() {
        if (this.memberPaperObj.detail && this.memberPaperObj.detail != this.memberInfo.address.text) {
          if (document.querySelector('#memberDataCheckbox')) {
            document.querySelector('#memberDataCheckbox').checked = false;
          }
          this.memberPaperObj.isMemberData = false
          this.memberPaperObj.isChecked = ''
        }
      }
    },
    'companyMailObj.city': {
      deep: true,
      handler() {
        const region = this.companyMailObj.regionAll.filter(region => region.regionId == this.companyMailObj.region)
        if (region.length == 0) {
          this.companyMailObj.region = '請選擇'
        }
        if (this.companyMailObj.city && this.companyMailObj.city != this.memberInfo.address.city) {
          if (document.querySelector('#memberDataCheckbox2')) {
            document.querySelector('#memberDataCheckbox2').checked = false;
          }
          this.companyMailObj.isMemberData = false
          this.companyMailObj.isChecked = ''
        }

      }
    },
    'companyMailObj.region': {
      deep: true,
      handler() {
        if (this.companyMailObj.region && this.companyMailObj.region != this.memberInfo.address.county) {
          if (document.querySelector('#memberDataCheckbox2')) {
            document.querySelector('#memberDataCheckbox2').checked = false;
          }
          this.companyMailObj.isMemberData = false
          this.companyMailObj.isChecked = ''
        }
      }
    },
    'companyMailObj.recipient': {
      deep: true,
      handler() {
        if (this.companyMailObj.recipient && this.companyMailObj.recipient != this.memberInfo.name) {
          if (document.querySelector('#memberDataCheckbox2')) {
            document.querySelector('#memberDataCheckbox2').checked = false;
          }
          this.companyMailObj.isMemberData = false
          this.companyMailObj.isChecked = ''
        }
      }
    },
    'companyMailObj.detail': {
      deep: true,
      handler() {
        if (this.companyMailObj.detail && this.companyMailObj.detail != this.memberInfo.address.text) {
          if (document.querySelector('#memberDataCheckbox2')) {
            document.querySelector('#memberDataCheckbox2').checked = false;
          }
          this.companyMailObj.isMemberData = false
          this.companyMailObj.isChecked = ''
        }
      }
    },
    fullscreendialogOn() {
      if (this.fullscreendialogOn == '個人紙本發票') {
        if (Object.keys(this.memberPaperObj.addressObj).length == 0) {
          this.memberPaperObj.addressObj = window.addreddJSON.data[0].address
          this.memberPaperObj.addressObj.forEach(item => {
            this.memberPaperObj.cityAll.push({
              cityId: item.id,
              cityName: item.name
            })
          });
        }
        if (this.memberPaperObj.recipient == this.memberInfo.name && this.memberPaperObj.city == this.memberInfo.address.city && this.memberPaperObj.region == this.memberInfo.address.county && this.memberPaperObj.detail == this.memberInfo.address.text) {
          this.memberPaperObj.isMemberData = true;
          this.memberPaperObj.isChecked = 'checked';

        } else {
          this.memberPaperObj.isMemberData = false;
          this.memberPaperObj.isChecked = '';
        }
        if (this.memberPaperObj.isMemberData) {
          this.memberPaperObj.region = this.memberInfo.address.county
          this.region(this.memberPaperObj.city)
        } else {
          if (this.invoiceItems[5].typeInfo != '尚未設定') {
            this.memberPaperObj.region = this.invoiceItems[5].countyId
            this.region(this.memberPaperObj.city)
          }
        }
      } else if (this.fullscreendialogOn == '公司用(郵寄)') {
        if (Object.keys(this.companyMailObj.addressObj).length == 0) {
          this.companyMailObj.addressObj = window.addreddJSON.data[0].address
          this.companyMailObj.addressObj.forEach(item => {
            this.companyMailObj.cityAll.push({
              cityId: item.id,
              cityName: item.name
            })
          });
        }
        if (this.companyMailObj.recipient == this.memberInfo.name && this.companyMailObj.city == this.memberInfo.address.city && this.companyMailObj.region == this.memberInfo.address.county && this.companyMailObj.detail == this.memberInfo.address.text) {
          this.companyMailObj.isMemberData = true;
          this.companyMailObj.isChecked = 'checked';
        } else {
          this.companyMailObj.isMemberData = false;
          this.companyMailObj.isChecked = '';
        }
        if (this.companyMailObj.isMemberData) {
          this.companyMailObj.region = this.memberInfo.address.county
        } else {
          if (this.invoiceItems[3].typeInfo != '尚未設定') {
            this.companyMailObj.region = this.invoiceItems[3].countyId
            this.region(this.companyMailObj.city)
          }
        }
      }
    },
  },
  methods: {
    upperCase() {
      this.memberInvoiceObj.vehicle = this.memberInvoiceObj.vehicle.toUpperCase();
    },
    popupBox(popup, resetInvoiceType) {
      const vm = this
      let alertUI = null
      const msg = {
        gotoLink: {
          name: 'friday_message-box',
          message: '<font>提醒您 : 開獎日(25日零時)前已歸戶之會員載具，開獎後friDay購物將不提供中獎發票明細證明聯，請於領獎期間內使用「統一發票兌獎」APP領獎，或至超商KIOSK以共通性載具查詢與列印中獎發票證明聯領獎。</font>',
          btnPos: 'right',
          btns: [{
              name: 'submit',
              className: 'mr-1 primary',
              text: '前往確認',
              action: () => {
                alertUI.hide()
                const info = this.$cookies.get('FEEC-B2C-INFO')
                console.log(info)
                const tid = info.data.tid
                console.log(this.configs.desktopDomain() + "/ec2/member/order/eInvoiceVehcileCentralManag?memberId=" + tid)
                window.open(this.configs.desktopDomain() + "/ec2/member/order/eInvoiceVehcileCentralManag?memberId=" + tid)
              }
            },
            {
              name: 'close',
              className: '',
              text: '取消',
              action: () => {
                alertUI.hide()
              }
            }
          ]
        },
        reset: {
          name: 'friday_message-box',
          message: '<font>是否將該筆發票資訊清除？</font>',
          btnPos: 'right',
          btns: [{
              name: 'close',
              className: 'mr-1 ',
              text: '取消',
              action: () => {
                alertUI.hide()
              }
            },
            {
              name: 'submit',
              className: 'primary',
              text: '確認',
              action: () => {
                alertUI.hide()
                vm.resetInvoiceSetting(resetInvoiceType)
              }
            }
          ]
        },
      }

      const fridayMsgBox = window.fridayComponent.MessageBox
      const customCusBox = fridayMsgBox.template.fridayMessage(msg[popup])
      alertUI = new fridayMsgBox(customCusBox)
      alertUI.init()

      const ticket = this.$cookies.get('FEEC-B2C-TICKET')

      if (popup == 'reset') {

        if (ticket) {
          alertUI.show()
        } else {
          window.location.href = this.configs.loginUrl()
        }
      } else {
        alertUI.show()
      }

    },
    resetInvoiceSetting(v) {
      const vm = this
      const typeAry = vm.invoiceItems.filter(i => i.typeName == v)

      let type = typeAry[0].type
      if (type == 4 && Object.prototype.hasOwnProperty.call(this.invoiceData, 5)) {
        type = 5
      }
      const ticket = this.$cookies.get('FEEC-B2C-TICKET')

      if (ticket) {
        vm.axios.delete(`api/member/invoice?type=${type}`, {
          headers: {
            'authorization': 'Bearer' + ticket,
          },
        }).then(res => {
          if (res.data.code == 1) {
            this.closeDialog()
          } else if (res.data.code == 0) {
            this.memberInvoiceObj.memberInvoiceSel = '會員載具';
            this.memberInvoiceObj.switch = false;
            this.closeDialog()
          } else if (res.data.code == 90401) {
            window.location.href = this.configs.loginUrl()
          }
        })
      } else {
        window.location.href = this.configs.loginUrl()
      }

    },
    sendInvoiceSetting(v) {
      const vm = this
      const ticket = this.$cookies.get('FEEC-B2C-TICKET')
      const headersData = {
        headers: {
          'authorization': 'Bearer' + ticket
        }
      }
      let payload = {}
      let toSetting = true
      let nameChk = true
      let roadChk = true

      switch (v) {
        case '個人雲端發票':
          if (vm.memberInvoiceObj.memberInvoiceSel == '手機條碼載具') {
            payload = {
              type: '5',
              isDefault: vm.switchIsOn,
              vehicle: vm.memberInvoiceObj.vehicle
            }
          } else {
            payload = {
              type: '4',
              isDefault: vm.switchIsOn
            }
          }
          if (document.querySelector('.member-cloud-invoice-box .input_wrapper input').value == '') {
            // Object.prototype.hasOwnProperty.call(vm.invoiceData, 5) 
            if (vm.memberInvoiceObj.memberInvoiceSel == '手機條碼載具') {
              document.querySelector('.member-cloud-invoice-box .input_wrapper').classList.add('error')
              toSetting = false
            }

          } else {
            document.querySelector('.member-cloud-invoice-box .input_wrapper').classList.remove('error')
          }

          break;
        case '雲端發票捐贈':
          if (vm.foundations.foundations[vm.foundations.donateTo]) {
            payload = {
              type: '1',
              isDefault: vm.switchIsOn,
              id: vm.foundations.foundations[vm.foundations.donateTo].id,
              name: vm.foundations.foundations[vm.foundations.donateTo].name
            };
          } else {
            document.querySelector('.invoice-donate-box .form-area').classList.add('error')
            toSetting = false
          }

          break;
        case '個人紙本發票':
        case '公司用(郵寄)':
          v == '個人紙本發票' ?
            payload = {
              type: '2',
              isDefault: vm.switchIsOn,
              cityId: vm.memberPaperObj.city,
              countyId: vm.memberPaperObj.region,
              address: vm.memberPaperObj.detail,
              recipient: vm.memberPaperObj.recipient
            } :
            payload = {
              type: '3',
              isDefault: vm.switchIsOn,
              cityId: vm.companyMailObj.city,
              countyId: vm.companyMailObj.region,
              address: vm.companyMailObj.detail,
              recipient: vm.companyMailObj.recipient,
              company: vm.companyMailObj.name,
              vat: vm.companyMailObj.vat,
            }
          var box = '';
          v == '個人紙本發票' ? box = '.member-paper-invoice-box' : box = '.company-invoice-mail-box'
          var needtoCHK = document.querySelectorAll(`${box} .needtoCHK`)
          var name = document.querySelector(`${box} .nameCHK`)
          var nameWrapper = document.querySelector(`${box} .name_wrapper`)
          var errorNameMsg = document.querySelector(`${box} .name_wrapper .error-msg`)
          // var addressNeedToCHK = document.querySelectorAll(`${box} .addressNeedToCHK`)
          var errorNameTxt = ''

          errorNameMsg.textContent = ''
          //是否為空值
          if (null == name.value || name.value.trim() <= 0) {
            errorNameTxt += ",必填欄位。";
            // nameWrapper.classList.add('error');
            nameChk = false
          }

          var otherChar = name.value.replace(/[A-Za-z-\s\u4e00-\u9fa5]/g, '')
          if (otherChar != "") {
            // nameWrapper.classList.add('error');
            errorNameTxt += ",不可輸入數字或特殊字元";
            nameChk = false
          }

          //當英文被取代掉時候 應只剩下中文
          var onlyChinese = name.value.replace(/[A-Za-z-\s]/g, '')
          if (onlyChinese != "" && name.value.length != onlyChinese.length) {
            // nameWrapper.classList.add('error');
            errorNameTxt += ",不可中英夾雜";
            nameChk = false
          }
          //姓名如輸入中文，最少需輸入兩個字
          if (onlyChinese.length < 2 && onlyChinese.length != 0) {
            // nameWrapper.classList.add('error');
            errorNameTxt += ",需輸入兩個以上中文字元";
            nameChk = false
          }
          //姓名如輸入中文，不可輸入超過六個字
          if (onlyChinese.length > 6) {
            errorNameTxt += ",不可輸入超過六個中文字元";
            // nameWrapper.classList.add('error');
            nameChk = false
          }
          nameChk ? nameWrapper.classList.remove('error') : nameWrapper.classList.add('error')
          errorNameMsg.textContent = errorNameTxt.substr(1);

          var road = document.querySelector(`${box} .roadCHK`)
          var errorRoadMsg = document.querySelector(`${box} .address-area .error-msg`)
          var roadWrapper = document.querySelector(`${box} .address-area`)
          var errorRoadTxt = "";

          var addrFormat = new RegExp("[路街道號]")
          var otherCharRoad = road.value.replace(/[\w-\s\u4e00-\u9fa5]/g, '')
          if (
            (null == road.value || road.value.trim().length <= 0) ||
            (addrFormat.test(road.value) == false && errorRoadTxt !== '') ||
            (otherCharRoad != "" && errorRoadTxt !== '')) {
            errorRoadTxt += ",必填欄位。";
            roadChk = false
          }
          roadChk ? roadWrapper.classList.remove('error') : roadWrapper.classList.add('error')
          errorRoadMsg.textContent = errorRoadTxt.substr(1);

          needtoCHK.forEach(e => {
            if (e.value == '') {
              e.parentElement.classList.add('error')
              toSetting = false
            } else {
              e.parentElement.classList.remove('error')
            }
          })
          break;
        case '公司用(線上列印)':
          payload = {
            type: '7',
            isDefault: vm.switchIsOn,
            company: vm.companyPrintObj.name,
            vat: vm.companyPrintObj.vat, // 04595257
          }
          var inputAll = document.querySelectorAll('.company-invoice-box .input_wrapper input')
          inputAll.forEach(v => {
            if (v.value == '') {
              v.parentElement.classList.add('error')
              toSetting = false
            } else {
              v.parentElement.classList.remove('error')
            }
          })
          break;
        default:
          break;
      }

      if (toSetting && ticket && roadChk && nameChk) {
        if (v == '個人雲端發票' && this.memberInvoiceObj.memberInvoiceSel == '手機條碼載具') {
          const barcode = encodeURIComponent(this.memberInvoiceObj.vehicle) // /HYXVV3S
          this.axios.post(`api/member/checkEInvoiceVehicle?barcode=${barcode}`).then(res => {
            if (res.data.code == 1) {
              this.axios.put('api/member/invoice', payload, headersData).then(res => {
                if (res.data.code == 1) {
                  this.closeDialog()
                } else if (res.data.code == 90401) {
                  window.location.href = this.configs.loginUrl()
                }
              });
            } else if (res.data.code == 0) {
              document.querySelector('.member-cloud-invoice-box .input_wrapper').classList.add('error')
            }

          });
        } else {
          this.axios.put('api/member/invoice', payload, headersData).then(res => {

            if (res.data.message == 'OK' && res.data.code == 1) {
              this.closeDialog()
            } else {
              if (res.data.code == 3000) {
                if (v == '公司用(線上列印)') {
                  document.querySelectorAll('.company-invoice-box .input_wrapper')[0].classList.add('error')
                } else if (v == '公司用(郵寄)') {
                  document.querySelectorAll('.company-invoice-mail-box .input_wrapper')[0].classList.add('error')
                }
              } else if (res.data.code == 0) {
                if (v == '公司用(郵寄)') {
                  document.querySelector('.company-invoice-mail-box .address-area').classList.add('error')
                  document.querySelector('.company-invoice-mail-box .address-area .error-msg').textContent = '請填寫有效地址'
                } else if (v == '個人紙本發票') {
                  document.querySelector('.member-paper-invoice-box .address-area').classList.add('error')
                  document.querySelector('.member-paper-invoice-box .address-area .error-msg').textContent = '請填寫有效地址'

                }
              } else if (res.data.code == 90401) {
                window.location.href = this.configs.loginUrl()
              }
            }

          });
        }
      }
    },
    getMemberData() {
      // this.isMemberData = !this.isMemberData
      const vm = this
      switch (vm.fullscreendialogOn) {
        case '公司用(郵寄)':
          vm.companyMailObj.recipient = vm.memberInfo.name
          vm.companyMailObj.city = vm.memberInfo.address.city
          this.region(vm.companyMailObj.city)
          vm.companyMailObj.region = vm.memberInfo.address.county
          vm.companyMailObj.detail = vm.memberInfo.address.text
          break;
        case '個人紙本發票':
          vm.memberPaperObj.recipient = vm.memberInfo.name
          vm.memberPaperObj.city = vm.memberInfo.address.city
          this.region(vm.memberPaperObj.city)
          vm.memberPaperObj.region = vm.memberInfo.address.county
          vm.memberPaperObj.detail = vm.memberInfo.address.text
          break;
      }
    },
    toSelmemberInvoice(e) {
      this.memberInvoiceObj.memberInvoiceSel = e
    },
    donateFn(i) {
      this.foundations.donateTo = i
    },
    chooseRegion(event) {
      const cityId = event.target.value;
      this.region(cityId)
    },
    region(cityId) {
      const fullscreendialogOn = this.fullscreendialogOn
      if (fullscreendialogOn == '個人紙本發票') {
        this.memberPaperObj.addressObj.every(v => {
          this.memberPaperObj.regionAll = []
          v.counties.forEach(region => {
            this.memberPaperObj.regionAll.push({
              regionId: region.id,
              regionName: region.name
            })

          })
          if (v.id == cityId) {
            return false;
          }
          return true;
        });
      } else if (fullscreendialogOn == '公司用(郵寄)') {
        this.companyMailObj.addressObj.every(v => {
          this.companyMailObj.regionAll = []
          v.counties.forEach(region => {
            this.companyMailObj.regionAll.push({
              regionId: region.id,
              regionName: region.name
            })

          })
          if (v.id == cityId) {
            return false;
          }
          return true;
        });
      }

      // if (document.querySelector('.region') && !this.isMemberData) {
      //   this.fullscreendialogOn == '個人紙本發票' ? this.addressRegion = '請選擇' : this.addressRegionCompany = '請選擇'
      // }

    },
    closeDialog() {
      this.showDialog = false
      this.fullscreendialogOn = ''
      this.fullscreendialogIndex = null
      this.$emit('stopBodyScroll', 'close')
      this.getData()
    },
    fullscreendialogShow(typeName, typeNum, Index) {
      this.$emit('stopBodyScroll')

      const vm = this;

      vm.fullscreendialogOn = typeName
      vm.fullscreendialogIndex = Index
      vm.showDialog = true

      if (Object.prototype.hasOwnProperty.call(vm.invoiceData, typeNum)) {
        this.switchIsOn = typeNum === this.isDefaultType ? true : false

        switch (typeNum) {
          case 1:
            // foundations: ['伊甸基金會', '財團法人肝病防治學術基金會', '心路基金會'],
            var foundation = vm.invoiceData[typeNum].name;
            var foundationSelIndex = vm.foundations.foundations.findIndex(function (v) {
              return v.name == foundation
            })
            vm.foundations.donateTo = foundationSelIndex
            break;
          case 2: //個人紙本發票,
            vm.memberPaperObj.recipient = vm.invoiceData[typeNum].recipient
            vm.memberPaperObj.city = vm.invoiceData[typeNum].cityId
            vm.memberPaperObj.region = vm.invoiceData[typeNum].countyId
            vm.memberPaperObj.detail = vm.invoiceData[typeNum].address

            break;
          case 3: //公司用郵寄,
            vm.companyMailObj.recipient = vm.invoiceData[typeNum].recipient
            vm.companyMailObj.city = vm.invoiceData[typeNum].cityId
            vm.companyMailObj.region = vm.invoiceData[typeNum].countyId
            vm.companyMailObj.detail = vm.invoiceData[typeNum].address
            vm.companyMailObj.name = vm.invoiceData[typeNum].company
            vm.companyMailObj.vat = vm.invoiceData[typeNum].vat
            break;
          case 4:
            vm.invoiceItems[0].vehicle ? vm.memberInvoiceObj.vehicle = vm.invoiceItems[0].vehicle : vm.memberInvoiceObj.vehicle = '';
            if (vm.memberInvoiceObj.memberInvoiceSel == '會員載具' && vm.isDefaultType == 4) {
              vm.memberInvoiceObj.switch = false
            } else if (vm.memberInvoiceObj.memberInvoiceSel == '手機條碼載具' && vm.isDefaultType == 5) {
              vm.memberInvoiceObj.switch = false
            } else {
              vm.memberInvoiceObj.switch = true
            }
            // vm.isDefaultType == 5 ? vm.memberInvoiceSel = '手機條碼載具' : vm.memberInvoiceSel = '會員載具'

            break;

          case 7:
            vm.companyPrintObj.name = vm.invoiceData[typeNum].company
            vm.companyPrintObj.vat = vm.invoiceData[typeNum].vat
            break;
        }

      } else {
        this.switchIsOn = true
      }

      if (typeName == '電子發票設定及歸戶') {
        this.popupBox('gotoLink')
      }
    },
    selInvoice(i) {
      const vm = this
      const ticket = this.$cookies.get('FEEC-B2C-TICKET')
      const headersData = {
        headers: {
          'authorization': 'Bearer' + ticket,
        }
      }
      let payload = {}

      if (this.invoiceItems[i].typeInfo != '尚未設定') {
        switch (this.invoiceItems[i].typeName) {
          case '個人雲端發票':
            if (vm.memberInvoiceObj.memberInvoiceSel == '手機條碼載具') {
              payload = {
                type: '5',
                isDefault: true,
                vehicle: this.invoiceItems[i].vehicle
              }
            } else {
              payload = {
                type: '4',
                isDefault: true
              }
            }
            break;
          case '雲端發票捐贈':
            payload = {
              type: '1',
              isDefault: true,
              id: this.invoiceItems[i].id,
              name: this.invoiceItems[i].name
            }
            break;
          case '個人紙本發票':
            payload = {
              type: '2',
              isDefault: true,
              cityId: this.invoiceItems[i].cityId,
              countyId: this.invoiceItems[i].countyId,
              address: this.invoiceItems[i].address,
              recipient: this.invoiceItems[i].recipient
            }
            break;
          case '公司用(郵寄)':
            payload = {
              type: '3',
              isDefault: true,
              cityId: this.invoiceItems[i].cityId,
              countyId: this.invoiceItems[i].countyId,
              address: this.invoiceItems[i].address,
              recipient: this.invoiceItems[i].recipient,
              company: this.invoiceItems[i].company,
              vat: this.invoiceItems[i].vat,
            }

            break;
          case '公司用(線上列印)':
            payload = {
              type: '7',
              isDefault: true,
              company: this.invoiceItems[i].company,
              vat: this.invoiceItems[i].vat, // 04595257
            }

            break;
        }
        if (ticket) {
          this.axios.put('api/member/invoice', payload, headersData).then(res => {

            if (res.data.message == 'OK' && res.data.code == 1) {
              this.getData()
              // this.isDefaultType = res.data.payload[0].invoiceInfos[0].type
              // this.isDefault == 5 ? this.isDefault = 0 : this.isDefault = i

              const changeTypeMsg = {
                name: 'add-cart-success__message',
                className: 'friday',
                type: 'success',
                message: '您已變更預設的發票'
              };
              const Message = window.fridayComponent.Message
              const changeType = new Message(changeTypeMsg)
              changeType.init()
              changeType.show()
            } else if (res.data.code == 90401) {
              window.location.href = this.configs.loginUrl()
            }

          });
        } else {
          window.location.href = this.configs.loginUrl()
        }

      } else {
        alert('尚未設定任何資料')
      }

    },
    getData() {
      const ticket = this.$cookies.get('FEEC-B2C-TICKET')
      this.axios
        .get(
          `api/member/invoice?defaultOnly=true`, {
            headers: {
              'authorization': 'Bearer' + ticket
            }
          }).then(res => {
          const invoiceInfos = res.data.payload[0].invoiceInfos
          let newObj = {}
          let defaultVehicle = null
          invoiceInfos.forEach((e) => {
            newObj[e.type] = e
            if (e.vehicle) defaultVehicle = e.vehicle
          })
          this.invoiceData = newObj;
          // 1: 雲端發票捐贈, 2: 個人紙本發票, 3: 公司用郵寄, 4: 會員載具(個人雲端發票), 5: 手機條碼載具(個人雲端發票), 7: 公司用線上列印
          this.invoiceItems.forEach((e, i) => {
            if (e.typeNum != '') {
              if (Object.prototype.hasOwnProperty.call(this.invoiceData, e.typeNum)) {
                e = Object.assign(e, this.invoiceData[e.typeNum])
                if (e.typeNum == 4) {
                  if (e.isDefault) {
                    this.isDefault = 0
                    this.isDefaultType = 4
                    this.invoiceItems[0].typeInfo = `會員載具`
                    this.memberInvoiceObj.memberInvoiceSel = '會員載具'
                  } else {
                    if (Object.prototype.hasOwnProperty.call(this.invoiceData, 5)) {
                      this.invoiceItems[0].typeInfo = `手機條碼載具`
                      if (defaultVehicle) {
                        this.invoiceItems[0].typeInfo += ` ${defaultVehicle}`
                        this.invoiceItems[0].vehicle = defaultVehicle
                        this.memberInvoiceObj.vehicle = defaultVehicle
                      }
                      this.memberInvoiceObj.memberInvoiceSel = '手機條碼載具'

                    } else {
                      this.invoiceItems[0].typeInfo = `會員載具`
                      this.memberInvoiceObj.memberInvoiceSel = '會員載具'
                    }
                  }
                } else if (e.typeNum == 5) {
                  if (e.isDefault) {
                    this.isDefault = 0
                    this.isDefaultType = 5
                    this.invoiceItems[0].typeInfo = `手機條碼載具`
                    if (defaultVehicle) {
                      this.invoiceItems[0].typeInfo += ` ${defaultVehicle}`
                    }
                    this.memberInvoiceObj.memberInvoiceSel = '手機條碼載具'
                  }
                  this.invoiceItems[0].vehicle = e.vehicle // /HYXVV1r
                  this.memberInvoiceObj.vehicle = e.vehicle

                } else {
                  if (e.isDefault) {
                    this.isDefault = i
                    this.isDefaultType = e.typeNum
                  }
                }

                switch (e.typeNum) {
                  case 1:
                    e.typeInfo = this.invoiceData[e.typeNum].name;
                    break;
                  case 2:
                    e.typeInfo = `<span>${this.invoiceData[e.typeNum].maskRecipient} ${this.invoiceData[e.typeNum].maskFullAddress}</span>`;
                    break;
                  case 3:
                    e.typeInfo = `<span>${this.invoiceData[e.typeNum].vat} ${this.invoiceData[e.typeNum].company}</span><span>${this.invoiceData[e.typeNum].maskRecipient} ${this.invoiceData[e.typeNum].maskFullAddress}</span>`;
                    break;
                  case 7:
                    e.typeInfo = `<span>${this.invoiceData[e.typeNum].vat} ${this.invoiceData[e.typeNum].company}</span>`;
                    break;
                }
              } else {
                e.typeInfo = '尚未設定';

                switch (e.typeName) {
                  case '個人雲端發票':
                    this.invoiceItems[0].vehicle = ''
                    this.invoiceItems[5].vehicle = ''
                    this.memberInvoiceObj.vehicle = ''
                    break;
                  case '雲端發票捐贈':
                    this.foundations.donateTo = -1
                    break;
                  case '個人紙本發票':
                    this.memberPaperObj.city = '請選擇';
                    this.memberPaperObj.region = '請選擇';
                    this.memberPaperObj.detail = '';
                    this.memberPaperObj.recipient = '';
                    this.memberPaperObj.isMemberData = false;
                    this.memberPaperObj.isChecked = '';
                    break;
                  case '公司用(郵寄)':
                    this.companyMailObj.city = '請選擇'
                    this.companyMailObj.region = '請選擇'
                    this.companyMailObj.detail = ''
                    this.companyMailObj.recipient = ''
                    this.companyMailObj.name = ''
                    this.companyMailObj.vat = ''
                    this.companyMailObj.isMemberData = false;
                    this.companyMailObj.isChecked = '';
                    break;
                  case '公司用(線上列印)':
                    this.companyPrintObj.name = ''
                    this.companyPrintObj.vat = '' // 04595257
                    break;
                }
              }
            }
          })
        });
    },
  },
}
</script>

<style lang="scss">
$borderRadius10: 10px;
$colorGrey: #adadad;
$colorRed: #f34f59;

hr {
  background-color: #e0e0e0;
  height: 1px;
  border: none;
  margin: 20px 0;
}

.color-grey-txt {
  color: $colorGrey;
}

.color-red-txt {
  color: $colorRed
}

.overlay-block {
  z-index: 99999;
}

.message-fixed.middle.center {
  z-index: 999999;
}

#invoice-wrap {
  .invoice-content {
    .invioce-item {
      position: relative;

      .d-flex {
        background-color: #fff;
        margin: 10px 10px 0;
        padding: 16px 10px;
        border-radius: $borderRadius10;
        font-size: 1.4rem;
        box-sizing: border-box;
      }

      .invoice-box {
        width: calc(100% - 20px);

        padding-left: 8px;

        .invoice-type {
          h3 {
            display: inline-block;
            color: #353635;
          }

          .color-red-txt {
            margin-left: 8px;
          }
        }

        .invoice-info {
          margin-top: 10px;

          p {
            white-space: pre-line;

            span {
              display: block;
              width: 95%;
              word-break: break-all;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              text-overflow: ellipsis;
              max-height: 40px;
              overflow: hidden;
            }
          }
        }

      }

      span.btn-wrapper {
        position: absolute;
        right: 20px;
        top: 16px;
        width: 20%;
        height: 50px;
        text-align: right;
      }

      .angle-right {
        display: inline-block;
      }

    }

    .dialog {

      i {
        vertical-align: middle;
      }

      .error-msg {
        display: none;
        font-size: 1.2rem;
      }

      .input_wrapper {
        margin: 20px 0 10px;

        // .Mcompoent input[type="checkbox"]:checked+label.checkbox::before, .popup-box input[type="checkbox"]:checked+label.checkbox::before
        input[type="checkbox"] {
          position: absolute;
          left: -9999px;
          -webkit-appearance: none;
          -moz-appearance: none;
          min-width: 0;
          box-sizing: border-box;
        }

        input[type="checkbox"]+label.checkboxLabel::before {
          content: "";
          display: inline-block;
          vertical-align: bottom;
          width: 19px;
          height: 19px;
          background-color: #fff;
          margin-right: 10px;
          border: 1.48px solid #404040;
          margin-right: 8px;
          border-radius: 3px;
          box-sizing: border-box;
        }

        input[type="checkbox"]:checked+label.checkboxLabel::before {
          background-image: url(https://m.shopping.friday.tw/static/images/common/square-tick-rd.png);
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          border: 0;
          width: 19px;
          height: 19px;
        }

        input[type='text'],
        select {
          font-size: 1.6rem;
          padding: 10px 15px;
          margin-top: 5px;
          border: 1px solid #f8f9f9;
          color: #3c3c3c;
          border-radius: 10px;
          width: 100%;
          box-sizing: border-box;
          background-color: #f8f9f9;
          -webkit-appearance: none;
          appearance: none;

          &::placeholder {
            color: #adadad;
          }
        }

        select {
          appearance: none;
          background: #f8f9f9 url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOSIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE5IDE4Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0iIzNDM0MzQyIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEzLjA4NSA0Ljk1Yy4yNjUgMCAuNTIzLjA3NS43NDEuMjE1LjU2NC4zNjEuNzM1IDEuMDYzLjQxMiAxLjYxNWwtLjA2Ny4xMDEtNC4wODYgNS42M2MtLjA5My4xMjctLjIxLjIzNy0uMzQ2LjMyNC0uNTY0LjM2Mi0xLjMyMi4yNTQtMS43NS0uMjNsLS4wNzYtLjA5NS00LjA4NS01LjYzYy0uMTQ4LS4yMDQtLjIyOC0uNDQ3LS4yMjgtLjY5NSAwLS42NDIuNTIxLTEuMTcgMS4xODgtMS4yM2wuMTI3LS4wMDVoOC4xN3oiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNTcgLTU4NikgdHJhbnNsYXRlKDIwIDE3NikgdHJhbnNsYXRlKDAgMjQ2KSB0cmFuc2xhdGUoMCAzMykgdHJhbnNsYXRlKDAgODUpIHRyYW5zbGF0ZSg1IDM1KSB0cmFuc2xhdGUoMTMyLjA3NSAxMSkiLz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=') right 5px center/19px 18px no-repeat;
        }

        select:first-of-type {
          margin-right: 5px;
        }

        .error-msg {
          color: $colorRed;
          font-size: 1.2rem;
        }

        &.error {

          input[type='text'],
          select {
            border: 1px solid #f34f59;
          }

          .error-msg {
            display: inline-block;

          }
        }
      }

      .form-area {
        .radio-box {
          height: auto;
          margin: 10px 0;

          label {
            font-weight: normal;
            margin-left: 5px;
            vertical-align: middle;

          }

          input[type="radio"] {
            display: none;
          }
        }

        &.error .radio-box:last-of-type~.error-msg {
          display: inline-block;
          color: $colorRed
        }
      }

      .box {
        position: relative;

        .header {
          font-weight: bold;
        }

        .body {
          padding: 10px 20px;
          margin-bottom: 50px;
          box-sizing: border-box;
          position: unset;

          .company-invoice-box .form-area {
            min-height: 193px;
          }

          .invoice-donate-box .form-area {
            min-height: 140px;
          }

          .member-paper-invoice-box .form-area {
            min-height: 300px;
          }

          .company-invoice-mail-box .form-area {
            height: 490px;
            margin-bottom: 170px;
          }

          .member-cloud-invoice-box .form-area {
            height: 170px;
          }

          .control-box {
            .switch-box {
              position: relative;
              margin: 10px 0;
              color: #353635;
              font-weight: 500;
              line-height: 32px;
              vertical-align: middle;

              .icon-switch {
                position: absolute;
                top: 5px;
                right: 22px;
                cursor: pointer;
              }
            }

          }

          .submit-area {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 10px 0 10px 0;
            border-top: 1px solid #e0e0e0;
            text-align: center;
            background-color: #fff;

            button {
              width: 46%;
              margin: 0 2%;
              height: 40px;
              text-align: center;
              border-radius: 10px;
              background-color: $colorRed;
              color: #ffffff;
              font-size: 1.6rem;
              cursor: pointer;
              border: 0;
              line-height: 1rem;
              font-weight: bold;

              &.reset-btn {
                background-color: #fff;
                color: $colorRed;
                border: 1px solid $colorRed;

                &.disabled {
                  background-color: #ffffff;
                  color: #c7c7c7;
                  border: 1px solid #d2d2d2;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
