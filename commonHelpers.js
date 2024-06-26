import{a as g,S as w,i as v}from"./assets/vendor-b0d10f48.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&o(m)}).observe(document,{childList:!0,subtree:!0});function p(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=p(t);fetch(t.href,r)}})();function y(e){return e.map(q).join(`
`)}function q(e){return`<li class="gallery-item">
        <a class="gallery-link" href="${e.largeImageURL}">
          <div class="gallery-image-thumb">
            <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" />
          </div>
          <ul class="property">
            <li class="property__item">
              <p class="property__name">Likes</p>
              <p class="item-prop__quantity">${e.likes}</p>
            </li>
            <li class="property__item">
              <p class="property__name">Views</p>
              <p class="item-prop__quantity">${e.views}</p>
            </li>
            <li class="property__item">
              <p class="property__name">Comments</p>
              <p class="item-prop__quantity">${e.comments}</p>
            </li>
            <li class="property__item">
              <p class="property__name">Downloads</p>
              <p class="item-prop__quantity">${e.downloads}</p>
            </li>
          </ul>
        </a>
      </li>`}function h(e){e.classList.remove("loader-hidden")}function _(e){e.classList.add("loader-hidden")}g.defaults.baseURL="https://pixabay.com/api/";async function L(e,s=1){const p={key:"44349742-ecc8a7b60aea5585f0c207813",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:s};try{return(await g.get("",{params:p})).data}catch(o){console.log(o)}}const T="/goit-js-hw-12/assets/icon-close-de5d3efc.svg",b=document.querySelector(".search-form"),l=document.querySelector(".gallery"),c=document.querySelector(".loader"),n=document.querySelector(".load-more_button");let a=1,d="",u=0,f=new w(".gallery-link",{captionsData:"alt",captionDelay:250});f.on("error.simplelightbox",function(e){console.log(e)});function i(e){v.show({class:"izt-toast-message",message:e,messageSize:"12",messageLineHeight:"24",iconUrl:T,messageColor:"#ffffff",backgroundColor:"#b51b1b",position:"topRight",theme:"dark",timeout:2e3})}function S(){const e=l.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}async function E(){try{h(c);const e=await L(d,a);if(u=e.totalHits,e.hits.length===0)l.innerHTML="",i("Sorry, there are no images matching your search query. Please try again!");else{const s=y(e.hits);l.innerHTML=s,f.refresh(),e.hits.length<u?n.classList.remove("hidden"):(n.classList.add("hidden"),i("We're sorry, but you've reached the end of search results."))}}catch(e){console.log("Error",e),i("There was an error loading images. Try again later!")}finally{_(c),b.reset()}}b.addEventListener("submit",e=>{e.preventDefault(),d=e.target.elements.query.value.trim(),a=1,d&&(n.classList.add("hidden"),E())});n.addEventListener("click",async()=>{a+=1;try{h(c);const e=await L(d,a),s=y(e.hits);l.insertAdjacentHTML("beforeend",s),f.refresh(),S(),a*15>=u&&(n.classList.add("hidden"),i("We're sorry, but you've reached the end of search results."))}catch(e){console.log("Error",e),i("There was an error loading images. Try again later!")}finally{_(c)}});
//# sourceMappingURL=commonHelpers.js.map
