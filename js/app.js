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
        var full_color_str =
            `<thead class="align-middle bg-2">
            <tr>
                <th scope="col">Inclusions</th>
                <th scope="col">(Basic)<br>$899</th>
                <th scope="col">(Advanced)<br>$1,999</th>
                <th scope="col">(Premium)<br>$2,499</th>
                <th scope="col">(Elite)<br>$4,899</th>
            </tr>
        </thead>
        <tbody>`;
        full_color.forEach(item => {
            full_color_str +=
                `<tr>
                <td>${item.Inclusions}</td>
                <td>${item.Basic != undefined ? item.Basic : '' }</td>
                <td>${item.Advanced != undefined ? item.Advanced : ''}</td>
                <td>${item.Premium != undefined ? item.Premium : ''}</td>
                <td>${item.Elite != undefined ? item.Elite : ''}</td>
            </tr>`;
        });
        full_color_str += `</tbody>`;

        document.getElementById("table_full_color").innerHTML += full_color_str;
    }

    if (black_white) {
        var bw_str =
            `<thead class="align-middle bg-2">
            <tr>
                <th scope="col">Inclusions</th>
                <th scope="col">(Basic)<br>$599</th>
                <th scope="col">(Advanced)<br>$1,799</th>
                <th scope="col">(Premium)<br>$2,449</th>
                <th scope="col">(Elite)<br>$4,599</th>
            </tr>
        </thead>
        <tbody>`;
        black_white.forEach(item => {
            bw_str +=
                `<tr>
                <td>${item.Inclusions}</td>
                <td>${item.Basic != undefined ? item.Basic : '' }</td>
                <td>${item.Advanced != undefined ? item.Advanced : ''}</td>
                <td>${item.Premium != undefined ? item.Premium : ''}</td>
                <td>${item.Elite != undefined ? item.Elite : ''}</td>
            </tr>`;
        });
        bw_str += `</tbody>`;

        document.getElementById("table_black_white").innerHTML += bw_str;
    }

    if (pr) {
        var bw_str =
            `<thead class="align-middle bg-1 text-white">
            <tr>
                <th scope="col">Inclusions</th>
                <th scope="col">(Basic)<br>$599</th>
                <th scope="col">(Advanced)<br>$1,799</th>
                <th scope="col">(Premium)<br>$2,449</th>
            </tr>
        </thead>
        <tbody>`;
        pr.forEach(item => {
            bw_str +=
                `<tr>
                <td>${item.Service != undefined ? item.Service : ''}</td>
                <td>${item.Good != undefined ? item.Good : '' }</td>
                <td>${item.Grand != undefined ? item.Grand : ''}</td>
                <td>${item.Great != undefined ? item.Great : ''}</td>
            </tr>`;
        });
        bw_str += `</tbody>`;

        document.getElementById("table_pr").innerHTML += bw_str;
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