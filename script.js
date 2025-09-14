const upload = document.getElementById("upload");
const image = document.getElementById("image");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let currentFilter = "none";

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      image.src = event.target.result;
      image.hidden = false;
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        drawImage();
      };
    };
    reader.readAsDataURL(file);
  }
});

function applyFilter(filter) {
  currentFilter = filter;
  image.style.filter = filter;
  drawImage();
}

function drawImage() {
  ctx.filter = currentFilter;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

function downloadImage() {
  drawImage();
  const link = document.createElement("a");
  link.download = "filtered-image.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}