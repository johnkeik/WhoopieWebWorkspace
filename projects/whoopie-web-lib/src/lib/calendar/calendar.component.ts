import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output, input } from '@angular/core';
import { noop } from 'rxjs';


type CalendarViewRange = {
  month: number;
  year: number;
};

type CalendarEvent = {
    date:Date;
    title:string;
}

class CalendarDate extends Date {
  prevOtherMonth = false;
  nextOtherMonth = false;
  selected = false;
  today = false;
  evented = false;
  i: number = -1;
  j: number = -1;
  randomKey:number = Math.random();

  focus(){
    setTimeout(()=>{document.getElementById(this.id)?.focus();},1)
  }

  equals(date: Date): boolean {
    return (
      date.getDate() === this.getDate() &&
      date.getMonth() === this.getMonth() &&
      date.getFullYear() === this.getFullYear()
    );
  }

  copy(): CalendarDate {
    return Object.assign(new CalendarDate(this), this);
  }

  get otherMonth():boolean{
    return this.prevOtherMonth || this.nextOtherMonth;
  }

  get id():string{
    return this.i + "-" + this.j + this.randomKey;
  }
}

const MONTHS: {sort:string,long:string}[] = [
  {sort:'Jan',long:'January'},
  {sort:'Feb',long:'February'},
  {sort: 'Mar',long:'March'},
  {sort: 'Apr',long:'April'},
  {sort: 'May',long:'May'},
  {sort: 'Jun',long:'June'},
  {sort: 'Jul',long:'July'},
  {sort: 'Aug',long:'August'},
  {sort: 'Sep',long:'September'},
  {sort: 'Oct',long:'Octomber'},
  {sort: 'Nov',long:'November'},
  {sort: 'Dec',long:'December'}
];

const DAYS: {sort:string,long:string }[] = [
  {sort: 'Sun',long:'Sunday'},
  {sort: 'Mon',long:'Monday'},
  {sort: 'Tue',long:'Tuesday'},
  {sort: 'Wed',long:'Wednesday'},
  {sort: 'Thu',long:'Thursday'},
  {sort: 'Fri',long:'Friday'},
  {sort: 'Sat',long:'Saturday'}
];

@Component({
  selector: 'whpw-lib-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  exportAs: 'CalendarComponent'
})

export class CalendarComponent implements OnInit, OnDestroy {
  calendarDays: CalendarDate[][] = [];
  focused = false;
  private selectedDate = new CalendarDate();
  @Output() dateSelected = new EventEmitter<Date>();
  @Output() dismissed = new EventEmitter<void>();
  @Output() applied = new EventEmitter<Date>();
  events = input<CalendarEvent[]>([]);
  eventsOfSelectedDate:CalendarEvent[] = []
  MONTHS = MONTHS;
  DAYS = DAYS;
  // arrowIcon = IconNameType.arrow;

  get selectedDateLabel(): {text:string,desc:string} {
    return {
      text:
      '' +
      MONTHS[this.selectedViewRange.month].sort +
      ' ' +
      this.selectedViewRange.year,
      desc:'' +
      MONTHS[this.selectedViewRange.month].long +
      ' ' +
      this.selectedViewRange.year,
    };
  }

  private selectedViewRange: CalendarViewRange = {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };

  ngOnInit(): void {
    this.calculateCalendarDays();
    this.calculateEvents();
    this.registerListener();
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', noop);
  }

  cancelClicked(){
    this.dismissed.emit();
  }

  applyBtnClicked(){
    this.applied.emit(this.selectedDate.copy());
  }

  nextMonth(): void {
    if (this.selectedViewRange.month >= 11) {
      this.selectedViewRange.month = 0;
      this.selectedViewRange.year += 1;
    } else {
      this.selectedViewRange.month += 1;
    }
    this.switchedMonthActions();
  }

  prevMonth() {
    if (this.selectedViewRange.month <= 0) {
      this.selectedViewRange.month = 11;
      this.selectedViewRange.year -= 1;
    } else {
      this.selectedViewRange.month -= 1;
    }
    this.switchedMonthActions();
  }

  chooseDate(i: number, j: number) {
    this.selectedDate = this.calendarDays[i][j].copy();
    if(this.selectedDate.prevOtherMonth){
      this.prevMonth();
    }else if (this.selectedDate.nextOtherMonth){
      this.nextMonth();
    }
    this.calculateCalendarDays();
    this.dateChosen();
  }

  dateChosen() {
    this.selectedDate.focus();
    this.calculateEvents();
    this.dateSelected.emit(this.selectedDate.copy());
  }

