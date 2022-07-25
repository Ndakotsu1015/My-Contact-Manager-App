import { HttpHeaders } from "@angular/common/http";

export const httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
});