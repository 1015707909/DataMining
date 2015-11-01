
/**
 * 配置echarts相关系数
 */
require.config({
			paths: {
				echarts: 'echarts/build/dist'
			}
		});
		//使用
		require(
			[
				'echarts',
				'echarts/chart/wordCloud'  //使用柱状图引入bar
			],
			function (ec){
				//基于准备好的dom，初始化echarts图表
				var myChart = ec.init(document.getElementById("wordCloudDom"));
				
				var nameList=['addwwee','beedffe','cssefev','deedxse'];
                var valueList=[1000,500,250,66];
                
                /**
                 * 构造echarts对象，配置相关属性
                 */
                myChart.showLoading({
                    text:"正在拼命加载数据..."
                });
                var option;
				option = {

                    title: {
                        text: '字符云',
                        textStyle:{
                            color:'white'
                        }
                    },
                    toolbox:{
                        show:true,
                        feature:{
                            restore:{show:true,title:'重置'},
                            saveAsImage:{show:true}      
                        }
                    },
                    tooltip: {
                        trigger:'item',
                        enterable:true,
                        show: false
                    },
                    series: [{
                        name: 'Google Trends',
                        type: 'wordCloud',
                        size: ['100%', '100%'],
                        textRotation : [0 , 30, 45, 60, 90, -60, -45, -30],
                        textPadding: 3,//两个词的间距
                        tooltip:{
                            trigger:'item',
                            show:true,
                            enterable:true,
                            formatter:function(a){
                                var line = "";
                                line = "name:" + a.data.name + "<br/>";
                                line = line + "value:" + a.data.value;
                                return line;
                            }
                        },
                        autoSize: {
                            enable: true,
                            //minSize: 14
                        },
                        data: [
                            // {// value必须降序排列，否则显示混乱
                            //     name:nameList[1],
                            //     value:valueList[1],
                            //     itemStyle:{
                            //         normal:{color:'black'}
                            //     }
                            // },
                            // {
                            //     name:nameList[2],
                            //     value:valueList[2],
                            //     itemStyle:createRandomItemStyle()
                            // },
                            // {
                            //     name: nameList[3],
                            //     value: valueList[3],
                            //     itemStyle:createRandomItemStyle()
                            // }
                        ]
                    }]//series
                };//option
				
                
                $.ajax({
                    //type: "GET",
                    url: "ResultFeature",
                    dataType: "text",
                    error: function(xhr){alert(xhr.responseText);},
                    success: function(data) {
                        var fileData = data.split("\n");
                        for (var i = 0;i < fileData.length;i++){
                            fileData[i] = fileData[i].split(/\s+/);//每个fileData元素就是一行数据
                        }

                        //将数据加入到Echarts对象中
                        for (var k = 0;k < fileData.length;k++){
                            for (var j = 1;j < fileData[k].length;j++){
                                //alert(fileData[k].length);
                                option.series[0].data.push({
                                    name:fileData[k][j],
                                    value:100,
                                    itemStyle:createRandomItemStyle()
                                });
                            }
                        }
                        myChart.hideLoading();
                        //加载对象到图表中
                        myChart.setOption(option);

                    }
                });
                
                (function(){//添加点击事件
                    myChart.on('click',onClickWord)
                })();

            }
);	


/**
 * 生成随机的字体颜色
 */
 function createRandomItemStyle() {
     return {
         normal: {
             color: 'rgb(' + [
                 Math.round(Math.random() * 160),
                 Math.round(Math.random() * 160),
                 Math.round(Math.random() * 160)
                 ].join(',') + ')'
         }
     };
}

/**
 * 测试用方法
 * 生成随机字符串
 */
function randomString(len) {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (var i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}

/**
 * 字符点击响应函数
 */
function onClickWord(t){
    alert(t['name']);
}
