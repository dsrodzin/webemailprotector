<?php
/**
 * Change display name in the db.
 */
function webemailprotector_displayname_change($i, $displayname) {
  variable_set('wepdb_wep_display_name_' . $i, $displayname);
  echo $displayname;
}