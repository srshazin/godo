export namespace main {
	
	export class Todo {
	    id: number;
	    text: string;
	    isCompleted: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Todo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.text = source["text"];
	        this.isCompleted = source["isCompleted"];
	    }
	}

}

