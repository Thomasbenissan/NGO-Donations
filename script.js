(function() {
    var css = 'button.donate-button { position: fixed; bottom: 20px; right: 20px; z-index: 1000; }',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);

    var button = document.createElement("button");
    button.innerHTML = "Start";
    button.className = "donate-button";
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.left = "20px";
    button.style.zIndex = "10000";
    button.style.width = '40px';
    button.onclick = function() {
        var iframe = document.createElement('iframe');
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.position = "fixed";
        iframe.style.top = "0";
        iframe.style.left = "0";
        iframe.style.zIndex = "10000";
        iframe.style.border = "none";
        iframe.src = "https://Thomasbenissan.github.io/NGO-Donations/"; // URL of your hosted popup
        document.body.appendChild(iframe);
    };
    document.body.appendChild(button);
})();