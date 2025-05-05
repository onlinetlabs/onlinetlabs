import { Course, Lab } from "contentlayer/generated";

const AVAILABLE_CATEGORIES = [
    "IP",
    "Routing",
    "Wireless",
    "Security",
    "Switching",
    "QoS",
    "Network Management",
    "Data Center"
];

function getRandomCategories(): string[] {
    // randomly choose length: either 2 or 3
    const num = Math.floor(Math.random() * 2) + 2;
    // Create a copy and shuffle it
    const shuffled = [...AVAILABLE_CATEGORIES].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, num);
}

export const DUMMY_LABS: Lab[] = Array.from({ length: 5 }, (_, i) => ({
    title: `Тестовая работа ${i + 1}`,
    publishedAt: "2024-03-22",
    toc: true,
    sortOrder: i + 1,
    categories: getRandomCategories(),
    body: {
        raw: "\n# Тестовая работа\n",
        code: "var Component=(()=>{var l=Object.create;var a=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var x=Object.getOwnPropertyNames;var f=Object.getPrototypeOf,p=Object.prototype.hasOwnProperty;var _=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),g=(t,e)=>{for(var n in e)a(t,n,{get:e[n],enumerable:!0})},c=(t,e,n,i)=>{if(e&&typeof e==\"object\"||typeof e==\"function\")for(let o of x(e))!p.call(t,o)&&o!==n&&a(t,o,{get:()=>e[o],enumerable:!(i=m(e,o))||i.enumerable});return t};var b=(t,e,n)=>(n=t!=null?l(f(t)):{},c(e||!t||!t.__esModule?a(n,\"default\",{value:t,enumerable:!0}):n,t)),j=t=>c(a({},\"__esModule\",{value:!0}),t);var h=_((C,s)=>{s.exports=_jsx_runtime});var k={};g(k,{default:()=>u,frontmatter:()=>M});var r=b(h()),M={title:\"\\u0422\\u0435\\u0441\\u0442\\u043E\\u0432\\u0430\\u044F \\u0440\\u0430\\u0431\\u043E\\u0442\\u0430\",publishedAt:\"2024-03-22\",sortOrder:1,categories:[\"IP\",\"Routing\"]};function d(t){let e={a:\"a\",h1:\"h1\",...t.components};return(0,r.jsx)(e.h1,{id:\"\\u0442\\u0435\\u0441\\u0442\\u043E\\u0432\\u0430\\u044F-\\u0440\\u0430\\u0431\\u043E\\u0442\\u0430\",children:(0,r.jsx)(e.a,{className:\"subheading-anchor\",\"aria-label\":\"Link to section\",\"data-rehype-autolink-heading\":\"\",href:\"#\\u0442\\u0435\\u0441\\u0442\\u043E\\u0432\\u0430\\u044F-\\u0440\\u0430\\u0431\\u043E\\u0442\\u0430\",children:\"\\u0422\\u0435\\u0441\\u0442\\u043E\\u0432\\u0430\\u044F \\u0440\\u0430\\u0431\\u043E\\u0442\\u0430\"})})}function u(t={}){let{wrapper:e}=t.components||{};return e?(0,r.jsx)(e,{...t,children:(0,r.jsx)(d,{...t})}):d(t)}return j(k);})();\n;return Component;"
    },
    _id: `labs/test-lab-${i + 1}.mdx`,
    _raw: {
        sourceFilePath: `labs/test-lab-${i + 1}.mdx`,
        sourceFileName: `test-lab-${i + 1}.mdx`,
        sourceFileDir: "labs",
        contentType: "mdx",
        flattenedPath: `labs/test-lab-${i + 1}`,
    },
    type: "Lab",
    id: `test-lab-${i + 1}`,
    slug: `#`,
    slugAsParams: `test-lab-${i + 1}`,
    namespace: "test",
    isEntryPage: false
}));

export const DUMMY_COURSES: Course[] = Array.from({ length: 5 }, (_, i) => ({
  "title": `Тестовый курс ${i + 1}`,
  "description": `Описание тестового курса ${i + 1}.`,
  "publishedAt": "2024-01-01",
  "toc": true,
  "sortOrder": i + 1,
  "body": {
      "raw": "\n# Тестовый курс",
      "code": "var Component=(()=>{var u=Object.create;var a=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var x=Object.getOwnPropertyNames;var f=Object.getPrototypeOf,p=Object.prototype.hasOwnProperty;var _=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),b=(t,e)=>{for(var n in e)a(t,n,{get:e[n],enumerable:!0})},c=(t,e,n,i)=>{if(e&&typeof e==\"object\"||typeof e==\"function\")for(let o of x(e))!p.call(t,o)&&o!==n&&a(t,o,{get:()=>e[o],enumerable:!(i=m(e,o))||i.enumerable});return t};var j=(t,e,n)=>(n=t!=null?u(f(t)):{},c(e||!t||!t.__esModule?a(n,\"default\",{value:t,enumerable:!0}):n,t)),M=t=>c(a({},\"__esModule\",{value:!0}),t);var d=_((C,s)=>{s.exports=_jsx_runtime});var k={};b(k,{default:()=>l,frontmatter:()=>g});var r=j(d()),g={title:\"\\u0422\\u0435\\u0441\\u0442\\u043E\\u0432\\u044B\\u0439 \\u043A\\u0443\\u0440\\u0441\",description:\"\\u041E\\u043F\\u0438\\u0441\\u0430\\u043D\\u0438\\u0435 \\u0442\\u0435\\u0441\\u0442\\u043E\\u0432\\u043E\\u0433\\u043E \\u043A\\u0443\\u0440\\u0441\\u0430.\",publishedAt:\"2024-01-01\",sortOrder:0};function h(t){let e={a:\"a\",h1:\"h1\",...t.components};return(0,r.jsx)(e.h1,{id:\"\\u0442\\u0435\\u0441\\u0442\\u043E\\u0432\\u044B\\u0439-\\u043A\\u0443\\u0440\\u0441\",children:(0,r.jsx)(e.a,{className:\"subheading-anchor\",\"aria-label\":\"Link to section\",\"data-rehype-autolink-heading\":\"\",href:\"#\\u0442\\u0435\\u0441\\u0442\\u043E\\u0432\\u044B\\u0439-\\u043A\\u0443\\u0440\\u0441\",children:\"\\u0422\\u0435\\u0441\\u0442\\u043E\\u0432\\u044B\\u0439 \\u043A\\u0443\\u0440\\u0441\"})})}function l(t={}){let{wrapper:e}=t.components||{};return e?(0,r.jsx)(e,{...t,children:(0,r.jsx)(h,{...t})}):h(t)}return M(k);})();\n;return Component;"
  },
  "_id": `courses/test-course-${i + 1}/index.mdx`,
  "_raw": {
      "sourceFilePath": `courses/test-course-${i + 1}/index.mdx`,
      "sourceFileName": "index.mdx",
      "sourceFileDir": `courses/test-course-${i + 1}`,
      "contentType": "mdx",
      "flattenedPath": `courses/test-course-${i + 1}`,
  },
  "type": "Course",
  "id": `test-course-${i + 1}`,
  "slug": "#",
  "slugAsParams": `test-course-${i + 1}`,
  "namespace": "test",
  "isEntryPage": true
}))