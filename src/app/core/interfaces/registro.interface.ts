
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
  Nombre                : string;
  Codigo                : string;
  VP                    : string[];
  Gerencia_Solicitante  : string[];
  PO_Proyecto           : string;
  Responsable           : string;
  Gerencia_Beneficiaria : string[];
  Planner               : string[];
  Controller_Ger_Ben    : string;
  Controller_Aprob_BC   : string[];
  Tecnologia            : string[];
  Licencias             : number;
  Naturaleza            : string[];
}
