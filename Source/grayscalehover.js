/*
---
name: Grayscale Image Hover
version: 1.1
description: Makes images gray, on hover they regain their color
authors: Rouven Weßling
requires: [Core/Element, Core/Fx.Tween, Core/Fx.Transitions, Core/Element.Styles, Core/Events, Core/Browser]
provides: GrayscaleImage
...
*/

Object.append(Browser.Features, {
	canvas: (function() {
		return !!document.createElement('canvas').getContext;
	})()
});

var GrayscaleImages =  new Class({
	Implements: Options,

	options: {
		duration: 1000,
		luminance: true
	},

	initialize: function(elems, options) {
		if (!Browser.Features.canvas) return;

		this.setOptions(options);
		this.elements = (document.id(elems) || $$(elems));

		this.elements.each(function(item) {
			if (item.complete) {
				this.attach(item);
			} else {
				item.addEvent('load', function() {
					this.attach(item);
				}.bind(this));
			}
		}, this);
	},

	attach: function(item) {
		var wrapper = new Element('div', {'class': 'img_wrapper', styles: {display: 'inline-block', "width": item.width, "height": item.height}}).wraps(item);
		var clone = item.clone().addClass('img_grayscale').setStyle('position', 'absolute').inject(item, 'after');

		clone.src = this.toGrayscale(clone.src);
		item.setStyles({position: 'absolute', 'z-index': '998', opacity: '0'});
		item.set('tween', {
			duration: this.options.duration,
			link: 'cancel'
		});
		clone.store('image', item);

		clone.addEvent('mouseenter', function(){
			this.retrieve('image').tween('opacity', '1');
		});

		item.addEvent('mouseleave', function(){
			this.tween('opacity', '0');
		});
	},

	toGrayscale: function(src) {
		var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var imgObj = new Image();
        imgObj.src = src;
        canvas.width = imgObj.width;
        canvas.height = imgObj.height; 
        ctx.drawImage(imgObj, 0, 0); 
        var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (var y = 0; y < imgPixels.height; y++)
        {
            for (var x = 0; x < imgPixels.width; x++)
            {
                var i = (y * 4) * imgPixels.width + x * 4;
                if (this.options.luminance) {
					// CIE luminance for the RGB
					// The human eye is bad at seeing red and blue, so we de-emphasize them.
					var avg = ((imgPixels.data[i] * .2126) + (imgPixels.data[i + 1] * .7152) + (imgPixels.data[i + 2] * .0722));
                } else {
					var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                }
                imgPixels.data[i] = avg; 
                imgPixels.data[i + 1] = avg; 
                imgPixels.data[i + 2] = avg;
            }
        }
        ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
        return canvas.toDataURL();
	}
});
