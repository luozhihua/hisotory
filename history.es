
class History extends window.history {

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