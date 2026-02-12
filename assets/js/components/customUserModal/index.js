import React from "react";

const defaultButton = {
    title: "test",
    link: "#"
}

function CustomUserModal ({settings, 
                          theme_settings, 
                          urls, 
                          title, 
                          subTitle, 
                          userName,
                          buttonFirst = defaultButton,
                          buttonSecond = defaultButton}) {
    return <>
                <h4>{title}{userName}</h4>
                <p>{subTitle}</p>
                <div class="custom-user-auth-modal-btn-container">
                    <a className="navUser-action"
                    href={buttonFirst.link}
                    aria-label={buttonFirst.title}
                    >
                        {buttonFirst.title}
                    </a>
                    <a className="navUser-action"
                    href={buttonSecond.link}
                    aria-label={buttonSecond.title}
                    >
                        {buttonSecond.title}
                    </a>
                </div>
            </>;
} 

export default CustomUserModal;