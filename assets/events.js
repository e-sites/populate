/**
 * All events needed for the demonstrations
 */

(function (window, document, $) {

	'use strict';

	// Our fake subcategories object literal
	var subcats = {
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

	$(document).ready(function () {
		
		// Most simple plugin call
		$('#categories').on('change', function () {
			if ( !subcats.hasOwnProperty(this.value) ) {
				return;
			}
			$('#subcategories').populate( subcats[this.value] );
		});

		// Most simple plugin call
		$('#categories2').on('change', function () {
			if ( !subcats.hasOwnProperty(this.value) ) {
				return;
			}
			$('#subcategories2').populate( $.param( subcats[this.value] ) );
		});

		// Use onPopulate to enable submit button
		$('#categories3').on('change', function () {
			var opts = '',
				k;

			if ( !subcats.hasOwnProperty(this.value) ) {
				return;
			}

			for (var k in subcats[this.value]) {
				opts += '<option value="' + k + '">' + subcats[this.value][k] + '</option>';
			}

			$('#subcategories3').populate( opts );
		});

		// Use onPopulate to enable submit button
		$('#categories4').on('change', function () {
			if ( !subcats.hasOwnProperty(this.value) ) {
				return;
			}
			$('#subcategories4').populate( subcats[this.value], {
				onPopulate: function () {
					// `this` is a reference to the target element
					$(this).next().removeAttr('disabled');
				}
			});
		});

		// Select a specific option node when populated
		$('#categories5').on('change', function () {
			if ( !subcats.hasOwnProperty(this.value) ) {
				return;
			}
			$('#subcategories5').populate( subcats[this.value], {
				select: ':eq(1)'
			});
		});

		// Exclude the first option node when populating
		$('#categories6').on('change', function () {
			if ( !subcats.hasOwnProperty(this.value) ) {
				return;
			}
			$('#subcategories6').populate( subcats[this.value], {
				exclude: ':first' // Accepts any jQuery-proof selector
			});
		});

		// Most simple plugin call
		$('#categories7').on('change', function () {
			if ( !subcats.hasOwnProperty(this.value) ) {
				return;
			}
			$('#subcategories7').populate( subcats[this.value], {
				onPopulate: function (opts) {
					// Handle empty results
					if ( !opts.length ) {
						$(this).attr('disabled', 'disabled').append('<option>no subcategories available</option>');
					}
				}
			} );
		});

	});

}(window, window.document, jQuery));