<template>
<div>
  <gotoTop></gotoTop>
  <downloadapp v-on:downloadAppOpened="downloadAppOpened" />
  <navigation :isShowRedTop="isShowRedTop" :windowY="windowY" v-on:stopBodyScroll="stopBodyScroll" :isDownloadAppOpened="isDownloadAppOpened" />
  <div class="shoppingAggrement">
    <h3 class="shoppingAggrement__itembar">購物約定條款</h3>
    <div class="shoppingAggrement__info">
      <h2 class="shoppingAggrement__info-subtitle">《遠傳friDay購物線上購物約定條款》</h2>
      <p class="shoppingAggrement__info-content">遠傳電信股份有限公司（以下稱遠傳）/遠時數位科技股份有限公司（以下稱遠時數位）/（以下簡稱本公司）係依據遠傳friDay購物會員服務條款及遠傳friDay購物線上購物約定條款（以下稱本條款）提供您friDay各項數位內容暨電子商務之所有相關服務，包括但不限於現有或未來新增之各項服務。 歡迎您在遠傳friDay購物進行消費並成為遠傳friDay購物網站使用者。為保障您的權益，請您先詳細閱讀以下的約定條款。當您點選「我同意」的核取方塊或在遠傳friDay購物網站進行訂購、兌換、付款、消費或進行相關行為(以下簡稱本服務)，即視為您事先已經知悉並同意遵守本條款的所有約定:</p>

      <h2 class="shoppingAggrement__info-subtitle">一、線上購物</h2>
      <ul>
        <li>您了解並同意雙方將以電子文件作為意思表示方法。</li>
        <li>本公司負責您在friDay購物之一切商品訂購及服務提供，且就您於friDay購物所瀏覽的訊息、或所進行的消費，僅提供行銷服務、相關連結、或電子商務之平台服務。</li>
        <li>商品交易頁面呈現之商品名稱、價格、內容、規格、型號及其他相關資訊(包括交易限制及說明等)，亦為契約之一部分。</li>
        <li>訂單確認機制及契約履行
          <ol style="list-style-type: lower-alpha">
            <li>當您完成線上訂購程序送出訂單後，即表示您提出要約，並不代表雙方交易已經完成(契約尚未成立)，尚需本公司確認訂單內容無誤而發出貨通知後，交易始為完成(契約成立)，您可以在friDay購物網站上查詢出貨狀況。本公司保留是否接受您的訂單之權利(如本公司無法接受訂單而取消訂單等情形)。</li>
            <li>當您完成線上訂購程序送出訂單後，本公司會自動經由電子郵件或其他方式寄發訂購通知，但此通知只是代表已經收到您的訂購訊息。</li>
            <li>本公司將盡快為您確認訂單商品種類、數量、價格及其他相關資訊，並於確認無誤後通知出貨。若訂單內容有誤(如商品的種類、數量、價格、型號、說明及其他相關資訊有誤等)、商品無存貨、服務無法提供、或有本公司無法接受訂單之情形，本公司將通知您訂單已被取消且將不會向您收費。如以ATM作為付款方式，本公司於收到您的退款資料後，會將退款匯入您所提供的銀行帳戶。</li>
          </ol>
        </li>
        <li>本公司提供多種付款方式供您選擇，若選擇以信用卡支付價金，其在線上輸入信用卡相關資訊，目的是為了向發卡機構確認信用卡之有效性及取得交易授權；該筆交易將於商品出貨後進行請款，在本公司接受該訂單以前，您無需付款，本公司也不會請領信用卡交易款項，該筆交易金額也不會出現在您的信用卡帳單中。如選擇以信用卡支付價金、且以分期方式支付，則該等分期付款服務係由您的信用卡發卡機構提供，分期付款之債權債務關係存在於您與信用卡發卡機構之間，除相關網頁上有特別標示者外，您所需支付之利息及其計算方式、是否另有信用保險或保證人之設定或涉入等，均依照您與信用卡發卡機構間之相關約定內容定之，請注意查閱您與信用卡發卡機構間之相關約定。</li>
        <li>本公司得就特定商品訂定每次訂購之數量上限；如逾越本公司訂定之數量上限進行下單時，本公司僅依該數量上限出貨。</li>
        <li>您所訂購的所有商品或服務，關於其品質、保固及售後服務等，都是由各該商品或服務的原廠、代理商、進口商、經銷商或服務提供者，依照其所制定的條件，負責對提供品質承諾、保固及售後服務，但本公司承諾解決關於因為線上消費所產生的疑問或爭議，您可在登入系統後，依照線上客服系統所訂之處理機制、程序及相關聯絡資訊提出申訴或爭議。</li>
        <li>如網頁未標示另行加收運費者，視同運費由本公司自行負擔。</li>
        <li>您所訂購的商品或服務，若經配送兩次無法送達且經無法聯繫超過三天者，本公司將取消該筆訂單並全額退款。 </li>
      </ul>
      <h2 class="shoppingAggrement__info-subtitle">二、線上兌換</h2>
      <ul>
        <li>本條款所稱「兌換」，係指您於遠傳friDay購物網站以所累計之快樂購卡點數、遠傳幣，作為取得本公司提供商品或服務之全部或一部對價。</li>
      </ul>

      <h2 class="shoppingAggrement__info-subtitle">三、線上購物、線上兌換之退貨</h2>
      <ul>
        <li>依照消費者保護法規定，除屬通訊交易解除權合理例外情事適用準則排除適用猶豫期之商品外，您於遠傳friDay購物網站消費均享有商品到貨7日猶豫期，於前開期間內得不附理由退回商品或以書面通知本公司解除買賣契約，無須負擔任何費用或價款。</li>
        <li>請留意:猶豫期並非商品試用期間，猶豫期間之退貨商品請保持全新狀態且包裝完整(包括但不限於產品、附件、包裝、發票、廠商紙箱及所有附隨文件或資料之完整性)，否則將影響退貨權益(包括但不限於酌收回復原狀費用)。</li>
        <li>如屬通訊交易解除權合理例外情事適用準則排除適用猶豫期之商品，一經訂購或拆封即可能影響退貨權益，購買前請務必確認清楚。</li>
        <li>本公司於接獲退貨通知後，將視商品性質委託宅配公司於五個工作天內取回退貨商品。</li>
        <li>本公司於檢驗退貨商品無誤後，將依付款方式及遠傳friDay購物網站折價券/折扣碼、遠傳幣、快樂購卡點數使用說明，盡速處理退款及歸還快樂購卡點數及遠傳幣等事宜。</li>
        <li>如遇訂單爭議需以退貨退款方式處理，您同意由本公司代為處理發票及折讓單相關事宜。</li>
      </ul>

      <h2 class="shoppingAggrement__info-subtitle">四、資料安全</h2>
      <ul>
        <li>為了維護交易資料安全，您必須擔保於friDay購物網站進行本服務過程中所留存的所有資料均為完整、正確、與當時情況相符，如果事後有變更，您應該即時通知本公司網站管理者。</li>
        <li>對於您所留存的資料，本公司除了為完成該筆交易或您服務而提供給相關商品或服務之配合廠商以外，不會任意洩漏或提供給第三人。</li>
        <li>在下列情況下，本公司有權查看或提供您個人資料給有權機關、或主張其權利受侵害並提出適當證明的第三人：
          <ol style="list-style-type: lower-alpha">
            <li>基於法律之規定、或受司法機關與其他有權機關基於法定程序之要求。</li>
            <li>在緊急情況下為維護其他使用者或第三人之合法權益。</li>
            <li>為維護本服務系統的正常運作。</li>
            <li>您透過本服務與商家購物、兌換贈品，因而產生的金流、物流必要資訊。</li>
            <li>您使用本服務之行為違反本條款。</li>
          </ol>
        </li>
        <li>您應妥善保管、使用您的帳號及密碼，不得以出借或其他任何方式或名義提供或洩露予任何第三人。並於每次使用後確實登出，以防他人盜用。基於網路交易特性，利用此組帳號與密碼登入系統後所進行之一切行為，您應自行負責。若您發現其帳號或密碼遭人非法使用，請立即通知本公司網站管理者，本公司將於受通知後暫停該帳號之處理及後續利用。</li>
        <li>您在friDay購物網站進行本服務，系統將自動記錄各種電子交易資料，如果您發現交易資料不正確，應立即通知本公司。</li>
        <li>本公司於知悉您的帳號密碼被冒用且經確認時，將予暫停該帳號之處理及後續利用。</li>
        <li>本公司網站內可能包含許多連結，這些被連結網站或網頁上的所有資訊，均由被連結網站所提供。</li>
      </ul>

      <h2 class="shoppingAggrement__info-subtitle">五、系統安全</h2>
      <ul>
        <li>本公司將確保與您交易之電腦系統具有符合一般可合理期待之安全性；如果您發現本系統有錯誤或疏失，請立即通知本公司。</li>
        <li>本系統會定期備份資料，但是除非本系統有故意或重大過失，本系統不對任何資料的失誤刪除、或備份錯誤或失敗負責。</li>
        <li>您瞭解並同意，本公司可能因公司、其他合作廠商或相關電信業者網路系統軟硬體設備之故障或失靈、或人為操作上之疏失而全部或一部中斷、暫時無法使用、遲延、或造成資料傳輸或儲存上之錯誤、或遭第三人侵入系統篡改或偽造變造資料等，您不得因此而要求任何補償或賠償。</li>
      </ul>

      <h2 class="shoppingAggrement__info-subtitle">六、賠償責任限制</h2>
      <ul>
        <li>本公司對於您因終止或解除契約依法負有賠償責任者，除非另有法律規定，本公司僅於您所付之對價範圍內，負賠償責任。</li>
      </ul>

      <h2 class="shoppingAggrement__info-subtitle">七、約定條款的解釋原則</h2>
      <ul>
        <li>本條款係本於平等互惠的原則訂定，條款遇有疑義時，應為有利於您之解釋。</li>
        <li>前開有利您之解釋，仍應探求當事人之真意，不得拘泥於所用之辭句，並依誠信原則為之。</li>
      </ul>

      <h2 class="shoppingAggrement__info-subtitle">八、準據法及管轄法院</h2>
      <ul>
        <li>您在遠傳friDay購物網站進行本服務而與本公司間所生之權利義務關係，應依中華民國法律解釋適用之。</li>
        <li>您在遠傳friDay購物網站進行本服務，以及因本條款所發生的爭議，如果因此而涉訟，除法律另有強制規定外，同意以臺灣臺北地方法院為第一審管轄法院。</li>
      </ul>
      <p class="shoppingAggrement__info-ver shoppingAggrement__info-content">遠傳friDay購物2021.08-V2.0</p>
    </div>
  </div>
</div>
</template>

<script>
import downloadapp from "./components/common/downloadapp.vue"; // 頁面最上方的app下載提示
import navigation from "./components/common/navigationFix.vue"; // 共用天的導覽列
import gotoTop from "./components/common/gotoTop.vue";

export default {
  name: "shoppingAggreementIntro",
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
    gotoTop,
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
.shoppingAggrement {
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

    &-content {
      color: $tundora;
      font: normal 1.6rem "Century Gothic", "微軟正黑體";
      text-align: justify;
      text-justify: inter-ideograph;
      margin-bottom: 20px;
    }

    &-subtitle {
      color: $elf-green;
      font: bold 2rem "Century Gothic", "微軟正黑體";
      margin-bottom: 5px;
    }

    ul {
      padding: 0.5em 0em 1.5em 0em;
      font: normal 1.6rem "Century Gothic", "微軟正黑體";
      list-style-type: decimal;

      li {
        margin-left: 6%;
        list-style-image: inherit;
        padding-bottom: 10px;
        text-align: justify;
        color: $black;

        ol {
          padding: 0.5em 0em 1.5em 0.7em;
        }
      }
    }

    &-ver {
      text-align: right;
    }
  }
}
</style>
