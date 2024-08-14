//Làm sự kiện Active khi mình click thì nó active được( đánh dấu biết được mình đang ở Tabs nào)
const $ = document.querySelector.bind(document); //Lấy ra 1
const $$ = document.querySelectorAll.bind(document); //Lấy ra nhiều

const tabs = $$(".tab-item");
const tabpane = $$(".tab-pane");
//console.log(tabs,tabs); //Thử xem đã lấy được chưa

const tabActive = $(".tab-item.active");
const line = $(".tabs .line");
console.log(line);
line.style.left = tabActive.offsetLeft + "px";
line.style.width = tabActive.offsetWidth + "px";

tabs.forEach((tab, index) => {
  const pane = tabpane[index];

  tab.onclick = function () {
    //console.log(pane); Kiểm tra xem khi click thì nó có hiện ra thg pane hay không
    //Kiểm tra xem có thg nào đang activeko, có thì bỏ nó đi
    $(".tab-item.active").classList.remove("active");
    $(".tab-pane.active").classList.remove("active");

    line.style.left = this.offsetLeft + "px";
    line.style.width = this.offsetWidth + "px";

    // console.log(this); Thử xem đã lấy ra được cái element mình đã click được hay chưa
    this.classList.add("active"); //Thêm active vào mỗi khi mình click
    pane.classList.add("active");
  };
});
