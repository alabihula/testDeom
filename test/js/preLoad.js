! function() {
	var t = function(t) {
		if("function" != typeof t) throw new Error("Invalid callback");
		this.cb = t, this.images = [], this.sounds = [], this.__cachedSnds = {}
	};
	t.prototype.addImage = function(t) {
		this.images.push(t)
	}, t.prototype.addSound = function(t) {
		this.sounds.push(t)
	}, t.prototype.addImages = function(t) {
		"object" == typeof t && t.length && (this.images = this.images.concat(t))
	}, t.prototype.addSounds = function(t) {
		"object" == typeof t && t.length && (this.sounds = this.sounds.concat(t))
	}, t.prototype.load = function() {
		for(var t = this.images.length, o = 0, n = this.sounds.length, i = this.cb, s = t + n, e = function() {
				o++, i("progress", o / s), o == s && i("complete")
			}, r = 0; r < this.images.length; r++) {
			var h = new Image;
			h.onload = function() {
				this.onload = null, e()
			}, h.onerror = function() {
				this.onerror = null, i("error", this.src), e()
			}, h.src = this.images[r]
		}
		var u = this;
		for(r = 0; r < this.sounds.length; r++) {
			var a = this.sounds[r],
				c = new Audio(a);
			c.__dturl = a, c.oncanplaythrough = function() {
				clearTimeout(this.__timeoutId), this.oncanplaythrough = null, this.onerror = null, u.__cachedSnds[this.__dturl] = this, e()
			}, c.onerror = function() {
				clearTimeout(this.__timeoutId), this.oncanplaythrough = null, this.onerror = null, i("error", this.__dturl), e()
			}, c.__timeoutId = setTimeout(function(t) {
				t.oncanplaythrough()
			}, 100, c), c.load()
		}
	}, t.prototype.getSound = function(t) {
		return this.__cachedSnds[t] || null
	}, window.Preloader = {
		create: function(o) {
			return new t(o)
		}
	}
}();