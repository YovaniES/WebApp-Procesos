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
