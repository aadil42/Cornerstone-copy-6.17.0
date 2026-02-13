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
            urls, 
            customer } = this.context;

        cartPreview(secureBaseUrl, cartId);
        quickSearch();
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel(this.context);
        menu();
        mobileMenuToggle();
        svgInjector();
        
        if (customer) {
            // show the modal for logout and account
            this.initUserModal({settings, theme_settings, urls});
        } else {
            // show the modal for register and login
            this.initUserModalRegisterLogin({settings, theme_settings, urls});
        }

        // show the mobile menu.
        this.initReactMobileMenu({categories, custom_categories_navigation});

        // fetch products
        this.fetchProductsExample();
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
            
            const root = createRoot(userAuthModal);
            root.render(
                React.createElement(CustomUserModal, {
                    theme_settings,
                    settings,
                    urls,
                    title: "This is main title",
                    subTitle: "This is just subtitle to fill the space",
                    userName: userName,
                    buttonFirst: {
                        title: "Account",
                        link: urls.account.index
                    },
                    buttonSecond: {
                        title: "Logout",
                        link: urls.auth.logout
                    }
                })
            );
        }        
    }

    async initUserModalRegisterLogin ({settings, theme_settings, urls}) {
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
                    title: "This is main title",
                    subTitle: "This is just subtitle to fill the space",
                    userName: userName,
                    buttonFirst: {
                        title: "Sign in",
                        link: urls.auth.login
                    },
                    buttonSecond: {
                        title: "Register",
                        link: urls.auth.create_account
                    }
                })
            );
        }        
    }

    async fetchProductsExample() {
    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.context.settings.storefront_api.token}` 
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                query: `query {
                    site {
                        products(first: 5) {
                            edges {
                                node {
                                    entityId
                                    name
                                    sku
                                    prices {
                                        price {
                                            value
                                            currencyCode
                                        }
                                    }
                                    path
                                }
                            }
                        }
                    }
                }`
            })
        });
        
        const result = await response.json();
        console.log('✅ Fetched products via Storefront API:', result.data);
        return result.data;
    } catch (error) {
        console.error('❌ Error fetching products:', error);
    }
    }
}