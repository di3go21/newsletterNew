import * as vscode from 'vscode';
require('dotenv').config({path:__dirname+'/../.env'});
import fs = require("fs");
import   axios, { AxiosError } from "axios";
import { Tag } from './model/Tag';
import { ChangeLog } from './model/ChangeLog';

export function activate(context: vscode.ExtensionContext) {
	

	let disposable = vscode.commands.registerCommand('pruebasNL.helloWorld', async () => {

		// traemos tags
		let tags: Tag[]=[];
        let uri = `https://gitlab.sisnet360.com/api/v4/projects/${process.env.ID_REPO_FRONT}/repository/tags`;
        let cabeceras = {headers:{"Authorization" : process.env.GITLAB_TOKEN}};

        await axios.get(uri, cabeceras)
        .then((respuesta) => {            
            respuesta.data.forEach((tagLeido: any) => {
                tags.push(new Tag(tagLeido.name,ChangeLog.FabricaChangeLogObjDesdeString(tagLeido.release.description)));
            });       
        })
        .catch((error) => {
            console.log(`Error: ${error}`);
        });       

        var tagA="1.5.0";
        var tagB="1.4.1";

		//pintamos en el template



		//lo guardamos en la carpeta del usuario

		












	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
