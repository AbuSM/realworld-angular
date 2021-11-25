import {
    Component,
    AfterContentInit,
    ContentChildren,
    QueryList,
} from '@angular/core';
import { TabModel } from '../../models/tab.model';
import { TabComponent } from './tab/tab.component';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
})
export class TabsComponent implements AfterContentInit {
    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
    activeTab: string | number = 1;

    constructor() {}

    selectTab(tab: TabModel) {
        this.tabs.toArray().forEach((tab) => (tab.active = false));
        tab.active = true;
    }

    ngAfterContentInit() {
        let activeTabs = this.tabs.filter((tab) => tab.active);

        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }
}
