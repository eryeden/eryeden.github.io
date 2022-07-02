"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[129],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=c(n),d=a,f=m["".concat(s,".").concat(d)]||m[d]||u[d]||i;return n?r.createElement(f,o(o({ref:t},p),{},{components:n})):r.createElement(f,o({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var c=2;c<i;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5568:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return l},metadata:function(){return c},toc:function(){return p}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=["components"],l={},s="Welcome to Pishon4",c={unversionedId:"Pishon4/index",id:"Pishon4/index",isDocsHomePage:!1,title:"Welcome to Pishon4",description:"Docs",source:"@site/docs/Pishon4/index.md",sourceDirName:"Pishon4",slug:"/Pishon4/index",permalink:"/docs/Pishon4/index",editUrl:"https://github.com/eryeden/docs/tree/main/docs/Pishon4/index.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Data acquisition for backtesting",permalink:"/docs/Pishon4/data_acquisition"},next:{title:"A guide of the parameter tuning for the trading algorithms.",permalink:"/docs/Pishon4/parameter_tuning"}},p=[{value:"Docs",id:"docs",children:[]},{value:"Installation",id:"installation",children:[]}],u={toc:p};function m(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"welcome-to-pishon4"},"Welcome to Pishon4"),(0,i.kt)("h2",{id:"docs"},"Docs"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Installation and setup: This documentation."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/Pishon4/strategy_runner"},"Bot basics")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/Pishon4/data_acquisition"},"Data acquisition for backtesting")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/Pishon4/parameter_tuning"},"Parameter tuning")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"/docs/Pishon4/po_design/index"},"Portfolio optimization design docs"))),(0,i.kt)("h2",{id:"installation"},"Installation"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Install pyenv. Make sure to follow ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/pyenv/pyenv/wiki/common-build-problems#prerequisites"},"this guidance"),"."),(0,i.kt)("li",{parentName:"ol"},"Install poetry."),(0,i.kt)("li",{parentName:"ol"},"Install TA-lib dependencies. Follow ",(0,i.kt)("a",{parentName:"li",href:"https://github.com/mrjbq7/ta-lib#linux"},"here"),". ")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},'sudo apt install build-essential\nwget URL:to/ta-lib-0....\ncd talib/library\n./configure --prefix=/usr LDFLAGS="-lm"  # https://aur.archlinux.org/packages/ta-lib/\nmake -j$(nproc)\nsudo make install\n')),(0,i.kt)("ol",{start:4},(0,i.kt)("li",{parentName:"ol"},"Set the python interpreter as 3.7.9 and install dependencies.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"pyenv install 3.7.9\npyenv local 3.7.9\npoetry install\n")),(0,i.kt)("ol",{start:5},(0,i.kt)("li",{parentName:"ol"},"Inject the library path into site-packages.")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"bash inject_library_path.sh\n")))}m.isMDXComponent=!0}}]);