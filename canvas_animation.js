function DrawCanvas(){
	this.delay_scale = 36;
	this.timer = null;
	this.img;
	this.timeline;
	this.element;
	this.element_fallback;
}

DrawCanvas.prototype.animate = function(img, timeline, element)
{
	var self = this;

	timeline = self.timeline;
	var i = 0;
	var run_time = 0;
	for (var j = 0; j < timeline.length - 1; ++j)
		run_time += timeline[j].delay;

	function f()
	{
		var frame = i++ % timeline.length
		var delay = timeline[frame].delay * self.delay_scale
		var blits = timeline[frame].blit

		var ctx = element.getContext('2d')
		for (j = 0; j < blits.length; ++j)
		{
			var blit = blits[j]
			var sx = blit[0]
			var sy = blit[1]
			var w = blit[2]
			var h = blit[3]
			var dx = blit[4]
			var dy = blit[5]
			ctx.drawImage(img, sx, sy, w, h, dx, dy, w, h);
		}
		self.timer = window.setTimeout(f, delay)

		if(timeline[frame].next){
			self.set_animation(timeline[frame].next_img,timeline[frame].next,timeline[frame].next_target_canvas,timeline[frame].next_target_fallback);
		}
	}

	if (self.timer) window.clearTimeout(self.timer)
	f()
}

DrawCanvas.prototype.animate_fallback = function(img, timeline, element)
{
	var self = this;

	var i = 0
	var run_time = 0
	for (var j = 0; j < timeline.length - 1; ++j)
		run_time += timeline[j].delay

	function f()
	{
		if (i % timeline.length == 0)
		{
			while (element.hasChildNodes())
				element.removeChild(element.lastChild)
		}

		var frame = i++ % timeline.length
		var delay = timeline[frame].delay * self.delay_scale
		var blits = timeline[frame].blit

		for (j = 0; j < blits.length; ++j)
		{
			var blit = blits[j]
			var sx = blit[0]
			var sy = blit[1]
			var w = blit[2]
			var h = blit[3]
			var dx = blit[4]
			var dy = blit[5]

			var d = document.createElement('div')
			d.style.position = 'absolute'
			d.style.left = dx + "px"
			d.style.top = dy + "px"
			d.style.width = w + "px"
			d.style.height = h + "px"
			d.style.backgroundImage = "url('" + img.src + "')"
			d.style.backgroundPosition = "-" + sx + "px -" + sy + "px"

			element.appendChild(d)
		}

		self.timer = window.setTimeout(f, delay)

		if(timeline[frame].next){
			self.set_animation(timeline[frame].next_img,timeline[frame].next,timeline[frame].next_target_canvas,timeline[frame].next_target_fallback);
		}
	}

	if (self.timer) window.clearTimeout(self.timer)
	f()
}

DrawCanvas.prototype.set_animation = function(img_url, timeline, canvas_id, fallback_id)
{
	var self = this;
	self.timeline = timeline;
	var img = new Image()
	img.onload = function()
	{
		var canvas = document.getElementById(canvas_id)
		if (canvas && canvas.getContext)
			self.animate(img, self.timeline, canvas)
		else
			self.animate_fallback(img, self.timeline, document.getElementById(fallback_id))

		var preload_image = new Image()
		preload_image.src = img_url
	}
	img.src = img_url
}

DrawCanvas.prototype.start = function(){
	var self = this
}