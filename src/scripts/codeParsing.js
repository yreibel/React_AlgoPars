export class CodeParse{

    constructor(code){
        this.code = code;
        this.code_parsed = code.split('\n');

        // Key variable_name - type
        this.map_variables = new Map();

        // Key variable_name - value 
        this.map_variables_value = new Map();

        // Key 
        this.trace_exec = [];

    }

    loopExtractVariables(){
        for(let i=0;i<this.code_parsed.length; i++){
            
            if(this.code_parsed[i].includes(":")){

                let sub = this.code_parsed[i].split(":");
            
                let sub_trimmed = []
                for(let j=0; j<sub.length;j++){
                    sub_trimmed[j] = sub[j].trim();
                }

                let type = sub_trimmed[1];
                let variables = sub_trimmed[0].split(",");

                if(variables !== ""){
                    for(let j=0; j<variables.length;j++){
                        variables[j] = variables[j].trim();
                        
                        // set
                        this.map_variables.set(variables[j], type);
                    }
                }
            }
            
        }

        return Array.from(this.map_variables);
        
    }


    processSettingVar(line_index){

       
        let line_code = this.code_parsed[line_index];
        
        let values = line_code.split("<=");

        if(values !== ""){

            
            if(values[1] === undefined) return;
            let val = values[1].trim();

            // test
            
            

            // test

            let variablesObject = []

            
            let variables = values[0].split(",");

            if(variables !== ""){
                for(let j=0; j<variables.length;j++){
                    variables[j] = variables[j].trim();

                    // Check if variable has been pre-identified previously 
                    
                    if(this.map_variables.has(variables[j])){
                        this.map_variables_value.set(variables[j], val)

                        variablesObject[variables[j]] = val;
                        
                    }

                }
                
                let trace = {
                    line: line_index+1, // subtracted to go through the editor line by line and search in the array
                    variables: variablesObject,
                    print: null
                    
                }

                //console.log(trace)
                this.trace_exec.push(trace);
            } 
        }

       
        this.showTraceExecForLastPush();
        

    }

    processLine(line_index){
        
        let line_code = this.code_parsed[line_index];
        if(line_code.includes("<=")) this.processSettingVar(line_index);


        return Array.from(this.map_variables_value);
    }

    showTraceExec(){

        
        if (this.trace_exec.length > 0) {
            for (let i = 0; i < this.trace_exec.length; i++) {
                
                const el = this.trace_exec[i];
                console.log("  Line:", el.line);
                console.log("  Variables:", el.variables);
                console.log("  Print:", el.print);
                console.log(); 
            }
        } else {
            console.log("No trace exec data available.");
        }


    }


    showTraceExecForLastPush(){

        if (this.trace_exec.length > 0) {

                const el = this.trace_exec[this.trace_exec.length-1];
                console.log("  Line:", el.line);
                console.log("  Variables:", el.variables);
                console.log("  Print:", el.print);
                console.log(); 
            
        } else {
            console.log("No trace exec data available.");
        }


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

    getTraceExec(){
        return this.trace_exec;
    }

}
