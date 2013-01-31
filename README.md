Populate
=====

We have all used them, `<select>` elements that are populated by selecting the value of another `<select>`.
I found myself writing this logic over and over again, so I decided to put together this small jQuery plugin as abstraction.

## Options
Populate accepts two arguments. The actual data that needs to be injected into the DOM and optionally an object with options.</p>
<table class="table">
	<thead>
		<tr>
			<th>Property</th>
			<th>Type</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>exclude</td>
			<td><code>{string}</code></td>
			<td>Exclude <code>&lt;option&gt;</code> nodes from being removed, e.g. the first node which could act as placeholder.</td>
		</tr>
		<tr>
			<td>select</td>
			<td><code>{string}</code></td>
			<td>Select an <code>&lt;option&gt;</code> node after populating the <code>&lt;select&gt;</code> element. This property will also accept a valid jQuery selector like <code>:first:</code> or <code>:eq(1)</code>.</td>
		</tr>
		<tr>
			<td>onPopulate</td>
			<td><code>{object}</code></td>
			<td>Callback that will be dispatched after populating the <code>&lt;select&gt;</code> element. The first argument will be an array with the actual option nodes, this means that you could easily write some logic to handle an empty result set. Also, the <code>this</code> context refers to the actual <code>&lt;select&gt;</code> element that is being populated.</td>
		</tr>
	</tbody>
</table>

```js
$('#selector').populate({key:value} , {
    exclude: ':first',
    select: ':eq(2)',
    onPopulate: function (nodes) {}
});
```

## Implementation
First and foremost, include the plugin as such:

```html
<script src="jquery-1.9.0.min.js"></script>
<script src="jquery.populate.min.js"></script>
```

Prep your HTML markup:

```html
<select name="categories" id="categories">
	<option value="">Main categories</option>
	<option value="a">Category A</option>
	<option value="b">Category B</option>
	<option value="c">Category C</option>
	<option value="d">Category D</option>
	<option value="e">Category E</option>
</select>
<select disabled="disabled" name="subcategories" id="subcategories">
	<option value="">Select a main category first</option>
</select>
```

Initiate the plugin like this:
```js
// You most likely want to encapsulate the logic within an event handler
// or in a callback after fetching data from the server
$('#categories').on('change', function () {
    $('#subcategories').populate({key: value});
});
```

More info, demos, documentation and unit tests at: http://github.e-sites.nl/populate/
