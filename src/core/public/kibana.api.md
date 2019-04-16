## API Review File for "kibana"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import * as CSS from 'csstype';
import { default } from 'react';
import { Observable } from 'rxjs';
import * as PropTypes from 'prop-types';
import * as Rx from 'rxjs';
import { Toast } from '@elastic/eui';

// Warning: (ae-forgotten-export) The symbol "BasePathService" needs to be exported by the entry point index.d.ts
// 
// @public (undocumented)
export type BasePathSetup = ReturnType<BasePathService['setup']>;

// @public
export interface Capabilities {
    [key: string]: Record<string, boolean | Record<string, boolean>>;
    catalogue: Record<string, boolean>;
    management: {
        [sectionId: string]: Record<string, boolean>;
    };
    navLinks: Record<string, boolean>;
}

// @public
export interface CapabilitiesSetup {
    getCapabilities: () => Capabilities;
}

// @public (undocumented)
export interface ChromeBrand {
    // (undocumented)
    logo?: string;
    // (undocumented)
    smallLogo?: string;
}

// @public (undocumented)
export interface ChromeBreadcrumb {
    // (undocumented)
    'data-test-subj'?: string;
    // (undocumented)
    href?: string;
    // (undocumented)
    text: string;
}

// @public (undocumented)
export type ChromeHelpExtension = (element: HTMLDivElement) => (() => void);

// Warning: (ae-forgotten-export) The symbol "ChromeService" needs to be exported by the entry point index.d.ts
// 
// @public (undocumented)
export type ChromeSetup = ReturnType<ChromeService['setup']>;

// Warning: (ae-internal-missing-underscore) The name CoreContext should be prefixed with an underscore because the declaration is marked as "@internal"
// 
// @internal (undocumented)
export interface CoreContext {
}

// @public
export interface CoreSetup {
    // (undocumented)
    basePath: BasePathSetup;
    // (undocumented)
    capabilities: CapabilitiesSetup;
    // (undocumented)
    chrome: ChromeSetup;
    // (undocumented)
    fatalErrors: FatalErrorsSetup;
    // (undocumented)
    http: HttpSetup;
    // (undocumented)
    i18n: I18nSetup;
    // (undocumented)
    injectedMetadata: InjectedMetadataSetup;
    // (undocumented)
    notifications: NotificationsSetup;
    // (undocumented)
    overlays: OverlaySetup;
    // (undocumented)
    uiSettings: UiSettingsSetup;
}

// Warning: (ae-internal-missing-underscore) The name CoreSystem should be prefixed with an underscore because the declaration is marked as "@internal"
// 
// @internal
export class CoreSystem {
    // Warning: (ae-forgotten-export) The symbol "Params" needs to be exported by the entry point index.d.ts
    // 
    // (undocumented)
    constructor(params: Params);
    // (undocumented)
    setup(): Promise<{
        fatalErrors: {
            add: (error: string | Error, source?: string | undefined) => never;
            get$: () => import("rxjs").Observable<{
                message: string;
                stack: string | undefined;
            }>;
        };
    } | undefined>;
    // (undocumented)
    stop(): void;
    }

// Warning: (ae-forgotten-export) The symbol "FatalErrorsService" needs to be exported by the entry point index.d.ts
// 
// @public (undocumented)
export type FatalErrorsSetup = ReturnType<FatalErrorsService['setup']>;

// @public
export class FlyoutRef {
    // (undocumented)
    constructor();
    close(): Promise<void>;
    readonly onClose: Promise<void>;
}

// Warning: (ae-forgotten-export) The symbol "HttpService" needs to be exported by the entry point index.d.ts
// 
// @public (undocumented)
export type HttpSetup = ReturnType<HttpService['setup']>;

// Warning: (ae-forgotten-export) The symbol "I18nService" needs to be exported by the entry point index.d.ts
// 
// @public (undocumented)
export type I18nSetup = ReturnType<I18nService['setup']>;

// Warning: (ae-internal-missing-underscore) The name InjectedMetadataParams should be prefixed with an underscore because the declaration is marked as "@internal"
// 
// @internal (undocumented)
export interface InjectedMetadataParams {
    // (undocumented)
    injectedMetadata: {
        version: string;
        buildNumber: number;
        basePath: string;
        csp: {
            warnLegacyBrowsers: boolean;
        };
        vars: {
            [key: string]: unknown;
        };
        uiPlugins: Array<{
            id: PluginName;
            plugin: DiscoveredPlugin;
        }>;
        legacyMetadata: {
            app: unknown;
            translations: unknown;
            bundleId: string;
            nav: unknown;
            version: string;
            branch: string;
            buildNum: number;
            buildSha: string;
            basePath: string;
            serverName: string;
            devMode: boolean;
            uiSettings: {
                defaults: UiSettingsState;
                user?: UiSettingsState;
            };
        };
    };
}

