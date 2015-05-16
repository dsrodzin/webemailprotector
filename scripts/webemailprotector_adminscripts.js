
//if (Drupal.settings.webemailprotector.testvar) {alert(Drupal.settings.webemailprotector.testvar);}
//$token = Drupal.settings.security.token;
//$token = 'whatever';
//can't get any of these PHP -> JS params to pass
// reason - have to wait to propogate!

function webemailprotector_emo_init($current_user_email,$wep_ver,$wep_reason) {
  jQuery.ajax({
    url: 'http://www.webemailprotector.com/cgi-bin/cms/emo_init.py',
    type: "GET",
    crossDomain: true,
    data: {'adminemail':$current_user_email,'wep_ver':$wep_ver,'wep_reason':$wep_reason, 'cms':'dr'},
    dataType: "jsonp", 
    cache: false 	});
} 
//the callback for the emo_init function
function webemailprotector_emo_init_cb(response) {
  //alert('callback');
  document.getElementById('wep_spinner').style.display='none';
  if (response.success == "true") {
   alert (response.message);
   }
  if (response.success == "false") {
   alert (response.message);
   }
  document.getElementById('wep_dullout').style.display='none';
  //alert(Drupal.settings.webemailprotector.testvar);
} 

function webemailprotector_emo_delete($emo_nu) {
 jQuery.ajax({
     type: "POST",
	 dataType: 'json',
	 url: "webemailprotector_emo_delete_callback/"+ $emo_nu,
     success: function (response) {
	     alert ("email no."+response.emo_nu+" deleted, "+response.nuemails+" remaining");
		 // delete the old row from the display
		 rowID='wep_tablerow_'+response.emo_nu;
         //document.getElementById(rowID).remove();//remove as not supported by ie
		 document.getElementById(rowID).parentNode.removeChild(document.getElementById(rowID));
		 }    
 });
}

function webemailprotector_emo_new() {
 //alert('hit');
 jQuery.ajax({
     type: "POST",
	 dataType: 'json',
	 url: "webemailprotector_emo_new_callback",
     success: function (response) {
         //alert ("New email no."+response+" added");
		 tableID='wep_table';
         var row = document.getElementById(tableID).insertRow(response.row);
		 row.id='wep_tablerow_'+response.id;
		 var openbrackettxt = row.insertCell(0);
		 openbrackettxt.outerHTML = "<td style=\"font-size:30px;padding-bottom:10px;\">[</td>";
		 var emailtxt = row.insertCell(1);
		 emailtxt.innerHTML = "<input type=\"text\" id=\"wep_emailtxt_"+response.id+"\" value=\"your email address "+response.id+"\" style=\"color:red;\" onkeyup=\"webemailprotector_email_change('"+response.id+"',this.value)\">";
		 var closebrackettxt = row.insertCell(2);
		 closebrackettxt.outerHTML = "<td style=\"font-size:30px;padding-bottom:10px;\">]</td>";
		 var displaytxt = row.insertCell(3);
		 displaytxt.innerHTML = "<input type=\"text\" id=\"wep_displaytxt_"+response.id+"\" value=\"your web text "+response.id+"\" onkeyup=\"webemailprotector_displayname_change('"+response.id+"',this.value)\">";
		 var registerkey = row.insertCell(4);
		 registerkey.innerHTML = "<a id=\"wep_register_"+response.id+"\" class=\"button add another\" onclick=\"webemailprotector_register('"+response.id+"')\" >REGISTER</a>";
		 //registerkey.innerHTML = "<input id=\"wep_regiser_"+response.id+"\" type=\"button\" class=\"button add another\" value=\"register\" onclick=\"webemailprotector_register('"+response.id+"')\" >";
		 var validatekey = row.insertCell(5);
		 validatekey.innerHTML = "<input id=\"wep_validate_"+response.id+"\" type=\"button\" class=\"button add another\" value=\"VALIDATE\" onclick=\"webemailprotector_validate('"+response.id+"','"+response.current_user_email+"')\">";
		 var deletekey = row.insertCell(6);
		 deletekey.innerHTML="<input id=\"wep_delete_"+response.id+"\" type=\"button\" class=\"button add another\" value=\"DELETE\" onclick=\"webemailprotector_emo_delete('"+response.id+"')\">";
		 textfieldID='wep_emailtxt_'+response.id;
         document.getElementById(textfieldID).style.color="red";		 
     }    
 });
}



