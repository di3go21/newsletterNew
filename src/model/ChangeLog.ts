import fs = require("fs");

export class ChangeLog {
    private added: string[];
    private changed: string[];
    private fixed: string[];
    private deprecated: string[];
    private removed: string[];
    
    constructor(added: string[],changed: string[],fixed: string[],deprecated: string[],removed: string[]) {
        this.added = added;
        this.changed = changed;
        this.fixed = fixed;
        this.deprecated = deprecated;
        this.removed = removed;
    }

    public getAdded():string[]{return this.added}
    public getChanged():string[]{return this.changed}
    public getFixed():string[]{return this.fixed}
    public getDeprecated():string[]{return this.deprecated}
    public getRemoved():string[]{return this.removed}


    public setAdded(added:string[]){this.added=added}
    public setChanged(changed:string[]){this.changed=changed}
    public setFixed(fixed:string[]){this.fixed=fixed}
    public setDeprecated(deprecated:string[]){this.deprecated=deprecated}
    public setRemoved(removed:string[]){this.removed=removed}


    /**Fabrica desde un string directamente leído de un changelog un objeto ChangeLog */
    public static FabricaChangeLogObjDesdeString(changeLogTxt:string){
        
        var cadenaSinSaltos=changeLogTxt
        cadenaSinSaltos=cadenaSinSaltos.substring(cadenaSinSaltos.indexOf("###"));        
        console.log(cadenaSinSaltos);
        var tmp =new ChangeLog([],[],[],[],[]);
        var campos=["Added","Changed","Fixed","Deprecated","Removed"];
        while(campos.length>0){
            var campo= campos.splice(0,1);            
            var existenValoresCampo=cadenaSinSaltos.split(campo[0]).length>1;
            if(existenValoresCampo){
                var valores=cadenaSinSaltos
                        .split("### "+campo)[1]
                        .split("###")[0]
                        .split(/(\r|\n)- /).filter(a=>a.trim()!="");
                valores.forEach((val,ind)=>valores[ind]=val.replace(/(\n|\r)/g,"").trim());

                console.log("valor campo "+campo);
                console.log(valores);
                tmp.setPropeidad(campo[0],tmp,valores);
            }
            cadenaSinSaltos=cadenaSinSaltos.substring(cadenaSinSaltos.indexOf("### "+campos[0]))
         
        }
        return tmp;



    }

    public setPropeidad(prop:string,obj:ChangeLog,valores:string[]):void{

        switch (prop) {
            case "Added":
                obj.setAdded(valores);
                break;
            case "Changed":
                obj.setChanged(valores);
                break;
            case "Fixed":
                obj.setFixed(valores);
                break;
            case "Deprecated":
                obj.setDeprecated(valores);
                break;
            case "Removed":
                obj.setRemoved(valores);
                break;
            default:
                break;
        }



    }





    
}