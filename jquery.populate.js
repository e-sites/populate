/**
 * Small plugin that populates a <select> element with option nodes
 * This can be either an object literal, a HTML fragment or a serialized string
 *
 * @author   Boye Oomens <boye@e-sites.nl>
 * @version  0.1.2
 * @param   {object|string} nodes actual options nodes that need to be injected
 * @param   {object} options custom config options
 * @return  {object} jQuery
 */

;(function ($) {

	'use strict';

	$.fn.extend({

		populate: function (nodes, options) {

			var defaults = {
					select: null,
					exclude: null,
					opPopulate: null
				},
				optionNode = '<option value="{key}">{value}</option>',
				htmlExpr = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
				opts = [],
				n;

			/**
			 * Small helper function to process <option> nodes
			 *
			 * @param  {object} node object that maps to
			 * @return {string} option node
			 * @private
			 */
			function template(node) {
				return optionNode.replace('{key}', node.key).replace('{value}', node.value);
			}

			// Handle both objects as well strings
			if ( nodes instanceof Object ) {
				for (n in nodes) {
					if ( nodes.hasOwnProperty(n) ) {
						opts.push(
							template({
								'key': n,
								'value': nodes[n]
							})
						);
					}
				}
			} else if ( nodes.constructor === String && nodes !== '' ) {
				// Are we dealing with a HTML fragment?
				if ( htmlExpr.test( nodes ) ) {
					opts = nodes;
				} else {
					// Presume it's a serialized string
					$.map( nodes.split('&'), function (val) {
						opts.push(
							template({
								'key': val.split('=')[0],
								'value': val.split('=')[1].replace('+', ' ')
							})
						);
					});
				}
			}

			return this.each(function () {
				var o = $.extend(defaults, options),
					self = this,
					$self = $(self);

				// <select> elements only
				if ( self.nodeName === 'SELECT' ) {

					// Inject nodes
					$self
						.find((o.exclude ? 'option:not(' + o.exclude + ')' : 'option'))
						.remove()
						.end()
						.append(opts)
						.removeAttr('disabled');
					
					// Apply filter
					if ( o.select !== null ) {
						$(self.options)
							.removeAttr('selected')
							.filter(o.select)
							.attr('selected', 'selected');
					}

					// Invoke callback
					if ( o.onPopulate && $.isFunction(o.onPopulate) ) {
						o.onPopulate.apply(self, [opts]);
					}
				}
			});
		}

	});

}(jQuery));