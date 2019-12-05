'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">mad-pay724-admin documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AccountantModule.html" data-type="entity-link">AccountantModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AccountantModule-4d9f15cdba1543790be4151abb641977"' : 'data-target="#xs-components-links-module-AccountantModule-4d9f15cdba1543790be4151abb641977"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AccountantModule-4d9f15cdba1543790be4151abb641977"' :
                                            'id="xs-components-links-module-AccountantModule-4d9f15cdba1543790be4151abb641977"' }>
                                            <li class="link">
                                                <a href="components/AccountantComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AccountantComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link">AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminModule-dcd86764416db0bbfbc50dd64102a8e7"' : 'data-target="#xs-components-links-module-AdminModule-dcd86764416db0bbfbc50dd64102a8e7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-dcd86764416db0bbfbc50dd64102a8e7"' :
                                            'id="xs-components-links-module-AdminModule-dcd86764416db0bbfbc50dd64102a8e7"' }>
                                            <li class="link">
                                                <a href="components/AdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersManagementComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UsersManagementComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link">AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-37a4f3130e4f846e649dee799e37f70c"' : 'data-target="#xs-components-links-module-AppModule-37a4f3130e4f846e649dee799e37f70c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-37a4f3130e4f846e649dee799e37f70c"' :
                                            'id="xs-components-links-module-AppModule-37a4f3130e4f846e649dee799e37f70c"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-37a4f3130e4f846e649dee799e37f70c"' : 'data-target="#xs-injectables-links-module-AppModule-37a4f3130e4f846e649dee799e37f70c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-37a4f3130e4f846e649dee799e37f70c"' :
                                        'id="xs-injectables-links-module-AppModule-37a4f3130e4f846e649dee799e37f70c"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TitleService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TitleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-ed9c40fed40a722ebbf30f570e3c2df6"' : 'data-target="#xs-components-links-module-AuthModule-ed9c40fed40a722ebbf30f570e3c2df6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-ed9c40fed40a722ebbf30f570e3c2df6"' :
                                            'id="xs-components-links-module-AuthModule-ed9c40fed40a722ebbf30f570e3c2df6"' }>
                                            <li class="link">
                                                <a href="components/AuthComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AuthComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link">AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BlogMaterialModule.html" data-type="entity-link">BlogMaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BlogModule.html" data-type="entity-link">BlogModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BlogModule-fef9da9f68a687449f12a116befc9494"' : 'data-target="#xs-components-links-module-BlogModule-fef9da9f68a687449f12a116befc9494"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BlogModule-fef9da9f68a687449f12a116befc9494"' :
                                            'id="xs-components-links-module-BlogModule-fef9da9f68a687449f12a116befc9494"' }>
                                            <li class="link">
                                                <a href="components/BlogAddComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BlogAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BlogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BlogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BlogDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BlogDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BlogEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BlogEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BlogGroupAddComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BlogGroupAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BlogGroupEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BlogGroupEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BlogGroupListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BlogGroupListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BlogGroupManageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BlogGroupManageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BlogListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BlogListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BlogManageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BlogManageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-BlogModule-fef9da9f68a687449f12a116befc9494"' : 'data-target="#xs-injectables-links-module-BlogModule-fef9da9f68a687449f12a116befc9494"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BlogModule-fef9da9f68a687449f12a116befc9494"' :
                                        'id="xs-injectables-links-module-BlogModule-fef9da9f68a687449f12a116befc9494"' }>
                                        <li class="link">
                                            <a href="injectables/BlogGroupService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>BlogGroupService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/BlogRoutingModule.html" data-type="entity-link">BlogRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HasRoleModule.html" data-type="entity-link">HasRoleModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-HasRoleModule-d9e9cce6960badef345bef2a0ffb82b4"' : 'data-target="#xs-directives-links-module-HasRoleModule-d9e9cce6960badef345bef2a0ffb82b4"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-HasRoleModule-d9e9cce6960badef345bef2a0ffb82b4"' :
                                        'id="xs-directives-links-module-HasRoleModule-d9e9cce6960badef345bef2a0ffb82b4"' }>
                                        <li class="link">
                                            <a href="directives/HasRoleDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">HasRoleDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PanelModule.html" data-type="entity-link">PanelModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PanelModule-c4a9bd7d0c9b5982941997e11c5501f8"' : 'data-target="#xs-components-links-module-PanelModule-c4a9bd7d0c9b5982941997e11c5501f8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PanelModule-c4a9bd7d0c9b5982941997e11c5501f8"' :
                                            'id="xs-components-links-module-PanelModule-c4a9bd7d0c9b5982941997e11c5501f8"' }>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PanelComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PanelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PanelRoutingModule.html" data-type="entity-link">PanelRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PersianDateModule.html" data-type="entity-link">PersianDateModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PersianDateModule-1cf51be6777706c490d0fa71e3772f9c"' : 'data-target="#xs-injectables-links-module-PersianDateModule-1cf51be6777706c490d0fa71e3772f9c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PersianDateModule-1cf51be6777706c490d0fa71e3772f9c"' :
                                        'id="xs-injectables-links-module-PersianDateModule-1cf51be6777706c490d0fa71e3772f9c"' }>
                                        <li class="link">
                                            <a href="injectables/PersianCalendarService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PersianCalendarService</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-PersianDateModule-1cf51be6777706c490d0fa71e3772f9c"' : 'data-target="#xs-pipes-links-module-PersianDateModule-1cf51be6777706c490d0fa71e3772f9c"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-PersianDateModule-1cf51be6777706c490d0fa71e3772f9c"' :
                                            'id="xs-pipes-links-module-PersianDateModule-1cf51be6777706c490d0fa71e3772f9c"' }>
                                            <li class="link">
                                                <a href="pipes/PersianDate.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PersianDate</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedCkEditorModule.html" data-type="entity-link">SharedCkEditorModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedEJTextEditorModule.html" data-type="entity-link">SharedEJTextEditorModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedTagInputModule.html" data-type="entity-link">SharedTagInputModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserMaterialModule.html" data-type="entity-link">UserMaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UserModule-1cf9a2f4d2ea4a49661ccd42d9ab31e1"' : 'data-target="#xs-components-links-module-UserModule-1cf9a2f4d2ea4a49661ccd42d9ab31e1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserModule-1cf9a2f4d2ea4a49661ccd42d9ab31e1"' :
                                            'id="xs-components-links-module-UserModule-1cf9a2f4d2ea4a49661ccd42d9ab31e1"' }>
                                            <li class="link">
                                                <a href="components/BankCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BankCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChatMessageTicketComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChatMessageTicketComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChatTicketComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChatTicketComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateFormTicketComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateFormTicketComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DetailTicketComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetailTicketComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DocumentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DocumentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DocumentListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DocumentListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EasypayAddComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EasypayAddComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EasypayEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EasypayEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EasypayListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EasypayListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EasypayManageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EasypayManageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditBankCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditBankCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GateActiveComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GateActiveComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GateEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GateEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GateFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GateFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GateManageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GateManageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LeftDocumentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LeftDocumentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListTicketComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListTicketComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageBankCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageBankCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageTicketComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageTicketComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageWalletComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageWalletComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotificationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NotificationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RightDocumentComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RightDocumentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TicketComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TicketComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserChangePassComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserChangePassComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserChangePicComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserChangePicComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserDashboardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WalletComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WalletComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WalletFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WalletFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-1cf9a2f4d2ea4a49661ccd42d9ab31e1"' : 'data-target="#xs-injectables-links-module-UserModule-1cf9a2f4d2ea4a49661ccd42d9ab31e1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-1cf9a2f4d2ea4a49661ccd42d9ab31e1"' :
                                        'id="xs-injectables-links-module-UserModule-1cf9a2f4d2ea4a49661ccd42d9ab31e1"' }>
                                        <li class="link">
                                            <a href="injectables/BankCardsService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>BankCardsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/DocumentService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>DocumentService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/EasyPayService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>EasyPayService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GatesService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>GatesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NotificationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>NotificationService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/WalletService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>WalletService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserRoutingModule.html" data-type="entity-link">UserRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/NotyfToast.html" data-type="entity-link">NotyfToast</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/BlogDataSource.html" data-type="entity-link">BlogDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/CustomRouteSerializer.html" data-type="entity-link">CustomRouteSerializer</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditDecodedToken.html" data-type="entity-link">EditDecodedToken</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditLoggedUser.html" data-type="entity-link">EditLoggedUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditLoggedUserName.html" data-type="entity-link">EditLoggedUserName</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditLoggedUserPhotoUrl.html" data-type="entity-link">EditLoggedUserPhotoUrl</a>
                            </li>
                            <li class="link">
                                <a href="classes/FaMatPaginatorIntl.html" data-type="entity-link">FaMatPaginatorIntl</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadLoggedUser.html" data-type="entity-link">LoadLoggedUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadLoggedUserFail.html" data-type="entity-link">LoadLoggedUserFail</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoadLoggedUserSuccess.html" data-type="entity-link">LoadLoggedUserSuccess</a>
                            </li>
                            <li class="link">
                                <a href="classes/MaterialPersianDateAdapter.html" data-type="entity-link">MaterialPersianDateAdapter</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationResult.html" data-type="entity-link">PaginationResult</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetDecodedToken.html" data-type="entity-link">ResetDecodedToken</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetLoggedUser.html" data-type="entity-link">ResetLoggedUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateInfoLoggedUserName.html" data-type="entity-link">UpdateInfoLoggedUserName</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BankCardsService.html" data-type="entity-link">BankCardsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BlogGroupService.html" data-type="entity-link">BlogGroupService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BlogService.html" data-type="entity-link">BlogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DocumentService.html" data-type="entity-link">DocumentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EasyPayService.html" data-type="entity-link">EasyPayService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GatesService.html" data-type="entity-link">GatesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggedUserEffects.html" data-type="entity-link">LoggedUserEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationService.html" data-type="entity-link">NotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PersianCalendarService.html" data-type="entity-link">PersianCalendarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PersianDate.html" data-type="entity-link">PersianDate</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TicketService.html" data-type="entity-link">TicketService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TitleService.html" data-type="entity-link">TitleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WalletService.html" data-type="entity-link">WalletService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/ErrorInterceptor.html" data-type="entity-link">ErrorInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/BankCardResolver.html" data-type="entity-link">BankCardResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/BlogGroupEditResolver.html" data-type="entity-link">BlogGroupEditResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/BlogGroupResolver.html" data-type="entity-link">BlogGroupResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/BlogResolver.html" data-type="entity-link">BlogResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/DocumentResolver.html" data-type="entity-link">DocumentResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/EasyPayEditResolver.html" data-type="entity-link">EasyPayEditResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/GateEditResolver.html" data-type="entity-link">GateEditResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/GateResolver.html" data-type="entity-link">GateResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/LoginRedirectGuard.html" data-type="entity-link">LoginRedirectGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/NotificationResolver.html" data-type="entity-link">NotificationResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/PreventUnsavedGuard.html" data-type="entity-link">PreventUnsavedGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/TicketOverviewResolver.html" data-type="entity-link">TicketOverviewResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/TicketResolver.html" data-type="entity-link">TicketResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/UserProfileResolver.html" data-type="entity-link">UserProfileResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/WalletResolver.html" data-type="entity-link">WalletResolver</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AuthTokenState.html" data-type="entity-link">AuthTokenState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BankCard.html" data-type="entity-link">BankCard</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Blog.html" data-type="entity-link">Blog</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BlogBlogGroups.html" data-type="entity-link">BlogBlogGroups</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BlogGroup.html" data-type="entity-link">BlogGroup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DecodedToken.html" data-type="entity-link">DecodedToken</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Document.html" data-type="entity-link">Document</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EasyPay.html" data-type="entity-link">EasyPay</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EasyPayGatesWallets.html" data-type="entity-link">EasyPayGatesWallets</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterSortOrderBy.html" data-type="entity-link">FilterSortOrderBy</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Gate.html" data-type="entity-link">Gate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GateActiveDirect.html" data-type="entity-link">GateActiveDirect</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GatesWallets.html" data-type="entity-link">GatesWallets</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GateWallets.html" data-type="entity-link">GateWallets</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NavBarInfo.html" data-type="entity-link">NavBarInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Notify.html" data-type="entity-link">Notify</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Pagination.html" data-type="entity-link">Pagination</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Photo.html" data-type="entity-link">Photo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RouterStateUrl.html" data-type="entity-link">RouterStateUrl</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/State.html" data-type="entity-link">State</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Ticket.html" data-type="entity-link">Ticket</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TicketContent.html" data-type="entity-link">TicketContent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Wallet.html" data-type="entity-link">Wallet</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});