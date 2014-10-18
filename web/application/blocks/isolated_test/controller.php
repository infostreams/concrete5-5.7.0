<?php
namespace Application\Block\IsolatedTest;

defined('C5_EXECUTE') or die(_("Access Denied."));

class Controller extends \Concrete\Core\Block\BlockController {
	protected $btDescription = "Isolated test case";
	protected $btName = "isolated_test";
	protected $btTable = 'btIsolatedTest';
	protected $btInterfaceWidth = "550";
	protected $btInterfaceHeight = "400";
}