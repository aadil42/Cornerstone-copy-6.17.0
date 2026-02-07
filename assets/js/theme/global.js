import 'focus-within-polyfill';

import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import carousel from './common/carousel';
import svgInjector from './global/svg-injector';

// these are react components to inject.
import React from "react"; // this is needed here as import even though we're not using it.
import { createRoot } from "react-dom/client";
import TestingReactComponent from "../components/TestingReactComponent";
import CustomUserModal from "../components/customUserModal";
export default class Global extends PageManager {
    onReady() {
        const { cartId, 
            secureBaseUrl, 
            categories, 
            custom_categories_navigation,
            settings,
            theme_settings,
            urls  } = this.context;

        cartPreview(secureBaseUrl, cartId);
        quickSearch();
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel(this.context);
        menu();
        mobileMenuToggle();
        svgInjector();

        this.initReactMobileMenu({categories, custom_categories_navigation});
        this.initUserModal({settings, theme_settings, urls});
    }

    initReactMobileMenu({categories, custom_categories_navigation}) {

        const testingReactComponentContainer = document.querySelector("#custom-modal-id");
        if (testingReactComponentContainer) {
            const root = createRoot(testingReactComponentContainer);
            root.render(
            <TestingReactComponent 
            categories={categories} 
            custom_categories_navigation={custom_categories_navigation}
            menuTitle="Menu"
            />);
        }
    }

    initUserModal({settings, theme_settings, urls}) {
        const userName = "Test Name";
        const userAuthModal = document.querySelector("#custom-user-auth-modal");
        console.log('CustomUserModal', CustomUserModal);
        if (userAuthModal) {
            console.log('haha from inside', CustomUserModal);
            const root = createRoot(userAuthModal);
            root.render(
            <CustomUserModal 
            theme_settings={theme_settings}
            settings={settings}
            urls={urls}
            title="This is meain title"
            subTitle="This is just subtitle to fill the space"
            userName={userName}
            />);
        }        
    }
}
