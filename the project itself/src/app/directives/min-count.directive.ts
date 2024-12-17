import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[appMinCount]',
    standalone: true,
    providers: [
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: MinCountDirective
        }
    ]
})

export class MinCountDirective implements Validator {
    @Input() appMinCount: number | undefined;

    validate(control: AbstractControl): ValidationErrors | null {
        const len = control.value?.length || 0;

        if (!this.appMinCount || len < this.appMinCount) {
            return { appMinCount: this.appMinCount };
        }

        return null;
    }
}