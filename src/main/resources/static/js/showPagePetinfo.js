//一般直接写在一个js文件中

/*===========================js表头业务==========================================*/
layui.use(['jquery','layer','table','form','laydate'], function(){
    var  $ = layui.jquery    //引入jquery模块
        layer = layui.layer  //引用layer弹出层模块
        ,table = layui.table //引用table表单模块
        ,form = layui.form  //引用form数据表格模块
        ,laydate = layui.laydate;  //引用日期模块

    //执行一个laydate实例
    laydate.render({
        elem: '#birthday' //指定元素的id
        ,type:'datetime'  //日期格式
        ,format:'yyyy/MM/dd HH:mm:ss'  //日期字符串格式
        ,value:new Date()  //默认值为当前时间
        ,calendar: true
    });

    //执行一个修改laydate实例



    /*========================分页动态查询业务===================================================================================*/
      //定义查询的条件
    var selJsonPet = {};

    //全局变量，当前页初始值为1
    var currentPage = 1;

    //初始化宠物类型数据
    loadBreedInfo();

    //初始化宠物分页数据
    loadPetInfoPage();


    function  loadPetInfoPage() {
        table.render({  //数据表格的数据渲染
             elem: '#table01'  //绑定容器  根据标签（数据容器）的id属性来
            , height: 412   //容器高度        
            , width: 1300
            ,where: selJsonPet //异步数据接口的额外参数，要查询的条件参数（格式为JSON）
            , limit: 5
            , limits: [2, 5, 8, 10, 15]
            , url: '/petInfo/loadPageByPramas' //访问服务器端的数据接口(异步请求)，返回的json格式的数据
            ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
            ,defaultToolbar: ['filter', 'exports', 'print', /*{ //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
                title: '提示'
                ,layEvent: 'LAYTABLE_TIPS'
                ,icon: 'layui-icon-tips'
            }*/]
            , even: true //页面渐变
            , page: true //开启分页
            , cols: [[
                //加入复选框列
                {type: 'checkbox'}
                //title: 'ID'位列名，width:150：列宽，sort: true开启排序
                , {field: 'petid', title: '宠物编号', align: 'center', width: 150, sort: true}
                , {field: 'petname', title: '宠物姓名', align: 'center', width: 150}
                , {field: 'petsex', title: '性别', align: 'center', width: 50,templet: '#sexTpl'}
                , {field: 'birthday', title: '出生时间', align: 'center', width: 200, sort: true}
                , {field: 'description', title: '宠物描述', align: 'center', width: 260, sort: true}
                , {field: 'breedname', title: '宠物类型名称', align: 'center', width: 150, templet: '<div>{{d.breedinfo.breedname}}</div>'}
                //自定义工具条列
                , {title: '操作', align: 'center', toolbar: '#barDemo', width: 150}
            ]],
            done:function (res, curr, count) {  //执行分页是的函数回调；res为分页时服务器端的整个Map集合数据  curr为当前页  count为总的数据条数
                //将当前页数据赋值给当前页的全局变量
                currentPage = curr;
            }
        });
    }
    //监听条件查询的提交（监听submit的提交）
    form.on('submit(submit01)', function(data){  //demo为按钮的lay-filter="demo1"属性中的值
        selJsonPet = data.field;//当前容器的全部表单字段，名值对形式：{name: value}
        console.log(selJsonPet);  //得到的JSON数据中的key值为输入标签的name属性值
        //执行条件查询 得到的JSON数据中的value值为用户填入的值
        loadPetInfoPage();
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //加载宠物类型数据
    function loadBreedInfo(){
        $.ajax({
            type:'POST',
            url:'/breedinfo/loadAll',
            dataType:'JSON',
            success:function (data) {
                var breedInfoStr = '<option value="0" selected>--请选择类型--</option>';
                var updPetStr = '<option value="" id="optPet" selected>--请选择类型--</option>';
                $.each(data,function (i,breedinfo) {
                    breedInfoStr += '<option value="'+breedinfo.breedid+'">'+breedinfo.breedname+'</option>';
                    //因为要进行页面缓存更新，需要动态使用部门名称及地址数据
                    /*第一种方式*/
                    updPetStr += '<option value="'+breedinfo.breedid+'">'+breedinfo.breedname+'</option>';
                    /*第二种方式*/
                  // updPetStr += '<option value="'+breedinfo.breedid+','+breedinfo.breedname+','+'">'+breedinfo.breedname+'</option>';
                });
                $("#selBreed").html(breedInfoStr);
                $("#saveBreedId").html(breedInfoStr);//此时我们使用的是UI框架
                $("#updBreedId").html(updPetStr);
                form.render('select');  //渲染下拉框（只要有数据更新则需要渲染更新页面缓存）

            },
            error:function () {
                layer.msg("服务器异常！！！");
            }
        });
    }
/*=============================单个删除与修改业务=====================================================================*/
    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）根据获取的值判断执行编辑或者删除操作
        var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

        if(layEvent === 'del'){ //删除
            layer.confirm('真的删除行么？', function(index){
                //向服务端发送删除指令，执行单个删除操作
                delByPetid(obj);
                layer.close(index);  //关闭当前弹框
            });
        } else if(layEvent === 'edit') { //修改
            //1.1.回显要修改的员工原有数据
            form.val("updPetFormFilter", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                "petid": data.petid
                , "petname": data.petname
                , "petsex": data.petsex
                , "birthday": data.birthday
                , "description": data.description
                /*第一种方式*/
                , "breedid": data.breedid
                /*第二种方式*/
               // , "breedid": data.breedinfo.breedid+','+data.breedinfo.breedname

            });
            //回显宠物数据
            /*/!*第二种方式*!/
             $("#optPet").replaceWith('<option value="'+data.breedinfo.breedid+','+data.breedinfo.breedname+','+'" id="optPet" selected>'+data.breedinfo.breedname+'</option>');
             form.render('select');  //渲染下拉框（只要有数据更新则需要渲染更新页面缓存）
            */
            //1.2.弹出修改界面
            layer.open({
                type: 1,  //弹出类型
                title: "宠物修改界面",  //弹框标题
                area: ['480px', '520px'],  //弹框款高度
                anim: 3,  //弹出的动画效果
                shade: 0.5,  //阴影遮罩
                content: $("#updPetInfoDiv")  //弹出的内容
            });
            //2.点击修改提交，完成表单的修改
            form.on('submit(demo2)', function (updData) {
                //执行修改
                updPetInfo(updData.field, obj);
                layer.closeAll(); //关闭当前页面中所有弹框
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });
        }
    });

    //根据员工编号删除单个员工数据
    function delByPetid(obj) {
        $.ajax({
            type:'POST',
            url:'/petInfo/delByPrimaryKey',
            data:{"id":obj.data.petid},
            success:function (data) {
                if(data=="success"){
                    //icon: 1弹出信息的图标类型（0-7）；time:2000弹出时间2s；anim: 4弹出方式（0-6）；shade:0.5背景颜色深浅（0-1）
                    layer.msg("删除成功。。", {icon: 1,time:2000,anim: 4,shade:0.5});
                    obj.del(); //删除对应行（tr）的DOM结构，并更新页面缓存
                }else {
                    layer.msg("删除失败！！", {icon: 2,time:2000,anim: 3,shade:0.5})
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 6,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //数据修改
    function updPetInfo(updJsonPet,obj) {
        //第二种方式
       /*var arrBreed = updJsonPet.breedid.split(",");  //得到宠物属性值的数组
       updJsonPet['breedid'] = arrBreed[0]  //重新装入宠物id，用于服务器端修改*/
        $.ajax({
            type:'POST',
            url:'/petInfo/updByPrimaryKeySelective',
            data:updJsonPet,
            success:function (data) {
                if(data=="success"){
                    layer.msg("宠物数据修改成功。。", {icon: 1,time:2000,anim: 4,shade:0.5});
                    //3.服务器端数据库中的数据修改成功后再去更新页面缓存对应的值
                    obj.update({
                        petname: updJsonPet.petname
                        ,petsex: updJsonPet.petsex
                        ,birthday: updJsonPet.birthday
                        ,description: updJsonPet.description
                    });
                    //通过jquery来改部门信息
                    /*//第二种方式
                    obj.tr.children().eq(6).find('div').text(arrBreed[1]);*/


                      //第一种方案 //数据表格重载      缺点就是增加服务器的访问次数！！
                       table.reload('table01', {  //demo为table表格容器id
                           page: {
                               curr: currentPage //重新从第 currentPage(当前页) 页开始
                           }
                       }); //只重载数据

                }else {
                    layer.msg("宠物数据修改失败！！", {icon: 2,time:2000,anim: 3,shade:0.5})
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 6,time:2000,anim: 6,shade:0.5});
            }
        });
    }

/*============================批量删除与添加业务==========================================================================================*/
    //头工具栏事件
    table.on('toolbar(test)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'delBatchOrders':
                var data = checkStatus.data;  //获取选中行的数据
                if(checkStatus.data.length!==0){ //获取选中行数量，可作为是否有选中行的条件
                    layer.confirm('真的批量删除选中数据么？', function(index) {  //询问是否删除
                        var petids = '';  //定义员工编号的字符串
                        for (var i = 0; i < data.length; i++) {  //通过循环获取多个员工编号拼接在字符串中
                            petids += data[i].petid + ",";  //拼接
                        }
                        //去掉最后一个逗号
                        petids = petids.substring(0, petids.length - 1);
                        //向服务器端发送批量删除异步请求
                        delBatchPetinfopetids(petids);
                        layer.close(index);  //关闭当前弹框
                    });
                }else {
                    layer.msg("你还未选中宠物数据！！！",{icon: 7,time:2000,anim: 6,shade:0.5});
                }
                break;
            case 'savePetBtn':
                //添加
               // $("#savePetBtn").click(function () {
                    //清空上一次添加表单中的数据
                    $("#savePetInfoForm").find("input").not(":radio").val("");
                    //1.弹出添加页面
                    layer.open({
                        type:1,  //弹出类型
                        title:"宠物添加界面",  //弹框标题
                        area:['480px','520px'],  //弹框款高度
                        anim: 4,  //弹出的动画效果
                        shade:0.5,  //阴影遮罩
                        content:$("#savePetInfoDiv")  //弹出的内容
                    });
                //2.监听表单的提交按钮完成添加（监听submit的提交）
                form.on('submit(formDemo)', function(data){
                    //执行添加
                    savePetInfo(data.field);
                    console.log(data);
                    layer.closeAll(); //关闭当前页面中所有弹框
                    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                });
                break;
        }
    });
         //批量删除
    function delBatchPetinfopetids(petids){
        $.ajax({
            type:'POST',
            url:'/petInfo/delBatchByIds',
            data:{"ids":petids},  //1001,1002,1003自动在控制器中转为[1001,1002,1003]
            success:function (data) {
                if(data=="success"){
                    //icon: 1弹出信息的图标类型（0-7）；time:2000弹出时间2s；anim: 4弹出方式（0-6）；shade:0.5背景颜色深浅（0-1）
                    layer.msg("批量删除成功。。", {icon: 1,time:2000,anim: 4,shade:0.5});
                    //重新加载员工数据，停留在当前页的条件查询
                    //数据表格重载
                    table.reload('table01', {  //demo为table表格容器id
                        page: {
                            curr: currentPage //重新从第 currentPage(当前页) 页开始
                        }
                    }); //只重载数据
                }else {
                    layer.msg("批量删除失败！！", {icon: 2,time:2000,anim: 3,shade:0.5})
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 6,time:2000,anim: 6,shade:0.5});
            }
        });
    }



/*================================添加业务=======================================================================================================*/
    //添加
    function savePetInfo(saveJsonPet) {
        $.ajax({
            type:'POST',
            url:'/petInfo/save',
            data:saveJsonPet,
            success:function (data) {
                if(data=="success"){
                    layer.msg("宠物数据添加成功。。", {icon: 1,time:2000,anim: 4,shade:0.5});
                    //数据表格重载,回到第1页完成没有条件的查询，看到添加的数据
                    //数据表格重载
                    table.reload('table01', { //demo为table表格容器id
                        page: {
                            curr: 1 //重新从第 1(当前页) 页开始
                        }
                    });
                }else {
                    layer.msg("宠物数据添加失败！！", {icon: 2,time:2000,anim: 3,shade:0.5})
                }
            },
            error:function () {
                layer.msg("服务器异常！！！",{icon: 6,time:2000,anim: 6,shade:0.5});
            }
        });
    }
});
