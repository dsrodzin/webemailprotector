<?php

class webemailprotector_admin {
  protected $configuration_page = 'admin/settings/webemailprotector';
  protected $defaults;
  protected $display_name = 'WebEmailProtector';
  protected $filter;
  protected $help = '<p>The WebEmailProtector module obfuscates email addresses to help prevent spambots from collecting them. Read the <a href="@url">Spamspan configuration page</a>.</p>';
  protected $page;

  function __construct() {
    $info = webemailprotector_filter_info();
    $this->defaults = $info['webemailprotector']['default settings'];
  }
  function defaults() {
    return $this->defaults;
  }
  function display_name() {
    return $this->display_name;
  }
  function filter_is() {
    return isset($this->filter);
  }
  function filter_set($filter) {
    $this->filter = $filter;
  }

  /**
   * Responds to hook_help().
   */
  function help($path, $arg) {
    switch ($path) {
      case 'admin/help#webemailprotector':
        return t($this->help, array('@url' => $this->configuration_page));
    }
  }

  function menu() {
    $items[$this->configuration_page] = array(
      'title' => 'WebEmailProtector',
      'description' => 'WebEmailProtector email spam protection.',
      'type' => MENU_LOCAL_TASK,
      'page callback' => 'drupal_get_form',
      'page arguments' => array('webemailprotector_admin_page'),
      'access arguments' => array('administer filters'),
    );
    return $items;
  }

  function page_object() {
    if (!isset($this->page)) {
      $this->page = new webemailprotector_admin_page($this);
    }
    return $this->page;
  }
  function page($form, &$form_state) {
    return $this->page_object()->form($form, $form_state);
  }
  function page_submit($form, &$form_state) {
    $this->page_object()->submit($form, $form_state);
  }
}