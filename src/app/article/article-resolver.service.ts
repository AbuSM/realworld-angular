import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ArticlesService} from "../services";

@Injectable()
export class ArticleResolverService {
    constructor(
        private router: Router,
        private articlesService: ArticlesService
    ) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.articlesService.get(route.params['slug'])
    }

}
