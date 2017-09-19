/**
 * Toolbar component
 * 
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { IconButton } from './icon-button';

@Component({
  selector: 'lf-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent extends AuthComponent {
        
  @Input('title')
  public title: string;
    
  @Input('navButton')
  public navButton: IconButton;
    
  @Input('actionButtons')
  public actionButtons: IconButton[];

  /**
   * Constructor
   *
   * @param _authService Authentication Service
   * @param _titleService Service to change title in the header
   * @param _router Routing service
   */
   constructor(protected _authService: AuthService,  private _titleService: Title, private _router: Router) {
     super(_authService);
     
   }
    
  /**
   * Initialization
   * Set the title in the header
   */
  public ngOnInit(): void {
    super.ngOnInit();
    this._titleService.setTitle('Ludovic FRIN - ' + this.title);
  } 
  
  /**
   * Do an action on a button
   * 
   * @param button Action button
   */
  public doAction(button: IconButton): void {
    switch (button.action) {
      case "function" :
        button.component[button.target]();
        break;        
      case "link" :
        this._router.navigate([ button.target ]);
        break;        
      case "open" :
        button.target.open();
        break;
            
    }
  }
}
