/**
 * All unit tests
 */

(function (window, document, $) {

	'use strict';

	var $select = $('<select>'),
		subcats = {
			'a': {
				'aa': 'Subcategory AA',
				'bb': 'Subcategory BB',
				'cc': 'Subcategory CC'
			},
			'b': {
				'dd': 'Subcategory DD',
				'ee': 'Subcategory EE',
				'ff': 'Subcategory FF'
			},
			'c': {
				'': 'no results'
			},
			'd': {}
		};

	window.log = function () {
		if ( typeof window.console === 'object' ) {
			console.log((arguments.length === 1 ? arguments[0] : Array.prototype.slice.call(arguments)));
		}
	};

	$select.appendTo('body');

	module('Input support');

	test('Pass object literal', function () {
		$select.populate( subcats['a'] );
		equal( $select.children().length, 3, 'The amount of option nodes matches the amount of inserted properties' );
		ok((!$select[0].disabled), 'The target element is enabled')
	});

	test('Pass serialized string', function () {
		$select.populate( $.param(subcats['a']) );
		equal( $select.children().length, 3, 'The amount of option nodes matches the amount of inserted properties' );
		ok((!$select[0].disabled), 'The target element is enabled')
	});

	test('Pass empty object literal', function () {
		$select.populate({});
		equal( $select.children().length, 0, 'The amount of option nodes matches the amount of inserted properties' );
		ok((!$select[0].disabled), 'The target element is enabled')
	});

	test('Pass empty string', function () {
		$select.populate('');
		equal( $select.children().length, 0, 'The amount of option nodes matches the amount of inserted properties' );
		ok((!$select[0].disabled), 'The target element is enabled')
	});

	module('Selected option nodes');

	test('Select last option with :last selector', function () {
		$select.populate(subcats['b'], {
			select: ':last',
			onPopulate: function () {
				equal( $select.children().length, 3, 'The amount of option nodes matches the amount of inserted properties' );
				ok( $select.find('option:last')[0].selected, 'The last node is selected' );
				ok( !$select[0].disabled, 'The target element is enabled' );
			}
		});
	});

	test('Select second option with :eq(2) selector', function () {
		$select.populate(subcats['a'], {
			select: ':eq(2)'
		});
		equal( $select.children().length, 3, 'The amount of option nodes matches the amount of inserted properties' );
		ok((!$select[0].disabled), 'The target element is enabled')
	});

}(window, window.document, jQuery));
