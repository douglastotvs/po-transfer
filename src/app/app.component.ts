import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PoDynamicFormField, PoListViewAction, PoMenuItem, PoStepComponent, PoStepperComponent } from '@po-ui/ng-components';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('stepper') stepper!: PoStepperComponent;
  readonly menus: Array<PoMenuItem> = [
    { label: 'Inicio', action: () => alert('Hello Word') }
  ];

  dynamicForm!: NgForm;
  raw!: any;
  API = environment.API;
  transactionConfirm:any = [];

  propertyData: boolean = false;
  propertyAccept: boolean = false;
  propertyConcluded: boolean = false;

  constructor(private http: HttpClient){

  }

  readonly actions: Array<PoListViewAction> = [
    {
      label: 'Confirmar',
      action: this.confirm.bind(this),
      icon: 'po-icon-ok'
    },
    {
      label: 'Cancelar',
      action: this.cancel.bind(this),
      type: 'danger',
      icon: 'po-icon-close'
    }
  ];

  propertyForm: Array<PoDynamicFormField> = [
    {
      property: 'sender',
      label:'Remetente',
      placeholder:'Remetente',
      required: true,
      gridColumns:4
    },
    {
      property: 'recipient',
      label:'Destinatario',
      placeholder:'Destinatario',
      required: true,
      gridColumns:4
    },
    {
      property: 'money',
      label:'Valor',
      type:'currency',
      placeholder:'Valor',
      required: true,
      gridColumns:4
    },
    {
      property: 'description',
      label:'Descricao',
      placeholder:'Descricao',
      required: true,
      gridColumns:12,
      rows:5
    },
  ];

  save(){
    this.transactionConfirm = []
    this.raw = this.dynamicForm.form.getRawValue();
    this.raw = {
      ...this.raw,
      date: new Date().toISOString()
    }
    this.http.post(this.API, this.raw).subscribe((response) => {
      this.propertyData = true
      this.transactionConfirm.push(response)
      this.dynamicForm.reset();
      this.stepper.next();
      this.propertyData = false;
    })
  };

  getForm(form: NgForm) {
    this.dynamicForm = form;
  };

  poData(){
    return this.propertyData;
  };

  poAccept(){
    return this.propertyAccept;
  };

  poConcluded(){
    return this.propertyConcluded;
  };

  confirm(){
    this.propertyAccept = true;
    this.stepper.next();
    this.propertyAccept=false
    this.dynamicForm.reset();
  }

  cancel(){
    this.stepper.first();
  }



}
