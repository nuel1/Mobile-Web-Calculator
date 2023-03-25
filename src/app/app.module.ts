import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './component/calculator/calculator.component';
import { CalculatorScreenComponent } from './component/calculator-screen/calculator-screen.component';
import { ButtonComponent } from './component/button/button.component';
import { HistoryComponent } from './component/history/history.component';
import { LaunchScreenComponent } from './component/launch-screen/launch-screen.component';
import { CalculatorHeaderComponent } from './component/calculator-header/calculator-header.component';
import { CalculatorButtonsComponent } from './component/calculator-buttons/calculator-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    CalculatorScreenComponent,
    ButtonComponent,
    HistoryComponent,
    LaunchScreenComponent,
    CalculatorHeaderComponent,
    CalculatorButtonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
