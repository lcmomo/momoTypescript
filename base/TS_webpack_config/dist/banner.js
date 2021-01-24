/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkTS_webpack_config"] = self["webpackChunkTS_webpack_config"] || []).push([["banner"],{

/***/ "./src/client/components/banner/index.tsx":
/*!************************************************!*\
  !*** ./src/client/components/banner/index.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\n\nconst Banner = () => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", null, \"Banner\");\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Banner); // import * as React from 'react';\n// const { useRef, useCallback } = React;\n// import { observer, useObservable, useObserver } from 'mobx-react-lite';\n// const TodoList = () => {\n//   const todos = useObservable(new Map<string, boolean>());\n//   const todoRef = useRef();\n//   const addTodo = useCallback(\n//     () => {\n//       todos.set(todoRef.current.value, false);\n//       todoRef.current.value = \"\"\n//     },\n//     [],\n//   );\n//   const toggleTodo = useCallback(\n//     (todo: string) => {\n//       todos.set(todo, !todos.get(todo))\n//     },\n//     [],\n//   );\n//   return useObserver(() => (\n//     <div>\n//       {\n//         Array.from(todos).map(([todo, done]) => (\n//           <div onClick={ () => toggleTodo(todo)} key={ todo }>\n//             {todo}\n//             {todo ? \"✅\" : \"❌\"}\n//           </div>\n//         ))\n//       }\n//       <input ref={ todoRef } />\n//       <button onClick={ addTodo }>Add Todo</button>\n//     </div>\n//   ))\n// }\n// export default TodoList;\n\n//# sourceURL=webpack://TS_webpack_config/./src/client/components/banner/index.tsx?");

/***/ }),

/***/ "./src/client/components/home/index.tsx":
/*!**********************************************!*\
  !*** ./src/client/components/home/index.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\n\n// const { Suspense } = React;\n// const DisplayRemoteData = () => {\n//     const { error, data } = useFetch(\"/api/getHello\")\n//     if (error) return <span>Error:  {error.message }</span>;\n//     if (!data) return null;\n//     return <span>RemoteData: { data }</span>\n// }\n// const Home = () => (\n//     <Suspense fallback={ <span> Loading...</span>} >\n//         <DisplayRemoteData />\n//     </Suspense>\n// )\nconst Home = () => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"span\", null, \"Home\");\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);\n\n//# sourceURL=webpack://TS_webpack_config/./src/client/components/home/index.tsx?");

/***/ })

}]);