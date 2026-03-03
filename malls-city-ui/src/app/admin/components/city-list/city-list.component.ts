import {
  Component,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  inject,
  Output,
  EventEmitter,
} from '@angular/core';
import { CityList } from 'src/app/shared/store/app.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LoggerService } from 'src/app/shared/services/logger.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss'],
})
export class CityListComponent implements OnChanges {
  private log = inject(LoggerService);

  @Input() cityListInput!: CityList[];
  @Output() editCity = new EventEmitter<CityList>();

  displayedColumns: string[] = ['name', 'edit'];
  cityList = new MatTableDataSource<CityList>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cityListInput'] && this.cityListInput) {
      this.log.info(
        `cityList.component.ts:ngOnChanges:cityListInput::${JSON.stringify(
          this.cityListInput,
        )}`,
      );
      this.cityList.data = this.cityListInput;
    }
  }

  ngAfterViewInit() {
    this.cityList.paginator = this.paginator;
  }

  handleEditCity(city: CityList) {
    this.log.info(
      `cityList.component.ts:Emitting city for edit::${JSON.stringify(city)}`,
    );
    this.editCity.emit(city);
  }
}
