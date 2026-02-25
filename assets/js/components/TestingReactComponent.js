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

const transformIntoObjs = (metaArr) => {
  const result = {};
  
  metaArr.forEach(item => {
    const key = `id_${item.resource_id}`;
    result[key] = JSON.parse(item.value);
  });
  
  return result;
}

export default function TestingReactComponent({categories, menuTitle}) {
  

  const [categoriesNavMetafields, setCategoriesNavMetafields] = useState({});
  // const [computedCategories, setComputedCategories] = useState([]);
  const [stack, setStack] = useState([{ items: [], title: (menuTitle ? menuTitle : "Menu")}]);

  const getCategoryMetafeilds = async () => {

    const url = `https://acquiescent-meda-kickless.ngrok-free.dev/api/all-category-metafields`;
    const response = await fetch(url, 
       {
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
            }
        }
    );
    const categoriesMetafield = await response.json();

    const transformedObj = transformIntoObjs(categoriesMetafield.data);
    setCategoriesNavMetafields(transformedObj);    
  }

  useEffect(() => {
    getCategoryMetafeilds();
  }, []);

  useEffect(() => {
      const computed = computeCategoriesMenu({categories, categoriesNavMetafields});
      console.log('categories', categories);
      console.log('customMetafiled', categoriesNavMetafields);
      console.log('new computed from useEffect', computed);
      setStack([{ items: computed, title: (menuTitle ? menuTitle : "Menu")}])
  }, [categories, categoriesNavMetafields]);


  const openSubmenu = (children, title) => {
    setStack([...stack, { items: children, title }]);
  };

  const goBack = () => {
    setStack(stack.slice(0, -1));
  };


  const current = stack[stack.length - 1];

  return (
    <Drawer
      open
      level={null}
      placement="left"
      handler={false}
      width={400}
      showMask={false}
      getContainer={false} 
      aria-label="Mobile Navigation Menu"
      >
      <div style={{ padding: "1rem" }}>
        {stack.length > 1 && <button className="mobile-menu-back-btn" onClick={goBack}><ChevronLeft size={24} color="#333" strokeWidth={3} /> Back</button>}
        <h3>{current.title}</h3>
        <ul className="mobile-menu-items-list" style={{ listStyle: "none", padding: 0 }}>
          {current.items.map((item, idx) => {
            const dontDisplayIfItHasImageOnLevel1 = stack.length !== 2 || (!item.bc?.customImages && isEmptyObject(item.bc?.image)); 
            if (dontDisplayIfItHasImageOnLevel1) {
              return <li key={uuidv4()} className="mobile-menu-items" style={{ margin: "0.5rem 0" }}>
                <a href={item.link}>
                    {item.mobileLabel}
                </a>
                {item.children && <button onClick={() => openSubmenu(item.children, item.mobileLabel)}>
                      <span className="mobile-menu-item-arrow">→</span>
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
                          
                          <a
                            href={item.link}
                            className="mobile-menu-img-link-text"
                          >
                            
                            <img 
                            src={item.bc.customImages.mobile}
                            alt={item.bc.customImages.mobile.alt}
                          />

                            {item.mobileLabel}
                            <span className="mobile-menu-item-arrow">→</span>
                          </a>
                        </div> 
              }
              if (!isEmptyObject(item.bc?.image)) {
              return  <div key={uuidv4()}>
                        
                      <a
                        href={item.link}
                        className="mobile-menu-img-link-text"
                      >
                        <img 
                          src={getBigCommerceUrl(item.bc.image, 400)}
                          alt={item.bc.image.alt}
                        />

                        {item.mobileLabel}
                        <span className="mobile-menu-item-arrow">→</span>
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


 