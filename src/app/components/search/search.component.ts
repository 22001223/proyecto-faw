import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchParams } from '../../shared/models/search-params.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
})
export class SearchComponent {
  @Output() searchParams = new EventEmitter<SearchParams>();

  formSearchParams: FormGroup = new FormGroup({});
  isAscending = true;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formSearchParams = this.formBuilder.group({
      searchKeywords: new FormControl(undefined),
      isAscending: new FormControl(this.isAscending),
      priority: new FormControl('All'),
    });
  }

  onSortChange() {
    this.isAscending = !this.isAscending;
    this.formSearchParams.get('isAscending')?.setValue(this.isAscending);
    this.onFieldChange();
  }

  onFieldChange() {
    this.searchParams.emit(this.formSearchParams.value);
  }

}
