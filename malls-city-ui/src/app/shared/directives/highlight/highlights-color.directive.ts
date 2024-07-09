import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,Input,
  HostListener,
  HostBinding,
} from '@angular/core';

@Directive({
  selector: '[appHighlightsColor]',
})
export class HighlightsColorDirective {
  @Input('highlightsColor') highlightColor: string = '';
  @HostBinding('style.color') color = this.highlightColor;

  constructor() {}

  ngOnInit() {
    this.color = this.highlightColor;
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.color = 'yellow';
}

@HostListener('mouseleave') onMouseLeave() {
    this.color = this.highlightColor;
}
}
