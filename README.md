Grayscale Image Hover
=====================

A simple but eye catching effect to enhance your websites pictues.

Inspired by and based on a [great tutorial](http://webdesignerwall.com/tutorials/html5-grayscale-image-hover) from webdesignerwall.com.

How to use
----------

Basic example:

	window.addEvent('domready', function() {
		new GrayscaleImages('img');
	});

The argument can be any css selector or reference to an HtmlImageElement. You should take care that the selector only matches img elements, behavior in other cases is untested.


Class: GrayscaleImages
----------------------

### Syntax

	new GrayscaleImages([element, options]);

### Arguments

1. element: (*element*, *string*, *array*) The element(s) to attach the datepicker to
2. options: (*object*, optional) The options object

### Options:

	- duration: (*int*) Duration of the transition from grayscal to color.
