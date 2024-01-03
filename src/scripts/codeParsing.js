export class CodeParse{

    constructor(code){
        this.code = code;
        this.code_parsed = code.split('\n');

        this.map_variables = new Map();
    }

    loopExtractVariables(){
        for(let i=0;i<this.code_parsed.length; i++){
            
            let sub = this.code_parsed[i].split(":");
            
            let sub_trimmed = []
            for(let j=0; j<sub.length;j++){
                sub_trimmed[j] = sub[j].trim();
            }

            let type = sub_trimmed[1];
            let variables = sub_trimmed[0].split(",");

            if(variables != ""){
                for(let j=0; j<variables.length;j++){
                    variables[j] = variables[j].trim();
                    
                    // set
                    this.map_variables.set(variables[j], type);
                }
            }
        }

        return this.map_variables;
        
    }

    getParsedCode(){
        return this.code_parsed;
    }

    getLineCode(line_index){
        return this.code_parsed[line_index];
    }


    getVariables(){
        return this.map_variables;
    }




}
