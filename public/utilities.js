// Called by films.html to populate table with all films and their category
function PopulateFilmsTable(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function ReceivedCallback() {
		if (this.readyState == 4 && this.status == 200) {
      var responseJson = JSON.parse(this.responseText);

      //If a non-empty response comes back
      if (responseJson.length > 0) {
           var tableBodyHTML = "";
           //Iterate through responseJson to format each record data into HTML string
           for (record of responseJson) {
               var formattedDate = new Date(record["last_update"]).toISOString().slice(0, 19).replace('T', ' ');
               tableBodyHTML += "<tr>" +
                                  "	<td>" + record["film_id"] + "</td>" +
                                  "	<td>" + record["title"] + "</td>" +
                                  "	<td>" + record["description"] + "</td>" +
                                  "	<td>" + record["release_year"] + "</td>" +
                                  "	<td>" + record["length"] + "</td>" +
                                  "	<td>" + record["rating"] + "</td>" +
                                  "	<td>" + record["name"] + "</td>" +
                                  "	<td>" + formattedDate + "</td>" +
                                "</tr>";
           }

           document.getElementById("tableBody").innerHTML = tableBodyHTML;

      }
      // Else if nothing is retrieved
      else {
        // Display error message
        document.getElementById("errorMessage").innerHTML = "No film retrieved";
      }
		}
	};
  xhttp.open("GET", "api/films-categories", true);
  xhttp.send();
}

// function CreateSelect(departments){
// 	// <select id="department" name="department">
// 	// 		<option value="id1">name1</option>
// 	//		<option value="id2">name2</option>
// 	//		...
// 	// </select>
// 	var retVal = "";
// 	retVal += '<select id="department" name="department" class="form-control"> \n';
// 	for (var index in departments){
// 		retVal += `<option value="${departments[index].dept_no}">${departments[index].dept_name}</option>`;
// 	}
// 	retVal += '</select>';
// 	return retVal;
// }
