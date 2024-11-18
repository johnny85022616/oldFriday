(function(){
  alert(1234)
  console.log("$%# "+opener.document);
  var storeId = '844745'
  var storeName = '大溪門市'
  var storeAddress = '桃園市大溪區中央路152號'
  var storeType = '1'
  var device = 'mobileweb'
  var storeStatus = '1'
  var redirectUrl = "https://m.shopping.friday.tw/mobileweb/member/cvs/eMap/callback/json"; 
  if (device == 'app') {
  redirectUrl = redirectUrl + "?storeId=" + encodeURI(storeId) + "&storeName=" + encodeURI(storeName) + "&storeAddress=" + encodeURI(storeAddress) + "&storeType=" + encodeURI(storeType) + "&storeStatus=" + encodeURI(storeStatus)
  window.location.replace(redirectUrl);
} else {
  try{
    if (window.opener && !window.opener.closed) {
      window.opener.document.getElementById('storeId').value = storeId; // 超商代碼
      window.opener.document.getElementById('storeName').value = storeName; // 超商店名
      window.opener.document.getElementById('storeAddress').value = storeAddress; // 超商店址
      window.opener.document.getElementById('storeType').value = storeType; // 超商代碼
      window.opener.document.getElementById('storeStatus').value = storeStatus; // 超商啟用狀態
      // $('#selectStoreId', opener.document).val(storeId);
      // $('#selectStoreName', opener.document).val(storeName);
      // $('#selectStoreAddress', opener.document).val(storeAddress);
      // $('#selectStoreType', opener.document).val(storeType);
      // $('#storeStatus', opener.document).val(storeStatus);
      // var storeTypeName='';
      // if(storeType == 1){
      //         storeTypeName="7-11 ";
      //     }else if(storeType == 2){
      //         storeTypeName="全家 ";
      //     }else if(storeType == 9){
      //         storeTypeName="遠傳 ";
      //     }
      // console.log(storeTypeName);
      // var selectStoreHtml='<div class="mak_button">'
      //   +'<i class="supmkt_card_type_'+storeType+'"></i><font>'+storeTypeName+storeName+' </font><span><i class="icon-cross" onclick="clossSelect()"></i></span>'
      //   +'<div class="mak_font">'+storeAddress+'<br>'
      //   +'</div></div>';
      // $('#selectStoreArea', opener.document).append(selectStoreHtml);
      // $(".supcomm-form-input", opener.document).hide();
      // $("#selectStoreArea", opener.document).show();
      window.close();
    }else{
      alert("window.opener error");
      }
  }catch(e){
    alert(e)
  }
}
}())
