!function(global, $, _) {
	'use strict';

	function ConcretePageMenu($element, options) {
		var my = this, 
			options = options || {};

		options = $.extend({
			'sitemap': false,
			'data': {},
			'menuOptions': {}
		}, options);

		ConcreteMenu.call(my, $element, options);
		if (options.sitemap != false) {
			my.$menu = $(_.template(ConcretePageAjaxSearchMenu.get(), {item: options.data}));
		}
	}

	ConcretePageMenu.prototype = Object.create(ConcreteMenu.prototype);

	ConcretePageMenu.prototype.setupMenuOptions = function($menu) {
		var my = this, 
			parent = ConcreteMenu.prototype,
			cID = $menu.attr('data-search-page-menu'),
			container = my.options.container;

		parent.setupMenuOptions($menu);
		$menu.find('a[data-action=visit]').on('click', function() {
			window.location.href = CCM_DISPATCHER_FILENAME + '?cID=' + cID;
		});
		if (!my.options.sitemap || my.options.sitemap.options.displaySingleLevel == false) {
			$menu.find('[data-sitemap-mode=explore]').remove();
		}
		$menu.find('a[data-action=delete-forever]').on('click', function() {
			ccm_triggerProgressiveOperation(
				CCM_TOOLS_PATH + '/dashboard/sitemap_delete_forever', 
				[{'name': 'cID', 'value': cID}],
				ccmi18n_sitemap.deletePages,
				function() {
					if (my.options.sitemap) {
						var tree = my.options.sitemap.getTree(),
							node = tree.getNodeByKey(cID);

						node.remove();
					}
					ConcreteAlert.hud(ccmi18n_sitemap.deletePageSuccessMsg, 2000);
				}
			);
			return false;
		});
		$menu.find('a[data-action=empty-trash]').on('click', function() {
			ccm_triggerProgressiveOperation(
				CCM_TOOLS_PATH + '/dashboard/sitemap_delete_forever', 
				[{'name': 'cID', 'value': cID}],
				ccmi18n_sitemap.deletePages,
				function() {
					if (my.options.sitemap) {
						var tree = my.options.sitemap.getTree(),
							node = tree.getNodeByKey(cID);

						node.removeChildren();
					}
				}
			);
			return false;
		});
	}

	// jQuery Plugin
	$.fn.concretePageMenu = function(options) {
		return $.each($(this), function(i, obj) {
			new ConcretePageMenu($(this), options);
		});
	}

	global.ConcretePageMenu = ConcretePageMenu;

}(this, $, _);