  dateFocusedIn() {
    this.focused = true;
  }

  dateFocusedOut() {
    this.focused = false;
  }

  private calculateCalendarDays() {
    this.calendarDays = [];
    const tippingPoint = 4;
    const firstDayOfMonth = new Date(
      this.selectedViewRange.year,
      this.selectedViewRange.month,
      1
    );
    const rows = firstDayOfMonth.getDay() > tippingPoint ? 6 : 5;
    const iterationDate = new Date(firstDayOfMonth);
    iterationDate.setDate(iterationDate.getDate() - firstDayOfMonth.getDay());

    for (let i = 0; i < rows; i++) {
      const week: CalendarDate[] = [];
      for (let j = 0; j < 7; j++) {
        const dateToAdd = new CalendarDate(iterationDate);
        dateToAdd.i = i;
        dateToAdd.j = j;
        if (dateToAdd.getMonth() > this.selectedViewRange.month) {
          dateToAdd.nextOtherMonth = true;
        }
        if (dateToAdd.getMonth() < this.selectedViewRange.month) {
          dateToAdd.prevOtherMonth = true;
        }
        if (dateToAdd.equals(this.selectedDate)) {
          dateToAdd.selected = true;
          this.selectedDate = dateToAdd.copy();
        }
        if (dateToAdd.equals(new Date())) {
          dateToAdd.today = true;
        }
        if(this.events().find(event=>dateToAdd.equals(event.date)) !== undefined){
          dateToAdd.evented = true;
        }
        week.push(dateToAdd);
        iterationDate.setDate(iterationDate.getDate() + 1);
      }
      this.calendarDays.push(week);
    }
  }

  private automaticUpdateSelectedDate(){
    this.selectedDate.setMonth(this.selectedViewRange.month);
    this.selectedDate.setFullYear(this.selectedViewRange.year);
    if(this.selectedDate.getMonth() != this.selectedViewRange.month){
      //Month overfolwed 
      this.selectedDate.setMonth(this.selectedViewRange.month + 1);
      this.selectedDate.setDate(1);
      this.selectedDate.setDate(this.selectedDate.getDate() - 1);
    }
    this.dateChosen();
  }

  private switchedMonthActions(){
    this.automaticUpdateSelectedDate();
    this.calculateCalendarDays();
    this.calculateEvents();
  }

  private calculateEvents() {
    this.eventsOfSelectedDate = [];
    for(const event of this.events()){
      if(this.selectedDate.equals(event.date) && event.date.getMonth() === this.selectedViewRange.month){
        this.eventsOfSelectedDate.push(event);
      }
    }
  }

  private registerListener(){
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (!this.focused) return;

      if (e.code === 'ArrowUp') {
        if (this.selectedDate.i === 0){
          this.prevMonth();
          this.selectedDate = this.calendarDays[this.calendarDays.length - 1][this.selectedDate.j].copy();
        }else{
          this.selectedDate = this.calendarDays[this.selectedDate.i - 1][this.selectedDate.j].copy();
        }
      }
      if (e.code === 'ArrowDown') {
        if (this.selectedDate.i === this.calendarDays.length - 1){
          this.nextMonth();
          this.selectedDate = this.calendarDays[0][this.selectedDate.j].copy();
        }else{
          this.selectedDate = this.calendarDays[this.selectedDate.i + 1][this.selectedDate.j].copy();
        }
      }
      if (e.code === 'ArrowLeft') {
        if (this.selectedDate.j === 0 && this.selectedDate.i >= 1){
          this.selectedDate = 
          this.calendarDays[this.selectedDate.i - 1][this.calendarDays[this.selectedDate.i - 1].length-1].copy();
        }else{
          this.selectedDate = this.calendarDays[this.selectedDate.i][this.selectedDate.j - 1].copy();
        }
      }
      if (e.code === 'ArrowRight') {
        if (this.selectedDate.j === this.calendarDays[0].length - 1 && this.selectedDate.i <= this.calendarDays.length - 2){
          this.selectedDate = this.calendarDays[this.selectedDate.i + 1][0].copy();
        }else{
          this.selectedDate = this.calendarDays[this.selectedDate.i][this.selectedDate.j + 1].copy();
        }
      }
      if (
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)
      ) {
        //common actions
        e.preventDefault();
        if(this.selectedDate.nextOtherMonth){
          this.nextMonth();
        }
        if(this.selectedDate.prevOtherMonth){
          this.prevMonth();
        }
        this.dateChosen();
        this.calculateCalendarDays();
        this.selectedDate.focus();
      }
    });
  }
}
