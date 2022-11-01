import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PoDynamicFormField, PoMenuItem } from '@po-ui/ng-components';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly menus: Array<PoMenuItem> = [
    { label: 'Inicio', action: () => alert('Hello Word') }
  ];

  dynamicForm!: NgForm;
  raw!: any;
  API = environment.API;

  constructor(private http: HttpClient){

  }

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
    this.raw = this.dynamicForm.form.getRawValue();
    this.raw = {
      ...this.raw,
      date: new Date().toISOString()
    }
    this.http.post(this.API, this.raw).subscribe(() => {
      alert("Incluido com sucesso " )
    })
  }

  getForm(form: NgForm) {
    this.dynamicForm = form;
  }

}
