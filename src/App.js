import './App.css';
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Colors from './components/Colors';

function App() {

  //Variables Paginacion
  const [colors,setcolors] = useState([]);

  const [pageNumber,setPageNumber] = useState(0);
  const [pageCount,setPageCount] = useState(0);

  const colorsPerPage = 6;
  const pagesVisited = pageNumber * colorsPerPage;

  useEffect(()=>{
    obtenerDatos()
  },[])

  const obtenerDatos = async () => {

    const data = await fetch('https://reqres.in/api/colors');
    const dataColors = await data.json();

    var totalPages = dataColors.total_pages;
    var colors = [];
    
    for(let i=1; i<=totalPages; i++){
      
      var arrayData = await fetch(`https://reqres.in/api/colors?page=`+i);
      var arrayColors = await arrayData.json();

      colors.push(...arrayColors.data);
    }
    setcolors(colors);
    setPageCount(dataColors.total_pages);
  }

  //Data 
  var displayData = colors
    .slice(pagesVisited,pagesVisited+colorsPerPage)
    .map((color) => {
      return(
        <Colors name={color.name} color={color.color} pantone_value={color.pantone_value} year={color.year} />
      );
  }); 
  
  //Cambiar pagina
  const changePage = ({ selected }) => {
    setPageNumber(selected);
    //obtenerDatos2(selected+1);
  }
  
  return (
    <div className="App">
      <div className="Title">
        <p>Colores</p>
      </div>
      { displayData }
      <ReactPaginate
        previousLabel = "Anterior"
        nextLabel = "Siguiente"
        pageCount = { pageCount }
        onPageChange = { changePage }
        containerClassName = {"paginationBttns"}
        previousLinkClassName = {"previousBttns"}
        nextLinkClassName = {"nextBttns"}
        disabledClassName = {"paginationDisabled"}
        activeClassName = {"paginationActive"}
      >
      </ReactPaginate>
    </div>
  );
}

export default App;
