// 当网页加载完毕之后出发onload事件
window.onload = function() {
	prepareGallery();
	countBodyChildren();
};

// 展示图片函数
// @whichPic 超链接节点
// return true;
function showPic(whichPic) {
	// 检查是否有placeholder
	if (!document.getElementById("placeholder")) {
		return false;
	}

	// 切换图片
	var source = whichPic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src", source);

	// 切换文字
	if (document.getElementById("description")) {
		var text = whichPic.getAttribute("title");
		var description = document.getElementById("description");
		description.firstChild.nodeValue = text;
	}

	return true;
}

// 图片库预处理函数
function prepareGallery() {
	// 如果没有以下方法，不执行后续程序
	if (!document.getElementsByTagName) {
		return false;
	}
	if (!document.getElementById) {
		return false;
	}
	if (!document.getElementById("imagegallery")) {
		return false;
	}
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			// this 代表 links[i]
			// 如果showPic返回true,我们就返回false，浏览器不会打开那个链接
			return !showPic(this);      
		};
	}
}

// 计算body中的子节点函数
function countBodyChildren() {
	var body_element = document.getElementsByTagName("body")[0];
	console.log(body_element.childNodes.length);
}