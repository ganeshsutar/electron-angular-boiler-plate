import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

declare var fs;
declare var path;
declare var __dirname;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public themeClass = 'dark-theme';
  public sidenav = false;
  public package = {};

  constructor(private overlayContainer: OverlayContainer) { }

  ngOnInit() {
    this.setTheme(this.themeClass);
    // this.package = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')));
    this.package = {
      title: 'Electron Boiler Plate',
      version: '0.0.0'
    };
  }

  setTheme(theme) {
    const classes = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(classes).filter((item: string) => item.includes('-theme'));
    if(themeClassesToRemove.length) {
      classes.remove(...themeClassesToRemove);
    }
    classes.remove('app');
    classes.add(theme);
    classes.add('app');
    this.themeClass = theme;
  }

  toggleSidenav() {
    this.sidenav = (!this.sidenav);
  }
}
