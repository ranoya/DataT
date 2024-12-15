const getdata=function(t,e){fetch(t).then(t=>t.json()).then(t=>{e(t)})},getcsvdata=function(t,e){fetch(t).then(t=>t.text()).then(t=>{let n=t.length,l="",o=0;for(let i=0;i<n;i++)'"'==t.substring(i,i+1)&&o++,"\n"==t.substring(i,i+1)&&o%2!=0&&(t=l=t.substring(0,i)+" "+t.substring(i+1));let r=t.split(/\r?\n|\r|\n/g),s="",g="",u="",c="",h=r[0].split(","),a=[];for(let f=1;f<r.length;f++){a[f-1]={},s=r[f].split(/[,]{1}(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/);for(let p=0;p<s.length;p++)s[p].trim(),'"'==(u='"'==s[p].substring(0,1)?s[p].substring(1,s[p].length):s[p]).substring(u.length-2,u.length)&&(u=u.substring(0,u.length-2)),g=(c='"'==u.substring(u.length-1,u.length)?u.substring(0,u.length-1):u).replace(/""/g,'"'),a[f-1][h[p]]=g}e(a)})},gsdata=function(t,e){getcsvdata(GoogleSheetCsvURL(t),function(t){e(t)})},empty=function(t){return void 0===t||""==t||null==t},notempty=function(t){return void 0!==t&&""!=t&&null!=t},imagefromallsources=function(t){let e=t,n=t;t.match(/(\&$)/gm)&&(n=t.replace(/(\&$)/gm,"")),n.match(/https:\/\/drive\.google\.com\/open\?(.*)/i)&&(e="https://lh3.googleusercontent.com/d/"+n.match(/https:\/\/drive\.google\.com\/open\?id=(.*)/i)[1]),n.match(/https:\/\/drive\.google\.com\/file\/d/i)&&(e="https://lh3.googleusercontent.com/d/"+n.match(/https:\/\/drive\.google\.com\/file\/d\/(.*)\/view/i)[1]),n.match(/https:\/\/drive\.google\.com\/uc\?export=view/i)&&(e="https://lh3.googleusercontent.com/d/"+n.match(/id=(.*)/i)[1]);let l=n.replace(/\&amp;/gi,"&"),o=l.match(/(http:|https:|)\/\/(player.|www.|m.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);return void 0!==o&&null!=o&&(e="https://img.youtube.com/vi/"+o[6]+"/0.jpg"),l.match(/\.png|\.svg|\.jpg|\.gif|.webp/i)&&(e=l),e};imagetable=function(t,e,n){let l="",o=4,i="cover",r="1/1",s=0,g=t.length;void 0!==n&&null!=n&&""!=n&&(void 0!==n.columns&&null!=n.columns&&""!=n.columns&&(o=n.columns),void 0!==n.type&&null!=n.type&&""!=n.type&&(i=n.type),void 0!==n.proportion&&null!=n.proportion&&""!=n.proportion&&(r=n.proportion),void 0!==n.index&&null!=n.index&&""!=n.index&&(s=n.index),s>t.length&&(s=t.length),void 0!==n.size&&null!=n.size&&""!=n.size&&(g=s+n.size),g>=t.length&&(g=t.length));let u="";for(let c=0;c<o;c++)u+=" 1fr";l+=`
<style>
.datat_elemtyp05 {
display: grid;
gap: 16px 16px;
width: 100%;
}
.datat_elemtyp05 div {
background-position: top center;
}
.datat_elemtyp05 div:hover {
cursor: pointer;
}
@media screen and (max-width: 720px) {
.datat_elemtyp05 {
grid-template-columns: 1fr !important;
}
}
</style>
<div class="datat_elemtyp05 datat_imagetable" style='grid-template-columns:${u};'>`;for(let h=s;h<g;h++)l+=`<div class="datat_imagetable_images" onclick='window.open("${imagefromallsources(t[h][e])}")' style='background-repeat: no-repeat; background-size: ${i}; aspect-ratio: ${r}; background-image: url("${imagefromallsources(t[h][e])}");'></div>`;return html`${l+="</div>"}`};const googlesheet=function(t,e){return`https://opensheet.elk.sh/${t.match(/spreadsheets\/d\/(.*)\/edit/i)[1]}/${e}`},GoogleSheetCsvURL=function(t){t=new URL(t);let e=t.pathname.split("/")[3],n=new URLSearchParams(t.hash.slice(1)).get("gid")||0;return`https://docs.google.com/spreadsheets/d/${e}/export?format=csv&gid=${n}`},rescale=function([t,e],[n,l]){return function(o){return(o-t)/(e-t)*(l-n)+n}},bfilter=function(t,e){let n=[],l=0;for(let o=0;o<t.length;o++)""!=t[o][e]&&void 0!=t[o][e]&&(n[l]={},n[l]=t[o],l++);return n},cfilter=function(t,e,n){let l=[],o=RegExp(n,"i"),i=0;for(let r=0;r<t.length;r++)""!=t[r][e]&&void 0!=t[r][e]&&o.test(t[r][e])&&(l[i]={},l[i]=t[r],i++);return l};sumarray=function(t,e){let n=[],l=0;for(let o=0;o<t.length;o++)n[l]=t[o],l++;for(let i=0;i<e.length;i++)n[l]=e[i],l++;return n},sumarrayc=function(t,e){let n=[],l=0;for(let o=0;o<t.length;o++)n[l]=t[o],l++;for(let i=0;i<e.length;i++)n[l]=e[i],l++;let r=[];for(let s=0;s<n.length;s++)for(let g in n[s])r[g]=!0;let u=[],c=0;for(let h in r)u[c]=h,c++;let a=[];for(let f=0;f<n.length;f++){a[f]={};for(let p=0;p<u.length;p++)void 0===n[f][u[p]]||null==n[f][u[p]]||""==n[f][u[p]]?a[f][u[p]]="":a[f][u[p]]=n[f][u[p]]}return a};const unique=function(t,e){let n=[];for(let l=0;l<t.length;l++)n[t[l][e]]=0;let o=[];for(let i in n)o.push(i);return o},sortbylist=function(t,e,n){let l=[];for(let o=0;o<e.length;o++)for(let i=0;i<t.length;i++)t[i][n]==e[o]&&l.push(t[i]);return l},alphabetic=function(t,e){let n=unique(t,e);return n.sort(),sortbylist(t,n,e)},tags=function(t,e,n){let l=[],o=[];for(let i=0;i<t.length;i++){o=[],o=t[i][e].split(n);for(let r=0;r<o.length;r++)l.push(o[r])}let s=[];for(let g=0;g<l.length;g++)s[l[g]]=0;let u=[];for(let c in s)u.push(c);return u},shuffle=function(t,e){let n=[],l=0,o=!1,i=0;for(;l<e;){i=parseInt(Math.random()*t),o=!1;for(let r=0;r<n.length;r++)i==n[r]&&(o=!0);!o&&(n[n.length]=i,l++)}return n},select=function(t,e,n){let l=[];for(let o=0;o<t.length;o++)e(l,t[o],n);return l},patterncheck=function(t,e,n){let l=!1;for(let o=0;o<Object.keys(e).length;o++)n.test(e[Object.keys(e)[o]])&&(l=!0);l&&t.push(e)},selectp=function(t,e){return select(t,patterncheck,e)},multipatterncheck_add=function(t,e,n){if(""!=n||void 0!==n){let l=!1,o=n.split(" "),i="";for(let r=0;r<o.length;r++)for(let s=0;s<Object.keys(e).length;s++)(i=RegExp(o[r],"i")).test(e[Object.keys(e)[s]])&&(l=!0);l&&t.push(e)}else t.push(e)},selecta=function(t,e){return select(t,multipatterncheck_add,e)},multipatterncheck_exclude=function(t,e,n){if(""!=n||void 0!==n){let l=n.split(" "),o="",i=[],r=!0;for(let s=0;s<l.length;s++)i[l[s]]=!1;for(let g=0;g<Object.keys(e).length;g++)for(let u=0;u<l.length;u++)(o=RegExp(l[u],"i")).test(e[Object.keys(e)[g]])&&(i[l[u]]=!0);for(let c=0;c<l.length;c++)!1==i[l[c]]&&(r=!1);r&&t.push(e)}else t.push(e)},selecte=function(t,e){return select(t,multipatterncheck_exclude,e)};let omnifdados=[],omnifilterfetchdata=function(t,e){fetch(t).then(t=>t.json()).then(t=>{startomnifilter(t,e,omnifilter)})},omnifilterfetchcsvdata=function(t,e){fetch(t).then(t=>t.text()).then(t=>{let n=t.length,l="",o=0;for(let i=0;i<n;i++)'"'==t.substring(i,i+1)&&o++,"\n"==t.substring(i,i+1)&&o%2!=0&&(t=l=t.substring(0,i)+" "+t.substring(i+1));let r=t.split(/\r?\n|\r|\n/g),s="",g="",u="",c="",h=r[0].split(","),a=[];for(let f=1;f<r.length;f++){a[f-1]={},s=r[f].split(/[,]{1}(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/);for(let p=0;p<s.length;p++)s[p].trim(),'"'==(u='"'==s[p].substring(0,1)?s[p].substring(1,s[p].length):s[p]).substring(u.length-2,u.length)&&(u=u.substring(0,u.length-2)),g=(c='"'==u.substring(u.length-1,u.length)?u.substring(0,u.length-1):u).replace(/""/g,'"'),a[f-1][h[p]]=g}startomnifilter(a,e,omnifilter)})},startomnifilter=function(t,e,n){console.log("Omnifilter: fetch finished"),console.table(t),document.getElementById(e).addEventListener("input",function(e){n(select(t,multipatterncheck_exclude,this.value))}),console.log("Omnifilter: filtering event listener started");n(select(t,multipatterncheck_exclude,""))};