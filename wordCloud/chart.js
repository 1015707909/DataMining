require.config({
			paths: {
				echarts: 'echarts/build/dist'
			}
		});
		//使用
		require(
			[
				'echarts',
				'echarts/chart/force'  //使用柱状图引入bar
			],
			function (ec){
				//基于准备好的dom，初始化echarts图表
				var myChart1 = ec.init(document.getElementById("echartsDom"));
				var nameString=['a','b','c','d'];
				
				myChart1.showLoading({text:'正在努力读取数据...'});
				myChart1.hideLoading();
				
				var option = {
					title:{ //标题
						show:true,
						text:'热词展示:力导图',
						//显示位置
						x:'left',
						y:'bottom',
						//标题字体格式
						textstyle:{fontSize:14}
					},
					
					tooltip:{//气泡提示框
						trigger: 'item',
						enterable:true ,      //是否可进入
						//formatter:
						formatter: '{c} : {b}'
						
					},
					
					legend:{
						x:'left',
						data:[]
					},
					
					toolbox:{//工具箱
						show:true,
						feature:{
							restore:{show:true},   //还原按钮
							dataView:{show:true},    //数据视图
							saveAsImage:{show:true}   //保存为图片
						}
					},
					
					series:[{//图表参数
						type:"force",
						ribbonType: false,
						itemStyle:{
							normal:{//默认
								label:{
									show:true,
									textstyle:{color:'#333'}	
								},
								nodeStyle:{//节点样式
									brushType : 'both',
									borderColor:'rgba(255,215,0,0.4)',
									borderWidth:1
								},
								linkStyle:{type:'curve'}
							},
							emphasis:{
								label:{show:false},
								nodeStyle:{},
								linkStyle:{}
							}
						},//intemStyle
						useWorker:false,
						//圆半径
						minRadius:20,
						maxRadius:60,
						//控制分散度
						gravity: 1.1,
            			scaling: 1.1,
						roam:'true' , //鼠标手势：滚轮缩放，拖拽漫游
						nodes:[],
						links:[]
					}]  //series
				};//option
				
				//动态增加数据
				for (var i=1;i<5;i++){
					option.series[0].nodes.push({category:i, name: 'test'+nameString[i-1],value : i*i});	
				}
				//为echarts对象加载数据
				myChart1.setOption(option);
				
			}
		);	