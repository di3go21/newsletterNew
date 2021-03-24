import * as vscode from 'vscode';
require('dotenv').config({ path: __dirname + '/../.env' });
import fs = require("fs");
import axios, { AxiosError } from "axios";
import { Tag } from './model/Tag';
import { ChangeLog } from './model/ChangeLog';
import { Dependencia } from './model/Dependencia';

export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('pruebasNL.helloWorld', async () => {

        // traemos tags

        let tags: Tag[] = [];
        let uri = `https://gitlab.sisnet360.com/api/v4/projects/${process.env.ID_REPO_FRONT}/repository/tags`;
        let cabeceras = { headers: { "Authorization": process.env.GITLAB_TOKEN } };

        await axios.get(uri, cabeceras)
            .then((respuesta) => {
                //cuando llega la respuesta pusheamos al arry de Tag
                respuesta.data.forEach((tagLeido: any) => {
                    tags.push(new Tag(tagLeido.name, ChangeLog.FabricaChangeLogObjDesdeString(tagLeido.release.description)));
                });
            })
            .catch((error) => {
                console.log(`Error: ${error}`);
            });
        //recogemos solo un par para probar
        var tagA = tags.filter(tag=>tag.getTag()=="1.4.0")[0];
        var tagB = tags.filter(tag=>tag.getTag()=="1.4.1")[0];


        //traemos un package
        let contenidoPackage: any;
        let uri2 = `https://gitlab.sisnet360.com/api/v4/projects/${process.env.ID_REPO_FRONT}/repository/files/package.json/raw?ref=${tagA.getTag()}`
        let cabeceras2 = { headers: { "Authorization": process.env.GITLAB_TOKEN } };

        await axios.get(uri2, cabeceras2)
            .then((respuesta) => {
                
               // contenidoPackage = { dependencias: respuesta.data.dependencies, devDependencias: respuesta.data.devDependencies };
                for (const dep in respuesta.data.dependencies) {
                    tagA.addDependencia(new Dependencia(dep,respuesta.data.dependencies[dep]))
                    }
               for (const dep in respuesta.data.devDependencies) {
                       tagA.addDevDependencia(new Dependencia(dep,respuesta.data.devDependencies[dep]))
                       }
            })
            .catch((error) => {
                console.log(`Error: ${error}`);
            });
        
            console.log(tagA)
        

                //AQUI TAG A está completo


        //traemos packageJson en el template



        //lo guardamos en la carpeta del usuario




    });

    context.subscriptions.push(disposable);
}



export function deactivate() { }
