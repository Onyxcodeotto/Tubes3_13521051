/**
 * Abstract Class StrSimilarity
 * 
 * @class StrSimilarity
 */ 
class StrMatching{

    comparePattern(text, pattern){
        throw new Error('Kosong');
    }

}

class KMP extends StrMatching{
    comparePattern(text,pattern){
        let lps = this.createLPS(pattern);
        let n = text.length;
        let m = pattern.length;
        let i =0;
        let j =0;
        while(i<n){
            if (pattern[j] == text[i]){
                i++;
                j++;
                if(j==m){
                    return true;
                }
                
            }else{
                if(j>0){
                    j = lps[j-1];
                }else{
                    i++;
                }
            }
        }
        return false;
    }
    createLPS(pattern){
        let lps = new Array();
        lps[0] = 0;
        let i = 1;
        let j = 0;
        let m = pattern.length;

        while(i<m){
            
            if(pattern[i] == pattern[j]){
                lps[i++] = ++j;
            }else{
                if(j!=0){
                    j = lps[j - 1];
                }else{
                    lps[i++] = 0;
                }
            }
        }
        return lps;

    }


}

class BM extends StrMatching{
    static CHAR_NUM  = 256;
    comparePattern(text,pattern){
        let n = text.length;
        let m = pattern.length;

        let last = this.getLastOccurance(pattern);
        let i = m-1;

        if(i>n-1){
            return -1;
        }
        let j = m-1;
        do{
            if(pattern[j]==text[i]){
                if(j==0){
                    return true;
                }else{
                    i--;
                    j--;
                }
            }else{
                i = i+m-Math.min(j, 1+last[text[i]]);
                j=m-1;
            }

        }while(i<=n-1);
        return false;
    }
    getLastOccurance(pattern){
        var array = new Array(this.CHAR_NUM);
        array.fill(-1, 0, this.CHAR_NUM);
        for(let i = 0; i<pattern.length; i++){
            array[pattern[i]] = i;
        }


        return array;
    }
}


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

module.exports = {
    Levensthein, KMP, BM
  };

let test = new Levensthein();
let test2 = new KMP();
let test3 = new BM();

const pattern = 'abc';
const text = 'ababcabcababc';
// console.log(test.compare('Fia', 'Kucing'));
// console.log(test2.comparePattern(text, pattern));
// console.log(test3.comparePattern(text,pattern));