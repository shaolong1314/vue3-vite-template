import{r as g,a as p,H as f}from"./index-cf262af7.js";function y(s,r){let o={};r&&r.constructor==Object&&(o=r);const t=g({}),e=g({total:0,page:1,pageSize:10,sizes:[10,20,30,40,50]}),i=p([]),a=n=>{if(!s||typeof s!="function"){i.value=[],e.total=0;return}s(n).then(c=>{if(c&&c.code==200){const{total:l,data:u}=c;i.value=u,e.total=l||0}})};return f(()=>{a({...t,...e,...o})}),{searchData:t,pagination:e,tableData:i,getTableList:a,sizeChange:n=>{e.page=1,e.pageSize=n,a({...t,...e,...o})},currentChange:n=>{e.page=n,a({...t,...e})},onReset:()=>{Object.keys(t).forEach(c=>{t[c]=""}),e.total=0,e.page=1,e.pageSize=10,e.sizes=[10,20,30,40,50],a({...t,...e,...o})},onSearch:()=>{e.page=1,e.pageSize=10,a({...t,...e,...o})}}}export{y as u};
