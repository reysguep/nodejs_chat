$(document).ready(() => {
    let mainH = $('main').height();
    configFooter();

    setInterval(() => {
        let newMainH = $('main').height();
        
        if(mainH != newMainH) {
            mainH = newMainH;
            configFooter();
        }
    }, 500);
});

function configFooter() {
    let main = $('main');
    
    let bodyH = $('body').height();
    let windowH = $(window).height();

    if (bodyH == windowH) {

        let headerH = $('header').height();
        let footerH = $('footer').height();
        let mainH = main.outerHeight() ;

        let newPaddingB = bodyH - headerH - footerH - mainH + 20;

        main.css('padding-bottom', newPaddingB);
    }
}