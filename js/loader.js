document.addEventListener("DOMContentLoaded", function (event) {
    document.removeEventListener("DOMContentLoaded", arguments.callee, false);
    window.Main = new O.Main();
});