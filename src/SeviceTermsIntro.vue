<template>
<div>
  <gotoTop></gotoTop>
  <downloadapp v-on:downloadAppOpened="downloadAppOpened" />
  <navigation :isShowRedTop="isShowRedTop" :windowY="windowY" v-on:stopBodyScroll="stopBodyScroll" :isDownloadAppOpened="isDownloadAppOpened" />
  <div class="serviceTerms">
    <h3 class="serviceTerms__itembar">服務條款</h3>
    <div class="serviceTerms__info">
      <h2 class="serviceTerms__info-subtitle">一、 認知與接受條款</h2>
      <p class="serviceTerms__info-content">
        遠傳電信股份有限公司（以下稱遠傳）/遠時數位科技股份有限公司（以下稱遠時）係依據friDay會員服務條款（以下稱本服務條款）
        提供您friDay各項數位內容暨電子商務之所有相關服務，
        包括但不限於現有或未來新增之各項服務（ 以下統稱「本服務」）。
        當您使用本服務並完成註冊手續成為本服務會員時，即表示您已閱讀、瞭解並同意接受本服務條款之所有內容。遠傳/遠
        時有權於任何時間修改或變更本服務條
        款之項目或內容，修改後的條款內容將公佈於本服務之網站上，建議您隨時注意該等修改或變更。您於本服務條款項目或內容經任何修改或變更
        後繼續
        使用本服務，視為您已閱讀、瞭解並同意接受該等服務項目或內容之修改或變更。如果您不同意本服務條款之內容之全部或一部，或者您
        所屬的國家或地域之法律排除本服務條款內容之全部
        或一部之適用時，您應立即停止使用本服務。
        如您為公司，組織或其他法律上之實體，您保證公司或組織是根據法律合法設立並有效存續之公司或組織，您聲明並保證公司或組織已充分合法
        授權以接受本服務條款。如您代表您的雇主或
        其他法律實體接受本服務條款，您聲明並保證您擁有完整合法的權利，可確保您的雇主或其他法律實體將接受本服務條款之拘束，並將充分履行
        本服務條款之任何及全部義務。若您為未滿二十歲，除應符合上述規定外，並應於您的家長（或監護人）閱讀、瞭解並同意本服務條款之所有內
        容及其後之修改變更後，方得使用或繼續使用
        本服務。當您使用或繼續使用本服務時，即表示您的家長（或監護人）已閱讀、瞭解並同意接受本
        服務條款之所有內容及其後之修改變更。
      </p>
      <h2 class="serviceTerms__info-subtitle">二、 與第三人網站的連結</h2>
      <p class="serviceTerms__info-content">
        本服務提供資料查詢之服務，旨在便利您迅速獲取相關資訊及文件。您可能會因此連結至其他業者經營的網站或其他資訊服務，但不表示遠傳/遠時或本服務與該等業者有任何關係。其他業者
        經營的網站均由各該業者自行負責，不屬遠傳/遠時或本服務控制及負責範圍之內。本服務對檢索結果不擔保其合法性、合適性、可依賴性、即時性、有效性、正確性及完整性。您也許會檢
        索到一些令您厭惡或不需要的網站，這是電腦運作的可能結果，遇到此類情形時，本服務建議您不要瀏覽或儘速離開該等網站。
      </p>
      <h2 class="serviceTerms__info-subtitle">三、 您的註冊義務</h2>
      <p class="serviceTerms__info-content">
        為了能使用本服務，您同意以下事項：
      </p>
      <ul>
        <ol>
          <li>
            依本服務註冊及使用程序之提示提供您本人正確、最新、完整且符合真實的資料。
          </li>
          <li>
            維持並隨時更新您個人資料，確保其為正確、最新、完整且符合真實。若您提供任何錯誤或不實的資料，或原提供之資料已不符合真實，遠傳/遠時有權暫停或終止您的帳號，並拒
            絕您使用本服務之全部或一部。如有核對相關會員資料真實性之必要，遠傳/遠時得要求您提供身分證明文件以茲證明。
          </li>
          <li>遠傳/遠時保留接受或拒絕您的註冊及使用本服務之權利。</li>
        </ol>
      </ul>
      <h2 class="serviceTerms__info-subtitle">四、 本服務網站隱私權政策</h2>
      <p class="serviceTerms__info-content">
        您瞭解並同意為了持續改善本服務，將蒐集一些使用資料，包含但不限於本服務之整體使用狀況資訊與個人資料。您同意並瞭解該等資訊及資料之蒐集與您的個人資料都將受本服務條款以及本服
        務網站隱私權政策之規範。
        為了確保您之個人資料、隱私及消費者權益之保護，於本服務使用過程中將蒐集、處理、利用您之個人資料，謹依個人資料保護法第8條規定告知以下事項：
      </p>
      <ul>
        <ol>
          <li>
            蒐集之目的：
            <p class="serviceTerms__info-content">
              蒐集之目的在於進行行銷業務、法人對會員名冊之內部管理、契約、類似契約或其他法律關係事務、訂位、住宿登記與購票業務、個人資料之合法交易業務、消費者、客戶管理與服
              務、商業與技術資訊、資(通)訊服務、資(通)訊資料庫管理、資訊安全與管理、網路購物及其他電子商務服務、輔助性與後勤支援管理、廣告或商業行為管理、影視、音樂與媒體管理、
              調查、統計與研究分析、其他經營合於營業登記項目或組織章程所定之業務及其他諮詢與顧問服務（法定特定目的項目編號為Ｏ四Ｏ、Ｏ五二、○六九、Ｏ七七、Ｏ八一、Ｏ九Ｏ、Ｏ九八
              、一三五、一三六、一三七、一四八、一五Ｏ、一五二、一五三、一五七、一八一、一八二）。本服務將藉由註冊會員、線上訂購、線上留言、來信客服信箱之方式及過程進行個人資料之蒐集。
            </p>
          </li>
          <li>
            蒐集之個人資料類別：
            <p class="serviceTerms__info-content">
              本服務內蒐集、處理及利用個人資料，依據法務部頒佈之「個人資料保護法之特定目的及個人資料之類別」，包括C001辨識個人者、C002辨識財務者、C003政府資料中之辨識者、
              C011個人描述、C021家庭情形、C024其他社會關係、C035休閒生活及興趣、C036生活格調、C038職業、C032財產、C051學校紀錄、C056著作、C073安全細節、
              C081財務細節(收入、所得、資產與投資)、C093財務交易、C102約定或契約以及其他詳如相關各項活動項目須知或注意事項或相關契約書之內容，並以遠傳/遠時與您往來之相關
              業務或服務及自您或他人所實際蒐集之個人資料為準。
            </p>
          </li>
          <li>
            利用期間、地區、對象及方式：
            <ol>
              <li style="list-style-type: none">
                <p class="serviceTerms__info-content">
                  (1)
                  期間：除法律另有規定外，以您要求停止使用或遠傳/遠時停止提供本服務之日為止。
                </p>
              </li>
              <li style="list-style-type: none">
                <p class="serviceTerms__info-content">
                  (2) 地區：您的個人資料將使用於中華民國地區。
                </p>
              </li>
              <li style="list-style-type: none">
                <p class="serviceTerms__info-content">
                  (3)
                  利用對象：遠傳、遠時、關係企業、業務委外機構、宅配貨運業者及相關配合之廠商，或與遠傳/遠時因業務需要訂有契約關係或業務往來之公私機構，或依法有權之機關。
                </p>
              </li>
              <li style="list-style-type: none">
                <p class="serviceTerms__info-content">
                  (4)
                  利用方式：符合個人資料相關保護法令以自動化機器或其他非自動化之利用方式。
                </p>
              </li>
            </ol>
          </li>
          <li>
            您就個人資料之權利：
            <p class="serviceTerms__info-content">
              依照個人資料保護法第三條規定，您得就所提供之個人資料行使下列權利：
            </p>
            <ol>
              <li style="list-style-type: none">
                <p class="serviceTerms__info-content">(1) 查詢或請求閱覽。</p>
              </li>
              <li style="list-style-type: none">
                <p class="serviceTerms__info-content">(2) 請求製給複製本。</p>
              </li>
              <li style="list-style-type: none">
                <p class="serviceTerms__info-content">(3) 請求補充或更正。</p>
              </li>
              <li style="list-style-type: none">
                <p class="serviceTerms__info-content">
                  (4) 請求停止蒐集、處理或利用。
                </p>
              </li>
              <li style="list-style-type: none">
                <p class="serviceTerms__info-content">(5) 請求刪除。</p>
              </li>
            </ol>
            <p class="serviceTerms__info-content">
              您如欲行使上述權利，可與本服務客服連絡進行申請。但查詢或請求閱覽個人資料或製給複製本者，本服務得酌收必要成本費用每件NT60元。
            </p>
          </li>
          <li>
            您可拒絕提供個人資料予遠傳/遠時，惟您須自行承擔拒絕提供完成註冊程序成為會員所需之資料，或所提供之資料不完整，將可能導致無法享受完整服務或完全無法使用本服務。
          </li>
        </ol>
      </ul>
      <h2 class="serviceTerms__info-subtitle">五、 會員帳號、密碼與安全</h2>
      <p class="serviceTerms__info-content">
        完成本服務的註冊程序之後，您將會收到一個會員帳號及密碼。維持帳號及密碼的機密安全，是您的義務；以同一個會員帳號和密碼使用本服務所進行的所有行為，除經證明係可歸責於遠傳/遠時之故意或重大過失所致者外，都將視為是您本人的行為，應由您自行依法負責。此外，您不得有任何違法或不當使用他人之帳號或密碼之行為。您並同意以下事項：
      </p>
      <ul>
        <ol>
          <li style="list-style-type: none">
            (1)
            您的帳號或密碼遭到盜用或有其他任何安全問題發生時，您應立即通知遠傳/遠時，若您未即時通知所造成之損失，遠傳/遠時將不負任何責任。
          </li>
          <li style="list-style-type: none">
            (2) 每次使用或連線完畢，均登出並結束您的帳號使用。
          </li>
          <li style="list-style-type: none">
            (3)
            您所註冊之會員帳號、密碼及會員權益均僅供您個人使用及享有，不得轉借、轉讓他人或與他人合用，且您的帳號或帳號中之任何權利，於您死亡時即立刻終止。
          </li>
          <li style="list-style-type: none">
            (4)
            帳號或密碼遭盜用、不當使用或其他遠傳/遠時無法辯識是否為您本人親自使用之情況時，對此所致之損害，除證明係因可歸責於遠傳/遠時之故意或重大過失所致，遠傳/遠時將不負任何責任。
          </li>
          <li style="list-style-type: none">
            (5)
            遠傳/遠時若知悉您之帳號密碼確係遭他人冒用時，將立即暫停該帳號之使用(含該帳號所生交易之處理)。
          </li>
          <li style="list-style-type: none">
            (6)
            遠傳/遠時亦無法根據您所提供之資料，確認您的身分真實性或有其他個人資料冒用、盜用、資料不實等情形。如您所提供之資料有任何偽冒不實，應自負一切民、刑事法律責任。
          </li>
        </ol>
      </ul>
      <h2 class="serviceTerms__info-subtitle">六、 兒童及青少年之保護</h2>
      <p class="serviceTerms__info-content">兒童及青少年上網已經成為無可避免之趨勢，使用網際網路獲取知識更可以培養子女的成熟度與競爭能力。然而網路上的確存有不適宜兒童及青少年接受的訊息，例如色情與暴力的訊息，兒童及青少年有可能因此受到心靈與肉體上的傷害。因此，為確保兒童及青少年使用網路的安全，並避免隱私權受到侵犯，家長（或監護人）應盡到下列義務：</p>
      <ul>
        <ol>
          <li>先檢閱各該網站是否有保護個人資料之隱私權政策，再決定是否同意提出相關的個人資料；並應持續叮嚀兒童及青少年不可洩漏自己或家人的任何資料（包括姓名、地址、電話、電子郵件信箱、照片、信用卡號等）給任何人。也不可以單獨接受網友的邀請或贈送禮物而與之見面。</li>
          <li>謹慎選擇合適網站供兒童及青少年瀏覽。未滿十二歲之兒童上網時，應全程在旁陪伴，十二歲以上未滿十八歲之青少年上網前亦應斟酌是否給予同意。</li>
        </ol>
      </ul>
      <h2 class="serviceTerms__info-subtitle">七、 您的守法義務及承諾</h2>
      <p class="serviceTerms__info-content">承諾絕不為任何非法手段、目的或以任何非法方式使用本服務，並承諾遵守中華民國相關法令、各相關主管機關之規定及所有使用網際網路之國際慣例與禮節。您若係中華民國以外之使用者，並同意遵守所屬國家或地域之法令。您同意並保證不得利用本服務從事下列行為，如有違反，遠傳/遠時有權暫停或終止您的帳號，並拒絕您使用本服務之全部或一部，您並須自負一切民、刑事法律責任。侵害他人權益或違法之行為：</p>
      <ul>
        <ol>
          <li>公布或傳送任何誹謗、侮辱、具威脅性、攻擊性、不雅、猥褻、不實、違反公共秩序或善良風俗或其他不法之文字、圖片或任何形式的檔案於本服務網站上；</li>
          <li>侵害他人名譽、肖像權、隱私權、營業秘密、商標權、著作權、專利權、其他智慧財產權及其他權利；</li>
          <li>違反依法律或契約所應負之保密義務；</li>
          <li>冒用他人名義註冊或使用本服務；</li>
          <li>上載、傳輸、散佈電腦病毒；</li>
          <li>從事不法交易行為或張貼、散佈虛假不實、引人錯誤或犯罪之訊息；</li>
          <li>販賣槍枝、毒品、禁藥、盜版軟體或其他違禁物；</li>
          <li>提供賭博資訊或以任何方式引誘他人參與賭博；</li>
          <li>濫發廣告或惡意之郵件或訊息；</li>
          <li>破壞及干擾本服務所提供之各項資料、活動或功能，或以任何方式侵入、試圖侵入、破壞本服務之任何系統，或藉由本服務為任何侵害或破壞行為。</li>
          <li>其他違反法令或公序良俗或有違反之虞之行為</li>
          <li>其他遠傳/遠時認為不適當之行為。</li>
        </ol>
      </ul>
      <h2 class="serviceTerms__info-subtitle">八、 服務內容之變更與電子報及訊息發送</h2>
      <ul>
        <ol>
          <li>您同意遠傳/遠時所提供本服務之範圍，遠傳/遠時均得視業務需要及實際情形，增減、變更或終止相關本服務的項目或內容，且無需個別通知您。</li>
          <li>您同意遠傳/遠時得依本服務實際執行情形，增加、修改或終止相關活動，並選擇以公告於網站之方式告知您。</li>
          <li>您同意本服務得不定期發送電子報、商品或服務之公告、提醒或行銷等訊息(包括但不限於EDM)至您下載或使用本服務之裝置或所登錄的電子信箱。
            如您對於電子信箱所收到之電子報或行銷訊息表示拒絕接受行銷時，本服務將停止繼續發送電子報或行銷訊息至您所登錄的電子信箱。</li>
        </ol>
      </ul>
      <h2 class="serviceTerms__info-subtitle">九、 系統中斷或故障</h2>
      <p class="serviceTerms__info-content">本服務可能會出現中斷或故障等現象，遠傳/遠時不保證本服務、軟體及訊息之傳送等不受干擾、即時提供、安全可靠或無錯誤，可能會造成您使用上的不便、資料喪失、錯誤、
        遭人篡改或其他經濟上損失等情形。您於使用本服務時宜自行採取防護措施。遠傳/遠時對於此服務中斷或故障等現象，造成您因使用或無法使用本服務而造成的損害，除可歸責於
        遠傳/遠時故意或重大過失外，不負任何賠償責任。</p>

      <h2 class="serviceTerms__info-subtitle">十、 下載軟體或資料</h2>
      <p class="serviceTerms__info-content">遠傳/遠時對於您使用本服務或經由本服務或服務網站連結之其他網站而下載的軟體或資料，不負任何擔保責任。您應於下載前自行斟酌與判斷前述軟體、檔案或資料之合法性、
        合適性、有效性、正確性、完整性、及是否侵害他人權利，以免遭受損失（例如：造成您電腦系統受損、或儲存資料流失等）；如您因此而致生損失，遠傳/遠時對於該等損失不負任何賠償責任。</p>

      <h2 class="serviceTerms__info-subtitle">十一、 關於使用及儲存之一般措施</h2>
      <p class="serviceTerms__info-content">您同意遠傳/遠時得就本服務訂定一般規範、限制禁止使用措施及管理政策及制度，包含但不限於本服務將保留電子郵件或訊息、佈告欄內容或其他上載內容之最長期間、
        本服務一個帳號當中可收發電子郵件或訊息的數量限制、本服務一個帳號當中可收發電子郵件或訊息的最大檔案、本服務網站伺服器將為您分配的最大磁碟空間，以及一般特
        定期間內您使用本服務之次數上限（及每次使用時間之上限）。若遠傳/遠時將本服務維持或傳送之任何訊息、通訊和內容刪除或未予儲存，您同意遠傳/遠時毋須承擔任何責
        任。您也同意，遠傳/遠時有權依其自行之考量，不論通知與否，隨時變更這些一般措施及限制。</p>
      <p class="serviceTerms__info-content">本服務係透過有線/無線網際網路或通訊設備提供您各項服務。本服務或本服務提供之軟體須視 SIM 卡或網路、內容格式以及您所使用的裝置的相容性而定。當您使用本服務時，
        可能另外產生傳輸費，該傳輸速度及傳輸費及將依您所選擇之電信服務業者及費率而有所不同，若您於國外使用，須依您所選擇之電信服務業者訂定之國際漫遊計費標準計費。
        您並 同意於使用本服務如依約定須由遠傳/遠時或其他廠商另行收費或代收資訊服務費、手續費等各項費用時，應詳閱並同意遵守本服務之相關收費辦法及說明。</p>

      <h2 class="serviceTerms__info-subtitle">十二、 資訊或建議</h2>
      <p class="serviceTerms__info-content">遠傳/遠時對於您使用本服務或軟體之使用或經由本服務網站連結之其他網站而取得之結果、資訊或建議（包括但不限於，商務、投資理財、醫療、法律等方面），不擔保其為完全為真實、
        可靠或正確無誤。遠傳/遠時對於本服務所提供之結果、資訊或建議有權隨時修改或刪除。您在做出任何相關規劃與決定之前，仍應請教專業人員針對您的情況提出意見，以符合您的個別需求。 </p>
      <p class="serviceTerms__info-content">您明瞭遠傳/遠時隨時會與其他業者包括但不限於活動、廣告、消費資訊的廣告商、商品、內容或服務提供者(以下合稱廠商)合作，本服務中有部份之活動、消費資訊、商業廣告、促銷資訊、
        商品、內容或服務，可能是由該廠商於本服務網站刊登並直接或間接對您提供，遠傳/遠時只提供資訊刊登、查詢及購買之管道，既不參與任何交易之要約或承諾，亦不介入買賣雙方的實際交
        易，遠傳/遠時對其所提供之資訊、內容、商品、服務、或交易並不做實質之審查或修改，對該等資訊、內容、商品、服務、或交易之正確真偽亦不負任何責任，您宜自行判斷之。如與廠商就
        遠傳/遠時對本服務不提供任何明示或默示的擔保，您使用本服務時須自行承擔相關風險，遠傳/遠時不擔保以下事項：其所提供之資訊、內容、商品、服務、或交易發生爭議，遠傳/遠時不負任何責任。 </p>

      <h2 class="serviceTerms__info-subtitle">十三、 免責聲明</h2>
      <p class="serviceTerms__info-content">您明確了解並同意：</p>
      <p class="serviceTerms__info-content">遠傳/遠時對本服務不提供任何明示或默示的擔保，您使用本服務時須自行承擔相關風險，遠傳/遠時不擔保以下事項：</p>
      <ul>
        <ol>
          <li style="list-style-type: none">(1) 您經由本服務或軟體之使用而購買或取得之任何產品、服務、資訊或其他資料將符合您的期望；</li>
          <li style="list-style-type: none">(2) 任何第三人就本服務所為之聲明或行為；</li>
          <li style="list-style-type: none">(3) 使用或無法使用本服務</li>
          <li style="list-style-type: none">(4) 您因買賣、服務或其他交易行為與廠商或廣告主所生之爭執或糾紛，應由廠商或廣告主負完全之責任，
            遠傳/遠時並非各該合約之當事人，對於您所獲得的商品 、服務或其他交易標的物亦不負任何擔保責任；您若係透過遠傳/遠時運營並自行提供
            或販售商品、內容或服務的務網站進行前述買賣、服務或其他交易行為，雙方權利義務將另行依據該網站之責任規範約定書內容決定之；</li>
          <li style="list-style-type: none">(5) 他人未經授權存取或修改您的傳輸或資料；</li>
          <li style="list-style-type: none">(6) 您自本服務網站或經由本服務取得之建議和資訊，無論其為書面或口頭，有無與本服務條款牴觸，均不構成遠傳/遠時或本服務之擔保或保證。</li>
          <li style="list-style-type: none">(7) 您所使用的本服務，無論存在會員註冊機制與否，遠傳/遠時皆不擔保個人使用紀錄與資料之正確性。若有前述錯誤之情形，您可透過客服管道
            尋求協助，然此不構成遠傳/遠時或本服務之擔保或保證 您明確了解並同意遠傳、遠時及其子公司、關係企業、經理人、受僱人、代理人、受任人及授權人，僅因故意或重大過失而違反
            本服務條款時，始應對您負責，即令遠傳、遠時及其子公司、關係企業、經理人、受僱人、代理人、受任人及授權人曾被告知該等損害之可能性亦同。且遠傳、遠時及其子公司、關係企
            業、經理人、受僱人、代理人、受任人及授權人依此對您所負之損害賠償責任總額，除任何間接、附隨、特別、衍生或懲罰性之損害外，均以遠傳/遠時因您該次使用本服務所獲致之利益為上限。 </li>
        </ol>
      </ul>

      <h2 class="serviceTerms__info-subtitle">十四、 廣告或金融相關服務</h2>
      <p class="serviceTerms__info-content">本服務之目的為提供資訊，非供交易或投資之目的。經由本服務或於本服務網站所得瀏覽之任何廣告內容、文字與圖片之說明、展示樣品或其他銷售資訊以及金融相關服務，均由各廣告主、
        產品與服務的供應商以及金融服務機構負完全之責任。您應對任何廣告內容以及金融相關服務之真實性以及可信度自行斟酌判斷，且應注意經由本服務傳送任何資訊之正確性與適用性，遠傳/遠
        時對任何廣告或金融相關服務均不承擔任何責任。基於任何廣告或金融相關服務之任何交易或投資決定，遠傳/遠時亦不予負責。</p>

      <h2 class="serviceTerms__info-subtitle">十五、 會員行為</h2>
      <p class="serviceTerms__info-content">由會員公開張貼或私下傳送的資訊、資料、文字、軟體、音樂、音訊、照片、圖形、視訊、信息或其他資料（以下簡稱「會員內容」），均由「會員內容」提供者自負責任。
        您瞭解並同意遠傳/遠時無法控制經由本服務而張貼之「會員內容」，因此不保証其正確性、完整性或品質。您了解使用本服務時，可能會接觸到令人不快、不適當、令人厭惡之「會員內容」。
        在任何情況下，遠傳/遠時均不為任何「會員內容」負責，包含但不限於任何錯誤或遺漏，以及經由本服務張貼、發送電子郵件或訊息、或傳送而衍生之任何損失或損害。
        您了解遠傳/遠時並未針對「會員內容」事先加以審查，但遠傳/遠時有權（但無義務）依其自行之考量，拒絕或移除經由本服務提供之任何「會員內容」。在不限制前開規定之前提下，
        遠傳/遠時及其指定人有權將違反本服務條款和令人厭惡之任何「會員內容」加以移除。您使用任何「會員內容」時，就前開「會員內容」之正確性、完整性或實用性之情形，
        您同意必須自行加以評估並承擔所有風險。您了解並同意，遠傳/遠時依據法律的要求，或基於以下目的之合理必要範圍內，認定必須將「會員內容」加以保存或揭露予政府機關、
        司法警察或未成年人之監護人時，得加以保存及揭露：</p>
      <ul>
        <ol>
          <li style="list-style-type: none">(a) 遵守法令或政府機關之要求或程序</li>
          <li style="list-style-type: none">(b) 執行本服務條款，</li>
          <li style="list-style-type: none">(c) 回應任何侵害第三人權利之主張，或</li>
          <li style="list-style-type: none">(d) 保護本服務及其使用者及公眾之權利、財產或個人安全。 </li>
        </ol>
      </ul>

      <h2 class="serviceTerms__info-subtitle">十六、 智慧財產權的保護</h2>
      <p class="serviceTerms__info-content">本服務所使用之軟體或程式、網站上所有內容，包括但不限於著作、圖片、檔案、資訊、資料、網站架構、網站畫面的安排、網頁設計，均由遠傳/遠時或其他權利人依法擁有其智慧財產權，
        包括但不限於商標權、專利權、著作權、營業秘密與專有技術等。任何人不得逕自使用、修改、重製、公開播送、改作、散布、發行、公開發表、進行還原工程、解編或反向組譯。
        若您欲引用或轉載前述軟體、程式或網站內容，必須依法取得遠傳/遠時或其他權利人的事前書面同意。尊重智慧財產權是您應盡的義務，如有違反，您應對遠傳/遠時及其相關公司，
        及其董事，職員，雇員及代理商負損害賠償責任（包括但不限於訴訟費用及律師費用等）。 </p>

      <h2 class="serviceTerms__info-subtitle">十七、 您對遠傳/遠時之授權</h2>
      <p class="serviceTerms__info-content">若您無合法權利授權他人使用、修改、重製、公開播送、改作、編輯、散布、發行、公開發表、公開傳輸某資料，並將前述權利轉授權第三人時，請勿擅自將該資料上載、傳送、輸入或提供至本服務網站；
        任何資料一經您上載、傳送、輸入或提供至本服務網站時，視為您已允許並授權遠傳/遠時可以基於公益或私益之目的，無條件於本服務條款有效期間內，不限地區使用、修改、重製、公開播送、改作、編輯、
        散布、發行、公開發表、公開傳輸該等資料，並得將前述權利轉授權他人，您對此絕無異議。您並應保證遠傳/遠時使用、修改、重製、公開播送、改作、編輯、散布、發行、公開發表、公開傳輸、轉授權該等資料，
        不致侵害任何第三人之智慧財產權，否則應對遠傳、遠時及其相關公司、其董事、經理人、受僱人、代理人、受任人及代理商負損害賠償責任（包括但不限於訴訟費用及律師費用等）。 </p>

      <h2 class="serviceTerms__info-subtitle">十八、 著作權侵害之處理</h2>
      <p class="serviceTerms__info-content">如您認為本服務或本服務網站中之任何內容或資訊已侵害您的著作權，請提供</p>
      <ul>
        <ol>
          <li>權利人或其代理人之姓名或名稱、地址及聯絡電話、傳真號碼、電子郵件信箱或其他自動聯繫方式。</li>
          <li>被侵害之著作或製版之名稱。</li>
          <li>請求將涉有侵害著作權或製版權之內容移除或使他人無法進入之聲明。</li>
          <li>足使遠傳/遠時知悉該涉有侵權內容之相關資訊及其存取路徑。</li>
          <li>表示權利人係基於善意，相信涉有侵權內容係未經合法授權或違反著作權法之陳述。</li>
          <li>註明如有不實致他人受損害者，權利人願負法律責任等相關資料及聲明，並經簽名或蓋章後送交遠傳/遠時以下的聯絡窗口。</li>
        </ol>
      </ul>
      <p class="serviceTerms__info-content">如您認為您並未侵害他人之著作權者，請提供</p>
      <ul>
        <ol>
          <li>使用者或其代理人之姓名或名稱、地址及聯絡電話、傳真號碼或電子郵件信箱。</li>
          <li>請求回復被移除或無法進入之內容之聲明。</li>
          <li>足使遠傳/遠時知悉該回復內容之相關資訊。</li>
          <li>表示使用者基於善意， 認為其有合法權利利用該內容，而該內容被移除或使他人無法進入，係出於權利人或其代理人不實或錯誤之陳述。</li>
          <li>同意遠傳/遠時將回復通知轉送予權利人或其代理人。</li>
          <li>註明如有不實致他人受損害者，使用者願負法律責任等相關資料及聲明，並經簽名或蓋章後送交遠傳/遠時以下的聯絡窗口。</li>
          <li style="list-style-type: none">連絡窗口：客服部</li>
          <li style="list-style-type: none">連絡電話：02-7703-3955 </li>
        </ol>
      </ul>

      <h2 class="serviceTerms__info-subtitle">十九、涉嫌侵害您的著作權的處理原則</h2>
      <p class="serviceTerms__info-content">遠傳/遠時為尊重智慧財產權，對於本服務或本服務網站中之任何內容或資訊涉嫌侵害您的著作權者，遠傳/遠時之處理原則如下：</p>
      <ul>
        <ol>
          <li>遠傳/遠時接獲權利人的通知書後，將儘速移除權利人所主張涉有侵害著作權之內容，並依據使用者約定之聯絡方式或使用者留存之聯絡資訊，轉知使用者涉有侵權情事。遠傳/遠時得將處理情況，包括權利人的姓名、電子郵件或電話等提供予該使用者，俾該使用者得直接與權利人溝通解決爭議。若著作權侵權通知不完備者，遠傳/遠時將會通知權利人補正相關資訊。</li>
          <li>使用者的內容倘若經權利人主張涉有侵害其著作權者，該內容一旦經遠傳/遠時刪除後，遠傳/遠時即無法再行回復。又使用者如有三次涉有侵權情事者，遠傳/遠時將終止該使用者全部或部分之本服務。</li>
          <li>但倘若使用者對於權利人主張的侵權情事有不同意者，該使用者得檢具通知文件要求遠傳/遠時將該通知文件轉知權利人以表示異議；若使用者的通知不完備者，遠傳/遠時將會通知使用者補正相關資訊。遠傳/遠時於接獲前項之通知文件後，會立即將該通知文件轉送給權利人。若權利人未於接獲該通知文件之次日起十個工作日內，提出已對該使用者提出訴訟之證明者，該使用者將可以自行重新上傳該內容。</li>
          <li>前述權利人或使用者的通知若不完備者，遠傳/遠時得以其所提供之電子郵件或傳真通知補正相關資訊。</li>
          <li>權利人或使用者必須於接到遠傳/遠時補正通知之次日起五個工作日內完成補正，屆期未補正或未完全補正者，依著作權法之規定即為未提出通知。</li>
          <li>除經使用者同意或於提供服務之目的者外，遠傳/遠時僅得依法令或政府機關之要求，提供使用者之識別資料予第三人。因之，您如依本辦法提出檢舉，遠傳/遠時僅會依您的請求移除該侵權內容，不會提供您有關該使用者之識別資料。您如欲取得該使用者資料，您應向檢察官或司法警察官提出告訴，遠傳/遠時將於前開單位來函要求提供使用者資料後，即刻配合提供之。</li>
        </ol>
      </ul>

      <h2 class="serviceTerms__info-subtitle">二十、 拒絕或終止您的使用</h2>
      <p class="serviceTerms__info-content">您同意遠傳/遠時得基於其自行之考量，因任何理由，包含但不限於缺乏使用，或遠傳/遠時認為您已經違反本服務條款的明文規定及精神，終止您的密碼、
        帳號（或其任何部分）或本服務之使用，並將本服務內任何「會員內容」加以移除並刪除。遠傳/遠時亦得依其自行之考量，於通知或未通知之情形下，隨時終
        止本服務或其任何部分。您同意依本服務條款任何規定提供之本服務，無需進行事先通知即得終止，您承認並同意，遠傳/遠時得立即關閉或刪除您的帳號及您
        帳號中所有相關資料及檔案，及停止本服務之使用。此外，您同意若本服務之使用被終止或停止，遠傳/遠時對您或任何第三人均不承擔任何責任。</p>

      <h2 class="serviceTerms__info-subtitle">二十一、 準據法與管轄法院</h2>
      <p class="serviceTerms__info-content">本服務條款之解釋與適用，以及與本服務條款有關之爭議，均應依照中華民國法律予以處理，並以臺灣台北地方法院為第一審管轄法院。</p>

      <h2 class="serviceTerms__info-subtitle">二十二、 轉讓限制</h2>
      <p class="serviceTerms__info-content">未經遠傳/遠時之預先書面同意，您不得擅自將本服務條款之權利義務轉讓予他人。 </p>

      <h2 class="serviceTerms__info-subtitle">二十三、可分割性</h2>
      <p class="serviceTerms__info-content">本服務條款之任何項目因任何理由被視為無效、違法或無法執行，均不得影響本服務條款其他條款之效力和可執行性。</p>

      <h2 class="serviceTerms__info-subtitle">二十四、通知</h2>
      <p class="serviceTerms__info-content">本服務條款之任何通知均應以書面(含電子郵件)形式為之；您同意遠傳/遠時有權以電子郵件之方式依您註冊時所提供之電子郵件位址，寄送書面通知給您，並於寄發當時即生通知送達之效力。 </p>

      <h2 class="serviceTerms__info-subtitle">二十五、全部協議</h2>
      <p class="serviceTerms__info-content">本服務條款生效後將取代先前您與遠傳/遠時間之一切共識或協議（無論口頭或是書面）。</p>
    </div>
  </div>
</div>
</template>

<script>
import downloadapp from "./components/common/downloadapp.vue"; // 頁面最上方的app下載提示
import navigation from "./components/common/navigationFix.vue"; // 共用天的導覽列
import gotoTop from "./components/common/gotoTop.vue";

export default {
  name: "seviceTermsIntro",
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
.serviceTerms {
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

    ol {
      padding: 0.5em 0em 1.5em 0.7em;
      font: normal 1.6rem "Century Gothic", "微軟正黑體";

      li {
        padding-bottom: 5px;
        text-align: justify;
        text-justify: inter-ideograph;
        margin-left: 2.2em;
        color: $black;
        list-style-image: url(./images/icons/arrow.png);

        ol {
          padding-left: 0;

          li {
            p {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>
