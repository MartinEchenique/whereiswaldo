!function(e){var t={};function s(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t,s){"use strict";async function n(e){const t=fbFunctions.httpsCallable("getTopTenTable");return(await t({gameName:gameName})).data}function a(e){const t=document.getElementById("topTenTable");e.forEach(e=>{const s=document.createElement("li");s.textContent="second: "+Math.floor(e.time/1e3)+","+e.time%1e3+" name: "+e.name,t.appendChild(s)})}function o(e){const t=document.getElementById("errorMessage");t.textContent=e,t.style.display="block",setTimeout(()=>{t.textContent="",t.style.display="none"},3e3)}s.r(t);class l{constructor(e,t,s){this.matchId=t,this.personages=s,this.img=this.createDomElement(e),this.gameName=e,this.personages[0].setAsSelected()}createDomElement(e){let t=document.getElementById("tagged-image"),s=document.createElement("img");return s.src=`../src/themes/${e}/main.png`,s.draggable="false",s.setAttribute("id","mainImage"),s.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),this.handleImgClick(e)}),t.appendChild(s),s}async handleImgClick(e){let t=e.offsetX,s=e.offsetY,n=document.getElementsByClassName("selected")[0].dataset.index;const a=this.personages[n];a.canMoveTag()&&(a.setCoordinates(s,t),this.handleFound(n,t,s))}async handleFound(e,t,s){const l=this.personages[e];let i=await async function(e,t,s){name="character_"+e;try{const e=fbFunctions.httpsCallable("checkPersonage");return(await e({name:name,coordinates:t,id:s})).data}catch(e){return o(e.message),{data:!1}}}(e,[t,s],this.matchId);if(!0===i.data){l.setAsFound();this.defineSelect()&&async function(e,t){if(e)document.getElementById("timeFormFrame").style.display="flex";else{a(await n(t)),document.getElementById("topTenDiv").style.display="flex"}}(i.isTopTenTime,this.gameName)}else l.notFound()}defineSelect(){return!this.personages.some(e=>{if(!e.isFound())return e.setAsSelected(),!0})}}class i{constructor(e,t){this.borderElement=this.createBorderElement(),this.domElement=this.createDomElement(e,t),this.visible=!1}setTop(e,t=!0){this.domElement.style.top=e-25+"px",this.borderElement.style.top=e-25+"px"}setLeft(e,t=!0){this.domElement.style.left=e-25+"px",this.borderElement.style.left=e-25+"px"}setPlace(e,t){this.visible||(this.visible=!0,this.domElement.style.display="block",this.borderElement.style.display="block"),this.borderElement.setAttribute("class","tagBorder loader"),this.setTop(e),this.setLeft(t)}setAsFound(){this.borderElement.setAttribute("class","tagBorder foundTag")}setAsNotFound(){this.borderElement.setAttribute("class","tagBorder noFoundTag"),setTimeout(()=>{this.domElement.style.display="none",this.borderElement.style.display="none",this.borderElement.setAttribute("class","tagBorder"),this.visible=!1},800)}canMove(){return!this.borderElement.classList.contains("noFoundTag")&&!this.borderElement.classList.contains("foundTag")&&!this.borderElement.classList.contains("loader")}createDomElement(e,t){let s=document.getElementById("tagged-image"),n=document.createElement("img");return n.style.position="absolute",n.src=`../src/themes/${t}/character_${e}.png`,n.dataset.index=e,n.style.display="none",n.classList.add("tag-img"),s.appendChild(n),n}createBorderElement(){let e=document.getElementById("tagged-image"),t=document.createElement("div");return t.style.position="absolute",t.style.display="none",e.appendChild(t),t}}class r{constructor(e,t,s=null,n=null){this.setAsSelected=this.setAsSelected.bind(this),this.domElement=this.createDomElement(e,t)}setAsSelected(){let e=document.getElementsByClassName("selected")[0];e&&e.classList.remove("selected"),this.domElement.classList.add("selected")}createDomElement(e,t){let s=document.getElementById("faces-container"),n=document.createElement("img");return n.src=`../src/themes/${t}/character_${e}.png`,n.classList.add("toFindImg"),n.dataset.index=e,n.addEventListener("click",this.setAsSelected),s.appendChild(n),n}setAsFound(){this.domElement.classList.add("found"),this.domElement.removeEventListener("click",this.setAsSelected),this.domElement.classList.remove("selected")}}class d{constructor(e,t){this.name="character_"+e,this.img=`../src/${t}/character_${e}.png`,this.found=!1,this.coordinates=[null,null],this.tag=new i(e,t),this.selectImg=new r(e,t)}setCoordinates(e,t){this.tag.canMove()&&(this.coordinates=[e,t],this.tag.setPlace(e,t))}canMoveTag(){return this.tag.canMove()}setAsFound(){this.found=!0,this.selectImg.setAsFound(),this.tag.setAsFound()}isFound(){return this.found}notFound(){this.tag.setAsNotFound()}setAsSelected(){this.selectImg.setAsSelected()}}async function c(e,t){const s=fbFunctions.httpsCallable("newMatch");let n,i=[];for(let e=0;e<t;e++)i.push("character_"+e);try{n=await s({gameName:e})}catch(e){o(e)}const r=n.data,c=i.map((t,s)=>new d(s,e));var m;new l(e,r,c),m=r,document.getElementById("timeGame").addEventListener("submit",async e=>{e.preventDefault(),e.submitter.disabled=!0;const t=document.getElementById("timeName").value,s=fbFunctions.httpsCallable("addToTimesTable");let n=await s({id:m,name:t});e.target.parentElement.style.display="none",a(n.data),document.getElementById("topTenDiv").style.display="flex"})}window.onload=async()=>{c("pokemon1",6)}}]);