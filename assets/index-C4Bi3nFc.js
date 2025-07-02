(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const S=(e,o)=>{let s;return(...a)=>{s&&clearInterval(s),s=setTimeout(()=>{e(...a)},o)}},y=({Poster:e,Title:o,Genre:s,Plot:a,Awards:t,BoxOffice:r,Metascore:n,imdbRating:i,imdbVotes:g})=>{let c=0;t.split(" ").forEach(L=>{const h=parseInt(L);isNaN(h)||(c+=h)}),console.log(r);const l=parseInt(r?.replace(/[\$,]/g,""));console.log(l);const d=parseInt(n),u=parseFloat(i),p=parseInt(g?.replace(/,/g,""));return console.log(c,l,d,u,p),`
  <div class="heading flex gap-3 mb-20 ">
    <div class="image  flex-grow-0 flex-shrink-0 h-[200px] overflow-hidden">
    <img src="${e}" alt="" class="w-full h-full" />
    </div>
    <div class="metaData">
    <h1 class="text-3xl font-bold mb-2">${o}</h1>
    <p class="text-xl mb-2">${s}</p>
    <p class="text-gray-500">${a}</p>
    </div>
  </div>
  <div class="stats">
  ${m("Awards",t,c)}
  ${m("Box Office",r,l)}
  ${m("Meta Score",n,d)}
  ${m("IMDB Rating",i,u)}
  ${m("IMDB Votes",g,p)}
  </div>
  
  
  `},m=(e,o,s)=>`
<div data-value = ${s}
        class="statistic text-green-50 text-3xl mb-5 p-5 shadow-lg hover:bg-green-400  bg-green-500 rounded h-[140px]"
      >
        <p class="mb-3">${o==="N/A"||o===void 0?"Not Available":o}</p>
        <p class="text-xl">${e}</p>
      
</div>
`,b=()=>{const e=document.querySelectorAll(".stats"),o=e[0].querySelectorAll(".statistic"),s=e[1].querySelectorAll(".statistic");o.forEach((a,t)=>{const r=parseFloat(a.dataset.value),n=parseFloat(s[t].dataset.value);isNaN(r)||isNaN(n)||(n>r?(a.classList.remove("hover:bg-green-400","bg-green-500"),a.classList.add("hover:bg-red-400","bg-red-500")):(s[t].classList.remove("hover:bg-green-400","bg-green-500"),s[t].classList.add("hover:bg-red-400","bg-red-500")))})},w=({root:e,debounceDuration:o,fetchData:s,renderOption:a,onOptionClick:t,inputVal:r})=>{e.innerHTML=$();const n=e.querySelector("input"),i=e.querySelector("#options"),g=async c=>{const l=c.target.value,d=await s(l);if(i.innerHTML="",!d||!d.length){i.classList.add("hidden");return}for(const u of d){const p=document.createElement("div");p.innerHTML=a(u),i.append(p),p.addEventListener("click",()=>{i.classList.add("hidden"),n.value=r(u),t(u)})}i.classList.remove("hidden")};n.addEventListener("input",S(g,o)),document.addEventListener("click",c=>{const l=c.target;e.contains(l)||i.classList.add("hidden")})},$=()=>`
      <div class="px-2">
        <div class="relative">
          <input id="m1" class="py-2 px-4 block w-full border-2 rounded border-gray-400" type="text" />
          <div
            id="options"
            class="mx-2 p-5 rounded-b-md border  absolute left-0 right-0 top-full translate-y-1 z-40 bg-white overflow-auto max-h-[600px] hidden"
          ></div>
        </div>
      </div>
  `,N=document.querySelector("#left-autocomplete"),q=document.querySelector("#right-autocomplete");let f,v;const x={debounceDuration:500,fetchData:async e=>(await axios.get("https://www.omdbapi.com",{params:{apikey:"ae5cd549",s:e}})).data.Search,inputVal:({Title:e})=>e,renderOption:({Poster:e,Title:o})=>`
  <a class="hover:bg-gray-100 cursor-pointer my-2 flex gap-2 items-center">
            <img
              src="${e}"
              alt=""
              srcset=""
              class="w-20 h-20 bg-cover block"
            />
            <div class="title">${o}</div>
          </a>
  `};w({...x,root:N,onOptionClick:async({imdbID:e})=>{const s=(await axios.get("https://www.omdbapi.com",{params:{apikey:"ae5cd549",i:e}})).data;f=s,document.querySelector("#left-summary").innerHTML=y(s),f&&v&&b()}});w({...x,root:q,onOptionClick:async({imdbID:e})=>{const s=(await axios.get("https://www.omdbapi.com",{params:{apikey:"ae5cd549",i:e}})).data;document.querySelector("#right-summary").innerHTML=y(s),v=s,f&&v&&b()}});
