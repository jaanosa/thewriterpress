// Initialize navbar behaviour upon scroll
window.addEventListener('scroll',function(){
    var navbar = document.getElementById('nav_bar');
    navbar.classList.toggle('sticky',window.scrollY > 0);
});

// Initialize navbar behaviour when mobile
var hamburger  = document.getElementById('nav-item-sp');
var menu_close = document.getElementById('nav-item-menu-close');
var menu_item  = document.getElementById('nav-item-menu-sp');
var body       = document.getElementById('html_body');

var logo          = document.getElementById('nav-item-menu-logo');
var home          = document.getElementById('nav-item-menu-home');
var home_section  = document.getElementById('banner');
var pricing       = document.getElementById('nav-item-menu-pricing');
var price_section = document.getElementById('publishing_packages');

hamburger.addEventListener('click',function(){
    menu_item.classList.toggle('show');
    body.classList.toggle('sp_show');
});

menu_close.addEventListener('click',function(){
    menu_item.classList.toggle('show');
    body.classList.toggle('sp_show');
});

logo.addEventListener('click',function(){
    body.scrollIntoView();
    menu_item.classList.toggle('show');
    body.classList.toggle('sp_show');
});

home.addEventListener('click',function(){
    home_section.scrollIntoView();
    menu_item.classList.toggle('show');
    body.classList.toggle('sp_show');
});

pricing.addEventListener('click',function(){
    price_section.scrollIntoView();
    menu_item.classList.toggle('show');
    body.classList.toggle('sp_show');
});

// Fetch json files and append to respective tables
async function fetchJSON() {
    const [colorResponse, bwResponse, prResponse] = await Promise.all([
        fetch('./json/full_color.json'),
        fetch('./json/black_white.json'),
        fetch('./json/pr.json')
    ]);
    const full_color = await colorResponse.json();
    const black_white = await bwResponse.json();
    const pr = await prResponse.json();
    return [full_color, black_white, pr];
}

fetchJSON().then(([full_color, black_white, pr]) => {
    if (full_color) {
        var full_color_str = '';
        full_color.forEach(item => {
            full_color_str =
            `<div class="card-item p-2">
                <div class="card-item-wrapper bc-2">
                    <div class="card-header p-3 bg-2 text-center">
                        <span class="fw-bold">${item.Type}</span>
                        <h2>${item.Price}</h2>
                    </div>
                    <div class="card-item-body p-3">
                        <ul class="pb-3">`;
                        if (item.Values) {
                            var item_values = item.Values;
                            item_values.forEach(value => {
                                if (value.Value) {
                                    if (value.Value === 'Add-On') {
                                        full_color_str +=
                                        `<li class="add-on"> <i class="bi bi-plus-square-fill"></i>
                                            ${value.Inclusions}
                                        </li>`;
                                    }else if(value.Value === 'No'){
                                        full_color_str +=
                                        `<li> <i class="bi bi-x-square-fill"></i>
                                            ${value.Inclusions}
                                        </li>`;
                                    }else{
                                        full_color_str +=
                                        `<li> <i class="bi bi-check-square"></i>
                                            ${value.Inclusions}
                                        </li>`;
                                    }
                                }
                            });
                        }
            full_color_str += 
                        `</ul>
                        <button class="btn rounded-0 text-white bg-2 w-100 p-2 fw-bold text-uppercase" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>`;

            document.getElementById("table_full_color").innerHTML += full_color_str;
        });
    }

    if (black_white) {
        var bw_str = '';
        black_white.forEach(item => {
            bw_str =
            `<div class="card-item p-2">
                <div class="card-item-wrapper bc-2">
                    <div class="card-header p-3 bg-2 text-center">
                        <span class="fw-bold">${item.Type}</span>
                        <h2>${item.Price}</h2>
                    </div>
                    <div class="card-item-body p-3">
                        <ul class="pb-3">`;
                        if (item.Values) {
                            var item_values = item.Values;
                            item_values.forEach(value => {
                                if (value.Value) {
                                    if (value.Value === 'Add-On') {
                                        bw_str +=
                                        `<li class="add-on"> <i class="bi bi-plus-square-fill"></i>
                                            ${value.Inclusions}
                                        </li>`;
                                    }else if(value.Value === 'No'){
                                        bw_str +=
                                        `<li> <i class="bi bi-x-square-fill"></i>
                                            ${value.Inclusions}
                                        </li>`;
                                    }else{
                                        bw_str +=
                                        `<li> <i class="bi bi-check-square"></i>
                                            ${value.Inclusions}
                                        </li>`;
                                    }
                                }
                            });
                        }
                        bw_str += 
                        `</ul>
                        <button class="btn rounded-0 text-white bg-2 w-100 p-2 fw-bold text-uppercase" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>`;

            document.getElementById("table_black_white").innerHTML += bw_str;
        });
    }

    if (pr) {
        var pr_str = '';
        pr.forEach(item => {
            pr_str =
            `<div class="card-item p-2">
                <div class="card-item-wrapper bc-1">
                    <div class="card-header p-3 bg-1 text-center text-white">
                        <span class="fw-bold">${item.Type}</span>
                        <h2>${item.Price}</h2>
                        <p>${item.Month}</p>
                    </div>
                    <div class="card-item-body p-3">`;
                        if (item.Services) {
                            var item_services = item.Services;
                            item_services.forEach(services => {
                                pr_str +=
                                `   <h5 class="text-center">
                                        ${services.Service}
                                    </h5>
                                `;
                                if (services.Values) {
                                    pr_str += `<ul class="pb-3">`
                                    var service = services.Values
                                    service.forEach(value => {
                                        if (value) {
                                          
                                            var inclusion = value.Inclusion ? value.Inclusion : '';
                                            var inc_value = value.Value ? value.Value : '';
                                            var included  = value.Included ? value.Included === 'No' ? '' : value.Included : '';

                                            if (inclusion.includes('Add on')) {
                                                pr_str +=
                                                `<li class="add-on"> <i class="bi bi-plus-square-fill"></i>
                                                    ${inc_value} ${inclusion} 
                                                </li>`;
                                            }else if(included === ''){
                                                pr_str +=
                                                `<li> <i class="bi bi-x-square-fill"></i>
                                                    ${inc_value} ${inclusion}
                                                </li>`;
                                            }else{
                                                pr_str +=
                                                `<li> <i class="bi bi-check-square"></i>
                                                    ${inc_value} ${inclusion}
                                                </li>`;
                                            }
                                    
                                        }
                                    });
                                    pr_str += `</ul>`
                                }
                            });
                        }
                        pr_str += 
                        `<button class="btn rounded-0 text-white bg-1 w-100 p-2 fw-bold text-uppercase" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>`;

            document.getElementById("table_pr").innerHTML += pr_str;
        });

    }

}).catch(error => {
    console.log(error);
});

// Initialize Swiper
const swiper = new Swiper('.swiper', {
    speed: 400,
    spaceBetween: 100,
    loop: true,
    autoplay: {
        delay: 5000,
        pauseOnMouseEnter: true,
    }
});

// Initialize AOS
AOS.init();