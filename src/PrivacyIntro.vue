<template>
<div>
  <gotoTop></gotoTop>
  <downloadapp v-on:downloadAppOpened="downloadAppOpened" />
  <navigation :isShowRedTop="isShowRedTop" :windowY="windowY" v-on:stopBodyScroll="stopBodyScroll" :isDownloadAppOpened="isDownloadAppOpened" />
  <div class="privacy">
    <h3 class="privacy__itembar">隱私權說明</h3>
    <div class="privacy__info">
      <h1 class="privacy__info-title">
        friDay購物隱私權保護政策<i class="privacy__info-orangeUnderline"></i>
      </h1>
      <p class="privacy__info-content">
        遠傳電信股份有限公司（以下稱遠傳）/遠時數位科技股份有限公司（以下稱遠時）為保障您於使用Qbon、Qmart及friday各項數位內容暨電子商務相關服務（以下統稱本服務）之隱私權，基於承諾保護及尊重您的個人隱私，遠傳/遠時將遵循保護個人隱私及個人資料安全之法令要求；friday隱私權保護政策(以下稱本政策)將幫助您了解，遠傳/遠時於本服務如何蒐集、處理、利用、保護個人資料以及我們告知個人資料的對象，請詳閱以下內容：
      </p>
      <h2 class="privacy__info-subtitle">一、個人資料蒐集及利用</h2>
      <p class="privacy__info-content">
        依照個人資料保護法第八條規定，對於客戶個人資料之蒐集、處理、利用等，須告知您相關事項如下，請詳閱：
      </p>
      <ol type="1">
        <li>
          適用範圍
          <p>
            當您使用本服務或透過本服務申請、註冊、登錄會員、查詢、檢索、閱覽個人帳戶資料、訂購商品或服務、使用商品或服務、取得各式商品或服務及其他相關消費訊息、參加本服務所舉辦之網路活動、參加本服務所舉辦之廣告、行銷、產品宣傳活動，問券調查或贈獎活動，或進行滿意度調查、獲取意見回饋、回覆您的提問或資訊查詢、提供及改善本服務、使用者經驗調查及分析等客戶服務時，除本服務之個人資料蒐集、處理及利用之告知事項，請參閱本服務之服務條款外，遠傳/遠時將依以下之規定蒐集、處理及利用您的個人資料。其次，瀏覽本服務之網頁，遠傳/遠時會自動接收並記錄您電腦及瀏覽器上之資料，包括
            IP位址、cookie中的資料、軟體和硬體屬性以及您瀏覽的網頁紀錄;當您使用遠傳/遠時提供的APP服務，遠傳/遠時可能會接收並記錄您行動裝置的類型與版本資訊、UDID/裝置識別碼、您行動裝置所提供的地理定位資料來判斷您的位置以及使用偏好。該等資料通常無法直接或間接辨識為個人資料，但如該等資料足以直接或間接辨識為個人資料時，遠傳/遠時對於個人資料之蒐集、利用、處理，則依本條之規定為告知。
            遠傳/遠時在上述之特定使用目的範圍內，可能將您所提供的部分個人資料告知遠傳/遠時的協力廠商，且遠傳/遠時會確保該協力廠商會嚴格遵守本政策。
            除為配合法令、主管機關或司法單位之要求、或為保全法律上的請求、或抗辯或為防止詐騙或其他不法行為所必要以外，遠傳/遠時不會在與蒐集目的無關的範圍內使用或移轉您的個人資料予第三人，遠傳/遠時同時承諾不會販售或行銷您的個人資料予第三人。
            本服務網站與所提供的APP服務可能包含其他業者之網站或網頁的連結或使用他人提供之服務，對於此等不屬於遠傳/遠時之連結或服務，您應了解其蒐集個人資料的行為毋論其內容或隱私權政策，概與遠傳/遠時無涉。
          </p>
        </li>
        <li>
          蒐集目的
          <div>
            蒐集、處理及利用個人資料之特定目的如下：行銷業務、法人對會員名冊之內部管理、契約、類似契約或其他法律關係事務、訂位、住宿登記與購票業務、個人資料之合法交易業務、消費者、客戶管理與服務、商業與技術資訊、資(通)訊服務、資(通)訊資料庫管理、資訊安全與管理、網路購物及其他電子商務服務、輔助性與後勤支援管理、廣告或商業行為管理、影視、音樂與媒體管理、調查、統計與研究分析、其他經營合於營業登記項目或組織章程所定之業務及其他諮詢與顧問服務（法定特定目的項目編號為Ｏ四Ｏ、Ｏ五二、○六九、Ｏ七七、Ｏ八一、Ｏ九Ｏ、Ｏ九八、一三五、一三六、一三七、一四八、一五Ｏ、一五二、一五三、一五七、一八一、一八二）。本服務將藉由註冊會員、線上訂購、線上留言、來信客服信箱之方式或提供服務之過程進行個人資料之蒐集。
          </div>
        </li>
        <li>
          蒐集類別
          <div>
            本服務內蒐集、處理及利用個人資料，依據法務部頒佈之「個人資料保護法之特定目的及個人資料之類別」，包括C001辨識個人者、C002辨識財務者、C003政府資料中之辨識者、C011個人描述、C021家庭情形、C024其他社會關係、C035休閒生活及興趣、C036生活格調、C038職業、C032財產、C051學校紀錄、C056著作、C073安全細節、C081財務細節(收入、所得、資產與投資)、C093財務交易、C102約定或契約以及其他詳如相關各項活動項目須知或注意事項或相關契約書之內容，並以遠傳/遠時與您往來之相關業務或服務及自您或他人所實際蒐集之個人資料為準。
          </div>
        </li>
        <li>
          利用之期間、地區、對象及方式
          <div>
            利用之期間：除法律另有規定外，以您要求停止使用您的個人資料或遠傳/遠時停止提供本服務之日為止。
            <br />
            利用之地區：您的個人資料將使用於中華民國地區。
            <br />
            利用之對象：遠傳、遠時、關係企業、業務委外機構、宅配貨運業者及相關配合之廠商，或與遠傳/遠時因業務需要訂有契約關係或業務往來之公私機構，或依法有權之機關。
            <br />
            利用之方式：符合個人資料相關保護法令以自動化機器或其他非自動化之利用方式。
          </div>
        </li>
        <li>
          依照個人資料保護法第三條規定，您得就所提供之個人資料行使下列權利：
          <div>
            -.查詢或請求閱覽。
            <br />
            -.請求製給複製本。
            <br />
            -.請求補充或更正。
            <br />
            -.請求停止蒐集、處理或利用。
            <br />
            -.請求刪除。
            <br />
            您如欲行使上述權利，可與本服務客服連絡進行申請。但查詢或請求閱覽個人資料或製給複製本者，本服務得酌收必要成本費用每件NT60元。
          </div>
        </li>
        <li>
          您得自由選擇是否提供個人資料予遠傳/遠時，惟您須自行承擔拒絕提供完成註冊程序成為會員或使用遠傳/遠時服務所需之資料，或所提供之資料不完整，將可能導致無法享受完整服務或完全無法使用本服務，例如未提供身分證字號，將無法參與本服務舉辦之行銷活動、取消及退款；如未提供生日之日期，將無法寄送生日優惠予使用者等。遠傳/遠時亦無法根據您所提供之資料，確認您的身分真實性或有其他個人資料冒用、盜用、資料不實等情形。如您所提供之資料有任何偽冒不實，應自負一切民、刑事法律責任。
        </li>
      </ol>

      <h2 class="privacy__info-subtitle">二、資料分享與揭露</h2>
      <ol type="1">
        <li>
          當您瀏覽本服務網頁，本服務會自動接收並記錄您電腦及瀏覽器上之資料，包括
          IP位址、cookie中的資料、軟體和硬體屬性以及您瀏覽的網頁紀錄，當您使用遠傳/遠時提供的APP服務，遠傳/遠時可能會接收並記錄您行動裝置的類型與版本資訊、UDID/裝置識別碼、您行動裝置所提供的地理定位資料來判斷您的位置以及使用行為偏好（下稱「相關資料」）。
        </li>
        <li>
          本服務記錄相關資料後，為提供您更好的服務，並針對您的需求提供個人化的服務內容，本服務會向您傳送相關特定訊息，如服務公告、行銷廣告、管理訊息等相關資訊。
        </li>
        <li>
          為改善您的使用者體驗以及本服務的整體服務品質，本服務可能會不定時在行銷偏好設定頁面上新增新類別的行銷訊息。瀏覽頁面之使用者可選擇退出接收新類別的行銷訊息、按照所收訊息中的指示或操作導覽取消訂閱這些訊息，惟您可能因此無法使用本服務網站或APP服務的完整功能。
        </li>
        <li>
          本服務之廣告主包括金融服務提供者（如銀行、保險代理人、證券經紀人及抵押貸款機構）和非金融公司（如商店、航空公司及軟體公司）。廣告主
          (包括廣告遞送公司)
          可能假定那些瀏覽、點閱行銷廣告或與廣告互動的人士符合行銷標準。一旦瀏覽廣告或與廣告發生互動，即表示您同意廣告主可能會假定您符合展示型廣告所使用的行銷標準。
        </li>
        <li>
          遠傳/遠時提供個人資訊給關係企業或其他可信賴的公司或人員時，將要求他人遵守遠傳/遠時指示以及本政策和任何其他適當的保密和安全措施，並代為處理這類資訊。
        </li>
        <li>
          為了達到下列目的，對個人資訊的存取、使用、保存或揭露屬合理必要行為時，遠傳/遠時將與其他公司、機構或個人分享您的個人資訊：
          <div>
            -符合適用法律、法規、法律程序或政府執行命令。<br />-執行適用本服務條款，包括調查可能的違規情事。<br />-偵測、防止或以其他方式處理詐欺、安全或技術問題。<br />-法律規定或在合法範圍內，保護遠傳、遠時、使用者或公眾之權利、財產或安全不致遭受危害。
          </div>
        </li>
      </ol>

      <h2 class="privacy__info-subtitle">三、Cookie</h2>
      <ol type="1">
        <li>本服務會在您的電腦上設定並存取本服務之cookie資料 。</li>
        <li>
          本服務允許在某些本服務網頁上刊登廣告之其他公司在您的電腦上設定並存取
          cookie。其他公司將根據其自訂之隱私權政策使用其cookie，並非依據本政策。廣告主或其他公司無法存取本服務之cookie資料。
        </li>
        <li>
          本服務會使用網路beacon存取我們的網站內外與產品及服務有關的cookie。
        </li>
      </ol>

      <h2 class="privacy__info-subtitle">四、UDID/裝置識別碼</h2>
      <ol type="1">
        <li>
          遠傳/遠時會在您行動裝置上設定並存取遠傳/遠時之UDID/裝置識別碼資料。
        </li>
        <li>
          遠傳/遠時使用您的UDID/裝置識別碼係為提供您更好的個人化體驗與迅速精確的客服處理，不作為辨別使用者身份使用。
        </li>
        <li>
          根據iOS/android對開發者的UDID/裝置識別碼使用規範，當您重置您的UDID/裝置識別碼後，我們將不對您的新舊UDID/裝置識別碼產生足以識別的關聯。同時，與UDID/裝置識別碼相關的紀錄與資料也將消失。
        </li>
      </ol>

      <h2 class="privacy__info-subtitle">五、機密性和安全性</h2>
      <ol type="1">
        <li>
          遠傳/遠時將您的個人資料提供給遠傳/遠時合理相信並為向您提供產品或服務或為完成工作而必須取得該個人資料之員工。
        </li>
        <li>
          本服務主機設有防火牆、防毒等各種資訊安全措施，包括作業程序、技術等層面。
        </li>
        <li>本服務已確實採取實體、電子和程序防護措施。</li>
      </ol>
      <h2 class="privacy__info-subtitle">六、隱私權保護政策修訂</h2>
      <p class="privacy__info-content">
        本服務將保留隨時修訂本政策之權利。如個人資料的處理上有重大變更時，本服務將會通知傳送至您在系統中指定之主要電子郵件地址，或於本服務之服務網站上張貼告示。
      </p>
      <h2 class="privacy__info-subtitle">七、著作權侵害之處理</h2>
      <p class="privacy__info-content">
        如您認為本服務或本服務網站中之任何內容或資訊已侵害您的著作權，請提供以下資訊：
      </p>
      <ol type="1">
        <li>
          權利人或其代理人之姓名或名稱、地址及聯絡電話、傳真號碼、電子郵件信箱或其他自動聯繫方式被侵害之著作或製版之名稱。
        </li>
        <li>
          請求將涉有侵害著作權或製版權之內容移除或使他人無法進入之聲明。
        </li>
        <li>足使遠傳/遠時知悉該涉有侵權內容之相關資訊及其存取路徑。</li>
        <li>
          表示權利人係基於善意，相信涉有侵權內容係未經合法授權或違反著作權法之陳述。
        </li>
        <li>
          註明如有不實致他人受損害者，權利人願負法律責任等相關資料及聲明，並經簽名或蓋章後送交本服務客服信箱。
        </li>
      </ol>
      <p class="privacy__info-content">
        如您認為您並未侵害他人之著作權者，請提供以下資訊：
      </p>
      <ol type="1">
        <li>
          使用者或其代理人之姓名或名稱、地址及聯絡電話、傳真號碼或電子郵件信箱。
        </li>
        <li>
          請求回復被移除或無法進入之內容之聲明。足使遠傳/遠時知悉該回復內容之相關資訊。
        </li>
        <li>
          表示使用者基於善意，認為其有合法權利利用該內容，而該內容被移除或使他人無法進入，係出於權利人或其代理人不實或錯誤之陳述。
        </li>
        <li>同意遠傳/遠時將回復通知轉送予權利人或其代理人。</li>
        <li>
          註明如有不實致他人受損害者，使用者願負法律責任等相關資料及聲明，並經簽名或蓋章後寄送至本服務客服信箱。
        </li>
      </ol>
      <h2 class="privacy__info-subtitle">八、涉嫌侵害您的著作權的處理原則</h2>
      <p class="privacy__info-content">
        遠傳/遠時為尊重智慧財產權，對於本服務或本服務網站中之任何內容或資訊涉嫌侵害您的智慧財產權者，遠傳/遠時之處理原則如下：
      </p>
      <ol type="1">
        <li>
          遠傳/遠時接獲權利人的通知書後，將儘速移除權利人所主張涉有侵害著作權之內容，並依據使用者約定之聯絡方式或使用者留存之聯絡資訊，轉知使用者涉有侵權情事。遠傳/遠時得將處理情況，包括權利人的姓名、電子郵件或電話等提供予該使用者，俾該使用者得直接與權利人溝通解決爭議。若著作權侵權通知不完備者，遠傳/遠時將會通知權利人補正相關資訊。
        </li>
        <li>
          使用者的內容倘若經權利人主張涉有侵害其著作權者，該內容一旦經遠傳/遠時刪除後，遠傳/遠時即無法再行回復。又使用者如有三次涉有侵權情事者，遠傳/遠時將終止該使用者全部或部分之本服務。
        </li>
        <li>
          但倘若使用者對於權利人主張的侵權情事有不同意者，該使用者得檢具通知文件要求遠傳/遠時將該通知文件轉知權利人以表示異議；若使用者的通知不完備者，遠傳/遠時將會通知使用者補正相關資訊。遠傳/遠時於接獲前項之通知文件後，會立即將該通知文件轉送給權利人。若權利人未於接獲該通知文件之次日起十個工作日內，提出已對該使用者提出訴訟之證明者，該使用者將可以自行重新上傳該內容。
        </li>
        <li>
          前述權利人或使用者的通知若不完備者，遠傳/遠時得以其所提供之電子郵件或傳真通知補正相關資訊。
        </li>
        <li>
          權利人或使用者必須於接到遠傳/遠時補正通知之次日起五個工作日內完成補正，屆期未補正或未完全補正者，依著作權法之規定即為未提出通知。
        </li>
        <li>
          除經使用者同意或於提供服務之目的者外，遠傳/遠時僅得依法令或政府機關之要求，提供使用者之識別資料予第三人。因之，您如依本原則提出檢舉，遠傳/遠時僅會依您的請求移除該侵權內容，不會提供您有關該使用者之識別資料。您如欲取得該使用者資料，您應向地方法院檢察署或刑事警察局提出告訴，遠傳/遠時將於前開單位來函要求提供使用者資料後，即刻配合提供之。
        </li>
      </ol>
      <h2 class="privacy__info-subtitle">九、問題和建議</h2>
      <p class="privacy__info-content">
        您有任何問題或建議，請透過本服務客服信箱與遠傳/遠時聯繫。
      </p>
    </div>
  </div>
