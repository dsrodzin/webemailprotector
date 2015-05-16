<?php
//delete selected emo from db

function webemailprotector_emo_delete($i){
    $wep_nuemails = variable_get('wepdb_nuemails');
    variable_del('wepdb_wep_entry_'.$i);
    variable_del('wepdb_wep_email_'.$i);
    variable_del('wepdb_wep_emo_'.$i);
    variable_del('wepdb_wep_display_name_'.$i);
    variable_del('wepdb_wep_validated_'.$i);
    //decrement the $wep_nuemails options in db
    $wep_nuemails = intval($wep_nuemails)-1;
    variable_set('wepdb_nuemails',$wep_nuemails);
    $arr = array(
     'emo_nu'=>$i,
     'nuemails'=>$wep_nuemails
    );
    echo json_encode($arr);
   }
?>