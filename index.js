const Crawler = require("crawler");

const LIST_OF_PS5_PREORDER_SITES = [
    //{ name: "Sony", url: 'https://store.sony.com.sg/products/playstation5/?variant=35981562249371', flaggedWord: "Out Of Stock", selector: '.product__add-to-cart.button.button--secondary' },
    { name: "Courts", url: 'https://www.courts.com.sg/sony-cfi-1018b01-digital-edition-playstation-5-ip162582', flaggedWord: "Out Of Stock", selector: ".actions" },
    { name: 'qisahn', url: 'https://qisahn.com/products/playstation-5-console-plus-dualsense-wireless-controller-1', selector: '#product_price_add_info', flaggedWord: "This item is sold out" },
];

var c = new Crawler({
    maxConnections: 10,
    // rateLimit: 10000,
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            var site = res.options.site;

            //selector can be either a class or an id

            console.log("Searching>>>>>> " + site.name);

            if ($(site.selector).length == 0) {
                console.log("site might have changed");
            } else {
                const selected = $(site.selector);
                if (selected.text().trim().toUpperCase().includes(site.flaggedWord.toUpperCase())) {
                    console.log("PS5 is still SOLD OUT on " + site.name);
                } else {
                    console.log("PS5 is AVAILABLE on " + site.name);
                }

            }
            console.log("\n");
        }
        done();
    }
});


LIST_OF_PS5_PREORDER_SITES.forEach(site => {
    c.queue({
        url: site.url,
        site
    });
});