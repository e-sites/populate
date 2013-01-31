/**
 * All unit tests
 */

(function (window, document, $) {

	'use strict';

	var $select = $('<select><option value="">first</option></select>'),
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
		ok( $select.find('option:eq(2)')[0].selected, 'The second node is selected' );
		equal( $select[0].options.selectedIndex, 2, 'The selectedIndex matches the given index');
		ok( (!$select[0].disabled), 'The target element is enabled' );
		$select.empty().append('<option value=""></option>');
	});

	module('Excluded option nodes');

	test('Exclude option based on given selector', function () {
		$select.populate(subcats['a'], {
			exclude: ':first'
		});
		equal($select[0].options.length, 4, 'The total amount matches');
		equal($select[0].options.selectedIndex, 0, 'The first option is selected');
		equal($select[0].options[0].value, '', 'The value of the first option is empty');
		ok( (!$select[0].disabled), 'The target element is enabled' );
		$select.empty().append('<option value=""></option>');
	});

	module('Callbacks');

	test('Handle onPopulate callback', function () {
		$select.populate(subcats['a'], {
			onPopulate: function () {
				equal( this.nodeName, 'SELECT', 'The this context points to the select element');
				ok( this.constructor === HTMLSelectElement, 'The constructor matches the select element' );
				equal( $select.children().length, 3, 'The amount of option nodes matches the amount of inserted properties' );
				ok( (!$select[0].disabled), 'The target element is enabled' );
			}
		});
	});

	test('Handle empty result set', function () {
		$select.populate(subcats['d'], {
			onPopulate: function (results) {
				ok(results instanceof Array, 'The first argument of the callback is indeed an array');
				equal( $select.children().length, 0, 'The amount of option nodes matches the amount of inserted properties' );
				equal(results.length, 0, 'The `results` array is empty');
			}
		});
	});

}(window, window.document, jQuery));
