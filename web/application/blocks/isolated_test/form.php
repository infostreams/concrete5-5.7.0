<?php
defined('C5_EXECUTE') or die(_("Access Denied."));

$al = \Loader::helper('concrete/asset_library');
print $al->image('image', 'imgID', t('Choose image'), \File::getByID($imgID?$imgID:0));
