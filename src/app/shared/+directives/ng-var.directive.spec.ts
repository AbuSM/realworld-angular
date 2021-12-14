import {TemplateRef, ViewContainerRef, Component} from '@angular/core';
import {NgVarDirective} from './ng-var.directive';
import {Observable, of} from "rxjs";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {SharedModule} from "../shared.module";


const text = 'Angular the best';

@Component({
    template: `
        <div *ngVar="test$ | async as testVariable">
            <span>{{testVariable}}</span>
        </div>
    `
})
class WrapperComponent {
    test$: Observable<string> = of(text)
    constructor() {}
}

describe('NgVarDirective', () => {
    let fixture: ComponentFixture<WrapperComponent>;
    let component: WrapperComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [WrapperComponent],
            imports: [SharedModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create an instance', () => {
        let templateRef: TemplateRef<any> = null;
        let vcRef: ViewContainerRef = null;

        const directive = new NgVarDirective(templateRef, vcRef);
        expect(directive).toBeTruthy();
    });

    it('check context of ngVar', (done: DoneFn) => {
        component.test$.subscribe({
            next: value => {
                expect(value).toEqual(text)
                const span = fixture.debugElement.query(By.css('span')).nativeElement;
                expect(span.innerText.trim()).toBe(text);
                done();
            },
            error: err => done.fail(err),
        })
    })
});
