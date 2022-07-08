
export interface IniciativaInterface {
  idIniciativa  : any,
  nombre        : any,
  codigo        : any,
  vp            : any,
  gerenciaSol   : any,
  estado        : any,
  poProyecto    : any,
  responsable   : any,
  gerenciaBen   : any,
  planner       : any,
  contGerBen    : any,
  contAprBc     : any,
  tecnologia    : any,
  licencias     : any,
  naturaleza    : any,
  probActual    : any,
  funcRobotiz   : any,
  defAlcance    : any,
  riesgoNoRpa   : any,
  pi            : any,
  qtrxMes       : any,
  tmoTrx        : any,
  fluContx      : any,
  userCrea      : any,
  fechaCrea     : any,
  userAct       : any,
  fechaAct      : any,
}

// export class IniciativaInterface {
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
