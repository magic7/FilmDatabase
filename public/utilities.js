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

function FindFilmByID() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function ReceivedCallback() {
    if (this.readyState == 4 && this.status == 200) {
      var responseJson = JSON.parse(this.responseText);
      var tableBodyHTML = "";
      //If a non-empty response comes back
      if (responseJson.length > 0) {
          tableBodyHTML += "<thead><tr><th scope=\"col\">Film ID</th><th scope=\"col\">Title</th><th scope=\"col\">Description</th>" +
                           "<th scope=\"col\">Release Year</th><th scope=\"col\">Length</th><th scope=\"col\">Rating</th>" +
                           "<th scope=\"col\">Category ID</th><th scope=\"col\">Last Updated</th></tr></thead><tbody>";

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
                                  "	<td>" + record["category_id"] + "</td>" +
                                  "	<td>" + formattedDate + "</td>" +
                                "</tr>";
           }
           tableBodyHTML += "</tbody>";
           document.getElementById("errorMessage").innerHTML = "";
      }
      // Else if nothing is retrieved
      else {
        // Display error message
        document.getElementById("errorMessage").innerHTML = "No film with such ID";
      }
      document.getElementById("table").innerHTML = tableBodyHTML;
    }
  };
  xhttp.open("GET", "api/films/" + document.getElementById("filmIDInput").value, true);
  xhttp.send();
}

// Populate category combo box with values retrieved from the database on load
function PopulateCatsComboBox(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function ReceivedCallback() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("catSelect").innerHTML = CreateSelect(JSON.parse(this.responseText));
		}
	};
	xhttp.open("GET", "api/categories", true);
	xhttp.send();
}

function CreateSelect(categories){
	var retVal = "";
	for (record of categories) {
    	retVal += "<option value=" + record["name"] + ">" + record["name"] + "</option>";
	}
	return retVal;
}


// Called by categories.html to populate table with all categories
function PopulateCatsTable(){
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
                                  "	<td>" + record["category_id"] + "</td>" +
                                  "	<td>" + record["name"] + "</td>" +
                                  "	<td>" + formattedDate + "</td>" +
                                "</tr>";
           }
           document.getElementById("tableBody").innerHTML = tableBodyHTML;
      }
      // Else if nothing is retrieved
      else {
        // Display error message
        document.getElementById("errorMessage").innerHTML = "No category retrieved";
      }
		}
	};
  xhttp.open("GET", "api/categories", true);
  xhttp.send();
}

function FindCatByID() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function ReceivedCallback() {
    if (this.readyState == 4 && this.status == 200) {
      var responseJson = JSON.parse(this.responseText);
      var tableBodyHTML = "";
      //If a non-empty response comes back
      if (responseJson.length > 0) {
          tableBodyHTML += "<thead><tr><th scope=\"col\">Category ID</th><th scope=\"col\">Name</th><th scope=\"col\">Last Updated</th></tr></thead><tbody>";

           //Iterate through responseJson to format each record data into HTML string
           for (record of responseJson) {
               var formattedDate = new Date(record["last_update"]).toISOString().slice(0, 19).replace('T', ' ');
               tableBodyHTML += "<tr>" +
                                  "	<td>" + record["category_id"] + "</td>" +
                                  "	<td>" + record["name"] + "</td>" +
                                  "	<td>" + formattedDate + "</td>" +
                                "</tr>";
           }
           tableBodyHTML += "</tbody>";
           document.getElementById("errorMessage").innerHTML = "";
      }
      // Else if nothing is retrieved
      else {
        // Display error message
        document.getElementById("errorMessage").innerHTML = "No category with such ID";
      }
      document.getElementById("table").innerHTML = tableBodyHTML;
    }
  };
  xhttp.open("GET", "api/categories/" + document.getElementById("catIDInput").value, true);
  xhttp.send();
}
