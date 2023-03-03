// Initialize navbar behaviour
window.addEventListener('scroll',function(){
    var navbar = document.getElementById('nav_bar');
    navbar.classList.toggle('sticky',window.scrollY > 0);
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
        var pr_str =
            `<thead class="align-middle bg-1 text-white">
            <tr>
                <th class="col-5" scope="col">Inclusions</th>
                <th scope="col">(Basic)<br>$599</th>
                <th scope="col">(Advanced)<br>$1,799</th>
                <th scope="col">(Premium)<br>$2,449</th>
            </tr>
        </thead>
        <tbody>`;
        var highlighted = 'bg-1 text-white';
        pr.forEach(item => {
            pr_str +=
            `<tr class="${item.Highlight == '1' ? highlighted : ''}">
                <td>${item.Service != undefined ? item.Service : ''}</td>
                <td>${item.Good != undefined ? item.Good : '' }</td>
                <td>${item.Grand != undefined ? item.Grand : ''}</td>
                <td>${item.Great != undefined ? item.Great : ''}</td>
            </tr>`;
        });
        pr_str += `</tbody>`;

        document.getElementById("table_pr").innerHTML += pr_str;
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