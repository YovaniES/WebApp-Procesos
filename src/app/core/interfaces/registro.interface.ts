
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
