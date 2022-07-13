// export class Iniciativa {
//   idIniciativa  : number =  0;
//   nombre        : string =  '';
//   codigo        : string =  '';
//   vp            : number =  0;
//   gerenciaSol   : number =  0;
//   estado        : number =  0;
//   poProyecto    : string =  '';
//   responsable   : string =  '';
//   gerenciaBen   : number =  0
//   planner       : string =  '';
//   contGerBen    : string =  '';
//   contAprBc     : string =  '';
//   tecnologia    : number =  0
//   licencias     : number =  0
//   naturaleza    : number =  0
//   probActual    : string =  '';
//   funcRobotiz   : string =  '';
//   defAlcance    : string =  '';
//   riesgoNoRpa   : string =  '';
//   pi            : number =  1
//   qtrxMes       : string =  '';
//   tmoTrx        : string =  '';
//   fluContx      : number =  0
//   userCrea      : string =  '';
//   fechaCrea     : any
//   userAct       : string = '';
//   fechaAct      : any
// }

export interface Iniciativa {
  idIniciativa  : number ;
  nombre        : string ;
  codigo        : string ;
  vp            : number ;
  gerenciaSol   : number ;
  estado        : number ;
  poProyecto    : string ;
  responsable   : string ;
  gerenciaBen   : number ;
  planner       : string ;
  contGerBen    : string ;
  contAprBc     : string ;
  tecnologia    : number ;
  licencias     : number ;
  naturaleza    : number ;
  probActual    : string ;
  funcRobotiz   : string ;
  defAlcance    : string ;
  riesgoNoRpa   : string ;
  pi            : number ;
  qtrxMes       : string ;
  tmoTrx        : string ;
  fluContx      : number ;
  userCrea      : string ;
  fechaCrea     : any;
  userAct       : string;
  fechaAct      : any
}

export interface Registro {
  idIniciativa          : number;
  nombre                : string;
  codigo                : string;
  vp                    : string[];
  gerencia_Solicitante  : string[];
  po_Proyecto           : string;
  responsable           : string;
  gerencia_Beneficiaria : string[];
  planner               : string[];
  controller_Ger_Ben    : string;
  controller_Aprob_BC   : string[];
  tecnologia            : string[];
  licencias             : number;
  naturaleza            : string[];
}

