import {
    Component,
    Input,
    Output,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    EventEmitter,
    OnChanges,
} from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.less'],
})
export class ModalComponent implements OnChanges {
    @Input() loading: boolean = false;
    @Input() show: boolean = false;
    @Output() confirm: EventEmitter<any> = new EventEmitter();
    @Output() destroy: EventEmitter<any> = new EventEmitter();

    @ViewChild('modal_container') modalContainer: TemplateRef<any>;
    @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;
    backdrop: any;

    constructor() {}

    onHandleConfirm() {
        this.confirm.emit();
        this.closeModal();
    }

    closeModal() {
        if (this.vc) {
            this.vc.clear();
        }
        if (this.backdrop) {
            document.body.removeChild(this.backdrop);
        }
        this.destroy.emit();
    }

    ngOnChanges() {
        if (this.show) {
            let view = this.modalContainer.createEmbeddedView(null);
            this.vc.insert(view);
            this.modalContainer.elementRef.nativeElement.previousElementSibling.classList.remove(
                'fade'
            );
            this.modalContainer.elementRef.nativeElement.previousElementSibling.classList.add(
                'modal-open'
            );
            this.modalContainer.elementRef.nativeElement.previousElementSibling.style.display =
                'block';
            this.backdrop = document.createElement('DIV');
            this.backdrop.className = 'modal-backdrop';
            document.body.appendChild(this.backdrop);
        }
    }
}
