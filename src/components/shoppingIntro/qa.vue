<template>
<div class="qa">
  <div class="qa__idx">
    <a href="javascript:void(0);" @click="scrollTo('intro1')">購物流程</a>
    <a href="javascript:void(0);" @click="scrollTo('intro2')">付款方式</a>
    <a href="javascript:void(0);" @click="scrollTo('intro3')">商品運送</a>
    <a href="javascript:void(0);" @click="scrollTo('intro4')">發票寄送</a>
    <a href="javascript:void(0);" @click="scrollTo('intro5')">退貨須知</a>
    <a href="javascript:void(0);" @click="scrollTo('intro6')">客戶服務</a>
    <a href="javascript:void(0);" @click="scrollTo('intro7')">快樂購卡點數使用說明</a>
    <a href="javascript:void(0);" @click="scrollTo('intro8')">折價券/折扣碼使用說明</a>
    <a href="javascript:void(0);" @click="scrollTo('intro9')">個人資料保護說明</a>
    <a href="javascript:void(0);" @click="scrollTo('intro10')">遠傳幣使用說明</a>
  </div>
  <div class="qa__content">
    <h3 class="qa__content-head" ref="intro1" name="intro1">購物流程：</h3>
    <div class="qa__content-info">
      <div class="qa__content-infoChart">
        <span>選購商品</span>
        <span>購物結帳</span>
        <span>付款選擇</span>
        <span>收到訂單</span>
      </div>
      <ul>
        <li>選購商品：透過頁面瀏覽或是全文檢索的搜尋方式，找到您要的商品</li>
        <li>購物結帳：在要購買的商品頁點選「立刻買」或「放入購物車」，進入結帳頁面</li>
        <li>付款選擇：請選擇付款方式，並填寫訂購資料</li>
        <li>收到訂單：會員依據本公司提供之商品數量及價格等確認機制進行下單，即表示您提出要約，並不代表雙方交易已經完成(契約尚未成立)，如果本公司確認交易條件無誤、會員所訂購之商品仍有存貨或所訂購之服務仍可提供或無其他本公司無法接受訂單之情形，此時本公司將另行寄發會員出貨通知(契約成立)，或者會員可以直接在網站上查詢出貨狀況。</li>
      </ul>
    </div>
    <h3 class="qa__content-head" ref="intro2" name="intro2">付款方式：</h3>
    <div class="qa__content-info">
      <ul>
        <li>宅配商品請您選擇信用卡線上刷卡(線上刷卡的資料傳輸均採用SSL憑證加密，保護您的資料安全)、行動支付付款(LINE Pay、HAPPY GO Pay…等)、ATM轉帳。</li>
        <li>門市取貨商品請您選擇超商取貨付款、信用卡線上刷卡(線上刷卡的資料傳輸均採用SSL憑證加密，保護您的資料安全)、行動支付付款(LINE Pay、HAPPY GO Pay…等)、ATM轉帳。</li>
        <li>部份商品提供信用卡分期付款或信用卡紅利折抵，可分期或可紅利折抵之信用卡發卡行明細請參考<a href="https://shopping.friday.tw/event/GH_bank/bonus.html" target="blank">網站公告</a>(不同期數只接受特定的銀行信用卡，請參考商品網頁說明，並使用指定的信用卡)。</li>
      </ul>
    </div>
    <h3 class="qa__content-head" ref="intro3" name="intro3">商品運送：</h3>
    <div class="qa__content-info">
      <ul>
        <li>一般商品免運費，除(快速到貨)及(特別標示)說明外。</li>
        <li>宅配商品將以宅配、貨運或郵局方式送達，運送區域僅限於台灣本島（外島地區的朋友請利用台灣親友地址做為收貨地址）。</li>
        <li>遠傳門市/德誼門市取貨商品：
          <ul style="list-style-type:upper-alpha;">
            <li>訂購時請選擇取貨門市，待商品送達後，系統將發送簡訊及Email提醒您取貨，請本人攜帶身分證件領取商品。</li>
            <li>門市取貨商品領貨時提供【手機/平板】商品點驗服務：
              <ul style="list-style-type:disc;">
                <li>協助共同確認外盒與機體外觀瑕疵。</li>
                <li>商品序號與盒裝序號是否相同。</li>
                <li>盒裝配件是否短少。</li>
                <li>領貨時請主動告知門市人員偕同點驗。</li>
              </ul>
            </li>
          </ul>
        </li>
        <li>超商門市取貨：
          <ul style="list-style-type:upper-alpha;">
            <li>訂購時請選擇取貨門市，待商品送達後，系統將發送簡訊及Email提醒您取貨，請本人攜帶身分證件領取商品。</li>
          </ul>
        </li>
        <li>一般宅配/門市取貨商品於付款完成後將於2~5個工作天內配達（不含例假日），不含訂製、預購、家電、傢俱商品。</li>
        <li><span class="fasticon"></span>快速到貨商品：
          <ul style="list-style-type:upper-alpha;">
            <li>【台北市/新北市/基隆市/桃園市】：當日00:00~08:00前完成訂單且付款成功，最快可於當日21:00前到貨；08:01~23:59間完成訂單，則最快可於隔日21:00前到貨。</li>
            <li>以上皆不包含離島、部分偏遠地區路段與<a href="https://www.post.gov.tw/post/internet/Postal/index.jsp?ID=1487298102783">郵局非快捷區</a>；若遇颱風地震等天災、公共工程等狀態，出貨時間將依實際情況順延。</li>
            <li>快速出貨商品出貨速度較快，恕無法「取消訂單」亦無法「變更配送地址」，若收件人資訊不完整或配送不成功，商品退回後訂單將自動進行退貨及退款。</li>
            <li>快速到貨整台購物車的「總商品金額」滿 490 元免運費；未滿 490 元需另收 75 元運費。</li>
            <li>快速到貨商品出貨速度較快，恕無法「取消訂單」亦無法「變更配送地址」，若收件人資訊不完整或配送不成功，商品退回後訂單將自動進行退貨及退款。</li>
          </ul>
        </li>
      </ul>
    </div>
    <h3 class="qa__content-head" ref="intro4" name="intro4">發票寄送：</h3>
    <div class="qa__content-info">
      若您選擇三聯式或索取二聯式紙本發票，發票將於商品完成出貨15個工作天另行寄出，另約加2-7個工作天內送達，如遇國定假日將順延寄送。
    </div>
    <h3 class="qa__content-head" ref="intro5" name="intro5">退貨須知：</h3>
    <div class="qa__content-info">除依法規規範下列不適用7天猶豫期商品外：
      <ul>
        <li>易於腐敗、保存期限較短或解約時即將逾期。</li>
        <li>依消費者要求所為之客製化給付。</li>
        <li>報紙、期刊或雜誌。</li>
        <li>經消費者拆封之影音商品或電腦軟體。</li>
        <li>非以有形媒介提供之數位內容或一經提供即為完成之線上服務，經消費者事先同意始提供。</li>
        <li>已拆封之個人衛生用品。</li>
        <li>國際航空客運服務，或其他由法令明定之商品或服務，經本公司於網頁上告知消費者，排除消費者保護法解除權之適用。</li>
      </ul>
      適用7天猶豫期之商品(部分商品僅適用7天猶豫期，請依據賣場說明內容為主)，若您想要辦理退貨，猶豫期將自您收到商品次日起算，我們會安排宅配公司與您聯繫。請您將退貨商品包裝妥當，於約定時間提供宅配人員取件，並請您保留宅配單據。
      <br>
    </div>
    <div class="qa__content-info">請注意，退貨的商品必須回復原狀，亦即必須是全新狀態且包裝完整，包括且不限於產品、附件、包裝、贈品、廠商紙箱及所有附隨文件或資料之完整性等，此外，下列情形可能影響退貨權限：
      <ul>
        <li>隨商品已附上相同之試用品，或在收到影音光碟及軟體前已提供您試聽、試用之機會。</li>
        <li>在不影響檢查商品情形下，商品包裝毀損、封條移除、吊牌拆除、貼膠移除或標籤拆除等情形。</li>
        <li>在收到商品前已提供檢查商品之機會。</li>
        <li>其他逾越檢查之必要或可歸責於購買者之事由，致商品有毀損、滅失或變更的情形。</li>
      </ul>
      除上述情形外辦理退貨作業外，另外並且整理附表提供參酌，附表資料未列之商品類別或與法規有所牴觸者，將優先適用法規規範。
      <table cellspacing="0" cellpadding="0" class="qaTable">
        <tbody>
          <tr>
            <th width="16%">商品類別</th>
            <th width="50%">退貨商品狀況</th>
            <th width="34%">收取商品回復原狀<br>
              費用的條件
            </th>
          </tr>
          <tr>
            <td>3C、相機、手機類商品</td>
            <td rowspan="2">1.提醒您，商品一經「拆封、連結網路｣，等同價值已受損，如需辦理退貨，可能產生商品回復原狀之費用。<br>
              2.建議開箱全程錄影留存:確認商品內容是否正確、外觀可否接受，再行開機使用，以免影響您的權利。<br>
              3.退貨商品必須回復原狀，亦即必須回復至您收到商品時的初始狀態且包裝完整【內含主商品、附件：包含驅動程式、應用軟體、作業系統軟體(以上不得拆封及使用其序號進行註冊)、電源線、充電器、外紙箱、內紙箱(若商品包裝紙箱有原廠對應序號之情形時)、配件紙箱、保麗龍、保護袋、贈品等及商品附隨文件及資料，需一併退回，若如缺件/內容物不完整，將影響退貨權益。】<br>
              4.另關於家電商品包括但不限於洗衣機、烘衣機、電冰箱、冷凍櫃、空調，除產品本身故障或瑕疵外，一經使用將會影響退貨權益。
            </td>
            <td rowspan="17">依據商品退貨狀況無法回復原狀(包含已組裝、使用、刮傷、毀損、變形、受潮、污損或商品內容、零配件、贈品、外包裝等短缺)，或因未完整包裝導致運送過程中商品毀損，造成商品價值損失時，除商品本身瑕疵、異常導致外，本公司得依據商品狀況酌收回復原狀之費用。</td>
          </tr>
          <tr>
            <td>家電類商品(大、小家電)</td>
          </tr>
          <tr>
            <td>電腦軟體、數位商品（含影音商品）、線上儲值類商品</td>
            <td>1. 電腦軟體(實體版)、數位軟體(實體版)、錄音帶、錄影帶、CD、VCD、DVD類等商品：除新品瑕疵外，一經拆封(除商品瑕疵異常導致無法使用)，依法規規範不適用7天猶豫期。<br>
              2. 電腦軟體(序號、線上下載版)、數位商品(序號、線上下載版)等非以有形媒介提供之數位內容：除新品瑕疵外，一經提供(商品出貨)即為完成之線上服務(除商品瑕疵異常導致無法使用)，依法規規範不適用7天猶豫期。<br>
              3. 線上儲值類商品(回復原狀困難商品)其序號一經使用即可能影響退貨權益。
            </td>
          </tr>
          <tr>
            <td>健康美容、美粧類商品</td>
            <td>退貨商品必須回復原狀，亦即必須回復至您收到商品時的初始狀態且包裝完整【包含購買商品、附件、內外包裝、贈品….等】需一併退回，若如缺件/內容物不完整，將影響退貨權益。<br>
              提醒您，部分健康美容、美粧商品因涉及個人衛生用品，一旦開封或使用(除商品瑕疵異常導致無法使用)皆不適用7天猶豫期，例如:<br>
              1. 接觸性健康美容商品：毛孔吸引器、蒸臉器、刮鬍刀、美體刀…..等。<br>
              2. 接觸性美妝商品：粉餅、口紅、睫毛膏…等。
            </td>
          </tr>
          <tr>
            <td>精品、珠寶、手錶類商品</td>
            <td>退貨商品必須回復原狀，亦即必須是回復至您收到商品時的初始狀態且包裝完整【內含主商品、配件、內外包裝袋(盒)、贈品等及商品附隨文件及資料】需一併退回，若如缺件/內容物不完整，將影響退貨權益。<br>
              提醒您，若因使用穿戴而對商品各部位有以下情況，將影響退貨權益。<br>
              1. 精品、珠寶（標籤不得拆除）：鑽石、寶石、戒台台座、墜台座、戒圈、附鍊，以及任何實體部分因穿戴產生的外部損壞、刮傷、污漬。
              2. 手錶（標籤不得拆除）：除新品瑕疵外，錶心、玻璃、錶帶、錶冠、外框、螺絲，以及任何實體部分因穿戴產生的外部損壞、刮傷、污漬。
            </td>
          </tr>
          <tr>
            <td>服飾、內衣、貼身內著類商品</td>
            <td>
              退貨商品必須回復原狀，亦即必須是回復至您收到商品時的初始狀態且包裝完整【內含主商品、配件、內外包裝袋(盒)、贈品等及商品附隨文件及資料】。<br>
              1. 服飾紡織品(女裝、男裝、童裝、男女運動服…等)，除商品瑕疵異常外，若商品一經剪標、下水洗滌、污漬、沾染異味，將影響退貨權益。<br>
              2. 基於保障消費者個人衛生，貼身衣物恕不接受試穿，一旦開封，依法規規範(除商品瑕疵異常導致無法使用)皆不適用7天猶豫期。<br>
              3.貼生衣物例如：內衣褲(含隱形胸罩、胸扥、胸貼、透明肩帶、水餃墊/美胸墊、襯裙)、塑身衣(含馬甲、束褲、束腿、腰夾、內搭)、泳裝、襪子、紙尿褲....等。
            </td>
          </tr>
          <tr>
            <td>鞋類商品</td>
            <td>退貨商品必須回復原狀，亦即必須回復至您收到商品時的初始狀態且包裝完整【內含購買商品、附件、內外包裝、吊牌完整、贈品….等】需一併退回，若內容物不完整或商品本身鞋底磨損、鞋面髒污刮傷、鞋頭已楦過...等情況影響原商品狀態，將影響退貨權益，可能產生回復原狀之費用。</td>
          </tr>
          <tr>
            <td>食品類商品(含健康食品)</td>
            <td>食品類商品基於保障消費者個人衛生，本商品如經拆封或經使用，即可能影響退貨權益。<br>
              提醒您，部分食品易於腐敗、保存期限較短或依照客製化特別製作，依法規規範並不適用7天猶豫期(例：生鮮水果、客製化生日蛋糕、現作生乳卷、糕點、鮮奶…等)。
            </td>
          </tr>
          <tr>
            <td>餐廚、衛浴設備</td>
            <td>退貨商品必須回復原狀，亦即必須回復至您收到商品時的初始狀態且包裝完整【內含購買商品、附件、贈品….等】需一併退回，退回之商品如已拆封(即除運送用之包裝外一切包裝、包括但不限於封膜等接觸商品內容之包裝部分)或已非全新狀態(外觀有刮傷、破損、受潮、污漬…等)，將影響退貨權益。<br>
              提醒您，商品如有退貨，恕無法退還已回收或代處理之舊餐廚、衛浴設備。
            </td>
          </tr>
          <tr>
            <td>廚房用品、鍋具、刀具、瓷器</td>
            <td>退貨商品必須回復原狀，亦即必須回復至您收到商品時的初始狀態且包裝完整【包含購買商品、附件、贈品….等】需一併退回，如商品一經使用或損毀，或未遵守使用注意事項導致損壞，將影響退貨權益。</td>
          </tr>
          <tr>
            <td>傢俱寢具</td>
            <td>退貨商品必須回復原狀，亦即必須回復至您收到商品時的初始狀態且包裝完整【內含主商品、配件、內外包裝袋(箱)、贈品等及商品附隨文件及資料。】，若商品退回(已組裝、使用、毀損、變形、受潮、污損或零配件、贈品、外包裝等短缺)，將影響退貨權益。<br>
              1. 大型傢俱商品如有退貨，恕無法退還已回收或代處理之舊傢俱。<br>
              2. 寢具類(例：床包組、枕頭套、被套、羽絨被、天鵝棉....等)商品基於保障消費者個人衛生，本商品如經下水、洗滌、拆封、使用、或拆解以致缺乏完整性，都有可能影響退貨權益。
            </td>
          </tr>
          <tr>
            <td>親子玩具</td>
            <td>退貨商品必須回復原狀，亦即必須回復至您收到商品時的初始狀態且包裝完整【內含主商品、配件、內外包裝袋(箱)、贈品等及商品附隨文件及資料。】，若商品退回(已組裝、使用、毀損、變形、受潮、污損或零配件、贈品、外包裝等短缺)，將影響退貨權益。</td>
          </tr>
          <tr>
            <td>尿布、嬰幼兒耗品</td>
            <td>退貨商品必須回復原狀，亦即必須回復至您收到商品時的初始狀態且包裝完整【內含主商品、內外包裝袋(箱)、贈品...等】，若商品受潮、污損或已拆封，將影響退貨權益。<br>
              提醒您，尿布、嬰幼兒耗品類商品(例：尿布、奶嘴、奶粉、嬰兒禮品包)屬個人衛生清潔用品與消耗性產品，除產品本身瑕疵外，一經拆封使用，都將會影響退貨權益。
            </td>
          </tr>
          <tr>
            <td>寵物用品</td>
            <td>退貨商品必須回復原狀，亦即必須回復至您收到商品時的初始狀態且包裝完整【內含主商品、內外包裝袋(箱)、贈品...等】，為避免接觸性傳染疾病，若商品受潮、污損或已拆封，將影響退貨權益。</td>
          </tr>
          <tr>
            <td>書籍、報紙、期刊、雜誌</td>
            <td>報紙、期刊、雜誌，除商品瑕疵外，依法規規定不適用7天猶豫期。
              書籍類商品屬智慧財產權之商品，商品一經拆封將會影響退貨權益。
            </td>
          </tr>
          <tr>
            <td>客製化商品</td>
            <td>依消費者要求所為之客製化給付(例如：刻製印章、商品客製化刻字、專屬客製蛋糕、個人化照片…等)因專屬個別消費者所製作之商品，除商品瑕疵外，依法規規定不適用7天猶豫期。</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h3 class="qa__content-head" ref="intro6" name="intro6">客戶服務：</h3>
    <div class="qa__content-info">若您有任何疑問，可先參照常見問題，或可在登入【<a href="/mobileweb/member/ListMyOrderMenu?module=list">會員中心</a>】後於訂單中點選「我要提問」，接獲您的訊息後，服務人員將儘速回覆予您。</div>
    <h3 class="qa__content-head" ref="intro7" name="intro7">快樂購卡點數使用說明：</h3>
    <div class="qa__content-info">
      <h4 class="subHead">什麼是快樂購卡點數?</h4>
      <div class="subCont">快樂購卡點數是特別回饋給快樂購卡卡友的一項服務，只要卡友在快樂購卡指定的任何地方消費付款金額達到回饋條件，就可以依您訂購金額獲得快樂購卡點數。
        所累積的快樂購卡點數將於點數入帳日的第二年底到期，期滿將無法使用。例如：2019/1/1~2019/12/31期間所累積之點數，將全部於2020/12/31到期。</div>

      <h4 class="subHead">如何獲得快樂購卡點數?</h4>
      <div class="subCont">只要在本網站「<a href="/mobileweb/member/ListMyOrderMenu?module=list">會員中心</a>」點選「<a href="/mobileweb/member/queryHappyGoPoints">啟用/重新驗証HAPPY GO卡累兌點服務</a>」完成啟用後，您未來於本網站之有效訂單(無取消訂單及申請退貨)，我們將以訂單實付金額(不含遠傳幣及HAPPY GO點數全額折抵) 回饋HAPPY GO點數。
        <p>累點規則說明如下：</p>
        <ul>
          <li>消費集點計算方式：每筆消費滿NT$100可累一點，其中電腦 / 筆電 / 電玩 / 相機、手機 / 配件 / 穿戴 / 耳機、家電 / 電視 / 冷氣 / 冰箱、健身 / 旅行 / 戶外 / 汽百、餐劵 / 票劵為每筆消費滿NT$200累一點。</li>
          <li>在訂單出貨完成後第14天，點數即會自動進入您的有效快樂購卡帳戶。</li>
          <li>退貨/取消訂單時，消費所獲得的點數會自動扣除。</li>
          <li>本網站會不定期舉辦各式購物回饋活動，給予網站會員驚喜集點優惠！</li>
        </ul>
      </div>

      <h4 class="subHead">如何使用快樂購卡點數?</h4>
      <div class="subCont">
        <ul>
          <li>只要您有足夠的快樂購卡點數，即可在friDay購物選擇適用點數折抵金額之商品，也可以用點數全額兌換商品。</li>
          <li>消費結帳時，您可填寫本次購物想要使用點數折抵消費之金額，系統將自動計算本次交易可折抵的快樂購卡點數，訂購完成頁會顯示實際折抵金額和最後應付金額。</li>
          <li>原則上每筆消費可用快樂購卡點數40點折抵10元，點數折抵計算，係依每張訂單佔該交易編號實付金額比例分攤，消費折抵無上限，若您消費金額未超過10元，則無法於本次消費折抵點數。</li>
          ※點數折抵舉例說明: <br>
          (1)同一交易編號有3張訂單，總金額為3,800元，以HG點數80點折抵20元，實際付款金額為3,780元。<br>
          (2)每一訂單HG點數折抵金額，依訂單金額佔該交易編號金額比例計算。<br>
        </ul>
        <div style="overflow-x:auto; width:100%;">
          <table calss="qaTable">
            <tbody>
              <tr>
                <th>訂單(同一交易編號)</th>
                <th>原始訂單金額(元)</th>
                <th>點數折抵金額(元/四捨五入)</th>
                <th>實際付款金額(元)</th>
              </tr>
              <tr>
                <td>訂單1</td>
                <td>500</td>
                <td>(500/3800)*20=3</td>
                <td>497</td>
              </tr>
              <tr>
                <td>訂單2</td>
                <td>1000</td>
                <td>(1000/3800)*20=5</td>
                <td>995</td>
              </tr>
              <tr>
                <td>訂單3</td>
                <td>2300</td>
                <td>(2300/3800)*20=12</td>
                <td>2288</td>
              </tr>
              <tr>
                <td>合計</td>
                <td>3800</td>
                <td>20</td>
                <td>3780</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h4 class="subHead">取消訂單，退貨點數處理</h4>
      <div class="subCont">
        1. 取消訂單或退貨點數處理規則：
        <p>• 訂單未成立：當您付款不成功時，系統將於3小時內歸還您該筆交易已使用的點數；如遇系統維護時間，系統將於48小時內歸還您該筆交易使用之HAPPY GO點數。</p>
        <p>• 取消訂單：當您申請「取消訂單」時，系統將於取消訂單成功後3天內，歸還您該筆交易使用之HAPPY GO點數(該筆訂單將不會回饋HAPPY GO點數)。</p>
        <p>• 申請退貨：當您申請「退貨」時，系統將於退款完成後3天內，歸還您該筆交易使用之HAPPY GO點數(該筆訂單將不會回饋HAPPY GO點數)。</p>
        2. 如就已消費並贈送快樂購卡點數之商品或服務退換貨時，依規定將扣回該商品贈送之快樂購卡點數，如點數不足扣回者，需繳還點數處理成本費用（計算公式：不足之點數*NT$ 0.4）。
      </div>

      <h4 class="subHead">注意事項</h4>
      <div class="subCont">
        如有HAPPYGO卡片使用及點數相關問題，請您於服務時間聯繫HAPPYGO客服中心，將有專人即時為您服務。<br>
        HAPPYGO客服中心電話：02-77166888<br>
        服務時間：周一至週五 09:00~18:00
      </div>
    </div>
    <h3 class="qa__content-head" ref="intro8" name="intro8">折價券使用說明：</h3>
    <div class="qa__content-info">
      <h4 class="subHead">折價券</h4>
      <div class="subCont">
        <ul>
          <li>「折價券」是 friDay購物不定期提供網路會員獨享專屬的折價券，您可以透過活動領取或符合特定資格，折價券會存入您的會員專屬帳戶中，您可經由登入「<a href="/mobileweb/member/ListMyOrderMenu?module=list">會員中心</a>」查詢個人專屬折價券。</li>
          <li>折價券限在本站購物時使用。在您購物結帳時，如果您的帳戶存有折價券，且購買適用折價券折抵的商品，在購物車明細可圈選要使用折價券。會跳出您的折價券帳戶視窗，請選擇您欲使用之折價券，系統將會自動為您計算本次消費實際支付金額。請注意，一次交易限抵用一張折價券 。</li>
          <li>每張折價券皆有其折抵上限、開始日期、使用效期、適用館別，您可從<a href="/mobileweb/member/ListMyOrderMenu?module=list">會員中心</a> > 查詢折價券查詢詳細說明。</li>
          <li>折價券限會員本人使用，不得折抵現金，不得轉讓。若會員未再此截止日期前，使用折價券做購物折抵，則過期無效，不再補發。</li>
          <li>折價券不再另開立發票，開立發票金額，以該訂單「購買時實際支付的金額」來計算。 </li>
          <li>訂單取消時，退貨的金額，是以「購買時實際支付的金額」來計算，也就是扣除折價券後的金額。該次消費使用之折價券將無法退回。</li>
          <li>折價券不得兌換現金、找零或折換其他贈品。</li>
          <li>折價券限折抵指定商品類別之購物金額，恕無法抵扣物流費、安裝費等費用。</li>
          <li>折價券為贈品，係屬無償取得，不適用商品（服務）禮券記載之規範。</li>
          <li>本公司有權決定終止及變更折價券贈送辦法及折抵方式的權利，以站上公告為主。</li>
        </ul>
      </div>
      <h4 class="subHead">折扣碼</h4>
      <div class="subCont">
        <ul>
          <li>「折扣碼」是 friDay購物 不定期提供網路會員的一組英數字碼，適用範圍依照不同折扣碼活動而定。</li>
          <li>折扣碼限在 本網站購物時使用，結帳時請直接輸入「折扣碼」，系統將會自動為您計算本次消費實際支付金額。如訂單不符合該折扣碼活動，頁面將會提醒該組折扣碼無法使用。請注意，一次交易限輸入一組折扣碼 。</li>
          <li>如商品本身已為優惠商品則不配合折扣碼活動，結帳時無法使用折扣碼。</li>
          <li>「折扣碼」、「特殊點數折抵優惠」、「折價券」僅能擇一使用。</li>
          <li>每張折扣碼皆有最低消費金額、適用商品範圍、使用效期，實際依照發送折扣碼之活動公告為主。</li>
          <li>折扣碼逾期或使用後取消訂單、退貨，均不予補發。</li>
          <li>折扣碼不再另開立發票，開立發票金額，以該訂單「購買時實際支付的金額」來計算。</li>
          <li>取消訂單、退貨的金額，是以「購買時實際支付的金額」來計算，也就是使用折扣碼後的金額。該次消費使用之折扣碼折抵金額將無法退回。</li>
          <li>折扣碼不得兌換現金、找零或折換其他贈品。</li>
          <li>折扣碼限折抵指定商品類別之購物金額，恕無法抵扣物流費、安裝費等費用。</li>
          <li>折扣碼為贈品，係屬無償取得，不適用商品（服務）禮券記載之規範。</li>
          <li>本公司有權決定終止及變更折扣碼贈送辦法及折抵方式的權利，以站上公告為主。</li>
        </ul>
      </div>
    </div>
    <h3 class="qa__content-head" ref="intro9" name="intro9">個人資料保護說明：</h3>
    <div class="qa__content-info">
      特別提醒您，為防堵詐騙集團案件，如接獲不明電話或簡訊通知要求提供或核對帳戶資料，並告知您因設定錯誤需重新進行付款作業，請立即掛斷電話後，撥打遠傳friDay購物專線：02-77033955或警政署防詐騙專線：165求證，以確保您的權益。
    </div>
    <h3 class="qa__content-head" ref="intro10" name="intro10">遠傳幣使用說明：</h3>
    <div class="qa__content-info">
      <h4 class="subHead">遠傳幣使用規則</h4>
      <div class="subCont">
        <p>• 適用折抵friDay購物全站所有商品金額。</p>
        <p>• 遠傳幣可與折價券、折扣碼、HAPPYGO點數同時使用。</p>
        <p>• 1遠傳幣=1元新台幣，無折抵上限(部分活動限制折抵上限，依照該次活動詳細說明為主)。</p>
        <p>• 若訂購商品符合回饋資格，可於付款完成48小時後至【<a href="/mobileweb/member/ListMyOrderMenu?module=list">會員中心</a>】 → 【<a href="/mobileweb/member/fcoin/list">我的遠傳幣</a>】中點選（待處理明細）查詢，並於訂單出貨日15天後將遠傳幣匯入會員帳戶內。</p>
        <p>• 「金卡會員」每月消費回饋上限額度為1,000遠傳幣，計算區間以遠傳幣（帳戶明細）的日期為主。</p>
      </div>

      <h4 class="subHead">如何使用遠傳幣?</h4>
      <div class="subCont">
        <p>• 訂購商品時，系統會於付款頁面自動顯示您本次交易可用的遠傳幣餘額，您可自行輸入折抵金額。</p>
        <p>• 訂購完成頁會顯示您本次消費實際折抵點數以及實際支付金額。</p>
      </div>

      <h4 class="subHead">如何查詢我的遠傳幣?</h4>
      <div class="subCont">請至【<a href="/mobileweb/member/ListMyOrderMenu?module=list">會員中心</a>】登入後即可進入您的個人帳戶查詢網頁，於右下遠傳幣/點數/折價券查詢區，點選【<a href="/mobileweb/member/fcoin/list">我的遠傳幣</a>】即可查詢（待處理明細）與（帳戶明細）查看每筆使用及回饋紀錄。
        <p>• 待處理明細：為您購物回饋尚未生效之紀錄。</p>
        <p>• 帳戶明細：為您於friDay購物上使用遠傳幣紀錄。</p>
      </div>

      <h4 class="subHead">遠傳幣是否有使用效期限制?</h4>
      <div class="subCont">遠傳幣使用效期將依活動說明規則為準，您亦可至【<a href="/mobileweb/member/ListMyOrderMenu?module=list">會員中心</a>】點選【<a href="/mobileweb/member/fcoin/list">我的遠傳幣</a>】選項查詢每筆遠傳幣使用期限。</div>

      <h4 class="subHead">若訂購後取消訂單或辦理退貨，遠傳幣是否會退回?</h4>
      <div class="subCont">
        <p>• 若您交易失敗（訂單未成立）時，系統會於3小時內自動將您該筆已折抵的遠傳幣金額補回。</p>
        <p>• 符合回饋訂單辦理「取消訂單」時，系統會於48小時內自動將您該筆已折抵的遠傳幣金額補回，並取消該筆消費回饋之遠傳幣。</p>
        <p>• 符合回饋訂單辦理「退貨」時，系統會於退款完成後隔日自動將您該筆已折抵的遠傳幣補回，若您為金卡會員則會取消該筆消費回饋之遠傳幣。(部分退貨時，遠傳幣則依訂購當時所折抵的比例補回。)</p>
      </div>

      <h4 class="subHead">使用遠傳幣的注意事項?</h4>
      <div class="subCont">
        <p>• 會員應妥善保管您的帳號與密碼，任何經由輸入正確帳號與密碼使用遠傳幣消費，本公司皆認定為正常消費不會退還遠傳幣。</p>
        <p>• 非本公司造成之原因導致遠傳幣消失或出現異常，本公司不負賠償或補償之責。</p>
        <p>• 本公司保留隨時變更、修正、解釋或終止本活動及約定條款之權利，若有任何異動，修改後的活動內容及條款將公布於本網站，則不另行通知。</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "qa",
  methods: {
    scrollTo(ref) {
      let element = this.$refs[ref];
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/_color.scss";

a {
  text-decoration: none;
}

.qa {
  font-size: 1.4rem;

  &__idx {
    border: 1px solid $silver1;
    padding: 0.5% 1%;
    margin-bottom: 2%;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;

    a {
      width: 50%;
      font-weight: 800;
      line-height: 250%;
      border-bottom: 1px dotted $SilverChalice;
      white-space: nowrap;

      &:hover {
        background-color: $varden;
        color: $west-side;
      }

      &::before {
        margin-left: 10px;
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 4px 0 4px 4px;
        border-color: transparent transparent transparent $west-side;
        margin: 0 5px 3px 15px;
      }
    }
  }

  &__content {
    &-head {
      line-height: 140%;
      font-size: 125%;
      font-weight: 600;
      color: $scorpion;
      margin-bottom: 8px;

      &::before {
        content: '';
        display: inline-block;
        height: 17px;
        width: 17px;
        margin-right: 4px;
        background: url(../../images/icons/menu_tip2.gif) center center no-repeat;
        vertical-align: middle;
      }
    }

    &-info {
      margin: 0 0 30px 22px;
      line-height: 160%;

      .fasticon {
        width: 17px;
        height: 17px;
        vertical-align: sub;
        background: url(../../images/icons/fast.svg) no-repeat;
        display: inline-block;
      }

      ul {
        list-style-type: decimal;
        margin-left: 20px;

        li {
          margin-bottom: 10px;
        }
      }

      .qaTable {
        font-size: 1.2rem;
        border-spacing: 0;
        border-collapse: collapse;

        th {
          background-color: $gallery;
          border: 1px solid $gray;
          padding: 1% 2%;
          font-weight: normal;
          text-align: left;
        }

        td {
          border: 1px solid $gray;
          padding: 1% 2%;
        }
      }

      .subHead {
        color: $redapprox;
        margin-bottom: 6px;
        font-weight: 800;
        border: 1px dotted $torch-red;
        background-color: $bridesmaid;
        padding-left: 1%;
        line-height: 175%;
      }

      .subCont {
        margin: 0 0 20px 10px;
        word-break: normal;

        table {
          width: 988px;
          border-collapse: collapse;
          font-size: 1.2rem;

          th {
            background-color: $gallery;
            padding: 3px;
            text-align: center;
            font-weight: normal;
            border: 1px solid $gray;
          }

          td {
            padding: 3px;
            text-align: center;
            border: 1px solid $gray;
          }
        }
      }

      p {
        margin: 20px 0 4px;
        font-weight: 800;
      }
    }

    &-infoChart {
      width: 100%;
      z-index: -1;
      margin-bottom: 8px;

      span {
        width: 25%;
        font-size: 1.3rem;
        line-height: 30px;
        height: 30px;
        position: relative;
        display: inline-block;
        text-align: center;
        background-color: $boulder;
        color: $white;
        border-radius: 3px;

        &:nth-child(-n+3) {
          &:after {
            content: '';
            display: inline-block;
            position: absolute;
            right: 0;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 15px 0 15px 10px;
            border-color: $white $white $white $boulder;
          }
        }
      }
    }
  }
}
</style>
