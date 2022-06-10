"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[600],{3905:function(e,t,r){r.d(t,{Zo:function(){return c},kt:function(){return f}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(r),f=o,d=m["".concat(s,".").concat(f)]||m[f]||u[f]||a;return r?n.createElement(d,i(i({ref:t},c),{},{components:r})):n.createElement(d,i({ref:t},c))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var p=2;p<a;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},4255:function(e,t,r){r.r(t),r.d(t,{contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return l},metadata:function(){return p},toc:function(){return c}});var n=r(7462),o=r(3366),a=(r(7294),r(3905)),i=["components"],l={},s="Bot basics",p={unversionedId:"Pishon4/strategy_runner",id:"Pishon4/strategy_runner",isDocsHomePage:!1,title:"Bot basics",description:"Simple example for backtesting",source:"@site/docs/Pishon4/strategy_runner.md",sourceDirName:"Pishon4",slug:"/Pishon4/strategy_runner",permalink:"/docs/Pishon4/strategy_runner",editUrl:"https://github.com/eryeden/docs/tree/main/docs/Pishon4/strategy_runner.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Order publishing",permalink:"/docs/Pishon4/po_design/po_order_publish"},next:{title:"Let's marginalization",permalink:"/docs/SLAM/test_slam"}},c=[{value:"Simple example for backtesting",id:"simple-example-for-backtesting",children:[]},{value:"Simple example for real-time trading",id:"simple-example-for-real-time-trading",children:[]}],u={toc:c};function m(e){var t=e.components,r=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"bot-basics"},"Bot basics"),(0,a.kt)("h3",{id:"simple-example-for-backtesting"},"Simple example for backtesting"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"poetry shell\npython example/Pishon4/strategy_study/simple_backtest.py\n")),(0,a.kt)("h3",{id:"simple-example-for-real-time-trading"},"Simple example for real-time trading"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"poetry shell\ndoppler run -- python example/Pishon4/strategy_study/simple_realtime.py -l log/\n")),(0,a.kt)("p",null,"Before running the real-time trading example, the following steps should be done:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Doppler setup"),(0,a.kt)("li",{parentName:"ol"},"Environment variables setup")),(0,a.kt)("p",null,"Please follow the instructions ",(0,a.kt)("a",{parentName:"p",href:"../README.md"},"here"),"."))}m.isMDXComponent=!0}}]);