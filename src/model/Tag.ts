import { ChangeLog } from "./ChangeLog";

export class Tag{
    private tag:string;
    private changeLog:ChangeLog;

    constructor(tag:string,changeLog:ChangeLog){
        this.tag=tag;
        this.changeLog=changeLog;
    }

    getTag():string{return this.tag}
    setTag(tag:string):void{this.tag=tag};
    getChangeLog():ChangeLog{return this.changeLog}
    setChangeLog(changeLog:ChangeLog):void{this.changeLog=changeLog};
}