// Warning: (ae-forgotten-export) The symbol "InjectedMetadataService" needs to be exported by the entry point index.d.ts
// 
// @public (undocumented)
export type InjectedMetadataSetup = ReturnType<InjectedMetadataService['setup']>;

// Warning: (ae-forgotten-export) The symbol "NotificationsService" needs to be exported by the entry point index.d.ts
// 
// @public (undocumented)
export type NotificationsSetup = ReturnType<NotificationsService['setup']>;

// @public (undocumented)
export interface OverlaySetup {
    // Warning: (ae-forgotten-export) The symbol "React" needs to be exported by the entry point index.d.ts
    // 
    // (undocumented)
    openFlyout: (flyoutChildren: React.ReactNode, flyoutProps?: {
        closeButtonAriaLabel?: string;
        'data-test-subj'?: string;
    }) => FlyoutRef;
}

// @public
export interface Plugin<TSetup, TPluginsSetup extends Record<string, unknown> = {}> {
    // (undocumented)
    setup: (core: PluginSetupContext, plugins: TPluginsSetup) => TSetup | Promise<TSetup>;
    // (undocumented)
    stop?: () => void;
}

// @public
export type PluginInitializer<TSetup, TPluginsSetup extends Record<string, unknown> = {}> = (core: PluginInitializerContext) => Plugin<TSetup, TPluginsSetup>;

// @public
export interface PluginInitializerContext {
}

// @public
export interface PluginSetupContext {
    // (undocumented)
    basePath: BasePathSetup;
    // (undocumented)
    chrome: ChromeSetup;
    // (undocumented)
    fatalErrors: FatalErrorsSetup;
    // (undocumented)
    i18n: I18nSetup;
    // (undocumented)
    notifications: NotificationsSetup;
    // (undocumented)
    uiSettings: UiSettingsSetup;
}

export { Toast }

// @public (undocumented)
export type ToastInput = string | Pick<Toast, Exclude<keyof Toast, 'id'>>;

// @public (undocumented)
export class ToastsSetup {
    // (undocumented)
    add(toastOrTitle: ToastInput): Toast;
    // (undocumented)
    addDanger(toastOrTitle: ToastInput): Toast;
    // (undocumented)
    addSuccess(toastOrTitle: ToastInput): Toast;
    // (undocumented)
    addWarning(toastOrTitle: ToastInput): Toast;
    // (undocumented)
    get$(): Rx.Observable<Toast[]>;
    // (undocumented)
    remove(toast: Toast): void;
    }

// @public (undocumented)
export class UiSettingsClient {
    // (undocumented)
    constructor(params: UiSettingsClientParams);
    get$(key: string, defaultOverride?: any): Rx.Observable<any>;
    get(key: string, defaultOverride?: any): any;
    getAll(): UiSettingsState;
    getSaved$(): Rx.Observable<{
        key: string;
        newValue: any;
        oldValue: any;
    }>;
    getUpdate$(): Rx.Observable<{
        key: string;
        newValue: any;
        oldValue: any;
    }>;
    isCustom(key: string): boolean;
    isDeclared(key: string): boolean;
    isDefault(key: string): boolean;
    isOverridden(key: string): boolean;
    overrideLocalDefault(key: string, newDefault: any): void;
    // Warning: (ae-forgotten-export) The symbol "UiSettingsClientParams" needs to be exported by the entry point index.d.ts
    // 
    // (undocumented)
    readonly params: UiSettingsClientParams;
    remove(key: string): Promise<boolean>;
    set(key: string, val: any): Promise<boolean>;
    stop(): void;
    }

// @public (undocumented)
export type UiSettingsSetup = UiSettingsClient;

// @public (undocumented)
export interface UiSettingsState {
    // Warning: (ae-forgotten-export) The symbol "InjectedUiSettingsDefault" needs to be exported by the entry point index.d.ts
    // Warning: (ae-forgotten-export) The symbol "InjectedUiSettingsUser" needs to be exported by the entry point index.d.ts
    // 
    // (undocumented)
    [key: string]: InjectedUiSettingsDefault & InjectedUiSettingsUser;
}


// Warnings were encountered during analysis:
// 
// src/core/public/injected_metadata/injected_metadata_service.ts:38:9 - (ae-forgotten-export) The symbol "PluginName" needs to be exported by the entry point index.d.ts
// src/core/public/injected_metadata/injected_metadata_service.ts:39:9 - (ae-forgotten-export) The symbol "DiscoveredPlugin" needs to be exported by the entry point index.d.ts

// (No @packageDocumentation comment for this package)

```