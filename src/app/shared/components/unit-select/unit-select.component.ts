import { Component, OnInit } from '@angular/core';
import { commonService } from 'src/app/core/services/common-service';

@Component({
  selector: 'app-unit-select',
  templateUrl: './unit-select.component.html',
  styleUrls: ['./unit-select.component.scss'],
})
export class UnitSelectComponent implements OnInit {
  unitLists = [{ id: 1, name: 'Grams', checked: false }, { id: 2, name: 'Kg', checked: false }, { id: 3, name: 'ml', checked: false }]

  constructor(private commonService: commonService) { }

  ngOnInit() { }

  selectCategory(event, unit, i) {
    if(unit.checked) { this.commonService.unitSelected.push(unit) }   
    console.log('selected',this.commonService.unitSelected); 
  }
}
