import {
  Directive,
  ElementRef,
  Inject,
  Input,
  Renderer2,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[iOPAutoFragment]',
  standalone: true,
})
export class AutoFragmentDirective implements OnInit, OnDestroy {
  @Input() iOPAutoFragment!: string;

  private static currentFragment: string = '';
  private static observedElements = new Set<HTMLElement>();
  private static observer: IntersectionObserver | null = null;

  constructor(
    @Inject(ElementRef) private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    AutoFragmentDirective.observedElements.add(this.el.nativeElement);

    if (!AutoFragmentDirective.observer) {
      AutoFragmentDirective.observer = new IntersectionObserver(
        (entries) => {
          // Find the most visible intersecting element above threshold
          let maxEntry: IntersectionObserverEntry | null = null;
          for (const entry of entries) {
            if (entry.isIntersecting) {
              if (
                !maxEntry ||
                entry.intersectionRatio > (maxEntry.intersectionRatio || 0)
              ) {
                maxEntry = entry;
              }
            }
          }

          if (maxEntry) {
            const fragment = maxEntry.target.getAttribute('iOPAutoFragment');
            if (
              fragment &&
              AutoFragmentDirective.currentFragment !== fragment
            ) {
              AutoFragmentDirective.currentFragment = fragment;

              // Update URL fragment without router navigation
              const baseUrl =
                window.location.origin +
                window.location.pathname +
                window.location.search;

              history.replaceState(null, '', `${baseUrl}#${fragment}`);
            }
          }
        },
        { threshold: 0.6 }
      );
    }

    AutoFragmentDirective.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (AutoFragmentDirective.observer) {
      AutoFragmentDirective.observer.unobserve(this.el.nativeElement);
    }
    AutoFragmentDirective.observedElements.delete(this.el.nativeElement);
  }
}
