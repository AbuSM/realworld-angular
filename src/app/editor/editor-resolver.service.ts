import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {ArticlesService} from "../services";

@Injectable()
export class EditorResolverService implements Resolve<any>{
    constructor(private articlesService: ArticlesService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.articlesService.get(route.params['slug']);
    }
}
