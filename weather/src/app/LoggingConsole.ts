import { HttpClient } from "@angular/common/http"

let oldConsole : Console
let httpClient:HttpClient
let url=`http://localhost:12345/console/`
export class LoggingConsole{
    
    indent = "    " 

    constructor(){
        oldConsole=console
    }

    public setHttpClient= (http:HttpClient)=>{
        httpClient=http
    }

    getMessage = (message?: any, ...optionalParams: any[])=>{
        let msg=message
        if (optionalParams){
            optionalParams.forEach(element => {
                //let elmsg = this.indent + element
                //elmsg.replace("/\n/g","\n"+this.indent)
                msg = msg + "\n" + element
            });
        }
        return msg
    }
    
    public debug = (message?: any, ...optionalParams: any[])=>{
        oldConsole.debug(message, ...optionalParams)
        if (httpClient==undefined) return;
        let newUrl=url+"debug"
        httpClient.post(newUrl,this.getMessage(message, ...optionalParams)).subscribe(
            {next: data => {}}
        )
    }
    public error = (message?: any, ...optionalParams: any[])=>{
        oldConsole.error(message, ...optionalParams)
        if (httpClient==undefined) return;
        let newUrl=url+"error"
        httpClient.post(newUrl,this.getMessage(message, ...optionalParams)).subscribe(
            {next: data => {}}
        )
    }
    public info=(message?: any, ...optionalParams: any[])=>{
        oldConsole.info(message, ...optionalParams)
        if (httpClient==undefined) return;
        let newUrl=url+"info"
        httpClient.post(newUrl,this.getMessage(message, ...optionalParams)).subscribe(
            {next: data => {}}
        )
    }
    public log=(message:any,  ...optionalParams: any[])=>{
        oldConsole.log(message, ...optionalParams)
        if (httpClient==undefined) return;
        let newUrl=url+"info"
        httpClient.post(newUrl,this.getMessage(message, ...optionalParams)).subscribe(
            {next: data => {}}
        )
    }
    public trace=(message?: any, ...optionalParams: any[])=>{
        oldConsole.trace(message, ...optionalParams)
        if (httpClient==undefined) return;
        let newUrl=url+"debug"
        httpClient.post(newUrl,this.getMessage(message, ...optionalParams)).subscribe(
            {next: data => {}}
        )
    }
    public warn=(message?: any, ...optionalParams: any[])=>{
        oldConsole.warn(message, ...optionalParams)
        if (httpClient==undefined) return;
        let newUrl=url+"warn"
        httpClient.post(newUrl,this.getMessage(message, ...optionalParams)).subscribe(
            {next: data => {}}
        )
    }
}