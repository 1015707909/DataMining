
/**
*响应当用户输入词后点击搜索的事件 
*/
function onClickSearch(word){
	/*var sard = document.getElementById("inputWord").value;*/
	if (word != '')
	{
		// alert(word);
		var files = getFileList(word);
		if(files == '\n'){
			alert('关键词错误，请重新输入');
		}else{
			var filesString = "\n";
			for (var i = 0;i < files.length;i++){
				filesString = filesString + files[i] + "\n";
			}
			alert(filesString);
		}
	}
	return false;    //阻止刷新页面
}


/**
* 响应用户输入后敲击enter键
*/			
function onEnterDown(word){
	
	var keyValue;
	if (window.event){//IE8及更早的版本
		keyValue = event.keyCode;
	}
	else if (window.which){ //IE9之后的IE和chrome、firfoxe等其他浏览器
		keyValue = event.which;
	}
	
	if (keyValue == 13){//如果按下是enter调用onClickSearch方法
		//alert('你按下了回车键')
		keyValue = 0;//阻止刷新页面
		onClickSearch(word);
	}
}

