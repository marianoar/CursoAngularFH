import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'canFly'
})
export class CanFlyPipe implements PipeTransform {

    transform(value: boolean | undefined): string {
        // console.log({args});
        switch (value) {
            case true:
                return 'vuela';
            case false:
                return 'no vuela';
            case undefined:
                return 'casi vuela';
            default:
                return '';
        }
    }
}