</div>
</template>

<script>
import downloadapp from "./components/common/downloadapp.vue"; // 頁面最上方的app下載提示
import navigation from "./components/common/navigationFix.vue"; // 共用天的導覽列
import gotoTop from './components/common/gotoTop.vue';

export default {
  name: "privacyIntro",
  data() {
    return {
      isDownloadAppOpened: false,
      isShowRedTop: true,
      windowY: 0,
      isStopScrolling: false,
    };
  },
  components: {
    downloadapp,
    navigation,
    gotoTop
  },
  methods: {
    downloadAppOpened() {
      this.isDownloadAppOpened = !this.isDownloadAppOpened;
    },
    stopBodyScroll(action, jumpCurrentY = true) {
      const body = document.body;
      if (!this.isStopScrolling) {
        body.style = "padding:0;margin:0;overflow:hidden;height:100%";
        this.isStopScrolling = !this.isStopScrolling;
      }
      if (action === "close") {
        body.style = "padding:0;margin:0;";
        if (jumpCurrentY) {
          setTimeout(() => {
            window.scrollTo(0, this.currentY);
          }, 0);
        }
        this.isStopScrolling = false;
      }
    },
  },
  created() {
    window.addEventListener(
      "scroll",
      () => {
        const wy = window.scrollY;
        this.windowY = wy;
        this.currentY = wy !== 70 && wy !== 0 ? wy : this.currentY;
        this.isShowRedTop = wy > 0 ? false : true;
      }, {
        passive: true,
      }
    );
  },
};
</script>

