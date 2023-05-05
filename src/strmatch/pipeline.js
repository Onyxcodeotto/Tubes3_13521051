class Pipeline{
    constructor(){
        this.string = "";
        this.equationRe = new RegExp();
        this.dateRe = new RegExp("[\d\+\-\*\/\^\(\)]*");
        this.addQ = new RegExp("([\w\s]* |)tambah pertanyaan \w[\w\s]* jawaban \w[\w\s]*");
        this.deleteQ = new RegExp("([\w\s]* |)hapus pertanyaan \w[\w\s]*");
    }

    determine(input){
        
        if(this.dateRe.test()){
            return this.dateRe.match();
        }
        if(this.equationRe.test()){
            return this.equationRe.match();
        }
        if(this.addQ.test()){
            return this.addQ.match();
        }
        if(this.deleteQ.test()){
            return this.deleteQ.match();
        }
    }
};
var result = stringMath("2+2");