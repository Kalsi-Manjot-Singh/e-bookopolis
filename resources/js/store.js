function search(){
  const searchItem = document.getElementById("search").value.toUpperCase();
  const catalogue = document.getElementById("catalogue");
  const product = document.querySelectorAll(".griditems");
  const bookTitle = catalogue.getElementsByTagName("p");

  console.log(searchItem);
  console.log(catalogue);
  console.log(product);
  console.log(bookTitle);

  for(let i = 0; i<bookTitle.length; i++){
    let match = product[i].getElementsByTagName('p')[0];

    if(match){
      let textValue = match.textContent || match.innerHTML;

      if(textValue.toUpperCase().indexOf(searchItem) > -1){
        product[i].style.display = "";
      } else {
        product[i].style.display = "none";
      }
    }
  }
}
