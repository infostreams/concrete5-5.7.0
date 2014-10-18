<?php

$imgHelper = \Loader::helper('image');

if ($imgID) {
	$img = File::getByID($imgID);

	$img_src = $imgHelper->getThumbnail($img, 400, 400)->src;
	echo "<img src='$img_src'>";
}
