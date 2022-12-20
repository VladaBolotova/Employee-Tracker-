const { threadId } = require("worker_threads");

class Department{
    constructor(id,name){
        this.id = id;
        this.name = name;
    }

    getId(){
        return this.id;
    }
    
    getName(){
        return this.name
    }


}