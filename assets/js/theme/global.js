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

    async initReactMobileMenu({categories, custom_categories_navigation}) {
        const testingReactComponentContainer = document.querySelector("#custom-modal-id");
        
        if (testingReactComponentContainer) {
            const [{ default: React }, { createRoot }, { default: TestingReactComponent }] = await Promise.all([
                import('react'),
                import('react-dom/client'),
                import('../components/TestingReactComponent')
            ]);
            
            const root = createRoot(testingReactComponentContainer);
            root.render(
                React.createElement(TestingReactComponent, {
                    categories,
                    custom_categories_navigation,
                    menuTitle: "Menu"
                })
            );
        }
    }

    async initUserModal({settings, theme_settings, urls}) {
        const userName = "Test Name";
        const userAuthModal = document.querySelector("#custom-user-auth-modal");
        
        if (userAuthModal) {
            const [{ default: React }, { createRoot }, { default: CustomUserModal }] = await Promise.all([
                import('react'),
                import('react-dom/client'),
                import('../components/customUserModal')
            ]);
            
            console.log('CustomUserModal', CustomUserModal);
            const root = createRoot(userAuthModal);
            root.render(
                React.createElement(CustomUserModal, {
                    theme_settings,
                    settings,
                    urls,
                    title: "This is meain title",
                    subTitle: "This is just subtitle to fill the space",
                    userName
                })
            );
        }        
    }
}