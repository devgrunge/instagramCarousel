<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 */


if (!defined('_PS_VERSION_'))
  exit;
 
class Instagramfeed extends Module
{
	public function __construct()
	{
		$this->name = 'instagramfeed';
        $this->tab = 'administration';
        $this->version = '1.0.0';
        $this->author = 'HES Inovacao';
        $this->need_instance = 0;
        $this->bootstrap = false;
	 
		parent::__construct();
	 
		$this->displayName = $this->l('Instagram posts carousel');
		$this->description = $this->l('Instagram posts carousel');
	 
		$this->confirmUninstall = $this->l('Are you sure you want to uninstall?');
		
		$this->ps_versions_compliancy = [
            'min' => '1.7.5',
            'max' => _PS_VERSION_,
        ];
		
		if (!Configuration::get('INSTAGRAMFEED'))      
		  $this->warning = $this->l('No name provided');
	}

public function hookActionFrontControllerSetMedia()
    {
        $this->context->controller->registerStylesheet(
            'instagramfeed',
            $this->_path.'views/css/instagramfeed.css',
            [
                'media' => 'all',
                'priority' => 1000,
            ]
        );

		$this->context->controller->registerJavascript(
            'instagramfeed-javascript',
            $this->_path.'views/js/default.js',
            [
                'position' => 'bottom',
                'priority' => 1000,
            ]
        );
    }
public function hookHeader ($params)
{
     $this->context->controller->addJS($this->_path.'views/js/default.js');
     $this->context->controller->addCSS($this->_path.'views/css/instagramfeed.css');
}


public function renderWidget($hookName, array $configuration) 
    {
        $this->smarty->assign($this->getWidgetVariables($hookName, $configuration));

        return $this->fetch('module:'.$this->name.'/views/templates/widget/carousel.tpl');
    }

    public function getWidgetVariables($hookName, array $configuration)
    {
        return;
    }
}
