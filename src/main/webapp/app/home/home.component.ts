import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs/Subscription';

import { Account, LoginModalService, Principal } from '../shared';
import { PointsService } from '../entities/points';
import { PreferencesService, Preferences } from '../entities/preferences';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit, OnDestroy {
    account: Account;
    modalRef: NgbModalRef;
    eventSubscriber: Subscription;
    pointsThisWeek: any = {};
    pointsPercentage: number;

    preferences: Preferences;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private preferencesService: PreferencesService,
        private pointsService: PointsService) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
                this.getUserData();
            });
        });
        this.eventSubscriber = this.eventManager
            .subscribe('pointsListModification', () => this.getUserData());
        this.eventSubscriber = this.eventManager
            .subscribe('bloodPressureListModification', () => this.getUserData());
        this.eventSubscriber = this.eventManager
            .subscribe('weightListModification', () => this.getUserData());
        this.eventSubscriber = this.eventManager
            .subscribe('preferencesListModification', () => this.getUserData());
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    getUserData() {
        // Get points for the current week
        this.pointsService.thisWeek().subscribe((points: any) => {
            points = points.json;
            this.pointsThisWeek = points;
            this.pointsPercentage = (points.points / 21) * 100;
        });

        this.preferencesService.user().subscribe((preferences) => {
            this.preferences = preferences;
            // Get points for the current week
            this.pointsService.thisWeek().subscribe((points: any) => {
                points = points.json;
                this.pointsThisWeek = points;
                this.pointsPercentage =
                    (points.points / this.preferences.weeklyGoals) * 100;
                // calculate success, warning, or danger
                if (points.points >= preferences.weeklyGoal) {
                    this.pointsThisWeek.progress = 'success';
                } else if (points.points < 10) {
                    this.pointsThisWeek.progress = 'danger';
                } else if (points.points > 10 &&
                    points.points < this.preferences.weeklyGoals) {
                    this.pointsThisWeek.progress = 'warning';
                }
            });

        });
    }
}
