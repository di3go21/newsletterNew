import { ChangeLog } from "./ChangeLog";
import { Dependencia } from "./Dependencia";

export class Tag{
    private tag:string;
    private changeLog:ChangeLog;
    private dependencias:Dependencia[];
    private devDependecias:Dependencia[];

    constructor(tag:string,changeLog:ChangeLog){
        this.tag=tag;
        this.changeLog=changeLog;
        this.dependencias=[];
        this.devDependecias=[];
    }

    getTag():string{return this.tag}
    setTag(tag:string):void{this.tag=tag};
    getChangeLog():ChangeLog{return this.changeLog}
    setChangeLog(changeLog:ChangeLog):void{this.changeLog=changeLog};
    getDependencias():Dependencia[]{return this.dependencias}
    setDependencias(dependencias:Dependencia[]):void{ this.dependencias=dependencias}
    getDevDependencias():Dependencia[]{return this.devDependecias}
    setDevDependencias(devDependecias:Dependencia[]):void{ this.devDependecias=devDependecias}

    addDependencia(dep:Dependencia):void{this.dependencias.push(dep)}
    addDevDependencia(dep:Dependencia):void{this.devDependecias.push(dep)}

}