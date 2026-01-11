var swiper = new Swiper(".mySwiper", {
    loop:true,
      navigation: {
        nextEl: "#next",
        prevEl: "#prev",
      },
    });

// PRELOADER
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("hide");

    setTimeout(() => {
        preloader.style.display = "none";
    }, 5000);
});
