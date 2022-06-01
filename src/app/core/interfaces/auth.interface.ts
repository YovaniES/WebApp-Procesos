export interface Users {
  username: string;
  password: string;
}

export interface AuthResponse {
  // logged: boolean;
  username: string;
  password: string;
  token: string;
  message?: string;
}


export interface datasheet{
  idssff:string,
  name:string,
  photouri:string,
  gender:string,
  toptalent:boolean,
  toptalentJustification:string,
  age:number,
  old:number,
  nationality:string,
  location:string,
  bu:string,
  division:string,
  position:string,
  potencialTo:string,
  potencialIcon:string,
  mobilize:boolean,
  countries:string[],
  aboutme:string,
  /* experience:myjobs[],
  studies:backStudie[];
  succesors:successor[], */
  skills:string[],
  pools:string[],
  bigsix:{name:string,value:number}[]
}
