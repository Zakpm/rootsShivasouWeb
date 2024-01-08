import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPageCount: number= 1;
  @Output() pageChange = new EventEmitter<number>();

  getDisplayedPages(): number[] {
    let pages = [this.currentPage];
    if (this.currentPage > 1) {
      pages.unshift(this.currentPage - 1);
    }
    if (this.currentPage < this.totalPageCount) {
      pages.push(this.currentPage + 1);
    }
    return pages;
  }

  onPageChange(newPage: number, event: Event): void {
    event.preventDefault();
    if (newPage >= 1 && newPage <= this.totalPageCount) {
      this.pageChange.emit(newPage);
    }
  }
}
