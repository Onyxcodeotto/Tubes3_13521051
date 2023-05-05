class Pipeline{
    constructor(){
        this.string = "";
        this.equationRe = new RegExp();
        this.dateRe = new RegExp("[\d\+\-\*\/\^\(\)]*");
        this.addQ = new RegExp("([\w\s]* |)tambah pertanyaan \w[\w\s]* jawaban \w[\w\s]*");
        this.deleteQ = new RegExp("([\w\s]* |)hapus pertanyaan \w[\w\s]*");
    }

    determine(input){
        
        if(this.dateRe.test(input)){
            return 0;
        }
        if(this.equationRe.test(input)){
            return 1;
        }
        if(this.addQ.test(input)){
            return 2;
        }
        if(this.deleteQ.test(input)){
            return 3;
        }
        return -1;
    }
};
var result = stringMath("2+2");