import testData from "./testData";
import computeCategoriesMenu from "./computeCategoriesMenu";
import isObjEmpty from "./isObjEmpty";

import React, { useMemo, useState, useEffect } from "react";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";

export default function TestingReactComponent({categories, custom_categories_navigation, menuTitle}) {
  
  const categoriesMenu = useMemo(() => {
      console.log("categories", categories);
      console.log("custom_categories_navigation", custom_categories_navigation);
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
  const level = stack.length - 1;

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
        {stack.length > 1 && <button onClick={goBack}>Back</button>}
        <h3>{current.title}</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {current.items.map((item, idx) => (
            <li class="mobile-menu-items" key={idx} style={{ margin: "0.5rem 0" }}>
              <a href={item.link}>
                  {item.label}
              </a>
              {item.children && <button onClick={() => openSubmenu(item.children, item.label)}>
                    →
              </button>}
            </li>
          ))}
        </ul>
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


 