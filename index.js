const Crawler = require("crawler");
const MysqlClient = require('./dbclient');
const { sendEmail } = require("./mailClient");

const LIST_OF_PS5_PREORDER_SITES = [
    //{ name: "Sony", url: 'https://store.sony.com.sg/products/playstation5/?variant=35981562249371', flaggedWord: "Out Of Stock", selector: '.product__add-to-cart.button.button--secondary' },
    { name: "Courts", url: 'https://www.courts.com.sg/sony-cfi-1018b01-digital-edition-playstation-5-ip162582', selector: ".actions", flaggedWord: "Out Of Stock" },
    { name: "qisahn", url: 'https://qisahn.com/products/playstation-5-console-plus-dualsense-wireless-controller-1', selector: '#product_price_add_info', flaggedWord: "This item is sold out" },
    { name: "amazon", url: "https://www.amazon.sg/gp/product/B08HNRSVQP/", selector: "#availability", flaggedWord: "Currently unavailable." },
];


main();

function getUsers(connection) {
    var mailingList = [];

    return new Promise((resolve, reject) => {
        connection.query('SELECT * from user', async function (error, results, fields) {
            if (error) {
                console.log(error);
                reject(error);
                return;
            }
            resolve(results);
        });

    });
}

function updateNewUserFlag(connection, id) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE user SET isNewUser=0 where id=${id}`, (error, results, fields) => {
            if (error) {
                console.log(error);
                reject(error);
                return;
            }
            resolve(true);
        })
    })
}

async function main() {

    const connection = MysqlClient.connection;
    connection.connect();
    let users = await getUsers(connection);

    let mailingList =  users.map( async user=>{
        if(user.isNewUser){
            let emailSent = await sendEmail(user.email_address, `Hi ${user.full_name}, you have been subscribed to PS5 Camper`);
            if (emailSent) {
                console.log(`new user: ${user.full_name}`);
                await updateNewUserFlag(connection, user.id);
            }
        }
        return user.email_address;
    })

    await Promise.all(mailingList);
    console.log('mailingList is ', mailingList);

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
                        mailingList.forEach(addr => {
                            Mail.sendEmail(site.name, addr, `PS5 is AVAILABLE on ${site.name}`);
                        })
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
    connection.end();

}