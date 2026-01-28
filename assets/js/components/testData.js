import React from "react";

const testData = [
  {
    label: "Shop",
    children: [
      {
        label: "Men",
        children: [
          { label: "T-Shirts", link: "/men/tshirts" },
          { label: "Shirts", link: "/men/shirts" },
          { label: "Jeans", link: "/men/jeans" },
          { label: "Footwear", link: "/men/footwear" },
        ],
      },
      {
        label: "Women",
        children: [
          { label: "Dresses", link: "/women/dresses" },
          { label: "Tops", link: "/women/tops" },
          { label: "Jeans", link: "/women/jeans" },
          { label: "Footwear", link: "/women/footwear" },
        ],
      },
      {
        label: "Kids",
        children: [
          { label: "Boys", link: "/kids/boys" },
          { label: "Girls", link: "/kids/girls" },
          { label: "Infants", link: "/kids/infants" },
        ],
      },
    ],
  },
  {
    label: "Electronics",
    children: [
      {
        label: "Mobiles",
        children: [
          { label: "Android Phones", link: "/mobiles/android" },
          { label: "iPhones", link: "/mobiles/iphone" },
          { label: "Accessories", link: "/mobiles/accessories" },
        ],
      },
      {
        label: "Laptops",
        children: [
          { label: "Gaming Laptops", link: "/laptops/gaming" },
          { label: "Ultrabooks", link: "/laptops/ultrabooks" },
          { label: "MacBooks", link: "/laptops/macbook" },
        ],
      },
      {
        label: "TV & Audio",
        children: [
          { label: "Smart TVs", link: "/tv/smart-tv" },
          { label: "Soundbars", link: "/tv/soundbars" },
          { label: "Headphones", link: "/tv/headphones" },
        ],
      },
    ],
  },
  {
    label: "Home & Living",
    children: [
      {
        label: "Furniture",
        children: [
          { label: "Sofas", link: "/furniture/sofas" },
          { label: "Beds", link: "/furniture/beds" },
          { label: "Tables", link: "/furniture/tables" },
        ],
      },
      {
        label: "Kitchen",
        children: [
          { label: "Cookware", link: "/kitchen/cookware" },
          { label: "Appliances", link: "/kitchen/appliances" },
        ],
      },
    ],
  },
  {
    label: "Sale",
    children: [
      {
        label: "Clearance",
        children: [
          { label: "Under ₹999", link: "/sale/under-999" },
          { label: "Under ₹1999", link: "/sale/under-1999" },
        ],
      },
      {
        label: "Seasonal",
        children: [
          { label: "Festive Sale", link: "/sale/festive" },
          { label: "End of Season", link: "/sale/eos" },
        ],
      },
    ],
  },
  {
    label: "About Us",
    children: [
      {
        label: "Company",
        children: [
          { label: "Our Story", link: "/about/story" },
          { label: "Careers", link: "/about/careers" },
        ],
      },
      {
        label: "Support",
        children: [
          { label: "Contact Us", link: "/support/contact" },
          { label: "FAQs", link: "/support/faqs" },
        ],
      },
    ],
  },
];


export default testData;