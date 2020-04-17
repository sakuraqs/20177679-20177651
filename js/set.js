var i=0;
var times=0;//生成树的次数
var n=0,m=0;//家族树数
var treeNum=[];//导师节点数组
var intarea;//文本域内容
var Arr;//按行分割
var Arr2;//学生名按顿号分割
var data;
var ssnodes;
var searchObj;
var before,behind;//xxxx级xx；学生
var zNodes=[{menuName:"导师" ,open:true}];
var zzNodes=[{menuName:"0" ,open:true}];
var searnodes=[{menuName:"0" ,open:true}];
zNodes[0].isParent=true;

var setting = {
    data: {
        simpleData: { //简单数据模式
            enable: true, //true 、 false 分别表示 使用 、 不使用 简单数据模式
            idKey: "id", //节点数据中保存唯一标识的属性名称
            pIdKey: "parentId", //节点数据中保存其父节点唯一标识的属性名称  
            rootPId: 0 //用于修正根节点父节点数据，即 pIdKey 指定的属性值
        },
        key: {
            name: "menuName" //zTree 节点数据保存节点名称的属性名称  默认值："name"
        }
    },
    view: {
        dblClickExpand: true, //双击节点时，是否自动展开父节点的标识
        showLine: true, //是否显示节点之间的连线
        fontCss: { 'color': 'black', 'font-weight': 'bold' }, //字体样式函数
        selectedMulti: true //设置是否允许同时选中多个节点
    },
    edit: {
        enable: true,
        editNameSelectAll: true,
        showRemoveBtn: true,
        showRenameBtn: true,
        removeTitle: "remove",
        renameTitle: "rename"
    },
    check: {
        enable: false, //true 、 false 分别表示 显示 、不显示 复选框或单选框
        nocheckInherit: true //当父节点设置 nocheck = true 时，设置子节点是否自动继承 nocheck = true 
    },
};
function toLine(){
        intarea=$("#texts").val();
        Arr=intarea.split(/[(\r\n)\r\n]+/);
}

function teacherNum(){
        for(var t=0;t<Arr.length;t++){
            var temp = new String(Arr[t]);
            if(temp.includes("导师")){
                treeNum[n]=t;
                n++;
            }
        }
        treeNum[n]=Arr.length;
}

function moveplace(){
    if(n==1){
        $("#treediv1").removeClass("treed");
        $("#treediv1").addClass("onetree");
    }
    else if(n==2){
        $("#treediv1").removeClass("treed");
        $("#treediv1").addClass("twotree");
        $("#treediv2").removeClass("treed");
        $("#treediv2").addClass("twotree");
    }
    else if(n==3){
        $("#treediv1").removeClass("treed");
        $("#treediv1").addClass("threetree");
        $("#treediv2").removeClass("treed");
        $("#treediv2").addClass("threetree");
        $("#treediv3").removeClass("treed");
        $("#treediv3").addClass("threetree");
    }
}

function getSname(x){
        var ss=new String(x);
        var k=ss.indexOf("：");
        before=ss.substring(0,k);
        behind=ss.substring(k+1,ss.length);
        Arr2=behind.split("、");
}


function secondLayer(first,last){
    for(var ii=first+1;ii<last;ii++){
        getSname(Arr[ii]);//提取学生名进Arr2
        zNodes=zTreeObj.getNodes();
        zTreeObj.selectNode(zNodes[0]);
        var parentZNode=zTreeObj.getSelectedNodes(); 
        zTreeObj.addNodes(parentZNode[0], [{menuName:before}], true);
        zTreeObj.expandAll(true); 
    }
    zzNodes=zTreeObj.getNodes()[0].children;
}
function thirdLayer(first,last){
    var iii=0;
    for(var ii=first+1;ii<last;ii++){//二级数
        getSname(Arr[ii]);//提取学生名进Arr2
        zTreeObj.selectNode(zzNodes[iii]);
        var parentZNode = zTreeObj.getSelectedNodes();
        for(var jj=0;jj<Arr2.length;jj++)
            zTreeObj.addNodes(parentZNode[0], [{menuName:Arr2[jj]}], true);
        zTreeObj.expandAll(true); 
        iii++;
    }
}