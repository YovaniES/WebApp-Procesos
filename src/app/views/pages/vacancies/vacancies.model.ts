export interface reqVacantDTO{
    id:number,
	parent:vacantParent,
	titular:vacantTitular,
	position:string,
	level:number,
	command:string,
	ambit:string,
	bu:string,
	workstream:string,
	status:vacantStatus,
	type:vacantType,
	flagnew:boolean,
	informer:string,
	createdat:Date,
	filteraprob:string
}
export interface newvacantRespnse{
	message:string,
	idVa:number,
	status:boolean
}
export interface vacantParent{
    code:string,
    name:string,
	codessff?:string,
	namessff?:string
}

export interface vacantTitular{
    idssff: string,
	nombre: string,
	correo: string,
}

export interface vacantStatus{
    id:number,
	code:string,
	color:string,
}
export interface vacantType{
    id:number,
	nombre:string,
}
export interface vacantUser{
    id:number,
	nombre:string,
	fecha:Date
}
export interface vacantAction{
	nombre:string,
	idNextState:number
}
export interface reqVacantDetail{
	id:number,
	parent:vacantParent,
	titular:vacantTitular,
	position:string,
	level:number,
	command:string,
	ambit:string,
	bu:string,
	workstream:string,
	type:vacantType,
	status:vacantStatus,
	justification:string,
	actions:vacantAction[],
	enable:boolean,
	flagnew:boolean,
	po:string,
	bussinessCase:string,
	agentes:vacantAgent[],
	files:{azure:string,filename:string}[]
}

export interface vacantAgent{
	type:string,
	name:string,
	date:Date,
	comment:string,
	order?:number,
	state?:number,
	action?:string
}

export interface vacantFlow{
	type:number,
	title:string,
	old:string[],
	new:string[]
}

export interface vacantRequest{
	name:string,
	type:number,
	justification:string,
	parentCode:string,
	po:string,
	vacantId:number,
	statusId:number,
	flagnew:boolean,
	comment:string,
	businesscase:string,
	files:number[];
}

export interface vacantUpdate{
	id:number,
	idssff:string,
	parentCode:string,
	workstream:string,
	command:string,
	ambit:string,
	bu:string,
	idRequisition:string,
}

export interface poPicklist{
	code:string,
	possff:string,
	tname:string,
	name:string,
	status:number,
	selected:boolean 
}