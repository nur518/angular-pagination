import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() totalPage = 0;
  @Input() currentPage = 1;
  @Output() pageNoEvent = new EventEmitter();

  DOTS = '...';

  constructor() { }

  ngOnInit(): void {
  }

  range(start:number, end:number) {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };


  pagination(totalPageCount:number, currentPage:number){
    const siblingCount = 1;
    // Pages count is determined as: siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return this.range(1, totalPageCount);      
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount,totalPageCount);

    /*
      We do not want to show dots if there is only one position left 
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = this.range(1, leftItemCount);

      return [...leftRange, this.DOTS, totalPageCount];      
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = this.range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, this.DOTS, ...rightRange];      
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = this.range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, this.DOTS, ...middleRange, this.DOTS, lastPageIndex];
    }

    return []
  }

  paginateHandler(pageNo:number):void {
    this.pageNoEvent.emit(pageNo);
  }
}
