<?php
/** 
 * Change the email address in the db.
 */
function webemailprotector_email_get($i) {
  $email=variable_get('wepdb_wep_email_' . $i);
  echo $email;
}