function webemailprotector_email_change($emo_nu,$email) {
 //alert('emo_nu:'+$emo_nu+' email:'+$email);
 jQuery.ajax({
     type: "POST",
	 url: "webemailprotector_email_change_callback/"+$emo_nu+"/"+$email,
     success: function (response) {
	 //alert('hit email : '+response);
     }
 });
textfieldID='wep_emailtxt_'+$emo_nu;
document.getElementById(textfieldID).style.color="red";
}

function webemailprotector_displayname_change($emo_nu,$displayname) {
 $displayname=$displayname.replace("'", "");
 $displayname=$displayname.replace('"', '');
 textfieldID='wep_displaytxt_'+$emo_nu;
 document.getElementById(textfieldID).value=$displayname;
 jQuery.ajax({
     type: "POST",
	 url: "webemailprotector_displayname_change_callback/"+$emo_nu+"/"+$displayname,
     success: function (response) {
	 //alert('hit display : '+response);
     }    
 });
}

function webemailprotector_donothing(){
}

function webemailprotector_register($emo_nu) {
 jQuery.ajax({
     type: "POST",
	 url: "webemailprotector_register_callback/"+$emo_nu,
     success: function (response) {
	 //alert('hit email : '+response);
	 window.open('http://www.webemailprotector.com/cgi-bin/reg.py?cms=dr&email='+response);
     }
 });
}

function webemailprotector_validate($emo_nu,$current_user_email) {
 //start spinner
 document.getElementById('wep_spinner').style.display='block';
 document.getElementById('wep_dullout').style.display='block';
 setTimeout('webemailprotector_donothing()',1000); // to make sure any update to the email address has reached the db
 email='undefined';
 //first get the email address from db associated with emo_nu as may have been updated since last php load
 jQuery.ajax({
     type:"GET",
	 url: "webemailprotector_email_get_callback/"+$emo_nu,
	 //then if successful interrogate the server
     success: function (response) {
         email=response;
		 //alert(email);
         //jsonp as cross domain
         jQuery.ajax({
           url: 'http://www.webemailprotector.com/cgi-bin/cms/emo_validate.py',
           type: "GET",
           crossDomain: true,
           data: {'email':email,'emo_nu':$emo_nu,'current_user_email':$current_user_email,'cms':'dr'},
           dataType: "jsonp", 
           cache: false   });
     }    
     });	 
}

function webemailprotector_emocb(response) {
  //alert('callback');
  document.getElementById('wep_spinner').style.display='none';
  if (response.success == "true") {
   alert (response.message);
   $code1=response.code_1;
   $code2=response.code_2;
   $code3=response.code_3;
   $code4=response.code_4;
   $code5=response.code_5;
   $emo_nu=response.emo_nu;
   $email=response.email;
   // update the valid status for that element in db with another ajax call
   jQuery.ajax({
     type: "GET",
	 dataType: 'json',
	 url: "webemailprotector_emo_validate_callback/"+$code1+"/"+$code2+"/"+$code3+"/"+$code4+"/"+$code5+"/"+$emo_nu+"/"+$email,
     success: function (next_response) {
		 //alert (next_response.emo_nu);
		 textfieldID='wep_emailtxt_'+next_response.emo_nu;
         document.getElementById(textfieldID).style.color="green";
     }    
    });
  }
  if (response.success == "false") {
   //alert ("hi");
   alert (response.message);
   // update the unvalid status in the db with another ajax
   jQuery.ajax({
     type: "GET",
	 dataType: 'json',
	 url: "webemailprotector_emo_unvalidate_callback/"+response.emo_nu,
     success: function (next_response) {  
        textfieldID='wep_emailtxt_'+response.emo_nu;
        document.getElementById(textfieldID).style.color="red";
	 }
	});
  }
document.getElementById('wep_dullout').style.display='none';
}   

function webemailprotector_emo_act($current_user_email) {
  jQuery.ajax({
    url: 'http://www.webemailprotector.com/cgi-bin/cs/emo_act.py', ////!!!!!
    type: "POST",
    crossDomain: true,
    data: {'current_user_email':$current_user_email,'cms':'dr'},
    dataType: "jsonp", 
    cache: false });
}
