import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'alive'
})

export class AlivePipe implements PipeTransform {

    transform(status: boolean) {
        return status ? 'Tot' : 'Lebendig'
    }
}