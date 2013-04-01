xtag.register('x-image', {
	lifecycle: {
	  created: function(){
	    var self = this;

	    // Need to create a wrapper for relativity
	    var wrapper = document.createElement('div');
	    wrapper.className = 'x-image-wrapper';
	    this.appendChild(wrapper);

	    // Create and show loader and spinner
	    var loader = document.createElement('div');
	    wrapper.appendChild(loader);
	    loader.className = 'x-image-loader';

	    var spinner = document.createElement('div');
	    spinner.className = 'x-image-spinner';
	    loader.appendChild(spinner);

	    this.showLoader();

	    // Create IMG element, send it off
	    var image = this.xtag.data.image = document.createElement('img');
	    image.addEventListener('load', hideLoader);
	    image.addEventListener('error', hideLoader);
	    xtag.toArray(this.attributes).forEach(function(item) {
	    	// Don't pass down IDs
	      if(item.name != 'id') image.setAttribute(item.name, item.value);
	    });
	    wrapper.appendChild(image);

	    function hideLoader() {
	      	self.hideLoader();
	    }
	  }
	},
	accessors: {
	  src: {
	    get: function() {
	      return this.getAttribute('src');
	    },
	    'set:attribute()': function(value) {
	      // Show the overlay
	      this.showLoader();
	      this.xtag.data.image.src = value;
	    }
	  },
	  width: {
	    get: function() {
	      return this.getAttribute('width');
	    },
	    'set:attribute()': function(value) {
	      this.xtag.data.image.setAttribute('width', value);
	    }
	  },
	  height: {
	    get: function() {
	      return this.getAttribute('height');
	    },
	    'set:attribute()': function(value) {
	      this.xtag.data.image.setAttribute('height', value);
	    }
	  },
	  alt: {
	    get: function() {
	      return this.getAttribute('alt');
	    },
	    'set:attribute()': function(value) {
	      this.xtag.data.image.setAttribute('alt', value);
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