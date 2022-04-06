/*$("#image-selector").change(function () {
    let reader = new FileReader();
    reader.onload = function () {
        let dataURL = reader.result;
        $("#selected-image").attr("src", dataURL);
        $("#prediction-list").empty();
    }
    let file = $("#image-selector").prop("files")[0];
    reader.readAsDataURL(file);
}); */

let model;
(async function() {
    model = await tf.loadLayersModel('mobile_net/model.json');
    console.log(model.summary())
})();

$("#predict-button").click(async function () {
    model.then(model => {
        alert("1");
        let selectedFile = document.getElementById("image-selector").value
        var img1 = new Image(); // TODO
        img1.src = "static/55.png";
        alert(img1.src);

        let tensor = tf.browser.fromPixels(img1).resizeNearestNeighbor([224, 224]).toFloat()
        let offset = tf.scalar(127.5)
        let batched = tensor.sub(offset).reverse(2).expandDims()
        const res = model.predict(batched)
        alert(res);
    });
});

$("#test-button").click(async function () {
    alert("test");
    alert(document.getElementById("image-selector").value);
});