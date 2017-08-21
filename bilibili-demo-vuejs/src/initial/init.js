function setHtmlFont () {
  // 限定 html 的字体比例，其他内容尺寸根据 html 的大小进行限定
  // 以iPhone5时，50px 为基准
  let windowW = window.innerWidth ? window.innerWidth : document.body.clientWidth
  let scale = windowW / 320
  let winFont = 20 * scale
  document.documentElement.style.fontSize = winFont + 'px'
}
setHtmlFont()
window.addEventListener('resize', () => {
  setHtmlFont()
}, false)
