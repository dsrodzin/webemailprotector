<?php
//validate emo to db

function webemailprotector_emo_validate($wep_code_1,$wep_code_2,$wep_code_3,$wep_code_4,$wep_code_5,$i,$wep_email){
  $wep_code=$wep_code_1.'-'.$wep_code_2.'-'.$wep_code_3.'-'.$wep_code_4.'-'.$wep_code_5;
  variable_set('wepdb_wep_validated_'.$i,'true');
  variable_set('wepdb_wep_emo_'.$i,$wep_code);
  $arr = array(
    'code'=>$wep_code,
    'emo_nu'=>$i,
	'email'=>$wep_email
  );
  echo json_encode($arr);
}

?>