export class Dependencia{
    private nombre:string;
    private version:string;

    constructor(nombre:string,version:string){
        this.nombre=nombre;
        this.version=version.replace(/(~|\^)/,"");
    }

    getNombre():string{return this.nombre};
    getVersion():string{return this.version};
    setNombre(nombre:string):void{this.nombre=nombre};
    setVersion(version:string){this.version=version};

}