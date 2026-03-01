const Wrapper = {
    html: `
        <div class='wrapper'>
            <h1>Tesla Custom Wrap Studio</h1>
            <form id='wrap-form'>
                <label for='model'>Select Model:</label>
                <select id='model' name='model'>
                    <option value='model-s'>Model S</option>
                    <option value='model-3'>Model 3</option>
                    <option value='model-x'>Model X</option>
                    <option value='model-y'>Model Y</option>
                </select>
                <label for='year'>Select Year:</label>
                <select id='year' name='year'>
                    <option value='2020'>2020</option>
                    <option value='2021'>2021</option>
                    <option value='2022'>2022</option>
                    <option value='2023'>2023</option>
                </select>
                <label for='color'>Select Color:</label>
                <input type='color' id='color' name='color' value='#ffffff'>
                <div class='wrap-style'>
                    <h3>Select Wrap Style:</h3>
                    <div class='chip' data-style='matte'>Matte</div>
                    <div class='chip' data-style='glossy'>Glossy</div>
                    <div class='chip' data-style='metallic'>Metallic</div>
                </div>
                <label for='file-upload'>Upload File:</label>
                <input type='file' id='file-upload' name='file-upload'>
                <button type='submit'>Submit</button>
            </form>
            <div id='preview'></div>
        </div>
    `,
    css: `
        .wrapper { padding: 20px; font-family: Arial, sans-serif; }
        h1 { color: #333; }
        .chip { display: inline-block; padding: 10px; margin: 5px; background-color: #f0f0f0; border-radius: 5px; cursor: pointer; }
        .wrap-style { margin-top: 15px; }
        #preview { margin-top: 20px; border: 1px solid #ccc; padding: 10px; display: none; }
    `,
    init: function() {
        const form = document.getElementById('wrap-form');
        const fileUpload = document.getElementById('file-upload');
        const preview = document.getElementById('preview');
        const modelSelect = document.getElementById('model');
        const yearSelect = document.getElementById('year');
        const colorSelect = document.getElementById('color');
        const chips = document.querySelectorAll('.chip');

        const updatePreview = (file) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                preview.innerHTML = `<img src='${event.target.result}' alt='File Preview' style='max-width: 100%;'/>`;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        };

        fileUpload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) { updatePreview(file); }
        });

        chips.forEach(chip => {
            chip.addEventListener('click', function() {
                chips.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            });
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            // Handle form submission logic here
            console.log({
                model: modelSelect.value,
                year: yearSelect.value,
                color: colorSelect.value,
                wrapStyle: document.querySelector('.chip.active')?.dataset.style,
            });
        });
    }
};

export default Wrapper;