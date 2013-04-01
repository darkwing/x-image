xtag.register('x-image', {
	lifecycle: {
	  created: function(){
	    var self = this;

	    // Need to create a wrapper for relativity
	    var wrapper = document.createElement('div');
	    wrapper.className = 'x-image-wrapper';
	    this.appendChild(wrapper);

	    // Create and show loader
	    var loader = this.loader = document.createElement('div');
	    wrapper.appendChild(loader);
	    loader.className = 'x-image-loader';
	    this.showLoader();

	    // Create IMG element, send it off
	    var image = this.image = document.createElement('img');
	    image.addEventListener('load', hideLoader);
	    image.addEventListener('error', hideLoader);
	    xtag.toArray(this.attributes).forEach(function(item) {
	      if(item.name != 'id') image.setAttribute(item.name, item.value);
	    });
	    wrapper.appendChild(image);

	    function hideLoader() {
	      	self.hideLoader();
	    }
	  },
	  attributeChanged: function(name, value) {
	  	// If the SRC changes, we need to show the loader right away
	    if(name == 'src') this.showLoader();
	    // Mirror changes to the x-image to the img
	    if(name != 'id') this.image.setAttribute(name, value);
	  }
	},
	accessors: {
	  src: {
	    get: function() {
	      return this.getAttribute('src');
	    },
	    set: function(value) {
	      // Show the overlay
	      this.showLoader();
	      return value ? this.setAttribute('src', value) : this.removeAttribute('src');
	    }
	  },
	  width: {
	    get: function() {
	      return this.getAttribute('width');
	    },
	    set: function(value) {
	      return value ? this.setAttribute('width', value) : this.removeAttribute('width');
	    }
	  },
	  height: {
	    get: function() {
	      return this.getAttribute('height');
	    },
	    set: function(value) {
	      return value ? this.setAttribute('height', value) : this.removeAttribute('height');
	    }
	  }
	},
	methods: {
	  showLoader: function() {
	  	xtag.removeClass(this, 'x-image-inactive');
	    xtag.addClass(this, 'x-image-display');
	  },
	  hideLoader: function() {
	    xtag.removeClass(this, 'x-image-display');
	  }
	},
	events: {
	  // Image "load" and "error" events don't bubble, so cannot
	  // use them here
	  transitionend: function(e) {
	  	xtag.addClass(this, 'x-image-inactive');
	  }
	}
});