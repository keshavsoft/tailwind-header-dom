(function(e){typeof define==`function`&&define.amd?define([],e):e()})(function(){var e=(e=``)=>{let t=document.createElement(`li`);return t.className=e,t},t=({inHtmlId:e=``,inHref:t=`#`,cls:n=``,inTableName:r=``})=>{let i=document.createElement(`a`);return i.id=e,i.href=t,i.className=n,r&&(i.dataset.tableName=r),i},n=({inTextToShow:e=``,inClassName:t=``})=>{let n=document.createElement(`span`);return n.className=t,n.textContent=e,n},r={search:`
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
    `,home:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>
`,serial:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99" />
</svg>
`,currency:`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
`,search1:`
  <div class="w-10 h-10 flex items-center justify-center">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
 </div>
    `},i=({inSvgName:e})=>(console.log(`inSvgName : `,e),e in r?document.createRange().createContextualFragment(r[e]).firstElementChild:document.createRange().createContextualFragment(r.search).firstElementChild),a=()=>({containerId:`kSTableContainer`,tableName:``,mode:`create`,layout:{verticalPosition:`top`,type:`table`},endPoints:{create:``,update:``,delete:``,read:``,find:``},options:{firstRow:{showSearch:!0},vertical:{showVertical:!0,isDisabled:!1,showSaveButton:!0},dataList:{show:!0},table:{isDisabled:!1,showTable:!0,showRowOptions:!1,showSerial:!0,showFooter:!1,footer:{showDataList:!0}},focus:{priority:[`vertical`,`footer`,`search`]}},columnsConfig:[],uiClasses:{form:{formClass:`grid grid-cols-3 gap-x-8 gap-y-4 p-6 verticalForm`,buttonClass:`mt-2 px-4 py-1 bg-green-500 text-white`,rowClass:`flex items-center space-x-4`,labelClass:`w-24 text-sm font-medium`,inputClass:`flex-1 border rounded px-3 py-2`}},callbacks:{table:{onDelete:async({toDeletePk:e})=>await await startFetchAsGet({inQuery:{ParentPk:e}})}}}),o=async({tableName:e})=>{let t=a();return t.columnsConfig=(await(await fetch(`/columns.json`)).json())[e].columnsConfig,t.tableName=e,t.endPoints.read=`/Api/V1/${e}/ShowAll`,t},s=async e=>window.KSTable?.initTableOnly?window.KSTable.initTableOnly(e):initTableOnly(e),c=({onClick:e})=>async t=>{t.preventDefault();let n=t.currentTarget,r=await s(await o({tableName:n.dataset.tableName}));console.log(`fromCallKSTable : `,r),e&&await e(t)},l=({inTextToShow:r,inHtmlId:a,inIconPaths:o,inHref:s,onClick:l,inTableName:u,inClasses:d,inSvgName:f})=>{let p=e(d.liClass),m=t({inHtmlId:a,inHref:s,cls:d?.aClass,inTableName:u}),h=n({inTextToShow:r,inClassName:d.spanClass}),g=i({inSvgName:f});return l&&m.addEventListener(`click`,c({onClick:l})),m.append(g,h),p.appendChild(m),p},u=({inHeading:e=`KeshavSoft`,inHtmlId:t=`titlehtmlId`})=>{let n=document.createElement(`div`);return n.className=`text-xl font-semibold`,n.innerText=e,n.id=t,n},d=()=>{let e=document.createElement(`button`);return e.className=`text-xl px-4 py-1 md:hidden`,e.innerText=`☰`,e.addEventListener(`click`,()=>{document.getElementById(`menu`).classList.toggle(`hidden`)}),e},f=({inUlClass:e=`[&_svg]:size-6`})=>{let t=document.createElement(`ul`);return t.id=`menu`,t.className=`w-full hidden flex flex-col space-y-2 mt-4
    md:flex md:flex-row md:space-y-0 md:gap-4
    md:mt-0 md:w-auto md:flex-wrap ${e}`,t},p=()=>{let e=document.createElement(`nav`);e.className=`bg-gray-800 text-white`;let t=document.createElement(`div`);t.className=`mx-auto px-3 py-3
    max-w-3xl
    lg:max-w-5xl
    xl:max-w-full xl:px-10`;let n=document.createElement(`div`);return n.className=`flex flex-wrap items-center justify-between`,t.appendChild(n),e.appendChild(t),{nav:e,innerDiv:n}},m=({inTitle:e={},inUiClasses:t={}})=>{let{nav:n,innerDiv:r}=p();return r.appendChild(u({inHeading:e.text,inHtmlId:e.htmlId})),r.appendChild(d()),r.appendChild(f({inUlClass:t?.ulClass})),n},h=(e={})=>{let t=document.getElementById(`header`);if(!t)return;t.appendChild(m({inTitle:e.title,inUiClasses:e.uiClasses}));let n=document.getElementById(`menu`);(e.items||[]).forEach(e=>{let t={liClass:`md:text-center`,aClass:`${e?.uiClasses?.aClass} flex justify-between items-center
        bg-gray-700 px-4 py-2 rounded-md
        hover:bg-gray-600
        active:bg-gray-500 active:scale-95
        transition-all duration-150
        md:flex-col md:justify-center md:items-center
        lg:bg-transparent lg:px-2 lg:py-1`,spanClass:`ml-3 text-right w-full text-base
        md:w-auto md:text-center md:ml-0 lg:text-lg`,svgClass:`text-gray-300 w-6 h-6 lg:w-7 lg:h-7`},r=l({inTextToShow:e.text,inHtmlId:e.id,inIconPaths:e.icon,inHref:e.href,onClick:e.onClick,inTableName:e.tableName,inClasses:t,inSvgName:e.svgName});n.appendChild(r)})};(async()=>{window.KSHeaderVersion=`v3.5`,window.KSHeader=h})()});