import testData from "./testData";
import computeCategoriesMenu from "./computeCategoriesMenu";
import isObjEmpty from "./isObjEmpty";
import getBigCommerceUrl from "./getBigCommerceUrl";
import { ChevronLeft } from 'lucide-react';

import { v4 as uuidv4 } from 'uuid';
import React, { useMemo, useState, useEffect } from "react";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import "./mobileMenuStyles.css";
import { isEmpty } from "lodash";
import { isEmptyObject } from "jquery";

export default function TestingReactComponent({categories, custom_categories_navigation, menuTitle}) {
  
  const categoriesMenu = useMemo(() => {
      return computeCategoriesMenu({categories, custom_categories_navigation});
  }, [categories, custom_categories_navigation]);

  const [stack, setStack] = useState([{ items: categoriesMenu, title: (menuTitle ? menuTitle : "Menu")}]);

  const openSubmenu = (children, title) => {
    setStack([...stack, { items: children, title }]);
  };

  const goBack = () => {
    setStack(stack.slice(0, -1));
  };

  useEffect(() => {
    console.log(categories, custom_categories_navigation);
  },[]);

  const current = stack[stack.length - 1];

  return (
    <Drawer
      open
      level={null}
      placement="left"
      handler={false}
      width={400}
      showMask={false}
      getContainer={false} >
      <div style={{ padding: "1rem" }}>
        {stack.length > 1 && <button class="mobile-menu-back-btn" onClick={goBack}><ChevronLeft size={24} color="#333" strokeWidth={3} /> Back</button>}
        <h3>{current.title}</h3>
        <ul class="mobile-menu-items-list" style={{ listStyle: "none", padding: 0 }}>
          {current.items.map((item, idx) => {
            const dontDisplayIfItHasImageOnLevel1 = stack.length !== 2 || (!item.bc?.customImages && isEmptyObject(item.bc?.image)); 
            if (dontDisplayIfItHasImageOnLevel1) {
              return <li key={uuidv4()} class="mobile-menu-items" style={{ margin: "0.5rem 0" }}>
                <a href={item.link}>
                    {item.label}
                </a>
                {item.children && <button onClick={() => openSubmenu(item.children, item.label)}>
                      <span class="mobile-menu-item-arrow">→</span>
                </button>}
              </li>
            }
            return null;
          })}
        </ul>
        <div className="mobile-menu-imgs">
          {stack.length > 1 && stack[1].items &&
            stack[1].items.map((item) => {
              if (item.bc?.customImages?.mobile) {
                return <div key={uuidv4()}>
                          <img 
                            src={item.bc.customImages.mobile}
                            alt={item.bc.customImages.mobile.alt}
                          />
                          <a
                            href={item.link}
                            class="mobile-menu-img-link-text"
                          >
                            {item.label}
                            <span class="mobile-menu-item-arrow">→</span>
                          </a>
                        </div> 
              }
              if (!isEmptyObject(item.bc?.image)) {
              return  <div key={uuidv4()}>
                        <img 
                        src={getBigCommerceUrl(item.bc.image, 400)}
                        alt={item.bc.image.alt}
                      />
                      <a
                        href={item.link}
                        class="mobile-menu-img-link-text"
                      >
                        {item.label}
                        <span class="mobile-menu-item-arrow">→</span>
                      </a>
                    </div> 
              }
            })
          }
        </div>
      </div>
    </Drawer>

  );
}

// export default function TestingReactComponent({categories}) {

//   console.log('categories from compo', categories);

//   return (
//     <div>
//         <h3>
//             This is a React Component! baba 
//         </h3>
//         <p>
//             How cool is that!!
//         </p>
//     </div>
//   );
// }


 