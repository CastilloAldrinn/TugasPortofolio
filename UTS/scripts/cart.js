function updateCartTotal() {
  let items = document.querySelectorAll(".cart-card");
  let total = 0;

  items.forEach(item => {
    let priceText = item.querySelector(".price").textContent.replace(/[Rp,. ]/g, "");
    let price = parseInt(priceText) || 0;
    let qty = parseInt(item.querySelector(".item-qty span").textContent);
    let subtotal = price * qty;

    // update subtotal di UI
    item.querySelector(".subtotal").textContent = "Rp" + subtotal.toLocaleString("id-ID");
    total += subtotal;
  });

  document.getElementById("cart-total").textContent = "Rp" + total.toLocaleString("id-ID");
}

function increaseQty(btn) {
  let span = btn.previousElementSibling;
  let qty = parseInt(span.textContent);
  span.textContent = qty + 1;
  updateCartTotal();
}

function decreaseQty(btn) {
  let span = btn.nextElementSibling;
  let qty = parseInt(span.textContent);
  if (qty > 1) {
    span.textContent = qty - 1;
    updateCartTotal();
  }
}

// pertama kali load
document.addEventListener("DOMContentLoaded", updateCartTotal);
    