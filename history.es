import Event from "respondent-emitter";

class OriginHistory extends Event {
	custructor() {
		let history = window.history

		Object.keys(history.__proto__).forEach((methods) => {
			if (typeof history[methods] === 'function') {
				this[methods] = history[methods].bind(history)
			}
		});
	}
}

let store = [];
let current = 0;
export default class History extends OriginHistory {

    constructor(options) {
    	super()

    	this.options = {
    		base: '/',
    		hashbang: false,
    		...options
    	}
    }

    back() {
    	let from = store[current];
    	let to = store[current-1] || null;

    	if (this.emit('beforeNavigate', from, to) !== false) {
    		super.back()
    		current -= 1
    	}
    	this.emit('afterNavigate')
    }

    forward() {
    	let from = store[current];
    	let to = store[current+1] || null;

    	if (this.emit('beforeNavigate', from, to) !== false) {
    		super.forward()
    		current += 1
    	}
    	this.emit('afterNavigate')
    }

    go(number=0) {
    	number = parseInt(number)

    	if (number === 0) {
    		return;
    	} else {
	    	let toIndex = current + number
	    	let from = store[current]
	    	let to = store[toIndex]

	    	if (this.emit('beforeNavigate', from, to) !== false) {
	    		super.go(number)
	    		current = toIndex
	    		this.emit('afterNavigate')
	    	}
	    }
    }

    pushState(state, title, url) {
	    url = this.formatPath(url)

    	if (this.emit('beforeNavigate') !== false) {
	    	store.length = current;

	    	store.push({
	    		state: state,
	    		title: title,
	    		url: url
	    	})
	    	super.pushState(state, title, url)
	    	current = store.length
	    	this.emit('afterNavigate')
	    }
    }

    replaceState(state, title, url) {
	    url = this.formatPath(url)

    	if (this.emit('beforeNavigate') !== false) {
	    	store.length = current;

	    	store[current] = {
	    		state: state,
	    		title: title,
	    		url: url
	    	}
	    	super.replaceState(state, title, url)
	    	this.emit('afterNavigate')
	    }
    }

    getHistoryIndexByUrl(url) {
    	let index;
    	store.forEach((state, i) => {
    		if (state.url === url) {
    			index = i
    			return false
    		}
    	})
    }

    formatPath(path) {
    	path = path.replace(this.options.base, '') || '/'

    	return (this.options.hashbang ? '#!' : '') + path
    }


}