import Event from "respondent-emitter";

function OriginHistory() {}
OriginHistory.prototype = window.history;

export default class History extends OriginHistory {

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