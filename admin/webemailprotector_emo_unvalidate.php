<?php
//remove emo from db

function webemailprotector_emo_unvalidate($i){
   variable_set('wepdb_wep_validated_'.$i,'false');
   variable_set('wepdb_wep_emo_'.$i,'xxxx-xxxx-xxxx-xxxx-xxxx');
   $arr = array(
    'emo_nu'=>$i,
	'email'=>$wep_email
   );
   echo json_encode($arr);
}

?>