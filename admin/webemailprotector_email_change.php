<?php
/**
 * Change the email address in the db.
 */
function webemailprotector_email_change($i, $email) {
  variable_set('wepdb_wep_email_' . $i, $email);
  variable_set('wepdb_wep_validated_' . $i, 'false');
  echo $email;
}