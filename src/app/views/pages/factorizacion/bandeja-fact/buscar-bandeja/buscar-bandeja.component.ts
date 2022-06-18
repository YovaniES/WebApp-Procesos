import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalRegistroService } from 'src/app/core/services/modalRegistro.service';
export class Usuario {
  id!: number;
  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  token!: string;
  user:any;
}
@Component({
  selector: 'app-buscar-bandeja',
  templateUrl: './buscar-bandeja.component.html',
  styleUrls: ['./buscar-bandeja.component.scss']
})
export class BuscarBandejaComponent implements OnInit {

  @ViewChild('btnGuardarPersonal') btnGuardarPersonal!: ElementRef;

   /*pagination*/
   offset:any;
   totalRequerimientos:number = 0;
   page:number = 1;

  proyectos:Array<any> = [];
  personal:Array<any> = [];
  /*busqueda*/
  busqueda = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno:'',
    correo:'',
    dni:'',
    codCorporativo:'',
    perfil:'',
    codProyecto:'',
    fechaIngresoInicio:'',
    fechaIngresoFin:'',
    estado:'',
    imei:''
  };


  constructor(private spinner: NgxSpinnerService,
              public datepipe: DatePipe,
              private modalRegistroService: ModalRegistroService,
              // private toastr: ToastrService
              ) { }

  ngOnInit(): void {
    this.spinner.hide();

    this.getCboProyectos();
    this.getListaPersonal();

  }

  getCboProyectos(){
    let arrayParametro:any[] = [{
      "queryId": 1
    }];

    this.modalRegistroService.getProyectos(arrayParametro[0]).subscribe(data => {
      //this.proyectos = data;
      const arrayData:any[] = Array.of(data);
      this.proyectos = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.proyectos.push({
          id:arrayData[0].list[index].id,
          codigo:arrayData[0].list[index].codigo,
          descripcion:arrayData[0].list[index].descripcion,
        });
      }
    });
  }

  buscarPersona(){
    this.spinner.show();
    let codProyecto:any;
    if (this.busqueda.codProyecto == '0') {
      codProyecto = '';
    }else{
      codProyecto = this.busqueda.codProyecto;
    }
    let arrayParametro:any[] = [{
      "queryId": 30,
      "mapValue": {
        "nombre": this.busqueda.nombre + ' ' +this.busqueda.apellidoPaterno,
        "dni": this.busqueda.dni,
        "codigo_proyecto": codProyecto,
        "inicio": this.datepipe.transform(this.busqueda.fechaIngresoInicio,'yyyy/MM/dd'),
        "fin": this.datepipe.transform(this.busqueda.fechaIngresoFin,'yyyy/MM/dd')
      }
    }];
    this.modalRegistroService.buscarPersona(arrayParametro[0]).subscribe(data => {
      const arrayData:any[] = Array.of(data);
      this.personal = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.personal.push({
          id:arrayData[0].list[index].id,
          nombres:arrayData[0].list[index].nombres,
          apellidos:arrayData[0].list[index].apellidos,
          correo:arrayData[0].list[index].correo,
          dni:arrayData[0].list[index].dni,
          codigo_corporativo:arrayData[0].list[index].codigo_corporativo,
          perfil:arrayData[0].list[index].perfil,
          codigo_proyecto:arrayData[0].list[index].codigo_proyecto,
          proyecto_descripcion:arrayData[0].list[index].proyecto_descripcion,
          fecha_ingreso:arrayData[0].list[index].fecha_ingreso,
          estado:arrayData[0].list[index].estado
        });
      }
      this.spinner.hide();
    });
  }

  codCorporativo:any;
  idEliminar:any;
  tituloDeBaja:any;
  tooltipDeBaja:any;
  informacionDeBaja:any;
  abrirEliminar(id:number,codCorporrativo:string,estado:string){
    this.idEliminar = id;
    this.codCorporativo = codCorporrativo;
    if (estado == 'Activo') {
      this.tituloDeBaja = "Dar de Baja a un personal";
      this.tooltipDeBaja = "Dar Baja";
      this.informacionDeBaja = '¿Desea dar de baja al personal?';
    }
    if (estado == 'Inactivo') {
      this.tituloDeBaja = "Dar de Alta a un personal";
      this.tooltipDeBaja = "Dar Alta";
      this.informacionDeBaja = '¿Desea activar al personal?'
    }
  }

  totalBusqueda:number = 0;
  handlePageChange(event: number) {
    let offset = event*10;
    this.spinner.show();

      if(this.totalBusqueda != this.totalRequerimientos){
        this.modalRegistroService.getListaMantenimiento(offset.toString()).subscribe(data => {
          //this.personal = data;
          /*FRANCIA INICIO*/
          const arrayData:any[] = Array.of(data);

          for (let index = 0; index < arrayData[0].list.length; index++) {
            this.personal.push({
              id:arrayData[0].list[index].id,
              nombres:arrayData[0].list[index].nombres,
              apellidos:arrayData[0].list[index].apellidos,
              correo:arrayData[0].list[index].correo,
              dni:arrayData[0].list[index].dni,
              codigo_corporativo:arrayData[0].list[index].codigo_corporativo,
              perfil:arrayData[0].list[index].perfil,
              codigo_proyecto:arrayData[0].list[index].codigo_proyecto,
              fecha_ingreso:arrayData[0].list[index].fecha_ingreso,
              estado:arrayData[0].list[index].estado
            });
          }
          /*FRANCIA FIN*/
          this.spinner.hide();
          console.log('totalrequerimientos: '+this.totalRequerimientos);
          console.log('totalBusqueda: '+this.totalBusqueda);
        });
      }else{
        this.spinner.hide();
      }
    this.page = event;
  }

  datosPersonal = {
    id: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    dni: '',
    codCorporativo: '',
    codPerfil: '',
    codProyecto: '',
    fechaNacimiento: '',
    fechaIngreso: ''
  };


  fechanac:any;
  fechain:any;
  descProyecto:any;
  descPerfil:any;
  limpiarFormAgregarPersonal(){
    this.descProyecto = '';
    this.descPerfil = '';
    this.datosPersonal.nombre = '';
    this.datosPersonal.apellidoPaterno = '';
    this.datosPersonal.apellidoMaterno = '';
    this.datosPersonal.correo = '';
    this.datosPersonal.dni = '';
    this.datosPersonal.codCorporativo = '';
    this.datosPersonal.codPerfil = '';
    this.datosPersonal.codProyecto = '';
    this.fechanac = '';
    this.fechain = '';
    // this.btnGuardarPersonal.nativeElement.disabled = false;
    this.getCboProyectos();
    this.getCboPerfiles();
  }


  // MODAL INFO PERFIL
  getInfoPerfil(id:any){
    this.datosPersonal.codPerfil = id.toString();
    let arrayParametro:any[] = [{
      "queryId": 11,
      "mapValue": {
        "param_id_perfil": id
      }
    }];
    this.modalRegistroService.getInfoPerfiles(arrayParametro[0]).subscribe(data => {

      const arrayData:any[] = Array.of(data);
      for (let index = 0; index < arrayData.length; index++) {
        this.descPerfil = arrayData[0].list[index].descripcion;
      }
    });
  }

  perfiles:Array<any> = [];
  getCboPerfiles(){
    let arrayParametro:any[] = [{
      "queryId": 10
    }];

    this.modalRegistroService.getPerfiles(arrayParametro[0]).subscribe(data => {
      //this.proyectos = data;
      const arrayData:any[] = Array.of(data);
      this.perfiles = [];
      for (let index = 0; index < arrayData[0].list.length; index++) {
        this.perfiles.push({
          id:arrayData[0].list[index].id,
          nombre:arrayData[0].list[index].nombre,
          descripcion:arrayData[0].list[index].descripcion,
        });
      }
    });
  }

  getInfoProyecto(id:any){
    this.datosPersonal.codProyecto = id.toString();
    let arrayParametro:any[] = [{
      "queryId": 2,
      "mapValue": {
        "param_id_proyecto": id
      }
    }];
    this.modalRegistroService.getInfoProyecto(arrayParametro[0]).subscribe(data => {
      console.log('PRO', data);
      const arrayData:any[] = Array.of(data);

      for (let index = 0; index < arrayData.length; index++) {
        this.descProyecto = arrayData[0].list[index].descripcion;
      }
    });
  }

  usuario!: Usuario;

  addPersonal(){
    this.spinner.show();
    this.btnGuardarPersonal.nativeElement.disabled = true;
    let personalCodPerfil:any;
    if (this.datosPersonal.codPerfil == '0') {
      personalCodPerfil = '';
    }else{
      personalCodPerfil = this.datosPersonal.codPerfil;
    }
    let personalCodProyecto:any;
    if (this.datosPersonal.codProyecto == '0') {
      personalCodProyecto = '';
    }else{
      personalCodProyecto = this.datosPersonal.codProyecto;
    }
    let nombre = this.datosPersonal.nombre;
    let apellidoPaterno = this.datosPersonal.apellidoPaterno;
    let apellidoMaterno = this.datosPersonal.apellidoMaterno;
    let correo = this.datosPersonal.correo;
    let dni = this.datosPersonal.dni;
    let codCorporativo = this.datosPersonal.codCorporativo;
    let codPerfil = personalCodPerfil;
    let codProyecto = personalCodProyecto;
    let fechaNacimiento = this.fechanac;
    let fechaIngreso = this.fechain;

    let arrayParametro:any[] = [{
      "queryId": 7,
      "mapValue": {
        "param_codigo_corporativo": codCorporativo,
        "param_nombres": nombre,
        "param_apellido_paterno": apellidoPaterno,
        "param_apellido_materno": apellidoMaterno,
        "param_dni": dni,
        "param_correo": correo,
        "param_fecha_ingreso": fechaIngreso,
        "param_fecha_nacimiento": fechaNacimiento,
        "param_id_proyecto": codProyecto,
        "param_id_perfil": codPerfil,
        "CONFIG_USER_ID":this.usuario.user.userId,
        "CONFIG_OUT_MSG_ERROR":'',
        "CONFIG_OUT_MSG_EXITO":''
      }
    }];
  }


  @ViewChild('modalEliminar') modalEliminar!: ElementRef;
  cancelarEliminar(){
    this.modalEliminar.nativeElement.click();
    this.idEliminar = '';
    this.codCorporativo = '';
  }

  confirmarEliminar(){
    this.eliminarPersonal(this.idEliminar);
  }


  // showSuccess(msj:string){
  //   this.toastr.success(msj,'',{timeOut: 2000});
  // }

  eliminarPersonal(id:number){
    this.spinner.show();

    let arrayParametro:any[] = [{
      "queryId": 9,
      "mapValue": {
        "param_id_persona": id
      }
    }];
    this.modalRegistroService.deletePersonal(arrayParametro[0]).subscribe(data => {
      const arrayData:any[] = Array.of(data);
      let msj = arrayData[0].exitoMessage;
      let msj2 = arrayData[0].errorMessage
      if(msj == undefined){
        msj = '';
      }
      if(msj2 == undefined){
        msj2 = '';
      }
      // if (msj != '') {
      //   this.showSuccess(msj);
      // }
      // else if (msj2 != ''){
      //   this.showError(msj2);
      // }else{
      //   this.showError('Error');
      // }
      this.modalEliminar.nativeElement.click();
      this.getListaPersonal();
    });
    this.spinner.hide();
    //window.location.reload();
}

getListaPersonal(){
  this.spinner.show();
  let arrayParametro:any[] = [{
    "queryId": 6
  }];
  this.modalRegistroService.getListaMantenimiento(arrayParametro[0]).subscribe(data => {
    //this.personal = data;
    const arrayData:any[] = Array.of(data);
    console.log('PER', arrayData);

    this.personal = [];
    for (let index = 0; index < arrayData[0].list.length; index++) {
      this.personal.push({
        id:arrayData[0].list[index].id,
        nombres:arrayData[0].list[index].nombres,
        apellidos:arrayData[0].list[index].apellidos,
        correo:arrayData[0].list[index].correo,
        dni:arrayData[0].list[index].dni,
        codigo_corporativo:arrayData[0].list[index].codigo_corporativo,
        perfil:arrayData[0].list[index].perfil,
        codigo_proyecto:arrayData[0].list[index].codigo_proyecto,
        proyecto_descripcion:arrayData[0].list[index].proyecto_descripcion,
        fecha_ingreso:arrayData[0].list[index].fecha_ingreso,
        estado:arrayData[0].list[index].estado
      });
    }
    this.spinner.hide();
  });
  this.getCboProyectos();
}

}