<style lang="scss">
@import "./style/reset.module.scss";
@import "./style/flex.module.scss";
@import "./style/rwd.module.scss";
@import "./style/icons.module.scss";
@import "./style/global.module.scss";
</style>

<style lang="scss" scoped>
@import "./style/_color.scss";
.privacy {
  &__itembar {
    background: url(./images/icons/itembar-icon.jpeg) 8px 12px no-repeat,
      $alabaster url(./images/icons/itembar-bg.jpeg) left top repeat-x;
    border-radius: 0;
    padding: 8px 8px 8px 24px;
    font-size: 1.5rem;
    color: $tundora;
    font-weight: 600;
  }

  &__info {
    padding: 5%;

    &-title {
      color: $tan-hide;
      font: bold 2.5rem "Century Gothic", "å¾®è»Ÿæ­£é»‘é«”";
      padding-bottom: 15px;
    }

    &-orangeUnderline {
      width: 100%;
      height: 12px;
      background: url(./images/icons/dot.png);
    }

    &-content {
      color: $tundora;
      font: normal 1.6rem "Century Gothic", "微軟正黑體";
      text-align: justify;
      text-justify: inter-ideograph;

      &:first-of-type {
        margin-bottom: 20px;
      }
    }

    &-subtitle {
      color: $elf-green;
      font: bold 2rem "Century Gothic", "微軟正黑體";
    }

    ol {
      padding: 0.5em 0em 1.5em 0.7em;
      font: normal 1.6rem "Century Gothic", "微軟正黑體";

      li {
        padding-bottom: 5px;
        text-align: justify;
        text-justify: inter-ideograph;
        margin-left: 2.2em;
        color: $black;
      }
    }
  }
}
</style>
