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

                respuesta.data.forEach((tagLeido: any) => {
                    tags.push(new Tag(tagLeido.name, ChangeLog.FabricaChangeLogObjDesdeString(tagLeido.release.description)));
                });
            })
            .catch((error) => {
                console.log(`Error: ${error}`);
            });

        var tagA = tags.filter(tag=>tag.getTag()=="1.5.0")[0];
        var tagB = tags.filter(tag=>tag.getTag()=="1.4.1")[0];


        //traemos un package
        let contenidoPackage: any;
        let uri2 = `https://gitlab.sisnet360.com/api/v4/projects/${process.env.ID_REPO_FRONT}/repository/files/package.json/raw?ref=${tagA.getTag()}`
        let cabeceras2 = { headers: { "Authorization": process.env.GITLAB_TOKEN } };

        await axios.get(uri2, cabeceras2)
            .then((respuesta) => {
                contenidoPackage = { dependencias: respuesta.data.dependencies, devDependencias: respuesta.data.devDependencies };
            })
            .catch((error) => {
                console.log(`Error: ${error}`);
            });
        
            
        for (const dep in contenidoPackage.dependencias) {
             tagA.addDependencia(new Dependencia(dep,contenidoPackage.dependencias[dep]))
             }
        for (const dep in contenidoPackage.devDependencias) {
                tagA.addDevDependencia(new Dependencia(dep,contenidoPackage.devDependencias[dep]))
                }

                //AQUI TAG A está completo


        //traemos packageJson en el template



        //lo guardamos en la carpeta del usuario




    });

    context.subscriptions.push(disposable);
}



export function deactivate() { }
