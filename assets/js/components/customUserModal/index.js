import React from "react";

function CustomUserModal ({settings, theme_settings, urls, title, subTitle, userName}) {
    return <>
                <h4>{title}{userName}</h4>
                <p>{subTitle}</p>
                <div class="custom-user-auth-modal-btn-container">
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
                </div>
            </>;
} 

export default CustomUserModal;