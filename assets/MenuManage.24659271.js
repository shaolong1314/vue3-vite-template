import{c as e,a1 as a,E as l,a as t,b as s,d as i}from"./index.d67139b1.js";import{u as o,E as n,a as r,b as E}from"./useTable.1f0f5517.js";import{e as d,o as f,M as c,a1 as p,$ as u,a2 as _,u as S,_ as z,ah as L,a3 as m,c as k,X as w}from"./ElementPlusIcon.f59e35ee.js";import{E as h}from"./index.8ce8e4ea.js";import"./Mock.ac08a398.js";import"./Particles.1a7246e5.js";const b={class:"page-container"},M=L("查询"),y=L("刷新"),P={class:"page-content"},T={class:"page-content-btns"},I=L("新增菜单"),U={class:"page-content-table"},N=L("目录"),Z=L("菜单"),g=L("按钮"),v=L("是"),C=L("否"),x=L("是"),j=L("否"),V=L("查看"),D=L("修改"),A=L("删除"),R={__name:"MenuManage",setup(R){const{searchData:X,tableData:$,onReset:q,onSearch:B}=o(a),F=d(!1),G=d([]);return(a,o)=>{const d=l,R=t,H=s,J=i,K=n,O=r,Q=h,W=E;return f(),c("div",b,[p(K,null,{default:u((()=>[p(J,{inline:!0,onSubmit:o[2]||(o[2]=_((()=>{}),["prevent"])),model:S(X),size:S(e).ELEMENT_PLUS.SIZE},{default:u((()=>[p(R,{label:"菜单名称"},{default:u((()=>[p(d,{modelValue:S(X).name,"onUpdate:modelValue":o[0]||(o[0]=e=>S(X).name=e),placeholder:"请输入",clearable:"",size:S(e).ELEMENT_PLUS.SIZE},null,8,["modelValue","size"])])),_:1}),p(R,null,{default:u((()=>[p(H,{type:"primary",onClick:o[1]||(o[1]=e=>S(B)()),size:S(e).ELEMENT_PLUS.SIZE},{default:u((()=>[M])),_:1},8,["size"]),p(H,{size:S(e).ELEMENT_PLUS.SIZE,onClick:S(q)},{default:u((()=>[y])),_:1},8,["size","onClick"])])),_:1})])),_:1},8,["model","size"])])),_:1}),z("div",P,[z("div",T,[p(H,{type:"primary",size:S(e).ELEMENT_PLUS.SIZE,onClick:o[3]||(o[3]=e=>{})},{default:u((()=>[I])),_:1},8,["size"])]),z("div",U,[p(W,{data:S($),ref:"contentTable","row-key":"menu_id","default-expand-all":F.value,size:S(e).ELEMENT_PLUS.SIZE,"expand-row-keys":G.value,"tree-props":{children:"children",hasChildren:"hasChildren"},height:"100%"},{default:u((()=>[p(O,{"show-overflow-tooltip":!0,label:"菜单名称",prop:"name"}),p(O,{label:"图标",align:"center"}),p(O,{label:"排序",prop:"sort",align:"center"}),p(O,{"show-overflow-tooltip":!0,prop:"url",label:"路由地址"}),p(O,{"show-overflow-tooltip":!0,label:"权限标识"},{default:u((e=>[L(m(e.row.permission),1)])),_:1}),p(O,{"show-overflow-tooltip":!0,prop:"component_url",label:"组件路径"}),p(O,{label:"类型",align:"center",width:"100"},{default:u((a=>[1==a.row.type?(f(),k(Q,{key:0,effect:"dark",size:S(e).ELEMENT_PLUS.SIZE},{default:u((()=>[N])),_:1},8,["size"])):w("",!0),2==a.row.type?(f(),k(Q,{key:1,effect:"dark",size:S(e).ELEMENT_PLUS.SIZE},{default:u((()=>[Z])),_:1},8,["size"])):w("",!0),3==a.row.type?(f(),k(Q,{key:2,effect:"dark",size:S(e).ELEMENT_PLUS.SIZE},{default:u((()=>[g])),_:1},8,["size"])):w("",!0)])),_:1}),p(O,{label:"缓存",align:"center",width:"100"},{default:u((a=>[a.row.keepAlive?(f(),k(Q,{key:0,effect:"dark",size:S(e).ELEMENT_PLUS.SIZE},{default:u((()=>[v])),_:1},8,["size"])):(f(),k(Q,{key:1,effect:"plain",size:S(e).ELEMENT_PLUS.SIZE},{default:u((()=>[C])),_:1},8,["size"]))])),_:1}),p(O,{label:"可见",align:"center",width:"100"},{default:u((a=>[a.row.hidden?(f(),k(Q,{key:1,effect:"plain",size:S(e).ELEMENT_PLUS.SIZE},{default:u((()=>[j])),_:1},8,["size"])):(f(),k(Q,{key:0,effect:"dark",size:S(e).ELEMENT_PLUS.SIZE},{default:u((()=>[x])),_:1},8,["size"]))])),_:1}),p(O,{label:"操作",width:"300px",align:"center",fixed:"right"},{default:u((a=>[p(H,{size:S(e).ELEMENT_PLUS.SIZE,onClick:e=>{a.row},type:"primary"},{default:u((()=>[V])),_:2},1032,["size","onClick"]),p(H,{class:"m10",size:S(e).ELEMENT_PLUS.SIZE,onClick:e=>{a.row}},{default:u((()=>[D])),_:2},1032,["size","onClick"]),p(H,{class:"m10",size:S(e).ELEMENT_PLUS.SIZE},{default:u((()=>[A])),_:1},8,["size"])])),_:1})])),_:1},8,["data","default-expand-all","size","expand-row-keys"])])])])}}};export{R as default};
