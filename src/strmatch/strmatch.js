/**
//  * Abstract Class StrSimilarity
//  * 
//  * @class StrSimilarity
//  */ 
// class StrMatching{

//     compare(text, pattern);

// }



// class KMP extends StrMatching{
//     comparePattern(text,pattern){

//     }
// }

// class BM extends StrMatching{

// }

// class StrSimilarity{
//     compare(text, pattern);
// }

class Levensthein{
    compare(text, pattern){
        var matrix = [...Array(text.length)].map(e => Array(pattern.length));
        for(let i=0; i<text.length;i++){
            for(let j = 0;j<pattern.length;j++){
                if(Math.min(i,j)==0){
                    matrix[i][j] = Math.max(i,j)+1;
                }else{
                    matrix[i][j] = Math.min(
                        matrix[i][j-1]+1,
                        matrix[i-1][j]+1,
                        matrix[i-1][j-1]+ (text[i-1]==pattern[j-1] ? 0:1)
                    );
                }
            }
        }

        let distance = matrix[text.length-1][pattern.length-1];
        return distance;
    }
}

let test = new Levensthein();

console.log(test.compare('Fia', 'Kucing'));