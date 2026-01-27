import React from "react";

const testData = [
  {
    title: "Education",
    titleIcon: <i className="fa fa-graduation-cap"></i>,
    content: [{ id: 1, name: "My courses", to: "/my-courses" }]
  },
  {
    title: "Most popular",
    titleIcon: <i className="fa fa-paragraph"></i>,
    hideBorder: true,
    content: [
      {
        id: 2,
        name: "Web Development",
        icon: <i className="fa fa-chrome"></i>,
        children: [
          {
            title: "JavaScript",
            titleIcon: <i className="fa fa-opera"></i>,
            content: [
              {
                id: 3,
                name: "functions",
                ["Some property i need on clicking this"]: "value"
              }
            ]
          }
        ]
      }
    ]
  }
];

export default testData;