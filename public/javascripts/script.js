// reference : https://bytutorial.com/blogs/javascript/simple-way-detecting-if-a-page-has-a-scroll-bar
if (window.innerWidth > document.body.clientWidth) {
    window.onscroll = function() {scrollFunction()};
}
else {
    document.getElementById('navbar').style.position = "relative";
    document.getElementById('navbar').style.top = "0";
    document.getElementById("auth").style.paddingTop = "20px";
}

// 
function scrollFunction () {
    if(document.body.scrollTop > 650 || document.documentElement.scrollTop > 650) {
        document.getElementById('navbar').style.top = "0";
    }
    else {
        document.getElementById('navbar').style.top = "-100px";
    }
}

function confirmDelete() {
    return confirm("Are you sure you want to delete this posting?");
}

function confirmVerification() {
    return confirm("Are you sure you want to verify this listing?");
}