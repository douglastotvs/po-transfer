import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PoDynamicFormField, PoGaugeRanges, PoListViewAction, PoMenuItem, PoStepComponent, PoStepperComponent } from '@po-ui/ng-components';
import { PoMenuItemsService } from '@po-ui/ng-components/lib/components/po-menu/services/po-menu-items.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('stepper') stepper!: PoStepperComponent;
  readonly menus: Array<PoMenuItem> = [
    { label: 'Inicio', action: () => alert('Hello Word') }
  ];

  dynamicForm!: NgForm;
  raw!: any;
  API = environment.API;
  transactionConfirm:any = [];
  isHideLoading: boolean = true;

  propertyData: boolean = false;
  propertyAccept: boolean = false;
  propertyConcluded: boolean = false;
  poGaugeAll: number = 0;
  poGaugeDay: number = 0;

  constructor(private http: HttpClient){

  }
  ngOnInit(): void {
   this.updatePoGauge();
  }

  turnoverRanges: Array<PoGaugeRanges> = [
    { from: 0, to: 50, label: 'Baixo', color: '#00b28e' },
    { from: 50, to: 75, label: 'Médio', color: '#ea9b3e' },
    { from: 75, to: 100, label: 'Alto', color: '#c64840' }
  ];

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

    if(this.poGaugeDay >= 100 ){
      alert('Limite diário atigindo');
      return
    } else if (this.poGaugeAll >= 100 ) {
      alert('Limite total atigindo');
      return
    }

    this.transactionConfirm = []
    this.raw = this.dynamicForm.form.getRawValue();
    this.raw = {
      ...this.raw,
      date: new Date().toISOString()
    };
    this.isHideLoading = false;
    this.http.post(this.API, this.raw).subscribe((response) => {
      this.propertyData = true
      this.transactionConfirm.push(response)
      this.dynamicForm.reset();
      this.stepper.next();
      this.propertyData = false;
      this.isHideLoading = true;
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

    this.isHideLoading = false;
    this.updatePoGauge()
    setTimeout(() => {

      this.propertyAccept = true;
      this.stepper.next();
      this.propertyAccept=false
      this.dynamicForm.reset();

      this.isHideLoading = true
    },2000);

    setTimeout(() => {
      this.stepper.first();
    }, 4000);

  }

  cancel(){
    this.stepper.first();
  }

  updatePoGauge(){
    this.http.get(this.API).subscribe((items: any) => {
      this.poGaugeAll = 10* items.length;

      const today = new Date().toLocaleDateString();
      let count = 0;

      items.map((reponse: any) => {
        const dateToCompare = new Date(reponse.date).toLocaleDateString();

        if(today === dateToCompare ) {
          count  ++;
        }
    })
    this.poGaugeDay = 10* count;
  })
}
}
