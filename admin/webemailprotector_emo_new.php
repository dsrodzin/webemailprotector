<?php
//add additional emo to db

function webemailprotector_emo_new(){
 $wep_nextemail = variable_get('wepdb_nextemail');
 variable_set('wepdb_nextemail',intval($wep_nextemail)+1);
 $i = $wep_nextemail ;
 variable_set('wepdb_wep_entry_'.$i,'emo_'.$i);
 variable_set('wepdb_wep_email_'.$i,'your email address '.$i);
 variable_set('wepdb_wep_emo_'.$i,'xxxx-xxxx-xxxx-xxxx-xxxx');
 variable_set('wepdb_wep_display_name_'.$i,'your display text '.$i);
 variable_set('wepdb_wep_validated_'.$i,'false');
 $wep_nuemails = variable_get('wepdb_nuemails');
 $wep_nuemails = intval($wep_nuemails)+1;
 variable_set('wepdb_nuemails',$wep_nuemails);
 global $user;
 $wep_current_user_email = $user->mail;
 $wep_email = 'your email address '.$i;
 $arr = array(
  'row'=>$wep_nuemails,
  'id'=>$i,
  'current_user_email'=>$wep_current_user_email,
  'email'=>$wep_email
 );
 echo json_encode($arr);
}
?>