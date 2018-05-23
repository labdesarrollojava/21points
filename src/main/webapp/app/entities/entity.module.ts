import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TwentyOnePointsBloodPressureModule } from './blood-pressure/blood-pressure.module';
import { TwentyOnePointsPointsModule } from './points/points.module';
import { TwentyOnePointsPreferencesModule } from './preferences/preferences.module';
import { TwentyOnePointsWeightModule } from './weight/weight.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        TwentyOnePointsBloodPressureModule,
        TwentyOnePointsPointsModule,
        TwentyOnePointsPreferencesModule,
        TwentyOnePointsWeightModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TwentyOnePointsEntityModule {}
