import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { JobsInterface } from './jobsInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobsServicesService {
  private url='http://localhost:8081';
  // private urls='http://localhost:8081/api/applyjob';
  constructor(private http:HttpClient){} 

  getJobs( ){
    console.log('url working',this.url)
    return this.http.get(`${this.url}/api/applyjob`)
   
  }

  getJobsService(jobs:JobsInterface[]){
    console.log('--jobs-service--',jobs);
    return this.http.post(`${this.url}/api/applyjob`,jobs);
   }

   deletejob(email:string){
    return this.http.delete(`${this.url}/api/applyjob/${email}`);
  }

 
}
  

  

 
  

