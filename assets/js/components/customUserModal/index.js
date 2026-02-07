import React from "react";

function CustomUserModal ({settings, theme_settings, urls}) {
    return <>
                <a className="navUser-action"
                href={urls.account.index}
                aria-label="Account"
                >
                    Account
                </a>
                <a className="navUser-action"
                href={urls.auth.logout}
                aria-label="Logout"
                >
                    Logout
                </a>
            </>;
} 

export default CustomUserModal;