window.onload = countBodyChildren;

// 展示图片
// @whichPic 超链接节点
function showPic(whichPic) {
	// 切换图片
	var source = whichPic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src", source);

	// 切换文字
	var text = whichPic.getAttribute("title");
	var description = document.getElementById("description");
	description.firstChild.nodeValue = text;
}

// 计算body中的子节点
function countBodyChildren() {
	var body_element = document.getElementsByTagName("body")[0];
	console.log(body_element.childNodes.length);
}