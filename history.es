class History extends window.history.constructor {

    constructor() {
    	super();

    	debugger;
	    this.store = [];
	    this.current = 0;
	    this.event = new Event();
	    this.back = function() {

	    }
    }
}