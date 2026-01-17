// export const adminRoutes= [
//     {
//       title: "User Management",
//       url: "#",
//       items: [
//         {
//           title: "Analytics",
//           url: "/anlytics",
//         },

//       ],
//     },
//   ]

export interface TRoute {
  title: string;
 
  items: {
    title: string;
    url: string;
  }[];
}
