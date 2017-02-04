// 当网页加载完毕之后出发onload事件
// window.onload = function() {
// 	prepareGallery();
// 	countBodyChildren();
// };

/* addLoadEvent 网页事件预加载函数
* @func 将要被调用的函数
*/
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		};
	}
}

/* insertAfter 在一个已有元素后面插入一个新元素函数
* @newElement 新元素
* @targetElement 目标元素
*/
function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild === targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSilbing);
	}
}

// preparePlaceholder 图片库占位节点预处理函数 
function preparePlaceholder() {
	// 检查一下方法是否存在，保证平稳退化
	if (!document.createElement) {
		return false;
	}
	if (!document.createTextNode) {
		return false;
	}
	if (!document.getElementById) {
		return false;
	}
	if (!document.getElementById("imagegallery")) {
		return false;
	}

	// 创建img元素，并添加id、src、alt属性
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("src", "images/placeholder.png");
	placeholder.setAttribute("alt", "my image gallery");

	// 创建description元素，并添加id属性
	var description = document.createElement("p");
	description.setAttribute("id", "description");
	
	// 创建desctext文本元素
	var desctext = document.createTextNode("Choose an image");
	description.appendChild(desctext);

	// 调用insetAfter函数
	var gallery = document.getElementById("imagegallery");
	insertAfter(placeholder, gallery);
	insertAfter(description, placeholder);
}

// prepareGallery 图片库预处理函数
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
			// 如果showPic返回true,我们就返回false，浏览器不会打开那个链接 x
			return showPic(this) ? false : true;
		};
	}
}

// showPic 展示图片函数
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

	// 检查placeholder的nodeName是否是IMG
	if (placeholder.nodeName != "IMG") {
		return false;
	}
	placeholder.setAttribute("src", source);

	// 切换文字
	if (document.getElementById("description")) {
		var text = whichPic.getAttribute("title") ? whichPic.getAttribute("title") : "";
		var description = document.getElementById("description");

		// 是否是文本节点
		if (description.firstChild.nodeType === 3) {
			description.firstChild.nodeValue = text;
		}
	}

	return true;
}

// 调用addLoadEvent
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

// countBodyChildren 计算body中的子节点函数
// function countBodyChildren() {
// 	var body_element = document.getElementsByTagName("body")[0];
// 	console.log(body_element.childNodes.length);
// }